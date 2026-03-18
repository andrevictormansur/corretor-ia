import { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import { supabase } from '../lib/supabase'

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
}

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  return (
    <div className="bg-white rounded-xl shadow-lg ring-1 ring-gray-100 px-3 py-2 text-sm">
      <p className="font-bold text-brand-600">{d.nota}</p>
      <p className="text-gray-400 text-xs">{d.data}</p>
    </div>
  )
}

export default function GraficoScreen({ user }) {
  const [dados, setDados] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('redacoes')
        .select('nota_total, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true })
      setDados((data || []).map((r) => ({ nota: r.nota_total, data: formatDate(r.created_at) })))
      setLoading(false)
    }
    load()
  }, [user.id])

  const media = dados.length ? Math.round(dados.reduce((s, d) => s + d.nota, 0) / dados.length) : 0
  const melhor = dados.length ? Math.max(...dados.map((d) => d.nota)) : 0
  const ultima = dados.length ? dados[dados.length - 1].nota : 0
  const evolucao = dados.length >= 2 ? ultima - dados[0].nota : 0

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="h-8 w-8 rounded-full border-4 border-brand-200 border-t-brand-600 animate-spin" />
      </div>
    )
  }

  return (
    <div className="px-5 pt-6 pb-4">
      <h1 className="text-xl font-extrabold text-gray-900 mb-1">Evolução</h1>
      <p className="text-sm text-gray-500 mb-5">Acompanhe seu progresso ao longo do tempo</p>

      {dados.length < 2 ? (
        <div className="text-center py-16">
          <div className="text-4xl mb-3">📈</div>
          <p className="text-gray-500 font-medium">Corrija pelo menos 2 redações para ver a evolução.</p>
        </div>
      ) : (
        <>
          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              { label: 'Última nota', value: ultima, color: 'text-brand-600' },
              { label: 'Melhor nota', value: melhor, color: 'text-green-600' },
              { label: 'Média geral', value: media, color: 'text-amber-600' },
            ].map((s) => (
              <div key={s.label} className="card p-3 text-center">
                <p className={`text-xl font-extrabold ${s.color}`}>{s.value}</p>
                <p className="text-[10px] text-gray-400 font-medium mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Evolução total */}
          {evolucao !== 0 && (
            <div className={`mb-5 rounded-2xl px-4 py-3 text-sm font-semibold text-center ${evolucao > 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
              {evolucao > 0 ? `📈 Você evoluiu +${evolucao} pontos desde a primeira redação!` : `📉 Queda de ${Math.abs(evolucao)} pontos — continue praticando!`}
            </div>
          )}

          {/* Gráfico */}
          <div className="card p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Notas por redação</p>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={dados} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="data" tick={{ fontSize: 10, fill: '#9ca3af' }} />
                <YAxis domain={[0, 1000]} tick={{ fontSize: 10, fill: '#9ca3af' }} />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine y={700} stroke="#10B981" strokeDasharray="4 4" strokeWidth={1} />
                <Line
                  type="monotone"
                  dataKey="nota"
                  stroke="#7c3aed"
                  strokeWidth={2.5}
                  dot={{ fill: '#7c3aed', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-[10px] text-gray-400 text-center mt-2">Linha verde = meta 700</p>
          </div>
        </>
      )}
    </div>
  )
}
