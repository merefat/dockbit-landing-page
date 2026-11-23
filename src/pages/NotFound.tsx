import { Link } from 'react-router-dom'
import Seo from '../components/Seo'

export default function NotFound() {
  return (
    <section className="wrap sec nf">
      <Seo path="404" />
      <div className="eyebrow">404</div>
      <h2 className="h2">
        This slot is <em>empty.</em>
      </h2>
      <p className="lede">That page isn't in the rack.</p>
      <div className="row-btns">
        <Link className="btn primary" to="/">
          Back home
        </Link>
        <Link className="btn" to="/tour">
          Product tour
        </Link>
      </div>
    </section>
  )
}
