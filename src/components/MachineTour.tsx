import { useEffect, useState, type CSSProperties } from 'react'
import { AUTO_MS, FIX_MS, MACHINES, MACHINE_KEY, TOUR_STEPS, type Machine } from '../lib/machines'

/* The /machines interactive tour — ported from the user's reference
   section. Five numbered steps auto-advance until a step is picked;
   the fleet stage shows one slice per step: metrics, app placement,
   update order or the repair demo. */

const RM_MQ = '(prefers-reduced-motion: reduce)'

const BLADE = 'M12 10.6c0-2.6 1.6-4.9 4.4-5.9.4 2.6-1.4 5.4-4.4 5.9z'

function FanBlades({ cls }: { cls: string }) {
  return (
    <g className={cls} fill="currentColor">
      {[0, 72, 144, 216, 288].map((a) => (
        <path key={a} d={BLADE} transform={a ? `rotate(${a} 12 12)` : undefined} />
      ))}
    </g>
  )
}

/* Tiny case-fan icon; blades spin continuously via CSS. Busier
   machines get a shorter --fs so their fan visibly spins faster. */
function CpuFan({ off, fs }: { off: boolean; fs?: string }) {
  return (
    <svg
      className={`mt-fan${off ? ' off' : ''}`}
      viewBox="0 0 24 24"
      aria-hidden="true"
      style={fs ? ({ ['--fs' as string]: fs } as CSSProperties) : undefined}
    >
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.3" opacity=".5" />
      <FanBlades cls="mt-fan-b" />
      <circle cx="12" cy="12" r="2.2" fill="currentColor" />
    </svg>
  )
}

/* Per-metric glyph at the end of each watched row: a fan for CPU, a
   blinking-chip for RAM and a spinning platter for Disk. Each takes
   --fs so a busier metric visibly moves faster. */
function MetricIcon({ label, fs }: { label: string; fs: string }) {
  const style = { ['--fs' as string]: fs } as CSSProperties
  if (label === 'RAM') {
    return (
      <svg className="mt-ic" viewBox="0 0 24 24" aria-hidden="true" style={style}>
        <rect x="3.5" y="7" width="17" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <path d="M7 17.5v2.7M12 17.5v2.7M17 17.5v2.7" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <rect className="mt-ic-c" x="6.5" y="10" width="3" height="4" rx=".7" fill="currentColor" />
        <rect className="mt-ic-c" x="10.5" y="10" width="3" height="4" rx=".7" fill="currentColor" style={{ animationDelay: 'calc(var(--fs) * -0.33)' }} />
        <rect className="mt-ic-c" x="14.5" y="10" width="3" height="4" rx=".7" fill="currentColor" style={{ animationDelay: 'calc(var(--fs) * -0.66)' }} />
      </svg>
    )
  }
  if (label === 'Disk') {
    return (
      <svg className="mt-ic" viewBox="0 0 24 24" aria-hidden="true" style={style}>
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <g className="mt-ic-d">
          <circle cx="12" cy="7" r="1.7" fill="currentColor" />
        </g>
        <circle cx="12" cy="12" r="2" fill="currentColor" />
      </svg>
    )
  }
  return (
    <svg className="mt-ic" viewBox="0 0 24 24" aria-hidden="true" style={style}>
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.3" opacity=".5" />
      <FanBlades cls="mt-ic-b" />
      <circle cx="12" cy="12" r="2.2" fill="currentColor" />
    </svg>
  )
}

const fsFor = (v: number) => `${Math.max(0.7, 2.4 - v * 0.04).toFixed(2)}s`

