# DockBit landing page — agent notes

Multi-page static marketing site, ported 1:1 from
`dockbit-landing-draft-3.html` (in the user's Downloads). Copy, colours,
numbers and interactions must stay identical to the draft — do not "improve"
marketing text. New elements are limited to: page-index cards on Home
(laid out as an animated infographic timeline — `src/components/TimelineRow.tsx`
+ `src/components/TourCap.tsx` + `src/components/viz/*` square line-art
scenes; play once on scroll-in via `useInView` in `src/lib/` + the `.in` class),
the mobile nav menu, the 404 page, SEO tags, the interactive deploy
pipeline on /deploy (source ports are buttons that re-run the 5-stage
animation; per-source stage copy + timing in `src/lib/deployPipeline.ts`),
and the `autoplan` failure
terminal on Home (`src/components/ChaosTerm.tsx` — replaces the draft's
chip-scatter "before" panel; transcript + playback live in
`src/lib/autoplanScript.ts`).
The Marketplace block on /deploy was later replaced (user request) with a
3-screen click-through demo with two modes: install an app
(pick → install → password) or connect a service you already run
(pick → checking → connected; Supabase/Git/S3/registry/Cloudflare/
notifications). `src/components/MarketplaceDemo.tsx`, catalog + service
data and helpers in `src/lib/marketplaceDemo.ts`, styles prefixed `mk-`
in `src/styles/sections.css`. Its app list and blurbs come from the
user's reference demo, not the draft.
The Machines section on /machines was likewise replaced (user request)
with the reference's five-step tour — `src/components/MachineTour.tsx`
(steps accordion + fleet stage that switches slice per step; autoplay
7s/step, repair lands at 3.2s on step 5, picking a step stops autoplay),
data in `src/lib/machines.ts`, `mt-` styles in `src/styles/sections.css`
(reference orange→`--bit`, cyan→`--brand`). Its copy comes from the
user's reference file, not the draft; the old skyline/verbs block is gone.
The /tour page has two pieces: the original 8-area product tour
(`src/sections/Tour.tsx`, copy still verbatim in `src/data/tour.ts`)
restyled to the reference's rail + step-path layout, and a new
"Pick a goal" walkthrough after it — `src/components/GoalWalkthrough.tsx`,
goal/step data + zoom math + glossary in `src/lib/walkthrough.ts`,
`gw-` styles in `src/styles/sections.css`. Its stage uses real dashboard
screenshots in `public/tour/` (the `SHOTS` manifest maps shot keys to
files; `scripts/extract-tour-shots.mjs` can pull more out of the
reference HTML). Both panels use only ink + `--brand` + `--bit`.

## Commands

- `npm run dev` — dev server
- `npm run build` — `vite-react-ssg build` → `dist/`, then `scripts/postbuild.mjs` writes `sitemap.xml` + `404.html` and runs a link check
- `npm run preview`, `npm run typecheck`, `npm run lint`, `npm test`

## Conventions

- Styling is plain global CSS using the draft's class names, in
  `src/styles/` (`tokens.css` has `:root` + `.dk` theme scopes).
- `.dk` objects (rack, phone, chassis, tour panels) stay dark in both
  modes — the FinalCta `.faceplate`/`.power` now also stays dark in both
  modes (user request): `#101820` panel with hardcoded dark colours in
  the base rules (was theme-aware until Nov 2026).
- New components should reuse the draft's tokens (`var(--brand)`, etc.).
- Per-page meta lives in `src/data/seo.ts` (`PAGE_META`), rendered by
  `<Seo path="…" />` via vite-react-ssg `<Head>`.
- Interactive widgets keep the draft's exact behaviour; pure logic lives in
  `src/lib/` (tested in `src/test/`).
- SSR-safety: no `window`/`document` outside effects/handlers; no `Date` in render.
- Store badge URLs sit in `src/data/site.ts`; empty → "Coming soon" pill.
- This folder syncs to OneDrive — `node_modules` ops are slow; be patient.

## Dependency notes

- `react-router-dom` is pinned to v6 (peer requirement of `vite-react-ssg` 0.9.x).
- `@vitejs/plugin-react` 6.x expects Vite 8 (rolldown); do not downgrade Vite below 8.
- Package versions were chosen for ≥7-day publish age — keep that policy when bumping.
