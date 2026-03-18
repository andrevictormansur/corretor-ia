import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const COMP_LABELS = {
  c1: 'Norma culta',
  c2: 'Compreensão do tema',
  c3: 'Seleção de informações',
  c4: 'Coesão textual',
  c5: 'Proposta de intervenção',
}

function barColor(nota) {
  if (nota >= 160) return 'bg-green-500'
  if (nota >= 120) return 'bg-amber-400'
  return 'bg-red-400'
}

function barTextColor(nota) {
  if (nota >= 160) return 'text-green-600'
  if (nota >= 120) return 'text-amber-600'
  return 'text-red-500'
}

function totalRingColor(nota) {
  if (nota >= 850) return '#10B981'
  if (nota >= 700) return '#7c3aed'
  if (nota >= 500) return '#f59e0b'
  return '#ef4444'
}

function ScoreRing({ nota }) {
  const radius = 54
  const circ = 2 * Math.PI * radius
  const color = totalRingColor(nota)
  const ringRef = useRef(null)
  const [displayed, setDisplayed] = useState(0)

  useEffect(() => {
    // Animate counter
    let current = 0
    const step = Math.max(1, Math.ceil(nota / 60))
    const t = setInterval(() => {
      current = Math.min(current + step, nota)
      setDisplayed(current)
      if (current >= nota) clearInterval(t)
    }, 20)

    // Animate ring
    if (ringRef.current) {
      ringRef.current.style.strokeDashoffset = circ
      setTimeout(() => {
        if (ringRef.current) {
          ringRef.current.style.transition = 'stroke-dashoffset 1.4s cubic-bezier(0.4,0,0.2,1)'
          ringRef.current.style.strokeDashoffset = circ * (1 - nota / 1000)
        }
      }, 100)
    }
    return () => clearInterval(t)
  }, [nota, circ])

  const label =
    nota >= 850 ? 'Excelente!' :
    nota >= 700 ? 'Acima da média' :
    nota >= 500 ? 'Na média' : 'Precisa melhorar'

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative inline-flex items-center justify-center">
        {/* Glow */}
        <div className="absolute inset-0 rounded-full opacity-20 blur-xl" style={{ background: color }} />
        <svg width="160" height="160" viewBox="0 0 160 160" className="-rotate-90">
          <circle cx="80" cy="80" r={radius} fill="none" stroke="#ede9fe" strokeWidth="12" />
          <circle
            ref={ringRef}
            cx="80" cy="80" r={radius}
            fill="none"
            stroke={color}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circ}
          />
        </svg>
        <div className="absolute text-center">
          <span className="block text-4xl font-black leading-none tabular-nums" style={{ color }}>
            {displayed}
          </span>
          <span className="block text-xs font-semibold text-gray-400 mt-0.5">de 1000</span>
        </div>
      </div>
      <span className="text-sm font-bold px-3 py-1 rounded-full" style={{ background: color + '18', color }}>
        {label}
      </span>
    </div>
  )
}

function CompCard({ keyName, comp, fullWidth = false }) {
  const pct = (comp.nota / 200) * 100
  return (
    <div className={`card p-3.5 flex flex-col gap-2 ${fullWidth ? 'col-span-2' : ''}`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">{keyName.toUpperCase()}</span>
        <span className={`text-sm font-extrabold ${barTextColor(comp.nota)}`}>
          {comp.nota}<span className="text-xs font-normal text-gray-400">/200</span>
        </span>
      </div>
      <p className="text-xs font-semibold text-gray-700 leading-snug">{COMP_LABELS[keyName]}</p>
      <div className="h-2 w-full rounded-full bg-gray-100">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${barColor(comp.nota)}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      {comp.feedback && (
        <p className="text-[11px] text-gray-400 leading-relaxed line-clamp-3">{comp.feedback}</p>
      )}
    </div>
  )
}

export default function ResultadoScreen({ user }) {
  const { state } = useLocation()
  const navigate = useNavigate()
  const [saved, setSaved] = useState(false)

  const resultado = state?.resultado
  const tema = state?.tema
  const redacaoTexto = state?.redacao

  useEffect(() => {
    if (!resultado || saved || !user) return
    async function save() {
      await supabase.from('redacoes').insert({
        user_id: user.id,
        tema,
        redacao_texto: redacaoTexto,
        nota_total: resultado.nota_total,
        competencias: resultado.competencias,
        pontos_fortes: resultado.pontos_fortes,
        pontos_melhorar: resultado.pontos_melhorar,
        feedback_geral: resultado.feedback_geral,
      })
      setSaved(true)
    }
    save()
  }, [resultado])

  if (!resultado) {
    navigate('/app')
    return null
  }

  const comps = resultado.competencias || {}

  return (
    <div className="px-5 pt-6 pb-6 space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/app')} className="text-brand-600">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <h1 className="text-lg font-extrabold text-gray-900 leading-tight">Resultado</h1>
          {tema && <p className="text-xs text-gray-400 truncate max-w-[220px]">{tema}</p>}
        </div>
      </div>

      {/* Ring */}
      <div className="card py-7 flex justify-center">
        <ScoreRing nota={resultado.nota_total} />
      </div>

      {/* Grade 2x2 + C5 full width */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Por competência</h2>
        <div className="grid grid-cols-2 gap-2">
          {['c1', 'c2', 'c3', 'c4'].map((key) =>
            comps[key] ? <CompCard key={key} keyName={key} comp={comps[key]} /> : null
          )}
          {comps.c5 && <CompCard keyName="c5" comp={comps.c5} fullWidth />}
        </div>
      </div>

      {/* Ponto forte */}
      {resultado.pontos_fortes?.length > 0 && (
        <div className="rounded-2xl bg-green-50 ring-1 ring-green-100 p-4">
          <p className="text-xs font-bold uppercase tracking-wider text-green-600 mb-2">✅ Ponto forte</p>
          <ul className="space-y-1.5">
            {resultado.pontos_fortes.map((p, i) => (
              <li key={i} className="text-sm font-medium text-green-800">{p}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Pontos a melhorar */}
      {resultado.pontos_melhorar?.length > 0 && (
        <div className="rounded-2xl bg-red-50 ring-1 ring-red-100 p-4">
          <p className="text-xs font-bold uppercase tracking-wider text-red-500 mb-2">❌ O que melhorar</p>
          <ul className="space-y-1.5">
            {resultado.pontos_melhorar.map((p, i) => (
              <li key={i} className="text-sm font-medium text-red-700">{p}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Feedback geral */}
      {resultado.feedback_geral && (
        <div className="card p-4">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Feedback geral</p>
          <p className="text-sm text-gray-600 leading-relaxed">{resultado.feedback_geral}</p>
        </div>
      )}

      {/* Ações */}
      <div className="space-y-2 pt-1">
        <button
          onClick={() => navigate('/app', { state: { redacao: redacaoTexto, tema } })}
          className="w-full rounded-xl border-2 border-dashed border-brand-400 py-3 text-sm font-bold text-brand-600 transition hover:bg-brand-50 active:scale-95"
        >
          ✏️ Editar e recorrigir
        </button>
        <button
          onClick={() => navigate('/app')}
          className="btn-primary w-full"
        >
          Nova redação →
        </button>
      </div>

      {saved && (
        <p className="text-center text-xs text-green-600 font-medium">✅ Salvo no histórico</p>
      )}
    </div>
  )
}
