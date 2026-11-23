const STEPS = Array.from({ length: 6 }, (_, i) => ({
  x: 20 + i * 14,
  h: 8 + i * 6.5,
}))

export default function TourViz() {
  return (
    <svg viewBox="0 0 120 120" className="vz">
      <circle className="a pop f-glow" style={{ ['--d' as string]: '0s' }} cx="60" cy="55" r="46" />
      {/* play ring */}
      <circle className="a draw ln-b" style={{ ['--d' as string]: '0s', ['--len' as string]: 132 }} cx="60" cy="42" r="21" />
      <path className="a pop-pulse f-brand" style={{ ['--d' as string]: '.4s' }} d="M54 32 L72 42 L54 52 Z" />
      {/* rising steps — equalizer wobble */}
      <path className="a draw ln-d" style={{ ['--d' as string]: '.5s', ['--len' as string]: 92 }} d="M14 94 H106" fill="none" />
      {STEPS.map((s, i) => (
        <g key={i} className="amb-eq" style={{ ['--d' as string]: `${i * 0.3}s` }}>
          <rect
            className="a fy f-soft st-brand"
            style={{ ['--d' as string]: `${0.55 + i * 0.1}s` }}
            x={s.x}
            y={94 - s.h}
            width="11"
            height={s.h}
          />
        </g>
      ))}
      <text className="a show cap" style={{ ['--d' as string]: '1.3s' }} x="60" y="112" textAnchor="middle">
        tour
      </text>
    </svg>
  )
}