function MachineRow({ m, step, fix, onRepair }: { m: Machine; step: number; fix: number; onRepair: () => void }) {
  const failed = step === 5 && m.status === 'fails' && fix === 0
  const showM = (step === 1 || step === 3) && !m.parked
  const cls = `mt-m${m.joined && step === 1 ? ' mt-new' : ''}${failed ? ' mt-bad' : ''}${showM ? ' mt-mon' : ''}`
  const cpu = m.metrics?.find((r) => r.label === 'CPU')
  const fs = cpu ? fsFor(cpu.v) : undefined
  return (
    <li className={cls} id={m.id}>
      <div className="mt-id">
        <b>{m.name}</b>
        <span>
          {m.kind}
          {m.joined && step === 1 && <em className="mt-jt"> · just joined</em>}
        </span>
      </div>
      <span className="mt-pill">
        {m.pill}
        <em>{m.sub}</em>
      </span>
      <div className="mt-what">
        {(step === 1 || step === 3) &&
          (m.parked ? (
            <div className="mt-dim">Paused. Not monitored</div>
          ) : (
            <div>
              {m.metrics?.map((r, i) => (
                <p className={`mt-mr${r.warn ? ' w' : ''}${i > 0 && step !== 3 ? ' x' : ''}`} key={r.label}>
                  <label>{r.label}</label>
                  <i style={{ ['--v' as string]: `${r.v}%` }} />
                  <u>{r.text}</u>
                  <MetricIcon label={r.label} fs={fsFor(r.v)} />
                </p>
              ))}
            </div>
          ))}

        {step === 2 &&
          (m.parked ? (
            <div className="mt-dim">No apps run here</div>
          ) : m.apps ? (
            <div>
              {m.apps.map((a) => (
                <span key={a} className={`mt-chip${a === m.appsHl ? ' hl' : ''}`}>
                  {a}
                </span>
              ))}
            </div>
          ) : (
            <div className="mt-dim">{m.appsNote}</div>
          ))}

        {step === 4 &&
          (m.update === 'ok' ? (
            <div className="mt-ok">✓ Updated</div>
          ) : m.update === 'updating' ? (
            <div className="mt-wr">
              <span className="mt-sp" aria-hidden="true" />
              Updating. Goes last, apps moved away first
            </div>
          ) : (
            <div className="mt-dim">Paused</div>
          ))}

        {step === 5 &&
          (m.status === 'ok' ? (
            <div className="mt-ok">● Connected</div>
          ) : m.status === 'paused' ? (
            <div className="mt-dim">Paused</div>
          ) : fix === 0 ? (
            <div>
              <span className="mt-bd">● Off the private network. Sites show errors</span>
              <button type="button" className="mt-rep" onClick={onRepair}>
                Repair
              </button>
            </div>
          ) : (
            <div className="mt-ok">● Back online</div>
          ))}
      </div>
      {!showM && <CpuFan off={!!m.parked || failed} fs={fs} />}
    </li>
  )
}

export default function MachineTour() {
  const [step, setStep] = useState(1)
  const [fix, setFix] = useState(0)
  const [auto, setAuto] = useState(false)

  /* Autoplay on mount unless reduced motion; each step runs AUTO_MS,
     then step 5's repair lands after FIX_MS. */
  useEffect(() => {
    if (!window.matchMedia(RM_MQ).matches) setAuto(true)
  }, [])
  useEffect(() => {
    if (!auto) return
    const f = step === 5 ? window.setTimeout(() => setFix(1), FIX_MS) : 0
    const t = window.setTimeout(() => {
      setFix(0)
      setStep((s) => (s % TOUR_STEPS.length) + 1)
    }, AUTO_MS)
    return () => {
      clearTimeout(t)
      clearTimeout(f)
    }
  }, [step, auto])

  const pick = (n: number) => {
    setAuto(false)
    setFix(0)
    setStep(n)
  }

  return (
    <div className="mt-grid">
      <div>
        <ol className={`mt-steps${auto ? ' mt-auto' : ''}`}>
          {TOUR_STEPS.map((s) => {
            const on = s.n === step
            return (
              <li key={s.n} className={`mt-step${on ? ' on' : ''}`}>
                <button type="button" aria-expanded={on} onClick={() => pick(s.n)}>
                  <span className="mt-n">{s.n}</span>
                  <b>{s.title}</b>
                  <small>{s.small}</small>
                </button>
                <div className="mt-body">
                  <p>{s.body}</p>
                  <p className="mt-tech">
                    <b>In technical terms</b> {s.tech}
                  </p>
                </div>
                <div className="mt-bar" aria-hidden="true">
                  <i />
                </div>
              </li>
            )
          })}
        </ol>
      </div>

      <div className="mt-stage">
        <div className="mt-net">
          <b>Your machines</b>
          <span className="mt-ln" />
          <span className="mt-netname">private network</span>
        </div>
        {step === 1 && (
          <p className="mt-cmd">
            Pick it from your network, paste one command, done.
            <br />
            <span>Already log in to a server? Run worker-install.sh instead.</span>
          </p>
        )}
        {step === 2 && (
          <p className="mt-rule">
            Rule: <b>shop-site</b> <span>runs on</span> <b>edge-01</b>{' '}
            <span>(or pick by label or group)</span>
          </p>
        )}
        <ul className="mt-fleet">
          {MACHINES.map((m) => (
            <MachineRow key={m.id} m={m} step={step} fix={fix} onRepair={() => setFix(1)} />
          ))}
          <li className="mt-m mt-add"><span className="mt-plus">+</span> Add machine</li>
        </ul>
        <div className="mt-key">
          {MACHINE_KEY.map((k) => (
            <div key={k.b}>
              <b>
                {k.b}
                <em>{k.sub}</em>
              </b>
              {k.p}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
