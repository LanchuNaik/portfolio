import { Box } from '@mui/material'

// Static overlays that sit above the animated aurora canvas:
// a fine dotted grid (masked to fade downward) + a subtle vignette.
export default function AnimatedBackground() {
  return (
    <Box
      aria-hidden
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none',
      }}
    >
      {/* dotted grid */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(rgba(255,255,255,0.045) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage:
            'radial-gradient(ellipse at 50% 0%, black 35%, transparent 78%)',
          WebkitMaskImage:
            'radial-gradient(ellipse at 50% 0%, black 35%, transparent 78%)',
        }}
      />
      {/* vignette to keep edges grounded */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 50% 40%, transparent 55%, rgba(10,10,15,0.65) 100%)',
        }}
      />
    </Box>
  )
}
