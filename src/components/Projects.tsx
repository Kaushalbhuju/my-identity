import { motion, useInView, AnimatePresence, useSpring } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ExternalLink, ArrowUpRight, Layers, Code, Palette } from 'lucide-react';
import { useMousePosition } from '../hooks/useMouse';
import TiltCard from './ui/TiltCard';
import MagneticButton from './ui/MagneticButton';

type ProjectCategory = 'all' | 'fullstack' | 'design';

interface Project {
  id: number;
  title: string;
  description: string;
  category: 'fullstack' | 'design';
  tags: string[];
  gradient: string;
  icon: string;
  link: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'EcoTrack Dashboard',
    description: 'A real-time environmental monitoring platform with interactive data visualization, built for conservation organizations to track wildlife and habitat metrics.',
    category: 'fullstack',
    tags: ['Django', 'React', 'PostgreSQL', 'D3.js', 'Redis'],
    gradient: 'from-emerald-500/20 to-teal-500/20',
    icon: '🌿',
    link: '#',
    featured: true,
  },
  {
    id: 2,
    title: 'CloudNote AI',
    description: 'AI-powered note-taking application with automatic categorization, smart search, and collaborative features for distributed teams.',
    category: 'fullstack',
    tags: ['FastAPI', 'Next.js', 'MongoDB', 'OpenAI', 'WebSockets'],
    gradient: 'from-blue-500/20 to-indigo-500/20',
    icon: '🧠',
    link: '#',
    featured: true,
  },
  {
    id: 3,
    title: 'Nebula Brand Identity',
    description: 'Complete brand identity design for a SaaS startup, including logo, color system, typography, business cards, and brand guidelines document.',
    category: 'design',
    tags: ['Figma', 'Illustrator', 'Brand Strategy', 'Typography'],
    gradient: 'from-purple-500/20 to-pink-500/20',
    icon: '✨',
    link: '#',
    featured: true,
  },
  {
    id: 4,
    title: 'MarketPulse API',
    description: 'High-performance REST API serving real-time market data to 10,000+ concurrent users with sub-50ms response times.',
    category: 'fullstack',
    tags: ['Python', 'FastAPI', 'Redis', 'Docker', 'AWS'],
    gradient: 'from-amber-500/20 to-orange-500/20',
    icon: '📊',
    link: '#',
  },
  {
    id: 5,
    title: 'Aurora UI Kit',
    description: 'A comprehensive design system with 200+ components, dark/light themes, and fully responsive patterns for modern web applications.',
    category: 'design',
    tags: ['Figma', 'Design Systems', 'Prototyping', 'A11y'],
    gradient: 'from-cyan-500/20 to-sky-500/20',
    icon: '🎨',
    link: '#',
  },
  {
    id: 6,
    title: 'DevFlow Platform',
    description: 'Developer collaboration platform with code review, CI/CD integration, and project management tools for agile teams.',
    category: 'fullstack',
    tags: ['Django', 'React', 'PostgreSQL', 'Celery', 'Docker'],
    gradient: 'from-rose-500/20 to-red-500/20',
    icon: '🚀',
    link: '#',
  },
  {
    id: 7,
    title: 'Wellness App Redesign',
    description: 'Complete UX/UI redesign of a wellness application, improving user retention by 45% through intuitive navigation and delightful micro-interactions.',
    category: 'design',
    tags: ['Figma', 'User Research', 'Prototyping', 'Motion Design'],
    gradient: 'from-green-500/20 to-emerald-500/20',
    icon: '🧘',
    link: '#',
  },
  {
    id: 8,
    title: 'SecureVault Backend',
    description: 'Enterprise-grade encryption service with zero-knowledge architecture, handling sensitive data for healthcare organizations.',
    category: 'fullstack',
    tags: ['Python', 'Flask', 'PostgreSQL', 'Vault', 'AWS KMS'],
    gradient: 'from-slate-500/20 to-zinc-500/20',
    icon: '🔐',
    link: '#',
  },
];

