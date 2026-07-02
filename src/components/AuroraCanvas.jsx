import { useEffect, useRef } from 'react'

// Canvas-drawn ambient aurora: a handful of large, soft radial-gradient orbs
// drift on independent sine paths. Calm, GPU-cheap, and respects reduced-motion.
export default function AuroraCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = 0
    let height = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)

    const orbs = [
      { hue: '110,86,247', r: 0.42, ax: 0.18, ay: 0.12, sx: 0.00016, sy: 0.00021, px: 0.28, py: 0.30 },
      { hue: '53,224,212', r: 0.36, ax: 0.16, ay: 0.14, sx: 0.00022, sy: 0.00013, px: 0.74, py: 0.34 },
      { hue: '157,136,255', r: 0.40, ax: 0.14, ay: 0.16, sx: 0.00012, sy: 0.00019, px: 0.50, py: 0.72 },
      { hue: '86,65,214', r: 0.30, ax: 0.20, ay: 0.10, sx: 0.00019, sy: 0.00016, px: 0.20, py: 0.78 },
    ]

    const resize = () => {
      width = canvas.clientWidth
      height = canvas.clientHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = (t) => {
      ctx.clearRect(0, 0, width, height)
      ctx.globalCompositeOperation = 'lighter'
      const base = Math.min(width, height)

      orbs.forEach((o) => {
        const cx = width * o.px + Math.sin(t * o.sx) * width * o.ax
        const cy = height * o.py + Math.cos(t * o.sy) * height * o.ay
        const radius = base * o.r
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius)
        g.addColorStop(0, `rgba(${o.hue},0.22)`)
        g.addColorStop(0.5, `rgba(${o.hue},0.08)`)
        g.addColorStop(1, `rgba(${o.hue},0)`)
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(cx, cy, radius, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.globalCompositeOperation = 'source-over'
    }

    let raf
    const loop = (time) => {
      draw(time)
      raf = requestAnimationFrame(loop)
    }

    resize()
    window.addEventListener('resize', resize)

    if (reduce) {
      draw(0) // single static frame
    } else {
      raf = requestAnimationFrame(loop)
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        opacity: 0.9,
      }}
    />
  )
}
