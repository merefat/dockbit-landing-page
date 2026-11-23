import { Fragment, useRef, useState } from 'react'
import type { KeyboardEvent, TouchEvent } from 'react'
import { GOALS, GLOSS, SHOTS, STAGE_ASPECT, computeShotLayout, parseGloss, stepAt } from '../lib/walkthrough'
import type { Stage } from '../lib/walkthrough'

/* The /tour "Pick a goal. Follow the steps." walkthrough — ported from
   the user's reference section. Nine goals on the left; a stage on the
   right shows a zoomed screenshot, a command card, a form card or a
   list card per step. Arrow keys and swipe move between steps. */

function Gloss({ text }: { text: string }) {
  return (
    <>
      {parseGloss(text).map((p, i) =>
        p.term ? (
          <abbr key={i} className="gw-term" title={GLOSS[p.term]}>
            {p.text}
          </abbr>
        ) : (
          <Fragment key={i}>{p.text}</Fragment>
        ),
      )}
    </>
  )
}

function ShotStage({ stage }: { stage: Extract<Stage, { kind: 'shot' }> }) {
  const shot = SHOTS[stage.shot]
  const [missing, setMissing] = useState(false)
  const aspect = shot.w / shot.h
  const { scale, left, top, width } = computeShotLayout(stage.zoom, aspect, aspect)
  if (missing) {
    return (
      <div className="gw-plain">
        <p className="gw-missing">Screenshot not yet added: {shot.src}</p>
      </div>
    )
  }
  return (
    <div
      className="gw-shot"
      style={{ aspectRatio: `${shot.w} / ${shot.h}`, width: `${width}%`, left: `${left}%`, top: `${top}%` }}
    >
      <img
        src={shot.src}
        alt={shot.alt}
        width={shot.w}
        height={shot.h}
        loading="lazy"
        decoding="async"
        onError={() => setMissing(true)}
      />
      {stage.ring && (
        <i
          className="gw-ring"
          aria-hidden="true"
          style={{
            left: `${stage.ring.x}%`,
            top: `${stage.ring.y}%`,
            width: `${stage.ring.w}%`,
            height: `${stage.ring.h}%`,
          }}
        />
      )}
      {stage.cursor && (
        <svg
          className="gw-cursor"
          aria-hidden="true"
          style={{ left: `${stage.cursor.x}%`, top: `${stage.cursor.y}%`, width: `${9 / scale}%` }}
          viewBox="0 0 24 24"
        >
          <path d="M4 2l16 11.4-7.1 1.2-3.6 6.4z" fill="#F39C12" stroke="#101820" strokeWidth="1.2" />
        </svg>
      )}
    </div>
  )
}

function CopyStage({ cmd }: { cmd: string }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(cmd)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      /* clipboard unavailable */
    }
  }
  return (
    <div className="gw-copy">
      <span className="gw-tag">Run this</span>
      <code>{cmd}</code>
      <button type="button" className="gw-copybtn" onClick={copy}>
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  )
}

function StageView({ stage }: { stage: Stage }) {
  if (stage.kind === 'shot') return <ShotStage key={stage.shot} stage={stage} />
  return (
    <div className="gw-plain">
      {stage.kind === 'copy' && <CopyStage cmd={stage.cmd} />}
      {stage.kind === 'form' && (
        <div className="gw-form">
          <span className="gw-tag">You fill in</span>
          {stage.fields.map((f) => (
            <label key={f.label} className="gw-field">
              <span>{f.label}</span>
              <i>{f.value}</i>
            </label>
          ))}
          <span className="gw-submit">{stage.cta}</span>
        </div>
      )}
      {stage.kind === 'list' && (
        <ol className="gw-list">
          {stage.items.map((it, i) => (
            <li key={i}>
              <span>{i + 1}</span>
              <Gloss text={it} />
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}

export default function GoalWalkthrough() {
  const [gi, setGi] = useState(0)
  const [si, setSi] = useState(0)
  const touchX = useRef<number | null>(null)
  const goal = GOALS[gi]
  const step = goal.steps[si]
  const count = goal.steps.length
  const next = stepAt(gi, si, 1)
  const nextLabel = next.gi === gi ? GOALS[gi].steps[next.si].title : GOALS[next.gi].name

  const go = (d: 1 | -1) => {
    const n = stepAt(gi, si, d)
    setGi(n.gi)
    setSi(n.si)
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') go(1)
    if (e.key === 'ArrowLeft') go(-1)
  }

  const onTouchStart = (e: TouchEvent) => {
    touchX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e: TouchEvent) => {
    if (touchX.current === null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    touchX.current = null
    if (dx < -40) go(1)
    else if (dx > 40) go(-1)
  }

  return (
    <div
      className="gw dk"
      role="group"
      aria-label="Step-by-step walkthrough"
      onKeyDown={onKeyDown}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="gw-rail" role="tablist" aria-label="Goals">
        {GOALS.map((g, i) => (
          <button
            key={g.name}
            type="button"
            role="tab"
            className="gw-goal"
            aria-selected={i === gi}
            onClick={() => {
              setGi(i)
              setSi(0)
            }}
          >
            <span className="rn">{String(i + 1).padStart(2, '0')}</span>
            <span className="gw-goaltext">
              <b>{g.name}</b>
              <small>{g.blurb}</small>
            </span>
          </button>
        ))}
      </div>
      <div className="gw-main">
        <div
          className="gw-stage"
          style={{
            aspectRatio:
              step.stage.kind === 'shot'
                ? `${SHOTS[step.stage.shot].w} / ${SHOTS[step.stage.shot].h}`
                : `${STAGE_ASPECT}`,
          }}
        >
          <StageView stage={step.stage} />
        </div>
        <div className="gw-path">
          {goal.steps.map((s, i) => (
            <Fragment key={i}>
              <button
                type="button"
                className={`gw-dot${i < si ? ' done' : ''}${i === si ? ' on' : ''}`}
                aria-label={`Step ${i + 1}: ${s.title}`}
                aria-current={i === si ? 'step' : undefined}
                onClick={() => setSi(i)}
              >
                {i < si ? '✓' : i + 1}
              </button>
              {i < count - 1 && <i className={`gw-bar${i < si ? ' done' : ''}`} aria-hidden="true" />}
            </Fragment>
          ))}
        </div>
        <div className="gw-card" aria-live="polite">
          <span className="gw-meta">
            {goal.name} · Step {si + 1} of {count}
          </span>
          <h4>{step.title}</h4>
          <p>
            <Gloss text={step.desc} />
          </p>
          <div className="gw-who">
            <div className="gw-you">
              <b>You do</b>
              <span>
                <Gloss text={step.you} />
              </span>
            </div>
            <div className="gw-does">
              <b>DockBit does</b>
              <span>
                <Gloss text={step.does} />
              </span>
            </div>
          </div>
        </div>
        <div className="gw-nav">
          <span>
            Step {si + 1} of {count} · Up next: {nextLabel}
          </span>
          <div>
            <button type="button" className="gw-btn" onClick={() => go(-1)}>
              Back
            </button>
            <button type="button" className="gw-btn pri" onClick={() => go(1)}>
              {si === count - 1 ? (gi === GOALS.length - 1 ? 'Start over' : `Next: ${GOALS[gi + 1].name}`) : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
