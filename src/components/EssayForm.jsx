import { useEffect, useState } from 'react'

const MIN_CHARS = 100
const MAX_CHARS = 3000

// ENEM 2026 — redação: 8 de novembro de 2026
const ENEM_DATE = new Date('2026-11-08')

const TEMAS_ENEM = [
  { year: 2024, label: '2024 — Desafios para o enfrentamento da invisibilidade do trabalho de cuidado realizado pela mulher no Brasil' },
  { year: 2023, label: '2023 — Desafios para o enfrentamento da invisibilidade da violência contra a mulher no Brasil' },
  { year: 2022, label: '2022 — Desafios para a valorização de comunidades e povos tradicionais no Brasil' },
  { year: 2021, label: '2021 — Invisibilidade e registro civil: garantia de acesso à cidadania no Brasil' },
  { year: 2020, label: '2020 — O estigma associado às doenças mentais na sociedade brasileira' },
  { year: 2019, label: '2019 — Democratização do acesso ao cinema no Brasil' },
  { year: 2018, label: '2018 — Manipulação do comportamento do usuário pelo controle de dados na internet' },
  { year: 2017, label: '2017 — Desafios para a formação educacional de surdos no Brasil' },
  { year: 2016, label: '2016 — Caminhos para combater a intolerância religiosa no Brasil' },
  { year: 2015, label: '2015 — A persistência da violência contra a mulher na sociedade brasileira' },
  { year: 0,    label: 'Outro tema (digitar)' },
]

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

export default function EssayForm({ onSubmit, loading }) {
  const [selectedTema, setSelectedTema] = useState('')
  const [customTema, setCustomTema] = useState('')
  const [redacao, setRedacao] = useState('')
  const daysLeft = useDaysLeft()

  const isCustom = selectedTema === '0'
  const temaFinal = isCustom
    ? customTema.trim()
    : (TEMAS_ENEM.find((t) => String(t.year) === selectedTema)?.label ?? '')
  const isValid = temaFinal.length >= 5 && redacao.trim().length >= MIN_CHARS

  function handleSubmit(e) {
    e.preventDefault()
    if (!isValid || loading) return
    onSubmit(temaFinal, redacao.trim())
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-8">
      {/* Header */}
      <div className="mb-5 text-center">
        <p className="mb-2 text-sm font-extrabold uppercase tracking-widest text-brand-600">
          CorretorIA
        </p>
        <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-gray-900">
          Descubra sua nota no ENEM agora
        </h1>
        <p className="mt-2 text-base text-gray-500">
          Cole sua redação e receba correção completa em 20 segundos
        </p>
      </div>

      {/* Urgency bar */}
      <div className="mb-6 flex items-center justify-center gap-2 rounded-xl bg-brand-50 px-4 py-2.5">
        <span className="text-sm">⏰</span>
        <span className="text-sm font-semibold text-brand-700">
          Faltam <strong>{daysLeft} dias</strong> para o ENEM 2026
        </span>
      </div>

      {/* Form card */}
      <form onSubmit={handleSubmit} className="card space-y-5 p-6">

        {/* Tema — dropdown */}
        <div>
          <label htmlFor="tema-select" className="mb-1.5 block text-sm font-semibold text-gray-700">
            Tema da redação
          </label>
          <select
            id="tema-select"
            className="input-base"
            value={selectedTema}
            onChange={(e) => { setSelectedTema(e.target.value); setCustomTema('') }}
            disabled={loading}
            required
          >
            <option value="" disabled>Selecione o tema…</option>
            {TEMAS_ENEM.map((t) => (
              <option key={t.year} value={String(t.year)}>
                {t.label}
              </option>
            ))}
          </select>

          {/* Custom tema input */}
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
              required
            />
          )}
        </div>

        {/* Redação */}
        <div>
          <label htmlFor="redacao" className="mb-1.5 block text-sm font-semibold text-gray-700">
            Sua redação
          </label>
          <textarea
            id="redacao"
            className="input-base min-h-[320px] resize-y leading-relaxed"
            placeholder="Cole ou escreva sua redação aqui. O texto deve ter pelo menos 7 linhas (introdução, desenvolvimento e conclusão)."
            value={redacao}
            onChange={(e) => setRedacao(e.target.value.slice(0, MAX_CHARS))}
            disabled={loading}
            required
          />
          {redacao.length > 0 && redacao.trim().length < MIN_CHARS && (
            <p className="mt-1 text-xs text-red-500">
              Redação muito curta. Adicione mais {MIN_CHARS - redacao.trim().length} caracteres.
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!isValid || loading}
          className="btn-primary w-full"
        >
          {loading ? (
            <>
              <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Analisando…
            </>
          ) : (
            'Analisar minha redação →'
          )}
        </button>
      </form>

      {/* Social proof footer */}
      <p className="mt-4 text-center text-xs font-medium text-gray-500">
        ✅ Correção gratuita • Resultado em 20 segundos • Baseado nos critérios oficiais do ENEM
      </p>
    </div>
  )
}
