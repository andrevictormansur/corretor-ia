import { useState } from 'react'

const COMP_ORDER = ['c1', 'c2', 'c3', 'c4', 'c5']
const COMP_ICONS = ['📝', '💡', '🧠', '🔗', '🌟']
const COMP_NUMBERS = { c1: 1, c2: 2, c3: 3, c4: 4, c5: 5 }

function getScoreColor(nota, max = 200) {
  const pct = nota / max
  if (pct === 0)   return { bg: 'bg-red-100',    text: 'text-red-700',    ring: 'ring-red-200',    bar: 'bg-red-400',    label: 'Insuficiente' }
  if (pct <= 0.2)  return { bg: 'bg-red-50',     text: 'text-red-600',    ring: 'ring-red-100',    bar: 'bg-red-400',    label: 'Muito fraco' }
  if (pct <= 0.4)  return { bg: 'bg-orange-50',  text: 'text-orange-600', ring: 'ring-orange-100', bar: 'bg-orange-400', label: 'Fraco' }
  if (pct <= 0.6)  return { bg: 'bg-amber-50',   text: 'text-amber-600',  ring: 'ring-amber-100',  bar: 'bg-amber-400',  label: 'Regular' }
  if (pct <= 0.8)  return { bg: 'bg-blue-50',    text: 'text-blue-600',   ring: 'ring-blue-100',   bar: 'bg-blue-500',   label: 'Bom' }
  return             { bg: 'bg-green-50',   text: 'text-green-600',  ring: 'ring-green-100',  bar: 'bg-green-500',  label: 'Excelente' }
}

function getTotalColor(nota) {
  if (nota < 400)  return { text: 'text-red-600',    label: 'Precisa melhorar muito', bg: 'bg-red-50' }
  if (nota < 600)  return { text: 'text-orange-500', label: 'Abaixo da média',        bg: 'bg-orange-50' }
  if (nota < 700)  return { text: 'text-amber-500',  label: 'Na média',               bg: 'bg-amber-50' }
  if (nota < 800)  return { text: 'text-blue-600',   label: 'Acima da média',         bg: 'bg-blue-50' }
  if (nota < 900)  return { text: 'text-brand-600',  label: 'Muito bom!',             bg: 'bg-brand-50' }
  return             { text: 'text-green-600',  label: 'Excelente!',             bg: 'bg-green-50' }
}

function ScoreRing({ nota, max = 1000 }) {
  const radius = 54
  const circumference = 2 * Math.PI * radius
  const dashOffset = circumference * (1 - nota / max)
  const { text } = getTotalColor(nota)

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="140" height="140" viewBox="0 0 140 140" className="-rotate-90">
        <circle cx="70" cy="70" r={radius} fill="none" stroke="#e9d5ff" strokeWidth="10" />
        <circle
          cx="70" cy="70" r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          className={text}
          ref={(el) => {
            if (el) {
              el.style.strokeDashoffset = circumference
              setTimeout(() => {
                el.style.transition = 'stroke-dashoffset 1.2s ease-out'
                el.style.strokeDashoffset = dashOffset
              }, 80)
            }
          }}
        />
      </svg>
      <div className="absolute text-center">
        <span className={`block text-3xl font-extrabold leading-none ${text}`}>{nota}</span>
        <span className="block text-xs font-medium text-gray-400">de 1000</span>
      </div>
    </div>
  )
}

