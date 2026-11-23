import SectionHead from '../components/SectionHead'

const TICKS = Array.from({ length: 90 }, (_, i) => ({
  inc: i === 57,
  height: i === 57 ? 100 : 65 + Math.round(Math.abs(Math.sin(i * 1.7)) * 35),
}))

export default function Domains() {
  return (
    <section className="wrap sec" id="domains">
      <SectionHead
        eyebrow="Public access"
        title={
          <>
            Every part of a URL has a job.
            <br />
            DockBit does <em>each one.</em>
          </>
        }
        lede="Type a hostname, pick the app. The DNS record and a free SSL certificate happen on their own, with no router setup if you use a tunnel."
      />
      <div className="url-big" aria-label="https://store.example.com/health">
        <span className="seg a">
          <sup>1</sup>https://
        </span>
        <span className="seg">
          <sup>2</sup>store
        </span>
        <span className="seg dim">.</span>
        <span className="seg">
          <sup>3</sup>example.com
        </span>
        <span className="seg">
          <sup>4</sup>/health
        </span>
      </div>
      <div className="callouts">
        <div className="call">
          <span className="n">1 · SSL</span>
          <h4>Free, auto-renewing</h4>
          <p>Let's Encrypt on attach, with TLS-expiry warnings.</p>
        </div>
        <div className="call">
          <span className="n">2 · Routing</span>
          <h4>Proxy or tunnel</h4>
          <p>Reverse proxy, or a Cloudflare Tunnel with no open ports.</p>
        </div>
        <div className="call">
          <span className="n">3 · DNS</span>
          <h4>Records handled</h4>
          <p>Cloudflare and Hostinger zones, plus client-owned domains.</p>
        </div>
        <div className="call">
          <span className="n">4 · Uptime</span>
          <h4>You define healthy</h4>
          <p>HTTP, keyword, TCP, ping or DNS checks and public status pages.</p>
        </div>
      </div>
      <div className="uptime">
        <div className="row">
          <span>
            <b>store.example.com</b> · 90 days
          </span>
          <span>
            1 incident, acknowledged · <b>99.98%</b>
          </span>
        </div>
        <div className="ticks">
          {TICKS.map((t, i) => (
            <i key={i} className={t.inc ? 'inc' : ''} style={{ height: `${t.height}%` }}></i>
          ))}
        </div>
        <div className="row">
          <span>Aug 10</span>
          <span>today</span>
        </div>
      </div>
    </section>
  )
}
