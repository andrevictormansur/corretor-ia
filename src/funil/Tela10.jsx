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

// Tela 10 — Reta Final (dark urgency)
export default function Tela10({ onContinue }) {
  const daysLeft = useDaysLeft()

  return (
    <div className="funil-screen flex flex-col items-center justify-center px-5 py-12 bg-gray-950 text-white">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-0.5 bg-gray-800 z-50">
        <div className="h-full bg-brand-500" style={{ width: '90%' }} />
      </div>

      <div className="funil-enter flex flex-col items-center text-center space-y-7 w-full">
        <div className="space-y-2">
          <div className="inline-block rounded-full bg-brand-600/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-400">
            ⚡ Reta Final ENEM 2026
          </div>
          <h1 className="text-3xl font-black leading-tight">
            Você tem{' '}
            <span className="text-brand-400">{daysLeft} dias</span>
            <br />para virar o jogo
          </h1>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 w-full">
          {[
            { value: '+180pts', label: 'ganho médio em 60 dias', icon: '📈' },
            { value: '92%',     label: 'dos alunos melhoram', icon: '🎯' },
            { value: '30seg',   label: 'por correção com IA', icon: '⚡' },
          ].map((s) => (
            <div key={s.value} className="rounded-2xl bg-gray-800/60 px-2 py-4 ring-1 ring-gray-700 space-y-1">
              <div className="text-lg">{s.icon}</div>
              <div className="text-lg font-black text-white">{s.value}</div>
              <div className="text-xs text-gray-400 leading-tight">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl bg-brand-600/20 px-5 py-4 ring-1 ring-brand-600/40 w-full">
          <p className="text-sm font-semibold text-brand-200 leading-relaxed">
            Candidatos que treinam redação com feedback de IA nas últimas semanas chegam até{' '}
            <span className="font-black text-white">+200 pontos</span> acima da média.
          </p>
        </div>

        <div className="space-y-2 w-full pt-1">
          <button
            onClick={onContinue}
            className="w-full rounded-2xl bg-brand-600 px-6 py-4 text-base font-bold text-white shadow-lg transition-all hover:bg-brand-500 active:scale-95"
          >
            Quero garantir minha vaga →
          </button>
          <p className="text-xs text-gray-500">
            Plano anual por menos de R$15/mês • cancele quando quiser
          </p>
        </div>
      </div>
    </div>
  )
}
