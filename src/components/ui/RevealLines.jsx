import { motion } from 'framer-motion'
import { EASE } from './layout'

const line = {
  hidden: { y: '115%' },
  show: { y: '0%', transition: { duration: 0.95, ease: EASE } },
}

// Slides each line up from behind a mask. `trigger="view"` plays when scrolled
// into view; `trigger="mount"` plays as soon as `play` is true.
export default function RevealLines({ lines, trigger = 'view', play = true, delay = 0, stagger = 0.09 }) {
  const parent = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  }
  const playProps =
    trigger === 'view'
      ? { initial: 'hidden', whileInView: 'show', viewport: { once: true, margin: '0px 0px -12% 0px' } }
      : { initial: 'hidden', animate: play ? 'show' : 'hidden' }

  return (
    <motion.span style={{ display: 'block' }} variants={parent} {...playProps}>
      {lines.map((content, i) => (
        <span
          key={i}
          style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.12em', marginBottom: '-0.12em' }}
        >
          <motion.span style={{ display: 'block' }} variants={line}>
            {content}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}
