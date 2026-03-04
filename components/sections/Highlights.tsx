'use client';
import { useState } from 'react';
import { useInView } from '@/hooks/useInView';
import { highlights } from '@/lib/constants';

function ImageLightbox({ src, onClose }: { src: string; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <button
        className="absolute top-5 right-5 p-2 rounded-lg z-10"
        style={{ background: 'rgba(255,255,255,0.08)', color: '#94a3b8' }}
        onClick={onClose}
        aria-label="Close"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        className="max-w-[90vw] max-h-[85vh] object-contain rounded-xl"
        style={{ boxShadow: '0 0 60px rgba(0,0,0,0.6)' }}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

export default function Highlights() {
  const { ref, isInView } = useInView();
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const withContent = highlights.filter((h) => h.images.length > 0);
  if (withContent.length === 0) return null;

  return (
    <section id="highlights" className="py-28 px-6 section-glow">
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
            highlights
          </span>
          <h2 className="text-4xl md:text-5xl font-bold gradient-text">In the Wild</h2>
          <div
            className="h-px w-16 mx-auto mt-4"
            style={{ background: 'linear-gradient(to right, var(--cyan), var(--purple))' }}
          />
          <p className="mt-4 text-sm max-w-lg mx-auto" style={{ color: 'var(--muted)' }}>
            Hackathons, certifications, and event participation.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {withContent.map((h, i) => (
            <div
              key={h.id}
              className="glass-card overflow-hidden"
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'translateY(0)' : 'translateY(28px)',
                transition: `opacity 0.6s ease ${i * 80}ms, transform 0.6s ease ${i * 80}ms`,
              }}
            >
              <div className="p-5">
                <h3 className="font-semibold text-base" style={{ color: '#e2e8f0' }}>
                  {h.title}
                </h3>
                {h.subtitle && (
                  <p className="text-xs mt-0.5" style={{ color: 'var(--cyan)' }}>
                    {h.subtitle}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-1 p-4 pt-0">
                {h.images.map((imgSrc, j) => (
                  <button
                    key={j}
                    className="relative aspect-square rounded-lg overflow-hidden group"
                    onClick={() => setLightboxSrc(imgSrc)}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imgSrc}
                      alt=""
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ background: 'rgba(0,0,0,0.4)' }}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ color: '#fff' }}>
                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightboxSrc && (
        <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
      )}
    </section>
  );
}
