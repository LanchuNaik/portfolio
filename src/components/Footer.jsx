import { Box, Container, Typography, Stack, Button } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import EmailRoundedIcon from '@mui/icons-material/EmailRounded'
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded'
import { profile } from '../data/resume'

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        borderTop: '1px solid rgba(255,255,255,0.07)',
        py: 4,
        mt: 4,
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography sx={{ color: 'text.secondary', fontSize: 14, textAlign: 'center' }}>
            © {2026} {profile.name}. Built with React & MUI.
          </Typography>

          <Stack direction="row" spacing={1} alignItems="center">
            <Button
              href={profile.socials.github}
              target="_blank"
              sx={{ minWidth: 42, color: 'text.secondary', '&:hover': { color: 'text.primary' } }}
              aria-label="GitHub"
            >
              <GitHubIcon fontSize="small" />
            </Button>
            <Button
              href={profile.socials.linkedin}
              target="_blank"
              sx={{ minWidth: 42, color: 'text.secondary', '&:hover': { color: 'text.primary' } }}
              aria-label="LinkedIn"
            >
              <LinkedInIcon fontSize="small" />
            </Button>
            <Button
              href={`mailto:${profile.email}`}
              sx={{ minWidth: 42, color: 'text.secondary', '&:hover': { color: 'text.primary' } }}
              aria-label="Email"
            >
              <EmailRoundedIcon fontSize="small" />
            </Button>
            <Button
              href="#home"
              sx={{
                minWidth: 42,
                color: 'text.secondary',
                '&:hover': { color: 'primary.light' },
              }}
              aria-label="Back to top"
            >
              <KeyboardArrowUpRoundedIcon />
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}
