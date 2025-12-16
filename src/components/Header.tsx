'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Initial theme setup
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = saved || (prefersDark ? 'dark' : 'light');
    setTheme(initial);
    
    // Apply initial class
    if (initial === 'dark') {
      document.body.classList.add('dark-mode');
      document.documentElement.classList.remove('light');
    } else {
      document.body.classList.remove('dark-mode');
      document.documentElement.classList.add('light');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    if (newTheme === 'dark') {
      document.body.classList.add('dark-mode');
      document.documentElement.classList.remove('light');
    } else {
      document.body.classList.remove('dark-mode');
      document.documentElement.classList.add('light');
    }
  };

  // Prevent hydration mismatch for theme
  if (!mounted) {
    return (
        <header className="site-header">
            <nav className="nav container">
                 <div className="logo"><span style={{width: 70}}></span></div>
            </nav>
        </header>
    );
  }

  return (
    <header className={`site-header ${theme === 'dark' ? 'dark-mode' : ''}`}>
      <nav className="nav container">
        <Link href="/" className="logo">
          <Image 
            src="/logo.png" 
            alt="Bryane Autos" 
            width={70} 
            height={70} 
            style={{ width: '70px', height: 'auto' }} 
            priority 
          />
        </Link>

        {/* Mobile Toggle */}
        <button 
          id="navToggle" 
          className="btn btn-ghost" 
          aria-label="Toggle menu" 
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg width="20" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Nav Links */}
        <ul className={`nav-links ${isOpen ? 'open' : ''}`} id="navLinks">
          <li><Link href="/cars" onClick={() => setIsOpen(false)}>Browse To Buy</Link></li>
          <li><Link href="/booking" onClick={() => setIsOpen(false)}>Booking</Link></li>
          <li><Link href="/insights" onClick={() => setIsOpen(false)}>Insights</Link></li>
          <li><Link href="/about" onClick={() => setIsOpen(false)}>About</Link></li>
          <li><Link href="/contact" onClick={() => setIsOpen(false)}>Contact</Link></li>
        </ul>

        <div className="actions">
          <button 
            id="themeToggle" 
            className="btn btn-ghost" 
            aria-pressed={theme === 'dark'} 
            aria-label="Toggle theme"
            onClick={toggleTheme}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <Link className="btn btn-primary" href="/booking">Book Now</Link>
        </div>
      </nav>
    </header>
  );
}
