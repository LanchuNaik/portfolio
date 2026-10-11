import { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { EASE } from './ui/layout'

// Cycles through `words` with a vertical slot-machine slide.
export default function RotatingWord({ words, interval = 2600, play = true }) {
  const [index, setIndex] = useState(0)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce || !play) return undefined
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval)
    return () => clearInterval(id)
  }, [reduce, play, words.length, interval])

  return (
    <Box
      component="span"
      sx={{ position: 'relative', display: 'inline-flex', overflow: 'hidden', verticalAlign: 'bottom', pb: '0.12em', mb: '-0.12em', pr: '0.1em' }}
    >
      <span className="sr-only">{words[0]}</span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[index]}
          aria-hidden
          className="serif accent"
          initial={{ y: '105%' }}
          animate={{ y: '0%' }}
          exit={{ y: '-105%' }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ display: 'inline-block' }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </Box>
  )
}
