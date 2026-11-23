import { Link } from 'react-router-dom'
import StoreBadges from '../components/StoreBadges'

export default function FinalCta() {
  return (
    <section className="wrap">
      <div className="faceplate">
        <div>
          <h2>
            Start with <em>one</em> machine.
          </h2>
          <p>Install DockBit on a server you control. Add your first app and manage it from one place.</p>
          <div className="row">
            <Link className="btn primary" to="/get-started">
              Get started
            </Link>
            <StoreBadges />
          </div>
        </div>
        <Link className="power" to="/get-started" aria-label="Install DockBit">
          <svg
            width="38"
            height="38"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#20BBD2"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M12 3v9" />
            <path d="M6.3 6.8a8 8 0 1 0 11.4 0" />
          </svg>
          <span>power on</span>
        </Link>
      </div>
    </section>
  )
}
