import { useEffect, useState } from 'react'
import SectionHead from '../components/SectionHead'
import Marketplace from './Marketplace'
import { useInView } from '../lib/useInView'
import { SOURCES, STAGES, STAGE_MS, stageAt } from '../lib/deployPipeline'

const DONE = Number.MAX_SAFE_INTEGER

export default function Deploy() {
  const { ref, inView } = useInView<HTMLDivElement>()
  const [src, setSrc] = useState(SOURCES[0].id)
  const [elapsed, setElapsed] = useState(-1)

  const stages = STAGES[src]
  const total = stages.length * STAGE_MS
  const stage = stageAt(elapsed, stages.length)
  const running = stage >= 0 && stage < stages.length

  const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Auto-run once when the pipeline scrolls into view.
  useEffect(() => {
    if (inView && elapsed === -1) setElapsed(reduced() ? DONE : 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  // Advance the run to the next stage boundary.
  useEffect(() => {
    if (elapsed < 0 || elapsed >= total) return
    const next = (Math.floor(elapsed / STAGE_MS) + 1) * STAGE_MS
    const t = setTimeout(() => setElapsed(next), next - elapsed)
    return () => clearTimeout(t)
  }, [elapsed, total])

  const pick = (id: string) => {
    setSrc(id)
    setElapsed(reduced() ? DONE : 0)
  }

  return (
    <section className="wrap sec" id="deploy">
      <SectionHead
        title={
          <>
            Plug in a source.
            <br />
            Get a <em>running</em> service.
          </>
        }
        lede="Push to Git and it's live in about 30 seconds. The new version must pass its health check before the old one stops, and failed rollouts roll themselves back."
      />
      <div ref={ref} className={`pipe${running ? ' running' : ''}`}>
        <div className="ports" role="group" aria-label="Deploy source">
          {SOURCES.map((s) => (
            <button
              key={s.id}
              type="button"
              className={`port${src === s.id ? ' on' : ''}`}
              aria-pressed={src === s.id}
              onClick={() => pick(s.id)}
            >
              <i className="jack"></i>
              {s.label}
              <small>{s.tag}</small>
            </button>
          ))}
        </div>
        <div className="merge" aria-hidden="true"></div>
        <div className="stages">
          <span className="sr-only" role="status">
            {running ? `Deploying ${SOURCES.find((s) => s.id === src)?.label}: stage ${stage + 1} of 5, ${stages[stage].h}` : `Deploy from ${SOURCES.find((s) => s.id === src)?.label} finished — service running`}
          </span>
          {stages.map((s, i) => (
            <div key={`${src}-${i}`} className={`stage${i === stages.length - 1 ? ' dk' : ''}${i < stage ? ' done' : ''}${i === stage && running ? ' run' : ''}`}>
              <span className="tick" aria-hidden="true">
                ✓
              </span>
              <span className="n">{s.n}</span>
              <h4>{s.h}</h4>
              <p>{s.p}</p>
              <code>{s.code}</code>
            </div>
          ))}
        </div>
      </div>
      <Marketplace />
    </section>
  )
}
