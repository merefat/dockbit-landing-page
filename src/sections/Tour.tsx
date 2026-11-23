import { Fragment, useState } from 'react'
import type { KeyboardEvent } from 'react'
import SectionHead from '../components/SectionHead'
import { TOUR_FEATURES, TOUR_KEYS } from '../data/tour'

export function TourWidget() {
  const [feature, setFeature] = useState('deploy')
  const [step, setStep] = useState(0)
  const item = TOUR_FEATURES[feature]
  const count = item.steps.length
  const last = step === count - 1
  const fi = TOUR_KEYS.indexOf(feature)
  const lastFeature = fi === TOUR_KEYS.length - 1

  const select = (key: string) => {
    setFeature(key)
    setStep(0)
  }

  const go = (d: 1 | -1) => {
    if (d < 0) {
      if (step > 0) setStep(step - 1)
    } else if (last) {
      setFeature(TOUR_KEYS[(fi + 1) % TOUR_KEYS.length])
      setStep(0)
    } else {
      setStep(step + 1)
    }
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') go(1)
    if (e.key === 'ArrowLeft') go(-1)
  }

  return (
    <div className="tour dk" onKeyDown={onKeyDown} role="group" aria-label="Product tour">
      <div className="tour-rail" role="tablist" aria-label="DockBit areas">
        {TOUR_KEYS.map((key, i) => (
          <button
            key={key}
            type="button"
            role="tab"
            className="tour-goal"
            aria-selected={key === feature}
            onClick={() => select(key)}
          >
            <span className="rn">{String(i + 1).padStart(2, '0')}</span>
            <b>{TOUR_FEATURES[key].name}</b>
          </button>
        ))}
      </div>
      <div className="tour-pane">
        <h3>{item.title}</h3>
        <p className="td">{item.desc}</p>
        <div className="tour-path">
          {item.steps.map(([title], i) => (
            <Fragment key={i}>
              <button
                type="button"
                className={`tour-dot${i < step ? ' done' : ''}${i === step ? ' on' : ''}`}
                aria-label={`Step ${i + 1}: ${title}`}
                aria-current={i === step ? 'step' : undefined}
                onClick={() => setStep(i)}
              >
                {i < step ? '✓' : i + 1}
              </button>
              {i < count - 1 && <i className={`tour-bar${i < step ? ' done' : ''}`} aria-hidden="true" />}
            </Fragment>
          ))}
        </div>
        <div className="tour-card" aria-live="polite">
          <span>
            STEP 0{step + 1} OF 0{count} · {item.name.toUpperCase()}
          </span>
          <h4>{item.steps[step][0]}</h4>
          <p>{item.steps[step][1]}</p>
        </div>
        <div className="tour-nav">
          <span>
            Step {step + 1} of {count}
          </span>
          <div>
            <button type="button" className="tour-btn" disabled={step === 0} onClick={() => go(-1)}>
              Back
            </button>
            <button type="button" className="tour-btn pri" onClick={() => go(1)}>
              {last
                ? lastFeature
                  ? 'Start over'
                  : `Next: ${TOUR_FEATURES[TOUR_KEYS[fi + 1]].name}`
                : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Tour() {
  return (
    <section className="wrap sec" id="tour">
      <SectionHead
        title={
          <>
            Choose a task.
            <br />
            See <em>how it works.</em>
          </>
        }
        lede="Select an area of DockBit. The steps below show what you actually do, from the first click to the finished result."
      />
      <TourWidget />
    </section>
  )
}
