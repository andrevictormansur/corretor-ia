import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

function badgeClass(nota) {
  if (nota >= 700) return 'bg-green-100 text-green-700 ring-1 ring-green-200'
  if (nota >= 500) return 'bg-amber-100 text-amber-700 ring-1 ring-amber-200'
  return 'bg-red-100 text-red-600 ring-1 ring-red-200'
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
}

function notaLabel(nota) {
  if (nota >= 700) return 'Acima da média'
  if (nota >= 500) return 'Na média'
  return 'Abaixo da média'
}

export default function HistoricoScreen({ user }) {
  const [redacoes, setRedacoes] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('redacoes')
        .select('id, tema, nota_total, created_at, competencias, pontos_fortes, pontos_melhorar, feedback_geral, redacao_texto')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
      setRedacoes(data || [])
      setLoading(false)
    }
    load()
  }, [user.id])

  function openResultado(r) {
    navigate('/app/resultado', {
      state: {
        resultado: {
          nota_total: r.nota_total,
          competencias: r.competencias,
          pontos_fortes: r.pontos_fortes,
          pontos_melhorar: r.pontos_melhorar,
          feedback_geral: r.feedback_geral,
        },
        tema: r.tema,
        redacao: r.redacao_texto,
        userId: user.id,
      }
    })
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="h-8 w-8 rounded-full border-4 border-brand-200 border-t-brand-600 animate-spin" />
      </div>
    )
  }

  return (
    <div className="px-5 pt-6 pb-4">
      <h1 className="text-xl font-extrabold text-gray-900 mb-1">Histórico</h1>
      <p className="text-sm text-gray-500 mb-5">
        {redacoes.length === 0 ? 'Nenhuma redação ainda' : `${redacoes.length} redaç${redacoes.length === 1 ? 'ão corrigida' : 'ões corrigidas'}`}
      </p>

      {redacoes.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">📝</div>
          <p className="text-gray-500 font-medium mb-4">Nenhuma redação corrigida ainda.</p>
          <button onClick={() => navigate('/app')} className="btn-primary">
            Corrigir minha primeira redação
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {redacoes.map((r) => (
            <button
              key={r.id}
              onClick={() => openResultado(r)}
              className="card w-full p-4 text-left hover:shadow-md active:scale-[0.99] transition-all"
            >
              <div className="flex items-start gap-3">
                {/* Nota badge */}
                <div className={`shrink-0 flex flex-col items-center justify-center rounded-2xl w-14 h-14 ${badgeClass(r.nota_total)}`}>
                  <span className="text-lg font-black leading-none">{r.nota_total}</span>
                  <span className="text-[9px] font-bold leading-tight">pts</span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{r.tema}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{formatDate(r.created_at)}</p>
                  <span className={`inline-block mt-1.5 text-[10px] font-bold px-2 py-0.5 rounded-full ${badgeClass(r.nota_total)}`}>
                    {notaLabel(r.nota_total)}
                  </span>
                </div>

                {/* Arrow */}
                <svg className="shrink-0 w-4 h-4 text-gray-300 self-center" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>

              {/* Mini C1–C5 */}
              <div className="flex gap-1.5 mt-3 pt-3 border-t border-gray-50">
                {['c1','c2','c3','c4','c5'].map((key) => {
                  const nota = r.competencias?.[key]?.nota ?? 0
                  const color = nota >= 160 ? 'text-green-600' : nota >= 120 ? 'text-amber-500' : 'text-red-400'
                  return (
                    <div key={key} className="flex-1 text-center">
                      <span className="block text-[9px] font-bold text-gray-300 uppercase">{key}</span>
                      <span className={`block text-xs font-extrabold ${color}`}>{nota}</span>
                    </div>
                  )
                })}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
