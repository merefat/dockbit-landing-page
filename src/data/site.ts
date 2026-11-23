export const SITE_URL = 'https://dockbit.clickbit.com.au'
export const SITE_NAME = 'DockBit'
export const TAGLINE = 'Self-hosted app platform.'
export const COPYRIGHT = '© 2026 DockBit · Built by ClickBIT'

export const INSTALL_CMD = 'curl -fsSL https://dockbit.clickbit.com.au/install.sh | sudo bash'

// Leave empty until the store listings exist — badges render a "coming soon" pill.
export const APP_STORE_URL = ''
export const PLAY_STORE_URL = ''

export const NAV_LINKS = [
  { to: '/deploy', label: 'Deploy' },
  { to: '/machines', label: 'Machines' },
  { to: '/domains', label: 'Domains' },
  { to: '/backups', label: 'Backups' },
  { to: '/mobile', label: 'Mobile' },
  { to: '/tour', label: 'Product tour' },
] as const

// Same link set as the draft footer.
export const FOOTER_LINKS = [
  { to: '/deploy', label: 'Deploy' },
  { to: '/machines', label: 'Machines' },
  { to: '/domains', label: 'Domains' },
  { to: '/mobile', label: 'Mobile' },
  { to: '/get-started', label: 'Get started' },
] as const
