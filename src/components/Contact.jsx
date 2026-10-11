import { useState } from 'react'
import { Box, Snackbar, TextField } from '@mui/material'
import { motion } from 'framer-motion'
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import NorthEastRoundedIcon from '@mui/icons-material/NorthEastRounded'
import { Eyebrow } from './ui/SectionHeading'
import RevealLines from './ui/RevealLines'
import PillButton from './ui/PillButton'
import RotatingBadge from './ui/RotatingBadge'
import FadeIn from './ui/FadeIn'
import { EASE, cardSx, containerSx, monoLabelSx, sectionSx } from './ui/layout'
import { profile } from '../data/resume'

const channels = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { label: 'Phone', value: profile.phone, href: `tel:${profile.phone.replace(/\s+/g, '')}` },
  { label: 'LinkedIn', value: 'in/lanchananaik', href: profile.socials.linkedin, external: true },
  { label: 'GitHub', value: 'LanchuNaik', href: profile.socials.github, external: true },
]

const fieldSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '14px',
    bgcolor: 'var(--bg)',
    fontFamily: 'var(--font-sans)',
    '& fieldset': { borderColor: 'var(--line-strong)' },
    '&:hover fieldset': { borderColor: 'var(--muted)' },
    '&.Mui-focused fieldset': { borderColor: 'var(--accent)', borderWidth: '1.5px' },
  },
  '& .MuiInputLabel-root': { fontFamily: 'var(--font-sans)', color: 'var(--muted)' },
  '& .MuiInputLabel-root.Mui-focused': { color: 'var(--accent-ink)' },
}

function CopyEmail() {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, md: 2 }, flexWrap: 'wrap' }}>
      <Box
        component="a"
        href={`mailto:${profile.email}`}
        sx={{
          position: 'relative',
          fontSize: 'clamp(1.35rem, 3.6vw, 2.6rem)',
          fontWeight: 500,
          letterSpacing: '-0.035em',
          lineHeight: 1.2,
          wordBreak: 'break-all',
          '&::after': {
            content: '""',
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: -4,
            height: '2px',
            bgcolor: 'var(--accent)',
            transform: 'scaleX(0)',
            transformOrigin: 'right',
            transition: 'transform .6s var(--ease-out)',
          },
          '&:hover::after': { transform: 'scaleX(1)', transformOrigin: 'left' },
        }}
      >
        {profile.email}
      </Box>
      <Box
        component="button"
        type="button"
        onClick={copy}
        aria-label={copied ? 'Email copied' : 'Copy email address'}
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 0.75,
          height: 38,
          px: 1.75,
          borderRadius: 999,
          border: '1px solid var(--line-strong)',
          bgcolor: copied ? 'var(--ink)' : 'transparent',
          color: copied ? 'var(--bg)' : 'var(--ink)',
          cursor: 'pointer',
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          transition: 'all .3s var(--ease-out)',
          '&:hover': { borderColor: 'var(--ink)' },
        }}
      >
        {copied ? <CheckRoundedIcon sx={{ fontSize: 16 }} /> : <ContentCopyRoundedIcon sx={{ fontSize: 15 }} />}
        <span aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
      </Box>
    </Box>
  )
}

