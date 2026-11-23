/* One-off: pull the base64 <img> screenshots out of the user's reference
   HTML and write them to public/tour/ as real files.

   Usage:
     node scripts/extract-tour-shots.mjs <path-to-reference.html>

   Each data-URI is matched to a shot key (home, deploys, deploysvc,
   machines, domains, storage, assistant, newproject) by looking at the
   markup just before it — an attribute value, alt text or filename that
   contains the key. Unmatched images land in public/tour/shot-NN.<ext>
   so they can be renamed by hand. */
import fs from 'node:fs'
import path from 'node:path'

const KEYS = ['home', 'deploys', 'deploysvc', 'machines', 'domains', 'storage', 'assistant', 'newproject']
const EXT = { 'image/png': 'png', 'image/jpeg': 'jpg', 'image/webp': 'webp', 'image/gif': 'gif', 'image/svg+xml': 'svg' }

const file = process.argv[2]
if (!file) {
  console.error('usage: node scripts/extract-tour-shots.mjs <reference.html>')
  process.exit(1)
}
const html = fs.readFileSync(path.resolve(file), 'utf8')
const outDir = path.resolve('public/tour')
fs.mkdirSync(outDir, { recursive: true })

const re = /data:(image\/[a-z+]+);base64,([A-Za-z0-9+/=]+)/g
const seen = new Set()
let m
let n = 0
let unnamed = 0
while ((m = re.exec(html)) !== null) {
  const ext = EXT[m[1]] ?? 'bin'
  const ctx = html.slice(Math.max(0, m.index - 400), m.index)
  let key = KEYS.find((k) => new RegExp(`["'\\s/>_-]${k}["'\\s.<_-]`, 'i').test(ctx) || ctx.toLowerCase().includes(`${k}.`))
  if (!key) key = `shot-${String(++unnamed).padStart(2, '0')}`
  if (seen.has(key)) key = `${key}-${++unnamed}`
  seen.add(key)
  const buf = Buffer.from(m[2], 'base64')
  const dest = path.join(outDir, `${key}.${ext}`)
  fs.writeFileSync(dest, buf)
  n++
  console.log(`${key}.${ext}  ${(buf.length / 1024).toFixed(0)} KB`)
}
console.log(`\n${n} image(s) written to ${outDir}`)
if (unnamed > 0) console.log('Some images could not be matched to a shot key — rename them and update SHOTS in src/lib/walkthrough.ts.')
