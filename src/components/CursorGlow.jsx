import { useEffect, useRef } from 'react'

// A soft glow that trails the pointer with a little easing. Pure DOM + rAF so it
// never triggers React re-renders. Hidden on touch devices via CSS.
export default function CursorGlow() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let targetX = window.innerWidth / 2
    let targetY = window.innerHeight / 2
    let x = targetX
    let y = targetY
    let raf

    const onMove = (e) => {
      targetX = e.clientX
      targetY = e.clientY
    }

    const tick = () => {
      x += (targetX - x) * 0.15
      y += (targetY - y) * 0.15
      el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onMove)
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return <div ref={ref} className="cursor-glow" />
}
