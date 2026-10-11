import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// Gently pulls its child toward the cursor while hovered, then springs back.
// Mouse only — touch and pen input are ignored.
export default function Magnetic({ children, strength = 0.3, style }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 })

  const handleMove = (e) => {
    if (e.pointerType !== 'mouse') return
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ display: 'inline-flex', x: springX, y: springY, ...style }}
    >
      {children}
    </motion.div>
  )
}
