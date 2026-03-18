import { useEffect, useState } from 'react'

const MESSAGES = [
  'Lendo sua redação com atenção…',
  'Avaliando a Competência I — Língua Portuguesa…',
  'Avaliando a Competência II — Desenvolvimento do Tema…',
  'Avaliando a Competência III — Argumentação…',
  'Avaliando a Competência IV — Coesão e Coerência…',
  'Avaliando a Competência V — Proposta de Intervenção…',
  'Calculando notas e elaborando feedback…',
  'Finalizando sua correção…',
]

export default function LoadingScreen() {
  const [msgIndex, setMsgIndex] = useState(0)
  const [fade, setFade] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setMsgIndex((i) => (i + 1) % MESSAGES.length)
        setFade(true)
      }, 300)
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm text-center">
        {/* Spinner */}
        <div className="relative mx-auto mb-8 h-24 w-24">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-4 border-brand-100" />
          {/* Spinning arc */}
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-brand-600" style={{ animationDuration: '1s' }} />
          {/* Inner circle */}
          <div className="absolute inset-3 flex items-center justify-center rounded-full bg-brand-50">
            <svg className="h-8 w-8 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className="mb-2 text-xl font-bold text-gray-900">Corrigindo sua redação</h2>
        <p className="mb-6 text-sm text-gray-500">Aguarde enquanto a IA analisa seu texto…</p>

        {/* Animated message */}
        <div className="rounded-xl bg-brand-50 px-5 py-3.5">
          <p
            className="text-sm font-medium text-brand-700 transition-opacity duration-300"
            style={{ opacity: fade ? 1 : 0 }}
          >
            {MESSAGES[msgIndex]}
          </p>
        </div>

        {/* Progress dots */}
        <div className="mt-6 flex justify-center gap-1.5">
          {MESSAGES.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === msgIndex ? 'w-5 bg-brand-600' : 'w-1.5 bg-brand-200'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
