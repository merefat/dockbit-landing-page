import { useEffect, useRef, useState } from 'react'
import {
  CATALOG,
  CONNECT_MS,
  CONNECT_SERVICES,
  CONNECT_STEPS,
  DEPLOY_STAGES,
  EXTRAS,
  PROGRESS_STEPS,
  SECRET_MASK,
  genSecret,
  secretLabel,
} from '../lib/marketplaceDemo'

/* The Marketplace demo as a 3-screen click-through with two modes:
   install an app (pick → stages → password) or connect a service you
   already run (pick → checking → connected). One card, one idea,
   one button per screen. */

const RM_MQ = '(prefers-reduced-motion: reduce)'

type Mode = 'app' | 'svc'
type View = 'pick' | 'working' | 'done'

export default function MarketplaceDemo() {
  const [mode, setMode] = useState<Mode>('app')
  const [view, setView] = useState<View>('pick')
  const [selApp, setSelApp] = useState('grafana')
  const [selSvc, setSelSvc] = useState('supabase')
  const [stageIdx, setStageIdx] = useState(-1)
  const [creds, setCreds] = useState<string[]>([])
  const [shown, setShown] = useState<boolean[]>([])
  const [copied, setCopied] = useState<number | null>(null)
  const timers = useRef<number[]>([])

  const app = CATALOG.find((a) => a.key === selApp) ?? CATALOG[0]
  const svc = CONNECT_SERVICES.find((s) => s.key === selSvc) ?? CONNECT_SERVICES[0]
  const steps = mode === 'app' ? PROGRESS_STEPS : CONNECT_STEPS
  const stepNo = view === 'pick' ? 1 : view === 'working' ? 2 : 3
  const running = stageIdx === DEPLOY_STAGES.length - 1

  const reduced = () => window.matchMedia(RM_MQ).matches
  const after = (ms: number, fn: () => void) => {
    timers.current.push(window.setTimeout(fn, reduced() ? 0 : ms))
  }
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const install = () => {
    setView('working')
    setStageIdx(0)
    DEPLOY_STAGES.slice(1).forEach((s, i) =>
      after(s.at, () => {
        setStageIdx(i + 1)
        if (s.key === 'running') {
          setCreds(app.secrets.map(() => genSecret()))
          setShown(app.secrets.map(() => false))
        }
      }),
    )
  }

  const connect = () => {
    setView('working')
    after(CONNECT_MS, () => setView('done'))
  }

  const startOver = () => {
    setView('pick')
    setStageIdx(-1)
    setCreds([])
    setShown([])
  }

  const copy = async (i: number) => {
    try {
      await navigator.clipboard.writeText(creds[i])
    } catch {
      /* clipboard unavailable */
    }
    setCopied(i)
    timers.current.push(window.setTimeout(() => setCopied(null), 1500))
  }

  return (
    <div className="mk">
      <div className="mk-card">
        <ol className="mk-prog" aria-label="Steps">
          {steps.map((label, i) => {
            const n = i + 1
            const st = n < stepNo ? 'done' : n === stepNo ? 'on' : ''
            return (
              <li key={label} className={st} aria-current={n === stepNo ? 'step' : undefined}>
                <i aria-hidden="true">{n < stepNo ? '✓' : n}</i>
                {label}
              </li>
            )
          })}
        </ol>
        <div className="mk-body">
          {view === 'pick' && (
            <>
              <div className="mk-mode" role="group" aria-label="What to add">
                <button
                  type="button"
                  aria-pressed={mode === 'app'}
                  className={mode === 'app' ? 'on' : ''}
                  onClick={() => setMode('app')}
                >
                  Install an app
                </button>
                <button
                  type="button"
                  aria-pressed={mode === 'svc'}
                  className={mode === 'svc' ? 'on' : ''}
                  onClick={() => setMode('svc')}
                >
                  Connect a service
                </button>
              </div>
              <p className="mk-lead">{mode === 'app' ? 'Choose an app.' : 'Choose what to connect.'}</p>
              <div className="mk-grid" role="radiogroup" aria-label={mode === 'app' ? 'Apps' : 'Services'}>
                {mode === 'app'
                  ? CATALOG.map((a) => (
                      <button
                        key={a.key}
                        type="button"
                        role="radio"
                        aria-checked={a.key === selApp}
                        className={`mk-app${a.key === selApp ? ' sel' : ''}`}
                        onClick={() => setSelApp(a.key)}
                      >
                        <b>{a.name}</b>
                        <span>{a.blurb}</span>
                      </button>
                    ))
                  : CONNECT_SERVICES.map((s) => (
                      <button
                        key={s.key}
                        type="button"
                        role="radio"
                        aria-checked={s.key === selSvc}
                        className={`mk-app${s.key === selSvc ? ' sel' : ''}`}
                        onClick={() => setSelSvc(s.key)}
                      >
                        <b>{s.name}</b>
                        <span>{s.blurb}</span>
                      </button>
                    ))}
              </div>
              <div className="mk-actions">
                <button type="button" className="btn primary" onClick={mode === 'app' ? install : connect}>
                  {mode === 'app' ? `Install ${app.name}` : `Connect ${svc.name}`}
                </button>
              </div>
            </>
          )}

          {view === 'working' && mode === 'app' && (
            <>
              <h3 className="mk-title">Installing {app.name}…</h3>
              <div className="mk-track" aria-hidden="true">
                {DEPLOY_STAGES.map((s, i) => (
                  <span key={s.key} className={i < stageIdx ? 'dn' : i === stageIdx ? 'on' : ''}>
                    <i />
                    {s.label}
                  </span>
                ))}
              </div>
              <p className="mk-cap" role="status">
                {DEPLOY_STAGES[stageIdx]?.hint ?? DEPLOY_STAGES[0].hint}
              </p>
              <div className="mk-actions">
                {running &&
                  (app.secrets.length ? (
                    <button type="button" className="btn primary" onClick={() => setView('done')}>
                      Show my password
                    </button>
                  ) : (
                    <button type="button" className="btn primary" onClick={startOver}>
                      Start over
                    </button>
                  ))}
              </div>
            </>
          )}

          {view === 'working' && mode === 'svc' && (
            <>
              <h3 className="mk-title">Connecting {svc.name}…</h3>
              <div className="mk-needs">
                <span className="mk-needs-label">It needs:</span>
                {svc.needs.map((n) => (
                  <span key={n} className="mk-need">
                    {n}
                  </span>
                ))}
              </div>
              <p className="mk-checkline" role="status">
                <i aria-hidden="true" />
                Checking the details…
              </p>
            </>
          )}

          {view === 'done' && mode === 'app' && (
            <>
              <h3 className="mk-title">{app.name} is running.</h3>
              {app.secrets.length ? (
                <>
                  <p className="mk-cap">
                    DockBit made your password for you. You can find it again on the app’s page.
                  </p>
                  {app.secrets.map((field, i) => (
                    <div className="mk-cred" key={field}>
                      <span className="mk-clabel">{secretLabel(field)}</span>
                      <button
                        type="button"
                        className="mk-mini"
                        aria-label={`${shown[i] ? 'Hide' : 'Show'} ${secretLabel(field)}`}
                        onClick={() => setShown((prev) => prev.map((v, j) => (j === i ? !v : v)))}
                      >
                        {shown[i] ? 'Hide' : 'Show'}
                      </button>
                      <button
                        type="button"
                        className="mk-mini"
                        aria-label={`Copy ${secretLabel(field)}`}
                        onClick={() => copy(i)}
                      >
                        {copied === i ? 'Copied ✓' : 'Copy'}
                      </button>
                      <code>{shown[i] ? creds[i] : SECRET_MASK}</code>
                    </div>
                  ))}
                </>
              ) : (
                <p className="mk-cap">No password needed. Just open it.</p>
              )}
              <p className="mk-foot">
                <button type="button" className="mk-again" onClick={startOver}>
                  Start over
                </button>
              </p>
            </>
          )}

          {view === 'done' && mode === 'svc' && (
            <>
              <h3 className="mk-title">{svc.name} is connected.</h3>
              <p className="mk-cap">{svc.result}</p>
              <p className="mk-foot">
                <button type="button" className="mk-again" onClick={startOver}>
                  Start over
                </button>
              </p>
            </>
          )}
        </div>
      </div>

      <div className="mk-x">
        <div className="mk-xrow">
          {EXTRAS.map((e) => (
            <div className="mk-xcard" key={e.h}>
              <b>{e.h}</b>
              <p>{e.p}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
