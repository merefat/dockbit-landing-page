/* Data for the /tour "Pick a goal. Follow the steps." walkthrough —
   ported from the user's reference section ("How DockBit works"). Nine
   goals on the left; a stage on the right shows a zoomed screenshot, a
   command card, a form card or a list card per step. Copy kept from the
   reference. */
import { INSTALL_CMD } from '../data/site'

/* A box in percent of the screenshot (x,y = top-left, w,h = size). */
export interface Box {
  x: number
  y: number
  w: number
  h: number
}

export type ShotKey =
  | 'home'
  | 'projects'
  | 'deploys'
  | 'machines'
  | 'domains'
  | 'storage'
  | 'assistant'
  | 'newproject'

/* Screenshot manifest — real dashboard captures in /public/tour. w/h are
   the pixel size; the shot stage matches their aspect ratio so they
   render at ~1:1 and stay sharp (zoom is kept mild, the ring + dim does
   the focusing). */
export const SHOTS: Record<ShotKey, { src: string; alt: string; w: number; h: number }> = {
  home: { src: '/tour/home.png', alt: 'DockBit dashboard — home', w: 2048, h: 932 },
  projects: { src: '/tour/projects.png', alt: 'DockBit dashboard — projects list', w: 2048, h: 920 },
  deploys: { src: '/tour/deploys.png', alt: 'DockBit dashboard — deploys', w: 2048, h: 944 },
  machines: { src: '/tour/machines.png', alt: 'DockBit dashboard — machines', w: 2048, h: 936 },
  domains: { src: '/tour/domains.png', alt: 'DockBit dashboard — domains page', w: 2048, h: 944 },
  storage: { src: '/tour/storage.png', alt: 'DockBit dashboard — storage and backups', w: 2048, h: 920 },
  assistant: { src: '/tour/assistant.png', alt: 'DockBit dashboard — Sage assistant', w: 2048, h: 910 },
  newproject: { src: '/tour/newproject.png', alt: 'DockBit dashboard — new project wizard', w: 2048, h: 918 },
}

export type Stage =
  | { kind: 'shot'; shot: ShotKey; zoom?: Box; ring?: Box; cursor?: { x: number; y: number } }
  | { kind: 'copy'; cmd: string }
  | { kind: 'form'; fields: { label: string; value: string }[]; cta: string }
  | { kind: 'list'; items: string[] }

export interface WStep {
  title: string
  desc: string
  you: string
  does: string
  stage: Stage
}

export interface WGoal {
  name: string
  blurb: string
  steps: WStep[]
}

