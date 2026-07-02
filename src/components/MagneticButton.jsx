import { useRef } from 'react'
import { Button } from '@mui/material'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const MotionButton = motion(Button)

// A Button that is gently "pulled" toward the cursor while hovered, then springs
// back on leave. Strength controls how far it travels.
export default function MagneticButton({ children, strength = 0.35, sx, ...props }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 250, damping: 18, mass: 0.5 })
  const springY = useSpring(y, { stiffness: 250, damping: 18, mass: 0.5 })

  const handleMove = (e) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const relX = e.clientX - (rect.left + rect.width / 2)
    const relY = e.clientY - (rect.top + rect.height / 2)
    x.set(relX * strength)
    y.set(relY * strength)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <MotionButton
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      sx={sx}
      {...props}
    >
      {children}
    </MotionButton>
  )
}
