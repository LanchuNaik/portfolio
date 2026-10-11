import { useRef } from 'react'
import { Box, Tooltip } from '@mui/material'
import { motion, useMotionValue, useScroll, useTransform } from 'framer-motion'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded'
import Portrait from './Portrait'
import RotatingWord from './RotatingWord'
import RevealLines from './ui/RevealLines'
import PillButton from './ui/PillButton'
import Magnetic from './ui/Magnetic'
import { EASE, containerSx, monoLabelSx } from './ui/layout'
import { profile } from '../data/resume'

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.55 } },
}
const rise = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
}

const socials = [
  { label: 'GitHub', href: profile.socials.github, icon: <GitHubIcon sx={{ fontSize: 19 }} /> },
  { label: 'LinkedIn', href: profile.socials.linkedin, icon: <LinkedInIcon sx={{ fontSize: 19 }} /> },
  { label: 'Email', href: `mailto:${profile.email}`, icon: <MailOutlineRoundedIcon sx={{ fontSize: 19 }} /> },
]

function StatusPill() {
  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1.25,
        pl: 1.25,
        pr: 1.75,
        py: 0.75,
        mb: { xs: 2.5, md: 3 },
        borderRadius: 999,
        border: '1px solid var(--line)',
        bgcolor: 'var(--glass)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}
    >
      <Box sx={{ position: 'relative', width: 8, height: 8 }}>
        <Box sx={{ position: 'absolute', inset: 0, borderRadius: '50%', bgcolor: 'var(--success)', animation: 'pulse-ring 2s var(--ease-out) infinite' }} />
        <Box sx={{ position: 'absolute', inset: 0, borderRadius: '50%', bgcolor: 'var(--success)' }} />
      </Box>
      <Box component="span" sx={{ fontSize: 13.5, fontWeight: 500, color: 'var(--ink-2)' }}>
        Available for new opportunities
      </Box>
    </Box>
  )
}

// Faint vertical rules that echo an editorial layout grid.
function GridLines() {
  return (
    <Box
      aria-hidden
      sx={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        maskImage: 'linear-gradient(to bottom, black 30%, transparent 95%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 30%, transparent 95%)',
      }}
    >
      <Box sx={{ ...containerSx, height: '100%', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {[0, 1, 2, 3].map((i) => (
          <Box key={i} sx={{ borderLeft: '1px dashed var(--line)', ...(i === 3 && { borderRight: '1px dashed var(--line)' }) }} />
        ))}
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: '-10%',
          right: '-10%',
          width: '60vw',
          height: '60vw',
          maxWidth: 820,
          maxHeight: 820,
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--accent-soft), transparent 65%)',
          filter: 'blur(10px)',
        }}
      />
    </Box>
  )
}