export const GOALS: WGoal[] = [
  {
    name: 'Your first day',
    blurb: 'From a blank machine to a running dashboard — about ten minutes.',
    steps: [
      {
        title: 'Run one command',
        desc: 'Paste one line into your server\u2019s terminal. The installer takes about three minutes.',
        you: 'Run the command as root on a fresh Ubuntu or Debian machine.',
        does: 'Installs Docker if needed, pulls DockBit, opens the firewall ports and starts the platform.',
        stage: { kind: 'copy', cmd: INSTALL_CMD },
      },
      {
        title: 'Create the owner account',
        desc: 'Open the dashboard at the machine\u2019s IP address and register the owner — the account that can do everything.',
        you: 'Set the owner email and a password.',
        does: 'Creates the owner credential and opens your first session.',
        stage: {
          kind: 'form',
          fields: [
            { label: 'Email', value: 'you@company.com' },
            { label: 'Password', value: '\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022' },
          ],
          cta: 'Create account',
        },
      },
      {
        title: 'Activate your licence',
        desc: 'Paste the licence key from your email. The key decides how many machines and seats you can add.',
        you: 'Paste the key and confirm.',
        does: 'Verifies the key online and unlocks your seat count.',
        stage: {
          kind: 'form',
          fields: [{ label: 'Licence key', value: 'DB-XXXX-XXXX-XXXX' }],
          cta: 'Activate',
        },
      },
      {
        title: 'Follow the day-one order',
        desc: 'The order below is the shortest path from install to a live, backed-up app. Everything else can wait until tomorrow.',
        you: 'Work through the list in order.',
        does: 'Each step is covered by one of the goals on the left.',
        stage: {
          kind: 'list',
          items: [
            'install.sh',
            'Activate licence',
            'Register owner',
            'Add a second machine (wizard)',
            'Connect Cloudflare',
            'Create a project',
            'Deploy your first app',
            'Add a domain',
            'Register a backup destination',
            'Schedule backups',
            'Invite your team',
            'Connect Sage',
            'Enable uptime monitors',
          ],
        },
      },
    ],
  },
  {
    name: 'Put my app online',
    blurb: 'From git push to HTTPS in one flow.',
    steps: [
      {
        title: 'Open the New project wizard',
        desc: 'Projects \u2192 New project. Every app lives inside a project, grouped by client or product.',
        you: 'Press New project.',
        does: 'Opens the wizard: name, where it runs, review, done.',
        stage: { kind: 'shot', shot: 'projects', zoom: { x: 14, y: 8, w: 86, h: 70 }, ring: { x: 89.7, y: 19.7, w: 8.6, h: 5.5 }, cursor: { x: 94, y: 22.5 } },
      },
      {
        title: 'Name the project',
        desc: 'Usually the client or product it is for. Environment and logo are optional.',
        you: 'Type a name and continue.',
        does: 'Creates the project space, its network and a default environment.',
        stage: { kind: 'shot', shot: 'newproject', zoom: { x: 18, y: 12, w: 78, h: 82 }, ring: { x: 42, y: 38, w: 44.5, h: 5.5 }, cursor: { x: 64, y: 41 } },
      },
      {
        title: 'Push your code',
        desc: 'DockBit accepts a normal {Git} push — add the remote and push the branch you want live.',
        you: 'Add the remote and push.',
        does: 'Builds the image, rolls it out and watches the health check.',
        stage: { kind: 'copy', cmd: 'git push dockbit main' },
      },
      {
        title: 'Attach a domain',
        desc: 'Give the service a name on the internet. {DNS} checks and the {TLS} certificate are handled for you.',
        you: 'Type the domain and save.',
        does: 'Proves the domain, issues the certificate and routes the traffic.',
        stage: { kind: 'shot', shot: 'domains', zoom: { x: 14, y: 8, w: 86, h: 70 }, ring: { x: 89.5, y: 18.5, w: 9, h: 5.5 }, cursor: { x: 94, y: 21 } },
      },
      {
        title: 'Watch the deploy finish',
        desc: 'The deploy page shows the build, the rollout and the health check going green, in order.',
        you: 'Watch the timeline.',
        does: 'Keeps the previous version running until the new one answers, then switches over.',
        stage: { kind: 'shot', shot: 'deploys', zoom: { x: 14, y: 38, w: 86, h: 50 }, ring: { x: 16.5, y: 60.5, w: 80.5, h: 10.5 } },
      },
    ],
  },
  {
    name: 'Connect my server',
    blurb: 'Bring another machine under management in about a minute.',
    steps: [
      {
        title: 'Open the machine wizard',
        desc: 'Machines \u2192 Add machine. The wizard asks what the machine is for before anything touches it.',
        you: 'Choose Add machine and pick the machine\u2019s role.',
        does: 'Checks what the machine can run and suggests a role for it.',
        stage: { kind: 'shot', shot: 'machines', zoom: { x: 16, y: 6, w: 84, h: 64 }, ring: { x: 25.3, y: 20.5, w: 8.8, h: 5 }, cursor: { x: 30, y: 23.5 } },
      },
      {
        title: 'Paste the join command',
        desc: 'One command on the new machine — or lend its password once and DockBit drives the {SSH} session itself.',
        you: 'Run it as root on the new machine.',
        does: 'Installs the agent, joins the private network, and the machine appears on the Machines page within a minute.',
        stage: { kind: 'copy', cmd: 'curl -fsSL https://dockbit.clickbit.com.au/worker-install.sh | sudo bash' },
      },
      {
        title: 'Choose what runs there',
        desc: 'Place apps by node, by label or by group — heavy builds stay on the machine made for them.',
        you: 'Set a placement rule, or pick a machine per app.',
        does: 'Schedules the work and keeps it where you put it.',
        stage: {
          kind: 'list',
          items: [
            'Placement by deploy node',
            'Rules by node label or group',
            'Build machines keep heavy jobs off app nodes',
          ],
        },
      },
    ],
  },
  {
    name: 'Get a web address',
    blurb: 'Every domain your apps answer to, on one page.',
    steps: [
      {
        title: 'Open Domains',
        desc: 'One list for every name — which app each points at, and whether its certificate is healthy.',
        you: 'Open the Domains page.',
        does: 'Shows each domain, its target and its certificate state.',
        stage: { kind: 'shot', shot: 'domains', zoom: { x: 16, y: 4, w: 84, h: 82 } },
      },
      {
        title: 'Link Cloudflare',
        desc: 'Connect Cloudflare once and DockBit can prove every domain itself — no manual {DNS} records.',
        you: 'Paste a Cloudflare API token.',
        does: 'Creates the DNS records, proves the domain and issues certificates automatically.',
        stage: { kind: 'shot', shot: 'domains', zoom: { x: 14, y: 34, w: 86, h: 56 }, ring: { x: 85.5, y: 50.5, w: 12.5, h: 7 }, cursor: { x: 92, y: 54 } },
      },
      {
        title: 'Point it at a service',
        desc: 'Choose which app answers the name. Traffic and the certificate follow the service.',
        you: 'Type the domain and pick the service.',
        does: 'Routes the traffic and keeps the certificate renewed.',
        stage: {
          kind: 'form',
          fields: [
            { label: 'Domain', value: 'app.example.com' },
            { label: 'Service', value: 'shop-site \u00b7 port 443' },
          ],
          cta: 'Attach domain',
        },
      },
    ],
  },
  {
    name: 'Keep my data safe',
    blurb: 'Backups, destinations and the platform itself.',
    steps: [
      {
        title: 'Add a backup destination',
        desc: 'Storage \u2192 Backups \u2192 Add destination. Any {S3}-compatible bucket works — including your own {NAS} through something like MinIO.',
        you: 'Paste the endpoint, bucket and keys.',
        does: 'Tests the connection and keeps the keys on your machines, not ours.',
        stage: { kind: 'shot', shot: 'storage', zoom: { x: 16, y: 8, w: 84, h: 76 }, ring: { x: 51.5, y: 17, w: 10.5, h: 6.5 }, cursor: { x: 56, y: 21 } },
      },
      {
        title: 'Schedule the backups',
        desc: 'Pick what to back up and how often — apps, volumes and databases separately.',
        you: 'Choose the apps and the schedule.',
        does: 'Runs the backups, verifies each one and prunes copies past the keep limit.',
        stage: {
          kind: 'form',
          fields: [
            { label: 'Backup', value: 'shop-site \u00b7 volumes \u00b7 database' },
            { label: 'Schedule', value: 'Daily at 03:00 \u00b7 keep 14 days' },
          ],
          cta: 'Save schedule',
        },
      },
      {
        title: 'Protect the platform itself',
        desc: 'The DockBit database has its own backup path — protect it separately from app backups.',
        you: 'Add backup.platform as its own job.',
        does: 'A restore of backup.platform brings the whole platform back on a fresh machine.',
        stage: {
          kind: 'list',
          items: [
            'Platform database \u2192 its own backup.platform job',
            'Volumes can replicate node-to-node for extra disaster recovery',
            'Scheduled local copies work where {S3} is not available',
          ],
        },
      },
    ],
  },
  {
    name: 'Add my team',
    blurb: 'Four roles, enforced on the server.',
    steps: [
      {
        title: 'Invite people',
        desc: 'Team \u2192 Invite. They get an email and set their own password — you never see it.',
        you: 'Type their email and pick a role.',
        does: 'Sends the invite and creates the pending seat.',
        stage: {
          kind: 'form',
          fields: [
            { label: 'Email', value: 'sam@company.com' },
            { label: 'Role', value: 'Member' },
          ],
          cta: 'Send invite',
        },
      },
      {
        title: 'Choose the right role',
        desc: 'Each role is enforced server-side on every procedure — hiding a button is never the security.',
        you: 'Pick the smallest role that covers the job.',
        does: 'Rejects anything the role is not allowed to do, whoever asks.',
        stage: {
          kind: 'list',
          items: [
            'Owner — everything, including billing and the licence',
            'Admin — machines, apps and settings',
            'Member — deploy and manage their own projects',
            'Viewer — read-only dashboards and logs',
          ],
        },
      },
      {
        title: 'Turn on two-factor',
        desc: 'Account \u2192 Security \u2192 Two-factor. Required for Owner and Admin before they can act.',
        you: 'Press Turn on two-factor, then scan the code with an authenticator app.',
        does: 'Issues recovery codes and enforces the check at sign-in.',
        stage: { kind: 'shot', shot: 'home', zoom: { x: 20, y: 42, w: 80, h: 56 }, ring: { x: 87, y: 77, w: 9.5, h: 6 }, cursor: { x: 92, y: 80.5 } },
      },
    ],
  },
  {
    name: 'Publish my phone app',
    blurb: 'Builds on your own hardware, releases to the stores.',
    steps: [
      {
        title: 'Connect a build machine',
        desc: 'Macs and Windows machines join as {SSH} build nodes — they run builds, not {Swarm} apps.',
        you: 'Add machine \u2192 Build node, then paste the join command on the Mac or PC.',
        does: 'Queues builds to it and reports the results back.',
        stage: {
          kind: 'list',
          items: [
            'macOS runs the Xcode and iOS builds',
            'Windows runs the .NET and Windows builds',
            'Build nodes never join the app cluster',
          ],
        },
      },
      {
        title: 'Set up signing',
        desc: 'Store the signing keys once — every build after that is signed the same way.',
        you: 'Enter the bundle id, team id and upload the keys.',
        does: 'Keeps the keys on your build machine and signs each build.',
        stage: {
          kind: 'form',
          fields: [
            { label: 'Bundle id', value: 'com.company.app' },
            { label: 'Team id', value: 'ABCDE12345' },
          ],
          cta: 'Save signing',
        },
      },
      {
        title: 'Ship a release',
        desc: 'One release action per store; review status shows on the release page.',
        you: 'Choose the track and press release.',
        does: 'Uploads the signed build and watches the review state.',
        stage: {
          kind: 'list',
          items: [
            'TestFlight and the App Store',
            'Google Play tracks',
            'Changelog attached to every build',
          ],
        },
      },
    ],
  },
  {
    name: 'Ask AI for help',
    blurb: 'Sage reads your platform and proposes — you approve.',
    steps: [
      {
        title: 'Open Sage',
        desc: 'Sage reads your platform — machines, apps, deploys, logs — and answers in that context.',
        you: 'Ask in plain language.',
        does: 'Answers with what it found on your machines, not generic advice.',
        stage: { kind: 'shot', shot: 'assistant', zoom: { x: 14, y: 6, w: 86, h: 66 }, ring: { x: 37.8, y: 19, w: 59, h: 11 } },
      },
      {
        title: 'Approve the fix',
        desc: 'Sage can act, but nothing happens without an admin pressing Approve.',
        you: 'Read the proposed action and approve or reject it.',
        does: 'Explains what it wants to change and why, before it touches anything.',
        stage: { kind: 'shot', shot: 'assistant', zoom: { x: 22, y: 10, w: 78, h: 86 }, ring: { x: 38, y: 77.5, w: 58.5, h: 8.5 } },
      },
      {
        title: 'Set the guardrails',
        desc: 'Policies decide what Sage may propose — and what is always off limits.',
        you: 'Write the policies once.',
        does: 'Every proposed action is checked against them first, and lands in the audit log.',
        stage: {
          kind: 'list',
          items: [
            'Admin approval required for every action',
            'Policies scope what Sage can see and do',
            'Every action lands in the audit log',
          ],
        },
      },
    ],
  },
  {
    name: 'Keep DockBit updated',
    blurb: 'The platform updates itself — and can move house.',
    steps: [
      {
        title: 'Check for updates',
        desc: 'An Update available badge sits in the sidebar; Settings \u2192 Platform shows the current version, the next one and the release notes inline.',
        you: 'Press Update available, or open Settings \u2192 Platform.',
        does: 'Checks for a new version and shows what changed.',
        stage: { kind: 'shot', shot: 'home', zoom: { x: 0, y: 52, w: 100, h: 46 }, ring: { x: 2.2, y: 85.5, w: 11.5, h: 5.5 }, cursor: { x: 8, y: 89 } },
      },
      {
        title: 'Update in one click',
        desc: 'On multi-manager platforms the update rolls — three managers keep a raft quorum while each updates in turn.',
        you: 'Press Update once.',
        does: 'Updates workers first and managers last, and rolls back a node if it fails.',
        stage: {
          kind: 'list',
          items: [
            'Workers first, managers last',
            'Raft quorum keeps the dashboard alive',
            'Automatic rollback if a node fails',
          ],
        },
      },
      {
        title: 'Move to a new machine',
        desc: 'Restoring backup.platform onto a fresh machine migrates the whole platform — apps, domains and team included.',
        you: 'Install DockBit on the new machine and restore the backup.',
        does: 'Re-registers machines and re-issues what the new machine needs.',
        stage: {
          kind: 'list',
          items: [
            'Install DockBit on the new machine',
            'Restore backup.platform',
            'Retire the old machine when it checks out',
          ],
        },
      },
    ],
  },
]

