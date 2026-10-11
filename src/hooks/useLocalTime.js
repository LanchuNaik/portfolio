import { useEffect, useMemo, useState } from 'react'

// Current wall-clock time in `timeZone`, e.g. "04:12 PM". Ticks every 15s.
export default function useLocalTime(timeZone) {
  const formatter = useMemo(
    () => new Intl.DateTimeFormat('en-US', { timeZone, hour: '2-digit', minute: '2-digit', hour12: true }),
    [timeZone],
  )
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 15000)
    return () => clearInterval(id)
  }, [])

  return formatter.format(now)
}
