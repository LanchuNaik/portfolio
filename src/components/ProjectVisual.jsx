import { useLayoutEffect, useRef, useState } from 'react'
import { Box } from '@mui/material'
import { motion } from 'framer-motion'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import LockRoundedIcon from '@mui/icons-material/LockRounded'
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded'
import StarRoundedIcon from '@mui/icons-material/StarRounded'
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded'
import { EASE } from './ui/layout'

// Illustrated, code-drawn product mock-ups for each project. Every scene is
// laid out on a fixed 560×440 canvas and scaled to fit its panel.
const W = 560
const H = 440

const tint = (pct) => `color-mix(in srgb, var(--p) ${pct}%, transparent)`
const text = (size, weight = 500, color = 'var(--ink)') => ({ fontSize: size, fontWeight: weight, color, lineHeight: 1.3 })
const mono = { fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted)' }

function Stage({ color, children }) {
  const ref = useRef(null)
  const [scale, setScale] = useState(1)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return undefined
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      if (width && height) setScale(Math.min(width / W, height / H, 1.25))
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Box ref={ref} aria-hidden sx={{ position: 'absolute', inset: 0, overflow: 'hidden', '--p': color }}>
      <Box
        sx={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: W,
          height: H,
          transform: `translate(-50%, -50%) scale(${scale})`,
          fontFamily: 'var(--font-sans)',
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

// Enters when scrolled into view, then bobs gently (CSS) forever.
function Float({ children, sx, delay = 0, bob = 6, rotate = 0 }) {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 24, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      sx={{ position: 'absolute', zIndex: 2, ...sx }}
    >
      <Box sx={{ animation: `bob ${bob}s ease-in-out ${delay}s infinite`, rotate: `${rotate}deg` }}>
        <Box
          sx={{
            bgcolor: 'var(--bg-elev)',
            border: '1px solid var(--line)',
            borderRadius: '16px',
            boxShadow: 'var(--shadow-lg)',
            p: 1.5,
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  )
}

function Phone({ children, sx }) {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: EASE }}
      sx={{
        position: 'absolute',
        zIndex: 1,
        width: 204,
        height: 410,
        borderRadius: '38px',
        bgcolor: '#0D1322',
        p: '7px',
        boxShadow: '0 40px 80px -30px rgba(13,19,34,0.55), 0 0 0 1px var(--line-strong)',
        ...sx,
      }}
    >
      <Box sx={{ position: 'relative', height: '100%', borderRadius: '31px', overflow: 'hidden', bgcolor: 'var(--bg-elev)' }}>
        <Box sx={{ position: 'absolute', top: 7, left: '50%', ml: '-30px', width: 60, height: 17, borderRadius: 10, bgcolor: '#0D1322', zIndex: 5 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 2.25, pt: 1, height: 30, alignItems: 'center', ...text(10, 600) }}>
          <span>9:41</span>
          <Box sx={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
            <Box sx={{ width: 13, height: 7, borderRadius: '2px', border: '1px solid var(--ink)' }} />
          </Box>
        </Box>
        {children}
      </Box>
    </Box>
  )
}

function Browser({ children, sx, url }) {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: EASE }}
      sx={{
        position: 'absolute',
        zIndex: 1,
        borderRadius: '14px',
        overflow: 'hidden',
        bgcolor: 'var(--bg-elev)',
        border: '1px solid var(--line-strong)',
        boxShadow: '0 40px 80px -30px rgba(13,19,34,0.45)',
        display: 'flex',
        flexDirection: 'column',
        ...sx,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px', px: 1.5, height: 30, borderBottom: '1px solid var(--line)', bgcolor: 'var(--bg-sunk)', flexShrink: 0 }}>
        {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => (
          <Box key={c} sx={{ width: 9, height: 9, borderRadius: '50%', bgcolor: c }} />
        ))}
        <Box sx={{ ml: 2, flex: 1, maxWidth: 210, height: 16, borderRadius: 8, bgcolor: 'var(--bg-elev)', display: 'flex', alignItems: 'center', px: 1, ...text(8.5, 500, 'var(--muted)') }}>
          {url}
        </Box>
      </Box>
      <Box sx={{ flex: 1, minHeight: 0, position: 'relative' }}>{children}</Box>
    </Box>
  )
}

