/* One-off: 2x upscale + sharpen the dashboard screenshots in
   public/tour/. The pasted sources are 1024px and look soft when the
   walkthrough zooms; doubling them with a lanczos resample + unsharp
   mask lets the browser downscale (crisp) instead of upscale (blur).

   Usage: node scripts/upscale-tour-shots.mjs
   Then update the w/h in SHOTS (src/lib/walkthrough.ts) — this script
   prints the new sizes. */
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const dir = path.resolve('public/tour')
for (const f of fs.readdirSync(dir).filter((f) => f.endsWith('.png'))) {
  const src = path.join(dir, f)
  const img = sharp(src)
  const meta = await img.metadata()
  const w = meta.width * 2
  const h = meta.height * 2
  await img
    .resize({ width: w, height: h, kernel: 'lanczos3' })
    .sharpen({ sigma: 1.1, m1: 1.0, m2: 0.4 })
    .png({ compressionLevel: 9 })
    .toFile(src + '.tmp')
  fs.renameSync(src + '.tmp', src)
  const kb = (fs.statSync(src).size / 1024).toFixed(0)
  console.log(`${f}  ${meta.width}x${meta.height} -> ${w}x${h}  ${kb} KB`)
}
console.log('\nUpdate the w/h values in SHOTS (src/lib/walkthrough.ts) to the new sizes.')
