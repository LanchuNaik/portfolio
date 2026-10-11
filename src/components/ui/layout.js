// Shared sx fragments so every section lines up on the same grid.

export const EASE = [0.22, 1, 0.36, 1]

export const containerSx = {
  width: '100%',
  maxWidth: 'var(--container)',
  mx: 'auto',
  px: 'var(--gutter)',
}

export const sectionSx = {
  position: 'relative',
  py: 'clamp(72px, 9vw, 128px)',
}

export const cardSx = {
  position: 'relative',
  bgcolor: 'var(--bg-elev)',
  border: '1px solid var(--line)',
  borderRadius: 'var(--radius-lg)',
  boxShadow: 'var(--shadow-sm)',
}

export const monoLabelSx = {
  fontFamily: 'var(--font-mono)',
  fontSize: 11.5,
  fontWeight: 500,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'var(--muted)',
}

export const chipSx = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 0.75,
  px: 1.5,
  py: 0.6,
  borderRadius: 999,
  border: '1px solid var(--line-strong)',
  fontFamily: 'var(--font-mono)',
  fontSize: 12.5,
  lineHeight: 1.4,
  color: 'var(--ink-2)',
  whiteSpace: 'nowrap',
  transition: 'border-color .25s, color .25s, background-color .25s',
}
