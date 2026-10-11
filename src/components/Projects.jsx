import { useRef } from 'react'
import { Box, useMediaQuery } from '@mui/material'
import { motion, useScroll, useTransform } from 'framer-motion'
import NorthEastRoundedIcon from '@mui/icons-material/NorthEastRounded'
import ProjectVisual from './ProjectVisual'
import SectionHeading from './ui/SectionHeading'
import PillButton from './ui/PillButton'
import FadeIn from './ui/FadeIn'
import { cardSx, chipSx, containerSx, monoLabelSx, sectionSx } from './ui/layout'
import { profile, projects } from '../data/resume'

const pad2 = (n) => String(n).padStart(2, '0')

function ProjectCard({ project, index, total, stacked }) {
  return (
    <Box
      component="article"
      aria-labelledby={`project-${index}`}
      sx={{
        ...cardSx,
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-lg)',
        overflow: 'hidden',
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 0.92fr) minmax(0, 1.08fr)' },
        gap: 1.25,
        p: 1.25,
        height: stacked ? 'min(600px, calc(100vh - 160px))' : 'auto',
      }}
    >
      <Box sx={{ order: { xs: 2, md: 1 }, p: { xs: 2.25, sm: 3, md: 4 }, display: 'flex', flexDirection: 'column', gap: { xs: 2.25, md: 2.75 }, minHeight: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, flexWrap: 'wrap' }}>
          <Box component="span" sx={{ ...monoLabelSx, color: 'var(--ink)' }}>
            {pad2(index + 1)}
            <Box component="span" sx={{ color: 'var(--muted)' }}> / {pad2(total)}</Box>
          </Box>
          <Box component="span" sx={{ width: 20, height: '1px', bgcolor: 'var(--line-strong)' }} />
          <Box component="span" sx={monoLabelSx}>
            {project.domain}
          </Box>
          <Box sx={{ flex: 1 }} />
          <Box
            component="span"
            sx={{
              ...monoLabelSx,
              fontSize: 10.5,
              px: 1.25,
              py: 0.5,
              borderRadius: 999,
              bgcolor: project.category === 'Personal' ? 'var(--bg-sunk)' : 'var(--accent-soft)',
              color: project.category === 'Personal' ? 'var(--ink-2)' : 'var(--accent-ink)',
            }}
          >
            {project.category} · {project.year}
          </Box>
        </Box>

        <Box>
          <Box
            component="h3"
            id={`project-${index}`}
            sx={{ m: 0, fontSize: 'clamp(2.1rem, 3.8vw, 3.4rem)', fontWeight: 600, letterSpacing: '-0.045em', lineHeight: 1 }}
          >
            {project.title}
          </Box>
          <Box className="serif" sx={{ mt: 1, fontSize: { xs: 20, md: 23 }, color: 'var(--muted)', lineHeight: 1.25 }}>
            {project.tagline}
          </Box>
        </Box>

        <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0, display: 'flex', flexDirection: 'column', gap: 1.25 }}>
          {project.points.map((point) => (
            <Box
              component="li"
              key={point}
              sx={{
                position: 'relative',
                pl: 2.75,
                fontSize: { xs: 14.5, md: 15 },
                lineHeight: 1.55,
                color: 'var(--ink-2)',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  top: '0.55em',
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  border: '2px solid',
                  borderColor: project.color,
                },
              }}
            >
              {point}
            </Box>
          ))}
        </Box>

        <Box sx={{ mt: 'auto', display: 'flex', flexDirection: 'column', gap: 2.25 }}>
          <Box component="ul" aria-label="Tech stack" sx={{ listStyle: 'none', m: 0, p: 0, display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
            {project.tech.map((t) => (
              <Box component="li" key={t} sx={{ ...chipSx, fontSize: 12 }}>
                {t}
              </Box>
            ))}
          </Box>
          {project.link && (
            <Box
              component="a"
              href={project.link}
              target="_blank"
              rel="noopener"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.75,
                width: 'fit-content',
                fontWeight: 600,
                fontSize: 15,
                borderBottom: '1.5px solid var(--ink)',
                pb: 0.25,
                transition: 'gap .3s var(--ease-out), color .3s, border-color .3s',
                '&:hover': { gap: 1.25, color: 'var(--accent-ink)', borderColor: 'var(--accent)' },
              }}
            >
              Visit {project.link.replace(/^https?:\/\//, '')}
              <NorthEastRoundedIcon sx={{ fontSize: 17 }} />
            </Box>
          )}
        </Box>
      </Box>

      <Box
        sx={{
          order: { xs: 1, md: 2 },
          position: 'relative',
          borderRadius: 'calc(var(--radius-xl) - 10px)',
          overflow: 'hidden',
          aspectRatio: { xs: '5 / 4', md: 'auto' },
          minHeight: { md: 460 },
        }}
      >
        <ProjectVisual project={project} />
      </Box>
    </Box>
  )
}

