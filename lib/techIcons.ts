const D = (name: string, variant = 'original') =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-${variant}.svg`;

const SI = (slug: string, color?: string) =>
  `https://cdn.simpleicons.org/${slug}${color ? '/' + color : ''}`;

/**
 * Maps tech/skill names to their official icon URLs.
 * Sources:
 *   - Devicons CDN (devicon.dev)
 *   - Simple Icons CDN (simpleicons.org)
 */
export const techIcons: Record<string, string> = {
  // ── Frontend ────────────────────────────────────────────────
  'React':               D('react'),
  'NextJS':              D('nextjs', 'plain'),      // plain = white — works on dark bg
  'Angular':             D('angular', 'original'),
  'HTML5':               D('html5'),
  'CSS3':                D('css3'),
  'JavaScript (ES6+)':   D('javascript'),
  'JavaScript':          D('javascript'),
  'TypeScript':          D('typescript'),
  'Figma':               D('figma'),

  // ── Backend ─────────────────────────────────────────────────
  'Node.js':             D('nodejs', 'original'),
  'Express':             SI('express', 'ffffff'),   // express logo is dark; force white
  'FastAPI':             D('fastapi'),
  'Python':              D('python'),
  'PHP':                 D('php'),
  'Java':                D('java'),

  // ── Database ────────────────────────────────────────────────
  'MySQL':               D('mysql', 'original'),
  'Prisma ORM':          SI('prisma', 'a5f3ff'),
  'Prisma':              SI('prisma', 'a5f3ff'),
  'Supabase':            SI('supabase'),
  'PostgreSQL':          D('postgresql'),
  'OpenSearch':          SI('opensearch'),

  // ── DevOps & Infrastructure ──────────────────────────────────
  'Docker':              D('docker'),
  'AWS EC2':             SI('amazonaws', 'FF9900'),
  'AWS':                 SI('amazonaws', 'FF9900'),
  'Nginx':               D('nginx'),
  'Linux':               D('linux'),
  'Ubuntu':              D('ubuntu'),
  'Raspberry Pi':        SI('raspberrypi', 'C51A4A'),
  'Cloudflare':          SI('cloudflare', 'F38020'),
  'Tailscale':           SI('tailscale', '6272a4'),
  'SSH':                 SI('gnubash', 'ffffff'),
  'systemd':             D('linux'),
  'Raspbian OS':         SI('raspberrypi', 'C51A4A'),

  // ── Tools & Integrations ────────────────────────────────────
  'Git':                 D('git'),
  'n8n':                 SI('n8n', 'EA4B71'),
  'Auth0':               SI('auth0', 'EB5424'),
  'Jira':                D('jira'),
  'Slack API':           SI('slack', '4A154B'),
  'Slack':               SI('slack', '4A154B'),
  'Google Cloud':        D('googlecloud'),
  'Google SerpAPI':      D('googlecloud'),
  'Webhook':             SI('webhook', 'ffffff'),
  'REST API':            SI('fastapi', '009688'),
  'FileStack':           SI('filestack', '0061FE'),

  // ── Security ────────────────────────────────────────────────
  'Kali Linux':          SI('kalilinux', '557C94'),
  'Burp Suite':          SI('portswigger', 'FF6633'),
  'nmap':                D('linux'),
  'masscan':             D('linux'),
  'TCP/IP Networking':   SI('cisco', '1BA0D7'),
  'Web Scraping':        D('python'),

  // ── Automation ──────────────────────────────────────────────
  'Playwright':          SI('playwright', '2EAD33'),
  'ElevenLabs':          SI('elevenlabs', 'f9f3e3'),
  'Synthesia AI':        SI('openai', 'ffffff'),
  'AI Integration':      SI('openai', 'ffffff'),

  // ── Embedded ────────────────────────────────────────────────
  'Bash':                SI('gnubash', '4EAA25'),
  'AnyDesk':             SI('anydesk', 'EF443B'),

  // ── Game Dev ────────────────────────────────────────────────
  'Godot':               D('godot', 'plain'),
  'GDScript':            D('godot', 'plain'),
  'Unity':               D('unity', 'plain'),       // unity = white on dark
  'C#':                  D('csharp'),
  'Game Development':    D('unity', 'plain'),

  // ── Desktop / Other ─────────────────────────────────────────
  'Java AWT':            D('java'),
  'JNativeHook':         D('java'),
  'Swing':               D('java'),
  'Pillow':              D('python'),
  'Image Processing':    D('python'),
  'NLP':                 D('python'),
  'Automation':          SI('n8n', 'EA4B71'),
  'E-commerce':          SI('shopify', '96BF48'),
  'Bot Development':     SI('telegram', '26A5E4'),
  'Telegram API':        SI('telegram', '26A5E4'),
  'Web Design':          D('figma'),
  'Embedded Systems':    SI('raspberrypi', 'C51A4A'),
  'Agile / Scrum':       D('jira'),
  'RBAC':                SI('auth0', 'EB5424'),
};

export function getIcon(name: string): string | null {
  return techIcons[name] ?? null;
}
