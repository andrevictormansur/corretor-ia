import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Circle } from 'lucide-react'

const steps = [
  'Syncing high-resolution satellite feed',
  'Analyzing barometric pressure spikes',
  'Calibrating Northeast secret hotspots',
]

export default function MappingScreen({ onNext, answers }) {
  const [checkedSteps, setCheckedSteps] = useState([])

  useEffect(() => {
    // Reveal checkmarks with delay
    steps.forEach((_, i) => {
      setTimeout(() => {
        setCheckedSteps((prev) => [...prev, i])
      }, 1200 + i * 1000)
    })
    // Auto-advance after all steps complete
    setTimeout(() => {
      onNext()
    }, 4800)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center px-8"
      style={{ background: '#0A0C10' }}
    >
      {/* Radar */}
      <div className="relative mb-12" style={{ width: 200, height: 200 }}>
        {/* Outer rings */}
        {[1, 0.75, 0.5].map((scale, i) => (
          <div
            key={i}
            className="absolute inset-0 rounded-full"
            style={{
              border: '1px solid rgba(0,255,136,0.15)',
              transform: `scale(${scale})`,
              top: `${(1 - scale) * 50}%`,
              left: `${(1 - scale) * 50}%`,
              width: `${scale * 100}%`,
              height: `${scale * 100}%`,
            }}
          />
        ))}
        {/* Pulse rings */}
        {[0, 1].map((i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-full"
            style={{ border: '1.5px solid rgba(0,255,136,0.5)' }}
            initial={{ scale: 0.3, opacity: 0.8 }}
            animate={{ scale: 1.1, opacity: 0 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 1,
              ease: 'easeOut',
            }}
          />
        ))}
        {/* Rotating sweep */}
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '50% 50%' }}
        >
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '50%',
              height: '2px',
              transformOrigin: '0% 50%',
              background: 'linear-gradient(90deg, rgba(0,255,136,0.6), transparent)',
            }}
          />
        </motion.div>
        {/* Center dot */}
        <div
          className="absolute rounded-full"
          style={{
            width: 8,
            height: 8,
            background: '#00FF88',
            top: 'calc(50% - 4px)',
            left: 'calc(50% - 4px)',
            boxShadow: '0 0 12px #00FF88',
          }}
        />
        {/* Blip dots */}
        <motion.div
          className="absolute rounded-full"
          style={{ width: 6, height: 6, background: '#00FF88', top: '25%', left: '65%', boxShadow: '0 0 8px #00FF88' }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{ width: 5, height: 5, background: '#00FF88', top: '60%', left: '30%', boxShadow: '0 0 8px #00FF88' }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 1.2 }}
        />
      </div>

      <h2 className="text-white text-xl font-bold mb-8">Mapping exclusive spots...</h2>

      <div className="w-full max-w-xs space-y-4">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 + i * 0.3 }}
            className="flex items-center gap-3"
          >
            {checkedSteps.includes(i) ? (
              <CheckCircle2 size={18} color="#00FF88" />
            ) : (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                <Circle size={18} color="#2d3748" />
              </motion.div>
            )}
            <span
              className="text-sm transition-all duration-500"
              style={{ color: checkedSteps.includes(i) ? '#e5e7eb' : '#4b5563' }}
            >
              {step}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
