import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import FunilApp from './funil/FunilApp.jsx'
import SpotMasterApp from './spotmaster/SpotMasterApp.jsx'
import './index.css'

const path = window.location.pathname.replace(/\/$/, '') || '/'

const Root = () => {
  if (path === '/corretor') return <App />
  if (path === '/spotmaster') return <SpotMasterApp />
  return <FunilApp />
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
)
