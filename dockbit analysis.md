# dockbit — Complete Feature Usage Guide

## 0. Getting started

| Feature | How to use it |
|---|---|
| Login | Go to http://your-server:3000/login. Dev: owner@dev.local / password123. |
| Global search | Press ⌘K (or Ctrl+K) anywhere — type a service, node, domain, or a question like "which node is clickbit running on". |
| License activation | Production only: enter CD-TIER-… key at /activate. Dev mode bypasses it automatically. |
| First-time setup | After register, the local machine auto-registers as manager node; Traefik + registry auto-deploy. Check Machines to confirm. |

## 1. Shipping things — sidebar New

| Feature | How to use it |
|---|---|
| Deploy from Git | New › App from your code → pick Git repository → choose repo + branch → pick build (Dockerfile/Nixpacks) → env vars → node → Deploy. Auto-deploys on every push (30s poller). |
| Deploy a Docker image | Same wizard → Docker image → image:tag → optional registry credentials → Deploy. |
| Deploy a Compose stack | Same wizard → Docker Compose → paste/upload compose YAML + .env → Deploy. |
| One-click catalog app | New › From the catalog → search/filter → pick (Supabase, MinIO, n8n…) → fill required fields → Deploy. Secrets auto-generate. |
| Managed database | New › Database → pick Postgres/MySQL/MariaDB/MongoDB/Redis → credentials + volume → Deploy. Access panel shows connection string. |
| Custom catalog app | New › Catalog → Add custom app → name + compose manifest → it joins your catalog. |
| New project | New › Project → name, environment, shared env vars, node-pool restriction, logo. |
| Add catalog pack | Settings or catalog page → Add source → paste remote JSON pack URL → Refresh. Remote slugs override built-ins. |
| Docker Hub fallback | In the app wizard → image search box searches Docker Hub directly. |

## 2. Apps — Projects › Apps → open a service

| Feature | How to use it |
|---|---|
| Access info | Service page → Access panel: URL, ports, credentials, routing mode. |
| Deploy / Rebuild / Restart / Stop / Start | Top action buttons on the service page. Rebuild reuses code (no git pull); Restart force-updates containers; Stop scales to 0. |
| Env vars | Service → Settings → Environment. Encrypted at rest; injected at deploy. Redeploy to apply. |
| Add a domain | Service → Domains → Add domain → hostname → auto Traefik route + SSL. |
| Domain middlewares | Domain row → edit → CORS, rate limit, basic auth, IP allowlist, headers, HTTPS redirect, SSL mode. |
| Tunnel origin mode | Domain → Origin mode → direct (node host port) or traefik (overlay, zero-downtime deploys). |
| Expose on host port | Service → Expose → publish a port on the node IP — no domain/DNS/cert needed. |
| Logs | Service → Logs tab — live container logs. |
| Stats / health | Service → live CPU/memory per container + desired-vs-running task health. |
| Terminal | Service → get running container → open shell (/ws/terminal via xterm). |
| Cron job | Service → Cron → New → cron expression + command → runs via docker exec; Run now triggers immediately. |
| Secrets (Swarm) | Service → Secrets → mount Docker secrets/configs; content encrypted. |
| Secret rotation | Service → Security → Secret rotation: rotate now (regenerates env-safe secrets), Link dependent (bind provider key → consumer env), Auto-rotate policy 7–365d. Volume-bound DB passwords are detected and skipped. |
| Preview environment | Service → Previews → Create — ephemeral service+domain+deploy per PR; Destroy cleans it all. |
| Dev mode | Service → Enable dev mode — local working copy live-syncs into the container; Disable redeploys from source. |
| Clone / Move | Service → Settings → clone into any project, or Move to project. |
| Supabase OAuth | Service → Settings → Supabase OAuth → one-click provider config. |
| Diagnostics | Service → Diagnostics — configured vs actual placement + replica state. |
| Delete | Service → Settings → Delete (admin/owner). Compose stacks run docker stack rm cleanly. |

## 3. Deploys — sidebar Deploys

| Feature | How to use it |
|---|---|
| Deployment history | /dashboard/deployments — all deploys: status, trigger (git_push/manual/webhook), commit, duration. |
| Build log | Deployment row → open — live streamed build+deploy output. |
| Cancel | Running deployment → Cancel — kills the SSH build process. |
| Rollback | Service → Deployments → pick a past deploy → Preview rollback (diff) → Rollback — replays stored snapshot. |
| Cleanup | Service → Deployments → Cleanup — keep only N most recent. |
| Auto-deploy | Enabled per service — git poller detects new commits; or add a GitHub webhook secret for instant triggers. |

## 4. Machines — sidebar Machines

