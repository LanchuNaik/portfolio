import { useCallback, useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import Preloader from './components/Preloader'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'

const INTRO_KEY = 'ln-intro-seen'

// Show the intro once per browser session, and never to reduced-motion users.
function shouldShowIntro() {
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
    return !sessionStorage.getItem(INTRO_KEY)
  } catch {
    return false
  }
}

export default function App() {
  const [showIntro, setShowIntro] = useState(shouldShowIntro)
  const [ready, setReady] = useState(!showIntro)

  useEffect(() => {
    try {
      sessionStorage.setItem(INTRO_KEY, '1')
    } catch {
      // storage unavailable (private mode) — the intro simply shows again
    }
  }, [])

  const finishIntro = useCallback(() => {
    setShowIntro(false)
    setReady(true)
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <AnimatePresence>{showIntro && <Preloader onComplete={finishIntro} />}</AnimatePresence>
      <ScrollProgress />
      <Navbar />
      <Box component="main" id="main" sx={{ overflowX: 'clip' }}>
        <Hero ready={ready} />
        <Marquee />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </Box>
      <Footer />
    </MotionConfig>
  )
}
