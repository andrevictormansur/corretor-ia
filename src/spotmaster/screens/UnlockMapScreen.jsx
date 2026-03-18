import { motion } from 'framer-motion'
import { Shield, Satellite, Trophy, MapPin } from 'lucide-react'

const features = [
  { icon: MapPin, title: 'Secret Locations', desc: 'Crowd-free zones only accessible to Pro members.' },
  { icon: Satellite, title: 'Live Satellite Feeds', desc: 'Real-time activity and temperature data.' },
  { icon: Trophy, title: 'Monthly Tournament Entry', desc: 'Compete for $5K+ in gear every month.' },
]

export default function UnlockMapScreen({ onNext }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col"
      style={{ background: '#0A0C10' }}
    >
      {/* Hero image */}
      <div
        className="h-56 relative flex-shrink-0"
        style={{
          background: 'linear-gradient(180deg, #1a2e22 0%, #0A0C10 100%)',
          overflow: 'hidden',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1545450396-7e3aef2df7e9?w=800&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.5,
          }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 40%, #0A0C10 100%)' }} />
      </div>

      <div className="px-6 pb-10 flex-1 flex flex-col">
        <h2 className="text-white text-2xl font-black leading-tight mb-1">
          UNLOCK THE MAP
        </h2>
        <p className="text-sm font-semibold mb-6" style={{ color: '#00FF88' }}>
          Elite access to the world's best spots.
        </p>

        {/* Features */}
        <div className="space-y-4 mb-8">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex gap-3 items-start">
              <div className="p-2 rounded-lg mt-0.5 flex-shrink-0" style={{ background: 'rgba(0,255,136,0.1)', border: '1px solid rgba(0,255,136,0.2)' }}>
                <Icon size={14} color="#00FF88" />
              </div>
              <div>
                <p className="text-white text-sm font-bold">{title}</p>
                <p className="text-gray-500 text-xs mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing */}
        <div className="rounded-xl p-4 mb-4 flex items-center justify-between" style={{ background: '#141820', border: '1.5px solid #1e2530' }}>
          <div>
            <div className="text-xs font-bold px-2 py-0.5 rounded mb-2 inline-block" style={{ background: '#00FF88', color: '#0A0C10' }}>
              MOST POPULAR
            </div>
            <p className="text-white font-black text-lg">SPOTMASTER PRO</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-black" style={{ color: '#00FF88' }}>$29</p>
            <p className="text-gray-500 text-xs">/mo</p>
          </div>
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onNext}
          className="w-full py-4 rounded-xl font-black text-sm tracking-widest uppercase mb-3"
          style={{ background: '#00FF88', color: '#0A0C10' }}
        >
          Start My Elite Plan
        </motion.button>

        <div className="flex items-center justify-center gap-2">
          <Shield size={12} color="#4b5563" />
          <p className="text-gray-600 text-xs">Secure checkout. Cancel anytime.</p>
        </div>
        <p className="text-gray-700 text-xs text-center mt-1">Terms of Service & Privacy Policy</p>
      </div>
    </motion.div>
  )
}
