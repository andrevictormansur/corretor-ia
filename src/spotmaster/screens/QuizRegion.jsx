import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import ProgressBar from '../components/ProgressBar'

const regions = ['Northeast', 'Southeast', 'Midwest', 'West Coast', 'Alaska / Hawaii']

export default function QuizRegion({ onNext, onBack, step, totalSteps }) {
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
          Which region do you typically fish?
        </h2>
        <p className="text-gray-500 text-sm">
          We use this to calibrate our local satellite data and migration patterns.
        </p>
      </div>

      <div className="flex flex-col gap-3 flex-1">
        {regions.map((region) => (
          <motion.button
            key={region}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelected(region)}
            className="w-full flex items-center justify-between px-5 py-4 rounded-xl text-left transition-all"
            style={{
              background: selected === region ? 'rgba(0,255,136,0.1)' : '#141820',
              border: `1.5px solid ${selected === region ? '#00FF88' : '#1e2530'}`,
              color: selected === region ? '#00FF88' : '#9ca3af',
            }}
          >
            <span className="font-medium text-sm">{region}</span>
            <ChevronRight size={16} />
          </motion.button>
        ))}
      </div>

      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => selected && onNext({ region: selected })}
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
