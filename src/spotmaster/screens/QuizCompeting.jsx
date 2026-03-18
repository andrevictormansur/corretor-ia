import { useState } from 'react'
import { motion } from 'framer-motion'
import { Swords, User } from 'lucide-react'
import ProgressBar from '../components/ProgressBar'

const options = [
  {
    id: 'yes',
    icon: Swords,
    label: 'Yes, lead the ranking',
    desc: 'Join the elite leaderboard and win gear.',
  },
  {
    id: 'no',
    icon: User,
    label: 'No, I fish solo',
    desc: 'Just give me the data and secret spots.',
  },
]

export default function QuizCompeting({ onNext, onBack, step, totalSteps }) {
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
          Do you enjoy competing?
        </h2>
        <p className="text-gray-500 text-sm">
          Our community thrives on friendly competition for monthly prizes.
        </p>
      </div>

      <div className="flex flex-col gap-4 flex-1">
        {options.map(({ id, icon: Icon, label, desc }) => (
          <motion.button
            key={id}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelected(id)}
            className="w-full flex items-center gap-5 px-6 py-6 rounded-xl text-left transition-all"
            style={{
              background: selected === id ? 'rgba(0,255,136,0.08)' : '#141820',
              border: `1.5px solid ${selected === id ? '#00FF88' : '#1e2530'}`,
            }}
          >
            <div className="p-3 rounded-full" style={{ border: `1.5px solid ${selected === id ? '#00FF88' : '#2d3748'}` }}>
              <Icon size={22} color={selected === id ? '#00FF88' : '#4b5563'} strokeWidth={1.5} />
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
        onClick={() => selected && onNext({ competing: selected })}
        className="w-full py-4 rounded-xl font-black text-sm tracking-widest uppercase mt-6 transition-all"
        style={{
          background: selected ? '#00FF88' : '#1e2530',
          color: selected ? '#0A0C10' : '#4b5563',
          cursor: selected ? 'pointer' : 'not-allowed',
        }}
      >
        Generate My Plan
      </motion.button>
    </motion.div>
  )
}
