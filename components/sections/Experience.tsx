'use client';
import { useState } from 'react';
import { useInView } from '@/hooks/useInView';
import { experience } from '@/lib/constants';

export default function Experience() {
  const [activeIdx, setActiveIdx] = useState(0);
  const { ref, isInView } = useInView();
  const active = experience[activeIdx];

  return (
    <section id="experience" className="py-28 px-6 section-glow">
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
            work_experience
          </span>
          <h2 className="text-4xl md:text-5xl font-bold gradient-text">Experience</h2>
          <div
            className="h-px w-16 mx-auto mt-4"
            style={{ background: 'linear-gradient(to right, var(--cyan), var(--purple))' }}
          />
        </div>

        <div
          className="glass-card overflow-hidden"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(28px)',
            transition: 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s',
          }}
        >
          {/* Company header */}
          <div
            className="px-6 py-4 flex items-center gap-4"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm shrink-0"
              style={{
                background: 'linear-gradient(135deg, rgba(0,198,255,0.2), rgba(168,85,247,0.2))',
                border: '1px solid rgba(0,198,255,0.25)',
                color: 'var(--cyan)',
                fontFamily: 'var(--font-geist-mono)',
              }}
            >
              NC
            </div>
            <div>
              <p className="font-semibold text-sm" style={{ color: '#e2e8f0' }}>
                N-Compass TV
              </p>
              <p className="text-xs" style={{ color: 'var(--muted)', fontFamily: 'var(--font-geist-mono)' }}>
                June 2025 – Present
              </p>
            </div>
            <div className="ml-auto">
              <span
                className="px-2.5 py-1 rounded-full text-xs"
                style={{
                  background: 'rgba(34,197,94,0.1)',
                  border: '1px solid rgba(34,197,94,0.25)',
                  color: '#4ade80',
                  fontFamily: 'var(--font-geist-mono)',
                }}
              >
                ● Active
              </span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row">
            {/* Role tabs */}
            <div
              className="md:w-64 shrink-0 p-2"
              style={{ borderRight: '1px solid rgba(255,255,255,0.05)' }}
            >
              {experience.map((exp, i) => (
                <button
                  key={exp.id}
                  className={`exp-tab w-full text-left rounded-lg ${i === activeIdx ? 'active' : ''}`}
                  onClick={() => setActiveIdx(i)}
                >
                  {exp.title}
                </button>
              ))}
            </div>

            {/* Role details */}
            <div
              className="flex-1 p-6 md:p-8"
              key={activeIdx}
              style={{ animation: 'fadeInUp 0.35s ease forwards' }}
            >
              <h3
                className="text-xl font-semibold mb-1"
                style={{ color: '#e2e8f0' }}
              >
                {active.title}
              </h3>
              <p
                className="text-sm mb-4"
                style={{ color: 'var(--cyan)', fontFamily: 'var(--font-geist-mono)' }}
              >
                {active.company} · {active.period}
              </p>
              <p className="text-sm leading-relaxed mb-6" style={{ color: '#94a3b8' }}>
                {active.description}
              </p>

              {/* Highlights */}
              <div className="mb-6">
                <p
                  className="text-xs font-medium uppercase tracking-widest mb-3"
                  style={{ color: 'var(--muted)', fontFamily: 'var(--font-geist-mono)' }}
                >
                  Key Contributions
                </p>
                <ul className="space-y-2">
                  {active.highlights.map((h, i) => (
                    <li key={i} className="flex gap-3 text-sm" style={{ color: '#94a3b8' }}>
                      <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: 'var(--cyan)' }} />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Skills */}
              <div>
                <p
                  className="text-xs font-medium uppercase tracking-widest mb-3"
                  style={{ color: 'var(--muted)', fontFamily: 'var(--font-geist-mono)' }}
                >
                  Technologies Used
                </p>
                <div className="flex flex-wrap gap-2">
                  {active.skills.map((skill) => (
                    <span key={skill} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
