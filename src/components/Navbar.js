'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [active, setActive] = useState('home');

  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'dark';
    setTheme(saved);
    document.documentElement.classList.toggle('light', saved === 'light');

    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = ['home','about','skills','experience','projects','github','contact'];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) { setActive(id); break; }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('theme', next);
    document.documentElement.classList.toggle('light', next === 'light');
  };

  const links = ['about','skills','experience','projects','github','contact'];

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`} id="navbar">
      <div className="nav-container">
        <a href="#home" className="nav-logo">
          <span className="logo-bracket">&lt;</span>AS<span className="logo-bracket">/&gt;</span>
        </a>

        <ul className={`nav-links${menuOpen ? ' open' : ''}`} id="nav-links">
          {links.map(l => (
            <li key={l}>
              <a href={`#${l}`} className={active === l ? 'active' : ''}
                onClick={() => setMenuOpen(false)}
                style={{ textTransform: 'capitalize' }}>
                {l}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <button className="theme-btn" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? '🌙' : '☀️'}
          </button>
          <a href="/Ali_Shan_CV.pdf" className="btn btn-outline cv-btn" download>Download CV</a>
        </div>

        <button className={`hamburger${menuOpen ? ' active' : ''}`} aria-label="Menu" onClick={() => setMenuOpen(o => !o)}>
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}
