import SectionHead from '../components/SectionHead'

const PORTS = [
  { cls: 'rj', b: 'VMs', s: 'Incus VMs and system containers' },
  { cls: 'usb', b: 'Workspaces', s: 'Dev environments cloned from a repo' },
  { cls: 'hd', b: 'Releases', s: '.deb, OS images, notarized Mac builds' },
  { cls: 'rd', b: 'Failover', s: 'Network groups and volume replication' },
  { cls: 'rj', b: 'API & CLI', s: 'Every UI action, scriptable' },
  { cls: 'usb', b: 'Takeover', s: 'Adopt running Compose and tunnels' },
  { cls: 'hd', b: 'Self-update', s: 'One-click update and rollback' },
  { cls: 'rd', b: 'Move DockBit', s: 'Migrate the platform to new hardware' },
]

export default function Beyond() {
  return (
    <section className="wrap sec" style={{ paddingTop: 0 }}>
      <SectionHead
        eyebrow="09 · Beyond the basics"
        title={
          <>
            Turn it around.
            <br />
            There's more <em>on the back.</em>
          </>
        }
        lede="Advanced tools that stay out of the way until your setup grows into them."
      />
      <div className="backpanel dk">
        <div>
          <div className="fan" aria-hidden="true"></div>
          <div className="fan-label">rear i/o</div>
        </div>
        <div className="portgrid">
          {PORTS.map((p) => (
            <div className={`pt ${p.cls}`} key={p.b}>
              <div className="hole"></div>
              <b>{p.b}</b>
              <span>{p.s}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
