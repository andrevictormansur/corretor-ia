const BENEFITS = [
  { emoji: '✅', text: 'Corrija redações ilimitadas com IA' },
  { emoji: '✅', text: 'Feedback detalhado nas 5 competências do ENEM' },
  { emoji: '✅', text: 'Acompanhe sua evolução redação a redação' },
]

// TODO: replace with your Cakto checkout links
const LINKS = {
  annual: '#',
  monthly: '#',
}

export default function PitchScreen({ resultado }) {
  const notaAtual = resultado?.nota_total ?? 620

  return (
    <div className="funil-screen px-5 pt-8 pb-14">
      {/* Logo */}
      <div className="mb-6 text-center">
        <img src="/logo-light.svg" alt="Approva.AI" className="h-7 mx-auto" />
      </div>

      <div className="funil-enter space-y-5">

        {/* Headline */}
        <div className="text-center">
          <div className="mb-3 text-4xl">🚀</div>
          <h1 className="text-2xl font-extrabold leading-snug text-gray-900">
            Você ainda pode chegar a{' '}
            <span className="text-brand-600">900+</span>
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Com redações corrigidas e feedback real, estudantes evoluem em semanas.
          </p>
        </div>

        {/* Progress: hoje → meta */}
        <div className="card p-4">
          <p className="mb-4 text-center text-xs font-bold uppercase tracking-wider text-gray-400">
            Sua jornada
          </p>
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-center gap-1">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-lg font-extrabold leading-none text-amber-600">
                {notaAtual}
              </div>
              <span className="text-[10px] font-semibold text-gray-400">Hoje</span>
            </div>

            <div className="flex flex-1 flex-col gap-1">
              <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-400 to-brand-600"
                  style={{ width: `${(notaAtual / 1000) * 60 + 5}%` }}
                />
              </div>
              <p className="text-center text-[10px] font-medium text-gray-400">
                com treino constante
              </p>
            </div>

            <div className="flex flex-col items-center gap-1">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-100 text-lg font-extrabold leading-none text-brand-600">
                920
              </div>
              <span className="text-[10px] font-semibold text-brand-600">Meta</span>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="space-y-2">
          {BENEFITS.map((b, i) => (
            <div key={i} className="flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3.5">
              <span className="text-lg">{b.emoji}</span>
              <span className="text-sm font-semibold text-gray-800">{b.text}</span>
            </div>
          ))}
        </div>

        {/* Pricing */}
        <div className="space-y-3">
          {/* Annual — highlighted */}
          <div className="relative rounded-2xl border-2 border-brand-600 bg-brand-50 p-4 pt-5">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <span className="rounded-full bg-brand-600 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white shadow">
                Mais popular
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-gray-900">Plano Anual</p>
                <p className="text-xs text-green-600 font-semibold">Economize R$178,90</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-extrabold text-brand-600">R$179,90</p>
                <p className="text-xs text-gray-400">∼R$15/mês</p>
              </div>
            </div>
          </div>

          {/* Monthly */}
          <div className="rounded-2xl border border-gray-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-gray-900">Plano Mensal</p>
                <p className="text-xs text-gray-400">Cancele quando quiser</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-extrabold text-gray-700">R$29,90</p>
                <p className="text-xs text-gray-400">/mês</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="space-y-3 pt-1">
          <a href={LINKS.annual} className="btn-primary flex w-full items-center justify-center text-base">
            Quero corrigir redações ilimitadas →
          </a>
          <p className="text-center text-xs text-gray-400">
            Acesso imediato · Sem fidelidade · Cancele quando quiser
          </p>
        </div>

        {/* Urgency */}
        <div className="rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3.5 text-center">
          <p className="text-sm font-semibold text-amber-700">
            ⚡ Cada redação corrigida agora vale pontos no ENEM
          </p>
        </div>

      </div>
    </div>
  )
}
