import { useCallback, useEffect, useRef, useState } from 'react'
import { Box } from '@mui/material'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import ThemeToggle from './ThemeToggle'
import PillButton from './ui/PillButton'
import { EASE, monoLabelSx } from './ui/layout'
import { navLinks, profile } from '../data/resume'

function Logo() {
  return (
    <Box
      component="a"
      href="#home"
      aria-label={`${profile.name} — back to top`}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.25,
        pl: 0.5,
        '&:hover .logo-dot': { transform: 'translate(-14px, -12px)' },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: 40,
          height: 40,
          borderRadius: '50%',
          bgcolor: 'var(--ink)',
          color: 'var(--bg)',
          display: 'grid',
          placeItems: 'center',
          fontFamily: 'var(--font-serif)',
          fontStyle: 'italic',
          fontSize: 24,
          lineHeight: 1,
          pr: '4px',
        }}
      >
        L
        <Box
          className="logo-dot"
          sx={{
            position: 'absolute',
            right: 8,
            bottom: 10,
            width: 7,
            height: 7,
            borderRadius: '50%',
            bgcolor: 'var(--accent)',
            transition: 'transform .5s var(--ease-out)',
          }}
        />
      </Box>
      <Box sx={{ display: { xs: 'none', sm: 'block' }, lineHeight: 1.15 }}>
        <Box sx={{ fontWeight: 600, fontSize: 15, letterSpacing: '-0.01em' }}>Lanchana Naik</Box>
        <Box sx={{ ...monoLabelSx, fontSize: 10, letterSpacing: '0.1em' }}>React · React Native</Box>
      </Box>
    </Box>
  )
}