function CompetencyCard({ keyName, competencia, index }) {
  const [open, setOpen] = useState(true)
  const colors = getScoreColor(competencia.nota)
  const pct = (competencia.nota / 200) * 100

  return (
    <div className={`card overflow-hidden ring-1 ${colors.ring}`}>
      <button
        className="flex w-full items-start gap-3 p-4 text-left transition-colors hover:bg-gray-50/80"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="mt-0.5 text-xl leading-none">{COMP_ICONS[index]}</span>
        <div className="min-w-0 flex-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            Competência {COMP_NUMBERS[keyName]}
          </span>
          <p className="mt-0.5 text-sm font-semibold leading-snug text-gray-800">
            {competencia.titulo}
          </p>
          <div className="mt-2 flex items-center gap-2">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-100">
              <div
                className={`h-full rounded-full transition-all duration-700 ease-out ${colors.bar}`}
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="shrink-0 text-xs text-gray-400">{pct.toFixed(0)}%</span>
          </div>
        </div>
        <div className={`shrink-0 rounded-xl px-3 py-1.5 text-center ring-1 ${colors.bg} ${colors.ring}`}>
          <span className={`block text-lg font-extrabold leading-none ${colors.text}`}>{competencia.nota}</span>
          <span className={`block text-[10px] font-semibold opacity-80 ${colors.text}`}>/ 200</span>
        </div>
        <svg
          className={`mt-1 h-4 w-4 shrink-0 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="border-t border-gray-100 px-4 pb-4 pt-3">
          <span className={`mb-2 inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ${colors.bg} ${colors.text} ${colors.ring}`}>
            {colors.label}
          </span>
          <p className="text-sm leading-relaxed text-gray-600">{competencia.feedback}</p>
        </div>
      )}
    </div>
  )
}

export default function ResultScreen({ resultado, onReset }) {
  const totalColors = getTotalColor(resultado.nota_total)
  const comps = resultado.competencias

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-8">
      {/* Header */}
      <div className="mb-6 text-center">
        <span className="text-sm font-semibold uppercase tracking-wider text-brand-600">
          Resultado da Correção
        </span>
        <h1 className="mt-1 text-2xl font-bold text-gray-900">Sua redação foi avaliada!</h1>
      </div>

      {/* Nota zero banner */}
      {resultado.nota_zero && (
        <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
          <div className="flex items-start gap-2">
            <svg className="mt-0.5 h-5 w-5 shrink-0 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-sm font-bold text-red-700">Critério de nota zero aplicado</p>
              {resultado.motivo_nota_zero && (
                <p className="mt-0.5 text-sm text-red-600">{resultado.motivo_nota_zero}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Total score card */}
      <div className="card mb-5 overflow-hidden">
        <div className={`flex flex-col items-center gap-4 px-6 py-6 sm:flex-row sm:gap-6 ${totalColors.bg}`}>
          <ScoreRing nota={resultado.nota_total} />
          <div className="text-center sm:text-left">
            <p className="text-sm font-medium text-gray-500">Nota Total</p>
            <p className={`text-4xl font-extrabold ${totalColors.text}`}>
              {resultado.nota_total}
              <span className="text-lg font-semibold text-gray-400"> / 1000</span>
            </p>
            <span className={`mt-1 inline-block text-sm font-semibold ${totalColors.text}`}>
              {totalColors.label}
            </span>
          </div>
        </div>
        {/* Mini score grid */}
        <div className="grid grid-cols-5 divide-x divide-gray-100 border-t border-gray-100">
          {COMP_ORDER.map((key) => {
            const colors = getScoreColor(comps[key]?.nota ?? 0)
            return (
              <div key={key} className="flex flex-col items-center py-3 px-1">
                <span className="text-[11px] font-semibold text-gray-400">C{COMP_NUMBERS[key]}</span>
                <span className={`mt-0.5 text-base font-bold ${colors.text}`}>{comps[key]?.nota ?? 0}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Pontos fortes e a melhorar */}
      {((resultado.pontos_fortes?.length > 0) || (resultado.pontos_melhorar?.length > 0)) && (
        <div className="mb-5 grid gap-3 sm:grid-cols-2">
          {resultado.pontos_fortes?.length > 0 && (
            <div className="card p-4">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-base">✅</span>
                <h3 className="text-sm font-bold text-gray-800">Pontos fortes</h3>
              </div>
              <ul className="space-y-1.5">
                {resultado.pontos_fortes.map((p, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-sm text-gray-600">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-green-400" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {resultado.pontos_melhorar?.length > 0 && (
            <div className="card p-4">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-base">📌</span>
                <h3 className="text-sm font-bold text-gray-800">O que melhorar</h3>
              </div>
              <ul className="space-y-1.5">
                {resultado.pontos_melhorar.map((p, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-sm text-gray-600">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Feedback geral */}
      {resultado.feedback_geral && (
        <div className="card mb-5 p-4">
          <div className="mb-2 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-600">
              <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
            </div>
            <h2 className="text-sm font-bold text-gray-800">Feedback Geral</h2>
          </div>
          <p className="text-sm leading-relaxed text-gray-600">{resultado.feedback_geral}</p>
        </div>
      )}

      {/* Competency cards */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500">
          Detalhamento por Competência
        </h2>
        {COMP_ORDER.map((key, i) =>
          comps[key] ? (
            <CompetencyCard key={key} keyName={key} competencia={comps[key]} index={i} />
          ) : null,
        )}
      </div>

      {/* Reset */}
      <div className="mt-8">
        <button onClick={onReset} className="btn-primary w-full">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Corrigir nova redação
        </button>
      </div>

      <p className="mt-4 text-center text-xs text-gray-400">
        Approva.AI é uma ferramenta de apoio. Resultados podem variar em relação à banca oficial.
      </p>
    </div>
  )
}
