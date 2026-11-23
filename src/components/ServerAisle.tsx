interface Cab {
  x: number
  w: number
  top: number
  bot: number
  name?: string
  src?: string
  on?: boolean
  empty?: boolean
  seed?: number
}

/* Row of cabinets receding to the right, like the reference photo */
const CABS: Cab[] = [
  { x: 20, w: 182, top: 44, bot: 452, name: 'storefront', src: 'git push', on: true, seed: 11 },
  { x: 202, w: 96, top: 74, bot: 428, name: 'postgres', src: 'marketplace', on: true, seed: 23 },
  { x: 298, w: 78, top: 98, bot: 404, name: 'immich', src: 'compose', on: true, seed: 37 },
  { x: 376, w: 64, top: 116, bot: 386, name: 'plausible', src: 'stopped', on: false, seed: 41 },
  { x: 440, w: 52, top: 130, bot: 370, name: 'vaultwarden', src: 'marketplace', on: true, seed: 53 },
  { x: 492, w: 44, top: 142, bot: 358, empty: true },
  { x: 536, w: 38, top: 150, bot: 348 },
  { x: 574, w: 26, top: 156, bot: 340 },
]

function seedRand(seed: number) {
  let s = seed
  return () => (s = (s * 1103515245 + 12345) % 2147483648) / 2147483648
}

function door(cab: Cab) {
  const pad = Math.max(4, cab.w * 0.055)
  return { x: cab.x + pad, w: cab.w - 2 * pad, y: cab.top + 10, bot: cab.bot - 13 }
}

/* Lit LEDs aligned to the 9px <pattern> grid so they sit on top of the dim dots */
function litDots(cab: Cab) {
  const d = door(cab)
  const rand = seedRand(cab.seed ?? 7)
  const prob = (cab.on === false ? 0.045 : 0.12) * Math.min(1, cab.w / 70)
  const dots: { x: number; y: number; d: number }[] = []
  for (let c = Math.ceil((d.x - 1.4) / 9); c <= Math.floor((d.x + d.w - 1.4) / 9); c++)
    for (let r = Math.ceil((d.y - 1.4) / 9); r <= Math.floor((d.bot - 1.4) / 9); r++)
      if (rand() < prob) dots.push({ x: 1.4 + 9 * c, y: 1.4 + 9 * r, d: (c * 31 + r) % 3 })
  return dots
}

function unitLines(cab: Cab) {
  const d = door(cab)
  const lines: number[] = []
  for (let y = d.y + 34; y < d.bot - 6; y += 42) lines.push(y)
  return lines
}

