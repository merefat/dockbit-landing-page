import { Link } from 'react-router-dom'
import { useInView } from '../lib/useInView'
import type { CardInfo } from './TimelineRow'

export default function TourCap({ n, to, h, p, viz: Viz }: CardInfo) {
  const { ref, inView } = useInView<HTMLAnchorElement>()
  const [, label] = n.split(' · ')

  return (
    <Link ref={ref} className={`tcap dk${inView ? ' in' : ''}`} to={to}>
      <div className="tviz" aria-hidden="true">
        <Viz />
      </div>
      <div className="ttext">
        <span className="mlab">{label}</span>
        <h3>{h}</h3>
        <p>{p}</p>
      </div>
      <span className="go">open →</span>
    </Link>
  )
}
