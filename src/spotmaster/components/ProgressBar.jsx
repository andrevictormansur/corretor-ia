import { ChevronLeft, X } from 'lucide-react'

export default function ProgressBar({ step, total, onBack, onClose }) {
  const progress = (step / total) * 100

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-gray-500 text-xs font-semibold tracking-widest uppercase">
          Step {String(step).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
        {onBack && step > 1 ? (
          <button onClick={onBack} className="flex items-center gap-1 text-gray-500 text-xs">
            <ChevronLeft size={14} /> Back
          </button>
        ) : onClose ? (
          <button onClick={onClose}>
            <X size={16} color="#4b5563" />
          </button>
        ) : <div />}
      </div>

      <div className="w-full h-1 rounded-full" style={{ background: '#1e2530' }}>
        <div
          className="h-1 rounded-full transition-all duration-500"
          style={{ width: `${progress}%`, background: '#00FF88' }}
        />
      </div>
    </div>
  )
}
