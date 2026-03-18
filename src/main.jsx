import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import FunilApp from './funil/FunilApp.jsx'
import SpotMasterApp from './spotmaster/SpotMasterApp.jsx'
import AppRouter from './app/AppRouter.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FunilApp />} />
        <Route path="/corretor" element={<App />} />
        <Route path="/spotmaster/*" element={<SpotMasterApp />} />
        <Route path="/app/*" element={<AppRouter />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
