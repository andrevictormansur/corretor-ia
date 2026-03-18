// Tela 4 — Social proof
export default function Tela4({ curso, aprovados, onContinue }) {
  const formatted = aprovados.toLocaleString('pt-BR')

  return (
    <div className="funil-screen px-5 pt-10 pb-12">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-0.5 bg-gray-100 z-50">
        <div className="h-full bg-brand-600" style={{ width: '36%' }} />
      </div>

      {/* Logo */}
      <div className="mb-6 text-center">
        <span className="text-lg font-extrabold text-brand-600">
          Approva<span className="text-gray-900">.AI</span>
        </span>
      </div>

      <div className="funil-enter space-y-5">
        <div className="text-center space-y-1">
          <p className="text-sm font-bold uppercase tracking-widest text-brand-600">
            Você não está sozinho
          </p>
          <h1 className="text-2xl font-extrabold text-gray-900 leading-tight">
            Outros candidatos a<br />
            <span className="text-brand-600">{curso}</span> já usaram o Approva.AI
          </h1>
        </div>

        {/* Big number card */}
        <div className="card p-6 text-center space-y-1">
          <div className="text-5xl font-black text-brand-600 tabular-nums">
            {formatted}
          </div>
          <p className="text-base font-semibold text-gray-700">
            candidatos já corrigiram redações
          </p>
          <p className="text-sm text-gray-500">
            com feedback baseado nos critérios oficiais do ENEM
          </p>
        </div>

        {/* Testimonials */}
        <div className="space-y-3">
          {[
            { name: 'Ana C.', curso: 'Medicina — USP', text: 'Saí de 680 para 920 em 3 meses de treino com o Approva.AI.', stars: 5 },
            { name: 'Lucas M.', curso: 'Direito — PUC', text: 'O feedback por competência me mostrou exatamente onde melhorar.', stars: 5 },
          ].map((t) => (
            <div key={t.name} className="card p-4 space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-brand-100 flex items-center justify-center text-sm font-bold text-brand-700">
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.curso}</p>
                </div>
                <div className="ml-auto text-yellow-400 text-sm">
                  {'★'.repeat(t.stars)}
                </div>
              </div>
              <p className="text-sm text-gray-600 italic">"{t.text}"</p>
            </div>
          ))}
        </div>

        <button
          onClick={onContinue}
          className="btn-primary w-full text-base"
        >
          Quero descobrir minha nota →
        </button>
      </div>
    </div>
  )
}
