import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { SCRIPT, TOTAL_MS, visibleAt, type FrameLine } from '../lib/autoplanScript'

function Row({ fl }: { fl: FrameLine }) {
  const { line } = fl
  if (line.kind === 'cmd')
    return (
      <div className="l cmd">
        <b>$</b> {line.text.slice(0, fl.chars)}
        {fl.chars < line.text.length && <span className="caret" />}
      </div>
    )
  if (line.kind === 'step')
    return (
      <div className="l step">
        <span className="m">▸</span>
        <span className="tag">{line.label}</span>
        <span>{line.text}</span>
        {line.tail && <span className="tail">{line.tail}</span>}
      </div>
    )
  if (line.kind === 'err')
    return (
      <div className="l err">
        <span className="x">✗</span> {line.text}
      </div>
    )
  if (line.kind === 'rule') return <div className="l rule">{line.text}</div>
  return <div className={`l${line.kind === 'dim' ? ' dim' : ''}`}>{line.text}</div>
}

export default function ChaosTerm() {
  const [elapsed, setElapsed] = useState(0)
  const [runId, setRunId] = useState(0)
  const box = useRef<HTMLDivElement>(null)
  const out = useRef<HTMLDivElement>(null)

  /* auto-play the first time the terminal scrolls into view */
  useEffect(() => {
    const el = box.current
    if (!el || runId !== 0) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setRunId(1)
          io.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [runId])

  /* playback clock — reduced motion jumps straight to the result */
  useEffect(() => {
    if (runId === 0) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setElapsed(TOTAL_MS)
      return
    }
    let raf = 0
    const t0 = performance.now()
    const tick = (now: number) => {
      const e = now - t0
      setElapsed(e)
      if (e < TOTAL_MS) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [runId])

  const frame = visibleAt(elapsed)
  const last = frame.lines[frame.lines.length - 1]
  const typingCmd = !!last && last.chars < last.line.text.length
  /* the next unrevealed line — a 'cmd' next means show a fresh prompt caret */
  const nextIsCmd = SCRIPT[frame.lines.length]?.kind === 'cmd'

  /* keep the scrollback pinned to the latest line */
  useEffect(() => {
    const el = out.current
    if (el) el.scrollTop = el.scrollHeight
  }, [frame.lines.length, frame.done])

  const replay = () => {
    setElapsed(0)
    setRunId((n) => n + 1)
  }

  return (
    <div className="cterm dk" ref={box}>
      <span className="sr-only">
        Terminal simulation: five commands try to deploy an app, add a second
        machine, attach a domain, schedule backups and add a teammate — each
        fails on ports, swarm, DNS, certificates, keys or cron. DockBit handles
        all of it.
      </span>
      <div className="cterm-bar" aria-hidden="true">
        <i />
        <i />
        <i />
        <span>prod-1 · ssh</span>
      </div>
      <div className="cterm-out" ref={out} aria-hidden="true">
        {frame.lines.length === 0 && (
          <div className="l cmd">
            <b>$</b> <span className="caret" />
          </div>
        )}
        {frame.lines.map((fl, i) => (
          <Row key={i} fl={fl} />
        ))}
        {!frame.done && frame.lines.length > 0 && !typingCmd && (
          <div className={`l${nextIsCmd ? ' cmd' : ''}`}>
            {nextIsCmd && <b>$</b>} <span className="caret" />
          </div>
        )}
        {frame.done && (
          <div className="l cmd">
            <b>$</b> <span className="caret" />
          </div>
        )}
      </div>
      {frame.done && (
        <div className="cterm-foot">
          <button type="button" onClick={replay}>
            ↺ run it again
          </button>
          <Link to="/deploy">how DockBit handles this →</Link>
        </div>
      )}
    </div>
  )
}
