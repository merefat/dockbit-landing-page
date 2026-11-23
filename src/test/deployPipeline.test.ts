import { describe, expect, it } from 'vitest'
import { SOURCES, STAGES, STAGE_MS, stageAt } from '../lib/deployPipeline'

describe('deployPipeline', () => {
  it('offers the four draft sources', () => {
    expect(SOURCES.map((s) => s.label)).toEqual(['Git repo', 'Docker image', 'Compose', 'Marketplace'])
  })

  it('gives every source a 5-stage run ending in the live stage', () => {
    for (const s of SOURCES) {
      const stages = STAGES[s.id]
      expect(stages).toHaveLength(5)
      expect(stages[4].h).toBe('Running')
      expect(stages[3].h).toBe('Health check')
    }
  })

  it('keeps the git stages identical to the draft copy', () => {
    expect(STAGES.git[0]).toMatchObject({ h: 'Clone', code: 'main @ 4f2c1a' })
    expect(STAGES.git[1]).toMatchObject({ h: 'Build', code: '41s' })
    expect(STAGES.git[2]).toMatchObject({ h: 'Push', code: 'v38 · v37 kept' })
  })

  it('maps elapsed time to running stage then done', () => {
    expect(stageAt(-1, 5)).toBe(-1)
    expect(stageAt(0, 5)).toBe(0)
    expect(stageAt(STAGE_MS * 3 + 10, 5)).toBe(3)
    expect(stageAt(STAGE_MS * 5, 5)).toBe(5)
    expect(stageAt(STAGE_MS * 99, 5)).toBe(5)
  })
})
