import { motion, useInView, useSpring } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { Code, Palette, Camera, Coffee, Layers, Zap } from 'lucide-react';
import { useMousePosition } from '../hooks/useMouse';
import TiltCard from './ui/TiltCard';

const highlights = [
  { icon: Code, label: 'Full-Stack Dev', value: '6+ Years', color: 'from-neon-blue to-cyan-400' },
  { icon: Palette, label: 'Graphic Design', value: '8+ Years', color: 'from-neon-purple to-pink-400' },
  { icon: Camera, label: 'Photography', value: '500+ Photos', color: 'from-cyber-500 to-emerald-400' },
  { icon: Coffee, label: 'Projects', value: '50+ Delivered', color: 'from-amber-400 to-orange-500' },
];

const passions = [
  {
    icon: Layers,
    title: 'Clean Architecture',
    desc: 'Building scalable, maintainable systems with Python, Django, and modern frameworks.',
  },
  {
    icon: Palette,
    title: 'Visual Storytelling',
    desc: 'Translating ideas into compelling visual narratives through design and photography.',
  },
  {
    icon: Zap,
    title: 'Performance First',
    desc: 'Optimizing every layer — from database queries to pixel-perfect UI rendering.',
  },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const mouse = useMousePosition();

  const orbSpring = { damping: 50, stiffness: 60 };
  const orbX = useSpring(0, orbSpring);
  const orbY = useSpring(0, orbSpring);

  useEffect(() => {
    orbX.set(mouse.normalizedX * 30);
    orbY.set(mouse.normalizedY * 30);
  }, [mouse.normalizedX, mouse.normalizedY, orbX, orbY]);

  return (
    <section id="about" className="relative py-20 sm:py-24 lg:py-32 overflow-hidden">
      {/* Mouse-reactive background orbs */}
      <motion.div
        style={{ x: orbX, y: orbY }}
        className="absolute top-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-neon-purple/5 rounded-full blur-[150px]"
      />
      <motion.div
        style={{ x: orbX, y: orbY }}
        className="absolute bottom-0 left-0 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-neon-blue/5 rounded-full blur-[120px]"
      />

      <div ref={ref} className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-neon-blue bg-neon-blue/10 rounded-full border border-neon-blue/20 mb-4">
            About Me
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 sm:mb-4">
            Where <span className="gradient-text">Code Meets Creativity</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-2">
            A multidisciplinary creator who bridges the gap between technical excellence and artistic vision.
          </p>
        </motion.div>

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start mb-16 lg:mb-20">
          {/* Left - Story */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-5 sm:space-y-6">
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                I'm a passionate full-stack developer and creative designer based in Portland, Oregon. 
                With over <span className="text-white font-semibold">6 years of experience</span> in 
                Python development and <span className="text-white font-semibold">8 years in graphic design</span>, 
                I bring a unique blend of technical depth and creative thinking to every project.
              </p>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                My journey started with a fascination for both art and technology. I discovered that 
                the best digital products emerge when engineering precision meets creative intuition. 
                Whether I'm architecting a Django backend, designing a brand identity in Figma, 
                or capturing the magic of a misty mountain at sunrise — I approach every craft with 
                the same dedication to excellence.
              </p>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                When I'm not coding or designing, you'll find me exploring the Pacific Northwest 
                with my camera, chasing golden-hour light through old-growth forests and 
                capturing the quiet beauty of the natural world.
              </p>

              {/* Passion cards – interactive hover */}
              <div className="grid gap-3 sm:gap-4 mt-6 sm:mt-8">
                {passions.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.15 }}
                    whileHover={{ x: 6, transition: { duration: 0.25 } }}
                    className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-neon-blue/20 hover:bg-neon-blue/[0.03] transition-all duration-300 group cursor-default"
                  >
                    <div className="p-2 sm:p-2.5 rounded-lg bg-neon-blue/10 text-neon-blue group-hover:bg-neon-blue/20 group-hover:shadow-lg group-hover:shadow-neon-blue/10 transition-all shrink-0">
                      <item.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-white font-semibold text-sm sm:text-base mb-0.5 sm:mb-1">{item.title}</h4>
                      <p className="text-gray-500 text-xs sm:text-sm">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right - Stats & Visual with tilt cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Stats grid – 3D tilt */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
              {highlights.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  <TiltCard
                    className="rounded-2xl"
                    tiltAmount={15}
                    glareOpacity={0.1}
                  >
                    <div className="group relative p-4 sm:p-6 rounded-2xl glass-card hover:border-white/10 transition-all duration-300 h-full">
                      <div className={`inline-flex p-2 sm:p-3 rounded-xl bg-gradient-to-br ${stat.color} mb-3 sm:mb-4 opacity-80 group-hover:opacity-100 transition-opacity`}>
                        <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                      <div className="text-xl sm:text-2xl lg:text-3xl font-black text-white mb-0.5 sm:mb-1">{stat.value}</div>
                      <div className="text-gray-500 text-xs sm:text-sm font-medium">{stat.label}</div>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>

            {/* Code snippet – tilt interactive */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
            >
              <TiltCard className="rounded-2xl" tiltAmount={8} glareOpacity={0.06}>
                <div className="rounded-2xl overflow-hidden border border-white/5">
                  <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 sm:py-3 bg-dark-800 border-b border-white/5">
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/60" />
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/60" />
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/60" />
                    <span className="ml-1.5 sm:ml-2 text-gray-600 text-[10px] sm:text-xs font-mono">about_me.py</span>
                  </div>
                  <div className="p-3 sm:p-5 bg-dark-900 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto">
                    <div>
                      <span className="text-neon-purple">class</span>{' '}
                      <span className="text-neon-blue">Developer</span>
                      <span className="text-gray-500">:</span>
                    </div>
                    <div className="pl-4 sm:pl-6">
                      <span className="text-neon-purple">def</span>{' '}
                      <span className="text-cyber-400">__init__</span>
                      <span className="text-gray-400">(self):</span>
                    </div>
                    <div className="pl-8 sm:pl-12">
                      <span className="text-gray-400">self.</span>
                      <span className="text-white">name</span>
                      <span className="text-gray-500"> = </span>
                      <span className="text-emerald-400">"Alex Rivera"</span>
                    </div>
                    <div className="pl-8 sm:pl-12">
                      <span className="text-gray-400">self.</span>
                      <span className="text-white">roles</span>
                      <span className="text-gray-500"> = </span>
                      <span className="text-gray-400">[</span>
                    </div>
                    <div className="pl-12 sm:pl-16">
                      <span className="text-emerald-400">"Full-Stack Dev"</span>
                      <span className="text-gray-600">,</span>
                    </div>
                    <div className="pl-12 sm:pl-16">
                      <span className="text-emerald-400">"Designer"</span>
                      <span className="text-gray-600">,</span>
                    </div>
                    <div className="pl-12 sm:pl-16">
                      <span className="text-emerald-400">"Photographer"</span>
                    </div>
                    <div className="pl-8 sm:pl-12">
                      <span className="text-gray-400">]</span>
                    </div>
                    <div className="pl-8 sm:pl-12">
                      <span className="text-gray-400">self.</span>
                      <span className="text-white">passion</span>
                      <span className="text-gray-500"> = </span>
                      <span className="text-amber-400">float</span>
                      <span className="text-gray-400">(</span>
                      <span className="text-emerald-400">"inf"</span>
                      <span className="text-gray-400">)</span>
                      <span className="text-gray-600"> 🚀</span>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
