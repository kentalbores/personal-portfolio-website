'use client';
import { useInView } from '@/hooks/useInView';
import { personal } from '@/lib/constants';

const stats = [
  { value: '5+', label: 'Roles at Internship' },
  { value: '12+', label: 'Projects Built' },
  { value: '20+', label: 'Technologies' },
  { value: '3+', label: 'Years Learning' },
];

export default function About() {
  const { ref, isInView } = useInView();

  return (
    <section id="about" className="py-28 px-6 section-glow">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div
          className="text-center mb-16 reveal"
          ref={ref}
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(28px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <span
            className="text-xs font-medium tracking-[0.2em] uppercase mb-3 block"
            style={{ color: 'var(--cyan)', fontFamily: 'var(--font-geist-mono)' }}
          >
            about_me
          </span>
          <h2 className="text-4xl md:text-5xl font-bold gradient-text">Who I Am</h2>
          <div
            className="h-px w-16 mx-auto mt-4"
            style={{ background: 'linear-gradient(to right, var(--cyan), var(--purple))' }}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? 'translateX(0)' : 'translateX(-30px)',
              transition: 'opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s',
            }}
          >
            <p className="text-base leading-relaxed mb-5" style={{ color: '#94a3b8' }}>
              I&apos;m <span style={{ color: '#e2e8f0', fontWeight: 600 }}>{personal.full_name}</span>, 
              a Full-Stack Developer and IT student based in Argao, Cebu. I love building things 
              from the ground up — whether it&apos;s a full enterprise system, a Linux self-healing server, 
              or an AI-powered automation workflow.
            </p>
            <p className="text-base leading-relaxed mb-5" style={{ color: '#94a3b8' }}>
              Currently interning at{' '}
              <span style={{ color: 'var(--cyan)', fontWeight: 500 }}>N-Compass TV</span> where I wear 
              five hats simultaneously: Full-Stack Developer, Cybersecurity Analyst, Automation Engineer, 
              Embedded Systems Developer, and Backend Lead for an enterprise RFID attendance system.
            </p>
            <p className="text-base leading-relaxed" style={{ color: '#94a3b8' }}>
              When I&apos;m not writing code, I&apos;m exploring how AI can be woven into everyday workflows 
              and reading about security vulnerabilities that nobody else thinks matter — until they do.
            </p>

            {/* Contact quick links */}
            <div className="flex flex-wrap gap-3 mt-8">
              <a
                href={`mailto:${personal.email}`}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all duration-200"
                style={{
                  background: 'rgba(0,198,255,0.07)',
                  border: '1px solid rgba(0,198,255,0.18)',
                  color: '#a5f3ff',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
                {personal.email}
              </a>
              <a
                href={`https://wa.me/${personal.phone_num}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all duration-200"
                style={{
                  background: 'rgba(168,85,247,0.07)',
                  border: '1px solid rgba(168,85,247,0.18)',
                  color: '#d8b4fe',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.5a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .82h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
                {personal.phone_num}
              </a>
            </div>
          </div>

          {/* Stats grid */}
          <div
            className="grid grid-cols-2 gap-4"
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? 'translateX(0)' : 'translateX(30px)',
              transition: 'opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s',
            }}
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                className="glass-card p-6 text-center"
                style={{
                  transitionDelay: `${i * 80}ms`,
                }}
              >
                <div
                  className="text-4xl font-bold mb-1 gradient-text"
                >
                  {stat.value}
                </div>
                <div className="text-sm" style={{ color: 'var(--muted)' }}>
                  {stat.label}
                </div>
              </div>
            ))}

            {/* Location card */}
            <div
              className="glass-card p-5 col-span-2 flex items-center gap-4"
            >
              <div
                className="p-3 rounded-lg shrink-0"
                style={{ background: 'rgba(0,198,255,0.08)', border: '1px solid rgba(0,198,255,0.15)' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ color: 'var(--cyan)' }}>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium" style={{ color: '#e2e8f0' }}>
                  {personal.address}
                </p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>
                  Open to remote / on-site opportunities
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
