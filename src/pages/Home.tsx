import Seo from '../components/Seo'
import SectionHead from '../components/SectionHead'
import TimelineRow from '../components/TimelineRow'
import TourCap from '../components/TourCap'
import DeployViz from '../components/viz/DeployViz'
import MachinesViz from '../components/viz/MachinesViz'
import DomainsViz from '../components/viz/DomainsViz'
import BackupsViz from '../components/viz/BackupsViz'
import SecurityViz from '../components/viz/SecurityViz'
import MobileViz from '../components/viz/MobileViz'
import TourViz from '../components/viz/TourViz'
import Hero from '../sections/Hero'
import Problem from '../sections/Problem'
import MobileApp from '../sections/MobileApp'
import StartStairs from '../sections/StartStairs'
import FinalCta from '../sections/FinalCta'

// Each card reuses that section's own eyebrow, heading and lede verbatim.
const CARDS = [
  {
    n: '01 · Deploy',
    to: '/deploy',
    h: 'Plug in a source. Get a running service.',
    p: "Push to Git and it's live in about 30 seconds. The new version must pass its health check before the old one stops, and failed rollouts roll themselves back.",
    viz: DeployViz,
  },
  {
    n: '02 · Machines & network',
    to: '/machines',
    h: 'Three boxes in a closet, run like one platform.',
    p: 'Run one bootstrap script and a server joins. Several machines act as one Swarm cluster with live CPU, memory and disk, placement rules and an SSH terminal in the browser.',
    viz: MachinesViz,
  },
  {
    n: '03 · Public access',
    to: '/domains',
    h: 'Every part of a URL has a job. DockBit does each one.',
    p: 'Type a hostname, pick the app. The DNS record and a free SSL certificate happen on their own, with no router setup if you use a tunnel.',
    viz: DomainsViz,
  },
  {
    n: '04 · Storage & backups',
    to: '/backups',
    h: 'Know which layer your data lives on, and how to get it back.',
    p: 'Every backup by project, coverage gaps flagged, failing jobs explained. Restore in one click, or run a test restore first.',
    viz: BackupsViz,
  },
  {
    n: '05 · Security & Sage',
    to: '/security',
    h: 'Access works in rings. Every ring writes to the log.',
    p: 'Standalone sign-in with no outside provider, secrets encrypted with AES-256-GCM, and an assistant that proposes changes but waits for your yes.',
    viz: SecurityViz,
  },
  {
    n: '06 · DockBit mobile',
    to: '/mobile',
    h: 'Your infrastructure. Within reach.',
    p: 'A quick view of your servers when you are away from your desk. Check what is healthy, catch an alert and take action without opening a laptop.',
    viz: MobileViz,
  },
  {
    n: '07 · Product tour',
    to: '/tour',
    h: 'Choose a task. See how it works.',
    p: 'Select an area of DockBit. The steps below show what you actually do, from the first click to the finished result.',
    viz: TourViz,
  },
]

export default function Home() {
  return (
    <>
      <Seo path="/" />
      <Hero />
      <Problem />
      <section className="wrap sec" style={{ paddingTop: 0 }}>
        <SectionHead
          eyebrow="The whole model"
          title={
            <>
              Machines, projects, apps and domains.
              <br />
              <em>One page</em> for each part.
            </>
          }
        />
        <div className="mline">
          {CARDS.slice(0, 6).map((c) => (
            <TimelineRow key={c.to} {...c} />
          ))}
        </div>
        <div className="mend">
          <i className="endot" aria-hidden="true" />
          <TourCap {...CARDS[6]} />
        </div>
      </section>
      <MobileApp />
      <StartStairs />
      <FinalCta />
    </>
  )
}
