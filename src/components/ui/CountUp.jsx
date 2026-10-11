import { useEffect, useRef } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'

// Counts from 0 to `value` the first time it scrolls into view. The text is
// written straight to the DOM so the animation never re-renders React.
export default function CountUp({ value, decimals = 0, suffix = '', duration = 1.8 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const reduce = useReducedMotion()
  const final = `${value.toFixed(decimals)}${suffix}`

  useEffect(() => {
    const node = ref.current
    if (!inView || !node) return undefined
    if (reduce) {
      node.textContent = final
      return undefined
    }
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        node.textContent = `${v.toFixed(decimals)}${suffix}`
      },
    })
    return () => controls.stop()
  }, [inView, reduce, value, decimals, suffix, duration, final])

  return (
    <>
      <span ref={ref} aria-hidden>
        {`${(0).toFixed(decimals)}${suffix}`}
      </span>
      <span className="sr-only">{final}</span>
    </>
  )
}