/* ---- glossary -------------------------------------------------- */

export const GLOSS: Record<string, string> = {
  Git: 'The version-control system your code already lives in.',
  SSH: 'A secure shell connection — how DockBit reaches your other machines.',
  TLS: 'The padlock on HTTPS. Certificates are issued and renewed for you.',
  DNS: 'The internet\u2019s address book — turns names into your machine\u2019s IP.',
  S3: 'The standard storage API most object storage — and a NAS via MinIO — speaks.',
  Swarm: 'Docker\u2019s built-in way of running containers across many machines.',
  NAS: 'Network-attached storage — a disk box on your own network.',
}

/* Splits "text with a {Term}" into plain and glossary-marked parts. */
export interface GlossPart {
  text: string
  term?: string
}
export function parseGloss(text: string): GlossPart[] {
  const parts: GlossPart[] = []
  const re = /\{(\w+)\}/g
  let last = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push({ text: text.slice(last, m.index) })
    if (GLOSS[m[1]]) parts.push({ text: m[1], term: m[1] })
    else parts.push({ text: m[0] })
    last = m.index + m[0].length
  }
  if (last < text.length) parts.push({ text: text.slice(last) })
  return parts
}

/* ---- navigation ------------------------------------------------ */

export function stepAt(gi: number, si: number, dir: 1 | -1, goals: WGoal[] = GOALS): { gi: number; si: number } {
  const n = goals.length
  if (dir > 0) {
    if (si + 1 < goals[gi].steps.length) return { gi, si: si + 1 }
    return { gi: (gi + 1) % n, si: 0 }
  }
  if (si > 0) return { gi, si: si - 1 }
  const prev = (gi - 1 + n) % n
  return { gi: prev, si: goals[prev].steps.length - 1 }
}

