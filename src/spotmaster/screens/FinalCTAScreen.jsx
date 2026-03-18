import { motion } from 'framer-motion'
import { Clock, Star, X } from 'lucide-react'

export default function FinalCTAScreen({ onNext, onSkip, answers }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col px-6 pb-10"
      style={{ background: '#0A0C10' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between pt-6 pb-6">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: 'rgba(0,255,136,0.1)', border: '1px solid rgba(0,255,136,0.3)' }}>
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#00FF88' }} />
          <span className="text-xs font-bold" style={{ color: '#00FF88' }}>ONLY 12 SLOTS LEFT TODAY</span>
        </div>
        <button onClick={onSkip}>
          <X size={18} color="#4b5563" />
        </button>
      </div>

      {/* Headline */}
      <div className="mb-8">
        <h1 className="text-white text-4xl font-black leading-none mb-1">DON'T LEAVE</h1>
        <h1 className="text-4xl font-black leading-none mb-4" style={{ color: '#00FF88' }}>IT TO CHANCE</h1>
        <p className="text-gray-500 text-sm">
          The best spots are being claimed in your region right now.
        </p>
      </div>

      {/* Social proof */}
      <div className="rounded-xl p-4 mb-6" style={{ background: '#141820', border: '1.5px solid #1e2530' }}>
        <div className="flex items-center gap-3 mb-3">
          <div className="flex -space-x-2">
            {['#00FF88', '#3b82f6', '#f59e0b'].map((color, i) => (
              <div key={i} className="w-7 h-7 rounded-full border-2 border-gray-900" style={{ background: color }} />
            ))}
          </div>
          <span className="text-xs text-gray-400">+2,482 active in {answers?.region || 'Northeast'}</span>
        </div>
        <div className="flex gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={12} fill="#00FF88" color="#00FF88" />
          ))}
        </div>
        <p className="text-gray-400 text-xs italic leading-relaxed">
          "Caught a 40lb Bass at a spot I didn't even know existed within 30 minutes. Worth every penny."
        </p>
      </div>

      <div className="flex-1" />

      {/* CTA */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={onNext}
        className="w-full py-4 rounded-xl font-black text-sm tracking-widest uppercase mb-3"
        style={{ background: '#00FF88', color: '#0A0C10' }}
      >
        Claim My Secret Map
      </motion.button>
      <p className="text-gray-600 text-xs text-center">$29 / month · Billed monthly, cancel anytime</p>
    </motion.div>
  )
}