export default function ServerAisle() {
  return (
    <div
      className="aisle dk"
      role="img"
      aria-label="Illustration of a data-center aisle of server cabinets running DockBit apps"
    >
      <svg viewBox="0 0 600 500" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="aBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1a212b" />
            <stop offset=".5" stopColor="#13181f" />
            <stop offset="1" stopColor="#0d1117" />
          </linearGradient>
          <linearGradient id="aGlass" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#10151c" />
            <stop offset="1" stopColor="#080b10" />
          </linearGradient>
          <linearGradient id="aFloor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#121a22" />
            <stop offset="1" stopColor="#05070a" />
          </linearGradient>
          <linearGradient id="aSheen" x1="0" y1="0" x2=".6" y2="1">
            <stop offset="0" stopColor="#a8dcec" stopOpacity=".09" />
            <stop offset=".55" stopColor="#a8dcec" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="aGlow" cx=".42" cy=".38" r=".75">
            <stop offset="0" stopColor="#20bbd2" stopOpacity=".13" />
            <stop offset=".6" stopColor="#20bbd2" stopOpacity=".04" />
            <stop offset="1" stopColor="#20bbd2" stopOpacity="0" />
          </radialGradient>
          <pattern id="aDots" width="9" height="9" patternUnits="userSpaceOnUse">
            <circle cx="1.4" cy="1.4" r="1.05" fill="#3a4450" />
          </pattern>
        </defs>

        {/* room */}
        <rect width="600" height="500" fill="#0b0e13" />
        <rect width="600" height="500" fill="url(#aGlow)" />
        {/* floor — top edge follows the cabinet bottoms */}
        <polygon points="0,470 20,452 600,340 600,500 0,500" fill="url(#aFloor)" />
        <polygon points="60,486 560,398 560,404 60,494" fill="#cfe9f0" opacity=".05" />
        <polygon points="150,470 600,368 600,372 150,478" fill="#cfe9f0" opacity=".04" />
        <ellipse cx="280" cy="458" rx="270" ry="26" fill="#20bbd2" opacity=".05" />
        {/* ceiling light panels */}
        <polygon points="36,4 168,28 138,42 8,16" fill="#dfeef4" opacity=".13" />
        <polygon points="210,36 300,52 282,62 192,46" fill="#dfeef4" opacity=".08" />
        {/* overhead cable tray */}
        <polygon points="0,10 600,96 600,78 0,-8" fill="#141a21" stroke="#262e39" strokeWidth="1" />
        <polygon points="0,10 600,96 600,90 0,4" fill="#0d1117" />
        {[70, 230, 392, 512, 582].map((x, i) => (
          <rect key={i} x={x - 4} y={4 + x * 0.1433} width="9" height="6" fill="#f39c12" opacity=".85" />
        ))}
        {[60, 300, 540].map((x) => (
          <rect key={x} x={x} y={6 + x * 0.1433} width="2" height="26" fill="#1d242e" />
        ))}

        {/* near cabinet left side face */}
        <polygon points="4,62 20,44 20,452 4,436" fill="#0c1016" stroke="#1d242e" strokeWidth="1" />

        {CABS.map((cab, i) => {
          const d = door(cab)
          const fs = Math.max(7.5, Math.min(13, cab.w * 0.15))
          const fit = (t: string, size: number) =>
            t.length * size * 0.6 > d.w - 8 ? d.w - 8 : undefined
          return (
            <g key={i}>
              <rect
                x={cab.x}
                y={cab.top}
                width={cab.w}
                height={cab.bot - cab.top}
                fill={cab.empty ? '#0a0d11' : 'url(#aBody)'}
                stroke={cab.empty ? '#3a444e' : '#242c36'}
                strokeWidth="1"
                strokeDasharray={cab.empty ? '4 4' : undefined}
              />
              {!cab.empty && (
                <>
                  <rect x={d.x} y={d.y} width={d.w} height={d.bot - d.y} fill="url(#aGlass)" />
                  <rect x={d.x} y={d.y} width={d.w} height={d.bot - d.y} fill="url(#aDots)" opacity=".85" />
                  {unitLines(cab).map((y) => (
                    <rect key={y} x={d.x} y={y} width={d.w} height="1" fill="#000" opacity=".28" />
                  ))}
                  {litDots(cab).map((p, j) => (
                    <circle
                      key={j}
                      cx={p.x}
                      cy={p.y}
                      r="1.35"
                      className={`lit${cab.on === false ? ' warn' : ''}${p.d ? ` d${p.d}` : ''}`}
                    />
                  ))}
                  <polygon
                    points={`${d.x},${d.y} ${d.x + d.w * 0.55},${d.y} ${d.x + d.w * 0.3},${d.bot} ${d.x},${d.bot}`}
                    fill="url(#aSheen)"
                  />
                  {cab.w >= 40 && (
                    <rect x={d.x + d.w - 5.4} y={(cab.top + cab.bot) / 2 - 13} width="3.4" height="26" rx="1.7" fill="#05070a" />
                  )}
                  <rect x={cab.x} y={cab.bot - 12} width={cab.w} height="12" fill="#0a0d12" />
                  <rect x={cab.x} y={cab.bot - 12} width={cab.w} height="1" fill="#1d242e" />
                </>
              )}
              {cab.name && (
                <>
                  <rect x={d.x + 7} y={cab.top + 17} width={Math.min(26, d.w * 0.32)} height="5.6" rx="1.7" fill="#e8f0f3" opacity=".92" />
                  <circle
                    cx={d.x + d.w - 9}
                    cy={cab.top + 19.8}
                    r="3"
                    fill={cab.on ? '#20bbd2' : '#f39c12'}
                    opacity={cab.on ? 1 : 0.85}
                  />
                  <text x={d.x + 7} y={cab.top + 17 + 24} fontSize={fs} textLength={fit(cab.name, fs)} lengthAdjust="spacingAndGlyphs" fill="#d7dee4" style={{ fontFamily: 'var(--mono)' }}>
                    {cab.name}
                  </text>
                  <text x={d.x + 7} y={cab.top + 17 + 24 + fs * 0.95 + 4} fontSize={fs * 0.74} textLength={fit(cab.src!, fs * 0.74)} lengthAdjust="spacingAndGlyphs" fill="#7c8894" style={{ fontFamily: 'var(--mono)' }}>
                    {cab.src}
                  </text>
                </>
              )}
              {cab.empty && (
                <>
                  <rect x={d.x} y={d.y} width={d.w} height={d.bot - d.y} fill="#0a0d11" opacity=".6" />
                  {['+ room', 'for the', 'next one'].map((t, k) => (
                    <text
                      key={k}
                      x={cab.x + cab.w / 2}
                      y={(cab.top + cab.bot) / 2 - 12 + k * 10}
                      textAnchor="middle"
                      fontSize="7.2"
                      fill="#5f6d77"
                      style={{ fontFamily: 'var(--mono)' }}
                    >
                      {t}
                    </text>
                  ))}
                </>
              )}
            </g>
          )
        })}
      </svg>
    </div>
  )
}
