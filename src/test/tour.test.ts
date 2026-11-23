import { describe, expect, it } from 'vitest'
import { TOUR_FEATURES, TOUR_KEYS } from '../data/tour'

describe('tour data (verbatim from draft)', () => {
  it('has the same 8 areas in the same order', () => {
    expect(TOUR_KEYS).toEqual([
      'deploy',
      'machine',
      'domain',
      'storage',
      'security',
      'release',
      'ai',
      'platform',
    ])
  })

  it('every area has 4 steps', () => {
    for (const key of TOUR_KEYS) {
      expect(TOUR_FEATURES[key].steps).toHaveLength(4)
      for (const [title, copy] of TOUR_FEATURES[key].steps) {
        expect(title.length).toBeGreaterThan(0)
        expect(copy.length).toBeGreaterThan(0)
      }
    }
  })
})
