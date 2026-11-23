# DockBit landing page

Multi-page marketing site built from `dockbit-landing-draft-3.html` — same copy,
design and interactions, split across routes.

## Stack

- Vite + React 19 + TypeScript
- `vite-react-ssg` — every route is prerendered to static HTML in `dist/`
- `react-router-dom` v6
- Plain CSS (the draft's design tokens and class names, consolidated)
- Self-hosted fonts (Sora + Geist Mono via Fontsource)

## Commands

```bash
npm run dev        # dev server (CSR)
npm run build      # prerender all routes to dist/ + sitemap + 404
npm run preview    # serve the production build locally
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
npm test           # vitest
```

## Pages

| Route | Source section in the draft |
|---|---|
| `/` | Hero, Problem, page index cards, 08 Start here, final CTA |
| `/deploy` | 01 Deploy + Marketplace |
| `/machines` | 02 Machines & network |
| `/domains` | 03 Public access (uptime ticks) |
| `/backups` | 04 Storage & backups (restore slider) |
| `/security` | 05 Security & Sage (rings, approval gate) |
| `/mobile` | 06 DockBit mobile |
| `/tour` | 07 Product tour (8 areas × 4 steps) |
| `/get-started` | 08 Start here + 09 Beyond the basics |
| `*` / `404.html` | Branded 404 |

## To go live

1. `npm run build` → upload `dist/` to any static host (works with directory
   indexes, e.g. `/deploy/index.html`).
2. Point `dockbit.clickbit.com.au` at it — **but note that host already serves
   `/install.sh`; keep that endpoint working** (proxy it or move the installer).
3. Put official badge SVGs in `public/badges/` and set `APP_STORE_URL` /
   `PLAY_STORE_URL` in `src/data/site.ts` — until then the badges render a
   "Coming soon" pill.
