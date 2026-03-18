import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const COMP_ORDER = ['c1', 'c2', 'c3', 'c4', 'c5']
const COMP_LABELS = {
  c1: 'Norma culta',
  c2: 'Compreensão do tema',
  c3: 'Seleção de informações',
  c4: 'Coesão textual',
  c5: 'Proposta de intervenção',
}

function notaColor(nota, max = 200) {
  const pct = nota / max
  if (pct <= 0.4) return { bar: 'bg-red-400', text: 'text-red-600', bg: 'bg-red-50' }
  if (pct <= 0.6) return { bar: 'bg-amber-400', text: 'text-amber-600', bg: 'bg-amber-50' }
  if (pct <= 0.8) return { bar: 'bg-blue-500', text: 'text-blue-600', bg: 'bg-blue-50' }
  return { bar: 'bg-brand-600', text: 'text-brand-600', bg: 'bg-brand-50' }
}

function totalColor(nota) {
  if (nota < 500) return '#ef4444'
  if (nota < 700) return '#f59e0b'
  if (nota < 850) return '#7c3aed'
  return '#10B981'
}

function ScoreRing({ nota }) {
  const radius = 54
  const circ = 2 * Math.PI * radius
  const color = totalColor(nota)
  const ringRef = useRef(null)

  useEffect(() => {
    if (ringRef.current) {
      ringRef.current.style.strokeDashoffset = circ
      setTimeout(() => {
        ringRef.current.style.transition = 'stroke-dashoffset 1.2s ease-out'
        ringRef.current.style.strokeDashoffset = circ * (1 - nota / 1000)
      }, 80)
    }
  }, [nota, circ])

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="140" height="140" viewBox="0 0 140 140" className="-rotate-90">
        <circle cx="70" cy="70" r={radius} fill="none" stroke="#ede9fe" strokeWidth="10" />
        <circle ref={ringRef} cx="70" cy="70" r={radius} fill="none" stroke={color}
          strokeWidth="10" strokeLinecap="round" strokeDasharray={circ} />
      </svg>
      <div className="absolute text-center">
        <span className="block text-3xl font-extrabold leading-none" style={{ color }}>{nota}</span>
        <span className="block text-xs font-medium text-gray-400">de 1000</span>
      </div>
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
    if (!resultado || saved) return
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

  const comps = resultado.competencias

  return (
    <div className="px-5 pt-6 pb-4 space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/app')} className="text-brand-600">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-lg font-extrabold text-gray-900">Resultado</h1>
      </div>

      {/* Score */}
      <div className="card overflow-hidden">
        <div className="flex flex-col items-center py-6 gap-3 bg-gradient-to-b from-brand-50 to-white">
          <ScoreRing nota={resultado.nota_total} />
          <p className="text-sm text-gray-500">
            {resultado.nota_total < 500 ? 'Precisa melhorar' :
             resultado.nota_total < 700 ? 'Na média' :
             resultado.nota_total < 850 ? 'Acima da média' : 'Excelente!'}
          </p>
        </div>
        {/* Mini grid C1–C5 */}
        <div className="grid grid-cols-5 divide-x divide-gray-100 border-t border-gray-100">
          {COMP_ORDER.map((key) => {
            const { text } = notaColor(comps[key]?.nota ?? 0)
            return (
              <div key={key} className="flex flex-col items-center py-3">
                <span className="text-[10px] font-semibold text-gray-400">{key.toUpperCase()}</span>
                <span className={`mt-0.5 text-sm font-bold ${text}`}>{comps[key]?.nota ?? 0}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Competências */}
      <div className="space-y-2">
        <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400">Por competência</h2>
        {COMP_ORDER.map((key) => {
          const c = comps[key]
          if (!c) return null
          const colors = notaColor(c.nota)
          const pct = (c.nota / 200) * 100
          return (
            <div key={key} className="card p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-800">{COMP_LABELS[key]}</span>
                <span className={`text-sm font-extrabold ${colors.text}`}>{c.nota}<span className="text-xs font-normal text-gray-400">/200</span></span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-gray-100 mb-2">
                <div className={`h-full rounded-full ${colors.bar}`} style={{ width: `${pct}%` }} />
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">{c.feedback}</p>
            </div>
          )
        })}
      </div>

      {/* Pontos fortes */}
      {resultado.pontos_fortes?.length > 0 && (
        <div className="card p-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Pontos fortes</h3>
          <ul className="space-y-1.5">
            {resultado.pontos_fortes.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-green-700">
                <span className="mt-0.5">✅</span> {p}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Pontos a melhorar */}
      {resultado.pontos_melhorar?.length > 0 && (
        <div className="card p-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">O que melhorar</h3>
          <ul className="space-y-1.5">
            {resultado.pontos_melhorar.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-red-600">
                <span className="mt-0.5">❌</span> {p}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Feedback geral */}
      {resultado.feedback_geral && (
        <div className="card p-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Feedback geral</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{resultado.feedback_geral}</p>
        </div>
      )}

      {/* Ações */}
      <div className="space-y-2 pt-2">
        <button
          onClick={() => navigate('/app', { state: { redacao: redacaoTexto, tema } })}
          className="w-full rounded-xl border-2 border-brand-600 py-3 text-sm font-bold text-brand-600 transition hover:bg-brand-50"
        >
          Editar e recorrigir
        </button>
        <button
          onClick={() => navigate('/app')}
          className="btn-primary w-full"
        >
          Nova redação →
        </button>
      </div>

      {saved && (
        <p className="text-center text-xs text-gray-400">✅ Resultado salvo no histórico</p>
      )}
    </div>
  )
}
