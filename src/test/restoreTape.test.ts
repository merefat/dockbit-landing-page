import { describe, expect, it } from 'vitest'
import { reelRotation, tapeLabel, tapeMeta } from '../lib/restoreTape'

describe('restoreTape (ported from draft)', () => {
  it('v=23 is the latest nightly snapshot', () => {
    expect(tapeLabel(23)).toBe('Today 03:00')
    expect(tapeMeta(23)).toBe('nightly · 4.8 GB')
  })

  it('v=20 is today at 00:00, hourly', () => {
    expect(tapeLabel(20)).toBe('Today 00:00')
    expect(tapeMeta(20)).toMatch(/^hourly snapshot · \d\.\d GB$/)
  })

  it('v=0 rolls back to yesterday', () => {
    expect(tapeLabel(0)).toBe('Yesterday 04:00')
  })

  it('hourly labels stay within the last 24 hours', () => {
    for (let v = 0; v <= 23; v++) {
      expect(tapeLabel(v)).toMatch(/^(Today|Yesterday) \d{2}:00$/)
    }
  })

  it('reels rotate 24 degrees per step', () => {
    expect(reelRotation(23)).toBe(552)
    expect(reelRotation(0)).toBe(0)
  })
})
