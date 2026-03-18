import { useEffect, useState } from 'react'

// ENEM 2026 — redação: 8 de novembro de 2026
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

function ScoreCounter({ nota }) {
  const [displayed, setDisplayed] = useState(0)

  useEffect(() => {
    let current = 0
    const step = Math.max(1, Math.ceil(nota / 50))
    const t = setInterval(() => {
      current += step
      if (current >= nota) { setDisplayed(nota); clearInterval(t) }
      else setDisplayed(current)
    }, 25)
    return () => clearInterval(t)
  }, [nota])

  const color =
    nota < 500 ? '#ef4444' :
    nota < 700 ? '#f59e0b' :
    nota < 850 ? '#7c3aed' : '#16a34a'

  const label =
    nota < 500 ? 'Precisa de atenção' :
    nota < 700 ? 'Na média' :
    nota < 850 ? 'Acima da média' : 'Excelente!'

  return (
    <div className="text-center">
      <p className="mb-1 text-xs font-bold uppercase tracking-widest text-gray-400">
        Sua nota hoje
      </p>
      <div className="text-8xl font-black leading-none tabular-nums" style={{ color }}>
        {displayed}
      </div>
      <div className="mt-1 text-base font-semibold text-gray-400">/1000</div>
      <div
        className="mt-3 inline-block rounded-full px-4 py-1 text-sm font-bold"
        style={{ backgroundColor: color + '18', color }}
      >
        {label}
      </div>
    </div>
  )
}

export default function DiagnosticoScreen({ resultado, onContinue }) {
  const daysLeft = useDaysLeft()
  const { nota_total, pontos_fracos = [], ponto_forte } = resultado

  return (
    <div className="funil-screen px-5 pt-8 pb-12">
      {/* Logo */}
      <div className="mb-6 text-center">
        <span className="text-lg font-extrabold text-brand-600">
          Approva<span className="text-gray-900">.AI</span>
        </span>
      </div>

      <div className="funil-enter space-y-4">

        {/* Score hero */}
        <div className="card overflow-hidden">
          <div className="bg-gradient-to-b from-gray-50 to-white px-6 py-7">
            <ScoreCounter nota={nota_total} />
          </div>
          <div className="border-t border-gray-100 px-4 py-3 text-center">
            <p className="text-sm text-gray-500">
              Essa é a nota que você tiraria <strong>HOJE</strong> no ENEM
            </p>
          </div>
        </div>

        {/* Countdown */}
        <div className="flex items-center justify-center gap-2 rounded-2xl bg-brand-50 px-4 py-3 ring-1 ring-brand-100">
          <span className="text-lg">⏰</span>
          <p className="text-sm font-bold text-brand-700">
            Faltam{' '}
            <span className="rounded-lg bg-brand-600 px-2 py-0.5 text-white">
              {daysLeft}
            </span>{' '}
            dias para o ENEM 2026
          </p>
        </div>

        {/* Pontos */}
        <div className="card p-4">
          <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">
            O que encontramos
          </h3>

          {/* Strong point */}
          {ponto_forte && (
            <div className="mb-2 flex items-start gap-2.5 rounded-xl bg-green-50 px-3 py-3 ring-1 ring-green-100">
              <span className="mt-px text-base leading-none">✅</span>
              <p className="text-sm font-semibold text-green-800">{ponto_forte}</p>
            </div>
          )}

          {/* Weak points */}
          <div className="space-y-2">
            {pontos_fracos.slice(0, 3).map((p, i) => (
              <div
                key={i}
                className="flex items-start gap-2.5 rounded-xl bg-red-50 px-3 py-3 ring-1 ring-red-100"
              >
                <span className="mt-px text-base leading-none">❌</span>
                <p className="text-sm font-semibold text-red-800">{p}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Blurred / locked section */}
        <div className="relative overflow-hidden rounded-2xl ring-1 ring-gray-100">
          {/* Blurred content underneath */}
          <div
            aria-hidden
            className="pointer-events-none select-none"
            style={{ filter: 'blur(4px)', opacity: 0.55 }}
          >
            <div className="bg-white p-4">
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">
                Análise por competência
              </p>
              <div className="space-y-2">
                {['C1 — Norma culta', 'C2 — Tema', 'C3 — Argumentação', 'C4 — Coesão', 'C5 — Proposta'].map((c) => (
                  <div key={c} className="flex items-center justify-between rounded-xl bg-gray-50 px-3 py-2.5">
                    <span className="text-sm font-medium text-gray-700">{c}</span>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-20 rounded-full bg-gray-200" />
                      <span className="text-sm font-bold text-gray-400">160/200</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 h-14 rounded-xl bg-gray-100" />
            </div>
          </div>

          {/* Lock overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/75 backdrop-blur-[1px]">
            <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-100">
              <span className="text-xl">🔒</span>
            </div>
            <p className="text-sm font-extrabold text-gray-800">Análise completa bloqueada</p>
            <p className="mt-0.5 text-xs text-gray-500">Notas por competência + feedback detalhado</p>
          </div>
        </div>

        {/* CTA */}
        <div className="space-y-2.5 pt-1">
          <button onClick={onContinue} className="btn-primary w-full text-base">
            Ver como chegar a 900+ →
          </button>
          <p className="text-center text-xs text-gray-400">
            Veja o plano e desbloqueie a análise completa
          </p>
        </div>

      </div>
    </div>
  )
}
