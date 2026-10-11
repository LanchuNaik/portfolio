import { Box } from '@mui/material'
import { motion, useSpring, useTransform } from 'framer-motion'
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded'
import { ReactMark } from './ui/icons'
import RotatingBadge from './ui/RotatingBadge'
import { EASE, monoLabelSx } from './ui/layout'
import { profile } from '../data/resume'

const ARCH = '999px 999px 32px 32px'

const badgeSx = {
  display: 'flex',
  alignItems: 'center',
  gap: 1.25,
  px: { xs: 1.25, md: 1.75 },
  py: { xs: 1, md: 1.25 },
  borderRadius: '18px',
  bgcolor: 'var(--glass)',
  backdropFilter: 'blur(16px) saturate(160%)',
  WebkitBackdropFilter: 'blur(16px) saturate(160%)',
  border: '1px solid var(--line)',
  boxShadow: 'var(--shadow-lg)',
  whiteSpace: 'nowrap',
}

// Parallax wrapper -> entrance pop -> endless gentle bob -> glass badge.
function Floating({ children, delay, ready, bob = 8, duration = 6, pos, x, y, sx }) {
  return (
    <Box component={motion.div} style={{ x, y }} sx={{ position: 'absolute', zIndex: 3, ...pos }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.7, y: 20 }}
        animate={ready ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ delay, duration: 0.8, ease: EASE }}
      >
        <Box
          component={motion.div}
          animate={{ y: [0, -bob, 0] }}
          transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay: delay + 1 }}
          sx={{ ...badgeSx, ...sx }}
        >
          {children}
        </Box>
      </motion.div>
    </Box>
  )
}