| Feature | How to use it |
|---|---|
| Add a node | Machines › Add node (/dashboard/nodes?add=1) → wizard probes the host (SSH) → suggests role → inject key → installs Docker → joins Swarm → registers. |
| Join token (workers) | Node page or infra → Create join token → run the generated script on the worker → it self-registers + joins Swarm. |
| Onboarding checklist | Node → Onboarding — SSH/Docker/Swarm/Tailscale/resource checks with pass/warn/fail. |
| Node detail | Node row → live CPU/mem/disk sparklines, heartbeats, services on it, SSH terminal. |
| Park a node | Node → Park — drains Swarm, evacuates services, stops monitoring. Unpark restores. |
| Inventory-only | Node → toggle — for SSH-less boxes (BMC/firewalled); skips heartbeat/metrics. |
| Bootstrap | Node → Bootstrap — first-contact: install Docker → join Swarm → register. |
| Tailscale | Node → Tailscale panel → install/authenticate/disconnect; key-expiry alerts ≤14 days. |
| Hardware | ?panel=hardware — BMC/IPMI temps, fans, power draw. |
| Cooling profiles | ?panel=cooling — create temperature→fan-speed curves; apply to a node's BMC. |
| Software updates | ?panel=software — Docker/Tailscale/toolchain versions; update OS packages on all nodes. |
| Sites / network groups | ?panel=sites — create named node groups → bind projects → set failover delay; Preview failover (dry-run), Failover now, Failback now, HA event history. |
| Swarm panel | ?panel=swarm — raw Swarm members, unmanaged services, per-task health, remove orphan services/nodes. |
| Overlay repair | ?panel=overlay — data-path health per manager; Repair restarts Docker (~1–2 min blip). |
| Port map | ?panel=ports — every published host port across the cluster; check availability before exposing. |
| Self-heal rules | ?panel=selfheal — auto-remediation policies + cooldowns. |
| VMs & workspaces | ?view=guests — Incus containers/VMs; create workspace, open console. |
| Migrate a service | Service → Migrate → pick target node → watch progress → apply DNS instructions. |
| Move the platform | Settings → Move DockBit (/dashboard/migration) — guided whole-platform move to another machine. |

## 5. Domains — sidebar Domains

| Feature | How to use it |
|---|---|
| Hostnames | /dashboard/domains — every domain with its hop chain (DNS → edge → tunnel → app). Add domain (?add=1). |
| Adopt a hostname | ?adopt=1 — bring an existing Cloudflare-tunnel hostname under management without dropping traffic. |
| DNS check | Domain row → Check DNS — reports tunnel-CNAME vs A-record vs unresolvable. |
| Zones | ?view=zones — Cloudflare zones: DNS record CRUD, SSL mode (Full Strict/Flexible), Always-HTTPS, Bot Fight Mode. |
| Tunnels | ?view=tunnels — create tunnel → Add route (hostname → service; writes DNS + config automatically) → reveal connector token → Heal a broken origin. Import an existing tunnel. |
| Reverse proxy | ?chip=proxy — create proxy host → forward external traffic to any service/upstream. |

## 6. Uptime — Domains › Uptime

| Feature | How to use it |
|---|---|
| Create monitor | Uptime → New monitor → type (HTTP/keyword/TCP/ping/DNS) → target → interval, timeout, retries. |
| Heartbeats & stats | Monitor row — 24h/30d availability, heartbeat history, TLS expiry countdown. |
| Incidents | Outages open automatically after retries; Acknowledge marks human-seen; they close on recovery. |
| Check now | Monitor → Check now — immediate probe, bypasses interval. |
| Pause/resume | Set enabled — pausing closes open incidents. |
| Status pages | ?view=status → New status page → pick monitors → share the public URL (bearer token minted once — save it). |
| Partner API | Settings › Team → create scoped cd_ API key → partner reads /api/v1 uptime/fleet data. |

## 7. Storage — sidebar Storage (?s= sections)

| Feature | How to use it |
|---|---|
| File manager | ?s=files → pick node → browse, view, edit, upload, download. |
| Volumes | ?s=volumes → New volume (named or bind path) → scope (node/service/org) → Attach to a service. Preflight checks path validity + free space. |
| Volume replication | Volume → Replicate → pick backup node/disk → Sync now (rsync) / Failover (promote + rewrite) / Copyback when primary returns. |
| Backups | ?s=backups → Backup now (DB or volume) → archive lists under service → Download (signed URL) / Restore (upload or pick archive). |
| Backup schedules | Service or Backups → New schedule → cron + retention count + destination → runs automatically; Run now. |
| S3 destinations | Backups → Destinations → Add → endpoint/region/bucket/creds → Test before use. |
| Object storage | ?s=objects — MinIO buckets; Deploy MinIO cluster or Import existing; set the registry S3 endpoint. |
| Registries | ?s=registries → Add → URL + credentials (encrypted) → Test connection → browse catalog/tags. The built-in registry deploys automatically at setup; Configure S3 makes it HA. |
| Docker disk | ?s=docker — per-node usage → Prune (safe cleanup) or aggressive prune. |

