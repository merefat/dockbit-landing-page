import type { ReactElement } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'

// vite-react-ssg's <Head> needs the helmet provider it creates internally;
// head tags are verified separately, so stub it out for markup tests.
vi.mock('vite-react-ssg', () => ({ Head: () => null }))
import Home from '../pages/Home'
import DeployPage from '../pages/DeployPage'
import MachinesPage from '../pages/MachinesPage'
import DomainsPage from '../pages/DomainsPage'
import BackupsPage from '../pages/BackupsPage'
import SecurityPage from '../pages/SecurityPage'
import MobilePage from '../pages/MobilePage'
import TourPage from '../pages/TourPage'
import GetStartedPage from '../pages/GetStartedPage'
import NotFound from '../pages/NotFound'

const cases: [string, () => ReactElement, string][] = [
  ['/', Home, 'Your servers.'],
  ['/deploy', DeployPage, 'Plug in a source.'],
  ['/machines', MachinesPage, 'Three boxes in a closet'],
  ['/domains', DomainsPage, 'Every part of a URL has a job.'],
  ['/backups', BackupsPage, 'Know which layer your data lives on'],
  ['/security', SecurityPage, 'Access works in rings.'],
  ['/mobile', MobilePage, 'Your infrastructure.'],
  ['/tour', TourPage, 'Choose a task.'],
  ['/get-started', GetStartedPage, 'Six steps from blank server'],
  ['/404', NotFound, 'This slot is'],
]

describe('pages prerender (renderToStaticMarkup parity with SSG)', () => {
  for (const [path, Page, needle] of cases) {
    it(`${path} renders its heading`, () => {
      const html = renderToStaticMarkup(
        <StaticRouter location={path}>
          <Page />
        </StaticRouter>,
      )
      expect(html).toContain(needle)
    })
  }
})
