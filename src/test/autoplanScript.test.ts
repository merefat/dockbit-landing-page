import { describe, expect, it } from 'vitest'
import { SCRIPT, TOTAL_MS, visibleAt } from '../lib/autoplanScript'

describe('autoplanScript (Problem-section terminal)', () => {
  it('runs five commands covering deploy, machine, domain, backup and access', () => {
    const cmds = SCRIPT.filter((l) => l.kind === 'cmd').map((l) => l.text)
    expect(cmds).toEqual([
      'autoplan deploy',
      'autoplan machine add vm-2',
      'autoplan domain add shop.acme.io',
      'autoplan backup',
      'autoplan access --add sam',
    ])
    const last = SCRIPT[SCRIPT.length - 1]
    expect(last.kind).toBe('rule')
    expect(last.text).toContain('weekend gone')
  })

  it('hits the chores DockBit handles and piles up matching errors', () => {
    const labels = SCRIPT.filter((l) => l.kind === 'step').map((l) => l.label)
    for (const stage of ['git', 'machine', 'docker', 'swarm', 'dns', 'certs', 'cron', 'ssh'])
      expect(labels).toContain(stage)
    const errs = SCRIPT.filter((l) => l.kind === 'err').length
    const last = SCRIPT[SCRIPT.length - 1]
    expect(last.text).toContain(`${errs} errors`)
  })

  it('keeps delays positive', () => {
    for (const l of SCRIPT) expect(l.delay).toBeGreaterThan(0)
  })

  it('reveals nothing before the session starts', () => {
    const f = visibleAt(0)
    expect(f.lines).toHaveLength(0)
    expect(f.done).toBe(false)
  })

  it('reveals the whole transcript once finished', () => {
    const f = visibleAt(TOTAL_MS)
    expect(f.lines).toHaveLength(SCRIPT.length)
    expect(f.lines.every((fl) => fl.chars === fl.line.text.length)).toBe(true)
    expect(f.done).toBe(true)
  })

  it('types commands character by character', () => {
    let sawPartial = false
    for (let t = 0; t <= TOTAL_MS && !sawPartial; t += 25) {
      sawPartial = visibleAt(t).lines.some(
        (fl) => fl.line.kind === 'cmd' && fl.chars > 0 && fl.chars < fl.line.text.length,
      )
    }
    expect(sawPartial).toBe(true)
  })

  it('never un-reveals lines (monotonic playback)', () => {
    let shown = 0
    for (let t = 0; t <= TOTAL_MS; t += 137) {
      const n = visibleAt(t).lines.length
      expect(n).toBeGreaterThanOrEqual(shown)
      shown = n
    }
  })
})
