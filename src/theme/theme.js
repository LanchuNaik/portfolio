import { createTheme } from '@mui/material/styles'

// MUI palette for both colour schemes. Values mirror the CSS tokens in
// src/index.css so MUI components (inputs, tooltips, snackbars) match the
// hand-styled parts of the site. The scheme is switched with
// <html data-theme="light|dark">.
const theme = createTheme({
  cssVariables: { colorSchemeSelector: 'data-theme' },
  colorSchemes: {
    light: {
      palette: {
        primary: { main: '#0D1322', contrastText: '#F4F2ED' },
        secondary: { main: '#F0532B', contrastText: '#0D1322' },
        success: { main: '#16A34A' },
        background: { default: '#F4F2ED', paper: '#FFFFFF' },
        text: { primary: '#0D1322', secondary: '#5E6577' },
        divider: 'rgba(13, 19, 34, 0.09)',
      },
    },
    dark: {
      palette: {
        primary: { main: '#EDEFF5', contrastText: '#090D17' },
        secondary: { main: '#FF6A3D', contrastText: '#0D1322' },
        success: { main: '#22C55E' },
        background: { default: '#090D17', paper: '#10172A' },
        text: { primary: '#EDEFF5', secondary: '#8A92A6' },
        divider: 'rgba(237, 239, 245, 0.08)',
      },
    },
  },
  typography: {
    fontFamily: "'Instrument Sans', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif",
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: { borderRadius: 14 },
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          fontSize: 11.5,
          borderRadius: 8,
          padding: '6px 10px',
        },
      },
    },
  },
})

export default theme
