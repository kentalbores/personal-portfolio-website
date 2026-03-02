'use client';
import { useState, useRef, useEffect } from 'react';
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

// ── Image thumbnail (only renders when src actually loads) ─────
function ImageThumb({
  item,
  accent,
  extraCount,
  onClick,
}: {
  item: ProjectMedia;
  accent: string;
  extraCount: number;
  onClick: () => void;
}) {
  const [status, setStatus] = useState<'loading' | 'ready' | 'failed'>('loading');

  if (status === 'failed') return null;

  return (
    <div
      className="relative overflow-hidden cursor-pointer group"
      style={{
        aspectRatio: '16 / 9',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        // Collapsed until the image confirms it loaded
        height: status === 'ready' ? undefined : 0,
        overflow: status === 'ready' ? 'visible' : 'hidden',
      }}
      onClick={onClick}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.src}
        alt=""
        aria-hidden="true"
        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
        style={{ opacity: status === 'ready' ? 1 : 0, transition: 'opacity 0.4s ease' }}
        onLoad={() => setStatus('ready')}
        onError={() => setStatus('failed')}
      />

      {/* Hover overlay */}
      <div
        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'rgba(0,0,0,0.45)' }}
      >
        <span
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
          style={{ background: `${accent}22`, border: `1px solid ${accent}55`, color: accent }}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          View
        </span>
      </div>

      {/* Extra count badge */}
      {extraCount > 0 && (
        <div
          className="absolute top-2 right-2 px-2 py-0.5 rounded text-xs"
          style={{ background: 'rgba(0,0,0,0.65)', color: '#94a3b8', fontFamily: 'var(--font-geist-mono)' }}
        >
          +{extraCount}
        </div>
      )}
    </div>
  );
}

// ── Video thumbnail (static — shows player on click) ──────────
function VideoThumb({
  item,
  accent,
  extraCount,
  onClick,
}: {
  item: ProjectMedia;
  accent: string;
  extraCount: number;
  onClick: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [canPlay, setCanPlay] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onCanPlay = () => setCanPlay(true);
    const onError = () => setFailed(true);
    v.addEventListener('canplaythrough', onCanPlay);
    v.addEventListener('error', onError);
    return () => {
      v.removeEventListener('canplaythrough', onCanPlay);
      v.removeEventListener('error', onError);
    };
  }, []);

  if (failed) return null;

  return (
    <div
      className="relative overflow-hidden cursor-pointer group"
      style={{
        aspectRatio: '16 / 9',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        background: `${accent}08`,
        height: canPlay ? undefined : 0,
        overflow: canPlay ? 'visible' : 'hidden',
      }}
      onClick={onClick}
    >
      <video
        ref={videoRef}
        src={item.src}
        muted
        playsInline
        preload="metadata"
        className="w-full h-full object-cover"
        style={{ opacity: canPlay ? 1 : 0, transition: 'opacity 0.4s ease' }}
        onMouseEnter={() => videoRef.current?.play().catch(() => {})}
        onMouseLeave={() => {
          if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
          }
        }}
      />

      {/* Play overlay */}
      <div
        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'rgba(0,0,0,0.5)' }}
      >
        <span
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
          style={{ background: `${accent}22`, border: `1px solid ${accent}55`, color: accent }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M5 3l14 9-14 9V3z"/></svg>
          Play
        </span>
      </div>

      {/* VIDEO label */}
      <div
        className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded text-xs"
        style={{ background: 'rgba(0,0,0,0.65)', color: accent, fontFamily: 'var(--font-geist-mono)' }}
      >
        <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor"><path d="M5 3l14 9-14 9V3z"/></svg>
        VIDEO
      </div>

      {extraCount > 0 && (
        <div
          className="absolute top-2 right-2 px-2 py-0.5 rounded text-xs"
          style={{ background: 'rgba(0,0,0,0.65)', color: '#94a3b8', fontFamily: 'var(--font-geist-mono)' }}
        >
          +{extraCount}
        </div>
      )}
    </div>
  );
}

// ── Smart media thumbnail (picks image or video component) ─────
function MediaThumb({
  media,
  accent,
  onOpen,
}: {
  media: ProjectMedia[];
  accent: string;
  onOpen: (index: number) => void;
}) {
  if (!media.length) return null;
  const first = media[0];
  const extra = media.length - 1;

  if (first.type === 'image') {
    return (
      <ImageThumb
        item={first}
        accent={accent}
        extraCount={extra}
        onClick={() => onOpen(0)}
      />
    );
  }
  return (
    <VideoThumb
      item={first}
      accent={accent}
      extraCount={extra}
      onClick={() => onOpen(0)}
    />
  );
}

// ── Project card ───────────────────────────────────────────────
function ProjectCard({ project, delay }: { project: Project; delay: number }) {
  const { ref, isInView } = useInView(0.05);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(0);
  const accent = categoryColors[project.category] ?? '#94a3b8';
  const hasMedia = (project.media ?? []).length > 0;

  return (
    <>
      <div
        ref={ref}
        className="glass-card overflow-hidden flex flex-col"
        style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? 'translateY(0)' : 'translateY(24px)',
          transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
          borderColor: `${accent}18`,
        }}
      >
        {/* Thumbnail — only shows when media loads successfully */}
        {hasMedia && (
          <MediaThumb
            media={project.media!}
            accent={accent}
            onOpen={(i) => { setLightboxIdx(i); setLightboxOpen(true); }}
          />
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
            <div className="flex gap-1">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-full"
                  style={{
                    width: 6,
                    height: 6,
                    background: i < project.prestige ? accent : 'rgba(255,255,255,0.08)',
                    boxShadow: i < project.prestige ? `0 0 6px ${accent}66` : 'none',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Name */}
          <h3 className="font-semibold text-sm mb-2 leading-snug" style={{ color: '#e2e8f0' }}>
            {project.name}
          </h3>

          {/* Description */}
          <p className="text-xs leading-relaxed flex-1 mb-4" style={{ color: '#4b6080', lineHeight: 1.65 }}>
            {project.description}
          </p>

          {/* Skills with icons */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs"
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
          <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
            {project.link ? (
              <a
                href={project.link.startsWith('http') ? project.link : `https://${project.link}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium transition-colors duration-200"
                style={{ color: accent }}
              >
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                  <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Visit Project
              </a>
            ) : (
              <span className="text-xs" style={{ color: '#252f3f' }}>
                GitHub link soon
              </span>
            )}

            {hasMedia && (
              <button
                onClick={() => { setLightboxIdx(0); setLightboxOpen(true); }}
                className="inline-flex items-center gap-1.5 text-xs transition-colors duration-200"
                style={{ color: '#2a3a50' }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = accent)}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#2a3a50')}
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
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
          style={{ opacity: isInView ? 1 : 0, transition: 'opacity 0.7s ease 0.2s' }}
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

        {/* Grid — align-items: start so cards don't stretch to match tallest */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" style={{ alignItems: 'start' }}>
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} delay={i * 55} />
          ))}
        </div>
      </div>
    </section>
  );
}
