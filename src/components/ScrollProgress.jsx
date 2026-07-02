import { motion, useScroll, useSpring } from 'framer-motion'

// Thin gradient bar at the very top that fills as you scroll the page.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        transformOrigin: '0%',
        scaleX,
        zIndex: 2000,
        background: 'linear-gradient(90deg,#6e56f7,#35e0d4)',
      }}
    />
  )
}
