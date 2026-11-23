import { describe, expect, it } from 'vitest'
import { AUTO_MS, FIX_MS, MACHINES, MACHINE_KEY, TOUR_STEPS } from '../lib/machines'

describe('machine tour steps', () => {
  it('has five numbered steps in order, each with plain and technical copy', () => {
    expect(TOUR_STEPS.map((s) => s.n)).toEqual([1, 2, 3, 4, 5])
    for (const s of TOUR_STEPS) {
      expect(s.title).toBeTruthy()
      expect(s.small).toBeTruthy()
      expect(s.body).toBeTruthy()
      expect(s.tech).toBeTruthy()
    }
  })

  it('autoplays slower than the step-5 repair lands', () => {
    expect(FIX_MS).toBeLessThan(AUTO_MS)
  })
})

describe('fleet', () => {
  it('has five machines plus roles that cover every pill', () => {
    expect(MACHINES).toHaveLength(5)
    const pills = new Set(MACHINES.map((m) => m.pill))
    for (const k of MACHINE_KEY.filter((k) => k.sub !== 'overlay · tailnet')) {
      expect(pills.has(k.b)).toBe(true)
    }
  })

  it('gives live machines metrics for the watch step', () => {
    for (const m of MACHINES) {
      if (m.parked) continue
      expect(m.metrics?.length).toBeGreaterThanOrEqual(3)
      for (const r of m.metrics ?? []) {
        expect(r.v).toBeGreaterThanOrEqual(0)
        expect(r.v).toBeLessThanOrEqual(100)
      }
    }
  })

  it('has exactly one machine that fails and one that updates on stage', () => {
    expect(MACHINES.filter((m) => m.status === 'fails')).toHaveLength(1)
    expect(MACHINES.filter((m) => m.update === 'updating')).toHaveLength(1)
    expect(MACHINES.filter((m) => m.joined)).toHaveLength(1)
  })
})
