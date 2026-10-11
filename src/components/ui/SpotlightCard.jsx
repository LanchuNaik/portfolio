import { useRef } from 'react'
import { Box } from '@mui/material'
import { cardSx } from './layout'

// Card whose border and surface light up around the cursor.
export default function SpotlightCard({ children, sx, ...props }) {
  const ref = useRef(null)

  const handleMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    el.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }

  return (
    <Box
      ref={ref}
      onPointerMove={handleMove}
      sx={{
        ...cardSx,
        overflow: 'hidden',
        isolation: 'isolate',
        // glowing border ring
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          padding: '1px',
          background: 'radial-gradient(280px circle at var(--mx, 50%) var(--my, 50%), var(--accent), transparent 70%)',
          WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          opacity: 0,
          transition: 'opacity .35s',
          pointerEvents: 'none',
        },
        // soft surface wash
        '&::after': {
          content: '""',
          position: 'absolute',
          inset: 0,
          zIndex: -1,
          background: 'radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), var(--accent-soft), transparent 65%)',
          opacity: 0,
          transition: 'opacity .35s',
          pointerEvents: 'none',
        },
        '@media (hover: hover)': {
          '&:hover::before, &:hover::after': { opacity: 1 },
        },
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  )
}
