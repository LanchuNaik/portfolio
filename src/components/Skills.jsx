import { Box } from '@mui/material'
import SectionHeading from './ui/SectionHeading'
import SpotlightCard from './ui/SpotlightCard'
import FadeIn from './ui/FadeIn'
import { Icon, ReactMark } from './ui/icons'
import { chipSx, containerSx, monoLabelSx, sectionSx } from './ui/layout'
import { skillGroups } from '../data/resume'

// Placement on the 12-column desktop grid, in skillGroups order.
const LAYOUT = [
  { md: 'span 5', row: 'span 2', sm: '1 / -1' }, // Frontend (featured)
  { md: 'span 3' }, // Languages
  { md: 'span 4' }, // State Management
  { md: 'span 7', sm: '1 / -1' }, // APIs & Real-Time
  { md: 'span 4' }, // Backend & Database
  { md: 'span 4' }, // UI & Authentication
  { md: 'span 4', sm: '1 / -1' }, // Tools
]

function SkillCard({ group, index, featured }) {
  return (
    <SpotlightCard
      sx={{
        height: '100%',
        p: { xs: 3, md: featured ? 4.5 : 3.5 },
        display: 'flex',
        flexDirection: 'column',
        gap: 2.5,
        minHeight: featured ? { md: 440 } : 'auto',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: '14px',
            display: 'grid',
            placeItems: 'center',
            bgcolor: featured ? 'var(--ink)' : 'var(--bg-sunk)',
            color: featured ? 'var(--bg)' : 'var(--ink)',
          }}
        >
          <Icon name={group.icon} sx={{ fontSize: 22 }} />
        </Box>
        <Box component="span" sx={monoLabelSx}>
          {String(index + 1).padStart(2, '0')}
        </Box>
      </Box>

      <Box>
        <Box component="h3" sx={{ m: 0, fontSize: featured ? 'clamp(1.8rem, 3vw, 2.5rem)' : 21, fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
          {group.title}
        </Box>
        {group.blurb && <Box sx={{ mt: 1, color: 'var(--muted)', fontSize: 15 }}>{group.blurb}</Box>}
      </Box>

      <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0, display: 'flex', flexWrap: 'wrap', gap: 1, mt: featured ? 'auto' : 0, position: 'relative', zIndex: 1 }}>
        {group.skills.map((skill) => (
          <Box
            component="li"
            key={skill}
            sx={{
              ...chipSx,
              ...(featured && { fontSize: 14, px: 2, py: 1, fontFamily: 'var(--font-sans)', fontWeight: 600, bgcolor: 'var(--bg-elev)' }),
              '&:hover': { borderColor: 'var(--accent)', color: 'var(--ink)' },
            }}
          >
            {skill}
          </Box>
        ))}
      </Box>

      {featured && (
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            right: { xs: -90, md: -96 },
            bottom: { xs: -40, md: 40 },
            color: 'var(--line-strong)',
            zIndex: 0,
            '& svg': { animation: 'spin-slow 40s linear infinite' },
          }}
        >
          <ReactMark size={300} strokeWidth={0.3} nucleusR={0.55} />
        </Box>
      )}
    </SpotlightCard>
  )
}

export default function Skills() {
  return (
    <Box component="section" id="skills" sx={{ ...sectionSx, pt: { xs: 4, md: 6 } }}>
      <Box sx={containerSx}>
        <SectionHeading
          index="02"
          label="Skills"
          title={[
            <>
              The <span className="serif accent">toolkit</span>
            </>,
            'I build with.',
          ]}
        >
          From pixel-level UI to APIs, real-time sockets and payments — the stack I use to take features from Figma to production.
        </SectionHeading>

        <Box
          component="ul"
          sx={{
            listStyle: 'none',
            m: 0,
            p: 0,
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', md: 'repeat(12, minmax(0, 1fr))' },
            gap: { xs: 1.75, md: 2.25 },
          }}
        >
          {skillGroups.map((group, i) => (
            <Box
              component="li"
              key={group.title}
              sx={{ minWidth: 0, gridColumn: { sm: LAYOUT[i].sm, md: LAYOUT[i].md }, gridRow: { md: LAYOUT[i].row } }}
            >
              <FadeIn delay={(i % 3) * 0.07} style={{ height: '100%' }}>
                <SkillCard group={group} index={i} featured={i === 0} />
              </FadeIn>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  )
}
