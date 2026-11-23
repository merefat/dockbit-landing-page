// Ported verbatim from the draft's tape-slider logic.
// Slider values 0-23 map to snapshots from yesterday back to today.

export function tapeLabel(v: number): string {
  const ago = 23 - v
  const hr = (3 - ago + 48) % 24
  const day = ago <= 3 ? 'Today' : 'Yesterday'
  return `${day} ${String(hr).padStart(2, '0')}:00`
}

export function tapeMeta(v: number): string {
  const ago = 23 - v
  const hr = (3 - ago + 48) % 24
  return hr === 3
    ? 'nightly · 4.8 GB'
    : `hourly snapshot · ${(0.2 + ((v * 7) % 9) / 10).toFixed(1)} GB`
}

export function reelRotation(v: number): number {
  return v * 24
}
