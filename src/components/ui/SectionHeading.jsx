import { Box } from '@mui/material'
import { motion } from 'framer-motion'
import RevealLines from './RevealLines'
import { EASE, monoLabelSx } from './layout'

export function Eyebrow({ index, label, sx }) {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.6, ease: EASE }}
      sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: { xs: 2.5, md: 3 }, ...sx }}
    >
      {index && (
        <Box component="span" sx={{ ...monoLabelSx, color: 'var(--accent-ink)' }}>
          ({index})
        </Box>
      )}
      <Box component="span" sx={{ width: 36, height: '1px', bgcolor: 'var(--line-strong)' }} />
      <Box component="span" sx={monoLabelSx}>
        {label}
      </Box>
    </Box>
  )
}

// Numbered eyebrow + masked headline, with optional supporting copy on the right.
export default function SectionHeading({ index, label, title, children, sx }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: children ? 'minmax(0, 1.4fr) minmax(0, 1fr)' : '1fr' },
        alignItems: 'end',
        gap: { xs: 3, md: 6 },
        mb: { xs: 6, md: 9 },
        ...sx,
      }}
    >
      <Box>
        <Eyebrow index={index} label={label} />
        <Box
          component="h2"
          sx={{
            m: 0,
            fontSize: 'clamp(2.5rem, 5.6vw, 4.75rem)',
            fontWeight: 600,
            lineHeight: 0.98,
            letterSpacing: '-0.04em',
          }}
        >
          <RevealLines lines={title} />
        </Box>
      </Box>
      {children && (
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          sx={{ color: 'var(--muted)', fontSize: { xs: 16, md: 17 }, lineHeight: 1.65, maxWidth: 440, justifySelf: { md: 'end' } }}
        >
          {children}
        </Box>
      )}
    </Box>
  )
}
