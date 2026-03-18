import { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import AuthScreen from './AuthScreen'
import AppLayout from './AppLayout'
import NovaRedacaoScreen from './NovaRedacaoScreen'
import ResultadoScreen from './ResultadoScreen'
import HistoricoScreen from './HistoricoScreen'
import GraficoScreen from './GraficoScreen'

export default function AppRouter() {
  const [session, setSession] = useState(undefined) // undefined = loading

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    return () => subscription.unsubscribe()
  }, [])

  if (session === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-50">
        <div className="h-8 w-8 rounded-full border-4 border-brand-200 border-t-brand-600 animate-spin" />
      </div>
    )
  }

  if (!session) return <AuthScreen />

  return (
    <Routes>
      <Route element={<AppLayout session={session} />}>
        <Route index element={<NovaRedacaoScreen user={session.user} />} />
        <Route path="historico" element={<HistoricoScreen user={session.user} />} />
        <Route path="grafico" element={<GraficoScreen user={session.user} />} />
        <Route path="resultado" element={<ResultadoScreen user={session.user} />} />
      </Route>
    </Routes>
  )
}