export default function Hero({ ready }) {
  const ref = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -90])
  const copyOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.15])

  const handlePointerMove = (e) => {
    if (e.pointerType !== 'mouse' || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    mx.set(((e.clientX - rect.left) / rect.width - 0.5) * 2)
    my.set(((e.clientY - rect.top) / rect.height - 0.5) * 2)
  }

  const play = ready ? 'show' : 'hidden'

  return (
    <Box
      component="section"
      id="home"
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => {
        mx.set(0)
        my.set(0)
      }}
      sx={{
        position: 'relative',
        minHeight: { md: '100svh' },
        display: 'flex',
        alignItems: 'center',
        pt: { xs: 13, md: 13 },
        pb: { xs: 12, md: 10 },
      }}
    >
      <GridLines />

      <Box
        sx={{
          ...containerSx,
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1.12fr) minmax(0, 0.88fr)' },
          alignItems: 'center',
          gap: { xs: 9, md: 6, lg: 10 },
        }}
      >
        <Box component={motion.div} style={{ y: copyY, opacity: copyOpacity }}>
          <motion.div variants={stagger} initial="hidden" animate={play}>
            <motion.div variants={rise}>
              <StatusPill />
            </motion.div>
          </motion.div>

          <Box sx={{ ...monoLabelSx, mb: 2, display: 'flex', flexWrap: 'wrap', gap: 1, overflow: 'hidden' }}>
            <motion.span
              initial={{ y: '110%' }}
              animate={ready ? { y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
              style={{ display: 'inline-block' }}
            >
              {profile.name}
              <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                {' '}— {profile.role}
              </Box>
            </motion.span>
          </Box>

          <Box
            component="h1"
            sx={{
              m: 0,
              fontSize: 'clamp(3.25rem, 6.4vw, 5.6rem)',
              fontWeight: 600,
              lineHeight: 0.95,
              letterSpacing: '-0.045em',
              '& .serif': { fontSize: '1.08em', letterSpacing: '-0.02em' },
            }}
          >
            <RevealLines
              trigger="mount"
              play={ready}
              delay={0.15}
              lines={[
                'I build',
                <RotatingWord key="word" words={profile.heroWords} play={ready} />,
                'web & mobile',
                <>
                  apps<Box component="span" className="accent">.</Box>
                </>,
              ]}
            />
          </Box>

          <motion.div variants={stagger} initial="hidden" animate={play}>
            <Box
              component={motion.p}
              variants={rise}
              sx={{ m: 0, mt: { xs: 3, md: 3.5 }, maxWidth: 570, fontSize: { xs: 16.5, md: 18 }, lineHeight: 1.65, color: 'var(--muted)' }}
            >
              {profile.intro}
            </Box>

            <Box
              component={motion.div}
              variants={rise}
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: 1.5,
                mt: 4,
                '& > *, & a': { width: { xs: '100%', sm: 'auto' } },
              }}
            >
              <Magnetic>
                <PillButton href="#projects" size="lg">
                  View my work
                </PillButton>
              </Magnetic>
              <Magnetic strength={0.2}>
                <PillButton href={profile.resumeUrl} target="_blank" rel="noopener" size="lg" variant="outline" arrow="down">
                  Download résumé
                </PillButton>
              </Magnetic>
            </Box>

            <Box component={motion.div} variants={rise} sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 4.5 }}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                {socials.map((s) => (
                  <Tooltip key={s.label} title={s.label}>
                    <Box
                      component="a"
                      href={s.href}
                      target={s.href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener"
                      aria-label={s.label}
                      sx={{
                        width: 42,
                        height: 42,
                        display: 'grid',
                        placeItems: 'center',
                        borderRadius: '50%',
                        border: '1px solid var(--line-strong)',
                        color: 'var(--ink-2)',
                        transition: 'all .3s var(--ease-out)',
                        '&:hover': { bgcolor: 'var(--ink)', color: 'var(--bg)', borderColor: 'var(--ink)', transform: 'translateY(-3px)' },
                      }}
                    >
                      {s.icon}
                    </Box>
                  </Tooltip>
                ))}
              </Box>
              <Box sx={{ width: 28, height: '1px', bgcolor: 'var(--line-strong)' }} />
              <Box sx={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.4 }}>
                Currently at{' '}
                <Box component="span" sx={{ color: 'var(--ink)', fontWeight: 600 }}>
                  {profile.company}
                </Box>
              </Box>
            </Box>
          </motion.div>
        </Box>

        <Portrait ready={ready} mx={mx} my={my} />
      </Box>

      {/* scroll cue */}
      <Box
        component={motion.a}
        href="#about"
        aria-label="Scroll to About"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 2 }}
        sx={{
          display: { xs: 'none', md: 'flex' },
          position: 'absolute',
          left: '50%',
          bottom: 28,
          transform: 'translateX(-50%)',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1.25,
        }}
      >
        <Box component="span" sx={{ ...monoLabelSx, fontSize: 10 }}>
          Scroll
        </Box>
        <Box sx={{ position: 'relative', width: '1px', height: 44, bgcolor: 'var(--line-strong)', overflow: 'hidden' }}>
          <Box
            component={motion.span}
            animate={{ y: ['-100%', '100%'] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            sx={{ position: 'absolute', inset: 0, bgcolor: 'var(--ink)' }}
          />
        </Box>
      </Box>
    </Box>
  )
}