// Each card pins to the viewport; earlier cards shrink and dim as later ones
// slide over them.
function StackedProject({ project, index, total, progress }) {
  const remaining = total - 1 - index
  const scale = useTransform(progress, [index / total, 1], [1, 1 - remaining * 0.045])
  const dim = useTransform(progress, [index / total, 1], [0, remaining * 0.07])

  return (
    <Box sx={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', alignItems: 'center' }}>
      <Box component={motion.div} style={{ scale, y: index * 16 }} sx={{ position: 'relative', width: '100%', transformOrigin: 'top center' }}>
        <ProjectCard project={project} index={index} total={total} stacked />
        <Box
          component={motion.div}
          aria-hidden
          style={{ opacity: dim }}
          sx={{ position: 'absolute', inset: 0, borderRadius: 'var(--radius-xl)', bgcolor: '#0D1322', pointerEvents: 'none' }}
        />
      </Box>
    </Box>
  )
}

export default function Projects() {
  const stackRef = useRef(null)
  const stacked = useMediaQuery('(min-width:900px) and (min-height:720px)', { noSsr: true })
  const { scrollYProgress } = useScroll({ target: stackRef, offset: ['start start', 'end end'] })
  const total = projects.length

  return (
    <Box component="section" id="projects" sx={{ ...sectionSx, pb: { xs: 10, md: 14 } }}>
      <Box sx={containerSx}>
        <SectionHeading
          index="04"
          label="Selected work"
          title={[
            "Projects I've",
            <span key="s" className="serif accent">
              shipped.
            </span>,
          ]}
        >
          Production and personal work spanning payments, real-time chat, multi-role dashboards and cross-platform mobile.
        </SectionHeading>

        <Box ref={stackRef} sx={{ position: 'relative', mt: stacked ? -6 : 0 }}>
          {stacked ? (
            projects.map((project, i) => (
              <StackedProject key={project.title} project={project} index={i} total={total} progress={scrollYProgress} />
            ))
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2.5, md: 4 } }}>
              {projects.map((project, i) => (
                <FadeIn key={project.title}>
                  <ProjectCard project={project} index={i} total={total} />
                </FadeIn>
              ))}
            </Box>
          )}
        </Box>

        <FadeIn>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { sm: 'center' }, justifyContent: 'space-between', gap: 3, mt: { xs: 6, md: 10 }, pt: 4, borderTop: '1px solid var(--line)' }}>
            <Box sx={{ fontSize: { xs: 18, md: 20 }, color: 'var(--muted)', maxWidth: 520 }}>
              Curious about the code behind the work? Find me on{' '}
              <span className="serif" style={{ color: 'var(--ink)', fontSize: '1.15em' }}>
                GitHub
              </span>
              .
            </Box>
            <PillButton href={profile.socials.github} target="_blank" rel="noopener" variant="outline" arrow="up-right">
              Browse GitHub
            </PillButton>
          </Box>
        </FadeIn>
      </Box>
    </Box>
  )
}
