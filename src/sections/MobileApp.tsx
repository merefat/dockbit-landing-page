import StoreBadges from '../components/StoreBadges'

export default function MobileApp() {
  return (
    <section className="band-lt sec" id="mobile">
      <div className="wrap mobile">
        <div className="mobile-copy">
          <h2 className="h2">
            Your infrastructure.
            <br />
            <em>Within reach.</em>
          </h2>
          <p className="lede">
            A quick view of your servers when you are away from your desk. Check what is healthy,
            catch an alert and take action without opening a laptop.
          </p>
          <div className="mobile-actions">
            <div>
              <b>01</b>
              <span>Check service and machine status</span>
            </div>
            <div>
              <b>02</b>
              <span>See alerts as they happen</span>
            </div>
            <div>
              <b>03</b>
              <span>Restart a service or roll back a release</span>
            </div>
          </div>
          <StoreBadges />
        </div>
        <div className="phone-stage" aria-label="DockBit mobile app preview">
          <div className="mobile-backdrop"></div>
          <div className="phone dk">
            <div className="screen">
              <div className="app-top">
                <span className="app-logo">
                  <i></i>
                </span>
                <b>DockBit</b>
                <span className="app-avatar">F</span>
              </div>
              <div className="app-greeting">
                <small>OVERVIEW</small>
                <h3>Good morning</h3>
                <p>All systems are looking good.</p>
              </div>
              <div className="app-health">
                <div>
                  <span className="health-dot"></span>
                  <b>All systems operational</b>
                </div>
                <small>3 machines · 12 services</small>
              </div>
              <div className="app-section-label">
                YOUR MACHINES <span>View all</span>
              </div>
              <div className="machine-card">
                <div className="machine-icon">S</div>
                <div>
                  <b>Production</b>
                  <small>Online · 6 services</small>
                </div>
                <span className="machine-state">Online</span>
              </div>
              <div className="machine-card">
                <div className="machine-icon alt">W</div>
                <div>
                  <b>Web node</b>
                  <small>Online · 4 services</small>
                </div>
                <span className="machine-state">Online</span>
              </div>
              <div className="app-section-label">RECENT ACTIVITY</div>
              <div className="app-activity">
                <i></i>
                <div>
                  <b>Deployment completed</b>
                  <small>storefront · just now</small>
                </div>
              </div>
              <div className="app-nav">
                <span className="selected">
                  ⌂<small>Home</small>
                </span>
                <span>
                  ▦<small>Apps</small>
                </span>
                <span>
                  ◉<small>Alerts</small>
                </span>
                <span>
                  ⚙<small>Settings</small>
                </span>
              </div>
            </div>
          </div>
          <div className="mobile-float float-alert">
            <span className="float-icon">!</span>
            <div>
              <b>Service alert</b>
              <small>API response time is high</small>
            </div>
            <i></i>
          </div>
          <div className="mobile-float float-release">
            <span className="float-check">✓</span>
            <div>
              <b>Release is live</b>
              <small>Health check passed</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