const filters: { label: string; value: ProjectCategory; icon: React.ElementType }[] = [
  { label: 'All Projects', value: 'all', icon: Layers },
  { label: 'Full-Stack', value: 'fullstack', icon: Code },
  { label: 'Design', value: 'design', icon: Palette },
];

/* ── Project Card with 3D tilt + mouse-aware glow ──────── */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08 }}
    >
      <TiltCard className="rounded-2xl h-full" tiltAmount={12} glareOpacity={0.08} scale={1.02}>
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          className="group relative rounded-2xl overflow-hidden glass-card hover:border-white/10 transition-all duration-500 h-full"
        >
          {/* Mouse-following border glow */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10 rounded-2xl"
            style={{
              background: `radial-gradient(circle 200px at ${mousePos.x}% ${mousePos.y}%, rgba(0,212,255,0.08), transparent)`,
            }}
          />

          {/* Gradient top */}
          <div className={`h-36 sm:h-44 lg:h-52 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
            <div className="absolute inset-0 grid-bg opacity-50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.span
                className="text-5xl sm:text-6xl lg:text-7xl select-none"
                whileHover={{ scale: 1.3, rotate: 12 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {project.icon}
              </motion.span>
            </div>
            {project.featured && (
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 px-2.5 py-0.5 sm:px-3 sm:py-1 bg-neon-blue/20 border border-neon-blue/30 rounded-full text-neon-blue text-[10px] sm:text-xs font-semibold">
                Featured
              </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 h-12 sm:h-16 bg-gradient-to-t from-dark-800/90 to-transparent" />
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6 relative z-10">
            <div className="flex items-start justify-between mb-2 sm:mb-3">
              <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-neon-blue transition-colors">
                {project.title}
              </h3>
              <a
                href={project.link}
                className="p-1.5 sm:p-2 rounded-lg text-gray-600 hover:text-neon-blue hover:bg-neon-blue/10 transition-all opacity-0 group-hover:opacity-100 shrink-0"
                aria-label={`View ${project.title}`}
              >
                <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
            </div>

            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-3">{project.description}</p>

            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-xs font-medium text-gray-400 bg-white/[0.03] border border-white/5 rounded-lg"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [filter, setFilter] = useState<ProjectCategory>('all');
  const mouse = useMousePosition();

  const orbX = useSpring(0, { damping: 50, stiffness: 60 });
  const orbY = useSpring(0, { damping: 50, stiffness: 60 });

  useEffect(() => {
    orbX.set(mouse.normalizedX * 25);
    orbY.set(mouse.normalizedY * 25);
  }, [mouse.normalizedX, mouse.normalizedY, orbX, orbY]);

  const filtered = filter === 'all' ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="relative py-20 sm:py-24 lg:py-32 overflow-hidden">
      <motion.div style={{ x: orbX, y: orbY }} className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] sm:w-[800px] h-[300px] sm:h-[400px] bg-neon-purple/5 rounded-full blur-[150px]" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-cyber-400 bg-cyber-500/10 rounded-full border border-cyber-500/20 mb-4">
            Portfolio
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 sm:mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-2">
            A curated selection of full-stack applications and design work that showcase my technical expertise and creative vision.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center gap-2 sm:gap-3 mb-8 sm:mb-12"
        >
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 ${
                filter === f.value
                  ? 'bg-white/10 text-white border border-white/10'
                  : 'text-gray-500 hover:text-gray-300 hover:bg-white/5 border border-transparent'
              }`}
            >
              <f.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">{f.label}</span>
              <span className="sm:hidden">{f.label.split(' ').pop()}</span>
            </button>
          ))}
        </motion.div>

        {/* Project grid – AnimatePresence for filter transitions */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>
        </div>

        {/* More CTA – magnetic */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-8 sm:mt-12"
        >
          <MagneticButton
            as="a"
            href="#"
            strength={0.3}
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 text-gray-400 hover:text-white border border-white/10 hover:border-neon-blue/30 rounded-xl transition-all duration-300 hover:bg-neon-blue/5 text-xs sm:text-sm font-medium"
          >
            <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            View All on GitHub
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
