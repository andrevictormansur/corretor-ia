import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sprout, Fish, Trophy } from 'lucide-react'
import ProgressBar from '../components/ProgressBar'

const levels = [
  {
    id: 'beginner',
    label: 'Beginner',
    desc: 'Learning the basics and gear setup.',
    icon: Sprout,
  },
  {
    id: 'intermediate',
    label: 'Intermediate',
    desc: 'Fishes regularly, knows a few local spots.',
    icon: Fish,
  },
  {
    id: 'pro',
    label: 'Pro / Tournament',
    desc: 'Lives for the catch. Competes for the best.',
    icon: Trophy,
  },
]

export default function QuizExperience({ onNext, onBack, step, totalSteps }) {
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
          What's your experience level?
        </h2>
        <p className="text-gray-500 text-sm">
          We'll adjust the complexity of our reports to match your skills.
        </p>
      </div>

      <div className="flex flex-col gap-3 flex-1">
        {levels.map(({ id, label, desc, icon: Icon }) => (
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
            <div className="p-2.5 rounded-lg flex-shrink-0" style={{ background: selected === id ? 'rgba(0,255,136,0.15)' : '#1e2530' }}>
              <Icon size={20} color={selected === id ? '#00FF88' : '#4b5563'} strokeWidth={1.5} />
            </div>
            <div>
              <p className="font-bold text-sm" style={{ color: selected === id ? '#00FF88' : 'white' }}>{label}</p>
              <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
            </div>
          </motion.button>
        ))}
      </div>

      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => selected && onNext({ experience: selected })}
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
