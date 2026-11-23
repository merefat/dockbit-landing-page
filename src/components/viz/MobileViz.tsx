const ROWS = [
  { y: 36, w: 13, alert: false },
  { y: 49, w: 10, alert: false },
  { y: 62, w: 13, alert: true },
]

export default function MobileViz() {
  return (
    <svg viewBox="0 0 120 120" className="vz">
      <circle className="a pop halo" style={{ ['--d' as string]: '0s' }} cx="60" cy="55" r="46" />
      {/* phone + screen */}
      <rect className="a up ln f-s1" style={{ ['--d' as string]: '0s' }} x="40" y="14" width="38" height="72" rx="8" />
      <rect className="a show f-s2" style={{ ['--d' as string]: '.2s' }} x="45" y="28" width="28" height="52" rx="3" />
      <path className="a draw ln-d" style={{ ['--d' as string]: '.25s', ['--len' as string]: 10 }} d="M54 21 h10" fill="none" />
      {/* live health feed — bars keep refreshing */}
      {ROWS.map((r, i) => (
        <g key={i} className="a show" style={{ ['--d' as string]: `${0.35 + i * 0.12}s` }}>
          <circle cx="48" cy={r.y} r="2.4" fill={r.alert ? 'var(--bit)' : 'var(--brand)'} />
          <rect
            className="amb-load"
            style={{ ['--d' as string]: `${i * 0.5}s` }}
            x="57"
            y={r.y - 1.6}
            width={r.w}
            height="3.2"
            rx="1.6"
            fill={r.alert ? 'var(--bit-soft)' : 'var(--brand-soft)'}
          />
        </g>
      ))}
      {/* alert badge — pings + blinks */}
      <g className="a show" style={{ ['--d' as string]: '.8s' }}>
        <circle className="amb-ping" style={{ ['--d' as string]: '.6s' }} cx="88" cy="30" r="10" fill="none" stroke="var(--bit)" strokeWidth="1.4" />
        <circle cx="88" cy="30" r="10" fill="var(--s1)" stroke="var(--bit)" strokeWidth="1.5" />
        <path className="amb-blink ln-o" d="M88 25 v6 M88 34.5 v.6" fill="none" />
      </g>
      <path className="a draw ln-d" style={{ ['--d' as string]: '1s', ['--len' as string]: 44 }} d="M44 94 H88" fill="none" />
      <text className="a show cap" style={{ ['--d' as string]: '1.1s' }} x="60" y="112" textAnchor="middle">
        mobile
      </text>
    </svg>
  )
}
