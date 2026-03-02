'use client';
import { useEffect, useCallback, useRef } from 'react';
import { type ProjectMedia } from '@/lib/constants';

interface MediaLightboxProps {
  media: ProjectMedia[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function MediaLightbox({
  media,
  currentIndex,
  onClose,
  onNavigate,
}: MediaLightboxProps) {
  const item = media[currentIndex];
  const videoRef = useRef<HTMLVideoElement>(null);

  const prev = () => onNavigate((currentIndex - 1 + media.length) % media.length);
  const next = () => onNavigate((currentIndex + 1) % media.length);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentIndex]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [handleKey]);


  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      {/* Close */}
      <button
        className="absolute top-5 right-5 p-2 rounded-lg transition-all duration-200 z-10"
        style={{ background: 'rgba(255,255,255,0.08)', color: '#94a3b8' }}
        onClick={onClose}
        aria-label="Close"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>

      {/* Prev */}
      {media.length > 1 && (
        <button
          className="absolute left-4 md:left-8 p-3 rounded-xl transition-all duration-200 z-10"
          style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8' }}
          onClick={(e) => { e.stopPropagation(); prev(); }}
          aria-label="Previous"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}

      {/* Media */}
      <div
        className="relative max-w-5xl max-h-[85vh] mx-16 flex flex-col items-center gap-4"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'fadeInUp 0.25s ease forwards' }}
      >
      {item.type === 'image' ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.src}
          alt={item.caption ?? ''}
          className="rounded-xl object-contain"
          style={{ maxHeight: '75vh', maxWidth: '90vw', boxShadow: '0 0 60px rgba(0,0,0,0.6)' }}
        />
      ) : (
        <video
          ref={videoRef}
          controls
          autoPlay
          playsInline
          className="rounded-xl"
          style={{ maxHeight: '75vh', maxWidth: '90vw', boxShadow: '0 0 60px rgba(0,0,0,0.6)' }}
        >
          <source src={item.src} />
          Your browser does not support HTML5 video.
        </video>
      )}

        {/* Caption + counter */}
        <div className="flex items-center gap-4">
          {item.caption && (
            <p className="text-sm" style={{ color: '#94a3b8' }}>{item.caption}</p>
          )}
          {media.length > 1 && (
            <span
              className="text-xs px-2.5 py-1 rounded-full"
              style={{ background: 'rgba(255,255,255,0.08)', color: '#64748b', fontFamily: 'var(--font-geist-mono)' }}
            >
              {currentIndex + 1} / {media.length}
            </span>
          )}
        </div>

        {/* Dot indicators */}
        {media.length > 1 && (
          <div className="flex gap-2">
            {media.map((_, i) => (
              <button
                key={i}
                onClick={() => onNavigate(i)}
                className="rounded-full transition-all duration-200"
                style={{
                  width: i === currentIndex ? 20 : 6,
                  height: 6,
                  background: i === currentIndex ? 'var(--cyan)' : 'rgba(255,255,255,0.2)',
                }}
                aria-label={`Go to media ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Next */}
      {media.length > 1 && (
        <button
          className="absolute right-4 md:right-8 p-3 rounded-xl transition-all duration-200 z-10"
          style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8' }}
          onClick={(e) => { e.stopPropagation(); next(); }}
          aria-label="Next"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}
    </div>
  );
}
