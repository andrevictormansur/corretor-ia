import { useState } from 'react'

const MIN_CHARS = 100
const MAX_CHARS = 3000

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

// Tela 7 — Redação
export default function Tela7({ onSubmit, loading, error }) {
  const [selectedTema, setSelectedTema] = useState('')
  const [customTema, setCustomTema] = useState('')
  const [redacao, setRedacao] = useState('')

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
    <div className="funil-screen px-5 pt-10 pb-12">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-0.5 bg-gray-100 z-50">
        <div className="h-full bg-brand-600" style={{ width: '63%' }} />
      </div>

      {/* Logo */}
      <div className="mb-5 text-center">
        <span className="text-lg font-extrabold text-brand-600">
          Approva<span className="text-gray-900">.AI</span>
        </span>
      </div>

      <div className="funil-enter space-y-5">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-extrabold leading-tight text-gray-900">
            Cole sua redação<br />e descubra sua nota
          </h1>
          <p className="text-sm text-gray-500">
            Resultado completo em menos de 30 segundos
          </p>
        </div>

        {error && (
          <div className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700 ring-1 ring-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Tema */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-gray-700">
              Tema da redação
            </label>
            <select
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
            <label className="mb-1.5 block text-sm font-semibold text-gray-700">
              Sua redação
            </label>
            <textarea
              className="input-base min-h-[280px] resize-y leading-relaxed"
              placeholder="Cole ou escreva sua redação aqui…"
              value={redacao}
              onChange={(e) => setRedacao(e.target.value.slice(0, MAX_CHARS))}
              disabled={loading}
              required
            />
            {redacao.length > 0 && redacao.trim().length < MIN_CHARS && (
              <p className="mt-1 text-xs text-red-500">
                Muito curta. Adicione mais {MIN_CHARS - redacao.trim().length} caracteres.
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={!isValid || loading}
            className="btn-primary w-full text-base"
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

        <p className="text-center text-xs text-gray-400">
          ✅ Gratuito • baseado nos critérios oficiais do ENEM
        </p>
      </div>
    </div>
  )
}
