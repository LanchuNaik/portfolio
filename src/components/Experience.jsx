import { useRef } from 'react'
import { Box } from '@mui/material'
import { motion, useScroll, useSpring } from 'framer-motion'
import SectionHeading from './ui/SectionHeading'
import FadeIn from './ui/FadeIn'
import { cardSx, chipSx, containerSx, monoLabelSx, sectionSx } from './ui/layout'
import { experience, profile } from '../data/resume'

function TimelineItem({ job }) {
  return (
    <Box component="li" sx={{ position: 'relative', pl: { xs: 4.5, md: 7 } }}>
      {/* node */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          left: { xs: 0, md: 4 },
          top: 30,
          width: 18,
          height: 18,
          borderRadius: '50%',
          bgcolor: 'var(--bg)',
          border: '2px solid var(--accent)',
          display: 'grid',
          placeItems: 'center',
          zIndex: 1,
        }}
      >
        {job.current && (
          <>
            <Box sx={{ position: 'absolute', inset: 2, borderRadius: '50%', bgcolor: 'var(--accent)', animation: 'pulse-ring 2.2s var(--ease-out) infinite' }} />
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'var(--accent)' }} />
          </>
        )}
      </Box>

      <FadeIn>
        <Box
          component="article"
          sx={{
            ...cardSx,
            p: { xs: 3, md: 4.5 },
            transition: 'transform .5s var(--ease-out), box-shadow .5s var(--ease-out)',
            '@media (hover: hover)': { '&:hover': { transform: 'translateY(-4px)', boxShadow: 'var(--shadow-lg)' } },
          }}
        >
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
            <Box component="span" sx={{ ...monoLabelSx, color: 'var(--ink-2)' }}>
              {job.period}
            </Box>
            {job.current && (
              <Box
                component="span"
                sx={{ ...monoLabelSx, fontSize: 10.5, color: 'var(--success)', px: 1.25, py: 0.5, borderRadius: 999, border: '1px solid currentColor' }}
              >
                Current role
              </Box>
            )}
          </Box>

          <Box component="h3" sx={{ m: 0, fontSize: 'clamp(1.6rem, 2.6vw, 2.15rem)', fontWeight: 600, letterSpacing: '-0.035em', lineHeight: 1.1 }}>
            {job.role}
          </Box>
          <Box sx={{ mt: 1, fontSize: 15.5, color: 'var(--muted)' }}>
            <span className="serif" style={{ fontSize: 20, color: 'var(--ink)' }}>
              {job.company}
            </span>{' '}
            · {job.location}
          </Box>

          <Box component="ul" sx={{ listStyle: 'none', m: 0, mt: 3, p: 0, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {job.points.map((point) => (
              <Box
                component="li"
                key={point}
                sx={{
                  position: 'relative',
                  pl: 3,
                  fontSize: 15.5,
                  lineHeight: 1.6,
                  color: 'var(--ink-2)',
                  '&::before': { content: '""', position: 'absolute', left: 0, top: '0.75em', width: 12, height: '2px', bgcolor: 'var(--accent)' },
                }}
              >
                {point}
              </Box>
            ))}
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mt: 3.5, pt: 3, borderTop: '1px solid var(--line)' }}>
            {job.tech.map((t) => (
              <Box key={t} component="span" sx={{ ...chipSx, fontSize: 12 }}>
                {t}
              </Box>
            ))}
          </Box>
        </Box>
      </FadeIn>
    </Box>
  )
}

export default function Experience() {
  const timelineRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ['start 75%', 'end 60%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })

  return (
    <Box component="section" id="experience" sx={sectionSx}>
      <Box
        sx={{
          ...containerSx,
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 5fr) minmax(0, 7fr)' },
          gap: { xs: 2, md: 8 },
          alignItems: 'start',
        }}
      >
        <Box sx={{ position: { md: 'sticky' }, top: { md: 120 } }}>
          <SectionHeading
            index="03"
            label="Experience"
            title={[
              "Where I'm",
              <span key="g" className="serif accent">
                growing.
              </span>,
            ]}
            sx={{ mb: { xs: 3, md: 4 } }}
          />
          <FadeIn delay={0.15}>
            <Box sx={{ color: 'var(--muted)', fontSize: { xs: 16, md: 17 }, lineHeight: 1.65, maxWidth: 420 }}>
              I joined {profile.company} as a Software Development Intern in May 2025 and stepped into a Junior Software
              Engineer role in October 2025 — shipping production web and mobile apps for multiple clients.
            </Box>
            <Box sx={{ ...cardSx, display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2, mt: 5, p: 2, pr: 3, width: 'fit-content', borderRadius: 999 }}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  bgcolor: 'var(--navy)',
                  color: 'var(--navy-ink)',
                  display: 'grid',
                  placeItems: 'center',
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontSize: 22,
                }}
              >
                Dt
              </Box>
              <Box sx={{ lineHeight: 1.3 }}>
                <Box sx={{ fontWeight: 600 }}>{profile.company}</Box>
                <Box sx={{ ...monoLabelSx, fontSize: 10.5 }}>May 2025 — Present · Bangalore</Box>
              </Box>
            </Box>
          </FadeIn>
        </Box>

        <Box ref={timelineRef} sx={{ position: 'relative', mt: { xs: 4, md: 0 } }}>
          <Box aria-hidden sx={{ position: 'absolute', left: { xs: 8, md: 12 }, top: 0, bottom: 0, width: '2px', bgcolor: 'var(--line)', borderRadius: 2 }} />
          <Box
            component={motion.div}
            aria-hidden
            style={{ scaleY: fill, transformOrigin: 'top' }}
            sx={{ position: 'absolute', left: { xs: 8, md: 12 }, top: 0, bottom: 0, width: '2px', bgcolor: 'var(--accent)', borderRadius: 2 }}
          />
          <Box component="ol" sx={{ listStyle: 'none', m: 0, p: 0, display: 'flex', flexDirection: 'column', gap: { xs: 3, md: 4 } }}>
            {experience.map((job) => (
              <TimelineItem key={`${job.role}-${job.period}`} job={job} />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
