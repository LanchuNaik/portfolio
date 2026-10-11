import { forwardRef } from 'react'
import { Box } from '@mui/material'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import NorthEastRoundedIcon from '@mui/icons-material/NorthEastRounded'
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded'

// Arrow icons swap on hover: the visible one leaves, a twin slides in behind it.
const ICONS = {
  right: { Icon: ArrowForwardRoundedIcon, out: 'translateX(120%)', in: 'translateX(-120%)' },
  'up-right': { Icon: NorthEastRoundedIcon, out: 'translate(120%, -120%)', in: 'translate(-120%, 120%)' },
  down: { Icon: ArrowDownwardRoundedIcon, out: 'translateY(120%)', in: 'translateY(-120%)' },
}

const VARIANTS = {
  solid: {
    bgcolor: 'var(--ink)',
    color: 'var(--bg)',
    border: '1px solid var(--ink)',
    '--fill': 'var(--accent)',
    '&:hover': { color: '#0D1322', borderColor: 'var(--accent)' },
  },
  outline: {
    bgcolor: 'transparent',
    color: 'var(--ink)',
    border: '1px solid var(--line-strong)',
    '--fill': 'var(--ink)',
    '&:hover': { color: 'var(--bg)', borderColor: 'var(--ink)' },
  },
  accent: {
    bgcolor: 'var(--accent)',
    color: '#0D1322',
    border: '1px solid var(--accent)',
    '--fill': 'var(--ink)',
    '&:hover': { color: 'var(--bg)', borderColor: 'var(--ink)' },
  },
}

const SIZES = {
  sm: { height: 40, px: 2, fontSize: 14, gap: 0.75, iconSize: 16 },
  md: { height: 52, px: 3, fontSize: 15.5, gap: 1, iconSize: 18 },
  lg: { height: 60, px: 3.5, fontSize: 16.5, gap: 1.25, iconSize: 20 },
}

const PillButton = forwardRef(function PillButton(
  { variant = 'solid', size = 'md', arrow = 'right', startIcon, children, sx, ...props },
  ref,
) {
  const { iconSize, ...sizeSx } = SIZES[size]
  const arrowCfg = arrow ? ICONS[arrow] : null
  const component = props.href ? 'a' : 'button'

  return (
    <Box
      ref={ref}
      component={component}
      type={component === 'button' ? props.type || 'button' : undefined}
      sx={{
        position: 'relative',
        isolation: 'isolate',
        overflow: 'hidden',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 999,
        fontFamily: 'var(--font-sans)',
        fontWeight: 600,
        letterSpacing: '-0.005em',
        whiteSpace: 'nowrap',
        cursor: 'pointer',
        userSelect: 'none',
        transition: 'color .45s var(--ease-out), border-color .45s var(--ease-out)',
        ...sizeSx,
        ...VARIANTS[variant],
        // fill that rises from the bottom on hover
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: -1,
          zIndex: -1,
          borderRadius: 'inherit',
          background: 'var(--fill)',
          transform: 'translateY(102%)',
          transition: 'transform .5s var(--ease-out)',
        },
        '&:hover::before': { transform: 'translateY(0)' },
        '&:hover .pill-arrow-a': { transform: arrowCfg?.out },
        '&:hover .pill-arrow-b': { transform: 'translate(0, 0)' },
        '&:active': { transform: 'scale(0.98)' },
        ...sx,
      }}
      {...props}
    >
      {startIcon && <Box component="span" sx={{ display: 'inline-flex', '& svg': { fontSize: iconSize } }}>{startIcon}</Box>}
      <span>{children}</span>
      {arrowCfg && (
        <Box
          component="span"
          aria-hidden
          sx={{
            position: 'relative',
            display: 'inline-flex',
            overflow: 'hidden',
            width: iconSize,
            height: iconSize,
            '& svg': { fontSize: iconSize, transition: 'transform .45s var(--ease-out)' },
          }}
        >
          <arrowCfg.Icon className="pill-arrow-a" />
          <arrowCfg.Icon className="pill-arrow-b" sx={{ position: 'absolute', inset: 0, transform: arrowCfg.in }} />
        </Box>
      )}
    </Box>
  )
})

export default PillButton
