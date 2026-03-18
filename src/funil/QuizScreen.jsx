import { useState } from 'react'

const QUESTIONS = [
  {
    id: 'q1',
    question: 'Quando é seu ENEM?',
    options: [
      { label: 'Este ano', value: 'este_ano', emoji: '🎯' },
      { label: 'Ano que vem', value: 'proximo_ano', emoji: '📅' },
      { label: 'Ainda não decidi', value: 'nao_decidido', emoji: '🤔' },
    ],
  },
  {
    id: 'q2',
    question: 'Qual sua maior dificuldade na redação?',
    options: [
      { label: 'Argumentação', value: 'argumentacao', emoji: '💭' },
      { label: 'Coesão e conectivos', value: 'coesao', emoji: '🔗' },
      { label: 'Proposta de intervenção', value: 'proposta', emoji: '💡' },
      { label: 'Não sei por onde começar', value: 'nao_sei', emoji: '❓' },
    ],
  },
  {
    id: 'q3',
    question: 'Qual nota você acha que tiraria hoje?',
    options: [
      { label: 'Abaixo de 500', value: 'abaixo_500', emoji: '😟' },
      { label: 'Entre 500 e 700', value: '500_700', emoji: '😐' },
      { label: 'Acima de 700', value: 'acima_700', emoji: '😊' },
    ],
  },
]

const COMPLETION_MESSAGES = {
  este_ano: 'Você tem pouco tempo — cada redação corrigida conta muito.',
  proximo_ano: 'Você tem tempo para evoluir bastante com treino constante.',
  nao_decidido: 'Quanto antes você treinar, mais chances de uma nota alta.',
}

export default function QuizScreen({ onComplete }) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [done, setDone] = useState(false)
  const [animKey, setAnimKey] = useState(0)

  function selectOption(value) {
    const newAnswers = { ...answers, [QUESTIONS[step].id]: value }
    setAnswers(newAnswers)

    if (step < QUESTIONS.length - 1) {
      setAnimKey((k) => k + 1)
      setTimeout(() => setStep((s) => s + 1), 60)
    } else {
      setDone(true)
    }
  }

  // Completion screen
  if (done) {
    const msg = COMPLETION_MESSAGES[answers.q1] ?? 'Vamos descobrir sua nota real agora!'
    return (
      <div className="funil-screen flex flex-col items-center justify-center px-5 py-12 text-center">
        <div className="funil-enter w-full max-w-xs">
          <div className="mb-4 text-5xl">🎯</div>
          <h2 className="mb-2 text-2xl font-extrabold text-gray-900">Perfeito!</h2>
          <p className="mb-5 text-base text-gray-500">{msg}</p>
          <div className="mb-7 rounded-2xl bg-brand-50 px-4 py-3.5">
            <p className="text-sm font-semibold text-brand-700">
              Cole sua redação e veja sua nota real em segundos
            </p>
          </div>
          <button onClick={() => onComplete(answers)} className="btn-primary w-full">
            Descobrir minha nota real →
          </button>
        </div>
      </div>
    )
  }

  const q = QUESTIONS[step]
  const pct = ((step + 1) / QUESTIONS.length) * 100

  return (
    <div className="funil-screen flex flex-col px-5 pt-8 pb-10">
      {/* Logo */}
      <div className="mb-7 text-center">
        <span className="text-lg font-extrabold text-brand-600">
          Corretor<span className="text-gray-900">IA</span>
        </span>
      </div>

      {/* Progress */}
      <div className="mb-8">
        <div className="mb-1.5 flex justify-between text-xs font-semibold text-gray-400">
          <span>Pergunta {step + 1} de {QUESTIONS.length}</span>
          <span>{Math.round(pct)}%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-brand-600 transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div key={animKey} className="funil-enter flex-1">
        <h2 className="mb-6 text-center text-xl font-extrabold leading-snug text-gray-900">
          {q.question}
        </h2>
        <div className="space-y-3">
          {q.options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => selectOption(opt.value)}
              className="flex w-full items-center gap-3.5 rounded-2xl border-2 border-gray-100 bg-white px-4 py-4 text-left shadow-sm transition-all duration-150 hover:border-brand-300 hover:bg-brand-50 active:scale-[0.97]"
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
