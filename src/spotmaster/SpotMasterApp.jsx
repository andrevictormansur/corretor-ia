import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'

import HomeScreen from './screens/HomeScreen'
import QuizRegion from './screens/QuizRegion'
import QuizStyle from './screens/QuizStyle'
import QuizExperience from './screens/QuizExperience'
import QuizChallenge from './screens/QuizChallenge'
import QuizCompeting from './screens/QuizCompeting'
import MappingScreen from './screens/MappingScreen'
import SpotsFoundScreen from './screens/SpotsFoundScreen'
import UnlockMapScreen from './screens/UnlockMapScreen'
import FinalCTAScreen from './screens/FinalCTAScreen'
import CheckoutScreen from './screens/CheckoutScreen'
import SuccessScreen from './screens/SuccessScreen'
import AppDashboard from './screens/AppDashboard'

const SCREENS = [
  'home',
  'quiz-region',
  'quiz-style',
  'quiz-experience',
  'quiz-challenge',
  'quiz-competing',
  'mapping',
  'spots-found',
  'unlock-map',
  'final-cta',
  'checkout',
  'success',
  'dashboard',
]

export default function SpotMasterApp() {
  const isDashboard = window.location.pathname === '/spotmaster/dashboard'
  const [screenIndex, setScreenIndex] = useState(isDashboard ? SCREENS.indexOf('dashboard') : 0)
  const [answers, setAnswers] = useState({})

  const screen = SCREENS[screenIndex]

  const goNext = (newAnswers = {}) => {
    setAnswers((prev) => ({ ...prev, ...newAnswers }))
    setScreenIndex((i) => Math.min(i + 1, SCREENS.length - 1))
  }

  const goBack = () => setScreenIndex((i) => Math.max(i - 1, 0))

  // Quiz steps are 1-indexed, screens 1-5 are quiz steps
  const quizStep = screenIndex // 1 = region, 2 = style, ...
  const totalSteps = 5

  return (
    <div className="max-w-sm mx-auto min-h-screen relative overflow-hidden" style={{ background: '#0A0C10' }}>
      <AnimatePresence mode="wait">
        {screen === 'home' && (
          <HomeScreen key="home" onStart={goNext} />
        )}
        {screen === 'quiz-region' && (
          <QuizRegion key="quiz-region" step={1} totalSteps={totalSteps} onNext={goNext} onBack={goBack} />
        )}
        {screen === 'quiz-style' && (
          <QuizStyle key="quiz-style" step={2} totalSteps={totalSteps} onNext={goNext} onBack={goBack} />
        )}
        {screen === 'quiz-experience' && (
          <QuizExperience key="quiz-experience" step={3} totalSteps={totalSteps} onNext={goNext} onBack={goBack} />
        )}
        {screen === 'quiz-challenge' && (
          <QuizChallenge key="quiz-challenge" step={4} totalSteps={totalSteps} onNext={goNext} onBack={goBack} />
        )}
        {screen === 'quiz-competing' && (
          <QuizCompeting key="quiz-competing" step={5} totalSteps={totalSteps} onNext={goNext} onBack={goBack} />
        )}
        {screen === 'mapping' && (
          <MappingScreen key="mapping" onNext={goNext} answers={answers} />
        )}
        {screen === 'spots-found' && (
          <SpotsFoundScreen key="spots-found" onNext={goNext} answers={answers} />
        )}
        {screen === 'unlock-map' && (
          <UnlockMapScreen key="unlock-map" onNext={goNext} />
        )}
        {screen === 'final-cta' && (
          <FinalCTAScreen key="final-cta" onNext={goNext} onSkip={goNext} answers={answers} />
        )}
        {screen === 'checkout' && (
          <CheckoutScreen key="checkout" onNext={goNext} onBack={goBack} />
        )}
        {screen === 'success' && (
          <SuccessScreen key="success" answers={answers} onEnter={goNext} />
        )}
        {screen === 'dashboard' && (
          <AppDashboard key="dashboard" answers={answers} />
        )}
      </AnimatePresence>
    </div>
  )
}