function Bar({ value, delay = 0, height = 6, track = 'var(--bg-sunk)' }) {
  return (
    <Box sx={{ height, borderRadius: height, bgcolor: track, overflow: 'hidden', flex: 1 }}>
      <Box
        component={motion.div}
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay, ease: EASE }}
        sx={{ height: '100%', borderRadius: height, bgcolor: 'var(--p)' }}
      />
    </Box>
  )
}

function Avatar({ label, size = 28, sx }) {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: '50%',
        flexShrink: 0,
        display: 'grid',
        placeItems: 'center',
        background: `linear-gradient(135deg, ${tint(90)}, ${tint(45)})`,
        color: '#fff',
        fontSize: size * 0.36,
        fontWeight: 600,
        ...sx,
      }}
    >
      {label}
    </Box>
  )
}

/* ---------------------------------------------------------------- Tipsy */

function QrCode({ size = 92 }) {
  const n = 21
  const cells = []
  const finder = (x, y) => {
    const inBox = (ox, oy) => x >= ox && x < ox + 7 && y >= oy && y < oy + 7
    const ring = (ox, oy) => {
      const dx = x - ox
      const dy = y - oy
      return dx === 0 || dx === 6 || dy === 0 || dy === 6 || (dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4)
    }
    if (inBox(0, 0)) return ring(0, 0) ? 1 : 0
    if (inBox(n - 7, 0)) return ring(n - 7, 0) ? 1 : 0
    if (inBox(0, n - 7)) return ring(0, n - 7) ? 1 : 0
    return null
  }
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      const f = finder(x, y)
      const on = f === null ? (x * 7 + y * 13 + x * y * 3) % 5 < 2 : f === 1
      if (on) cells.push(<rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" />)
    }
  }
  return (
    <svg width={size} height={size} viewBox={`0 0 ${n} ${n}`} shapeRendering="crispEdges">
      <g fill="var(--ink)">{cells}</g>
    </svg>
  )
}