export default function Portrait({ ready, mx, my }) {
  const sx = useSpring(mx, { stiffness: 90, damping: 18 })
  const sy = useSpring(my, { stiffness: 90, damping: 18 })
  // three parallax depths
  const x1 = useTransform(sx, (v) => v * -10)
  const y1 = useTransform(sy, (v) => v * -10)
  const x2 = useTransform(sx, (v) => v * 18)
  const y2 = useTransform(sy, (v) => v * 18)
  const x3 = useTransform(sx, (v) => v * 30)
  const y3 = useTransform(sy, (v) => v * 30)

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        maxWidth: { xs: 380, sm: 420, md: 470 },
        mx: { xs: 'auto', md: 0 },
        justifySelf: { md: 'end' },
        mr: { md: 4, lg: 2 },
      }}
    >
      {/* offset arch outline */}
      <Box
        component={motion.div}
        aria-hidden
        style={{ x: x1, y: y1 }}
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 0.9, duration: 1 }}
        sx={{
          position: 'absolute',
          inset: 0,
          borderRadius: ARCH,
          border: '1.5px solid var(--line-strong)',
          translate: { xs: '12px -12px', md: '24px -24px' },
        }}
      />

      {/* coral "sun" */}
      <Box
        component={motion.div}
        aria-hidden
        style={{ x: x3, y: y3 }}
        initial={{ scale: 0 }}
        animate={ready ? { scale: 1 } : {}}
        transition={{ delay: 1.05, duration: 0.9, ease: EASE }}
        sx={{
          position: 'absolute',
          zIndex: 2,
          top: { xs: -14, md: -22 },
          right: { xs: 18, md: 34 },
          width: { xs: 54, md: 76 },
          height: { xs: 54, md: 76 },
          borderRadius: '50%',
          background: 'radial-gradient(circle at 30% 30%, #ff9a76, var(--accent) 60%)',
          boxShadow: '0 18px 40px -10px rgba(240, 83, 43, 0.55)',
        }}
      />

      {/* photo */}
      <Box
        component={motion.div}
        initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
        animate={ready ? { clipPath: 'inset(0% 0% 0% 0%)' } : {}}
        transition={{ duration: 1.3, delay: 0.25, ease: [0.76, 0, 0.24, 1] }}
        sx={{
          position: 'relative',
          zIndex: 1,
          aspectRatio: '4 / 5',
          borderRadius: ARCH,
          overflow: 'hidden',
          bgcolor: 'var(--bg-sunk)',
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        <Box
          component={motion.img}
          src={profile.photo}
          alt={`Portrait of ${profile.name}`}
          width={1023}
          height={1537}
          fetchpriority="high"
          initial={{ scale: 1.3 }}
          animate={ready ? { scale: 1 } : {}}
          transition={{ duration: 1.8, delay: 0.25, ease: EASE }}
          sx={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 18%' }}
        />
        <Box
          aria-hidden
          sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(13,19,34,0.38), transparent 38%)' }}
        />
        {/* caption inside the frame */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 12 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.3, duration: 0.7, ease: EASE }}
          sx={{ position: 'absolute', left: 22, bottom: 20, color: '#F4F2ED' }}
        >
          <Box sx={{ ...monoLabelSx, color: 'rgba(244,242,237,0.75)', fontSize: 10.5 }}>Based in</Box>
          <Box sx={{ fontWeight: 600, fontSize: 15 }}>{profile.location}</Box>
        </Box>
      </Box>

      {/* floating badges */}
      <Floating ready={ready} delay={1.15} x={x2} y={y2} duration={6.5} pos={{ top: '11%', left: { xs: '-4%', md: '-16%' } }}>
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: '12px',
            display: 'grid',
            placeItems: 'center',
            bgcolor: 'var(--ink)',
            color: 'var(--bg)',
            '& svg': { animation: 'spin-slow 12s linear infinite' },
          }}
        >
          <ReactMark size={24} />
        </Box>
        <Box sx={{ lineHeight: 1.2 }}>
          <Box sx={{ fontWeight: 600, fontSize: { xs: 13, md: 14 } }}>React & React Native</Box>
          <Box sx={{ ...monoLabelSx, fontSize: 10, letterSpacing: '0.08em' }}>Web + Mobile</Box>
        </Box>
      </Floating>

      <Floating ready={ready} delay={1.3} x={x3} y={y3} duration={7} bob={10} pos={{ top: '47%', right: { xs: '-1%', md: '-12%' } }}>
        <Box sx={{ lineHeight: 1 }}>
          <Box sx={{ fontWeight: 600, fontSize: { xs: 26, md: 32 }, letterSpacing: '-0.04em', lineHeight: 1 }}>
            1<Box component="span" className="accent">+</Box>
          </Box>
          <Box sx={{ ...monoLabelSx, fontSize: 10, letterSpacing: '0.08em', mt: 0.5 }}>Yrs in production</Box>
        </Box>
      </Floating>

      <Floating ready={ready} delay={1.45} x={x2} y={y2} duration={5.5} pos={{ bottom: '13%', left: { xs: '-4%', md: '-20%' } }}>
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: '12px',
            display: 'grid',
            placeItems: 'center',
            bgcolor: 'var(--accent-soft)',
            color: 'var(--accent-ink)',
          }}
        >
          <SchoolRoundedIcon sx={{ fontSize: 20 }} />
        </Box>
        <Box sx={{ lineHeight: 1.2 }}>
          <Box sx={{ fontWeight: 600, fontSize: { xs: 13, md: 14 } }}>MCA · 9.91 CGPA</Box>
          <Box sx={{ ...monoLabelSx, fontSize: 10, letterSpacing: '0.08em' }}>DSCE, Bangalore</Box>
        </Box>
      </Floating>

      <Box
        component={motion.div}
        style={{ x: x1, y: y1 }}
        initial={{ scale: 0, rotate: -90 }}
        animate={ready ? { scale: 1, rotate: 0 } : {}}
        transition={{ delay: 1.6, duration: 0.9, ease: EASE }}
        sx={{ position: 'absolute', zIndex: 3, bottom: { xs: -30, md: -40 }, right: { xs: -6, md: -34 } }}
      >
        <RotatingBadge text="OPEN TO WORK ✦ REACT ✦ REACT NATIVE ✦ " href="#contact" label="Open to work — get in touch" />
      </Box>
    </Box>
  )
}