function MenuButton({ open, onClick }) {
  return (
    <Box
      component="button"
      type="button"
      onClick={onClick}
      aria-label={open ? 'Close menu' : 'Open menu'}
      aria-expanded={open}
      aria-controls="mobile-menu"
      sx={{
        display: { xs: 'grid', md: 'none' },
        placeItems: 'center',
        width: 42,
        height: 42,
        borderRadius: '50%',
        border: 'none',
        bgcolor: 'var(--ink)',
        color: 'var(--bg)',
        cursor: 'pointer',
      }}
    >
      <Box sx={{ position: 'relative', width: 16, height: 10 }}>
        {[0, 1].map((i) => (
          <Box
            key={i}
            component={motion.span}
            animate={open ? { top: 4, rotate: i ? -45 : 45 } : { top: i ? 8 : 0, rotate: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            sx={{ position: 'absolute', left: 0, width: 16, height: '2px', borderRadius: 2, bgcolor: 'currentColor' }}
          />
        ))}
      </Box>
    </Box>
  )
}

function MobileMenu({ open, onClose }) {
  const firstLinkRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.documentElement.style.overflow = 'hidden'
    firstLinkRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = ''
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <Box
          component={motion.div}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          initial={{ clipPath: 'circle(0% at 92% 36px)' }}
          animate={{ clipPath: 'circle(150% at 92% 36px)' }}
          exit={{ clipPath: 'circle(0% at 92% 36px)' }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          sx={{
            position: 'fixed',
            inset: 0,
            zIndex: 1100,
            bgcolor: 'var(--bg)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            px: 'var(--gutter)',
            pt: 13,
            pb: 5,
            overflowY: 'auto',
          }}
        >
          <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0 }}>
            {navLinks.map((link, i) => (
              <Box component="li" key={link.id} sx={{ overflow: 'hidden', borderBottom: '1px solid var(--line)' }}>
                <Box
                  component={motion.a}
                  ref={i === 0 ? firstLinkRef : undefined}
                  href={`#${link.id}`}
                  onClick={onClose}
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.25 + i * 0.06, duration: 0.7, ease: EASE }}
                  sx={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                    py: 1.5,
                    fontSize: 'clamp(2.4rem, 11vw, 3.6rem)',
                    fontWeight: 600,
                    letterSpacing: '-0.04em',
                    lineHeight: 1.05,
                  }}
                >
                  {link.label}
                  <Box component="span" sx={{ ...monoLabelSx, color: 'var(--accent-ink)' }}>
                    0{i + 1}
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>

          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mt: 6 }}
          >
            <Box component="a" href={`mailto:${profile.email}`} sx={{ fontSize: 18, fontWeight: 500 }}>
              {profile.email}
            </Box>
            <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center', flexWrap: 'wrap' }}>
              <PillButton href={profile.resumeUrl} target="_blank" rel="noopener" size="sm" arrow="down">
                Résumé
              </PillButton>
              <PillButton href={profile.socials.github} target="_blank" rel="noopener" size="sm" variant="outline" arrow={null} startIcon={<GitHubIcon />}>
                GitHub
              </PillButton>
              <PillButton href={profile.socials.linkedin} target="_blank" rel="noopener" size="sm" variant="outline" arrow={null} startIcon={<LinkedInIcon />}>
                LinkedIn
              </PillButton>
            </Box>
          </Box>
        </Box>
      )}
    </AnimatePresence>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const [hovered, setHovered] = useState(null)
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()
  const closeMenu = useCallback(() => setOpen(false), [])

  // Hide while scrolling down, reveal on any upward scroll.
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(y > 24)
    setHidden(y > prev && y > 320)
  })

  // Scroll-spy: track which section sits in the middle of the viewport.
  useEffect(() => {
    const ids = ['home', ...navLinks.map((l) => l.id)]
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id === 'home' ? '' : entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const highlighted = hovered ?? active

  return (
    <>
      <Box
        component={motion.header}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: hidden && !open ? -110 : 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: EASE }}
        sx={{ position: 'fixed', top: { xs: 10, md: 16 }, left: 0, right: 0, zIndex: 1200, px: 'var(--gutter)', pointerEvents: 'none' }}
      >
        <Box
          component="nav"
          aria-label="Primary"
          sx={{
            pointerEvents: 'auto',
            maxWidth: 'var(--container)',
            mx: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
            p: 0.75,
            borderRadius: 999,
            border: '1px solid',
            borderColor: scrolled && !open ? 'var(--line)' : 'transparent',
            bgcolor: scrolled && !open ? 'var(--glass)' : 'transparent',
            backdropFilter: scrolled && !open ? 'blur(18px) saturate(160%)' : 'none',
            WebkitBackdropFilter: scrolled && !open ? 'blur(18px) saturate(160%)' : 'none',
            boxShadow: scrolled && !open ? 'var(--shadow-sm)' : 'none',
            transition: 'background-color .4s, border-color .4s, box-shadow .4s',
          }}
        >
          <Logo />

          <Box
            component="ul"
            onMouseLeave={() => setHovered(null)}
            sx={{
              display: { xs: 'none', md: 'flex' },
              listStyle: 'none',
              m: 0,
              p: 0.5,
              gap: 0.25,
              borderRadius: 999,
              border: '1px solid',
              borderColor: scrolled ? 'transparent' : 'var(--line)',
              bgcolor: scrolled ? 'transparent' : 'var(--glass)',
              backdropFilter: scrolled ? 'none' : 'blur(14px)',
              WebkitBackdropFilter: scrolled ? 'none' : 'blur(14px)',
              transition: 'background-color .4s, border-color .4s',
            }}
          >
            {navLinks.map((link) => (
              <li key={link.id}>
                <Box
                  component="a"
                  href={`#${link.id}`}
                  onMouseEnter={() => setHovered(link.id)}
                  onFocus={() => setHovered(link.id)}
                  onBlur={() => setHovered(null)}
                  aria-current={active === link.id ? 'location' : undefined}
                  sx={{
                    position: 'relative',
                    isolation: 'isolate',
                    display: 'block',
                    px: 2,
                    py: 1,
                    borderRadius: 999,
                    fontSize: 14.5,
                    fontWeight: 500,
                    color: highlighted === link.id ? 'var(--ink)' : 'var(--muted)',
                    transition: 'color .2s',
                  }}
                >
                  {highlighted === link.id && (
                    <Box
                      component={motion.span}
                      layoutId="nav-pill"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      sx={{ position: 'absolute', inset: 0, zIndex: -1, borderRadius: 999, bgcolor: 'var(--bg-sunk)' }}
                    />
                  )}
                  {link.label}
                  {active === link.id && (
                    <Box
                      component="span"
                      sx={{ position: 'absolute', left: '50%', bottom: 3, width: 4, height: 4, ml: '-2px', borderRadius: '50%', bgcolor: 'var(--accent)' }}
                    />
                  )}
                </Box>
              </li>
            ))}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ThemeToggle />
            <PillButton
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener"
              size="sm"
              arrow="down"
              sx={{ display: { xs: 'none', sm: 'inline-flex' }, height: 42 }}
            >
              Résumé
            </PillButton>
            <MenuButton open={open} onClick={() => setOpen((v) => !v)} />
          </Box>
        </Box>
      </Box>

      <MobileMenu open={open} onClose={closeMenu} />
    </>
  )
}