function TipsyScene() {
  return (
    <>
      <Phone sx={{ left: 178, top: 15 }}>
        <Box sx={{ px: 1.75, pt: 1, display: 'flex', flexDirection: 'column', height: 'calc(100% - 30px)' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, ...text(11.5, 600) }}>
            <ChevronLeftRoundedIcon sx={{ fontSize: 16 }} /> Tip your server
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
            <Avatar label="MR" size={54} />
            <Box sx={{ ...text(13, 600), mt: 1 }}>Maria R.</Box>
            <Box sx={text(9.5, 500, 'var(--muted)')}>Server · Table 12</Box>
            <Box sx={{ display: 'flex', mt: 0.5, color: 'var(--p)' }}>
              {[0, 1, 2, 3, 4].map((i) => (
                <StarRoundedIcon key={i} sx={{ fontSize: 13 }} />
              ))}
            </Box>
          </Box>
          <Box sx={{ ...mono, mt: 2, mb: 1 }}>Select amount</Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0.75 }}>
            {['$5', '$10', '$15'].map((v) => (
              <Box
                key={v}
                sx={{
                  height: 34,
                  borderRadius: '10px',
                  display: 'grid',
                  placeItems: 'center',
                  ...text(12, 600, v === '$10' ? '#fff' : 'var(--ink)'),
                  bgcolor: v === '$10' ? 'var(--p)' : 'var(--bg-sunk)',
                }}
              >
                {v}
              </Box>
            ))}
          </Box>
          <Box sx={{ mt: 0.75, height: 30, borderRadius: '10px', border: '1px dashed var(--line-strong)', display: 'grid', placeItems: 'center', ...text(10.5, 500, 'var(--muted)') }}>
            Custom amount
          </Box>
          <Box sx={{ flex: 1 }} />
          <Box sx={{ height: 38, borderRadius: '12px', bgcolor: 'var(--ink)', color: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.75, ...text(12, 600, 'var(--bg)') }}>
            <LockRoundedIcon sx={{ fontSize: 13 }} /> Pay $10.00
          </Box>
          <Box sx={{ textAlign: 'center', mt: 0.75, mb: 1.5, ...text(8.5, 500, 'var(--muted)') }}>Secured by Stripe</Box>
        </Box>
      </Phone>

      <Float sx={{ left: 26, top: 64 }} delay={0.25} bob={7} rotate={-6}>
        <Box sx={{ ...text(11, 600), mb: 1 }}>Scan to tip</Box>
        <Box sx={{ p: 0.75, borderRadius: '8px', bgcolor: 'var(--bg-elev)', border: '1px solid var(--line)' }}>
          <QrCode />
        </Box>
        <Box sx={{ ...mono, mt: 1 }}>Table 12</Box>
      </Float>

      <Float sx={{ right: 18, top: 44, width: 178 }} delay={0.4} bob={8}>
        <Box sx={mono}>Owner dashboard</Box>
        <Box sx={{ ...text(10, 500, 'var(--muted)'), mt: 1 }}>Today&apos;s tips</Box>
        <Box sx={{ ...text(22, 600), letterSpacing: '-0.03em' }}>$1,248</Box>
        <svg width="150" height="40" viewBox="0 0 150 40" style={{ marginTop: 4 }}>
          <defs>
            <linearGradient id="tipsy-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--p)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="var(--p)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0 32 L20 26 L40 29 L60 18 L80 21 L100 11 L120 14 L150 4 L150 40 L0 40 Z" fill="url(#tipsy-area)" />
          <path d="M0 32 L20 26 L40 29 L60 18 L80 21 L100 11 L120 14 L150 4" fill="none" stroke="var(--p)" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      </Float>

      <Float sx={{ right: 30, bottom: 56, width: 196 }} delay={0.6} bob={6}>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Box sx={{ width: 28, height: 28, borderRadius: '50%', bgcolor: '#16A34A', color: '#fff', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
            <CheckRoundedIcon sx={{ fontSize: 17 }} />
          </Box>
          <Box>
            <Box sx={text(11.5, 600)}>Payment successful</Box>
            <Box sx={text(9.5, 500, 'var(--muted)')}>Tip sent to Maria · $10.00</Box>
          </Box>
        </Box>
      </Float>
    </>
  )
}

/* ---------------------------------------------------- Celebrity Calendar */

function CalendarScene() {
  const offset = 4 // 1 Oct 2026 is a Thursday
  const events = [3, 9, 14, 22, 27]
  const selected = 17
  return (
    <>
      <Phone sx={{ left: 178, top: 15 }}>
        <Box sx={{ px: 1.75, pt: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={text(13, 600)}>October 2026</Box>
            <Box sx={{ display: 'flex', color: 'var(--muted)' }}>
              <ChevronLeftRoundedIcon sx={{ fontSize: 16 }} />
              <ChevronRightRoundedIcon sx={{ fontSize: 16 }} />
            </Box>
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', mt: 1.5, rowGap: 0.5, textAlign: 'center' }}>
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
              <Box key={i} sx={{ ...mono, fontSize: 8, letterSpacing: 0 }}>
                {d}
              </Box>
            ))}
            {Array.from({ length: 35 }, (_, i) => {
              const day = i - offset + 1
              const valid = day >= 1 && day <= 31
              const isSel = day === selected
              return (
                <Box key={i} sx={{ position: 'relative', height: 24, display: 'grid', placeItems: 'center' }}>
                  {valid && (
                    <Box
                      sx={{
                        width: 22,
                        height: 22,
                        borderRadius: '50%',
                        display: 'grid',
                        placeItems: 'center',
                        bgcolor: isSel ? 'var(--p)' : 'transparent',
                        ...text(9.5, isSel ? 700 : 500, isSel ? '#fff' : 'var(--ink-2)'),
                      }}
                    >
                      {day}
                    </Box>
                  )}
                  {valid && events.includes(day) && (
                    <Box sx={{ position: 'absolute', bottom: 0, width: 4, height: 4, borderRadius: '50%', bgcolor: 'var(--p)' }} />
                  )}
                </Box>
              )
            })}
          </Box>
          <Box sx={{ ...mono, mt: 2, mb: 1 }}>Upcoming</Box>
          {[
            { t: 'Meet & Greet', d: 'Sat, 17 Oct · 6:30 PM', strong: true },
            { t: 'Studio session', d: 'Thu, 22 Oct · 11:00 AM' },
          ].map((e) => (
            <Box
              key={e.t}
              sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 1, mb: 0.75, borderRadius: '12px', bgcolor: e.strong ? tint(12) : 'var(--bg-sunk)' }}
            >
              <Box sx={{ width: 3, alignSelf: 'stretch', borderRadius: 2, bgcolor: e.strong ? 'var(--p)' : 'var(--line-strong)' }} />
              <Box sx={{ flex: 1 }}>
                <Box sx={text(11, 600)}>{e.t}</Box>
                <Box sx={text(9, 500, 'var(--muted)')}>{e.d}</Box>
              </Box>
              {e.strong && (
                <Box sx={{ display: 'flex' }}>
                  {['A', 'K', 'R'].map((l, i) => (
                    <Avatar key={l} label={l} size={18} sx={{ ml: i ? '-6px' : 0, border: '1.5px solid var(--bg-elev)' }} />
                  ))}
                </Box>
              )}
            </Box>
          ))}
        </Box>
      </Phone>

      <Float sx={{ right: 14, top: 34, width: 228 }} delay={0.3} bob={7}>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
          <Box sx={{ width: 30, height: 30, borderRadius: '9px', bgcolor: 'var(--p)', color: '#fff', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
            <NotificationsRoundedIcon sx={{ fontSize: 17 }} />
          </Box>
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
              <Box sx={text(10.5, 600)}>Celebrity Calendar</Box>
              <Box sx={text(9, 500, 'var(--muted)')}>now</Box>
            </Box>
            <Box sx={{ ...text(10, 500, 'var(--ink-2)'), mt: 0.25 }}>Booking confirmed — Meet &amp; Greet on Oct 17 at 6:30 PM.</Box>
          </Box>
        </Box>
      </Float>

      <Float sx={{ left: 22, bottom: 72 }} delay={0.5} bob={8}>
        <Box sx={{ ...mono, mb: 1 }}>View as</Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          {['Celebrity', 'Manager', 'Team member'].map((r) => (
            <Box
              key={r}
              sx={{
                px: 1.25,
                py: 0.6,
                borderRadius: '8px',
                ...text(10.5, 600, r === 'Manager' ? '#fff' : 'var(--ink-2)'),
                bgcolor: r === 'Manager' ? 'var(--p)' : 'var(--bg-sunk)',
              }}
            >
              {r}
            </Box>
          ))}
        </Box>
      </Float>

      <Float sx={{ left: 40, top: 46 }} delay={0.7} bob={6}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
          <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'var(--p)' }} />
          <Box sx={text(10.5, 600)}>Reminder · in 1 hour</Box>
        </Box>
      </Float>
    </>
  )
}

