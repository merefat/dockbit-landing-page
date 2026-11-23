import { describe, expect, it } from 'vitest'
import { BURN_LIMIT_S, BURN_SRC, MAX_WORKERS, clampCores } from '../lib/fanSpin'

describe('fanSpin', () => {
  it('clamps core count to a sane worker range', () => {
    expect(clampCores(8)).toBe(8)
    expect(clampCores(1)).toBe(1)
    expect(clampCores(0)).toBe(1)
    expect(clampCores(-3)).toBe(1)
    expect(clampCores(999)).toBe(MAX_WORKERS)
    expect(clampCores(4.9)).toBe(4)
  })

  it('falls back to 4 cores when hardwareConcurrency is missing', () => {
    expect(clampCores(undefined)).toBe(4)
    expect(clampCores(NaN)).toBe(4)
    expect(clampCores(Infinity)).toBe(4)
  })

  it('ships a self-contained busy loop for the workers', () => {
    expect(BURN_SRC).toContain('for (;;)')
    expect(BURN_SRC).not.toContain('import')
    expect(BURN_SRC).not.toContain('document')
  })

  it('keeps the auto-stop at one minute', () => {
    expect(BURN_LIMIT_S).toBe(60)
  })
})
