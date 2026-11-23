import { useCallback, useEffect, useRef, useState } from 'react'
import { BURN_LIMIT_S, BURN_SRC, clampCores } from '../lib/fanSpin'

export default function FanSpin() {
  const [running, setRunning] = useState(false)
  const [left, setLeft] = useState(BURN_LIMIT_S)
  const burn = useRef<{ ws: Worker[]; url: string } | null>(null)

  const stop = useCallback(() => {
    if (burn.current) {
      for (const w of burn.current.ws) w.terminate()
      URL.revokeObjectURL(burn.current.url)
      burn.current = null
    }
    setRunning(false)
    setLeft(BURN_LIMIT_S)
  }, [])

  const toggle = () => {
    if (burn.current) {
      stop()
      return
    }
    const url = URL.createObjectURL(new Blob([BURN_SRC], { type: 'text/javascript' }))
    burn.current = {
      ws: Array.from({ length: clampCores(navigator.hardwareConcurrency) }, () => new Worker(url)),
      url,
    }
    setRunning(true)
  }

  useEffect(() => {
    if (!running) return
    const id = window.setInterval(() => setLeft((s) => s - 1), 1000)
    return () => clearInterval(id)
  }, [running])

  useEffect(() => {
    if (left <= 0) stop()
  }, [left, stop])

  useEffect(() => {
    const onHide = () => {
      if (document.hidden) stop()
    }
    document.addEventListener('visibilitychange', onHide)
    return () => {
      document.removeEventListener('visibilitychange', onHide)
      stop()
    }
  }, [stop])

  return (
    <div className="fan-ctl">
      <button
        type="button"
        className={`fan-btn${running ? ' on' : ''}`}
        onClick={toggle}
        aria-pressed={running}
        aria-label={running ? 'Stop — let the CPU cool down' : 'Max out every CPU core'}
        title={running ? 'Stop' : 'Max out every CPU core'}
      >
        <svg
          className="fan-ic"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9.6" />
          <circle cx="12" cy="12" r="2" />
          <path d="M12 10c-.4-3.4 1.1-6.4 4.3-7.2 1.5 2.8-.9 5.8-4.3 7.2z" />
          <path d="M13.7 13c3.2 1.7 5.2 4.4 4.4 7.6-3 .5-5.2-3.4-4.4-7.6z" />
          <path d="M10.3 13c-2.7 1.6-6.1 2-8.7-.2 1-2.9 5.2-2 8.7.2z" />
        </svg>
      </button>
      <span className="fan-note">
        {running
          ? `All cores at 100% — ${left}s left. Click the fan to stop.`
          : 'Maxes every CPU core for up to a minute.'}
      </span>
    </div>
  )
}