/* ----------------------------------------------------------------- e-Beru */

function EBeruScene() {
  const bars = [38, 52, 46, 70, 62, 84, 76, 92]
  return (
    <>
      <Browser url="app.e-beru.in/dashboard" sx={{ left: 18, top: 34, width: 404, height: 300 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: '96px 1fr', height: '100%' }}>
          <Box sx={{ bgcolor: 'var(--bg-sunk)', p: 1.25, borderRight: '1px solid var(--line)' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 2 }}>
              <Box sx={{ width: 14, height: 14, borderRadius: '50% 0 50% 50%', bgcolor: 'var(--p)' }} />
              <Box sx={text(11, 700)}>e-Beru</Box>
            </Box>
            {['Farmer', 'Consultant', 'Admin'].map((r, i) => (
              <Box
                key={r}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.75,
                  px: 0.75,
                  py: 0.6,
                  mb: 0.5,
                  borderRadius: '7px',
                  bgcolor: i === 0 ? tint(16) : 'transparent',
                  ...text(9.5, 600, i === 0 ? 'var(--p)' : 'var(--muted)'),
                }}
              >
                <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: i === 0 ? 'var(--p)' : 'var(--line-strong)' }} />
                {r}
              </Box>
            ))}
          </Box>
          <Box sx={{ p: 1.75, display: 'flex', flexDirection: 'column' }}>
            <Box sx={text(13, 600)}>Crop insights</Box>
            <Box sx={{ ...mono, mt: 0.25 }}>Kharif season</Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, mt: 1.5 }}>
              {[
                { l: 'Soil moisture', v: '42%' },
                { l: 'Advisories', v: '6 new' },
              ].map((k) => (
                <Box key={k.l} sx={{ p: 1, borderRadius: '9px', border: '1px solid var(--line)' }}>
                  <Box sx={text(8.5, 500, 'var(--muted)')}>{k.l}</Box>
                  <Box sx={text(15, 600)}>{k.v}</Box>
                </Box>
              ))}
            </Box>
            <Box sx={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: 0.75, mt: 1.5, pb: 0.5, borderBottom: '1px solid var(--line)' }}>
              {bars.map((h, i) => (
                <Box
                  key={i}
                  component={motion.div}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${h}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3 + i * 0.06, ease: EASE }}
                  sx={{ flex: 1, borderRadius: '4px 4px 1px 1px', bgcolor: 'var(--p)', opacity: 0.35 + (i / bars.length) * 0.65 }}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Browser>

      <Float sx={{ right: 16, bottom: 22, width: 214 }} delay={0.35} bob={7}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, pb: 1, mb: 1, borderBottom: '1px solid var(--line)' }}>
          <Avatar label="C" size={24} />
          <Box sx={{ flex: 1 }}>
            <Box sx={text(10.5, 600)}>Consultant</Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, ...text(8.5, 500, 'var(--muted)') }}>
              <Box sx={{ width: 5, height: 5, borderRadius: '50%', bgcolor: '#16A34A' }} /> online
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
          <Box sx={{ alignSelf: 'flex-start', maxWidth: '85%', px: 1.1, py: 0.75, borderRadius: '10px 10px 10px 3px', bgcolor: 'var(--bg-sunk)', ...text(9.5, 500, 'var(--ink-2)') }}>
            Leaves on the east plot are turning yellow.
          </Box>
          <Box sx={{ alignSelf: 'flex-end', maxWidth: '85%', px: 1.1, py: 0.75, borderRadius: '10px 10px 3px 10px', bgcolor: 'var(--p)', ...text(9.5, 500, '#fff') }}>
            Could be nitrogen — can you share a photo?
          </Box>
          <Box sx={{ alignSelf: 'flex-start', display: 'flex', gap: '3px', px: 1.1, py: 0.9, borderRadius: '10px', bgcolor: 'var(--bg-sunk)' }}>
            {[0, 1, 2].map((i) => (
              <Box key={i} sx={{ width: 5, height: 5, borderRadius: '50%', bgcolor: 'var(--muted)', animation: `typing-dot 1.2s ${i * 0.15}s infinite` }} />
            ))}
          </Box>
        </Box>
      </Float>

      <Float sx={{ right: 40, top: 26 }} delay={0.55} bob={6}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
          <NotificationsRoundedIcon sx={{ fontSize: 15, color: 'var(--p)' }} />
          <Box sx={text(10.5, 600)}>New advisory received</Box>
        </Box>
      </Float>
    </>
  )
}

