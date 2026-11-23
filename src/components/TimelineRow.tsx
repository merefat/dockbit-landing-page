import type { ComponentType } from 'react'
import { Link } from 'react-router-dom'
import { useInView } from '../lib/useInView'

export interface CardInfo {
  n: string
  to: string
  h: string
  p: string
  viz: ComponentType
}

export default function TimelineRow({ n, to, h, p, viz: Viz }: CardInfo) {
  const { ref, inView } = useInView<HTMLDivElement>()
  const [num, label] = n.split(' · ')

  return (
    <div ref={ref} className={`mrow${inView ? ' in' : ''}`}>
      <Link className="mbub" to={to} tabIndex={-1} aria-hidden="true">
        <Viz />
      </Link>
      <span className="mnode" aria-hidden="true" />
      <Link className="mtext" to={to}>
        <span className="mbig">{num}.</span>
        <span className="mlab">{label}</span>
        <h3>{h}</h3>
        <p>{p}</p>
        <span className="go">open →</span>
      </Link>
    </div>
  )
}
