import { useEffect, useRef, useState } from 'react'
import { reelRotation, tapeLabel, tapeMeta } from '../lib/restoreTape'

export default function Backups() {
  const [v, setV] = useState(23)
  const [btn, setBtn] = useState('Test restore')
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => () => clearTimeout(timer.current), [])

  const restore = () => {
    setBtn('Restoring…')
    timer.current = setTimeout(() => setBtn('Verified ✓'), 900)
  }

  return (
    <section className="band-lt sec" id="data">
      <div className="wrap">
        <div className="strata-grid">
          <div>
            <div className="eyebrow">04 · Storage & backups</div>
            <h2 className="h2">
              Know which layer your data lives on, and <em>how to get it back.</em>
            </h2>
            <p className="lede">
              Every backup by project, coverage gaps flagged, failing jobs explained. Restore in one
              click, or run a test restore first.
            </p>
          </div>
          <div>
            <div className="ground-app">
              <span>storefront</span>
              <span>postgres</span>
            </div>
            <div className="layer l1">
              <div>
                <b>Volumes</b>
                <small>folders that survive redeploys</small>
              </div>
              <span>82 GB</span>
            </div>
            <div className="layer l2">
              <div>
                <b>NAS &amp; ZFS</b>
                <small>Synology, QNAP, snapshots</small>
              </div>
              <span>hourly</span>
            </div>
            <div className="layer l3">
              <div>
                <b>Object storage</b>
                <small>S3 · R2 · MinIO</small>
              </div>
              <span>nightly · 30 days kept</span>
            </div>
            <div className="layer l4">
              <div>
                <b>Restore</b>
                <small>pick a point, test it, bring it back</small>
              </div>
              <span>one click</span>
            </div>
          </div>
        </div>
        <div className="tape">
          <i className="reel" style={{ transform: `rotate(${reelRotation(v)}deg)` }}></i>
          <div className="tape-mid">
            <div className="tape-out">
              <span>
                Restore point · <b>{tapeLabel(v)}</b>
              </span>
              <span>{tapeMeta(v)}</span>
            </div>
            <input
              type="range"
              min={0}
              max={23}
              value={v}
              onChange={(e) => setV(Number(e.target.value))}
              aria-label="Choose a snapshot to restore"
            />
          </div>
          <i className="reel" style={{ transform: `rotate(${-reelRotation(v)}deg)` }}></i>
          <button className="restore" type="button" onClick={restore}>
            {btn}
          </button>
        </div>
      </div>
    </section>
  )
}
