import { SITE_URL } from './site'

export { SITE_URL }

export interface PageMeta {
  title: string
  description: string
}

export const PAGE_META: Record<string, PageMeta> = {
  '/': {
    title: 'DockBit — Self-hosted PaaS on your own servers',
    description:
      'DockBit deploys, monitors and manages your websites, apps, databases and mobile apps on servers you own. On the web, App Store and Google Play.',
  },
  '/deploy': {
    title: 'Deploy — DockBit',
    description:
      'Push to Git and it’s live in about 30 seconds. The new version must pass its health check before the old one stops, and failed rollouts roll themselves back.',
  },
  '/machines': {
    title: 'Machines & network — DockBit',
    description:
      'Run one bootstrap script and a server joins. Several machines act as one Swarm cluster with live CPU, memory and disk, placement rules and an SSH terminal in the browser.',
  },
  '/domains': {
    title: 'Domains & uptime — DockBit',
    description:
      'Type a hostname, pick the app. The DNS record and a free SSL certificate happen on their own, with no router setup if you use a tunnel.',
  },
  '/backups': {
    title: 'Storage & backups — DockBit',
    description:
      'Every backup by project, coverage gaps flagged, failing jobs explained. Restore in one click, or run a test restore first.',
  },
  '/security': {
    title: 'Security & Sage — DockBit',
    description:
      'Standalone sign-in with no outside provider, secrets encrypted with AES-256-GCM, and an assistant that proposes changes but waits for your yes.',
  },
  '/mobile': {
    title: 'DockBit mobile',
    description:
      'A quick view of your servers when you are away from your desk. Check what is healthy, catch an alert and take action without opening a laptop.',
  },
  '/tour': {
    title: 'Product tour — DockBit',
    description:
      'Select an area of DockBit. The steps below show what you actually do, from the first click to the finished result.',
  },
  '/get-started': {
    title: 'Get started — DockBit',
    description:
      'Six steps from blank server to production. The first install takes about five minutes, and the first user becomes the owner.',
  },
  '404': {
    title: 'Page not found — DockBit',
    description: 'That page isn’t in the rack.',
  },
}
