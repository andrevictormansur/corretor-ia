import { useState } from 'react'
import { motion } from 'framer-motion'
import { Waves, Anchor, Wind, Ship } from 'lucide-react'
import ProgressBar from '../components/ProgressBar'

const styles = [
  { id: 'freshwater', label: 'Fresh Water', icon: Waves },
  { id: 'saltwater', label: 'Salt Water', icon: Anchor },
  { id: 'flyfishing', label: 'Fly Fishing', icon: Wind },
  { id: 'kayak', label: 'Kayak', icon: Ship },
]

export default function QuizStyle({ onNext, onBack, step, totalSteps }) {
  const [selected, setSelected] = useState(null)

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      className="min-h-screen flex flex-col px-6 pt-6 pb-10"
      style={{ background: '#0A0C10' }}
    >
      <ProgressBar step={step} total={totalSteps} onBack={onBack} />

      <div className="mt-8 mb-6">
        <h2 className="text-white text-2xl font-bold leading-tight mb-2">
          What is your primary fishing style?
        </h2>
        <p className="text-gray-500 text-sm">
          This helps us recommend specific gear and species-specific secrets.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 flex-1">
        {styles.map(({ id, label, icon: Icon }) => (
          <motion.button
            key={id}
            whileTap={{ scale: 0.97 }}
            onClick={() => setSelected(id)}
            className="flex flex-col items-center justify-center gap-3 py-8 rounded-xl transition-all"
            style={{
              background: selected === id ? 'rgba(0,255,136,0.1)' : '#141820',
              border: `1.5px solid ${selected === id ? '#00FF88' : '#1e2530'}`,
            }}
          >
            <Icon size={28} color={selected === id ? '#00FF88' : '#4b5563'} strokeWidth={1.5} />
            <span className="text-sm font-semibold" style={{ color: selected === id ? '#00FF88' : '#9ca3af' }}>
              {label}
            </span>
          </motion.button>
        ))}
      </div>

      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => selected && onNext({ style: selected })}
        className="w-full py-4 rounded-xl font-black text-sm tracking-widest uppercase mt-6 transition-all"
        style={{
          background: selected ? '#00FF88' : '#1e2530',
          color: selected ? '#0A0C10' : '#4b5563',
          cursor: selected ? 'pointer' : 'not-allowed',
        }}
      >
        Continue
      </motion.button>
    </motion.div>
  )
}
