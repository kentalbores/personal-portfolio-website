'use client';
import { useState, useEffect } from 'react';
import { personal } from '@/lib/constants';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? 'rgba(5, 5, 16, 0.92)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
      }}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="font-bold text-xl tracking-tight gradient-text"
          style={{ fontFamily: 'var(--font-geist-mono)' }}
        >
          {personal.full_name.split(' ').map(w => w[0]).join('')}.
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleLink(e, link.href)}
                className="relative px-4 py-2 text-sm font-medium transition-colors duration-200 nav-link"
                style={{ color: 'var(--muted)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#f0f4ff')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
              >
                {link.label}
                <span className="nav-dot" />
              </a>
            </li>
          ))}
        </ul>

        {/* Resume CTA */}
        <a
          href={personal.linked_in}
          target="_blank"
          rel="noreferrer"
          className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm btn-outline"
        >
          <span>LinkedIn</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>

        {/* Mobile burger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className="block w-5 h-0.5 transition-all duration-300"
            style={{
              background: 'var(--cyan)',
              transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : '',
            }}
          />
          <span
            className="block w-5 h-0.5 transition-all duration-300"
            style={{
              background: 'var(--cyan)',
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            className="block w-5 h-0.5 transition-all duration-300"
            style={{
              background: 'var(--cyan)',
              transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : '',
            }}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300"
        style={{
          maxHeight: menuOpen ? '400px' : '0',
          background: 'rgba(5, 5, 16, 0.97)',
          backdropFilter: 'blur(16px)',
          borderBottom: menuOpen ? '1px solid rgba(255,255,255,0.05)' : 'none',
        }}
      >
        <ul className="px-6 py-4 flex flex-col gap-1">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleLink(e, link.href)}
                className="block py-3 text-sm font-medium border-b"
                style={{ color: 'var(--muted)', borderColor: 'rgba(255,255,255,0.05)' }}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="pt-4">
            <a
              href={personal.linked_in}
              target="_blank"
              rel="noreferrer"
              className="block text-center py-2.5 text-sm btn-gradient rounded-lg"
            >
              LinkedIn
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
