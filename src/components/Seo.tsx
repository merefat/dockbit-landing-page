import { Head } from 'vite-react-ssg'
import { PAGE_META, SITE_URL } from '../data/seo'

export default function Seo({ path }: { path: string }) {
  const meta = PAGE_META[path] ?? PAGE_META['/']
  const url = SITE_URL + (path === '/' ? '/' : path)
  return (
    <Head>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="DockBit" />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={`${SITE_URL}/logo.png`} />
      <meta name="twitter:card" content="summary" />
    </Head>
  )
}
