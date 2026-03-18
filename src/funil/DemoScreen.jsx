import { useState, useEffect } from 'react'

const LOADING_MSGS = [
  'Lendo sua redação…',
  'Analisando estrutura…',
  'Verificando argumentação…',
  'Avaliando coesão textual…',
  'Calculando sua nota…',
  'Preparando seu diagnóstico…',
]

function LoadingView() {
  const [idx, setIdx] = useState(0)
  const [fade, setFade] = useState(true)

  useEffect(() => {
    const t = setInterval(() => {
      setFade(false)
      setTimeout(() => { setIdx((i) => (i + 1) % LOADING_MSGS.length); setFade(true) }, 300)
    }, 2200)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="funil-screen flex flex-col items-center justify-center px-5 text-center">
      <div className="funil-enter">
        <div className="relative mx-auto mb-6 h-20 w-20">
          <div className="absolute inset-0 rounded-full border-4 border-brand-100" />
          <div
            className="absolute inset-0 rounded-full border-4 border-transparent border-t-brand-600"
            style={{ animation: 'spin 1s linear infinite' }}
          />
          <div className="absolute inset-3 flex items-center justify-center rounded-full bg-brand-50 text-xl">
            ✍️
          </div>
        </div>
        <h2 className="mb-2 text-xl font-bold text-gray-900">Analisando sua redação</h2>
        <p
          className="text-sm font-medium text-brand-600 transition-opacity duration-300"
          style={{ opacity: fade ? 1 : 0 }}
        >
          {LOADING_MSGS[idx]}
        </p>
        <div className="mt-5 flex justify-center gap-1.5">
          {LOADING_MSGS.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${i === idx ? 'w-4 bg-brand-600' : 'w-1.5 bg-brand-200'}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function DemoScreen({ onSubmit, loading, error }) {
  const [tema, setTema] = useState('')
  const [redacao, setRedacao] = useState('')

  if (loading) return <LoadingView />

  const charCount = redacao.length
  const isValid = tema.trim().length >= 5 && charCount >= 100

  function handleSubmit(e) {
    e.preventDefault()
    if (!isValid) return
    onSubmit(tema.trim(), redacao.trim())
  }

  return (
    <div className="funil-screen flex flex-col px-5 pt-8 pb-10">
      {/* Logo */}
      <div className="mb-6 text-center">
        <img src="/logo-light.svg" alt="Approva.AI" className="h-7 mx-auto" />
      </div>

      <div className="funil-enter">
        {/* Headline */}
        <div className="mb-6 text-center">
          <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700 ring-1 ring-green-200">
            🎁 Diagnóstico gratuito
          </div>
          <h1 className="text-2xl font-extrabold leading-snug text-gray-900">
            Descubra sua nota{' '}
            <span className="text-brand-600">AGORA</span> — grátis
          </h1>
          <p className="mt-1.5 text-sm text-gray-500">
            Cole sua redação e veja o diagnóstico em segundos
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-gray-700">
              Tema da redação
            </label>
            <input
              type="text"
              className="input-base"
              placeholder="Ex: O estigma da saúde mental no Brasil"
              value={tema}
              onChange={(e) => setTema(e.target.value)}
              maxLength={200}
              required
            />
          </div>

          <div>
            <div className="mb-1.5 flex items-baseline justify-between">
              <label className="block text-sm font-semibold text-gray-700">
                Sua redação
              </label>
              <span className={`text-xs font-medium ${charCount > 0 && charCount < 100 ? 'text-red-500' : 'text-gray-400'}`}>
                {charCount} caracteres
              </span>
            </div>
            <textarea
              className="input-base min-h-[240px] resize-y leading-relaxed"
              placeholder="Cole ou escreva sua redação aqui…"
              value={redacao}
              onChange={(e) => setRedacao(e.target.value.slice(0, 3000))}
              required
            />
            {charCount > 0 && charCount < 100 && (
              <p className="mt-1 text-xs text-red-500">
                Adicione mais {100 - charCount} caracteres.
              </p>
            )}
          </div>

          <button type="submit" disabled={!isValid} className="btn-primary w-full">
            Ver minha nota real →
          </button>
        </form>

        <p className="mt-3 text-center text-xs text-gray-400">
          Sem cadastro · Sem cartão · Resultado em segundos
        </p>
      </div>
    </div>
  )
}
