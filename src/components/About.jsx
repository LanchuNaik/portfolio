import { Box, Typography, Paper, Stack } from '@mui/material'
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded'
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded'
import HubRoundedIcon from '@mui/icons-material/HubRounded'
import { motion } from 'framer-motion'
import Section from './Section'
import { profile, education } from '../data/resume'

const highlights = [
  {
    icon: <RocketLaunchRoundedIcon />,
    title: 'Production-Grade Delivery',
    text: 'Shipped real products across fintech, agriculture, and event management with Stripe, Firebase, and real-time features.',
  },
  {
    icon: <HubRoundedIcon />,
    title: 'Multi-Role Architectures',
    text: 'Designed role-based dashboards & routing for distinct user types, backed by robust state management.',
  },
  {
    icon: <WorkspacePremiumRoundedIcon />,
    title: 'Strong Fundamentals',
    text: 'MCA with a 9.91/10 CGPA and complementary full-stack exposure across Node.js, Express.js, and MongoDB.',
  },
]

export default function About() {
  return (
    <Section id="about" eyebrow="Get to know me" title="About Me">
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1.1fr 0.9fr' },
          gap: { xs: 5, md: 6 },
          alignItems: 'start',
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <Typography sx={{ color: 'text.secondary', lineHeight: 1.85, mb: 2.5, fontSize: 17 }}>
            {profile.summary}
          </Typography>
          <Typography sx={{ color: 'text.secondary', lineHeight: 1.85, mb: 4, fontSize: 17 }}>
            {profile.summaryExtra}
          </Typography>

          <Typography variant="h5" sx={{ mb: 2 }}>
            Education
          </Typography>
          <Stack spacing={2}>
            {education.map((ed) => (
              <Paper
                key={ed.degree}
                elevation={0}
                sx={{
                  p: 2.5,
                  borderRadius: 3,
                  bgcolor: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <Stack direction="row" justifyContent="space-between" flexWrap="wrap" gap={1}>
                  <Typography sx={{ fontWeight: 600 }}>{ed.degree}</Typography>
                  <Typography sx={{ fontFamily: 'mono', color: 'secondary.main', fontSize: 13, fontWeight: 500 }}>
                    {ed.period}
                  </Typography>
                </Stack>
                <Typography sx={{ color: 'text.secondary', fontSize: 14, mt: 0.5 }}>
                  {ed.institute}
                </Typography>
                <Typography sx={{ color: 'primary.light', fontSize: 14, mt: 0.5, fontWeight: 600 }}>
                  {ed.detail}
                </Typography>
              </Paper>
            ))}
          </Stack>
        </motion.div>

        <Stack spacing={2.5}>
          {highlights.map((h, i) => (
            <motion.div
              key={h.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  bgcolor: 'rgba(19,19,30,0.55)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  backdropFilter: 'blur(10px)',
                  transition: 'transform 0.25s, border-color 0.25s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    borderColor: 'rgba(110,86,247,0.4)',
                  },
                }}
              >
                <Box
                  sx={{
                    width: 46,
                    height: 46,
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 1.5,
                    color: '#fff',
                    background: 'linear-gradient(135deg,#6e56f7,#35e0d4)',
                  }}
                >
                  {h.icon}
                </Box>
                <Typography variant="h6" sx={{ mb: 0.5 }}>
                  {h.title}
                </Typography>
                <Typography sx={{ color: 'text.secondary', fontSize: 14.5, lineHeight: 1.6 }}>
                  {h.text}
                </Typography>
              </Paper>
            </motion.div>
          ))}
        </Stack>
      </Box>
    </Section>
  )
}
