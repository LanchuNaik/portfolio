import { useState, useEffect } from 'react'
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  useScrollTrigger,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded'
import { motion } from 'framer-motion'
import { profile } from '../data/resume'

const links = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Experience', id: 'experience' },
  { label: 'Projects', id: 'projects' },
  { label: 'Contact', id: 'contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')
  const scrolled = useScrollTrigger({ disableHysteresis: true, threshold: 20 })

  // Scroll-spy: highlight the nav link for the section currently in view.
  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const drawer = (
    <Box sx={{ width: 260, height: '100%', bgcolor: '#0a0a0f' }} role="presentation">
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
        <IconButton onClick={() => setOpen(false)} sx={{ color: 'text.primary' }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {links.map((link) => (
          <ListItemButton
            key={link.id}
            component="a"
            href={`#${link.id}`}
            onClick={() => setOpen(false)}
            selected={active === link.id}
          >
            <ListItemText primary={link.label} />
          </ListItemButton>
        ))}
        <Box sx={{ px: 2, pt: 2 }}>
          <Button
            fullWidth
            variant="contained"
            href={profile.resumeUrl}
            target="_blank"
            startIcon={<DownloadRoundedIcon />}
          >
            Resume
          </Button>
        </Box>
      </List>
    </Box>
  )

  return (
    <>
      <AppBar
        component={motion.header}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        elevation={0}
        sx={{
          bgcolor: scrolled ? 'rgba(9,9,16,0.72)' : 'transparent',
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgba(255,255,255,0.06)'
            : '1px solid transparent',
          transition: 'all 0.35s ease',
        }}
      >
        <Toolbar sx={{ maxWidth: 'lg', width: '100%', mx: 'auto', px: { xs: 2, md: 3 } }}>
          <Typography
            component="a"
            href="#home"
            sx={{
              fontFamily: 'Sora, sans-serif',
              fontWeight: 800,
              fontSize: 22,
              flexGrow: 1,
              background: 'linear-gradient(90deg,#9d88ff,#35e0d4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Lanchana<span style={{ color: '#35e0d4', WebkitTextFillColor: '#35e0d4' }}>.</span>
          </Typography>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 0.5 }}>
            {links.map((link) => (
              <Button
                key={link.id}
                href={`#${link.id}`}
                sx={{
                  color: active === link.id ? 'primary.light' : 'text.secondary',
                  fontWeight: active === link.id ? 700 : 500,
                  px: 1.5,
                  '&:hover': { color: 'text.primary', bgcolor: 'transparent' },
                }}
              >
                {link.label}
              </Button>
            ))}
            <Button
              variant="contained"
              href={profile.resumeUrl}
              target="_blank"
              startIcon={<DownloadRoundedIcon />}
              sx={{
                ml: 1.5,
                background: 'linear-gradient(90deg,#6e56f7,#35e0d4)',
                boxShadow: '0 8px 24px rgba(110,86,247,0.35)',
              }}
            >
              Resume
            </Button>
          </Box>

          <IconButton
            onClick={() => setOpen(true)}
            sx={{ display: { xs: 'inline-flex', md: 'none' }, color: 'text.primary' }}
            aria-label="open menu"
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        {drawer}
      </Drawer>
    </>
  )
}
