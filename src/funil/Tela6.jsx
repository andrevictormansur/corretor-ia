// Tela 6 — O que essa nota significa para o seu curso
const CUTOFFS = {
  Medicina:     { min: 800, label: 'Medicina', color: '#ef4444' },
  Direito:      { min: 700, label: 'Direito', color: '#f59e0b' },
  Odontologia:  { min: 720, label: 'Odontologia', color: '#f59e0b' },
  Administração:{ min: 600, label: 'Administração', color: '#16a34a' },
  Nutrição:     { min: 620, label: 'Nutrição', color: '#16a34a' },
  Psicologia:   { min: 650, label: 'Psicologia', color: '#7c3aed' },
}

const FAIXA_SCORE = {
  abaixo_500: { mid: 400, label: 'abaixo de 500' },
  '500_700':  { mid: 600, label: 'entre 500 e 700' },
  '700_850':  { mid: 775, label: 'entre 700 e 850' },
  acima_850:  { mid: 900, label: 'acima de 850' },
}

const BAR_COURSES = [
  { name: 'Medicina',      min: 800, color: '#ef4444' },
  { name: 'Odontologia',   min: 720, color: '#f97316' },
  { name: 'Direito',       min: 700, color: '#f59e0b' },
  { name: 'Psicologia',    min: 650, color: '#7c3aed' },
  { name: 'Nutrição',      min: 620, color: '#3b82f6' },
  { name: 'Administração', min: 600, color: '#16a34a' },
]

export default function Tela6({ curso, notaFaixa, onContinue }) {
  const faixa = FAIXA_SCORE[notaFaixa] || FAIXA_SCORE['500_700']
  const userScore = faixa.mid
  const cutoff = CUTOFFS[curso] || { min: 650, label: curso, color: '#7c3aed' }
  const gap = Math.max(0, cutoff.min - userScore)
  const isOk = userScore >= cutoff.min

  return (
    <div className="funil-screen px-5 pt-10 pb-12">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-0.5 bg-gray-100 z-50">
        <div className="h-full bg-brand-600" style={{ width: '54%' }} />
      </div>

      {/* Logo */}
      <div className="mb-6 text-center">
        <span className="text-lg font-extrabold text-brand-600">
          Corretor<span className="text-gray-900">IA</span>
        </span>
      </div>

      <div className="funil-enter space-y-5">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-extrabold leading-tight text-gray-900">
            O que sua nota significa<br />para <span className="text-brand-600">{curso}</span>
          </h1>
        </div>

        {/* Gap callout */}
        <div
          className="rounded-2xl px-5 py-4 text-center"
          style={{
            backgroundColor: isOk ? '#f0fdf4' : '#fef2f2',
            border: `1px solid ${isOk ? '#bbf7d0' : '#fecaca'}`,
          }}
        >
          {isOk ? (
            <>
              <p className="text-lg font-black" style={{ color: '#16a34a' }}>✅ Sua nota já é suficiente!</p>
              <p className="mt-0.5 text-sm text-gray-600">
                Mas manter o nível e chegar a 900+ garante sua vaga nas melhores faculdades
              </p>
            </>
          ) : (
            <>
              <p className="text-lg font-black" style={{ color: '#ef4444' }}>
                Você precisa de +{gap} pontos
              </p>
              <p className="mt-0.5 text-sm text-gray-600">
                para atingir a nota de corte de <strong>{cutoff.min}</strong> em {curso}
              </p>
            </>
          )}
        </div>

        {/* Bar chart */}
        <div className="card p-4 space-y-3">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
            Nota de corte por curso (média nacional)
          </p>
          {BAR_COURSES.map((c) => {
            const barPct = Math.round((c.min / 1000) * 100)
            const isSelected = c.name === curso
            return (
              <div key={c.name} className={`space-y-1 ${isSelected ? 'opacity-100' : 'opacity-60'}`}>
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${isSelected ? 'font-bold text-gray-900' : 'text-gray-600'}`}>
                    {c.name} {isSelected && '← você'}
                  </span>
                  <span className="text-sm font-bold text-gray-700">{c.min}</span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${barPct}%`,
                      backgroundColor: isSelected ? c.color : '#d1d5db',
                    }}
                  />
                </div>
              </div>
            )
          })}
          {/* User score marker */}
          <div className="mt-2 flex items-center gap-2 rounded-xl bg-brand-50 px-3 py-2 ring-1 ring-brand-100">
            <span className="h-2.5 w-2.5 rounded-full bg-brand-600 flex-shrink-0" />
            <p className="text-sm text-brand-700">
              Sua nota estimada: <strong>{faixa.label}</strong>
            </p>
          </div>
        </div>

        <button onClick={onContinue} className="btn-primary w-full text-base">
          Ver minha nota real →
        </button>
      </div>
    </div>
  )
}
