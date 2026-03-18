import { useEffect, useState } from 'react'

const MESSAGES = [
  'Analisando domínio da norma culta…',
  'Verificando adequação ao tema…',
  'Avaliando argumentação…',
  'Checando coesão e coerência…',
  'Calculando proposta de intervenção…',
  'Gerando diagnóstico personalizado…',
]

// Tela 8 — Loading
export default function Tela8() {
  const [msgIdx, setMsgIdx] = useState(0)
  const [progress, setProgress] = useState(5)

  useEffect(() => {
    const msgTimer = setInterval(() => {
      setMsgIdx((i) => (i + 1) % MESSAGES.length)
    }, 2800)
    return () => clearInterval(msgTimer)
  }, [])

  useEffect(() => {
    const target = 92
    const step = () => {
      setProgress((p) => {
        if (p >= target) return p
        const inc = p < 60 ? 3 : p < 80 ? 1.5 : 0.5
        return Math.min(target, p + inc)
      })
    }
    const t = setInterval(step, 200)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="funil-screen flex flex-col items-center justify-center px-5 py-12 bg-white">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-0.5 bg-gray-100 z-50">
        <div className="h-full bg-brand-600" style={{ width: '72%' }} />
      </div>

      <div className="funil-enter flex flex-col items-center text-center space-y-8 w-full">
        {/* Spinner */}
        <div className="relative h-20 w-20">
          <div className="absolute inset-0 rounded-full border-4 border-gray-100" />
          <div className="absolute inset-0 rounded-full border-4 border-brand-600 border-t-transparent animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl">📝</span>
          </div>
        </div>

        <div className="space-y-2 w-full">
          <p className="text-lg font-extrabold text-gray-900">
            Corrigindo sua redação…
          </p>
          <p className="text-sm text-brand-600 font-medium h-5 transition-all">
            {MESSAGES[msgIdx]}
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full space-y-1.5">
          <div className="h-2 w-full rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-brand-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-right text-xs text-gray-400">{Math.round(progress)}%</p>
        </div>

        <p className="text-xs text-gray-400">
          Baseado nos critérios oficiais do ENEM 2024
        </p>
      </div>
    </div>
  )
}
