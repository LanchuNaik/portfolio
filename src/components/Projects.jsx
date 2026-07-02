import { useState, useMemo } from 'react'
import { Box, Typography, Paper, Chip, Stack, Button } from '@mui/material'
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded'
import { motion, AnimatePresence } from 'framer-motion'
import Section from './Section'
import TiltCard from './TiltCard'
import { projects } from '../data/resume'

const filters = ['All', 'Professional', 'Personal']

export default function Projects() {
  const [filter, setFilter] = useState('All')

  const visible = useMemo(
    () => (filter === 'All' ? projects : projects.filter((p) => p.type === filter)),
    [filter],
  )

  return (
    <Section id="projects" eyebrow="Things I've built" title="Featured Projects">
      {/* filter pills */}
      <Stack direction="row" spacing={1.5} justifyContent="center" sx={{ mb: 5 }} flexWrap="wrap" useFlexGap>
        {filters.map((f) => (
          <Button
            key={f}
            onClick={() => setFilter(f)}
            variant={filter === f ? 'contained' : 'outlined'}
            size="small"
            sx={{
              fontFamily: 'mono',
              fontSize: 13,
              ...(filter === f
                ? { background: 'linear-gradient(100deg,#6e56f7,#35e0d4)' }
                : { borderColor: 'rgba(255,255,255,0.15)', color: 'text.secondary' }),
            }}
          >
            {f}
          </Button>
        ))}
      </Stack>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
          gap: 3,
        }}
      >
        <AnimatePresence mode="popLayout">
          {visible.map((project, i) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: (i % 2) * 0.08 }}
            >
              <TiltCard>
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 2.75, md: 3.25 },
                    height: '100%',
                    borderRadius: 4,
                    position: 'relative',
                    overflow: 'hidden',
                    bgcolor: 'rgba(18,18,28,0.6)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    backdropFilter: 'blur(12px)',
                    transition: 'border-color 0.28s, box-shadow 0.28s',
                    '&:hover': {
                      borderColor: 'rgba(110,86,247,0.5)',
                      boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
                    },
                    '&:hover .glow': { opacity: 1 },
                  }}
                >
                  {/* hover glow */}
                  <Box
                    className="glow"
                    sx={{
                      position: 'absolute',
                      top: -80,
                      right: -80,
                      width: 220,
                      height: 220,
                      borderRadius: '50%',
                      background:
                        'radial-gradient(circle, rgba(110,86,247,0.4), transparent 70%)',
                      opacity: 0,
                      transition: 'opacity 0.3s',
                      pointerEvents: 'none',
                    }}
                  />

                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1 }}>
                    <Chip
                      label={project.type}
                      size="small"
                      sx={{
                        fontFamily: 'mono',
                        bgcolor:
                          project.type === 'Professional'
                            ? 'rgba(110,86,247,0.16)'
                            : 'rgba(53,224,212,0.12)',
                        color: project.type === 'Professional' ? '#b3a4ff' : '#6bf0e6',
                        fontWeight: 600,
                        fontSize: 11.5,
                        letterSpacing: 0.3,
                      }}
                    />
                    <Typography sx={{ fontFamily: 'mono', color: 'text.secondary', fontSize: 12.5, fontWeight: 500 }}>
                      {project.year}
                    </Typography>
                  </Stack>

                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
                    <Typography variant="h6">{project.title}</Typography>
                    {project.link && (
                      <Button
                        href={project.link}
                        target="_blank"
                        sx={{ minWidth: 0, p: 0.5, color: 'secondary.main' }}
                        aria-label={`Visit ${project.title}`}
                      >
                        <OpenInNewRoundedIcon sx={{ fontSize: 17 }} />
                      </Button>
                    )}
                  </Stack>
                  <Typography sx={{ color: 'primary.light', fontSize: 14, fontWeight: 500, mb: 1.5 }}>
                    {project.tagline}
                  </Typography>

                  <Stack component="ul" sx={{ m: 0, mb: 2, pl: 2.2 }} spacing={0.75}>
                    {project.points.map((p, pi) => (
                      <Typography
                        key={pi}
                        component="li"
                        sx={{ color: 'text.secondary', fontSize: 14, lineHeight: 1.55 }}
                      >
                        {p}
                      </Typography>
                    ))}
                  </Stack>

                  <Stack direction="row" flexWrap="wrap" gap={0.75}>
                    {project.tech.map((t) => (
                      <Chip
                        key={t}
                        label={t}
                        size="small"
                        variant="outlined"
                        sx={{
                          fontFamily: 'mono',
                          borderColor: 'rgba(255,255,255,0.12)',
                          color: 'text.secondary',
                          fontSize: 11.5,
                          height: 24,
                        }}
                      />
                    ))}
                  </Stack>
                </Paper>
              </TiltCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </Box>
    </Section>
  )
}
