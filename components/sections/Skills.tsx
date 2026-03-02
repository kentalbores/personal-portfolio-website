'use client';
import { useInView } from '@/hooks/useInView';
import { skills } from '@/lib/constants';
import TechIcon from '@/components/TechIcon';

const categoryConfig: Record<string, { label: string; accent: string }> = {
  frontend:  { label: 'Frontend',               accent: '#00c6ff' },
  backend:   { label: 'Backend',                accent: '#a855f7' },
  database:  { label: 'Database',               accent: '#10b981' },
  devops:    { label: 'DevOps & Infrastructure', accent: '#f59e0b' },
  tools:     { label: 'Tools & Integrations',   accent: '#ec4899' },
  practices: { label: 'Practices',              accent: '#6366f1' },
};

function getCategoryIcon(category: string, color: string) {
  const s = { color, width: 16, height: 16 };
  switch (category) {
    case 'frontend': return (
      <svg {...s} viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
    case 'backend': return (
      <svg {...s} viewBox="0 0 24 24" fill="none">
        <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    );
    case 'database': return (
      <svg {...s} viewBox="0 0 24 24" fill="none">
        <ellipse cx="12" cy="5" rx="9" ry="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    );
    case 'devops': return (
      <svg {...s} viewBox="0 0 24 24" fill="none">
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    );
    case 'tools': return (
      <svg {...s} viewBox="0 0 24 24" fill="none">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
    case 'practices': return (
      <svg {...s} viewBox="0 0 24 24" fill="none">
        <path d="M9 11l3 3L22 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
    default: return null;
  }
}

function SkillCard({ category, items, delay }: { category: string; items: string[]; delay: number }) {
  const { ref, isInView } = useInView(0.08);
  const { label, accent } = categoryConfig[category];

  return (
    <div
      ref={ref}
      className="glass-card p-6"
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {/* Category header */}
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: `${accent}14`, border: `1px solid ${accent}22` }}
        >
          {getCategoryIcon(category, accent)}
        </div>
        <h3 className="font-semibold text-sm" style={{ color: '#e2e8f0' }}>
          {label}
        </h3>
      </div>

      {/* Skill tags with icons */}
      <div className="flex flex-wrap gap-2">
        {items.map((skill) => (
          <span
            key={skill}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium cursor-default select-none transition-all duration-200"
            style={{
              background: `${accent}0d`,
              border: `1px solid ${accent}22`,
              color: accent,
              fontFamily: 'var(--font-geist-mono)',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = `${accent}1f`;
              el.style.borderColor = `${accent}55`;
              el.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = `${accent}0d`;
              el.style.borderColor = `${accent}22`;
              el.style.transform = 'translateY(0)';
            }}
          >
            <TechIcon name={skill} size={14} />
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const { ref, isInView } = useInView();

  return (
    <section id="skills" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div
          ref={ref}
          className="text-center mb-16"
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
            tech_stack
          </span>
          <h2 className="text-4xl md:text-5xl font-bold gradient-text">Skills &amp; Tools</h2>
          <div
            className="h-px w-16 mx-auto mt-4"
            style={{ background: 'linear-gradient(to right, var(--cyan), var(--purple))' }}
          />
          <p className="mt-4 text-sm max-w-lg mx-auto" style={{ color: 'var(--muted)' }}>
            Technologies I use to build, automate, deploy, and secure.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Object.entries(skills).map(([category, items], i) => (
            <SkillCard key={category} category={category} items={items} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}
