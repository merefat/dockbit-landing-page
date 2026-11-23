import { useState } from 'react'
import { APP_STORE_URL, PLAY_STORE_URL } from '../data/site'

interface BadgeProps {
  href: string
  img: string
  small: string
  big: string
}

function Badge({ href, img, small, big }: BadgeProps) {
  const [failed, setFailed] = useState(false)
  const pill = (
    <span className="fb">
      <small>{small}</small>
      <b>{big}</b>
    </span>
  )
  if (!href) {
    return <span className="badge fallback soon">{pill}</span>
  }
  return (
    <a
      className={`badge${failed ? ' fallback' : ''}`}
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      <img
        src={img}
        alt={`${small} ${big}`}
        onError={() => setFailed(true)}
      />
      {pill}
    </a>
  )
}

export default function StoreBadges() {
  return (
    <div className="stores">
      <Badge
        href={APP_STORE_URL}
        img="/badges/app-store.svg"
        small="Download on the"
        big="App Store"
      />
      <Badge
        href={PLAY_STORE_URL}
        img="/badges/google-play.svg"
        small="GET IT ON"
        big="Google Play"
      />
    </div>
  )
}
