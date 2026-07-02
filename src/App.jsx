import { Box } from '@mui/material'
import AuroraCanvas from './components/AuroraCanvas'
import AnimatedBackground from './components/AnimatedBackground'
import CursorGlow from './components/CursorGlow'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <Box sx={{ position: 'relative' }}>
      <AuroraCanvas />
      <AnimatedBackground />
      <CursorGlow />
      <ScrollProgress />
      <Navbar />
      <Box component="main">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </Box>
      <Footer />
    </Box>
  )
}
