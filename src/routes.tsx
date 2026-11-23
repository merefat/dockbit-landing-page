import type { RouteRecord } from 'vite-react-ssg'
import Layout from './components/Layout'
import Home from './pages/Home'
import DeployPage from './pages/DeployPage'
import MachinesPage from './pages/MachinesPage'
import DomainsPage from './pages/DomainsPage'
import BackupsPage from './pages/BackupsPage'
import SecurityPage from './pages/SecurityPage'
import MobilePage from './pages/MobilePage'
import TourPage from './pages/TourPage'
import GetStartedPage from './pages/GetStartedPage'
import NotFound from './pages/NotFound'

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'deploy', element: <DeployPage /> },
      { path: 'machines', element: <MachinesPage /> },
      { path: 'domains', element: <DomainsPage /> },
      { path: 'backups', element: <BackupsPage /> },
      { path: 'security', element: <SecurityPage /> },
      { path: 'mobile', element: <MobilePage /> },
      { path: 'tour', element: <TourPage /> },
      { path: 'get-started', element: <GetStartedPage /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]
