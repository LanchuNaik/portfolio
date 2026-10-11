import { Box } from '@mui/material'
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded'
import ScrollRevealText from './ScrollRevealText'
import SectionHeading from './ui/SectionHeading'
import SpotlightCard from './ui/SpotlightCard'
import CountUp from './ui/CountUp'
import FadeIn from './ui/FadeIn'
import { Icon } from './ui/icons'
import { cardSx, containerSx, monoLabelSx, sectionSx } from './ui/layout'
import useLocalTime from '../hooks/useLocalTime'
import { domains, education, profile, stats } from '../data/resume'

const pad = { p: { xs: 3, md: 4 } }

function CardLabel({ children, sx }) {
  return <Box sx={{ ...monoLabelSx, mb: 2.5, ...sx }}>{children}</Box>
}

function IntroCard() {
  return (
    <SpotlightCard sx={{ ...pad, p: { xs: 3, md: 5 }, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 5 }}>
      <CardLabel>Hello there —</CardLabel>
      <ScrollRevealText
        text={profile.about}
        sx={{ fontSize: 'clamp(1.35rem, 2.3vw, 2.05rem)', fontWeight: 500, lineHeight: 1.3, letterSpacing: '-0.025em' }}
      />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box
          component="img"
          src={profile.photo}
          alt=""
          loading="lazy"
          sx={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover', objectPosition: '50% 22%', border: '2px solid var(--bg-elev)', boxShadow: '0 0 0 1px var(--line-strong)' }}
        />
        <Box sx={{ lineHeight: 1.2 }}>
          <Box className="serif" sx={{ fontSize: 30, lineHeight: 1 }}>
            {profile.firstName}
          </Box>
          <Box sx={{ ...monoLabelSx, fontSize: 10.5, mt: 0.5 }}>
            {profile.role} · {profile.location.split(',')[0]}
          </Box>
        </Box>
      </Box>
    </SpotlightCard>
  )
}

function StatsCard() {
  return (
    <Box sx={{ ...cardSx, height: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', overflow: 'hidden' }}>
      {stats.map((s, i) => (
        <Box
          key={s.label}
          sx={{
            p: { xs: 2.5, md: 3.5 },
            borderRight: i % 2 === 0 ? '1px solid var(--line)' : 'none',
            borderBottom: i < 2 ? '1px solid var(--line)' : 'none',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: 2,
          }}
        >
          <Box sx={{ fontSize: 'clamp(2.4rem, 4.4vw, 3.5rem)', fontWeight: 600, letterSpacing: '-0.05em', lineHeight: 1 }}>
            <CountUp value={s.value} decimals={s.decimals} suffix={s.suffix} />
          </Box>
          <Box sx={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.35 }}>{s.label}</Box>
        </Box>
      ))}
    </Box>
  )
}

function CurrentlyCard() {
  return (
    <Box
      sx={{
        ...cardSx,
        ...pad,
        height: '100%',
        bgcolor: 'var(--navy)',
        color: 'var(--navy-ink)',
        border: '1px solid rgba(255,255,255,0.06)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 4,
      }}
    >
      <Box aria-hidden sx={{ position: 'absolute', right: -60, top: -60, width: 220, height: 220, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.08)' }} />
      <Box aria-hidden sx={{ position: 'absolute', right: -20, top: -20, width: 140, height: 140, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.08)' }} />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
        <Box sx={{ position: 'relative', width: 8, height: 8 }}>
          <Box sx={{ position: 'absolute', inset: 0, borderRadius: '50%', bgcolor: 'var(--accent)', animation: 'pulse-ring 2s var(--ease-out) infinite' }} />
          <Box sx={{ position: 'absolute', inset: 0, borderRadius: '50%', bgcolor: 'var(--accent)' }} />
        </Box>
        <Box sx={{ ...monoLabelSx, color: 'var(--navy-muted)' }}>Currently</Box>
      </Box>
      <Box>
        <Box sx={{ fontSize: { xs: 26, md: 30 }, fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.1 }}>{profile.role}</Box>
        <Box sx={{ mt: 0.75, fontSize: 16, color: 'var(--navy-muted)' }}>
          at <span className="serif" style={{ fontSize: 21, color: 'var(--navy-ink)' }}>{profile.company}</span>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 2, borderTop: '1px solid rgba(255,255,255,0.1)', fontSize: 13.5, color: 'var(--navy-muted)' }}>
        <span>Since Oct 2025</span>
        <span>Intern from May 2025</span>
      </Box>
    </Box>
  )
}

function TimeCard() {
  const time = useLocalTime(profile.timeZone)
  const [clock, meridiem] = time.split(' ')
  return (
    <Box sx={{ ...cardSx, ...pad, height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 220 }}>
      {/* dotted "map" with a pulsing pin for Bangalore */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(var(--line-strong) 1.2px, transparent 1.2px)',
          backgroundSize: '14px 14px',
          maskImage: 'radial-gradient(circle at 78% 40%, black, transparent 60%)',
          WebkitMaskImage: 'radial-gradient(circle at 78% 40%, black, transparent 60%)',
        }}
      />
      <Box aria-hidden sx={{ position: 'absolute', left: '78%', top: '40%', width: 10, height: 10, ml: '-5px', mt: '-5px' }}>
        <Box sx={{ position: 'absolute', inset: 0, borderRadius: '50%', bgcolor: 'var(--accent)', animation: 'pulse-ring 2.4s var(--ease-out) infinite' }} />
        <Box sx={{ position: 'absolute', inset: 0, borderRadius: '50%', bgcolor: 'var(--accent)', boxShadow: '0 0 0 4px var(--accent-soft)' }} />
      </Box>
      <CardLabel sx={{ position: 'relative' }}>Local time</CardLabel>
      <Box sx={{ position: 'relative' }}>
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
          <Box sx={{ fontSize: { xs: 44, md: 52 }, fontWeight: 600, letterSpacing: '-0.05em', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{clock}</Box>
          <Box sx={{ ...monoLabelSx, color: 'var(--ink-2)' }}>{meridiem}</Box>
        </Box>
        <Box sx={{ mt: 1, fontSize: 14, color: 'var(--muted)' }}>IST · {profile.location}</Box>
      </Box>
    </Box>
  )
}

function EducationCard() {
  return (
    <Box sx={{ ...cardSx, ...pad, height: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <CardLabel>Education</CardLabel>
        <SchoolRoundedIcon sx={{ fontSize: 20, color: 'var(--muted)' }} />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.25 }}>
        {education.map((ed, i) => (
          <Box key={ed.degree} sx={{ pt: i ? 2.25 : 0, borderTop: i ? '1px solid var(--line)' : 'none' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1, alignItems: 'baseline' }}>
              <Box sx={{ fontWeight: 600, fontSize: 16, letterSpacing: '-0.01em' }}>{ed.degree}</Box>
            </Box>
            <Box sx={{ fontSize: 13.5, color: 'var(--muted)', mt: 0.25, lineHeight: 1.45 }}>{ed.institute}</Box>
            <Box sx={{ display: 'flex', gap: 1, mt: 1, flexWrap: 'wrap' }}>
              <Box component="span" sx={{ ...monoLabelSx, fontSize: 10.5, letterSpacing: '0.06em', color: 'var(--accent-ink)' }}>{ed.detail}</Box>
              <Box component="span" sx={{ ...monoLabelSx, fontSize: 10.5, letterSpacing: '0.06em' }}>· {ed.period}</Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

function DomainsCard() {
  return (
    <Box sx={{ ...cardSx, ...pad, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardLabel>Domains shipped in</CardLabel>
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.25, flex: 1 }}>
        {domains.map((d) => (
          <Box
            key={d.label}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 1.5,
              p: 1.75,
              borderRadius: 'var(--radius-sm)',
              bgcolor: 'var(--bg-sunk)',
              transition: 'background-color .3s, transform .3s var(--ease-out)',
              '&:hover': { bgcolor: 'var(--accent-soft)', transform: 'translateY(-3px)' },
              '&:hover svg': { color: 'var(--accent-ink)' },
            }}
          >
            <Icon name={d.icon} sx={{ fontSize: 22, color: 'var(--ink-2)', transition: 'color .3s' }} />
            <Box sx={{ fontWeight: 600, fontSize: 14.5 }}>{d.label}</Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default function About() {
  return (
    <Box component="section" id="about" sx={sectionSx}>
      <Box sx={containerSx}>
        <SectionHeading
          index="01"
          label="About"
          title={[
            'Engineering interfaces',
            <>
              people <span className="serif accent">enjoy</span> using.
            </>,
          ]}
        >
          A quick snapshot of who I am, where I work and what I've studied — the longer story lives in the projects below.
        </SectionHeading>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', md: 'repeat(12, minmax(0, 1fr))' },
            gap: { xs: 1.75, md: 2.25 },
            '& > *': { minWidth: 0 },
            '& > .bento-intro': { gridColumn: { sm: '1 / -1', md: 'span 7' }, gridRow: { md: 'span 2' } },
            '& > .bento-stats, & > .bento-current': { gridColumn: { md: 'span 5' } },
            '& > .bento-third': { gridColumn: { md: 'span 4' } },
            '& > .bento-wide': { gridColumn: { sm: '1 / -1', md: 'span 4' } },
          }}
        >
          <FadeIn className="bento-intro">
            <IntroCard />
          </FadeIn>
          <FadeIn delay={0.08} className="bento-stats">
            <StatsCard />
          </FadeIn>
          <FadeIn delay={0.16} className="bento-current">
            <CurrentlyCard />
          </FadeIn>
          <FadeIn delay={0.05} className="bento-third">
            <TimeCard />
          </FadeIn>
          <FadeIn delay={0.12} className="bento-third">
            <EducationCard />
          </FadeIn>
          <FadeIn delay={0.19} className="bento-wide">
            <DomainsCard />
          </FadeIn>
        </Box>
      </Box>
    </Box>
  )
}
