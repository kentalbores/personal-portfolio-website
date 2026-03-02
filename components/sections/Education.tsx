'use client';
import { useInView } from '@/hooks/useInView';
import { education } from '@/lib/constants';

const icons = [
  // University
  (color: string) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ color }}>
      <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  // Senior High
  (color: string) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ color }}>
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  // Junior High
  (color: string) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ color }}>
      <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6 12v5c3 3 9 3 12 0v-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
];

const accentColors = ['#00c6ff', '#a855f7', '#10b981'];

function EducationCard({
  edu,
  index,
}: {
  edu: typeof education[0];
  index: number;
}) {
  const { ref, isInView } = useInView(0.1);
  const accent = accentColors[index];
  const Icon = icons[index];

  return (
    <div
      ref={ref}
      className="glass-card p-6 relative overflow-hidden"
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.6s ease ${index * 120}ms, transform 0.6s ease ${index * 120}ms`,
      }}
    >
      {/* Accent top bar */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: `linear-gradient(to right, ${accent}, transparent)` }}
      />

      {/* Icon + school */}
      <div className="flex items-start gap-4 mb-4">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
          style={{
            background: `${accent}12`,
            border: `1px solid ${accent}25`,
          }}
        >
          {Icon(accent)}
        </div>
        <div>
          <h3
            className="font-semibold text-sm leading-snug"
            style={{ color: '#e2e8f0' }}
          >
            {edu.school}
          </h3>
          <p
            className="text-xs mt-1"
            style={{ color: accent, fontFamily: 'var(--font-geist-mono)' }}
          >
            {edu.period}
          </p>
        </div>
      </div>

      {/* Details */}
      <ul className="space-y-2 ml-14">
        {edu.details.map((detail, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: '#64748b' }}>
            <span
              className="mt-2 shrink-0 w-1 h-1 rounded-full"
              style={{ background: accent }}
            />
            <span>{detail}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Education() {
  const { ref, isInView } = useInView();

  return (
    <section id="education" className="py-28 px-6 section-glow">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
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
            background
          </span>
          <h2 className="text-4xl md:text-5xl font-bold gradient-text">Education</h2>
          <div
            className="h-px w-16 mx-auto mt-4"
            style={{ background: 'linear-gradient(to right, var(--cyan), var(--purple))' }}
          />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {education.map((edu, i) => (
            <EducationCard key={i} edu={edu} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
