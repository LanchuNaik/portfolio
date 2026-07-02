import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6e56f7', // iris
      light: '#9d88ff',
      dark: '#5641d6',
    },
    secondary: {
      main: '#35e0d4', // aqua
      light: '#6bf0e6',
      dark: '#1fb5aa',
    },
    success: {
      main: '#22c55e',
    },
    background: {
      default: '#0a0a0f', // ink — cool-biased near-black
      paper: 'rgba(18, 18, 28, 0.7)',
    },
    text: {
      primary: '#eceff5',
      secondary: '#8b8ba7', // haze — hue-biased neutral
    },
    divider: 'rgba(255, 255, 255, 0.07)',
  },
  typography: {
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    h1: { fontFamily: "'Sora', sans-serif", fontWeight: 800, letterSpacing: '-0.02em' },
    h2: { fontFamily: "'Sora', sans-serif", fontWeight: 700, letterSpacing: '-0.02em' },
    h3: { fontFamily: "'Sora', sans-serif", fontWeight: 700, letterSpacing: '-0.015em' },
    h4: { fontFamily: "'Sora', sans-serif", fontWeight: 600 },
    h5: { fontFamily: "'Sora', sans-serif", fontWeight: 600 },
    h6: { fontFamily: "'Sora', sans-serif", fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          paddingInline: 24,
          paddingBlock: 11,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 500 },
      },
    },
  },
})

// mono utility face exposed for labels / data
theme.typography.mono = "'JetBrains Mono', ui-monospace, monospace"

export default theme
