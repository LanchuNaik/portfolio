import { Box, Container, Typography, Button, Stack } from '@mui/material'
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded'
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded'
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import { motion } from 'framer-motion'
import { profile, techStack } from '../data/resume'
import MagneticButton from './MagneticButton'
import useTypewriter from './useTypewriter'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
}
const item = {
  hidden: { opacity: 0, y: 22, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

const roles = [
  'React.js Engineer',
  'React Native Developer',
  'UI Craftsperson',
  'Full-Stack Builder',
]

// Per-character reveal for the name
function RevealName({ text }) {
  return (
    <Box component="span" sx={{ display: 'inline-block' }} aria-label={text}>
      {text.split('').map((char, i) => (
        <Box
          key={i}
          component={motion.span}
          initial={{ opacity: 0, y: 40, rotateX: -70 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            delay: 0.35 + i * 0.035,
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          aria-hidden
          sx={{
            display: 'inline-block',
            transformOrigin: 'bottom',
            whiteSpace: char === ' ' ? 'pre' : 'normal',
          }}
        >
          {char === ' ' ? ' ' : char}
        </Box>
      ))}
    </Box>
  )
}

export default function Hero() {
  const typed = useTypewriter(roles)

  return (
    <Box
      component="section"
      id="home"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        position: 'relative',
        pt: { xs: 15, md: 12 },
        pb: 6,
      }}
    >
      <Container maxWidth="md">
        <Box component={motion.div} variants={container} initial="hidden" animate="show">
          {/* status pill */}
          <motion.div variants={item}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              spacing={1.25}
              sx={{
                display: 'inline-flex',
                px: 2,
                py: 0.85,
                mb: 3.5,
                borderRadius: 999,
                border: '1px solid rgba(255,255,255,0.1)',
                bgcolor: 'rgba(255,255,255,0.025)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <Box sx={{ position: 'relative', display: 'flex' }}>
                <Box
                  component={motion.span}
                  animate={{ scale: [1, 2.2, 1], opacity: [0.7, 0, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    bgcolor: 'success.main',
                  }}
                />
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'success.main' }} />
              </Box>
              <Typography
                sx={{
                  fontFamily: 'mono',
                  fontSize: 12.5,
                  letterSpacing: 0.5,
                  color: 'text.secondary',
                }}
              >
                Available for opportunities
              </Typography>
            </Stack>
          </motion.div>

          {/* location */}
          <motion.div variants={item}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              spacing={0.5}
              sx={{ mb: 2, color: 'text.secondary' }}
            >
              <LocationOnRoundedIcon sx={{ fontSize: 17 }} />
              <Typography sx={{ fontFamily: 'mono', fontSize: 13.5, letterSpacing: 0.4 }}>
                {profile.location}
              </Typography>
            </Stack>
          </motion.div>

          {/* name */}
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: 44, sm: 64, md: 82 },
              lineHeight: 1.02,
              fontWeight: 800,
              mb: 1.5,
              perspective: 600,
            }}
          >
            <Box component="span" sx={{ color: 'text.secondary', fontWeight: 500 }}>
              I'm{' '}
            </Box>
            <Box
              component="span"
              sx={{
                background: 'linear-gradient(100deg,#9d88ff 10%,#35e0d4 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              <RevealName text="Lanchana" />
            </Box>
          </Typography>

          {/* typed role line */}
          <motion.div variants={item}>
            <Typography
              sx={{
                fontFamily: 'mono',
                fontSize: { xs: 18, sm: 24, md: 30 },
                fontWeight: 500,
                color: 'text.primary',
                mb: 3.5,
                minHeight: { xs: 30, md: 44 },
              }}
            >
              <Box component="span" sx={{ color: 'secondary.main' }}>{'> '}</Box>
              {typed}
              <Box
                component={motion.span}
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
                sx={{
                  display: 'inline-block',
                  width: '0.6ch',
                  ml: '2px',
                  bgcolor: 'secondary.main',
                  height: '1.1em',
                  verticalAlign: 'text-bottom',
                }}
              />
            </Typography>
          </motion.div>

          {/* one-line intro */}
          <motion.div variants={item}>
            <Typography
              sx={{
                color: 'text.secondary',
                fontSize: { xs: 15.5, md: 17.5 },
                lineHeight: 1.75,
                maxWidth: 600,
                mx: 'auto',
                mb: 4.5,
              }}
            >
              I build production-grade web &amp; mobile apps with React.js and React
              Native — from Stripe-powered payments to real-time, multi-role platforms.
            </Typography>
          </motion.div>

          {/* buttons */}
          <motion.div variants={item}>
            <Stack
              direction="row"
              spacing={2}
              justifyContent="center"
              alignItems="center"
              flexWrap="wrap"
              useFlexGap
            >
              <MagneticButton
                variant="contained"
                size="large"
                href="#contact"
                endIcon={<ArrowForwardRoundedIcon />}
                sx={{
                  background: 'linear-gradient(100deg,#6e56f7,#35e0d4)',
                  boxShadow: '0 12px 34px rgba(110,86,247,0.4)',
                  fontWeight: 600,
                  '&:hover': { boxShadow: '0 16px 44px rgba(110,86,247,0.55)' },
                }}
              >
                Let's talk
              </MagneticButton>
              <MagneticButton
                variant="outlined"
                size="large"
                href="#projects"
                strength={0.25}
                sx={{
                  borderColor: 'rgba(255,255,255,0.18)',
                  color: 'text.primary',
                  '&:hover': { borderColor: 'primary.light', bgcolor: 'rgba(110,86,247,0.06)' },
                }}
              >
                See my work
              </MagneticButton>
              <Button
                variant="text"
                size="large"
                href={profile.resumeUrl}
                target="_blank"
                startIcon={<DownloadRoundedIcon />}
                sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }}
              >
                Resume
              </Button>
            </Stack>
          </motion.div>
        </Box>
      </Container>

      {/* Technologies row */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.9 }}
        sx={{ width: '100%', mt: { xs: 8, md: 11 } }}
      >
        <Stack direction="row" alignItems="center" justifyContent="center" spacing={1.5} sx={{ mb: 3 }}>
          <Box sx={{ width: 32, height: 1, bgcolor: 'rgba(255,255,255,0.12)' }} />
          <Typography
            sx={{
              fontFamily: 'mono',
              textAlign: 'center',
              color: 'text.secondary',
              fontSize: 12.5,
              letterSpacing: 1.5,
              textTransform: 'uppercase',
            }}
          >
            Technologies I use
          </Typography>
          <Box sx={{ width: 32, height: 1, bgcolor: 'rgba(255,255,255,0.12)' }} />
        </Stack>
        <Container maxWidth="lg">
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            flexWrap="wrap"
            useFlexGap
            sx={{ gap: { xs: 1, md: 1.25 } }}
          >
            {techStack.map((tech, i) => (
              <Box
                key={tech}
                component={motion.div}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + i * 0.03, duration: 0.4 }}
                whileHover={{ y: -3 }}
                sx={{
                  px: 1.75,
                  py: 0.75,
                  borderRadius: 999,
                  fontFamily: 'mono',
                  fontSize: 13,
                  fontWeight: 500,
                  color: 'text.secondary',
                  border: '1px solid rgba(255,255,255,0.08)',
                  bgcolor: 'rgba(255,255,255,0.02)',
                  cursor: 'default',
                  transition: 'color 0.2s, border-color 0.2s, background 0.2s',
                  '&:hover': {
                    color: '#fff',
                    borderColor: 'rgba(110,86,247,0.5)',
                    background: 'rgba(110,86,247,0.1)',
                  },
                }}
              >
                {tech}
              </Box>
            ))}
          </Stack>
        </Container>
      </Box>

      {/* scroll cue */}
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        sx={{ position: 'absolute', bottom: 22, left: '50%', transform: 'translateX(-50%)' }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDownwardRoundedIcon sx={{ color: 'text.secondary', opacity: 0.5, fontSize: 20 }} />
        </motion.div>
      </Box>
    </Box>
  )
}
