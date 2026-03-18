import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Package, CloudRain } from 'lucide-react'
import ProgressBar from '../components/ProgressBar'

const challenges = [
  {
    id: 'location',
    label: "I don't know where to fish",
    icon: MapPin,
    hot: true,
  },
  {
    id: 'gear',
    label: 'Wrong gear for the species',
    icon: Package,
    hot: false,
  },
  {
    id: 'weather',
    label: 'Weather & Tide predictions',
    icon: CloudRain,
    hot: false,
  },
]

export default function QuizChallenge({ onNext, onBack, step, totalSteps }) {
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
          What is your biggest challenge right now?
        </h2>
        <p className="text-gray-500 text-sm">
          Understanding your struggle helps us unlock the right tools for you.
        </p>
      </div>

      <div className="flex flex-col gap-3 flex-1">
        {challenges.map(({ id, label, icon: Icon, hot }) => (
          <motion.button
            key={id}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelected(id)}
            className="w-full flex items-center gap-4 px-5 py-4 rounded-xl text-left transition-all"
            style={{
              background: selected === id ? 'rgba(0,255,136,0.08)' : '#141820',
              border: `1.5px solid ${selected === id ? '#00FF88' : '#1e2530'}`,
            }}
          >
            <Icon size={18} color={selected === id ? '#00FF88' : '#4b5563'} strokeWidth={1.5} />
            <span className="font-semibold text-sm flex-1" style={{ color: selected === id ? '#00FF88' : '#e5e7eb' }}>
              {label}
            </span>
            {hot && (
              <span className="text-xs font-black px-2 py-0.5 rounded" style={{ background: '#ff4444', color: 'white' }}>
                HOT
              </span>
            )}
          </motion.button>
        ))}
      </div>

      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => selected && onNext({ challenge: selected })}
        className="w-full py-4 rounded-xl font-black text-sm tracking-widest uppercase mt-6 transition-all"
        style={{
          background: selected ? '#00FF88' : '#1e2530',
          color: selected ? '#0A0C10' : '#4b5563',
          cursor: selected ? 'pointer' : 'not-allowed',
        }}
      >
        Analyze My Profile
      </motion.button>
    </motion.div>
  )
}
