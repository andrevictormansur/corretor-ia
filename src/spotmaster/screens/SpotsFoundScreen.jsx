import { motion } from 'framer-motion'
import { Target, Heart } from 'lucide-react'

export default function SpotsFoundScreen({ onNext, answers }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center px-8"
      style={{ background: '#0A0C10' }}
    >
      {/* Icon */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="mb-8"
      >
        <div className="relative">
          <div className="p-6 rounded-full" style={{ background: 'rgba(0,255,136,0.1)', border: '2px solid rgba(0,255,136,0.3)' }}>
            <Target size={48} color="#00FF88" strokeWidth={1.5} />
          </div>
          <motion.div
            className="absolute -top-1 -right-1 p-1.5 rounded-full"
            style={{ background: '#00FF88' }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Heart size={10} color="#0A0C10" fill="#0A0C10" />
          </motion.div>
        </div>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-white text-2xl font-bold mb-6"
      >
        Spots Found!
      </motion.h2>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex gap-10 mb-8"
      >
        <div className="text-center">
          <p className="text-4xl font-black" style={{ color: '#00FF88' }}>142</p>
          <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Total Spots</p>
        </div>
        <div className="w-px" style={{ background: '#1e2530' }} />
        <div className="text-center">
          <p className="text-4xl font-black" style={{ color: '#00FF88' }}>87</p>
          <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Active Now</p>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-gray-400 text-sm text-center mb-12 max-w-xs"
      >
        We've unlocked a high-density cluster of private and hidden spots in the{' '}
        <span style={{ color: '#00FF88' }}>{answers?.region || 'Northeast'}</span> region ready for you.
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        whileTap={{ scale: 0.97 }}
        onClick={onNext}
        className="w-full py-4 rounded-xl font-black text-sm tracking-widest uppercase"
        style={{ background: '#00FF88', color: '#0A0C10' }}
      >
        See My Map
      </motion.button>
    </motion.div>
  )
}
