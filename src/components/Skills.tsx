import { motion, useInView, useSpring } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Server, Monitor, Palette, Database, Wrench, Cloud } from 'lucide-react';
import { useMousePosition } from '../hooks/useMouse';
import TiltCard from './ui/TiltCard';

interface Skill {
  name: string;
  level: number;
  color: string;
}

interface SkillCategory {
  id: string;
  title: string;
  icon: React.ElementType;
  description: string;
  skills: Skill[];
  gradient: string;
}

const categories: SkillCategory[] = [
  {
    id: 'python',
    title: 'Python & Backend',
    icon: Server,
    description: 'Building robust server-side applications and APIs',
    gradient: 'from-neon-blue to-cyan-400',
    skills: [
      { name: 'Python', level: 95, color: 'bg-neon-blue' },
      { name: 'Django / DRF', level: 92, color: 'bg-cyan-400' },
      { name: 'FastAPI', level: 88, color: 'bg-sky-400' },
      { name: 'Flask', level: 85, color: 'bg-teal-400' },
      { name: 'Celery / Redis', level: 80, color: 'bg-emerald-400' },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    icon: Monitor,
    description: 'Creating responsive and interactive user interfaces',
    gradient: 'from-neon-purple to-pink-400',
    skills: [
      { name: 'React / Next.js', level: 90, color: 'bg-neon-purple' },
      { name: 'TypeScript', level: 87, color: 'bg-violet-400' },
      { name: 'Tailwind CSS', level: 93, color: 'bg-pink-400' },
      { name: 'HTML5 / CSS3', level: 95, color: 'bg-fuchsia-400' },
      { name: 'Vue.js', level: 75, color: 'bg-rose-400' },
    ],
  },
  {
    id: 'design',
    title: 'Design Tools',
    icon: Palette,
    description: 'Crafting visual experiences with industry-standard tools',
    gradient: 'from-amber-400 to-orange-500',
    skills: [
      { name: 'Figma', level: 94, color: 'bg-amber-400' },
      { name: 'Adobe Photoshop', level: 92, color: 'bg-orange-400' },
      { name: 'Adobe Illustrator', level: 88, color: 'bg-yellow-400' },
      { name: 'After Effects', level: 78, color: 'bg-red-400' },
      { name: 'Lightroom', level: 90, color: 'bg-amber-500' },
    ],
  },
  {
    id: 'database',
    title: 'Database & Storage',
    icon: Database,
    description: 'Managing data with modern database technologies',
    gradient: 'from-emerald-400 to-green-500',
    skills: [
      { name: 'PostgreSQL', level: 90, color: 'bg-emerald-400' },
      { name: 'MongoDB', level: 82, color: 'bg-green-400' },
      { name: 'Redis', level: 85, color: 'bg-teal-400' },
      { name: 'Elasticsearch', level: 75, color: 'bg-lime-400' },
    ],
  },
  {
    id: 'devops',
    title: 'DevOps & Cloud',
    icon: Cloud,
    description: 'Deploying and scaling applications in the cloud',
    gradient: 'from-sky-400 to-blue-500',
    skills: [
      { name: 'Docker', level: 88, color: 'bg-sky-400' },
      { name: 'AWS', level: 82, color: 'bg-blue-400' },
      { name: 'CI/CD', level: 85, color: 'bg-indigo-400' },
      { name: 'Linux / Nginx', level: 87, color: 'bg-cyan-500' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & Methods',
    icon: Wrench,
    description: 'Leveraging best practices and modern workflows',
    gradient: 'from-rose-400 to-red-500',
    skills: [
      { name: 'Git / GitHub', level: 93, color: 'bg-rose-400' },
      { name: 'Agile / Scrum', level: 88, color: 'bg-red-400' },
      { name: 'REST / GraphQL', level: 90, color: 'bg-pink-400' },
      { name: 'Testing / TDD', level: 85, color: 'bg-orange-400' },
    ],
  },
];

/* ── Interactive Skill Bar with hover glow ──────────────── */
function SkillBar({ skill, delay }: { skill: Skill; delay: number }) {
  const barRef = useRef<HTMLDivElement>(null);
  const [hoverX, setHoverX] = useState<number | null>(null);

  return (
    <div
      className="group cursor-default"
      ref={barRef}
      onMouseMove={(e) => {
        const rect = barRef.current?.getBoundingClientRect();
        if (rect) setHoverX(((e.clientX - rect.left) / rect.width) * 100);
      }}
      onMouseLeave={() => setHoverX(null)}
    >
      <div className="flex justify-between mb-1.5 sm:mb-2">
        <span className="text-gray-300 text-xs sm:text-sm font-medium group-hover:text-white transition-colors">{skill.name}</span>
        <span className="text-gray-500 text-xs sm:text-sm font-mono">{skill.level}%</span>
      </div>
      <div className="h-1.5 sm:h-2 bg-dark-700 rounded-full overflow-hidden relative">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${skill.level}%` }}
          transition={{ duration: 1.2, delay, ease: [0.4, 0, 0.2, 1] }}
          className={`h-full rounded-full ${skill.color} relative`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20" />
        </motion.div>
        {/* Mouse glow indicator */}
        {hoverX !== null && (
          <div
            className="absolute top-0 h-full w-8 sm:w-12 rounded-full pointer-events-none transition-opacity duration-200"
            style={{
              left: `calc(${hoverX}% - 16px)`,
              background: 'radial-gradient(circle, rgba(0,212,255,0.25) 0%, transparent 70%)',
            }}
          />
        )}
      </div>
    </div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [activeTab, setActiveTab] = useState('python');
  const mouse = useMousePosition();

  const orbSpring = { damping: 50, stiffness: 60 };
  const oX = useSpring(0, orbSpring);
  const oY = useSpring(0, orbSpring);

  useEffect(() => {
    oX.set(mouse.normalizedX * 25);
    oY.set(mouse.normalizedY * 25);
  }, [mouse.normalizedX, mouse.normalizedY, oX, oY]);

  const activeCategory = categories.find((c) => c.id === activeTab)!;

  return (
    <section id="skills" className="relative py-20 sm:py-24 lg:py-32 overflow-hidden">
      <motion.div style={{ x: oX, y: oY }} className="absolute top-1/3 left-0 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-neon-blue/5 rounded-full blur-[120px]" />
      <motion.div style={{ x: oX, y: oY }} className="absolute bottom-1/3 right-0 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-neon-purple/5 rounded-full blur-[120px]" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-neon-purple bg-neon-purple/10 rounded-full border border-neon-purple/20 mb-4">
            Skills & Expertise
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 sm:mb-4">
            My <span className="gradient-text">Tech Stack</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-2">
            A comprehensive toolkit honed over years of building products, designing experiences, and solving complex problems.
          </p>
        </motion.div>

        {/* Tabs – scrollable on small screens */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex overflow-x-auto scrollbar-hide gap-2 sm:gap-3 mb-8 sm:mb-12 pb-2 sm:pb-0 sm:flex-wrap sm:justify-center -mx-2 px-2 sm:mx-0 sm:px-0"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-3 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap shrink-0 ${
                activeTab === cat.id
                  ? 'bg-white/10 text-white border border-white/10 shadow-lg'
                  : 'text-gray-500 hover:text-gray-300 hover:bg-white/5 border border-transparent'
              }`}
            >
              <cat.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline sm:hidden md:inline">{cat.title}</span>
              <span className="xs:hidden sm:inline md:hidden">{cat.title.split(' ')[0]}</span>
            </button>
          ))}
        </motion.div>

        {/* Active category detail – 3D tilt on cards */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid md:grid-cols-2 gap-5 sm:gap-8 items-start"
        >
          {/* Left - Description card with tilt */}
          <TiltCard className="rounded-2xl" tiltAmount={10} glareOpacity={0.06}>
            <div className="glass-card rounded-2xl p-5 sm:p-8 relative overflow-hidden h-full">
              <div className="absolute top-0 left-0 w-full h-1">
                <div className={`w-full h-full bg-gradient-to-r ${activeCategory.gradient}`} />
              </div>

              <div className={`inline-flex p-3 sm:p-4 rounded-2xl bg-gradient-to-br ${activeCategory.gradient} mb-4 sm:mb-6`}>
                <activeCategory.icon className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
              </div>

              <h3 className="text-lg sm:text-2xl font-bold text-white mb-2 sm:mb-3">{activeCategory.title}</h3>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-5 sm:mb-8">{activeCategory.description}</p>

              {/* Visual stat chips */}
              <div className="grid grid-cols-2 xs:grid-cols-3 gap-2 sm:gap-3">
                {activeCategory.skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="relative p-2.5 sm:p-3 rounded-xl bg-white/[0.03] border border-white/5 text-center group hover:border-white/10 transition-all cursor-default"
                  >
                    <div className="text-lg sm:text-xl font-black text-white mb-0.5 sm:mb-1">
                      {skill.level}<span className="text-[10px] sm:text-xs text-gray-500">%</span>
                    </div>
                    <div className="text-[10px] sm:text-xs text-gray-500 font-medium truncate">{skill.name}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </TiltCard>

          {/* Right - Skill bars with tilt */}
          <TiltCard className="rounded-2xl" tiltAmount={8} glareOpacity={0.04}>
            <div className="glass-card rounded-2xl p-5 sm:p-8 h-full">
              <h4 className="text-base sm:text-lg font-semibold text-white mb-5 sm:mb-8">Proficiency Levels</h4>
              <div className="space-y-4 sm:space-y-6">
                {activeCategory.skills.map((skill, i) => (
                  <SkillBar key={skill.name} skill={skill} delay={i * 0.1} />
                ))}
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  );
}
