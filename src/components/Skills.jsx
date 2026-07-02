import { Box, Typography, Paper, Stack } from '@mui/material'
import { motion } from 'framer-motion'
import Section from './Section'
import { skillGroups } from '../data/resume'

export default function Skills() {
  return (
    <Section id="skills" eyebrow="What I work with" title="Skills & Tech Stack">
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
          gap: 3,
        }}
      >
        {skillGroups.map((group, gi) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: gi * 0.08 }}
          >
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2.5, md: 3.5 },
                height: '100%',
                borderRadius: 4,
                bgcolor: 'rgba(19,19,30,0.55)',
                border: '1px solid rgba(255,255,255,0.07)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  mb: 3,
                  display: 'inline-block',
                  background: 'linear-gradient(90deg,#9d88ff,#35e0d4)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {group.category}
              </Typography>

              <Stack spacing={2.25}>
                {group.skills.map((skill, si) => (
                  <Box key={skill.name}>
                    <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.75 }}>
                      <Typography sx={{ fontSize: 14.5, fontWeight: 500 }}>
                        {skill.name}
                      </Typography>
                      <Typography sx={{ fontFamily: 'mono', fontSize: 12.5, color: 'text.secondary' }}>
                        {skill.level}%
                      </Typography>
                    </Stack>
                    <Box
                      sx={{
                        height: 7,
                        borderRadius: 999,
                        bgcolor: 'rgba(255,255,255,0.07)',
                        overflow: 'hidden',
                      }}
                    >
                      <Box
                        component={motion.div}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 + si * 0.08, ease: 'easeOut' }}
                        sx={{
                          height: '100%',
                          borderRadius: 999,
                          background: 'linear-gradient(90deg,#6e56f7,#35e0d4)',
                        }}
                      />
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Paper>
          </motion.div>
        ))}
      </Box>
    </Section>
  )
}
