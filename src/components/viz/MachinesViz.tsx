const NODES = [
  { x: 14, y: 36, load: 0.72, hot: false },
  { x: 80, y: 36, load: 0.38, hot: true },
  { x: 47, y: 78, load: 0.55, hot: false },
]

const LINKS = ['M40 46 H80', 'M34 56 L54 78', 'M86 56 L66 78']

export default function MachinesViz() {
  return (
    <svg viewBox="0 0 120 120" className="vz">
      <circle className="a pop halo" style={{ ['--d' as string]: '0s' }} cx="60" cy="56" r="46" />
      {/* swarm links */}
      {LINKS.map((d, i) => (
        <path key={i} className="a draw ln-d" style={{ ['--d' as string]: `${0.15 + i * 0.1}s`, ['--len' as string]: 42 }} d={d} fill="none" />
      ))}
      {/* cluster traffic */}
      <g className="a show" style={{ ['--d' as string]: '.7s' }}>
        {LINKS.map((d, i) => (
          <path key={i} className="amb-flow ln-b" style={{ ['--d' as string]: `${i * 0.5}s` }} d={d} fill="none" />
        ))}
      </g>
      {NODES.map((n, i) => (
        <g key={i}>
          <rect className="a up ln f-s2" style={{ ['--d' as string]: `${0.4 + i * 0.12}s` }} x={n.x} y={n.y} width="26" height="20" rx="3" />
          <g className="a show" style={{ ['--d' as string]: `${0.6 + i * 0.12}s` }}>
            <circle className="amb-blink" style={{ ['--d' as string]: `${i * 0.7}s` }} cx={n.x + 20} cy={n.y + 5} r="2.2" fill={n.hot ? 'var(--bit)' : 'var(--brand)'} />
            <rect
              className="amb-load"
              style={{ ['--d' as string]: `${i * 0.4}s` }}
              x={n.x + 4.5}
              y={n.y + 12}
              width={13 * n.load}
              height="3.2"
              rx="1.6"
              fill={n.hot ? 'var(--bit)' : 'var(--brand)'}
            />
          </g>
        </g>
      ))}
      <path className="a draw ln-d" style={{ ['--d' as string]: '1.05s', ['--len' as string]: 76 }} d="M22 102 H98" fill="none" />
      <text className="a show cap" style={{ ['--d' as string]: '1.15s' }} x="60" y="114" textAnchor="middle">
        swarm
      </text>
    </svg>
  )
}
