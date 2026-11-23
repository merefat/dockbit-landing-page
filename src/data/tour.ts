export interface TourFeature {
  name: string
  title: string
  desc: string
  steps: [string, string][]
}

export const TOUR_FEATURES: Record<string, TourFeature> = {
  deploy: {
    name: 'Deploy',
    title: 'Deploy an app',
    desc: 'Take an app from source code to a running service.',
    steps: [
      ['Choose a source', 'Start with a Git repository, a Docker image, a Compose file or an app from the Marketplace. DockBit uses that source to create the service on your own machine.'],
      ['Configure the app', 'Add environment variables, attach persistent storage, set resource limits and choose a health check. These settings travel with the app.'],
      ['Build and release', 'DockBit builds the new version and starts it alongside the current one. The new version must pass its health check before traffic moves across.'],
      ['Operate with confidence', 'Follow live logs, open a terminal, restart the service or roll back to the previous working release from the same app page.'],
    ],
  },
  machine: {
    name: 'Machines',
    title: 'Bring a server under management',
    desc: 'Connect the hardware you already own and decide what runs on it.',
    steps: [
      ['Connect the server', 'Run the DockBit bootstrap command on your Linux server. Once it registers, the machine appears in your dashboard and can receive workloads.'],
      ['See its condition', 'Open the machine to check live CPU, memory and disk use alongside its services and cluster connection.'],
      ['Place your apps', 'Choose which machine should run an app. Use labels and node roles to keep workloads where they belong.'],
      ['Maintain it safely', 'Prepare a node for maintenance, drain its workloads, apply the update and bring it back into service.'],
    ],
  },
  domain: {
    name: 'Domains',
    title: 'Put an app on the internet',
    desc: 'Give a service a public address, then keep an eye on it.',
    steps: [
      ['Choose a hostname', 'Enter the domain you want and select the app that should receive its traffic.'],
      ['Secure the connection', 'DockBit configures the route and can issue a free Let’s Encrypt certificate. Use a Cloudflare Tunnel when you do not want to expose a server port.'],
      ['Set the health check', 'Monitor the address using HTTP, keyword, TCP, ping or DNS checks so you know when it stops responding.'],
      ['Respond to incidents', 'Review the incident, certificate warning or status-page update in DockBit and follow the service back to its source.'],
    ],
  },
  storage: {
    name: 'Backups',
    title: 'Protect app data',
    desc: 'Keep persistent data backed up and make recovery a deliberate process.',
    steps: [
      ['Choose where data lives', 'Attach a volume or use supported NAS and S3-compatible storage such as S3, R2 or MinIO.'],
      ['Set a backup schedule', 'Choose when backups run and how long they are retained, using local or S3-compatible destinations.'],
      ['Check backup coverage', 'See which apps are covered and which jobs have failed, so missing protection is visible.'],
      ['Restore with confidence', 'Choose a restore point. Test the restore first when needed, then bring the data back to the service.'],
    ],
  },
  security: {
    name: 'Access',
    title: 'Control who can do what',
    desc: 'Manage team access and credentials from the platform you operate.',
    steps: [
      ['Invite your team', 'Add people by email and assign an appropriate role instead of sharing one administrator login.'],
      ['Protect sign-in', 'Use password sign-in with options such as TOTP, passkeys and trusted-device controls.'],
      ['Manage credentials', 'Create API and SSH keys, and keep application secrets encrypted rather than scattering them across notes and terminals.'],
      ['Review activity', 'Check sessions and recorded changes to understand who accessed the platform and what was changed.'],
    ],
  },
  release: {
    name: 'Mobile',
    title: 'Manage mobile releases',
    desc: 'Keep the mobile app release workflow close to the services it depends on.',
    steps: [
      ['Register the app', 'Keep the app’s bundle identifier and its App Store and Google Play records together in DockBit.'],
      ['Prepare signing', 'Manage the certificates, provisioning profiles and keys needed for a signed build.'],
      ['Test a build', 'Move a build into TestFlight or Play testing and track its testing status and feedback.'],
      ['Handle the release', 'Submit the build, follow review status and manage supported over-the-air updates.'],
    ],
  },
  ai: {
    name: 'Sage',
    title: 'Ask Sage for help',
    desc: 'Use AI to understand an issue and propose a change, with approval in your hands.',
    steps: [
      ['Ask in plain language', 'Open Sage from the platform and describe what you need without first finding the right command or page.'],
      ['Understand the issue', 'Sage can use relevant logs, health information and metrics to help explain what is happening.'],
      ['Review a proposal', 'Get a concrete plan or an agent-assisted code change. Review the suggested diff or pull request before it moves forward.'],
      ['Approve the action', 'Your configured policies and approval rules determine which actions can be applied. You remain in control of changes.'],
    ],
  },
  platform: {
    name: 'Platform',
    title: 'Keep DockBit itself running',
    desc: 'Install, update and move the control plane you use to manage everything else.',
    steps: [
      ['Install DockBit', 'Run the installer on a server you control. The first account becomes the platform owner.'],
      ['Update with a fallback', 'Apply a DockBit update from the platform, then use rollback if the health check does not pass.'],
      ['Route notifications', 'Send platform alerts to the notification channels you have configured, including email and supported chat services.'],
      ['Move to new hardware', 'Prepare a move, transfer the platform data, verify the new host and switch over.'],
    ],
  },
}

export const TOUR_KEYS = Object.keys(TOUR_FEATURES)
