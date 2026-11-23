const ARC = 'M84 44 A28 28 0 0 0 36 38'

export default function BackupsViz() {
  return (
    <svg viewBox="0 0 120 120" className="vz">
      <circle className="a pop halo" style={{ ['--d' as string]: '0s' }} cx="60" cy="55" r="46" />
      {/* cylinder body fill + edges */}
      <path className="a show f-s2" style={{ ['--d' as string]: '.1s' }} d="M25 32 A21 7 0 0 0 67 32 V66 A21 7 0 0 1 25 66 Z" />
      <ellipse className="a draw ln f-soft" style={{ ['--d' as string]: '.05s', ['--len' as string]: 106 }} cx="46" cy="32" rx="21" ry="7" />
      <path className="a draw ln" style={{ ['--d' as string]: '.2s', ['--len' as string]: 34 }} d="M25 32 V66" fill="none" />
      <path className="a draw ln" style={{ ['--d' as string]: '.3s', ['--len' as string]: 34 }} d="M67 32 V66" fill="none" />
      <ellipse className="a draw ln-d" style={{ ['--d' as string]: '.45s', ['--len' as string]: 106 }} cx="46" cy="49" rx="21" ry="7" />
      <ellipse className="a draw ln-d" style={{ ['--d' as string]: '.6s', ['--len' as string]: 106 }} cx="46" cy="66" rx="21" ry="7" />
      {/* restore arc — data keeps flowing back in */}
      <path className="a draw ln-b" style={{ ['--d' as string]: '.8s', ['--len' as string]: 92 }} d={ARC} fill="none" />
      <g className="a show" style={{ ['--d' as string]: '1.05s' }}>
        <path className="amb-flow ln-b" d={ARC} fill="none" />
      </g>
      <path className="a draw ln-b" style={{ ['--d' as string]: '1.05s', ['--len' as string]: 24 }} d="M36 38 l11 -4 M36 38 l4 11" fill="none" />
      {/* snapshot marker orbiting the stack */}
      <g className="a show" style={{ ['--d' as string]: '1.15s' }}>
        <g className="amb-spin" style={{ transformOrigin: '46px 49px' }}>
          <circle cx="46" cy="21" r="3" fill="var(--bit)" />
        </g>
      </g>
      <path className="a draw ln-d" style={{ ['--d' as string]: '1.15s', ['--len' as string]: 66 }} d="M22 92 H88" fill="none" />
      <text className="a show cap" style={{ ['--d' as string]: '1.25s' }} x="60" y="112" textAnchor="middle">
        backup
      </text>
    </svg>
  )
}
