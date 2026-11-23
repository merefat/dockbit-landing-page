import { ViteReactSSG } from 'vite-react-ssg'
import '@fontsource-variable/sora'
import '@fontsource-variable/geist-mono'
import './styles/tokens.css'
import './styles/base.css'
import './styles/sections.css'
import { routes } from './routes'

export const createRoot = ViteReactSSG({ routes })
