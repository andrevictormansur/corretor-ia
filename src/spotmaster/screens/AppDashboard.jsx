import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps'
import { MapPin, Satellite, Trophy, Fish, X, Navigation, Wind, Thermometer, Droplets } from 'lucide-react'

const GEO_URL = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json'

// Random spots across the US
const RAW_SPOTS = [
  { id: 1, name: 'Lake Okeechobee Deep Cut', coords: [-80.8, 26.9], fish: 'Largemouth Bass', active: true, rating: 4.9 },
  { id: 2, name: 'Mississippi Delta Flats', coords: [-89.1, 29.4], fish: 'Redfish', active: true, rating: 4.7 },
  { id: 3, name: 'Chesapeake Bay Channel', coords: [-76.2, 38.9], fish: 'Striped Bass', active: false, rating: 4.5 },
  { id: 4, name: 'Lake Erie North Shore', coords: [-82.5, 41.8], fish: 'Walleye', active: true, rating: 4.8 },
  { id: 5, name: 'Gulf of Mexico Shelf', coords: [-94.2, 27.8], fish: 'Red Snapper', active: true, rating: 4.6 },
  { id: 6, name: 'Sacramento River Delta', coords: [-121.6, 38.1], fish: 'King Salmon', active: false, rating: 4.4 },
  { id: 7, name: 'Puget Sound Narrows', coords: [-122.5, 47.3], fish: 'Coho Salmon', active: true, rating: 4.9 },
  { id: 8, name: 'Lake Michigan Shoals', coords: [-87.3, 43.2], fish: 'Chinook Salmon', active: false, rating: 4.3 },
  { id: 9, name: 'Colorado River Bend', coords: [-111.6, 36.1], fish: 'Rainbow Trout', active: true, rating: 4.7 },
  { id: 10, name: 'Outer Banks Inlet', coords: [-75.5, 35.2], fish: 'Flounder', active: true, rating: 4.5 },
  { id: 11, name: 'Snake River Canyon', coords: [-116.1, 45.5], fish: 'Steelhead', active: false, rating: 4.6 },
  { id: 12, name: 'Florida Keys Reef', coords: [-81.1, 24.7], fish: 'Mahi-Mahi', active: true, rating: 5.0 },
  { id: 13, name: 'Kenai River Mouth', coords: [-151.3, 60.5], fish: 'King Salmon', active: true, rating: 4.8 },
  { id: 14, name: 'Lake Tahoe Deep', coords: [-120.0, 39.1], fish: 'Mackinaw Trout', active: false, rating: 4.4 },
  { id: 15, name: 'Corpus Christi Bay', coords: [-97.4, 27.8], fish: 'Speckled Trout', active: true, rating: 4.6 },
  { id: 16, name: 'Boundary Waters Chain', coords: [-92.3, 47.9], fish: 'Northern Pike', active: true, rating: 4.7 },
  { id: 17, name: 'Cape Cod Shoals', coords: [-70.1, 41.7], fish: 'Bluefin Tuna', active: false, rating: 4.8 },
  { id: 18, name: 'Ozark Tailwaters', coords: [-92.6, 36.4], fish: 'Rainbow Trout', active: true, rating: 4.5 },
  { id: 19, name: 'San Francisco Bay', coords: [-122.4, 37.6], fish: 'Halibut', active: false, rating: 4.3 },
  { id: 20, name: 'Everglades Backcountry', coords: [-81.0, 25.4], fish: 'Snook', active: true, rating: 4.9 },
  { id: 21, name: 'Yellowstone River', coords: [-110.5, 44.7], fish: 'Cutthroat Trout', active: true, rating: 4.8 },
  { id: 22, name: 'Lake Champlain Narrows', coords: [-73.3, 44.5], fish: 'Largemouth Bass', active: false, rating: 4.4 },
  { id: 23, name: 'Missouri River Bluffs', coords: [-96.7, 41.3], fish: 'Catfish', active: true, rating: 4.5 },
  { id: 24, name: 'Laguna Madre Flats', coords: [-97.2, 26.5], fish: 'Flounder', active: true, rating: 4.7 },
  { id: 25, name: 'Pend Oreille Depth', coords: [-116.5, 48.2], fish: 'Bull Trout', active: false, rating: 4.6 },
]

function SpotMarker({ spot, onClick, isSelected }) {
  return (
    <Marker coordinates={spot.coords} onClick={() => onClick(spot)}>
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: spot.id * 0.04, type: 'spring', stiffness: 200 }}
        style={{ cursor: 'pointer' }}
      >
        {/* Pulse ring for active spots */}
        {spot.active && (
          <motion.circle
            r={isSelected ? 14 : 10}
            fill="none"
            stroke="#00FF88"
            strokeWidth="1"
            opacity={0.4}
            animate={{ r: [8, 16], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: spot.id * 0.15 }}
          />
        )}
        {/* Dot */}
        <circle
          r={isSelected ? 7 : 4}
          fill={isSelected ? '#00FF88' : spot.active ? '#00FF88' : '#4b5563'}
          opacity={spot.active ? 1 : 0.6}
          style={{
            filter: spot.active ? 'drop-shadow(0 0 6px #00FF88)' : 'none',
            transition: 'all 0.2s',
          }}
        />
        {isSelected && (
          <circle r={3} fill="#0A0C10" />
        )}
      </motion.g>
    </Marker>
  )
}

