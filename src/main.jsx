import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import FunilApp from './funil/FunilApp.jsx'
import SpotMasterApp from './spotmaster/SpotMasterApp.jsx'
import './index.css'

const path = window.location.pathname

const Root = () => {
  if (path === '/funil') return <FunilApp />
  if (path === '/spotmaster') return <SpotMasterApp />
  return <App />
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
)
