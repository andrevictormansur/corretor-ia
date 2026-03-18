import { useState } from 'react'
import EssayForm from './components/EssayForm.jsx'
import LoadingScreen from './components/LoadingScreen.jsx'
import ResultScreen from './components/ResultScreen.jsx'
import { corrigirRedacao } from './services/anthropic.js'

export default function App() {
  const [screen, setScreen] = useState('form') // 'form' | 'loading' | 'result' | 'error'
  const [resultado, setResultado] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(tema, redacao) {
    setScreen('loading')
    setErrorMsg('')
    try {
      const data = await corrigirRedacao(tema, redacao)
      setResultado(data)
      setScreen('result')
    } catch (err) {
      const msg = err.status === 401 || err.message?.includes('401')
        ? 'Chave da API inválida ou expirada. Atualize o arquivo .env com uma nova chave e reinicie o servidor.'
        : (err.message || 'Ocorreu um erro inesperado.')
      setErrorMsg(msg)
      setScreen('error')
    }
  }

  function handleReset() {
    setResultado(null)
    setErrorMsg('')
    setScreen('form')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-gray-50">
      {screen === 'form' && (
        <EssayForm onSubmit={handleSubmit} loading={false} />
      )}

      {screen === 'loading' && <LoadingScreen />}

      {screen === 'result' && resultado && (
        <ResultScreen resultado={resultado} onReset={handleReset} />
      )}

      {screen === 'error' && (
        <div className="flex min-h-screen items-center justify-center px-4">
          <div className="w-full max-w-sm text-center">
            <div className="mb-4 inline-flex items-center justify-center rounded-full bg-red-100 p-4">
              <svg className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="mb-2 text-xl font-bold text-gray-900">Algo deu errado</h2>
            <p className="mb-6 text-sm text-gray-500">{errorMsg}</p>
            <button onClick={handleReset} className="btn-primary">
              Tentar novamente
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
