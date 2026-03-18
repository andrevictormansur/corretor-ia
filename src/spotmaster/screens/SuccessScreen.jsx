import { motion } from 'framer-motion'
import { Lock, ArrowRight, PartyPopper } from 'lucide-react'

export default function SuccessScreen({ answers, onEnter }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col items-center justify-center px-8 text-center"
      style={{ background: '#0A0C10' }}
    >
      {/* Celebration icon */}
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 180, delay: 0.1 }}
        className="mb-8"
      >
        <div
          className="p-7 rounded-3xl"
          style={{
            background: 'rgba(0,255,136,0.08)',
            border: '2px solid rgba(0,255,136,0.3)',
          }}
        >
          <PartyPopper size={52} color="#00FF88" strokeWidth={1.5} />
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-white text-3xl font-black mb-4"
      >
        WELCOME ABOARD
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-gray-400 text-sm mb-10 leading-relaxed max-w-xs"
      >
        Your SpotMaster Pro account is now active. We've unlocked{' '}
        <span className="text-white font-bold">142 secret spots</span> near your location.
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        whileTap={{ scale: 0.97 }}
        className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 mb-4"
        style={{ border: '1.5px solid rgba(0,255,136,0.4)', color: '#00FF88' }}
      >
        <Lock size={15} />
        Full Access Granted
      </motion.button>

      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        whileTap={{ scale: 0.97 }}
        onClick={onEnter}
        className="w-full py-4 rounded-xl font-black text-sm tracking-widest uppercase flex items-center justify-center gap-2"
        style={{ background: '#00FF88', color: '#0A0C10' }}
      >
        Start Fishing Now <ArrowRight size={16} />
      </motion.button>
    </motion.div>
  )
}
