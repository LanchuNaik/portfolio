import { Box } from '@mui/material'
import { motion } from 'framer-motion'
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded'
import { EASE, containerSx, monoLabelSx } from './ui/layout'
import useLocalTime from '../hooks/useLocalTime'
import { navLinks, profile } from '../data/resume'

const links = [
  { label: 'GitHub', href: profile.socials.github },
  { label: 'LinkedIn', href: profile.socials.linkedin },
  { label: 'Email', href: `mailto:${profile.email}` },
  { label: 'Résumé', href: profile.resumeUrl },
]

const footerMono = { ...monoLabelSx, color: 'rgba(237,239,245,0.5)' }

export default function Footer() {
  const time = useLocalTime(profile.timeZone)

  return (
    <Box
      component="footer"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        bgcolor: '#0D1322',
        color: '#EDEFF5',
        borderTop: '1px solid var(--line)',
        '[data-theme="dark"] &': { bgcolor: '#060911' },
      }}
    >
      <Box sx={{ ...containerSx, pt: { xs: 8, md: 11 } }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr 1fr', md: '2fr 1fr 1fr auto' },
            gap: { xs: 5, md: 4 },
            alignItems: 'start',
          }}
        >
          <Box sx={{ gridColumn: { xs: '1 / -1', md: 'auto' } }}>
            <Box sx={{ fontSize: { xs: 26, md: 32 }, fontWeight: 600, letterSpacing: '-0.035em', lineHeight: 1.15, maxWidth: 420 }}>
              Building web &amp; mobile products with <span className="serif" style={{ color: '#FF8A63' }}>care</span>.
            </Box>
            <Box sx={{ ...footerMono, mt: 2 }}>
              {profile.location} · {time} IST
            </Box>
          </Box>

          <Box>
            <Box sx={{ ...footerMono, mb: 2 }}>Sitemap</Box>
            <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0, display: 'flex', flexDirection: 'column', gap: 1 }}>
              {navLinks.map((l) => (
                <li key={l.id}>
                  <Box component="a" href={`#${l.id}`} sx={{ color: 'rgba(237,239,245,0.85)', '&:hover': { color: '#FF8A63' } }}>
                    {l.label}
                  </Box>
                </li>
              ))}
            </Box>
          </Box>

          <Box>
            <Box sx={{ ...footerMono, mb: 2 }}>Elsewhere</Box>
            <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0, display: 'flex', flexDirection: 'column', gap: 1 }}>
              {links.map((l) => (
                <li key={l.label}>
                  <Box
                    component="a"
                    href={l.href}
                    target={l.href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener"
                    sx={{ color: 'rgba(237,239,245,0.85)', '&:hover': { color: '#FF8A63' } }}
                  >
                    {l.label}
                  </Box>
                </li>
              ))}
            </Box>
          </Box>

          <Box
            component="a"
            href="#home"
            aria-label="Back to top"
            sx={{
              gridColumn: { xs: '1 / -1', md: 'auto' },
              justifySelf: { xs: 'start', md: 'end' },
              width: 64,
              height: 64,
              borderRadius: '50%',
              border: '1px solid rgba(237,239,245,0.2)',
              display: 'grid',
              placeItems: 'center',
              transition: 'all .4s var(--ease-out)',
              '&:hover': { bgcolor: '#FF6A3D', borderColor: '#FF6A3D', color: '#0D1322', transform: 'translateY(-4px)' },
            }}
          >
            <ArrowUpwardRoundedIcon />
          </Box>
        </Box>

        {/* giant wordmark */}
        <Box
          component={motion.div}
          aria-hidden
          initial={{ y: '30%', opacity: 0 }}
          whileInView={{ y: '0%', opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: EASE }}
          sx={{
            mt: { xs: 8, md: 10 },
            fontSize: 'clamp(4.5rem, 21vw, 19rem)',
            fontWeight: 600,
            letterSpacing: '-0.065em',
            lineHeight: 0.92,
            whiteSpace: 'nowrap',
            textAlign: 'center',
            background: 'linear-gradient(180deg, rgba(237,239,245,0.95) 10%, rgba(237,239,245,0.06) 95%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            userSelect: 'none',
            pb: { xs: 3, md: 4 },
          }}
        >
          lanchana
          <Box
            component="span"
            sx={{ display: 'inline-block', width: '0.15em', height: '0.15em', ml: '0.04em', borderRadius: '50%', bgcolor: '#FF6A3D' }}
          />
        </Box>
      </Box>

      <Box sx={{ borderTop: '1px solid rgba(237,239,245,0.1)', position: 'relative', bgcolor: 'inherit' }}>
        <Box sx={{ ...containerSx, py: 3, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', gap: 1 }}>
          <Box sx={footerMono}>© {new Date().getFullYear()} {profile.name}</Box>
        </Box>
      </Box>
    </Box>
  )
}
