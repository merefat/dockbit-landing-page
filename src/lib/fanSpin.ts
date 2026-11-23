// "Spin up my fans" — a page can't reach the fan hardware, so we saturate
// every CPU core with Web Workers and let the machine's own thermal
// management ramp the fans.

export const BURN_LIMIT_S = 60
export const MAX_WORKERS = 32
const FALLBACK_CORES = 4

export function clampCores(n: number | undefined): number {
  const c = n === undefined || !Number.isFinite(n) ? FALLBACK_CORES : Math.floor(n)
  return Math.min(Math.max(c, 1), MAX_WORKERS)
}

// Runs inside a throwaway Worker created from a Blob URL, so it must be a
// self-contained string: no imports, no DOM, terminate() is the only exit.
export const BURN_SRC = `
let n = 1
for (;;) {
  for (let i = 1; i < 200000; i++) {
    n += Math.sqrt(i * n) % 997
    if (n > 1e9) n = 1
  }
}
`
