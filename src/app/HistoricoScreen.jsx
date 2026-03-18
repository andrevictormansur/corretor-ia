import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

function notaBadge(nota) {
  if (nota >= 700) return 'bg-green-100 text-green-700'
  if (nota >= 500) return 'bg-amber-100 text-amber-700'
  return 'bg-red-100 text-red-600'
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
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
      <p className="text-sm text-gray-500 mb-5">Suas redações corrigidas</p>

      {redacoes.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-4xl mb-3">📝</div>
          <p className="text-gray-500 font-medium">Nenhuma redação corrigida ainda.</p>
          <button
            onClick={() => navigate('/app')}
            className="mt-4 btn-primary"
          >
            Corrigir minha primeira redação
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {redacoes.map((r) => (
            <button
              key={r.id}
              onClick={() => navigate('/app/resultado', {
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
              })}
              className="card w-full p-4 text-left hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{r.tema}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{formatDate(r.created_at)}</p>
                </div>
                <span className={`shrink-0 rounded-full px-3 py-1 text-sm font-extrabold ${notaBadge(r.nota_total)}`}>
                  {r.nota_total}
                </span>
              </div>
              {/* Mini C1–C5 */}
              <div className="flex gap-2 mt-3">
                {['c1','c2','c3','c4','c5'].map((key) => (
                  <div key={key} className="flex-1 text-center">
                    <span className="block text-[9px] font-bold text-gray-300">{key.toUpperCase()}</span>
                    <span className="block text-xs font-bold text-gray-600">{r.competencias?.[key]?.nota ?? '–'}</span>
                  </div>
                ))}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
