import { useMemo, useState } from 'react'
import Tela1 from './Tela1.jsx'
import Tela2 from './Tela2.jsx'
import Tela3 from './Tela3.jsx'
import Tela4 from './Tela4.jsx'
import Tela5 from './Tela5.jsx'
import Tela6 from './Tela6.jsx'
import Tela7 from './Tela7.jsx'
import Tela8 from './Tela8.jsx'
import Tela9 from './Tela9.jsx'
import Tela10 from './Tela10.jsx'
import Tela11 from './Tela11.jsx'
import { corrigirRedacaoDemo } from '../services/anthropicDemo.js'

export default function FunilApp() {
  const [screen, setScreen] = useState(1)
  const [whenEnem, setWhenEnem] = useState('')
  const [curso, setCurso] = useState('')
  const [notaFaixa, setNotaFaixa] = useState('')
  const [resultado, setResultado] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Fixed random per session: 4104–12654
  const aprovados = useMemo(() => Math.floor(Math.random() * (12654 - 4104 + 1)) + 4104, [])

  async function handleEssaySubmit(tema, redacao) {
    setLoading(true)
    setError('')
    setScreen(8)
    try {
      const data = await corrigirRedacaoDemo(tema, redacao)
      setResultado(data)
      setScreen(9)
    } catch (err) {
      setError(err.message || 'Erro ao processar. Tente novamente.')
      setScreen(7)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {screen === 1 && (
        <Tela1
          onSelect={(when) => {
            setWhenEnem(when)
            setScreen(when === 'este_ano' ? 2 : 3)
          }}
        />
      )}
      {screen === 2 && <Tela2 onContinue={() => setScreen(3)} />}
      {screen === 3 && (
        <Tela3
          onSelect={(c) => { setCurso(c); setScreen(4) }}
        />
      )}
      {screen === 4 && (
        <Tela4
          curso={curso}
          aprovados={aprovados}
          onContinue={() => setScreen(5)}
        />
      )}
      {screen === 5 && (
        <Tela5
          onSelect={(faixa) => { setNotaFaixa(faixa); setScreen(6) }}
        />
      )}
      {screen === 6 && (
        <Tela6
          curso={curso}
          notaFaixa={notaFaixa}
          onContinue={() => setScreen(7)}
        />
      )}
      {screen === 7 && (
        <Tela7
          onSubmit={handleEssaySubmit}
          loading={loading}
          error={error}
        />
      )}
      {screen === 8 && <Tela8 />}
      {screen === 9 && resultado && (
        <Tela9
          resultado={resultado}
          curso={curso}
          onContinue={() => setScreen(10)}
        />
      )}
      {screen === 10 && <Tela10 onContinue={() => setScreen(11)} />}
      {screen === 11 && (
        <Tela11 resultado={resultado} curso={curso} />
      )}
    </div>
  )
}
