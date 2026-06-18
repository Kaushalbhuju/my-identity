import { Terminal, Heart, ArrowUp, ExternalLink, Globe, MessageCircle } from 'lucide-react';
import MagneticButton from './ui/MagneticButton';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/5 bg-dark-950">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 mb-10 sm:mb-12">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-neon-blue via-cyber-500 to-neon-purple flex items-center justify-center">
                <Terminal className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div>
                <span className="text-base sm:text-lg font-bold text-white">Alex</span>
                <span className="text-base sm:text-lg font-bold gradient-text">Rivera</span>
              </div>
            </div>
            <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
              Full-stack developer, graphic designer, and nature photographer creating
              meaningful digital experiences.
            </p>
            <div className="flex gap-2 sm:gap-3">
              {[ExternalLink, Globe, MessageCircle].map((Icon, i) => (
                <MagneticButton
                  key={i}
                  as="a"
                  href="#"
                  strength={0.4}
                  className="p-2 rounded-lg border border-white/5 text-gray-600 hover:text-neon-blue hover:border-neon-blue/20 hover:bg-neon-blue/5 transition-all"
                >
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </MagneticButton>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-3 sm:mb-4 text-xs sm:text-sm">Navigation</h4>
            <ul className="space-y-2 sm:space-y-3">
              {['About', 'Skills', 'Projects', 'Photography', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-gray-500 hover:text-white text-xs sm:text-sm transition-colors hover:translate-x-1 inline-block"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-3 sm:mb-4 text-xs sm:text-sm">Services</h4>
            <ul className="space-y-2 sm:space-y-3">
              {['Web Development', 'API Development', 'UI/UX Design', 'Brand Identity', 'Photography'].map((service) => (
                <li key={service}>
                  <span className="text-gray-500 text-xs sm:text-sm">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech */}
          <div className="col-span-2 sm:col-span-1">
            <h4 className="text-white font-semibold mb-3 sm:mb-4 text-xs sm:text-sm">Technologies</h4>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {['Python', 'Django', 'React', 'TypeScript', 'PostgreSQL', 'Docker', 'AWS', 'Figma'].map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-xs font-medium text-gray-500 bg-white/[0.03] border border-white/5 rounded-lg hover:border-white/10 hover:text-gray-400 transition-all cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 pt-6 sm:pt-8 border-t border-white/5">
          <p className="text-gray-600 text-xs sm:text-sm flex items-center gap-1 flex-wrap justify-center">
            © {new Date().getFullYear()} Alex Rivera. Crafted with
            <Heart className="w-3 h-3 text-red-500 fill-red-500" />
            and lots of
            <span className="text-amber-500">☕</span>
          </p>

          <MagneticButton
            onClick={scrollToTop}
            strength={0.5}
            className="p-2 rounded-lg border border-white/10 text-gray-500 hover:text-white hover:border-neon-blue/30 hover:bg-neon-blue/5 transition-all"
          >
            <ArrowUp className="w-4 h-4" />
          </MagneticButton>
        </div>
      </div>
    </footer>
  );
}
