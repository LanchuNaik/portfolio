import { Box, Typography, Paper, Stack, Button, TextField } from '@mui/material'
import EmailRoundedIcon from '@mui/icons-material/EmailRounded'
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded'
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import SendRoundedIcon from '@mui/icons-material/SendRounded'
import { motion } from 'framer-motion'
import Section from './Section'
import { profile } from '../data/resume'

const contactItems = [
  {
    icon: <EmailRoundedIcon />,
    label: 'Email',
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  {
    icon: <PhoneRoundedIcon />,
    label: 'Phone',
    value: profile.phone,
    href: `tel:${profile.phone.replace(/\s+/g, '')}`,
  },
  {
    icon: <LocationOnRoundedIcon />,
    label: 'Location',
    value: profile.location,
  },
]

export default function Contact() {
  // Compose a mailto so the form works with no backend.
  const handleSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = data.get('name') || ''
    const email = data.get('email') || ''
    const message = data.get('message') || ''
    const subject = encodeURIComponent(`Portfolio contact from ${name}`)
    const body = encodeURIComponent(`${message}\n\nFrom: ${name} (${email})`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
  }

  return (
    <Section id="contact" eyebrow="Let's connect" title="Get In Touch">
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '0.9fr 1.1fr' },
          gap: { xs: 4, md: 6 },
          alignItems: 'stretch',
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55 }}
        >
          <Typography sx={{ color: 'text.secondary', lineHeight: 1.8, mb: 4, fontSize: 16.5 }}>
            I'm open to new opportunities, collaborations, and interesting frontend or
            full-stack challenges. Drop me a message and I'll get back to you soon.
          </Typography>

          <Stack spacing={2}>
            {contactItems.map((item) => (
              <Paper
                key={item.label}
                component={item.href ? 'a' : 'div'}
                href={item.href}
                elevation={0}
                sx={{
                  p: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  borderRadius: 3,
                  bgcolor: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  transition: 'border-color 0.25s, transform 0.25s',
                  ...(item.href && {
                    '&:hover': {
                      borderColor: 'rgba(110,86,247,0.4)',
                      transform: 'translateX(4px)',
                    },
                  }),
                }}
              >
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    flexShrink: 0,
                    background: 'linear-gradient(135deg,#6e56f7,#35e0d4)',
                  }}
                >
                  {item.icon}
                </Box>
                <Box>
                  <Typography sx={{ fontFamily: 'mono', fontSize: 11.5, letterSpacing: 0.5, textTransform: 'uppercase', color: 'text.secondary' }}>
                    {item.label}
                  </Typography>
                  <Typography sx={{ fontWeight: 600, fontSize: 15, wordBreak: 'break-word' }}>
                    {item.value}
                  </Typography>
                </Box>
              </Paper>
            ))}
          </Stack>

          <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
            <Button
              href={profile.socials.github}
              target="_blank"
              variant="outlined"
              startIcon={<GitHubIcon />}
              sx={{ borderColor: 'rgba(255,255,255,0.15)', color: 'text.primary' }}
            >
              GitHub
            </Button>
            <Button
              href={profile.socials.linkedin}
              target="_blank"
              variant="outlined"
              startIcon={<LinkedInIcon />}
              sx={{ borderColor: 'rgba(255,255,255,0.15)', color: 'text.primary' }}
            >
              LinkedIn
            </Button>
          </Stack>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55 }}
        >
          <Paper
            elevation={0}
            component="form"
            onSubmit={handleSubmit}
            sx={{
              p: { xs: 3, md: 4 },
              borderRadius: 4,
              height: '100%',
              bgcolor: 'rgba(19,19,30,0.55)',
              border: '1px solid rgba(255,255,255,0.07)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Stack spacing={2.5}>
              <TextField name="name" label="Your Name" variant="filled" required fullWidth />
              <TextField
                name="email"
                type="email"
                label="Your Email"
                variant="filled"
                required
                fullWidth
              />
              <TextField
                name="message"
                label="Your Message"
                variant="filled"
                required
                fullWidth
                multiline
                rows={5}
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                endIcon={<SendRoundedIcon />}
                sx={{
                  background: 'linear-gradient(90deg,#6e56f7,#35e0d4)',
                  boxShadow: '0 10px 30px rgba(110,86,247,0.35)',
                }}
              >
                Send Message
              </Button>
            </Stack>
          </Paper>
        </motion.div>
      </Box>
    </Section>
  )
}
