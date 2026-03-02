'use client';
import { useState, useEffect } from 'react';
import { personal } from '@/lib/constants';

const roles = [
  'Full-Stack Developer',
  'Cybersecurity Enthusiast',
  'Automation Engineer',
  'Systems Developer',
  'BSIT Student',
];

function TypeWriter() {
  const [display, setDisplay] = useState('');
  const [roleIdx, setRoleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = roles[roleIdx];
    const speed = deleting ? 45 : 85;

    const timer = setTimeout(() => {
      if (!deleting) {
        if (charIdx < word.length) {
          setDisplay(word.slice(0, charIdx + 1));
          setCharIdx((c) => c + 1);
        } else {
          setTimeout(() => setDeleting(true), 1800);
        }
      } else {
        if (charIdx > 0) {
          setDisplay(word.slice(0, charIdx - 1));
          setCharIdx((c) => c - 1);
        } else {
          setDeleting(false);
          setRoleIdx((i) => (i + 1) % roles.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [charIdx, deleting, roleIdx]);

  return (
    <span>
      {display}
      <span className="cursor-blink" />
    </span>
  );
}

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg"
    >
      {/* Gradient orbs */}
      <div className="hero-orb-1" />
      <div className="hero-orb-2" />
      <div className="scanline" />

      {/* Vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(5,5,16,0.7) 100%)',
        }}
      />

      <div
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}
      >
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 text-xs font-medium"
          style={{
            background: 'rgba(0, 198, 255, 0.08)',
            border: '1px solid rgba(0, 198, 255, 0.25)',
            color: '#a5f3ff',
            fontFamily: 'var(--font-geist-mono)',
            transitionDelay: '200ms',
          }}
        >
          <span
            className="w-2 h-2 rounded-full"
            style={{
              background: '#22c55e',
              boxShadow: '0 0 8px rgba(34, 197, 94, 0.8)',
            }}
          />
          Open to internships &amp; opportunities
        </div>

        {/* Name */}
        <h1
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-4"
          style={{ lineHeight: 1.1 }}
        >
          <span className="gradient-text">{personal.full_name}</span>
        </h1>

        {/* Role typewriter */}
        <div
          className="text-xl sm:text-2xl md:text-3xl font-medium mb-6 h-10"
          style={{ color: 'var(--muted)', fontFamily: 'var(--font-geist-mono)' }}
        >
          <TypeWriter />
        </div>

        {/* Tagline */}
        <p
          className="text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ color: '#6b7ea0' }}
        >
          Building elegant full-stack systems, automating workflows with AI, and exploring every
          layer of the stack — from web apps to embedded Linux.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button
            onClick={() => scrollTo('#projects')}
            className="px-8 py-3.5 text-sm font-semibold btn-gradient"
            style={{ borderRadius: '8px' }}
          >
            View My Work
          </button>
          <button
            onClick={() => scrollTo('#contact')}
            className="px-8 py-3.5 text-sm btn-outline"
          >
            Get In Touch
          </button>
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-6">
          <a
            href={personal.github}
            target="_blank"
            rel="noreferrer"
            className="social-icon group"
            aria-label="GitHub"
          >
            <svg
              className="transition-all duration-200 group-hover:scale-110"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              style={{ color: 'var(--muted)' }}
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.68-.22.68-.48v-1.68c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.8c.85 0 1.7.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10.02 10.02 0 0022 12c0-5.52-4.48-10-10-10z"
                fill="currentColor"
              />
            </svg>
          </a>
          <a
            href={personal.linked_in}
            target="_blank"
            rel="noreferrer"
            className="group"
            aria-label="LinkedIn"
          >
            <svg
              className="transition-all duration-200 group-hover:scale-110"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              style={{ color: 'var(--muted)' }}
            >
              <path
                d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                fill="currentColor"
              />
              <circle cx="4" cy="4" r="2" fill="currentColor" />
            </svg>
          </a>
          <a
            href={`mailto:${personal.email}`}
            className="group"
            aria-label="Email"
          >
            <svg
              className="transition-all duration-200 group-hover:scale-110"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              style={{ color: 'var(--muted)' }}
            >
              <path
                d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M22 6l-10 7L2 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: mounted ? 0.5 : 0, transition: 'opacity 1s ease 1s' }}
      >
        <span className="text-xs" style={{ color: 'var(--muted)', fontFamily: 'var(--font-geist-mono)' }}>
          scroll
        </span>
        <div
          className="w-0.5 h-8"
          style={{
            background: 'linear-gradient(to bottom, var(--cyan), transparent)',
            animation: 'float 2s ease-in-out infinite',
          }}
        />
      </div>
    </section>
  );
}
