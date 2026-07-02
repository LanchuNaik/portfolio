import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

// Wraps content in a subtle 3D tilt that follows the cursor, plus a moving
// highlight sheen. Reads as tactile without being gimmicky.
export default function TiltCard({ children, max = 8, style, ...props }) {
  const ref = useRef(null)
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)

  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), {
    stiffness: 200,
    damping: 20,
  })
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), {
    stiffness: 200,
    damping: 20,
  })

  // sheen position tracks the cursor
  const sheenX = useTransform(px, [0, 1], ['0%', '100%'])
  const sheenY = useTransform(py, [0, 1], ['0%', '100%'])

  const handleMove = (e) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    px.set((e.clientX - rect.left) / rect.width)
    py.set((e.clientY - rect.top) / rect.height)
  }

  const reset = () => {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        transformPerspective: 900,
        position: 'relative',
        height: '100%',
        ...style,
      }}
      {...props}
    >
      {children}
      <motion.div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          pointerEvents: 'none',
          opacity: 0.5,
          background: useTransform(
            [sheenX, sheenY],
            ([x, y]) =>
              `radial-gradient(240px circle at ${x} ${y}, rgba(255,255,255,0.06), transparent 60%)`,
          ),
        }}
      />
    </motion.div>
  )
}
