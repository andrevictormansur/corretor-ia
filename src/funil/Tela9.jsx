import { useEffect, useState } from 'react'

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

// Tela 9 — Diagnóstico
export default function Tela9({ resultado, curso, onContinue }) {
  const { nota_total, pontos_fracos = [], ponto_forte } = resultado
  const meta = 920

  return (
    <div className="funil-screen px-5 pt-8 pb-12">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-0.5 bg-gray-100 z-50">
        <div className="h-full bg-brand-600" style={{ width: '81%' }} />
      </div>

      {/* Logo */}
      <div className="mb-6 text-center">
        <span className="text-lg font-extrabold text-brand-600">
          Corretor<span className="text-gray-900">IA</span>
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

        {/* What we found */}
        <div className="card p-4">
          <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">
            O que encontramos
          </h3>
          {ponto_forte && (
            <div className="mb-2 flex items-start gap-2.5 rounded-xl bg-green-50 px-3 py-3 ring-1 ring-green-100">
              <span className="mt-px text-base leading-none">✅</span>
              <p className="text-sm font-semibold text-green-800">{ponto_forte}</p>
            </div>
          )}
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
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/75 backdrop-blur-[1px]">
            <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-100">
              <span className="text-xl">🔒</span>
            </div>
            <p className="text-sm font-extrabold text-gray-800">Análise completa bloqueada</p>
            <p className="mt-0.5 text-xs text-gray-500">Notas por competência + feedback detalhado</p>
          </div>
        </div>

        {/* Personalized question */}
        <div className="card p-4 text-center space-y-3">
          <p className="text-base font-bold text-gray-900">
            Quer chegar a <span className="text-brand-600">{meta}+</span> para garantir sua vaga em{' '}
            <span className="text-brand-600">{curso}</span>?
          </p>
          <div className="flex gap-3">
            <button
              onClick={onContinue}
              className="flex-1 rounded-xl bg-brand-600 py-3 text-sm font-bold text-white transition hover:bg-brand-700 active:scale-95"
            >
              Sim, quero! 🚀
            </button>
            <button
              onClick={onContinue}
              className="flex-1 rounded-xl border-2 border-gray-200 py-3 text-sm font-bold text-gray-600 transition hover:border-gray-300 active:scale-95"
            >
              Talvez depois
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