/* ------------------------------------------------------------- Prajaakeeya */

function CivicScene() {
  const candidates = [
    { n: 'Candidate A', v: 62 },
    { n: 'Candidate B', v: 27 },
    { n: 'Candidate C', v: 11 },
  ]
  return (
    <>
      <Browser url="prajaakeeya.org" sx={{ left: 70, top: 28, width: 420, height: 304 }}>
        <Box sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
              <Box sx={{ width: 16, height: 16, borderRadius: '50%', bgcolor: 'var(--p)' }} />
              <Box sx={text(12, 700)}>Prajaakeeya</Box>
            </Box>
            <Box sx={{ display: 'flex', p: '2px', borderRadius: 99, bgcolor: 'var(--bg-sunk)' }}>
              {['EN', 'ಕನ್ನಡ'].map((l, i) => (
                <Box key={l} sx={{ px: 1, py: 0.25, borderRadius: 99, bgcolor: i === 0 ? 'var(--bg-elev)' : 'transparent', ...text(9, 600, i === 0 ? 'var(--ink)' : 'var(--muted)') }}>
                  {l}
                </Box>
              ))}
            </Box>
          </Box>
          <Box sx={{ ...text(14, 600), mt: 2 }}>Ward 42 · Candidate poll</Box>
          <Box sx={text(9.5, 500, 'var(--muted)')}>Voting closes in 2 days</Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mt: 2 }}>
            {candidates.map((c, i) => (
              <Box key={c.n} sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
                <Avatar label={c.n.slice(-1)} size={26} />
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Box sx={text(10.5, 600)}>{c.n}</Box>
                    <Box sx={text(10, 600, 'var(--muted)')}>{c.v}%</Box>
                  </Box>
                  <Bar value={c.v} delay={0.3 + i * 0.12} />
                </Box>
              </Box>
            ))}
          </Box>
          <Box sx={{ flex: 1 }} />
          <Box sx={{ alignSelf: 'flex-start', px: 2, py: 0.9, borderRadius: '10px', bgcolor: 'var(--p)', ...text(11, 600, '#0D1322') }}>Cast your vote</Box>
        </Box>
      </Browser>

      <Float sx={{ left: 16, bottom: 26, width: 206 }} delay={0.35} bob={7}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Box sx={{ width: 28, height: 28, borderRadius: '50%', bgcolor: tint(18), color: 'var(--p)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
            <PlaceRoundedIcon sx={{ fontSize: 16 }} />
          </Box>
          <Box>
            <Box sx={text(11, 600)}>Issue reported</Box>
            <Box sx={{ ...text(9.5, 500, 'var(--muted)'), mt: 0.25 }}>Streetlight not working — 4th Cross Road</Box>
            <Box sx={{ display: 'inline-block', mt: 0.75, px: 0.9, py: 0.25, borderRadius: 99, bgcolor: tint(16), ...text(8.5, 700, 'var(--p)') }}>In review</Box>
          </Box>
        </Box>
      </Float>

      <Float sx={{ right: 22, top: 14 }} delay={0.55} bob={6}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
          <Box sx={{ width: 20, height: 20, borderRadius: '50%', bgcolor: '#16A34A', color: '#fff', display: 'grid', placeItems: 'center' }}>
            <CheckRoundedIcon sx={{ fontSize: 13 }} />
          </Box>
          <Box sx={text(10.5, 600)}>Your vote is recorded</Box>
        </Box>
      </Float>
    </>
  )
}

