// Tela 1 — "Quando você vai fazer o ENEM?"
export default function Tela1({ onSelect }) {
  const options = [
    { id: 'este_ano', emoji: '🎯', label: 'Este ano (2026)' },
    { id: 'proximo_ano', emoji: '📅', label: 'Ano que vem' },
    { id: 'ainda_decidindo', emoji: '🤔', label: 'Ainda estou decidindo' },
  ]

  return (
    <div className="funil-screen px-5 pt-10 pb-12">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-0.5 bg-gray-100 z-50">
        <div className="h-full bg-brand-600" style={{ width: '9%' }} />
      </div>

      {/* Logo */}
      <div className="mb-8 text-center">
        <span className="text-lg font-extrabold text-brand-600">
          Approva<span className="text-gray-900">.AI</span>
        </span>
      </div>

      <div className="funil-enter space-y-6">
        <div className="text-center">
          <div className="mb-3 text-4xl">📝</div>
          <h1 className="text-2xl font-extrabold leading-tight tracking-tight text-gray-900">
            Quando você vai<br />fazer o ENEM?
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Isso vai nos ajudar a personalizar o seu plano
          </p>
        </div>

        <div className="space-y-3 pt-2">
          {options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => onSelect(opt.id)}
              className="w-full flex items-center gap-4 rounded-2xl border-2 border-gray-100 bg-white px-5 py-4 text-left transition-all duration-150 hover:border-brand-300 hover:bg-brand-50 active:scale-[0.98]"
            >
              <span className="text-2xl">{opt.emoji}</span>
              <span className="text-base font-semibold text-gray-800">{opt.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
