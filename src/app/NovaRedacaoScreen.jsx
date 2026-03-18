import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { corrigirRedacao } from '../services/anthropic'

const TEMAS_ENEM = [
  { year: 2024, label: '2024 — Invisibilidade do trabalho de cuidado realizado pela mulher no Brasil' },
  { year: 2023, label: '2023 — Invisibilidade da violência contra a mulher no Brasil' },
  { year: 2022, label: '2022 — Valorização de comunidades e povos tradicionais no Brasil' },
  { year: 2021, label: '2021 — Invisibilidade e registro civil: garantia de acesso à cidadania no Brasil' },
  { year: 2020, label: '2020 — O estigma associado às doenças mentais na sociedade brasileira' },
  { year: 2019, label: '2019 — Democratização do acesso ao cinema no Brasil' },
  { year: 2018, label: '2018 — Manipulação do comportamento do usuário pelo controle de dados na internet' },
  { year: 2017, label: '2017 — Desafios para a formação educacional de surdos no Brasil' },
  { year: 2016, label: '2016 — Caminhos para combater a intolerância religiosa no Brasil' },
  { year: 2015, label: '2015 — A persistência da violência contra a mulher na sociedade brasileira' },
  { year: 0, label: 'Tema livre (digitar)' },
]

const MODOS = [
  { id: 'colar', label: 'Colar texto', icon: '📋' },
  { id: 'caderno', label: 'Estilo caderno', icon: '📓' },
]

export default function NovaRedacaoScreen({ user }) {
  const navigate = useNavigate()
  const [modo, setModo] = useState('colar')
  const [selectedTema, setSelectedTema] = useState('')
  const [customTema, setCustomTema] = useState('')
  const [redacao, setRedacao] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const isCustom = selectedTema === '0'
  const temaFinal = isCustom
    ? customTema.trim()
    : (TEMAS_ENEM.find((t) => String(t.year) === selectedTema)?.label ?? '')
  const isValid = temaFinal.length >= 5 && redacao.trim().length >= 100

  async function handleSubmit(e) {
    e.preventDefault()
    if (!isValid || loading) return
    setLoading(true)
    setError('')
    try {
      const resultado = await corrigirRedacao(temaFinal, redacao.trim())
      navigate('/app/resultado', { state: { resultado, tema: temaFinal, redacao: redacao.trim(), userId: user.id } })
    } catch (err) {
      setError(err.message || 'Erro ao corrigir. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="px-5 pt-6 pb-4">
      <h1 className="text-xl font-extrabold text-gray-900 mb-1">Nova redação</h1>
      <p className="text-sm text-gray-500 mb-5">Cole ou escreva sua redação para corrigir</p>

      {/* Modo de entrada */}
      <div className="flex gap-2 mb-5">
        {MODOS.map((m) => (
          <button
            key={m.id}
            onClick={() => setModo(m.id)}
            className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold border-2 transition-all ${
              modo === m.id
                ? 'border-brand-600 bg-brand-50 text-brand-700'
                : 'border-gray-100 bg-white text-gray-500'
            }`}
          >
            <span>{m.icon}</span> {m.label}
          </button>
        ))}
      </div>

      {error && (
        <div className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600 ring-1 ring-red-100">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Tema */}
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-gray-700">Tema da redação</label>
          <select
            className="input-base"
            value={selectedTema}
            onChange={(e) => { setSelectedTema(e.target.value); setCustomTema('') }}
            disabled={loading}
            required
          >
            <option value="" disabled>Selecione o tema…</option>
            {TEMAS_ENEM.map((t) => (
              <option key={t.year} value={String(t.year)}>{t.label}</option>
            ))}
          </select>
          {isCustom && (
            <input
              type="text"
              className="input-base mt-2"
              placeholder="Digite o tema da redação"
              value={customTema}
              onChange={(e) => setCustomTema(e.target.value)}
              maxLength={200}
              disabled={loading}
              autoFocus
            />
          )}
        </div>

        {/* Textarea */}
        <div>
          <div className="flex items-baseline justify-between mb-1.5">
            <label className="text-sm font-semibold text-gray-700">Sua redação</label>
            <span className={`text-xs font-medium ${redacao.length > 0 && redacao.trim().length < 100 ? 'text-red-500' : 'text-gray-400'}`}>
              {redacao.trim() ? redacao.trim().split(/\s+/).length : 0} palavras · {redacao.length}/3000
            </span>
          </div>
          <textarea
            className={`input-base leading-relaxed ${
              modo === 'caderno'
                ? 'min-h-[400px] font-mono text-sm'
                : 'min-h-[280px]'
            }`}
            style={modo === 'caderno' ? {
              backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, #e5e7eb 27px, #e5e7eb 28px)',
              lineHeight: '28px',
              paddingTop: '6px',
            } : {}}
            placeholder={modo === 'caderno'
              ? 'Escreva sua redação linha por linha…'
              : 'Cole ou escreva sua redação aqui…'}
            value={redacao}
            onChange={(e) => setRedacao(e.target.value.slice(0, 3000))}
            disabled={loading}
            required
          />
          {redacao.length > 0 && redacao.trim().length < 100 && (
            <p className="mt-1 text-xs text-red-500">
              Muito curta. Adicione mais {100 - redacao.trim().length} caracteres.
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={!isValid || loading}
          className="btn-primary w-full"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Analisando redação…
            </span>
          ) : 'Analisar redação →'}
        </button>
      </form>
    </div>
  )
}