/* ------------------------------------------------------------------ Rentr */

function RentrScene() {
  const pins = [
    { l: '₹900', x: 22, y: 92 },
    { l: '₹1.2k', x: 106, y: 70, active: true },
    { l: '₹2.4k', x: 52, y: 150 },
    { l: '₹1.6k', x: 124, y: 186 },
  ]
  const days = [12, 13, 14, 15, 16, 17, 18]
  return (
    <>
      <Phone sx={{ left: 64, top: 15 }}>
        <Box sx={{ position: 'absolute', inset: 0, top: 30, bgcolor: tint(7) }}>
          <svg width="100%" height="100%" viewBox="0 0 190 370" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0 }}>
            <g stroke="var(--line-strong)" strokeWidth="5" fill="none" strokeLinecap="round">
              <path d="M-10 120 C 60 100, 120 140, 200 110" />
              <path d="M70 -10 C 80 80, 60 200, 90 380" />
              <path d="M-10 250 C 70 230, 130 260, 200 230" />
            </g>
            <ellipse cx="150" cy="300" rx="40" ry="26" fill={tint(16)} />
          </svg>
          <Box sx={{ position: 'absolute', left: 10, right: 10, top: 8, height: 30, borderRadius: '10px', bgcolor: 'var(--bg-elev)', boxShadow: 'var(--shadow-sm)', display: 'flex', alignItems: 'center', gap: 0.75, px: 1, ...text(9.5, 500, 'var(--muted)') }}>
            <SearchRoundedIcon sx={{ fontSize: 14 }} /> Search near Indiranagar
          </Box>
          {pins.map((p) => (
            <Box
              key={p.l}
              sx={{
                position: 'absolute',
                left: p.x,
                top: p.y,
                px: 0.9,
                py: 0.3,
                borderRadius: 99,
                bgcolor: p.active ? 'var(--p)' : 'var(--bg-elev)',
                boxShadow: 'var(--shadow-sm)',
                ...text(9, 700, p.active ? '#fff' : 'var(--ink)'),
                ...(p.active && { transform: 'scale(1.12)' }),
              }}
            >
              {p.l}
            </Box>
          ))}
          <Box sx={{ position: 'absolute', left: 8, right: 8, bottom: 10, p: 1, borderRadius: '14px', bgcolor: 'var(--bg-elev)', boxShadow: 'var(--shadow-lg)' }}>
            <Box sx={{ height: 62, borderRadius: '10px', background: `linear-gradient(135deg, ${tint(55)}, ${tint(20)})` }} />
            <Box sx={{ ...text(11, 600), mt: 0.75 }}>Studio · Indiranagar</Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25, ...text(9, 500, 'var(--muted)') }}>
              <StarRoundedIcon sx={{ fontSize: 11, color: 'var(--p)' }} /> 4.8 · 1.2 km away
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 0.75 }}>
              <Box sx={text(11, 700)}>
                ₹1,200<Box component="span" sx={text(9, 500, 'var(--muted)')}> / day</Box>
              </Box>
              <Box sx={{ px: 1.25, py: 0.4, borderRadius: '8px', bgcolor: 'var(--p)', ...text(9.5, 600, '#fff') }}>Book</Box>
            </Box>
          </Box>
        </Box>
      </Phone>

      <Float sx={{ right: 22, top: 36, width: 244 }} delay={0.3} bob={7}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <Box sx={text(11, 600)}>Select dates</Box>
          <Box sx={mono}>Oct 2026</Box>
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 0.5, mt: 1 }}>
          {days.map((d) => {
            const booked = d === 14 || d === 15
            const picked = d >= 16
            return (
              <Box
                key={d}
                sx={{
                  height: 28,
                  borderRadius: '7px',
                  display: 'grid',
                  placeItems: 'center',
                  bgcolor: picked ? 'var(--p)' : booked ? 'var(--bg-sunk)' : 'transparent',
                  border: picked || booked ? 'none' : '1px solid var(--line)',
                  textDecoration: booked ? 'line-through' : 'none',
                  ...text(10, 600, picked ? '#fff' : booked ? 'var(--muted)' : 'var(--ink-2)'),
                }}
              >
                {d}
              </Box>
            )
          })}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1, ...text(9.5, 600, 'var(--accent-ink)') }}>
          <ErrorOutlineRoundedIcon sx={{ fontSize: 13 }} /> 14–15 Oct already booked
        </Box>
      </Float>

      <Float sx={{ right: 44, bottom: 50, width: 214 }} delay={0.5} bob={8}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
          <Box sx={{ alignSelf: 'flex-start', px: 1.1, py: 0.75, borderRadius: '10px 10px 10px 3px', bgcolor: 'var(--bg-sunk)', ...text(9.5, 500, 'var(--ink-2)') }}>
            Is the studio free this weekend?
          </Box>
          <Box sx={{ alignSelf: 'flex-end', px: 1.1, py: 0.75, borderRadius: '10px 10px 3px 10px', bgcolor: 'var(--p)', ...text(9.5, 500, '#fff') }}>
            Yes — 16 to 18 Oct is open!
          </Box>
          <Box sx={{ alignSelf: 'flex-end', ...text(8, 500, 'var(--muted)') }}>Seen · just now</Box>
        </Box>
      </Float>
    </>
  )
}

const SCENES = {
  tipsy: TipsyScene,
  calendar: CalendarScene,
  eberu: EBeruScene,
  civic: CivicScene,
  rentr: RentrScene,
}

export default function ProjectVisual({ project }) {
  const Scene = SCENES[project.visual]
  return (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        '--p': project.color,
        background: `radial-gradient(110% 90% at 90% 0%, ${tint(30)}, transparent 60%), radial-gradient(90% 80% at 0% 100%, ${tint(16)}, transparent 60%), var(--bg-sunk)`,
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(var(--line-strong) 1px, transparent 1px)',
          backgroundSize: '18px 18px',
          maskImage: 'radial-gradient(ellipse at 50% 50%, black 20%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 50%, black 20%, transparent 75%)',
          opacity: 0.6,
        }}
      />
      {Scene && (
        <Stage color={project.color}>
          <Scene />
        </Stage>
      )}
    </Box>
  )
}
