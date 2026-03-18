import { useEffect, useState } from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine,
} from 'recharts'
import { supabase } from '../lib/supabase'

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
}

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  return (
    <div className="bg-white rounded-2xl shadow-lg ring-1 ring-gray-100 px-4 py-3 text-center">
      <p className="text-xl font-black text-brand-600">{d.nota}</p>
      <p className="text-xs text-gray-400 mt-0.5">{d.data}</p>
    </div>
  )
}

function MetricCard({ label, value, color = 'text-gray-900', sub }) {
  return (
    <div className="card p-4 text-center flex-1">
      <p className={`text-2xl font-extrabold ${color}`}>{value}</p>
      <p className="text-[11px] text-gray-400 font-medium mt-0.5">{label}</p>
      {sub && <p className="text-[10px] text-gray-300 mt-0.5">{sub}</p>}
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
      setDados((data || []).map((r) => ({
        nota: r.nota_total,
        data: formatDate(r.created_at),
      })))
      setLoading(false)
    }
    load()
  }, [user.id])

  const total = dados.length
  const media = total ? Math.round(dados.reduce((s, d) => s + d.nota, 0) / total) : 0
  const melhor = total ? Math.max(...dados.map((d) => d.nota)) : 0
  const evolucao = total >= 2 ? dados[total - 1].nota - dados[0].nota : null

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="h-8 w-8 rounded-full border-4 border-brand-200 border-t-brand-600 animate-spin" />
      </div>
    )
  }

  return (
    <div className="px-5 pt-6 pb-4 space-y-5">
      <div>
        <h1 className="text-xl font-extrabold text-gray-900 mb-1">Evolução</h1>
        <p className="text-sm text-gray-500">Seu progresso ao longo do tempo</p>
      </div>

      {/* Métricas */}
      <div className="flex gap-2">
        <MetricCard label="Melhor nota" value={melhor || '–'} color="text-green-600" />
        <MetricCard label="Média geral" value={media || '–'} color="text-brand-600" />
        <MetricCard label="Redações" value={total} color="text-gray-700" />
      </div>

      {/* Evolução total */}
      {evolucao !== null && (
        <div className={`rounded-2xl px-4 py-3 text-sm font-semibold text-center ${evolucao >= 0 ? 'bg-green-50 text-green-700 ring-1 ring-green-100' : 'bg-red-50 text-red-600 ring-1 ring-red-100'}`}>
          {evolucao >= 0
            ? `📈 +${evolucao} pontos desde a primeira redação!`
            : `📉 ${evolucao} pontos — continue praticando!`}
        </div>
      )}

      {/* Gráfico */}
      {total < 2 ? (
        <div className="text-center py-16">
          <div className="text-4xl mb-3">📈</div>
          <p className="text-gray-500 font-medium">Corrija pelo menos 2 redações para ver a evolução.</p>
        </div>
      ) : (
        <div className="card p-4">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Notas ao longo do tempo</p>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={dados} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="data" tick={{ fontSize: 10, fill: '#9ca3af' }} />
              <YAxis domain={[0, 1000]} tick={{ fontSize: 10, fill: '#9ca3af' }} />
              <Tooltip content={<CustomTooltip />} />
              {/* Linha de média tracejada */}
              <ReferenceLine
                y={media}
                stroke="#7c3aed"
                strokeDasharray="5 4"
                strokeWidth={1.5}
                label={{ value: `Média ${media}`, position: 'right', fontSize: 9, fill: '#7c3aed' }}
              />
              {/* Meta 700 */}
              <ReferenceLine y={700} stroke="#10B981" strokeDasharray="4 4" strokeWidth={1} />
              <Line
                type="monotone"
                dataKey="nota"
                stroke="#7c3aed"
                strokeWidth={2.5}
                dot={{ fill: '#7c3aed', r: 5, strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 7, fill: '#7c3aed', stroke: '#fff', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-4 mt-3 justify-center">
            <span className="flex items-center gap-1.5 text-[10px] text-gray-400">
              <span className="w-4 h-0.5 bg-brand-600 inline-block rounded" style={{ borderTop: '2px dashed #7c3aed' }} />
              Sua média
            </span>
            <span className="flex items-center gap-1.5 text-[10px] text-gray-400">
              <span className="w-4 h-0.5 bg-green-500 inline-block rounded" />
              Meta 700
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
