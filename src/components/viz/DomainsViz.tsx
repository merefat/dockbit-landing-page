export default function DomainsViz() {
  return (
    <svg viewBox="0 0 120 120" className="vz">
      <circle className="a pop halo" style={{ ['--d' as string]: '0s' }} cx="60" cy="55" r="46" />
      {/* globe */}
      <circle className="a draw ln f-soft" style={{ ['--d' as string]: '0s', ['--len' as string]: 164 }} cx="54" cy="46" r="26" />
      <ellipse className="a draw ln-d" style={{ ['--d' as string]: '.2s', ['--len' as string]: 124 }} cx="54" cy="46" rx="11" ry="26" />
      <path className="a draw ln-d" style={{ ['--d' as string]: '.3s', ['--len' as string]: 52 }} d="M28 46 H80" fill="none" />
      {/* orbiting satellite dot */}
      <g className="a show" style={{ ['--d' as string]: '.5s' }}>
        <g className="amb-spin" style={{ transformOrigin: '54px 46px' }}>
          <circle cx="54" cy="20" r="3" fill="var(--brand)" />
        </g>
      </g>
      {/* padlock */}
      <path className="a draw ln" style={{ ['--d' as string]: '.55s', ['--len' as string]: 22 }} d="M83 68 v-4.5 a5 5 0 0 1 10 0 v4.5" fill="none" />
      <rect className="a pop f-bsoft st-bit" style={{ ['--d' as string]: '.7s' }} x="81" y="67" width="16" height="12" rx="2" strokeWidth="1.6" />
      {/* url pill */}
      <rect className="a draw ln f-s1" style={{ ['--d' as string]: '.85s', ['--len' as string]: 185 }} x="20" y="90" width="80" height="16" rx="8" />
      <g className="a show" style={{ ['--d' as string]: '1.05s' }}>
        {[38, 52, 66].map((x, i) => (
          <circle key={x} className="amb-blink" style={{ ['--d' as string]: `${i * 0.45}s` }} cx={x} cy="98" r="2.4" fill="var(--brand)" />
        ))}
      </g>
      <text className="a show cap" style={{ ['--d' as string]: '1.3s' }} x="60" y="117" textAnchor="middle">
        https
      </text>
    </svg>
  )
}
