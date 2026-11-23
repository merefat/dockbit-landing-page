import type { ReactNode } from 'react'

interface Props {
  eyebrow?: string
  title: ReactNode
  lede?: string
}

export default function SectionHead({ eyebrow, title, lede }: Props) {
  return (
    <div className="head">
      <div>
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <h2 className="h2">{title}</h2>
      </div>
      {lede && <p className="lede">{lede}</p>}
    </div>
  )
}
