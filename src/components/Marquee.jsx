import { Fragment } from 'react'
import { Box } from '@mui/material'
import { techStack } from '../data/resume'

function Star({ color }) {
  return (
    <Box component="svg" viewBox="0 0 24 24" aria-hidden sx={{ width: { xs: 16, md: 22 }, height: { xs: 16, md: 22 }, flexShrink: 0, color }}>
      <path fill="currentColor" d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z" />
    </Box>
  )
}

function Band({ items, rotate, reverse, duration, bg, color, starColor, sx }) {
  return (
    <Box
      sx={{
        gridArea: '1 / 1',
        alignSelf: 'center',
        overflow: 'hidden',
        width: '110%',
        ml: '-5%',
        transform: `rotate(${rotate}deg)`,
        bgcolor: bg,
        color,
        py: { xs: 1.5, md: 2.25 },
        '&:hover .track': { animationPlayState: 'paused' },
        ...sx,
      }}
    >
      <Box
        className="track"
        sx={{ display: 'flex', width: 'max-content', animation: `${reverse ? 'marquee-reverse' : 'marquee'} ${duration}s linear infinite` }}
      >
        {[0, 1].map((copy) => (
          <Box key={copy} sx={{ display: 'flex', alignItems: 'center' }}>
            {items.map((item) => (
              <Fragment key={`${copy}-${item}`}>
                <Box
                  component="span"
                  sx={{ px: { xs: 2, md: 3.5 }, fontSize: { xs: 22, md: 36 }, fontWeight: 600, letterSpacing: '-0.03em', whiteSpace: 'nowrap', lineHeight: 1.2 }}
                >
                  {item}
                </Box>
                <Star color={starColor} />
              </Fragment>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  )
}

// Two crossed, counter-scrolling ribbons of the tech stack.
export default function Marquee() {
  return (
    <Box aria-hidden sx={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', py: { xs: 7, md: 10 }, overflow: 'clip' }}>
      <Band items={[...techStack].reverse()} rotate={2.2} reverse duration={60} bg="var(--accent)" color="#0D1322" starColor="#0D1322" sx={{ opacity: 0.95 }} />
      <Band items={techStack} rotate={-2.6} duration={48} bg="var(--ink)" color="var(--bg)" starColor="var(--accent)" />
    </Box>
  )
}
