/* Marketplace demo — a simple 3-step click-through (pick → install → password).
   Pure data so it can be tested without the DOM. */

export interface CatalogApp {
  key: string
  name: string
  blurb: string
  secrets: string[]
}

export const CATALOG: CatalogApp[] = [
  { key: 'jellyfin', name: 'Jellyfin', blurb: 'Your own movie and music streaming.', secrets: [] },
  { key: 'vaultwarden', name: 'Vaultwarden', blurb: 'A password manager you host yourself.', secrets: ['ADMIN_TOKEN'] },
  { key: 'grafana', name: 'Grafana', blurb: 'Charts and dashboards for your servers.', secrets: ['ADMIN_PASSWORD'] },
  { key: 'prometheus', name: 'Prometheus', blurb: 'Keeps track of how your servers are doing.', secrets: [] },
  { key: 'home-assistant', name: 'Home Assistant', blurb: 'Control your smart home from one place.', secrets: [] },
  { key: 'bookstack', name: 'BookStack', blurb: 'A wiki for notes and documents.', secrets: ['DB_PASSWORD', 'DB_ROOT_PASSWORD'] },
  { key: 'rabbitmq', name: 'RabbitMQ', blurb: 'Passes messages between your apps.', secrets: ['DEFAULT_PASS'] },
  {
    key: 'nextcloud-ha',
    name: 'Nextcloud (HA)',
    blurb: 'Your own file storage, built to stay online.',
    secrets: ['NEXTCLOUD_ADMIN_PASSWORD', 'DB_PASSWORD', 'DB_REPLICATION_PASSWORD', 'REDIS_PASSWORD'],
  },
  {
    key: 'minio-object-store',
    name: 'MinIO object store',
    blurb: 'Storage for files and backups, like Amazon S3.',
    secrets: ['MINIO_ROOT_PASSWORD'],
  },
]

/* The three steps shown in the card header — per mode. */
export const PROGRESS_STEPS = ['Pick an app', 'Install', 'Get your password']
export const CONNECT_STEPS = ['Pick a service', 'Connect', 'Done']

/* "Connect a service" — things you already run that DockBit can plug into.
   needs = what the connection asks for (shown as chips, never typed). */
export interface ConnectService {
  key: string
  name: string
  blurb: string
  needs: string[]
  result: string
}

export const CONNECT_SERVICES: ConnectService[] = [
  {
    key: 'supabase',
    name: 'Supabase',
    blurb: 'Your hosted login and database.',
    needs: ['Project URL', 'API key'],
    result: 'Sign-in, database and storage work through it.',
  },
  {
    key: 'git',
    name: 'Git provider',
    blurb: 'GitHub or GitLab, where your code lives.',
    needs: ['Sign-in on their page'],
    result: 'Every push deploys itself.',
  },
  {
    key: 's3',
    name: 'S3 storage',
    blurb: 'S3, R2 or MinIO buckets.',
    needs: ['Endpoint', 'Bucket', 'Access key + secret'],
    result: 'Backups go there on their schedule.',
  },
  {
    key: 'registry',
    name: 'Container registry',
    blurb: 'Where your built images are kept.',
    needs: ['URL', 'Username + token'],
    result: 'Builds are stored and pulled from it.',
  },
  {
    key: 'cloudflare',
    name: 'Cloudflare',
    blurb: 'DNS, tunnels and SSL for your domains.',
    needs: ['API token'],
    result: 'DNS and tunnels manage themselves.',
  },
  {
    key: 'notify',
    name: 'Notifications',
    blurb: 'Slack, Discord, email or Telegram.',
    needs: ['Webhook URL or bot token'],
    result: 'Alerts land in your channel.',
  },
]

/* How long the demo "Checking the details…" beat lasts. */
export const CONNECT_MS = 1400

/* The deploy stages the progress track shows — same names and order as a real
   deploy. 'at' is the delay in ms before the dot switches to that stage. */
export const DEPLOY_STAGES = [
  { key: 'queued', label: 'Queued', hint: 'Waiting for its turn.', at: 0 },
  { key: 'build', label: 'Build', hint: 'Getting the app ready.', at: 600 },
  { key: 'deploy', label: 'Deploy', hint: 'Starting it up.', at: 1300 },
  { key: 'running', label: 'Running', hint: "It's live.", at: 2000 },
] as const

export type StageKey = (typeof DEPLOY_STAGES)[number]['key']

export const SECRET_MASK = '\u2022'.repeat(12)

/* Friendly labels for the raw env-var names a template asks DockBit to fill. */
const SECRET_LABELS: Record<string, string> = {
  ADMIN_PASSWORD: 'Admin password',
  ADMIN_TOKEN: 'Admin token',
  DB_PASSWORD: 'Database password',
  DB_ROOT_PASSWORD: 'Database admin password',
  DB_REPLICATION_PASSWORD: 'Database replica password',
  REDIS_PASSWORD: 'Cache password',
  DEFAULT_PASS: 'Login password',
  MINIO_ROOT_PASSWORD: 'Storage admin password',
  NEXTCLOUD_ADMIN_PASSWORD: 'Admin password',
}

export function secretLabel(field: string): string {
  return SECRET_LABELS[field] ?? field.toLowerCase().replace(/_/g, ' ')
}

/* Extra ways to add apps — three static one-line cards under the demo. */
export const EXTRAS: { h: string; p: string }[] = [
  { h: 'Add your own app.', p: 'Paste a Compose file. Owners and admins only.' },
  { h: 'Share a list of apps.', p: 'Load a pack from a web address. Packs update without a new release.' },
  { h: 'Search Docker Hub.', p: "Can't find it? Search Docker Hub directly." },
]

/* 32 random bytes rendered as a 64-char hex string — how DockBit secrets look.
   Takes an injectable byte source so tests and SSR never need crypto. */
export function genSecret(bytes?: () => Uint8Array): string {
  const src = bytes ?? (() => globalThis.crypto.getRandomValues(new Uint8Array(32)))
  return [...src()].map((b) => b.toString(16).padStart(2, '0')).join('')
}
