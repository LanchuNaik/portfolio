import { useId } from 'react'
import { Box } from '@mui/material'
import NorthEastRoundedIcon from '@mui/icons-material/NorthEastRounded'

// Circular link with text running around its rim; spins faster on hover.
export default function RotatingBadge({ text, href, label, size = { xs: 96, md: 118 }, iconSize = { xs: 18, md: 22 }, sx }) {
  const pathId = `badge-${useId().replace(/:/g, '')}`
  return (
    <Box
      component="a"
      href={href}
      aria-label={label}
      sx={{
        position: 'relative',
        display: 'grid',
        placeItems: 'center',
        width: size,
        height: size,
        borderRadius: '50%',
        bgcolor: 'var(--ink)',
        color: 'var(--bg)',
        boxShadow: 'var(--shadow-lg)',
        '& .ring': { animation: 'spin-slow 16s linear infinite' },
        '&:hover .ring': { animationDuration: '5s' },
        '&:hover .core': { transform: 'scale(1.08) rotate(45deg)' },
        ...sx,
      }}
    >
      <Box component="svg" className="ring" viewBox="0 0 100 100" aria-hidden sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <defs>
          <path id={pathId} d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
        </defs>
        <text fill="currentColor" style={{ fontFamily: 'var(--font-mono)', fontSize: 8.6, letterSpacing: 1.6, fontWeight: 500 }}>
          <textPath href={`#${pathId}`}>{text}</textPath>
        </text>
      </Box>
      <Box
        className="core"
        sx={{
          width: '38%',
          height: '38%',
          borderRadius: '50%',
          bgcolor: 'var(--accent)',
          color: '#0D1322',
          display: 'grid',
          placeItems: 'center',
          transition: 'transform .5s var(--ease-out)',
        }}
      >
        <NorthEastRoundedIcon sx={{ fontSize: iconSize }} />
      </Box>
    </Box>
  )
}
