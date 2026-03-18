import { useEffect, useState } from 'react'

const ENEM_DATE = new Date('2026-11-08')

function useDaysLeft() {
  const [days, setDays] = useState(0)
  useEffect(() => {
    const calc = () => setDays(Math.max(0, Math.ceil((ENEM_DATE - new Date()) / 86400000)))
    calc()
    const t = setInterval(calc, 60000)
    return () => clearInterval(t)
  }, [])
  return days
}

// Tela 2 — Countdown (dark) — shown only if "Este ano"
export default function Tela2({ onContinue }) {
  const daysLeft = useDaysLeft()

  return (
    <div className="funil-screen flex flex-col items-center justify-center px-5 py-12 bg-gray-950 text-white">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-0.5 bg-gray-800 z-50">
        <div className="h-full bg-brand-500" style={{ width: '18%' }} />
      </div>

      <div className="funil-enter flex flex-col items-center text-center space-y-8 w-full">
        <div className="space-y-2">
          <p className="text-sm font-bold uppercase tracking-widest text-brand-400">
            ENEM 2026 — Redação
          </p>
          <h1 className="text-5xl font-black tabular-nums leading-none">
            {daysLeft}
          </h1>
          <p className="text-xl font-semibold text-gray-300">
            dias restantes
          </p>
        </div>

        <div className="rounded-2xl bg-gray-800/60 px-6 py-5 ring-1 ring-gray-700 w-full">
          <p className="text-sm text-gray-300 leading-relaxed">
            <span className="font-bold text-white">8 de novembro de 2026.</span>
            {' '}Cada dia conta. Candidatos que treinam redação consistentemente
            tiram em média <span className="font-bold text-brand-400">+180 pontos</span> a mais
            do que quem não treina.
          </p>
        </div>

        <div className="space-y-2 w-full pt-2">
          <button
            onClick={onContinue}
            className="w-full rounded-2xl bg-brand-600 px-6 py-4 text-base font-bold text-white shadow-lg transition-all hover:bg-brand-500 active:scale-95"
          >
            Quero aproveitar esse tempo →
          </button>
          <p className="text-xs text-gray-500 text-center">
            Correção gratuita • sem cadastro
          </p>
        </div>
      </div>
    </div>
  )
}
