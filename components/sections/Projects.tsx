'use client';
import { useState } from 'react';
import { useInView } from '@/hooks/useInView';
import { projects, type Project } from '@/lib/constants';

const categories = ['all', 'enterprise', 'infrastructure', 'web', 'automation', 'desktop', 'game'];

const categoryColors: Record<string, string> = {
  enterprise: '#00c6ff',
  infrastructure: '#f59e0b',
  web: '#10b981',
  automation: '#a855f7',
  desktop: '#ec4899',
  game: '#6366f1',
};

function ProjectCard({ project, delay }: { project: Project; delay: number }) {
  const { ref, isInView } = useInView(0.05);
  const accent = categoryColors[project.category] ?? '#94a3b8';

  return (
    <div
      ref={ref}
      className="glass-card p-6 flex flex-col h-full"
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
        borderColor: `${accent}20`,
      }}
    >
      {/* Top: category + prestige */}
      <div className="flex items-center justify-between mb-4">
        <span
          className="px-2.5 py-0.5 rounded-full text-xs font-medium capitalize"
          style={{
            background: `${accent}14`,
            border: `1px solid ${accent}30`,
            color: accent,
            fontFamily: 'var(--font-geist-mono)',
          }}
        >
          {project.category}
        </span>
        <div className="flex gap-0.5">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: i < project.prestige ? accent : 'rgba(255,255,255,0.1)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Name */}
      <h3 className="font-semibold text-base mb-2" style={{ color: '#e2e8f0', lineHeight: 1.4 }}>
        {project.name}
      </h3>

      {/* Description */}
      <p className="text-sm leading-relaxed flex-1 mb-5" style={{ color: '#64748b' }}>
        {project.description}
      </p>

      {/* Skills */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.skills.map((skill) => (
          <span
            key={skill}
            className="px-2 py-0.5 rounded text-xs"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.07)',
              color: '#64748b',
              fontFamily: 'var(--font-geist-mono)',
            }}
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Link */}
      {project.link ? (
        <a
          href={project.link.startsWith('http') ? project.link : `https://${project.link}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 text-xs font-medium transition-all duration-200"
          style={{ color: accent }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Visit Project
        </a>
      ) : (
        <div className="flex items-center gap-2 text-xs" style={{ color: '#374151' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.68-.22.68-.48v-1.68c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.8c.85 0 1.7.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10.02 10.02 0 0022 12c0-5.52-4.48-10-10-10z" fill="currentColor"/>
          </svg>
          GitHub link coming soon
        </div>
      )}
    </div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState('all');
  const { ref, isInView } = useInView();

  const filtered = filter === 'all' ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          ref={ref}
          className="text-center mb-12"
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
            my_work
          </span>
          <h2 className="text-4xl md:text-5xl font-bold gradient-text">Projects</h2>
          <div
            className="h-px w-16 mx-auto mt-4"
            style={{ background: 'linear-gradient(to right, var(--cyan), var(--purple))' }}
          />
          <p className="mt-4 text-sm max-w-lg mx-auto" style={{ color: 'var(--muted)' }}>
            A collection of what I&apos;ve built — from enterprise systems to fun side projects.
          </p>
        </div>

        {/* Filter tabs */}
        <div
          className="flex flex-wrap justify-center gap-2 mb-10"
          style={{
            opacity: isInView ? 1 : 0,
            transition: 'opacity 0.7s ease 0.2s',
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-tab ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} delay={i * 60} />
          ))}
        </div>
      </div>
    </section>
  );
}
