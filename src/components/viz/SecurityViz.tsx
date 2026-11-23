export default function SecurityViz() {
  return (
    <svg viewBox="0 0 120 120" className="vz">
      <circle className="a pop halo" style={{ ['--d' as string]: '0s' }} cx="60" cy="55" r="46" />
      {[33, 23, 13].map((r, i) => (
        <circle
          key={r}
          className="a ringlit"
          style={{ ['--d' as string]: `${0.2 + i * 0.16}s` }}
          cx="50"
          cy="54"
          r={r}
          strokeWidth="1.8"
        />
      ))}
      {/* radar scan sweep */}
      <g className="a show" style={{ ['--d' as string]: '1s' }}>
        <circle
          className="amb-spin"
          style={{ transformOrigin: '50px 54px', strokeDasharray: '4 8' }}
          cx="50"
          cy="54"
          r="27"
          fill="none"
          stroke="var(--brand)"
          strokeWidth="1.4"
        />
      </g>
      {/* key in the centre */}
      <circle className="a draw ln" style={{ ['--d' as string]: '.75s', ['--len' as string]: 32 }} cx="44" cy="54" r="5" />
      <path className="a draw ln" style={{ ['--d' as string]: '.85s', ['--len' as string]: 16 }} d="M49 54 h10 M56 54 v4.5 M53.5 54 v3.5" fill="none" />
      <circle className="a pop f-brand" style={{ ['--d' as string]: '.95s' }} cx="44" cy="54" r="2" />
      {/* log tick */}
      <circle className="a draw ln f-soft" style={{ ['--d' as string]: '1.05s', ['--len' as string]: 57 }} cx="90" cy="80" r="9" />
      <path className="a draw ln-b" style={{ ['--d' as string]: '1.2s', ['--len' as string]: 12 }} d="M85.5 80 l3 3 l6 -7" fill="none" />
      <path className="a draw ln-d" style={{ ['--d' as string]: '1.25s', ['--len' as string]: 66 }} d="M26 100 H94" fill="none" />
      <text className="a show cap" style={{ ['--d' as string]: '1.35s' }} x="60" y="113" textAnchor="middle">
        access
      </text>
    </svg>
  )
}
