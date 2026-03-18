import { motion } from 'framer-motion'
import { Anchor, LogIn } from 'lucide-react'

export default function HomeScreen({ onStart }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col justify-between"
      style={{
        background: 'linear-gradient(180deg, #0A0C10 0%, #0d1f1a 100%)',
        backgroundImage: 'url("https://images.unsplash.com/photo-1542621334-a254cf47733d?w=800&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(10,12,16,0.3) 0%, rgba(10,12,16,0.85) 60%, #0A0C10 100%)' }} />

      <div className="relative z-10 flex flex-col h-screen justify-end pb-16 px-8">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <div className="p-1.5 rounded-lg" style={{ border: '1.5px solid #00FF88' }}>
            <Anchor size={16} color="#00FF88" />
          </div>
          <span className="text-white text-sm font-bold tracking-widest uppercase">SpotMaster Pro</span>
        </div>

        {/* Headline */}
        <h1 className="text-white text-4xl font-bold leading-tight mb-2">
          Stop searching,
        </h1>
        <h1 className="text-4xl font-bold leading-tight mb-4" style={{ color: '#00FF88' }}>
          start catching.
        </h1>

        <p className="text-gray-400 text-sm mb-10 leading-relaxed max-w-xs">
          Personalized secret spots, real-time satellite data, and tournament-grade intel.
        </p>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onStart}
          className="w-full py-4 rounded-xl font-black text-sm tracking-widest uppercase"
          style={{ background: '#00FF88', color: '#0A0C10' }}
        >
          Find My Spot
        </motion.button>

        <div className="flex items-center justify-center gap-1 mt-5">
          <span className="text-gray-500 text-xs">Already a member?</span>
          <button className="text-xs font-semibold flex items-center gap-1" style={{ color: '#00FF88' }}>
            <LogIn size={11} /> Sign In
          </button>
        </div>
      </div>
    </motion.div>
  )
}
