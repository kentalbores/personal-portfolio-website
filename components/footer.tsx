'use client';
import { useInView } from '@/hooks/useInView';
import { personal } from '@/lib/constants';

const socials = [
  {
    label: 'GitHub',
    href: personal.github,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.68-.22.68-.48v-1.68c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.8c.85 0 1.7.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10.02 10.02 0 0022 12c0-5.52-4.48-10-10-10z"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: personal.linked_in,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    label: 'Email',
    href: `mailto:${personal.email}`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
];

export default function Footer() {
  const { ref, isInView } = useInView();

  return (
    <footer id="contact">
      {/* Contact CTA */}
      <div
        className="py-24 px-6 text-center"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(0,198,255,0.03))',
          borderTop: '1px solid rgba(255,255,255,0.04)',
        }}
      >
        <div
          ref={ref}
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(28px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <span
            className="text-xs font-medium tracking-[0.2em] uppercase mb-4 block"
            style={{ color: 'var(--cyan)', fontFamily: 'var(--font-geist-mono)' }}
          >
            get_in_touch
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold mb-4 gradient-text"
          >
            Let&apos;s Work Together
          </h2>
          <p className="text-base max-w-md mx-auto mb-10" style={{ color: '#64748b' }}>
            I&apos;m currently open to new opportunities. Whether you have a project in mind, a question, 
            or just want to say hi — my inbox is always open.
          </p>

          <a
            href={`mailto:${personal.email}`}
            className="inline-flex items-center gap-3 px-8 py-4 text-base font-semibold btn-gradient"
            style={{ borderRadius: '10px' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="white" strokeWidth="1.5"/>
              <path d="M22 6l-10 7L2 6" stroke="white" strokeWidth="1.5"/>
            </svg>
            Say Hello
          </a>

          {/* Socials */}
          <div className="flex items-center justify-center gap-6 mt-12">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noreferrer"
                aria-label={s.label}
                className="p-3 rounded-xl transition-all duration-200 group"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  color: 'var(--muted)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(0,198,255,0.08)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,198,255,0.3)';
                  (e.currentTarget as HTMLElement).style.color = 'var(--cyan)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)';
                  (e.currentTarget as HTMLElement).style.color = 'var(--muted)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="px-6 py-5 text-center"
        style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
      >
        <p
          className="text-xs"
          style={{ color: '#374151', fontFamily: 'var(--font-geist-mono)' }}
        >
          © {new Date().getFullYear()} {personal.full_name} · Built with Next.js + Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