export default function AppDashboard() {
  const [selectedSpot, setSelectedSpot] = useState(null)
  const [activeTab, setActiveTab] = useState('map')

  const activeCount = RAW_SPOTS.filter((s) => s.active).length

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0A0C10' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-5 pb-3">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-widest">SpotMaster Pro</p>
          <h1 className="text-white font-black text-lg leading-tight">Secret Spots Map</h1>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: 'rgba(0,255,136,0.1)', border: '1px solid rgba(0,255,136,0.25)' }}>
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#00FF88' }} />
          <span className="text-xs font-bold" style={{ color: '#00FF88' }}>{activeCount} Active</span>
        </div>
      </div>

      {/* Stats row */}
      <div className="flex gap-3 px-5 mb-3">
        {[
          { icon: MapPin, label: 'Total Spots', value: RAW_SPOTS.length },
          { icon: Satellite, label: 'Live Feed', value: 'ON' },
          { icon: Trophy, label: 'Your Rank', value: '#142' },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex-1 rounded-xl px-3 py-2.5" style={{ background: '#141820', border: '1px solid #1e2530' }}>
            <div className="flex items-center gap-1.5 mb-1">
              <Icon size={10} color="#00FF88" />
              <p className="text-gray-500 text-xs">{label}</p>
            </div>
            <p className="text-white font-black text-sm">{value}</p>
          </div>
        ))}
      </div>

      {/* 3D Map container */}
      <div className="flex-1 relative mx-4 mb-4 rounded-2xl overflow-hidden" style={{ background: '#0d1117', border: '1px solid #1e2530', minHeight: 380 }}>

        {/* Grid overlay */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,255,136,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.04) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />

        {/* Scanline effect */}
        <motion.div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, rgba(0,255,136,0.03) 50%, transparent 100%)',
            backgroundSize: '100% 60px',
          }}
          animate={{ backgroundPosition: ['0 0', '0 600px'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />

        {/* 3D perspective wrapper */}
        <div
          style={{
            perspective: '900px',
            perspectiveOrigin: '50% 30%',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '10px',
          }}
        >
          <motion.div
            initial={{ rotateX: 0, opacity: 0, scale: 0.9 }}
            animate={{ rotateX: 28, opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            style={{
              transformStyle: 'preserve-3d',
              width: '100%',
            }}
          >
            <ComposableMap
              projection="geoAlbersUsa"
              style={{ width: '100%', height: 'auto' }}
            >
              <Geographies geography={GEO_URL}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="#141820"
                      stroke="#00FF88"
                      strokeWidth={0.5}
                      strokeOpacity={0.35}
                      style={{
                        default: { outline: 'none' },
                        hover: { fill: '#1a2e22', outline: 'none' },
                        pressed: { outline: 'none' },
                      }}
                    />
                  ))
                }
              </Geographies>

              {RAW_SPOTS.map((spot) => (
                <SpotMarker
                  key={spot.id}
                  spot={spot}
                  onClick={setSelectedSpot}
                  isSelected={selectedSpot?.id === spot.id}
                />
              ))}
            </ComposableMap>
          </motion.div>
        </div>

        {/* Vignette */}
        <div
          className="absolute inset-0 z-10 pointer-events-none rounded-2xl"
          style={{ boxShadow: 'inset 0 0 60px rgba(10,12,16,0.8)' }}
        />

        {/* Corner label */}
        <div className="absolute top-3 left-3 z-20">
          <p className="text-xs font-mono" style={{ color: 'rgba(0,255,136,0.5)' }}>LIVE · SAT FEED</p>
        </div>
        <div className="absolute top-3 right-3 z-20 flex items-center gap-1">
          <motion.div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: '#00FF88' }}
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <p className="text-xs font-mono" style={{ color: 'rgba(0,255,136,0.5)' }}>REC</p>
        </div>

        {/* Tap hint */}
        {!selectedSpot && (
          <motion.div
            className="absolute bottom-3 left-0 right-0 flex justify-center z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <p className="text-xs" style={{ color: 'rgba(0,255,136,0.4)' }}>Tap a spot to see details</p>
          </motion.div>
        )}
      </div>

      {/* Spot detail panel */}
      <AnimatePresence>
        {selectedSpot && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="mx-4 mb-4 rounded-2xl p-4"
            style={{ background: '#141820', border: '1.5px solid rgba(0,255,136,0.3)' }}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: selectedSpot.active ? '#00FF88' : '#4b5563', boxShadow: selectedSpot.active ? '0 0 6px #00FF88' : 'none' }}
                  />
                  <span className="text-xs" style={{ color: selectedSpot.active ? '#00FF88' : '#4b5563' }}>
                    {selectedSpot.active ? 'Active Now' : 'Inactive'}
                  </span>
                </div>
                <h3 className="text-white font-bold text-base">{selectedSpot.name}</h3>
                <p className="text-gray-500 text-xs mt-0.5 flex items-center gap-1">
                  <Fish size={10} /> {selectedSpot.fish}
                </p>
              </div>
              <button onClick={() => setSelectedSpot(null)}>
                <X size={16} color="#4b5563" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: Navigation, label: 'Rating', value: `${selectedSpot.rating} ★` },
                { icon: Wind, label: 'Wind', value: '8 kn' },
                { icon: Thermometer, label: 'Water', value: '72°F' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="rounded-xl p-2.5 text-center" style={{ background: '#0d1117' }}>
                  <p className="text-gray-600 text-xs mb-1">{label}</p>
                  <p className="text-white text-xs font-bold">{value}</p>
                </div>
              ))}
            </div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              className="w-full mt-3 py-2.5 rounded-xl font-black text-xs tracking-widest uppercase"
              style={{ background: '#00FF88', color: '#0A0C10' }}
            >
              Navigate to Spot
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