export default function Contact() {
  const [toast, setToast] = useState(false)

  // No backend: compose a pre-filled email in the visitor's mail app.
  const handleSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = data.get('name') || ''
    const email = data.get('email') || ''
    const message = data.get('message') || ''
    const subject = encodeURIComponent(`Hello from ${name} (via portfolio)`)
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`)
    setToast(true)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
  }

  return (
    <Box component="section" id="contact" sx={{ ...sectionSx, overflow: 'clip' }}>
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          left: '50%',
          top: '8%',
          width: '80vw',
          maxWidth: 1000,
          aspectRatio: '1',
          transform: 'translateX(-50%)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--accent-soft), transparent 62%)',
          pointerEvents: 'none',
        }}
      />
      <Box sx={{ ...containerSx, position: 'relative' }}>
        <Eyebrow index="05" label="Contact" />
        <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 4 }}>
          <Box
            component="h2"
            sx={{ m: 0, fontSize: 'clamp(2.9rem, 8.4vw, 7.6rem)', fontWeight: 600, letterSpacing: '-0.05em', lineHeight: 0.94 }}
          >
            <RevealLines
              lines={[
                "Let's build",
                <>
                  something <span className="serif accent">great</span>
                </>,
                'together.',
              ]}
            />
          </Box>
          <Box
            component={motion.div}
            initial={{ scale: 0, rotate: -120 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3, ease: EASE }}
            sx={{ display: { xs: 'none', md: 'block' }, flexShrink: 0, mb: 2 }}
          >
            <RotatingBadge
              text="SAY HELLO ✦ SAY HELLO ✦ SAY HELLO ✦ "
              href={`mailto:${profile.email}`}
              label="Email Lanchana"
              size={{ md: 168, lg: 196 }}
              iconSize={{ md: 30, lg: 34 }}
            />
          </Box>
        </Box>

        <FadeIn delay={0.15}>
          <Box sx={{ mt: { xs: 5, md: 7 } }}>
            <Box sx={{ ...monoLabelSx, mb: 1.5 }}>Drop me a line</Box>
            <CopyEmail />
          </Box>
        </FadeIn>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 0.85fr) minmax(0, 1.15fr)' },
            gap: { xs: 4, md: 6 },
            mt: { xs: 7, md: 10 },
            alignItems: 'start',
          }}
        >
          <FadeIn>
            <Box sx={{ color: 'var(--muted)', fontSize: { xs: 16, md: 17 }, lineHeight: 1.65, mb: 4, maxWidth: 420 }}>
              I&apos;m open to frontend and React Native roles, freelance work and collaborations. Tell me a little about
              what you&apos;re building and I&apos;ll get back to you.
            </Box>
            <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0, borderTop: '1px solid var(--line)' }}>
              {channels.map((c) => (
                <Box component="li" key={c.label} sx={{ borderBottom: '1px solid var(--line)' }}>
                  <Box
                    component="a"
                    href={c.href}
                    target={c.external ? '_blank' : undefined}
                    rel={c.external ? 'noopener' : undefined}
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: '90px 1fr auto',
                      alignItems: 'center',
                      gap: 2,
                      py: 2.25,
                      transition: 'padding .4s var(--ease-out), color .3s',
                      '& .arrow': { transition: 'transform .4s var(--ease-out)' },
                      '&:hover': { pl: 1.5, color: 'var(--accent-ink)' },
                      '&:hover .arrow': { transform: 'rotate(45deg)' },
                    }}
                  >
                    <Box component="span" sx={monoLabelSx}>
                      {c.label}
                    </Box>
                    <Box component="span" sx={{ fontWeight: 600, fontSize: { xs: 15, md: 17 }, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {c.value}
                    </Box>
                    <NorthEastRoundedIcon className="arrow" sx={{ fontSize: 18 }} />
                  </Box>
                </Box>
              ))}
            </Box>
            <Box sx={{ ...monoLabelSx, mt: 3 }}>{profile.location} · IST (UTC+5:30)</Box>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Box component="form" onSubmit={handleSubmit} sx={{ ...cardSx, p: { xs: 3, md: 4.5 }, borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-lg)' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 3 }}>
                <Box sx={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em' }}>Send a message</Box>
                <Box sx={{ ...monoLabelSx, fontSize: 10.5 }}>Opens your mail app</Box>
              </Box>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                <TextField name="name" label="Your name" required fullWidth autoComplete="name" sx={fieldSx} />
                <TextField name="email" type="email" label="Your email" required fullWidth autoComplete="email" sx={fieldSx} />
                <TextField
                  name="message"
                  label="What are you building?"
                  required
                  fullWidth
                  multiline
                  minRows={5}
                  sx={{ ...fieldSx, gridColumn: '1 / -1' }}
                />
              </Box>
              <PillButton type="submit" size="lg" arrow="up-right" sx={{ mt: 3, width: { xs: '100%', sm: 'auto' } }}>
                Send message
              </PillButton>
            </Box>
          </FadeIn>
        </Box>
      </Box>

      <Snackbar
        open={toast}
        autoHideDuration={4000}
        onClose={() => setToast(false)}
        message="Opening your email app…"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  )
}
