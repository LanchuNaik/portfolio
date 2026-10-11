import { motion } from 'framer-motion'
import { EASE } from './layout'

// Fade + rise the first time the element scrolls into view.
export default function FadeIn({ children, delay = 0, y = 28, style, className, as = 'div' }) {
  const Component = motion[as]
  return (
    <Component
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </Component>
  )
}
