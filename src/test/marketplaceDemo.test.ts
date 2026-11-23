import { describe, expect, it } from 'vitest'
import {
  CATALOG,
  CONNECT_SERVICES,
  CONNECT_STEPS,
  DEPLOY_STAGES,
  EXTRAS,
  PROGRESS_STEPS,
  SECRET_MASK,
  genSecret,
  secretLabel,
} from '../lib/marketplaceDemo'

describe('marketplace catalog', () => {
  it('lists nine apps, each with a blurb of eight words or fewer', () => {
    expect(CATALOG).toHaveLength(9)
    for (const a of CATALOG) {
      expect(a.name).toBeTruthy()
      expect(a.blurb.trim().split(/\s+/).length).toBeLessThanOrEqual(8)
    }
  })

  it('keeps the secret-bearing apps and gives every secret a friendly label', () => {
    const fields = CATALOG.flatMap((a) => a.secrets)
    expect(fields).toContain('ADMIN_PASSWORD')
    expect(fields).toContain('MINIO_ROOT_PASSWORD')
    for (const f of fields) expect(secretLabel(f)).not.toContain('_')
    expect(secretLabel('ADMIN_PASSWORD')).toBe('Admin password')
    expect(secretLabel('DB_ROOT_PASSWORD')).toBe('Database admin password')
  })

  it('falls back to lowercased words for unknown fields', () => {
    expect(secretLabel('SOME_NEW_SECRET')).toBe('some new secret')
  })
})

describe('deploy stages', () => {
  it('runs Queued → Build → Deploy → Running, each with a hint and increasing delay', () => {
    expect(DEPLOY_STAGES.map((s) => s.label)).toEqual(['Queued', 'Build', 'Deploy', 'Running'])
    expect(DEPLOY_STAGES[0].at).toBe(0)
    DEPLOY_STAGES.forEach((s, i) => {
      expect(s.hint).toBeTruthy()
      if (i > 0) expect(s.at).toBeGreaterThan(DEPLOY_STAGES[i - 1].at)
    })
  })
})

describe('connect services', () => {
  it('lists six services, each plain and small enough to scan', () => {
    expect(CONNECT_SERVICES).toHaveLength(6)
    for (const s of CONNECT_SERVICES) {
      expect(s.name).toBeTruthy()
      expect(s.blurb.trim().split(/\s+/).length).toBeLessThanOrEqual(8)
      expect(s.needs.length).toBeLessThanOrEqual(3)
      expect(s.result).toBeTruthy()
    }
  })

  it('covers the integrations DockBit actually supports', () => {
    expect(CONNECT_SERVICES.map((s) => s.key)).toEqual([
      'supabase',
      'git',
      's3',
      'registry',
      'cloudflare',
      'notify',
    ])
  })
})

describe('progress and extras', () => {
  it('shows three plain progress steps per mode', () => {
    expect(PROGRESS_STEPS).toEqual(['Pick an app', 'Install', 'Get your password'])
    expect(CONNECT_STEPS).toEqual(['Pick a service', 'Connect', 'Done'])
  })

  it('shows three info cards for bring-your-own paths', () => {
    expect(EXTRAS).toHaveLength(3)
    for (const e of EXTRAS) {
      expect(e.h).toBeTruthy()
      expect(e.p).toBeTruthy()
    }
  })
})

describe('secrets', () => {
  it('generates a 64-char hex string from injected bytes', () => {
    expect(genSecret(() => new Uint8Array(32).fill(0xff))).toBe('ff'.repeat(32))
    expect(genSecret(() => new Uint8Array(32).fill(0))).toBe('0'.repeat(64))
  })

  it('masks with twelve bullets', () => {
    expect(SECRET_MASK).toBe('•'.repeat(12))
  })
})
