import { useRef } from 'react'
import { Box } from '@mui/material'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.16, 1])
  return (
    <motion.span style={{ opacity }}>
      {children}{' '}
    </motion.span>
  )
}

// Paragraph whose words light up one after another as it scrolls through view.
export default function ScrollRevealText({ text, sx }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'end 0.55'] })
  const words = text.split(' ')

  return (
    <Box component="p" ref={ref} sx={{ m: 0, ...sx }}>
      {reduce
        ? text
        : words.map((word, i) => (
            <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
              {word}
            </Word>
          ))}
    </Box>
  )
}
