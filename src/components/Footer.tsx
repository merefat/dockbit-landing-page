import { Link } from 'react-router-dom'
import { COPYRIGHT, FOOTER_LINKS, TAGLINE } from '../data/site'

export default function Footer() {
  return (
    <footer className="wrap footer">
      <div className="footer-brand">
        <Link className="logo" to="/">
          <img className="dockbit-logo" src="/logo.png" alt="" />
          DockBit
        </Link>
        <span>{TAGLINE}</span>
      </div>
      <div className="footer-links">
        {FOOTER_LINKS.map((l) => (
          <Link key={l.to} to={l.to}>
            {l.label}
          </Link>
        ))}
      </div>
      <span className="footer-copy">{COPYRIGHT}</span>
    </footer>
  )
}
