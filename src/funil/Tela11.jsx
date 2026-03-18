import { useState } from 'react'

const BENEFITS = [
  '✅ Correções ilimitadas com IA',
  '✅ Nota por competência + feedback detalhado',
  '✅ Plano de melhoria personalizado',
  '✅ Histórico e evolução das suas redações',
  '✅ Temas novos toda semana (pré-ENEM)',
]

// Tela 11 — Pricing
export default function Tela11({ resultado, curso }) {
  const [plan, setPlan] = useState('annual')

  const nota = resultado?.nota_total || 640
  const meta = 920
  const gap = meta - nota

  return (
    <div className="funil-screen px-5 pt-8 pb-16">
      {/* Progress bar — completed */}
      <div className="fixed top-0 left-0 right-0 h-0.5 bg-gray-100 z-50">
        <div className="h-full bg-brand-600" style={{ width: '100%' }} />
      </div>

      {/* Logo */}
      <div className="mb-6 text-center">
        <img src="/logo-light.svg" alt="Approva.AI" className="h-7 mx-auto" />
      </div>

      <div className="funil-enter space-y-5">
        {/* Header */}
        <div className="text-center space-y-1">
          <div className="inline-block rounded-full bg-brand-100 px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand-700">
            Seu plano personalizado
          </div>
          <h1 className="text-2xl font-extrabold leading-tight text-gray-900">
            Chegue a <span className="text-brand-600">940+</span><br />
            e garanta sua vaga em <span className="text-brand-600">{curso}</span>
          </h1>
        </div>

        {/* Progress visual */}
        <div className="card p-4 space-y-3">
          <div className="flex items-center justify-between text-sm font-semibold">
            <span className="text-gray-500">Nota atual</span>
            <span className="text-brand-600 font-bold">{nota}</span>
          </div>
          <div className="relative h-3 w-full rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-600"
              style={{ width: `${(nota / 1000) * 100}%` }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-white border-2 border-brand-600 shadow"
              style={{ left: `calc(${(nota / 1000) * 100}% - 10px)` }}
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">0</span>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full">
                +{gap} pontos para 940+
              </span>
            </div>
            <span className="text-gray-400">1000</span>
          </div>
        </div>

        {/* Benefits */}
        <div className="card p-4 space-y-2.5">
          <p className="text-sm font-bold text-gray-700">Tudo que está incluso:</p>
          {BENEFITS.map((b) => (
            <p key={b} className="text-sm text-gray-700">{b}</p>
          ))}
        </div>

        {/* Plan toggle */}
        <div className="flex rounded-2xl bg-gray-100 p-1 gap-1">
          {[
            { id: 'annual', label: 'Anual', badge: 'Mais popular' },
            { id: 'monthly', label: 'Mensal', badge: null },
          ].map((p) => (
            <button
              key={p.id}
              onClick={() => setPlan(p.id)}
              className={`relative flex-1 rounded-xl py-2.5 text-sm font-bold transition-all ${
                plan === p.id
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {p.label}
              {p.badge && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-brand-600 px-2 py-0.5 text-[10px] font-bold text-white">
                  {p.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Price display */}
        {plan === 'annual' ? (
          <div className="card p-5 text-center space-y-1 ring-2 ring-brand-200">
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-sm font-semibold text-gray-500">R$</span>
              <span className="text-5xl font-black text-gray-900">14</span>
              <span className="text-2xl font-black text-gray-900">,99</span>
              <span className="text-sm font-medium text-gray-500">/mês</span>
            </div>
            <p className="text-xs text-gray-500">Cobrado anualmente — R$179,90/ano</p>
            <div className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
              Economize 62% vs mensal
            </div>
          </div>
        ) : (
          <div className="card p-5 text-center space-y-1">
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-sm font-semibold text-gray-500">R$</span>
              <span className="text-5xl font-black text-gray-900">39</span>
              <span className="text-2xl font-black text-gray-900">,90</span>
              <span className="text-sm font-medium text-gray-500">/mês</span>
            </div>
            <p className="text-xs text-gray-500">Cobrado mensalmente • cancele quando quiser</p>
          </div>
        )}

        {/* CTA */}
        <div className="space-y-2">
          <a
            href="#"
            className="btn-primary w-full text-base text-center block"
          >
            {plan === 'annual'
              ? 'Começar por R$14,99/mês →'
              : 'Começar por R$39,90/mês →'}
          </a>
          <p className="text-center text-xs text-gray-400">
            🔒 Pagamento seguro • Garantia de 7 dias
          </p>
        </div>

        {/* Social proof footer */}
        <div className="text-center space-y-1 pt-2">
          <div className="flex items-center justify-center gap-1 text-yellow-400 text-sm">
            {'★★★★★'}
          </div>
          <p className="text-xs text-gray-500 font-medium">
            Mais de 10.000 candidatos já usam o Approva.AI
          </p>
        </div>
      </div>
    </div>
  )
}
