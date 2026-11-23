import ChaosTerm from '../components/ChaosTerm'
import SectionHead from '../components/SectionHead'

export default function Problem() {
  return (
    <section className="wrap sec" style={{ paddingTop: 20 }}>
      <SectionHead
        title={
          <>
            Self-hosting is easy.
            <br />
            Running it next month <em>isn't.</em>
          </>
        }
        lede="The first deploy takes an afternoon. Then come the certificates, the backups, the second machine and the friend who needs access. DockBit puts all of it on one page."
      />
      <div className="model">
        <div className="chaos-side">
          <ChaosTerm />
        </div>
        <div className="calm dk">
          <div className="top">
            <span>dockbit · the whole model</span>
            <span>after</span>
          </div>
          <div className="flow">
            <div>
              Machines<small>your servers</small>
            </div>
            <div>
              Projects<small>one per client</small>
            </div>
            <div>
              Apps<small>site, API, DB</small>
            </div>
            <div>
              Domains<small>the addresses</small>
            </div>
          </div>
          <ul>
            <li>
              SSL certificate<span>auto-renews</span>
            </li>
            <li>
              Nightly backup<span>gaps flagged</span>
            </li>
            <li>
              Deploy on push<span className="ok">live in ~30s</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
