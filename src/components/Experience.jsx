import { Box, Typography, Paper, Chip, Stack } from '@mui/material'
import WorkRoundedIcon from '@mui/icons-material/WorkRounded'
import { motion } from 'framer-motion'
import Section from './Section'
import { experience } from '../data/resume'

export default function Experience() {
  return (
    <Section id="experience" eyebrow="Where I've worked" title="Experience">
      <Box sx={{ position: 'relative', maxWidth: 860, mx: 'auto' }}>
        {/* vertical line */}
        <Box
          sx={{
            position: 'absolute',
            left: { xs: 18, md: 22 },
            top: 8,
            bottom: 8,
            width: 2,
            background:
              'linear-gradient(180deg, rgba(110,86,247,0.6), rgba(53,224,212,0.2))',
          }}
        />

        <Stack spacing={4}>
          {experience.map((job, i) => (
            <motion.div
              key={`${job.role}-${job.period}`}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
            >
              <Box sx={{ position: 'relative', pl: { xs: 6, md: 7 } }}>
                {/* node */}
                <Box
                  sx={{
                    position: 'absolute',
                    left: { xs: 6, md: 10 },
                    top: 6,
                    width: 26,
                    height: 26,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    background: 'linear-gradient(135deg,#6e56f7,#35e0d4)',
                    boxShadow: '0 0 0 5px rgba(110,86,247,0.12)',
                    zIndex: 1,
                  }}
                >
                  <WorkRoundedIcon sx={{ fontSize: 14 }} />
                </Box>

                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 2.5, md: 3 },
                    borderRadius: 3,
                    bgcolor: 'rgba(19,19,30,0.55)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    justifyContent="space-between"
                    alignItems={{ xs: 'flex-start', sm: 'center' }}
                    gap={1}
                    sx={{ mb: 1 }}
                  >
                    <Box>
                      <Typography variant="h6" sx={{ lineHeight: 1.2 }}>
                        {job.role}
                      </Typography>
                      <Typography sx={{ color: 'primary.light', fontWeight: 600, fontSize: 15 }}>
                        {job.company}
                      </Typography>
                    </Box>
                    <Stack alignItems={{ xs: 'flex-start', sm: 'flex-end' }} spacing={0.5}>
                      {job.current && (
                        <Chip
                          label="Current"
                          size="small"
                          sx={{
                            bgcolor: 'rgba(34,197,94,0.15)',
                            color: '#4ade80',
                            border: '1px solid rgba(34,197,94,0.3)',
                            fontWeight: 600,
                          }}
                        />
                      )}
                      <Typography sx={{ fontFamily: 'mono', color: 'text.secondary', fontSize: 12.5 }}>
                        {job.period}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Typography sx={{ color: 'text.secondary', fontSize: 13, mb: 1.5 }}>
                    {job.location}
                  </Typography>

                  <Stack component="ul" sx={{ m: 0, pl: 2.2 }} spacing={0.75}>
                    {job.points.map((p, pi) => (
                      <Typography
                        key={pi}
                        component="li"
                        sx={{ color: 'text.secondary', fontSize: 14.5, lineHeight: 1.6 }}
                      >
                        {p}
                      </Typography>
                    ))}
                  </Stack>
                </Paper>
              </Box>
            </motion.div>
          ))}
        </Stack>
      </Box>
    </Section>
  )
}
