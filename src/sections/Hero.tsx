import CopyInstall from '../components/CopyInstall'
import ServerAisle from '../components/ServerAisle'
import StoreBadges from '../components/StoreBadges'

export default function Hero() {
  return (
    <section className="wrap hero">
      <div>
        <div className="eyebrow">Your own infrastructure. One control panel.</div>
        <h1>
          Your servers.
          <br />
          Your apps.
          <br />
          <em>One place</em> to run them.
        </h1>
        <p>
          Deploy apps, run databases, manage domains and protect your data on servers you control.
          DockBit brings the day-to-day work of self-hosting into one place.
        </p>
        <CopyInstall />
        <StoreBadges />
      </div>
      <div className="rack-wrap">
        <ServerAisle />
        <div className="hang">
          <b>14 apps</b>on 3 machines
          <br />
          in one closet
        </div>
      </div>
    </section>
  )
}
