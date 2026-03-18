import { useState } from 'react'

// Tela 3 — Qual curso você quer fazer?
const CURSOS = [
  { id: 'Direito',     emoji: '⚖️',  label: 'Direito' },
  { id: 'Odontologia', emoji: '🦷',  label: 'Odontologia' },
  { id: 'Medicina',    emoji: '🩺',  label: 'Medicina' },
  { id: 'Administração', emoji: '💼', label: 'Administração' },
  { id: 'Nutrição',    emoji: '🥗',  label: 'Nutrição' },
  { id: 'Psicologia',  emoji: '🧠',  label: 'Psicologia' },
]

export default function Tela3({ onSelect }) {
  const [custom, setCustom] = useState('')
  const [showCustom, setShowCustom] = useState(false)

  function handleCustomSubmit(e) {
    e.preventDefault()
    if (custom.trim().length >= 2) onSelect(custom.trim())
  }

  return (
    <div className="funil-screen px-5 pt-10 pb-12">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-0.5 bg-gray-100 z-50">
        <div className="h-full bg-brand-600" style={{ width: '27%' }} />
      </div>

      {/* Logo */}
      <div className="mb-6 text-center">
        <img src="/logo-light.svg" alt="Approva.AI" className="h-7 mx-auto" />
      </div>

      <div className="funil-enter space-y-5">
        <div className="text-center">
          <h1 className="text-2xl font-extrabold leading-tight text-gray-900">
            Qual curso você<br />quer fazer?
          </h1>
          <p className="mt-1.5 text-sm text-gray-500">
            Vamos mostrar o que você precisa para chegar lá
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {CURSOS.map((c) => (
            <button
              key={c.id}
              onClick={() => onSelect(c.id)}
              className="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-gray-100 bg-white px-3 py-4 transition-all hover:border-brand-300 hover:bg-brand-50 active:scale-95"
            >
              <span className="text-3xl">{c.emoji}</span>
              <span className="text-sm font-semibold text-gray-800">{c.label}</span>
            </button>
          ))}
        </div>

        {/* Other option */}
        {!showCustom ? (
          <button
            onClick={() => setShowCustom(true)}
            className="w-full rounded-2xl border-2 border-dashed border-gray-200 py-3.5 text-sm font-medium text-gray-500 transition hover:border-brand-300 hover:text-brand-600"
          >
            + Outro curso
          </button>
        ) : (
          <form onSubmit={handleCustomSubmit} className="flex gap-2">
            <input
              autoFocus
              className="input-base flex-1"
              placeholder="Ex: Engenharia Civil"
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              maxLength={60}
            />
            <button
              type="submit"
              disabled={custom.trim().length < 2}
              className="rounded-xl bg-brand-600 px-4 py-2 font-semibold text-white disabled:opacity-40"
            >
              OK
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
