import { flushSync } from 'react-dom'
import { Box, Tooltip } from '@mui/material'
import { useColorScheme } from '@mui/material/styles'
import { AnimatePresence, motion } from 'framer-motion'
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded'
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded'

// Light/dark switch. Where the View Transitions API exists the new theme is
// revealed as a circle growing out of the button.
export default function ThemeToggle() {
  const { mode, systemMode, setMode } = useColorScheme()
  const resolved = (mode === 'system' ? systemMode : mode) || 'light'
  const isDark = resolved === 'dark'

  const handleClick = (e) => {
    const next = isDark ? 'light' : 'dark'
    const apply = () => {
      document.documentElement.setAttribute('data-theme', next)
      flushSync(() => setMode(next))
    }

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!document.startViewTransition || reduce) {
      apply()
      return
    }

    const rect = e.currentTarget.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))

    const transition = document.startViewTransition(apply)
    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 700, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', pseudoElement: '::view-transition-new(root)' },
      )
    })
  }

  const label = isDark ? 'Switch to light theme' : 'Switch to dark theme'

  return (
    <Tooltip title={isDark ? 'Light mode' : 'Dark mode'}>
      <Box
        component="button"
        type="button"
        onClick={handleClick}
        aria-label={label}
        sx={{
          position: 'relative',
          width: 42,
          height: 42,
          flexShrink: 0,
          display: 'grid',
          placeItems: 'center',
          borderRadius: '50%',
          border: '1px solid var(--line-strong)',
          bgcolor: 'var(--bg-elev)',
          color: 'var(--ink)',
          cursor: 'pointer',
          overflow: 'hidden',
          transition: 'border-color .25s, transform .25s',
          '&:hover': { borderColor: 'var(--ink)', transform: 'rotate(-12deg)' },
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isDark ? 'moon' : 'sun'}
            initial={{ y: 18, rotate: -90, opacity: 0 }}
            animate={{ y: 0, rotate: 0, opacity: 1 }}
            exit={{ y: -18, rotate: 90, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ display: 'grid', placeItems: 'center' }}
          >
            {isDark ? <DarkModeRoundedIcon sx={{ fontSize: 19 }} /> : <LightModeRoundedIcon sx={{ fontSize: 19 }} />}
          </motion.span>
        </AnimatePresence>
      </Box>
    </Tooltip>
  )
}
