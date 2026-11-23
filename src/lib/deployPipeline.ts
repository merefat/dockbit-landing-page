/* Deploy-section pipeline — source list, per-source stage copy and run timing.
   Pure data + math so it can be tested without the DOM. */

export interface SourceDef {
  id: string
  label: string
  tag: string
}

export interface StageDef {
  n: string
  h: string
  p: string
  code: string
}

export const SOURCES: SourceDef[] = [
  { id: 'git', label: 'Git repo', tag: 'push' },
  { id: 'image', label: 'Docker image', tag: 'pull' },
  { id: 'compose', label: 'Compose', tag: 'yaml' },
  { id: 'market', label: 'Marketplace', tag: '1-click' },
]

const HEALTH: StageDef = {
  n: '04',
  h: 'Health check',
  p: 'Old container stops only after this passes.',
  code: 'GET /health 200',
}

const LIVE: StageDef = {
  n: '05 · live',
  h: 'Running',
  p: 'Logs, stats, terminal, one-click rollback.',
  code: 'zero downtime',
}

export const STAGES: Record<string, StageDef[]> = {
  git: [
    { n: '01', h: 'Clone', p: 'Branch, monorepo folder, build args.', code: 'main @ 4f2c1a' },
    { n: '02', h: 'Build', p: "Dockerfile, or Nixpacks if there isn't one.", code: '41s' },
    { n: '03', h: 'Push', p: 'Stored in your private registry.', code: 'v38 · v37 kept' },
    HEALTH,
    LIVE,
  ],
  image: [
    { n: '01', h: 'Pull', p: 'Image pre-pulled on the deploy nodes.', code: 'app:1.4.2 · cached' },
    { n: '02', h: 'Update', p: 'Swarm service updated start-first.', code: 'rolling · start-first' },
    { n: '03', h: 'Rollout', p: 'Watched until every replica is ready.', code: '2/2 replicas' },
    HEALTH,
    LIVE,
  ],
  compose: [
    { n: '01', h: 'Validate', p: 'Swarm-incompatible options rejected.', code: 'no silent ignores' },
    { n: '02', h: 'Wire', p: 'Overlay network, routes and placement injected.', code: 'traefik · cd-proj' },
    { n: '03', h: 'Stack', p: 'docker stack deploy, then converge.', code: 'web · db ready' },
    HEALTH,
    LIVE,
  ],
  market: [
    { n: '01', h: 'Pick', p: 'Template from the versioned catalog pack.', code: 'immich' },
    { n: '02', h: 'Generate', p: 'Secrets and env vars filled in.', code: 'passwords generated' },
    { n: '03', h: 'Stack', p: 'Deploys as a compose stack.', code: 'cd-immich' },
    HEALTH,
    LIVE,
  ],
}

export const STAGE_MS = 850

/** -1 before the run starts, 0..stages-1 while a stage runs, stages.length when done. */
export function stageAt(elapsedMs: number, stageCount: number): number {
  if (elapsedMs < 0) return -1
  return Math.min(stageCount, Math.floor(elapsedMs / STAGE_MS))
}
