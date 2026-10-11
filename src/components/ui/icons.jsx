import PaymentsRoundedIcon from '@mui/icons-material/PaymentsRounded'
import HowToVoteRoundedIcon from '@mui/icons-material/HowToVoteRounded'
import AgricultureRoundedIcon from '@mui/icons-material/AgricultureRounded'
import EventRoundedIcon from '@mui/icons-material/EventRounded'
import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded'
import CodeRoundedIcon from '@mui/icons-material/CodeRounded'
import LayersRoundedIcon from '@mui/icons-material/LayersRounded'
import BoltRoundedIcon from '@mui/icons-material/BoltRounded'
import StorageRoundedIcon from '@mui/icons-material/StorageRounded'
import PaletteRoundedIcon from '@mui/icons-material/PaletteRounded'
import BuildRoundedIcon from '@mui/icons-material/BuildRounded'

const ICONS = {
  payments: PaymentsRoundedIcon,
  vote: HowToVoteRoundedIcon,
  agriculture: AgricultureRoundedIcon,
  event: EventRoundedIcon,
  devices: DevicesRoundedIcon,
  code: CodeRoundedIcon,
  layers: LayersRoundedIcon,
  bolt: BoltRoundedIcon,
  storage: StorageRoundedIcon,
  palette: PaletteRoundedIcon,
  build: BuildRoundedIcon,
}

// Resolves the string icon keys used in src/data/resume.js.
export function Icon({ name, ...props }) {
  const Component = ICONS[name]
  return Component ? <Component {...props} /> : null
}

// Minimal atom mark (three orbits + nucleus) used as a React motif.
export function ReactMark({ size = 24, stroke = 'currentColor', nucleus = 'var(--accent)', nucleusR = 2.1, strokeWidth = 1.4, style }) {
  return (
    <svg width={size} height={size} viewBox="-12 -12 24 24" fill="none" aria-hidden style={style}>
      <circle r={nucleusR} fill={nucleus} />
      <g stroke={stroke} strokeWidth={strokeWidth}>
        <ellipse rx="10.5" ry="4.2" />
        <ellipse rx="10.5" ry="4.2" transform="rotate(60)" />
        <ellipse rx="10.5" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  )
}
