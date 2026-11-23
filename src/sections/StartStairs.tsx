import SectionHead from '../components/SectionHead'

const STAIRS = [
  { n: '01', h: 'Install', p: 'One command, then open port 3000.', code: '~5 min' },
  { n: '02', h: 'Project', p: 'One per client or product.', code: 'acme' },
  { n: '03', h: 'App', p: 'Git, image, database or Marketplace.', code: 'v1 live' },
  { n: '04', h: 'Domain', p: 'DNS and HTTPS happen automatically.', code: 'store.acme.com' },
  { n: '05', h: 'Safety nets', p: 'Uptime monitor, alerts, backup schedule.', code: 'Slack · Telegram' },
]

export function Stairs() {
  return (
    <div className="stairs">
      {STAIRS.map((s, i) => (
        <div className="stair" style={{ ['--i' as string]: i }} key={s.n}>
          <span className="n">{s.n}</span>
          <h4>{s.h}</h4>
          <p>{s.p}</p>
          <code>{s.code}</code>
        </div>
      ))}
      <div className="stair dk" style={{ ['--i' as string]: 5 }}>
        <span className="n">06 · top</span>
        <h4>Operate</h4>
        <p>Every push deploys. Rollback is one click.</p>
        <code>you're in production</code>
      </div>
    </div>
  )
}

export default function StartStairs() {
  return (
    <section className="wrap sec" id="start" style={{ paddingTop: 0 }}>
      <SectionHead
        title={
          <>
            Six steps from blank server
            <br />
            to <em>production.</em>
          </>
        }
        lede="The first install takes about five minutes, and the first user becomes the owner. Each step unlocks the next."
      />
      <Stairs />
    </section>
  )
}
