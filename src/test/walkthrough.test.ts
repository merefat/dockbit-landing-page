import { describe, expect, it } from 'vitest'
import { GOALS, GLOSS, SHOTS, computeShotLayout, parseGloss, stepAt } from '../lib/walkthrough'

describe('walkthrough data (from reference)', () => {
  it('has the 9 goals in order', () => {
    expect(GOALS.map((g) => g.name)).toEqual([
      'Your first day',
      'Put my app online',
      'Connect my server',
      'Get a web address',
      'Keep my data safe',
      'Add my team',
      'Publish my phone app',
      'Ask AI for help',
      'Keep DockBit updated',
    ])
  })

  it('every step has all four copy fields', () => {
    for (const goal of GOALS) {
      expect(goal.blurb.length).toBeGreaterThan(0)
      for (const s of goal.steps) {
        expect(s.title.length).toBeGreaterThan(0)
        expect(s.desc.length).toBeGreaterThan(0)
        expect(s.you.length).toBeGreaterThan(0)
        expect(s.does.length).toBeGreaterThan(0)
      }
    }
  })

  it('every shot key exists and every box stays inside the image', () => {
    const inBounds = (b: { x: number; y: number; w: number; h: number }) => {
      expect(b.x).toBeGreaterThanOrEqual(0)
      expect(b.y).toBeGreaterThanOrEqual(0)
      expect(b.x + b.w).toBeLessThanOrEqual(100)
      expect(b.y + b.h).toBeLessThanOrEqual(100)
    }
    for (const goal of GOALS)
      for (const s of goal.steps) {
        if (s.stage.kind !== 'shot') continue
        expect(SHOTS[s.stage.shot]).toBeDefined()
        if (s.stage.zoom) inBounds(s.stage.zoom)
        if (s.stage.ring) inBounds(s.stage.ring)
        /* the zoom window must contain the ring and cursor — anything
           outside is clipped by the stage's overflow:hidden */
        if (s.stage.zoom && s.stage.ring) {
          expect(s.stage.ring.x).toBeGreaterThanOrEqual(s.stage.zoom.x)
          expect(s.stage.ring.x + s.stage.ring.w).toBeLessThanOrEqual(s.stage.zoom.x + s.stage.zoom.w)
        }
        if (s.stage.zoom && s.stage.cursor) {
          expect(s.stage.cursor.x).toBeGreaterThanOrEqual(s.stage.zoom.x)
          expect(s.stage.cursor.x).toBeLessThanOrEqual(s.stage.zoom.x + s.stage.zoom.w)
        }
        if (s.stage.cursor) {
          expect(s.stage.cursor.x).toBeGreaterThanOrEqual(0)
          expect(s.stage.cursor.x).toBeLessThanOrEqual(100)
        }
      }
  })

  it('every glossary token resolves', () => {
    const fields = (s: (typeof GOALS)[number]['steps'][number]) =>
      [s.title, s.desc, s.you, s.does].join('\n')
    for (const goal of GOALS)
      for (const s of goal.steps)
        for (const m of fields(s).matchAll(/\{(\w+)\}/g)) expect(GLOSS[m[1]]).toBeDefined()
  })

  it('non-shot stages carry their payload', () => {
    for (const goal of GOALS)
      for (const s of goal.steps) {
        if (s.stage.kind === 'copy') expect(s.stage.cmd.length).toBeGreaterThan(0)
        if (s.stage.kind === 'form') expect(s.stage.fields.length).toBeGreaterThan(0)
        if (s.stage.kind === 'list') expect(s.stage.items.length).toBeGreaterThan(0)
      }
  })
})

describe('parseGloss', () => {
  it('splits plain text and terms', () => {
    expect(parseGloss('a {Git} push over {SSH}')).toEqual([
      { text: 'a ' },
      { text: 'Git', term: 'Git' },
      { text: ' push over ' },
      { text: 'SSH', term: 'SSH' },
    ])
  })

  it('leaves unknown tokens untouched', () => {
    expect(parseGloss('use {Nope} here')).toEqual([{ text: 'use ' }, { text: '{Nope}' }, { text: ' here' }])
  })
})

describe('stepAt', () => {
  it('moves within a goal', () => {
    expect(stepAt(0, 0, 1)).toEqual({ gi: 0, si: 1 })
    expect(stepAt(1, 1, -1)).toEqual({ gi: 1, si: 0 })
  })

  it('crosses goal boundaries', () => {
    const last0 = GOALS[0].steps.length - 1
    expect(stepAt(0, last0, 1)).toEqual({ gi: 1, si: 0 })
    expect(stepAt(1, 0, -1)).toEqual({ gi: 0, si: last0 })
  })

  it('wraps at both ends', () => {
    const lastG = GOALS.length - 1
    const lastS = GOALS[lastG].steps.length - 1
    expect(stepAt(lastG, lastS, 1)).toEqual({ gi: 0, si: 0 })
    expect(stepAt(0, 0, -1)).toEqual({ gi: lastG, si: lastS })
  })
})

describe('computeShotLayout', () => {
  it('returns identity without a zoom box', () => {
    expect(computeShotLayout(undefined, 1.6)).toEqual({ scale: 1, left: 0, top: 0, width: 100 })
  })

  it('sizes the shot to the box and pans it into place', () => {
    const { scale, left, top, width } = computeShotLayout({ x: 10, y: 20, w: 50, h: 40 }, 1, 1)
    expect(scale).toBe(2)
    expect(width).toBe(200)
    expect(left).toBe(-20)
    /* y centre 40, visible 50 → y = 15 → top = -15 * 2 */
    expect(top).toBe(-30)
  })

  it('clamps the vertical pan so the image always covers the stage', () => {
    const aspect = 1.6
    const k = 16 / 9 / aspect
    const { scale, top } = computeShotLayout({ x: 0, y: 90, w: 50, h: 10 }, aspect)
    const y = -top / (scale * k)
    const visibleY = 100 / (scale * k)
    expect(y).toBeLessThanOrEqual(100 - visibleY + 0.001)
    expect(y).toBeGreaterThanOrEqual(0)
  })
})
