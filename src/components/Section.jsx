import { Box, Container, Typography, Stack } from '@mui/material'
import { motion } from 'framer-motion'

// Reusable section wrapper: id anchor, animated heading, and a fade-in-on-scroll body.
export default function Section({ id, eyebrow, title, children, sx }) {
  return (
    <Box
      component="section"
      id={id}
      sx={{ py: { xs: 8, md: 12 }, position: 'relative', ...sx }}
    >
      <Container maxWidth="lg">
        {(eyebrow || title) && (
          <Box sx={{ mb: { xs: 5, md: 7 }, textAlign: 'center' }}>
            {eyebrow && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5 }}
              >
                <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
                  <Box sx={{ width: 20, height: 1, bgcolor: 'secondary.main', opacity: 0.6 }} />
                  <Typography
                    sx={{
                      fontFamily: 'mono',
                      letterSpacing: 2.5,
                      textTransform: 'uppercase',
                      fontSize: 12.5,
                      fontWeight: 500,
                      color: 'secondary.main',
                    }}
                  >
                    {eyebrow}
                  </Typography>
                  <Box sx={{ width: 20, height: 1, bgcolor: 'secondary.main', opacity: 0.6 }} />
                </Stack>
              </motion.div>
            )}
            {title && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.55, delay: 0.05 }}
              >
                <Typography
                  variant="h3"
                  sx={{ fontSize: { xs: 30, md: 40 }, fontWeight: 700 }}
                >
                  {title}
                </Typography>
                <Box
                  sx={{
                    width: 64,
                    height: 4,
                    mx: 'auto',
                    mt: 2,
                    borderRadius: 2,
                    background:
                      'linear-gradient(90deg, #6e56f7, #35e0d4)',
                  }}
                />
              </motion.div>
            )}
          </Box>
        )}
        {children}
      </Container>
    </Box>
  )
}