export const STAGE_ASPECT = 16 / 9

/* ---- screenshot zoom --------------------------------------------
   The shot layer is sized to the image's own aspect ratio and so is the
   stage, so at scale 1 the screenshot renders ~1:1 and sharp. Instead of
   a CSS transform (which would raster the image small and upscale it in
   the compositor — blurry), the shot div is laid out at `scale ×` the
   stage size and panned with left/top percents, so the browser paints
   the image at its true display size. `scale = 100 / zoom.w` fills the
   stage width with the zoom box; vertically the box is centred and
   clamped so the image always covers the stage. All values in percent
   of the stage (left/top) and of the stage width (width). */
export interface ShotLayout {
  scale: number
  left: number
  top: number
  width: number
}

export function computeShotLayout(
  zoom: Box | undefined,
  imgAspect: number,
  stageAspect: number = STAGE_ASPECT,
): ShotLayout {
  if (!zoom) return { scale: 1, left: 0, top: 0, width: 100 }
  const s = 100 / zoom.w
  const k = stageAspect / imgAspect
  const visibleY = 100 / (s * k)
  let y = zoom.y + zoom.h / 2 - visibleY / 2
  y = Math.min(Math.max(y, 0), Math.max(100 - visibleY, 0))
  return { scale: s, left: -zoom.x * s, top: -y * s * k, width: s * 100 }
}
