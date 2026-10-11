import { motion, useScroll, useSpring } from 'framer-motion'

// Thin accent bar at the very top that fills as the page is scrolled.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      aria-hidden
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        transformOrigin: '0%',
        scaleX,
        zIndex: 2000,
        background: 'var(--accent)',
      }}
    />
  )
}
