import fs from 'node:fs'
import path from 'node:path'

const DIST = path.resolve('dist')
const SITE_URL = 'https://dockbit.clickbit.com.au'
const ROUTES = [
  '/',
  '/deploy',
  '/machines',
  '/domains',
  '/backups',
  '/security',
  '/mobile',
  '/tour',
  '/get-started',
]

// sitemap.xml
const urls = ROUTES.map(
  (r) => `  <url><loc>${SITE_URL}${r === '/' ? '/' : r}</loc></url>`,
).join('\n')
fs.writeFileSync(
  path.join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
)

// 404.html — static, same visual language as the site
fs.copyFileSync(path.resolve('scripts/404.html'), path.join(DIST, '404.html'))

// Internal link check — collect href/src targets from every emitted page
function* htmlFiles(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) yield* htmlFiles(p)
    else if (e.name.endsWith('.html')) yield p
  }
}

const hrefRe = /(?:href|src)="([^"]+)"/g
const idRe = /id="([^"]+)"/g
const problems = []
const files = [...htmlFiles(DIST)]

for (const file of files) {
  const html = fs.readFileSync(file, 'utf8')
  for (const m of html.matchAll(hrefRe)) {
    const url = m[1]
    if (
      url.startsWith('http') ||
      url.startsWith('mailto:') ||
      url.startsWith('tel:') ||
      url.startsWith('data:') ||
      url.startsWith('javascript:')
    )
      continue
    const [p, hash] = url.split('#')
    const target = p || '/' // bare "#id"
    const abs = p === '' ? file : path.join(DIST, target.replace(/^\//, ''))
    const exists =
      fs.existsSync(abs) ||
      fs.existsSync(path.join(abs, 'index.html')) ||
      fs.existsSync(abs + '.html')
    if (p !== '' && !exists) {
      problems.push(`${path.relative(DIST, file)}: missing target ${url}`)
      continue
    }
    if (hash) {
      const targetHtml = fs.readFileSync(
        exists && fs.statSync(abs).isDirectory() ? path.join(abs, 'index.html') : abs,
        'utf8',
      )
      const ids = new Set([...targetHtml.matchAll(idRe)].map((x) => x[1]))
      if (!ids.has(hash)) problems.push(`${path.relative(DIST, file)}: no #${hash} in ${target}`)
    }
  }
}

if (problems.length) {
  console.warn('Link check warnings:')
  for (const p of problems) console.warn('  ' + p)
} else {
  console.log('Link check: all internal hrefs resolve')
}
console.log('postbuild: sitemap.xml + 404.html written')
