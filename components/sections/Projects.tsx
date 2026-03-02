'use client';
import { useState } from 'react';
import { useInView } from '@/hooks/useInView';
import { projects, type Project, type ProjectMedia } from '@/lib/constants';
import TechIcon from '@/components/TechIcon';
import MediaLightbox from '@/components/MediaLightbox';

const categories = ['all', 'enterprise', 'infrastructure', 'web', 'automation', 'desktop', 'game'];

const categoryColors: Record<string, string> = {
  enterprise:     '#00c6ff',
  infrastructure: '#f59e0b',
  web:            '#10b981',
  automation:     '#a855f7',
  desktop:        '#ec4899',
  game:           '#6366f1',
};

// ── Media thumbnail ────────────────────────────────────────────
function MediaThumb({
  media,
  accent,
  onOpen,
}: {
  media: ProjectMedia[];
  accent: string;
  onOpen: (index: number) => void;
}) {
  const [failed, setFailed] = useState<Set<number>>(new Set());
  const first = media[0];

  // If all media failed to load, render nothing (card shows no thumb)
  if (!first || failed.has(0)) return null;

  return (
    <div
      className="relative overflow-hidden cursor-pointer group"
      style={{
        borderBottom: `1px solid rgba(255,255,255,0.05)`,
        aspectRatio: '16 / 9',
        background: `${accent}0a`,
      }}
      onClick={() => onOpen(0)}
    >
      {first.type === 'image' ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={first.src}
          alt={first.caption ?? ''}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={() => setFailed((p) => new Set([...p, 0]))}
        />
      ) : (
        <video
          src={first.src}
          muted
          playsInline
          loop
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onMouseEnter={(e) => (e.currentTarget as HTMLVideoElement).play().catch(() => {})}
          onMouseLeave={(e) => { (e.currentTarget as HTMLVideoElement).pause(); }}
          onError={() => setFailed((p) => new Set([...p, 0]))}
        />
      )}

      {/* Hover overlay */}
      <div
        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'rgba(0,0,0,0.5)' }}
      >
        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
          style={{ background: `${accent}22`, border: `1px solid ${accent}55`, color: accent }}
        >
          {first.type === 'video' ? (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5 3l14 9-14 9V3z"/>
              </svg>
              Play
            </>
          ) : (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Expand
            </>
          )}
        </div>
      </div>

      {/* Media count badge */}
      {media.length > 1 && (
        <div
          className="absolute top-2 right-2 px-2 py-0.5 rounded text-xs"
          style={{
            background: 'rgba(0,0,0,0.7)',
            color: '#94a3b8',
            fontFamily: 'var(--font-geist-mono)',
          }}
        >
          +{media.length - 1}
        </div>
      )}

      {/* Video badge */}
      {first.type === 'video' && (
        <div
          className="absolute top-2 left-2 px-2 py-0.5 rounded text-xs flex items-center gap-1"
          style={{
            background: 'rgba(0,0,0,0.7)',
            color: accent,
            fontFamily: 'var(--font-geist-mono)',
          }}
        >
          <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor">
            <path d="M5 3l14 9-14 9V3z"/>
          </svg>
          VIDEO
        </div>
      )}
    </div>
  );
}

// ── Category placeholder (shown when no media / all failed) ────
function CategoryPlaceholder({ category, accent }: { category: string; accent: string }) {
  const primarySkill: Record<string, string> = {
    enterprise: 'FastAPI',
    infrastructure: 'Docker',
    web: 'React',
    automation: 'n8n',
    desktop: 'Java',
    game: 'Unity',
  };
  const skill = primarySkill[category] ?? 'React';

  return (
    <div
      className="flex items-center justify-center"
      style={{
        aspectRatio: '16 / 9',
        background: `${accent}06`,
        borderBottom: `1px solid rgba(255,255,255,0.04)`,
      }}
    >
      <div className="flex flex-col items-center gap-2 opacity-30">
        <TechIcon name={skill} size={40} />
        <span className="text-xs capitalize" style={{ color: accent, fontFamily: 'var(--font-geist-mono)' }}>
          {category}
        </span>
      </div>
    </div>
  );
}

// ── Project card ───────────────────────────────────────────────
function ProjectCard({ project, delay }: { project: Project; delay: number }) {
  const { ref, isInView } = useInView(0.05);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(0);
  const accent = categoryColors[project.category] ?? '#94a3b8';

  const openLightbox = (index: number) => {
    setLightboxIdx(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <div
        ref={ref}
        className="glass-card overflow-hidden flex flex-col h-full"
        style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? 'translateY(0)' : 'translateY(24px)',
          transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
          borderColor: `${accent}18`,
        }}
      >
        {/* Thumbnail / placeholder */}
        {project.media && project.media.length > 0 ? (
          <MediaThumb media={project.media} accent={accent} onOpen={openLightbox} />
        ) : (
          <CategoryPlaceholder category={project.category} accent={accent} />
        )}

        {/* Card body */}
        <div className="p-5 flex flex-col flex-1">
          {/* Category + prestige */}
          <div className="flex items-center justify-between mb-3">
            <span
              className="px-2.5 py-0.5 rounded-full text-xs font-medium capitalize"
              style={{
                background: `${accent}12`,
                border: `1px solid ${accent}28`,
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
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i < project.prestige ? 6 : 5,
                    height: i < project.prestige ? 6 : 5,
                    background: i < project.prestige ? accent : 'rgba(255,255,255,0.08)',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Name */}
          <h3 className="font-semibold text-sm mb-2" style={{ color: '#e2e8f0', lineHeight: 1.45 }}>
            {project.name}
          </h3>

          {/* Description */}
          <p className="text-xs leading-relaxed flex-1 mb-4" style={{ color: '#64748b' }}>
            {project.description}
          </p>

          {/* Skills with icons */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  color: '#4b6080',
                  fontFamily: 'var(--font-geist-mono)',
                }}
              >
                <TechIcon name={skill} size={11} />
                {skill}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between">
            {project.link ? (
              <a
                href={project.link.startsWith('http') ? project.link : `https://${project.link}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs font-medium transition-all duration-200"
                style={{ color: accent }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Visit Project
              </a>
            ) : (
              <span className="flex items-center gap-1.5 text-xs" style={{ color: '#283040' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#1e293b' }}>
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.68-.22.68-.48v-1.68c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.8c.85 0 1.7.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10.02 10.02 0 0022 12c0-5.52-4.48-10-10-10z"/>
                </svg>
                GitHub link soon
              </span>
            )}

            {/* Media gallery button */}
            {project.media && project.media.length > 0 && (
              <button
                onClick={() => openLightbox(0)}
                className="flex items-center gap-1.5 text-xs transition-all duration-200"
                style={{ color: '#4b6080' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = accent)}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#4b6080')}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
                  <path d="M21 15l-5-5L5 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Gallery
              </button>
            )}
          </div>
        </div>
      </div>

      {lightboxOpen && project.media && (
        <MediaLightbox
          media={project.media}
          currentIndex={lightboxIdx}
          onClose={() => setLightboxOpen(false)}
          onNavigate={setLightboxIdx}
        />
      )}
    </>
  );
}

// ── Main section ───────────────────────────────────────────────
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
            <ProjectCard key={project.id} project={project} delay={i * 55} />
          ))}
        </div>
      </div>
    </section>
  );
}
