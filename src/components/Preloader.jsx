import { useEffect, useRef } from 'react'
import { Box } from '@mui/material'
import { animate, motion } from 'framer-motion'
import { EASE, monoLabelSx } from './ui/layout'

const CURTAIN = [0.76, 0, 0.24, 1]

// Brief branded intro: counts to 100, then lifts away like a curtain.
export default function Preloader({ onComplete }) {
  const countRef = useRef(null)
  const barRef = useRef(null)

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden'
    const controls = animate(0, 100, {
      duration: 1.6,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => {
        if (countRef.current) countRef.current.textContent = String(Math.round(v)).padStart(3, '0')
        if (barRef.current) barRef.current.style.transform = `scaleX(${v / 100})`
      },
      onComplete: () => setTimeout(onComplete, 180),
    })
    return () => {
      controls.stop()
      document.documentElement.style.overflow = ''
    }
  }, [onComplete])

  const letters = 'Lanchana'.split('')

  return (
    <Box
      component={motion.div}
      role="status"
      aria-label="Loading portfolio"
      exit={{ y: '-100%' }}
      transition={{ duration: 1, ease: CURTAIN }}
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 4000,
        bgcolor: '#0D1322',
        color: '#EDEFF5',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        p: 'var(--gutter)',
        pt: { xs: 3, md: 4 },
        pb: { xs: 3, md: 4 },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ ...monoLabelSx, color: 'rgba(237,239,245,0.55)' }}>Portfolio — {new Date().getFullYear()}</Box>
        <Box sx={{ ...monoLabelSx, color: 'rgba(237,239,245,0.55)' }}>Bangalore, IN</Box>
      </Box>

      <Box sx={{ textAlign: 'center' }}>
        <Box className="serif" sx={{ fontSize: 'clamp(4rem, 14vw, 10rem)', lineHeight: 1, display: 'inline-flex', overflow: 'hidden', pb: '0.1em' }}>
          {letters.map((ch, i) => (
            <motion.span
              key={i}
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ delay: 0.1 + i * 0.05, duration: 0.9, ease: EASE }}
              style={{ display: 'inline-block' }}
            >
              {ch}
            </motion.span>
          ))}
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.7, duration: 0.6, ease: EASE }}
            style={{ display: 'inline-block', color: '#FF6A3D', fontStyle: 'normal' }}
          >
            .
          </motion.span>
        </Box>
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          sx={{ ...monoLabelSx, color: 'rgba(237,239,245,0.6)', mt: 1 }}
        >
          Junior Software Engineer · React.js & React Native
        </Box>
      </Box>

      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 1.5 }}>
          <Box sx={{ ...monoLabelSx, color: 'rgba(237,239,245,0.55)' }}>Loading experience</Box>
          <Box ref={countRef} sx={{ fontFamily: 'var(--font-mono)', fontSize: { xs: 36, md: 56 }, lineHeight: 1, fontWeight: 500, letterSpacing: '-0.04em' }}>
            000
          </Box>
        </Box>
        <Box sx={{ height: '1px', bgcolor: 'rgba(237,239,245,0.15)', overflow: 'hidden' }}>
          <Box ref={barRef} sx={{ height: '100%', bgcolor: '#FF6A3D', transform: 'scaleX(0)', transformOrigin: 'left' }} />
        </Box>
      </Box>
    </Box>
  )
}
