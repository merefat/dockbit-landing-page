export default function DeployViz() {
  return (
    <svg viewBox="0 0 120 120" className="vz">
      <circle className="a pop halo" style={{ ['--d' as string]: '0s' }} cx="60" cy="54" r="46" />
      {/* git branch glyph */}
      <circle className="a pop f-brand" style={{ ['--d' as string]: '.05s' }} cx="16" cy="30" r="5" />
      <circle className="a pop f-brand" style={{ ['--d' as string]: '.12s' }} cx="36" cy="16" r="5" />
      <path className="a draw ln" style={{ ['--d' as string]: '.2s', ['--len' as string]: 20 }} d="M34 21 C32 28 26 30 21 30" fill="none" />
      <path className="a draw ln" style={{ ['--d' as string]: '.3s', ['--len' as string]: 42 }} d="M16 35 V44 C16 50 22 52 30 52 H48" fill="none" />
      {/* data streaming along the pipeline */}
      <g className="a show" style={{ ['--d' as string]: '.6s' }}>
        <path className="amb-flow ln-b" d="M18 38 V44 C18 50 24 53 32 53 H76" fill="none" />
      </g>
      {/* arrow */}
      <path className="a draw ln" style={{ ['--d' as string]: '.45s', ['--len' as string]: 18 }} d="M54 52 H72" fill="none" />
      <path className="a draw ln" style={{ ['--d' as string]: '.52s', ['--len' as string]: 17 }} d="M66 46 L72 52 L66 58" fill="none" />
      {/* container box with stacked units */}
      <rect className="a up ln f-s2" style={{ ['--d' as string]: '.62s' }} x="78" y="40" width="32" height="26" rx="4" />
      <g className="a show" style={{ ['--d' as string]: '.75s' }}>
        <rect className="f-soft st-brand" x="83.5" y="46.5" width="7" height="7" />
        <rect className="f-soft st-brand" x="92.5" y="46.5" width="7" height="7" />
        <rect className="f-soft st-brand" x="88" y="55.5" width="7" height="7" />
      </g>
      {/* health check — ring fills soft teal */}
      <circle className="a ringlit" style={{ ['--d' as string]: '.9s' }} cx="94" cy="88" r="13" strokeWidth="1.8" />
      <path className="a draw ln-b" style={{ ['--d' as string]: '1.1s', ['--len' as string]: 20 }} d="M87 88 l5 5.5 l10 -12" fill="none" />
      {/* live dot — pings and blinks forever */}
      <g className="a show" style={{ ['--d' as string]: '1.2s' }}>
        <circle className="amb-ping" style={{ ['--d' as string]: '1s' }} cx="114" cy="88" r="4.5" fill="none" stroke="var(--brand)" strokeWidth="1.4" />
        <circle className="amb-blink" cx="114" cy="88" r="4" fill="var(--brand)" />
      </g>
      <path className="a draw ln-d" style={{ ['--d' as string]: '1.25s', ['--len' as string]: 80 }} d="M20 102 H100" fill="none" />
      <text className="a show cap" style={{ ['--d' as string]: '1.35s' }} x="60" y="114" textAnchor="middle">
        deploy
      </text>
    </svg>
  )
}