## 8. System — sidebar System (DockBit OS hosts)

| Feature | How to use it |
|---|---|
| Host overview | /dashboard/system → pick machine — disks, pools, SMART, packages, uptime, power. |
| Disks & pools | Pool cards → create/expand ZFS/btrfs pool → scrub → adopt existing pool → fill forecast. |
| Host actions | Restart, shut down, scrub — OS-mode machines only (marker /etc/dockbit/install.json). |
| Install mode | System → Install mode → flip docker↔os per machine. |
| OS updates | Packages panel → apply updates; reboot-required detection; staged OTA rollouts for fleets. |
| Power/UPS | Power panel — PSU state, UPS battery, shutdown policies. |
| First-boot (OS box) | Boot OS image → screen shows one-time setup code → browser: name → login → SSH → ZFS pool → done, or Join existing DockBit (no license) + optional Tailscale. |

## 9. AI

| Feature | How to use it |
|---|---|
| Assistant chat | Sidebar Assistant (or side panel) — ask anything: state questions ("why did deploy X fail"), action requests (restarts, scaling); it acts through the real API with confirmations. Configure provider/model/autonomy at Settings › Assistant. |
| Bug reporting | Sidebar Bug reporting — reports collected from failed deploys → open a bug → Start fix spawns a Devin/Cursor run → watch run output → linked PR appears. |
| Agent policy | Settings › Connected accounts › Bug reporting — provider key, repo allowlist, action allowlist, ACU budget, approval mode. |
| Capability gaps | Settings › Assistant — features the assistant couldn't do; doubles as your roadmap list. |
| Search | ⌘K — relational queries answered from DB ("which node hosts X") — no LLM needed. |

## 10. Mobile — Projects › Mobile

| Feature | How to use it |
|---|---|
| Register app | Mobile → New mobile app — bundle ID, Expo project, signing/provisioning, package name. |
| Store builds | App → queue iOS/Android builds → TestFlight / Play upload from the pipeline. |
| Store submission | Prepare submission — screenshots, age rating, pricing, review notes, countries → submit to review. |
| OTA updates | ?view=ota — publish a JS-bundle release → devices fetch via /api/expo-updates/* → roll forward / pin / delete. |
| Fleets | ?view=fleets — group self-updating instances → canary → promote → rolled back / behind-latest views. |
| Push notifications | Devices self-register Expo tokens at login; alerts flow through notification channels. |
| Mobile app itself | Install the Expo app → Connect screen → enter host:port → login → full parity: services, nodes, deploys, monitors, files, assistant. |

## 11. Settings & admin — sidebar Settings

| Feature | How to use it |
|---|---|
| Team | Settings › Team and access — invite by email, set role, reset member 2FA, cancel invites. |
| API keys | Team → API keys → New → name + scopes → copy cd_… (shown once). |
| Profile | Settings → name/email/avatar, change password, session timeout. |
| 2FA / passkeys | Security → enable TOTP (QR + backup codes), trusted devices, register passkeys. |
| Notifications | Settings › Notifications (/dashboard/notifications) — create Slack/Discord/Email/Webhook/Telegram channels, toggle each; in-app + audit log live here too. |
| SMTP | Settings → SMTP → host/creds → Test — enables invite + reset emails. |
| Cloudflare | Settings → Cloudflare credentials — unlocks Zones/Tunnels/zero-touch DNS. |
| GitHub | Settings → create app from manifest or save OAuth app → installation → private repo access + "Sign in with GitHub". |
| Platform update | Settings → Check for updates → Update (pulls image, health-gated) → Rollback if needed → live log. Auto-update policy + Release history tab. |
| Auto-prune | Settings → Prune — schedule + retention for Docker cleanup; Prune now. |
| Dashboard access | Settings → Domain & Access → custom domain for the dashboard (Traefik route or tunnel). |
| Maintenance | Update all system services, Redeploy all services, Update all nodes, Repair all nodes — each runs as a visual-terminal job. |
| Support bundle | Settings → Support bundle — diagnostics export for support. |
| License | Settings → status/activate/deactivate; Start trial (7-day). |

## 12. CLI & API

Everything in the UI is also callable:

- **tRPC**: `POST /api/trpc/<namespace>.<procedure>` with your session cookie or API key — e.g. `service.trigger` → `deployment.trigger`.
- **REST**: `/api/health`, `/api/ready`, `/api/version`, `/api/v1` (partner, scoped cd_ keys), `/api/join`, webhooks.
- **WS**: `/ws/logs`, `/ws/terminal` — the same streams the UI uses.
- **Docs**: `docs/CLI-API.md` has curl examples for automation.

**Reality check for your local run:** every page works in the local dev stack, but actions needing real machines (SSH, Swarm deploys, tunnels, BMC, HA failover) will report "no online node" — the seed only has mock data. Point it at a real Linux server (or flash DockBit OS) and everything above is live.
