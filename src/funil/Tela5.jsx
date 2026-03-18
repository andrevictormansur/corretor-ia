// Tela 5 — Qual nota você acha que tiraria hoje?
const OPTIONS = [
  { id: 'abaixo_500', label: 'Abaixo de 500', emoji: '😟', color: '#ef4444' },
  { id: '500_700',    label: 'Entre 500 e 700', emoji: '😐', color: '#f59e0b' },
  { id: '700_850',    label: 'Entre 700 e 850', emoji: '🙂', color: '#7c3aed' },
  { id: 'acima_850',  label: 'Acima de 850',    emoji: '😄', color: '#16a34a' },
]

export default function Tela5({ onSelect }) {
  return (
    <div className="funil-screen px-5 pt-10 pb-12">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-0.5 bg-gray-100 z-50">
        <div className="h-full bg-brand-600" style={{ width: '45%' }} />
      </div>

      {/* Logo */}
      <div className="mb-6 text-center">
        <img src="/logo-light.svg" alt="Approva.AI" className="h-7 mx-auto" />
      </div>

      <div className="funil-enter space-y-5">
        <div className="text-center">
          <h1 className="text-2xl font-extrabold leading-tight text-gray-900">
            Qual nota você acha<br />que tiraria <span className="text-brand-600">hoje</span>?
          </h1>
          <p className="mt-1.5 text-sm text-gray-500">
            Seja honesto — isso nos ajuda a personalizar seu diagnóstico
          </p>
        </div>

        <div className="space-y-3 pt-1">
          {OPTIONS.map((opt) => (
            <button
              key={opt.id}
              onClick={() => onSelect(opt.id)}
              className="w-full flex items-center gap-4 rounded-2xl border-2 border-gray-100 bg-white px-5 py-4 text-left transition-all hover:border-brand-300 hover:bg-brand-50 active:scale-[0.98]"
            >
              <span className="text-2xl">{opt.emoji}</span>
              <span className="text-base font-semibold text-gray-800">{opt.label}</span>
              <span
                className="ml-auto h-3 w-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: opt.color }}
              />
            </button>
          ))}
        </div>

        <p className="text-center text-xs text-gray-400 pt-1">
          Selecione uma opção para continuar
        </p>
      </div>
    </div>
  )
}
