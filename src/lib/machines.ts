/* Data for the /machines interactive tour — ported from the user's
   reference section ("DockBit · Machines & network"). Five plain steps
   on the left; the fleet stage on the right shows a different slice
   per step. All copy kept from the reference. */

export interface TourStep {
  n: number
  title: string
  small: string
  body: string
  tech: string
}

export const TOUR_STEPS: TourStep[] = [
  {
    n: 1,
    title: 'Add it',
    small: 'Connect a spare machine in minutes',
    body: 'Choose a machine from your private network and paste one command on it, or lend its password once. DockBit checks what the machine has, suggests a role, and it appears on your Machines page within a minute.',
    tech: 'The SSH wizard is the default. A one-time worker-install.sh script or a DockBit OS join link also work.',
  },
  {
    n: 2,
    title: 'Give it work',
    small: 'Choose where each app runs',
    body: 'Pick a machine for each app, or set a rule by label or group. Heavy jobs like builds can stay on the machine made for them.',
    tech: 'Placement by deploy node, node label or network group.',
  },
  {
    n: 3,
    title: 'Keep watch',
    small: 'See every machine on one page',
    body: 'Live CPU, memory and disk for each machine. A disk that is nearly full is flagged early, and you are told if a machine goes offline.',
    tech: 'Per-node metrics, disk alert at 80%, offline notifications.',
  },
  {
    n: 4,
    title: 'Update safely',
    small: 'One machine at a time, main one last',
    body: 'Apps move away first, the machine updates and restarts, then the apps come back. Helpers go first and the main machine goes last.',
    tech: 'Swarm drain, update, reboot, undrain. Workers before managers.',
  },
  {
    n: 5,
    title: 'Fix it',
    small: 'Bring a lost machine back',
    body: 'A machine can silently drop off the private network and its sites stop answering. DockBit spots it, and one click restarts what is needed to bring it back.',
    tech: 'Overlay gossip check. Repair restarts Docker on that node.',
  },
]

/* Tour timing (reference: 7s per step, repair lands 3.2s into step 5). */
export const AUTO_MS = 7000
export const FIX_MS = 3200

export interface MachineMetric {
  label: string
  v: number
  text: string
  warn?: boolean
}

export interface Machine {
  id: string
  name: string
  kind: string
  pill: string
  sub: string
  parked?: boolean
  joined?: boolean
  metrics?: MachineMetric[]
  apps?: string[]
  appsHl?: string
  appsNote?: string
  update: 'ok' | 'updating' | 'paused'
  status: 'ok' | 'fails' | 'paused'
}

export const MACHINES: Machine[] = [
  {
    id: 'm1',
    name: 'edge-01',
    kind: 'Cloud server',
    pill: 'Helper',
    sub: 'worker',
    metrics: [
      { label: 'CPU', v: 24, text: '24%' },
      { label: 'RAM', v: 38, text: '38%' },
      { label: 'Disk', v: 52, text: '52%' },
    ],
    apps: ['shop-site', 'blog'],
    appsHl: 'shop-site',
    update: 'ok',
    status: 'ok',
  },
  {
    id: 'm2',
    name: 'core-01',
    kind: 'Main machine',
    pill: 'Main',
    sub: 'manager',
    metrics: [
      { label: 'CPU', v: 41, text: '41%' },
      { label: 'RAM', v: 33, text: '21/64 GB' },
      { label: 'Disk', v: 47, text: '47%' },
    ],
    apps: ['dashboard', 'database'],
    update: 'updating',
    status: 'fails',
  },
  {
    id: 'm3',
    name: 'storage-01',
    kind: 'Builds and storage',
    pill: 'Builder',
    sub: 'build · zfs',
    metrics: [
      { label: 'CPU', v: 18, text: '18%' },
      { label: 'RAM', v: 29, text: '29%' },
      { label: 'Disk', v: 83, text: '83%', warn: true },
    ],
    apps: ['image builds'],
    update: 'ok',
    status: 'ok',
  },
  {
    id: 'm4',
    name: 'pi-garage',
    kind: 'Raspberry Pi',
    pill: 'Paused',
    sub: 'parked',
    parked: true,
    update: 'paused',
    status: 'paused',
  },
  {
    id: 'm5',
    name: 'old-pc',
    kind: 'Old PC',
    pill: 'Helper',
    sub: 'worker',
    joined: true,
    metrics: [
      { label: 'CPU', v: 9, text: '9%' },
      { label: 'RAM', v: 21, text: '21%' },
      { label: 'Disk', v: 34, text: '34%' },
    ],
    appsNote: 'Free for apps',
    update: 'ok',
    status: 'ok',
  },
]

/* Role legend under the fleet (reference "key" block). */
export const MACHINE_KEY = [
  { b: 'Main', sub: 'manager', p: 'Coordinates the group and runs the dashboard.' },
  { b: 'Helper', sub: 'worker', p: 'Runs your apps.' },
  { b: 'Builder', sub: 'build', p: 'Builds app images so apps are not slowed down.' },
  { b: 'Paused', sub: 'parked', p: 'Apps moved off, monitoring stopped, kept in your list.' },
  { b: 'Private network', sub: 'overlay · tailnet', p: 'The secure link machines use to reach each other.' },
]
