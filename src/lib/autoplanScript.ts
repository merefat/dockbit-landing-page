// Script for the "before" terminal in the Problem section: a fictional
// do-everything tool. Each command covers a chore DockBit handles — deploy,
// a second machine, domain/DNS, backups, teammate access — and each one
// fails somewhere new.

export type LineKind = 'cmd' | 'step' | 'err' | 'dim' | 'rule'

export interface TermLine {
  kind: LineKind
  /** step lines only: the area name shown in the gutter column */
  label?: string
  text: string
  /** step lines only: right-aligned verdict, e.g. '✓ 412 MB' */
  tail?: string
  /**
   * Pause before this line appears. For 'cmd' lines: before typing starts.
   * For output lines: after the previous line fully appeared.
   */
  delay: number
}

export const TYPE_PER_CHAR = 45
const END_BEAT = 400

export const SCRIPT: TermLine[] = [
  { kind: 'cmd', text: 'autoplan deploy', delay: 600 },
  { kind: 'step', label: 'git', text: 'push main → origin', tail: '✓ 0.4s', delay: 600 },
  { kind: 'step', label: 'machine', text: 'provision vm-1 · ubuntu 24.04', tail: '✓ 6.1s', delay: 750 },
  { kind: 'step', label: 'setup', text: 'docker, fail2ban, unattended-upgrades', tail: '✓ 11.8s', delay: 650 },
  { kind: 'step', label: 'docker', text: 'pull registry.acme/app:1.4.2', tail: '✓ 412 MB', delay: 750 },
  { kind: 'step', label: 'docker', text: 'create app-web · :443', delay: 850 },
  { kind: 'err', text: 'bind 0.0.0.0:443 — address already in use', delay: 350 },
  { kind: 'dim', text: 'nginx on the host already owns :443', delay: 220 },
  { kind: 'step', label: 'retry', text: 'rebind on :8443', tail: '✓', delay: 500 },
  { kind: 'step', label: 'deploy', text: 'health check localhost:8443', tail: '✓', delay: 600 },
  { kind: 'rule', text: 'live on :8443 — reachable from nowhere', delay: 500 },

  { kind: 'cmd', text: 'autoplan machine add vm-2', delay: 950 },
  { kind: 'step', label: 'ssh', text: 'copy bootstrap → vm-2', tail: '✓', delay: 550 },
  { kind: 'step', label: 'swarm', text: 'docker swarm join --token SWMTKN-…', delay: 750 },
  { kind: 'err', text: 'connection refused — :2377 blocked on the leader', delay: 350 },
  { kind: 'step', label: 'fix', text: 'open 2377, 7946, 4789 + retry', tail: '✓ joined', delay: 600 },
  { kind: 'step', label: 'net', text: "attach overlay 'web'", delay: 700 },
  { kind: 'err', text: 'key exchange failed — re-init the whole swarm?', delay: 350 },
  { kind: 'step', label: 'place', text: 'run app-web on vm-2', delay: 650 },
  { kind: 'err', text: 'unlabeled node — placement silently skipped', delay: 350 },
  { kind: 'rule', text: 'vm-2 joined, but nothing will schedule there', delay: 500 },

  { kind: 'cmd', text: 'autoplan domain add shop.acme.io', delay: 950 },
  { kind: 'step', label: 'dns', text: 'create A record → 203.0.113.4', tail: '✓', delay: 600 },
  { kind: 'step', label: 'certs', text: 'certbot --nginx -d shop.acme.io', delay: 800 },
  { kind: 'err', text: "http-01 failed — DNS hasn't propagated yet", delay: 350 },
  { kind: 'step', label: 'retry', text: 'certbot --standalone', delay: 650 },
  { kind: 'err', text: ':80 already bound by the host nginx', delay: 350 },
  { kind: 'step', label: 'port', text: 'iptables -A INPUT -p tcp --dport 443 -j ACCEPT', tail: '✓ open', delay: 600 },
  { kind: 'dim', text: 'the rule is gone after the next reboot', delay: 220 },
  { kind: 'step', label: 'verify', text: 'curl -I https://shop.acme.io', delay: 700 },
  { kind: 'err', text: 'default nginx page — the cert never existed', delay: 350 },
  { kind: 'rule', text: 'DNS set · no cert · reachable by luck', delay: 500 },

  { kind: 'cmd', text: 'autoplan backup', delay: 950 },
  { kind: 'step', label: 'cron', text: 'crontab -e → 0 3 * * * rsync -a /data nas:/backup', tail: '✓ scheduled', delay: 600 },
  { kind: 'step', label: 'run', text: 'rsync -a /data nas:/backup', delay: 750 },
  { kind: 'err', text: 'Permission denied (publickey) — nas has no key for root', delay: 350 },
  { kind: 'step', label: 'check', text: 'journalctl --since "42 days ago" | grep backup', delay: 700 },
  { kind: 'err', text: 'no successful backup on record — 42 days silent', delay: 350 },
  { kind: 'rule', text: 'a cron entry is not a backup', delay: 500 },

  { kind: 'cmd', text: 'autoplan access --add sam', delay: 950 },
  { kind: 'step', label: 'user', text: 'adduser sam', tail: '✓', delay: 550 },
  { kind: 'step', label: 'ssh', text: "install sam's pubkey", delay: 700 },
  { kind: 'err', text: '~sam/.ssh/authorized_keys: Permission denied', delay: 350 },
  { kind: 'step', label: 'fix', text: 'chmod 700 .ssh && chmod 600 authorized_keys', tail: '✓', delay: 600 },
  { kind: 'step', label: 'test', text: 'ssh sam@prod-1 hostname', delay: 700 },
  { kind: 'err', text: 'Permission denied (publickey) — sshd still says no', delay: 350 },
  { kind: 'rule', text: 'sam is still waiting · you remain the only keyholder', delay: 500 },

  { kind: 'dim', text: '(and no app to check any of this from your phone)', delay: 600 },
  { kind: 'rule', text: '5 commands · 11 errors · one weekend gone', delay: 800 },
]

// Time at which each line starts appearing (index aligns with SCRIPT).
// 'cmd' lines then occupy their typing duration; output lines are instant.
const STARTS: number[] = []
{
  let t = 0
  SCRIPT.forEach((l) => {
    t += l.delay
    STARTS.push(t)
    if (l.kind === 'cmd') t += l.text.length * TYPE_PER_CHAR
  })
}

export const TOTAL_MS = STARTS[STARTS.length - 1] + END_BEAT

export interface FrameLine {
  line: TermLine
  /** characters visible — partial while a 'cmd' line is still typing */
  chars: number
}

export interface Frame {
  lines: FrameLine[]
  done: boolean
}

export function visibleAt(elapsed: number): Frame {
  const lines: FrameLine[] = []
  for (let i = 0; i < SCRIPT.length; i++) {
    if (elapsed < STARTS[i]) break
    const l = SCRIPT[i]
    const chars =
      l.kind === 'cmd'
        ? Math.min(l.text.length, Math.floor((elapsed - STARTS[i]) / TYPE_PER_CHAR) + 1)
        : l.text.length
    lines.push({ line: l, chars })
  }
  return { lines, done: elapsed >= TOTAL_MS }
}
