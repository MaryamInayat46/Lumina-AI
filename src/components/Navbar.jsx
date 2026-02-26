import React, { useState, useEffect } from 'react';
import { Menu, X, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONTENT } from '../data/content';

const Navbar = () => {
  const { navbar } = CONTENT;
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [status, setStatus] = useState('loading'); // loading, online, offline

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const checkStatus = async () => {
      try {
        const res = await fetch('https://kctbh9vrtdwd.statuspage.io/api/v2/status.json');
        const data = await res.json();
        // Artificial delay for shimmer effect demo
        await new Promise(r => setTimeout(r, 1000));
        setStatus(data.status.indicator === 'none' ? 'online' : 'offline');
      } catch (err) {
        setStatus('offline');
      }
    };

    window.addEventListener('scroll', handleScroll);
    checkStatus();

    const interval = setInterval(checkStatus, 60000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'py-4 glass shadow-lg' : 'py-6 bg-transparent'
        }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2 group cursor-pointer" role="link" aria-label="Lumina AI Home">
          <div className="p-2 bg-neon-blue/10 rounded-lg group-hover:bg-neon-blue/20 transition-colors">
            <Zap className="w-6 h-6 text-neon-blue" />
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Lumina AI
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {/* Status Indicator / Skeleton */}
          {status === 'loading' ? (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 animate-pulse">
              <div className="w-2 h-2 rounded-full bg-slate-700" />
              <div className="w-24 h-2 bg-slate-700 rounded-full" />
            </div>
          ) : (
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10"
              role="status"
              aria-live="polite"
            >
              <div className={`w-2 h-2 rounded-full ${status === 'online' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]' :
                  status === 'offline' ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]' : 'bg-slate-500'
                } ${status === 'online' ? 'animate-pulse' : ''}`} />
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {status === 'online' ? 'Systems Operational' : 'System Issues Detected'}
              </span>
            </div>
          )}

          {navbar.links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-400 hover:text-neon-blue transition-colors"
              aria-label={`Go to ${link.name}`}
            >
              {link.name}
            </a>
          ))}
          <button
            className="px-5 py-2.5 rounded-full bg-neon-blue text-slate-950 text-sm font-bold hover:scale-105 active:scale-95 transition-all neon-glow"
            aria-label={navbar.cta}
          >
            {navbar.cta}
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-slate-300 p-2 focus:outline-none focus:ring-2 focus:ring-neon-blue rounded-lg"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full glass-dark py-6 flex flex-col items-center gap-6 md:hidden"
            role="menu"
          >
            {navbar.links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-slate-300 hover:text-neon-blue transition-colors"
                role="menuitem"
              >
                {link.name}
              </a>
            ))}
            <button className="px-8 py-3 rounded-full bg-neon-blue text-slate-950 font-bold neon-glow">
              {navbar.cta}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
