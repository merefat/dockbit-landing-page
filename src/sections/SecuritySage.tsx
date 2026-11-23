import { useState } from 'react'
import SectionHead from '../components/SectionHead'

const RINGS = [
  { r: 0, label: 'audit' },
  { r: 1, label: 'people' },
  { r: 2, label: 'sign-in' },
  { r: 3, label: 'keys' },
]

const RING_ITEMS = [
  { r: 1, title: 'People', desc: 'Invite by email, give each a role' },
  { r: 2, title: 'Sign-in', desc: 'Passkeys, TOTP, trusted devices' },
  { r: 3, title: 'Keys', desc: 'API keys, SSH keys, signed webhooks' },
  { r: 0, title: 'Audit', desc: 'Who changed what, and when' },
]

export function RingsPanel() {
  const [lit, setLit] = useState<number | null>(null)
  return (
    <div className="panel">
      <h3>Who can touch what</h3>
      <p className="sub">Hover a ring to see what it covers.</p>
      <div className="ringbox">
        <div className="rings">
          {RINGS.map(({ r, label }) => (
            <div key={r} className={`ring r${r}${lit === r ? ' lit' : ''}`}>
              <span>{label}</span>
            </div>
          ))}
          <div className="core">secrets</div>
        </div>
        <ul className="ring-list">
          {RING_ITEMS.map(({ r, title, desc }) => (
            <li
              key={r}
              tabIndex={0}
              onMouseEnter={() => setLit(r)}
              onMouseLeave={() => setLit(null)}
              onFocus={() => setLit(r)}
              onBlur={() => setLit(null)}
            >
              <b>{title}</b>
              {desc}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function SagePanel() {
  const [gate, setGate] = useState<'idle' | 'approved' | 'declined'>('idle')
  return (
    <div className="panel">
      <h3>
        Sage reads the room. You hold <span style={{ color: 'var(--brand)' }}>the key.</span>
      </h3>
      <p className="sub">Built-in AI that reads your platform and proposes fixes.</p>
      <div className="msgs">
        <div className="msg you">
          <div className="who">you</div>Why did storefront's deploy fail?
        </div>
        <div className="msg sage">
          <div className="who">sage</div>The health check timed out. Postgres hit its memory limit
          after last night's import. Raise it?
          <div className="diff">
            <span className="m"> postgres.memory: 2G</span>
            {'\n'}
            <span className="p">+ postgres.memory: 4G</span>
          </div>
        </div>
      </div>
      <div className={`gate${gate !== 'idle' ? ' approved' : ''}`}>
        <span className="pol">
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="4" y="11" width="16" height="10" rx="2" />
            <path d="M8 11V7a4 4 0 0 1 8 0v4" />
          </svg>
          needs your approval
        </span>
        <div className="btns">
          <button type="button" onClick={() => setGate('declined')}>
            Decline
          </button>
          <button type="button" className="yes" onClick={() => setGate('approved')}>
            Approve
          </button>
        </div>
        <span className="done">
          <i className="led on"></i>
          <span>{gate === 'declined' ? 'Declined · nothing changed' : 'Applied · redeployed · logged'}</span>
        </span>
      </div>
    </div>
  )
}

export default function SecuritySage() {
  return (
    <section className="wrap sec" id="security">
      <SectionHead
        eyebrow="05 · Security & Sage"
        title={
          <>
            Access works in rings.
            <br />
            <em>Every ring</em> writes to the log.
          </>
        }
        lede="Standalone sign-in with no outside provider, secrets encrypted with AES-256-GCM, and an assistant that proposes changes but waits for your yes."
      />
      <div className="guard">
        <RingsPanel />
        <SagePanel />
      </div>
    </section>
  )
}
