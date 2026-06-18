import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Code2, Terminal } from 'lucide-react';
import MagneticButton from './ui/MagneticButton';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Photography', href: '#photography' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navLinks.map(l => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-dark-950/80 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
            {/* Logo */}
            <MagneticButton
              as="a"
              href="#hero"
              strength={0.2}
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center gap-1.5 sm:gap-2 group"
            >
              <div className="relative w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-neon-blue via-cyber-500 to-neon-purple flex items-center justify-center overflow-hidden">
                <Terminal className="w-4 h-4 sm:w-5 sm:h-5 text-white relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-br from-neon-blue to-neon-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="hidden sm:block">
                <span className="text-base md:text-lg font-bold text-white">Alex</span>
                <span className="text-base md:text-lg font-bold gradient-text">Rivera</span>
              </div>
            </MagneticButton>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-0.5 lg:gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleClick(link.href); }}
                  className={`relative px-3 lg:px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-lg ${
                    activeSection === link.href.slice(1)
                      ? 'text-neon-blue'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {activeSection === link.href.slice(1) && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 bg-neon-blue/10 rounded-lg border border-neon-blue/20"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              ))}
            </div>

            {/* CTA + Mobile button */}
            <div className="flex items-center gap-2 sm:gap-3">
              <MagneticButton
                as="a"
                href="#contact"
                strength={0.25}
                onClick={(e) => { e.preventDefault(); handleClick('#contact'); }}
                className="hidden md:flex items-center gap-2 px-4 lg:px-5 py-2 lg:py-2.5 bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 hover:from-neon-blue/30 hover:to-neon-purple/30 border border-neon-blue/30 rounded-xl text-xs lg:text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-neon-blue/10"
              >
                <Code2 className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                Let's Talk
              </MagneticButton>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors active:scale-95"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-dark-950/98 backdrop-blur-2xl pt-16 sm:pt-20"
          >
            <div className="flex flex-col items-center gap-1.5 p-5 sm:p-6 max-w-md mx-auto">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: i * 0.07 }}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleClick(link.href); }}
                  className={`w-full text-center py-3.5 sm:py-4 text-base sm:text-lg font-medium rounded-xl transition-all active:scale-[0.98] ${
                    activeSection === link.href.slice(1)
                      ? 'text-neon-blue bg-neon-blue/10'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.4 }}
                href="#contact"
                onClick={(e) => { e.preventDefault(); handleClick('#contact'); }}
                className="mt-3 w-full text-center py-3.5 sm:py-4 bg-gradient-to-r from-neon-blue to-neon-purple rounded-xl text-white font-semibold text-base sm:text-lg active:scale-[0.98] transition-transform"
              >
                Let's Talk
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
