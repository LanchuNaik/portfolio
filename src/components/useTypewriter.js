import { useEffect, useState } from 'react'

// Cycles through `words`, typing and deleting each one — a classic terminal effect.
export default function useTypewriter(words, { typeSpeed = 75, deleteSpeed = 40, pause = 1400 } = {}) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[index % words.length]

    // If a user prefers reduced motion, just show the first word statically.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setText(current)
      return
    }

    let timeout

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && text === '') {
      setDeleting(false)
      setIndex((i) => (i + 1) % words.length)
    } else {
      timeout = setTimeout(
        () => {
          setText(
            deleting
              ? current.slice(0, text.length - 1)
              : current.slice(0, text.length + 1),
          )
        },
        deleting ? deleteSpeed : typeSpeed,
      )
    }

    return () => clearTimeout(timeout)
  }, [text, deleting, index, words, typeSpeed, deleteSpeed, pause])

  return text
}
