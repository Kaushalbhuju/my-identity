import { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { ArrowDown, ExternalLink, Globe, MessageCircle, MapPin } from 'lucide-react';
import { useMousePosition } from '../hooks/useMouse';
import MagneticButton from './ui/MagneticButton';

const roles = [
  'Full-Stack Python Developer',
  'Graphic Designer',
  'Nature Photographer',
  'UI/UX Enthusiast',
];

/* ── Interactive Particle Field ─────────────────────────── */
function ParticleField() {
  const { x: mx, y: my } = useMousePosition();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<{ x: number; y: number; vx: number; vy: number; size: number; baseOpacity: number; hue: number }[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    mouseRef.current = { x: mx, y: my };
  }, [mx, my]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Init particles
    const count = Math.min(80, Math.floor(window.innerWidth / 15));
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -Math.random() * 0.6 - 0.2,
      size: Math.random() * 2.5 + 0.8,
      baseOpacity: Math.random() * 0.4 + 0.1,
      hue: Math.random() * 60 + 170, // 170-230 blue-cyan range
    }));

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { x: cursorX, y: cursorY } = mouseRef.current;

      for (const p of particlesRef.current) {
        // Mouse repulsion
        const dx = p.x - cursorX;
        const dy = p.y - cursorY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const repelRadius = 150;

        if (dist < repelRadius && dist > 0) {
          const force = (repelRadius - dist) / repelRadius;
          p.vx += (dx / dist) * force * 0.8;
          p.vy += (dy / dist) * force * 0.8;
        }

        // Damping
        p.vx *= 0.97;
        p.vy *= 0.97;

        // Base drift
        p.vy -= 0.01;

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around
        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;

        // Distance glow near cursor
        const glowBoost = dist < 200 ? (200 - dist) / 200 * 0.5 : 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 90%, 65%, ${p.baseOpacity + glowBoost})`;
        ctx.fill();

        // Connect nearby particles with lines
        for (const q of particlesRef.current) {
          if (q === p) continue;
          const ddx = p.x - q.x;
          const ddy = p.y - q.y;
          const dd = Math.sqrt(ddx * ddx + ddy * ddy);
          if (dd < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `hsla(195, 90%, 60%, ${(1 - dd / 100) * 0.07})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animFrameRef.current = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
    />
  );
}

/* ── Hero Section ───────────────────────────────────────── */
export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const mouse = useMousePosition();

  // Parallax springs for background orbs
  const orbSpringConfig = { damping: 40, stiffness: 80 };
  const orbX = useSpring(0, orbSpringConfig);
  const orbY = useSpring(0, orbSpringConfig);

  useEffect(() => {
    orbX.set(mouse.normalizedX * 40);
    orbY.set(mouse.normalizedY * 40);
  }, [mouse.normalizedX, mouse.normalizedY, orbX, orbY]);

  // Secondary orb (opposite / slower)
  const orb2X = useTransform(orbX, v => -v * 0.6);
  const orb2Y = useTransform(orbY, v => -v * 0.6);

  // Typing effect
  useEffect(() => {
    const current = roles[roleIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(current.slice(0, text.length + 1));
        if (text.length === current.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setText(current.slice(0, text.length - 1));
        if (text.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, isDeleting ? 40 : 80);
    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex]);

  return (
    <section id="hero" className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden grid-bg">
      {/* Parallax mouse-following orbs */}
      <motion.div
        style={{ x: orbX, y: orbY }}
        className="absolute top-1/4 -left-32 w-72 h-72 sm:w-96 sm:h-96 bg-neon-blue/10 rounded-full blur-[120px]"
      />
      <motion.div
        style={{ x: orb2X, y: orb2Y }}
        className="absolute bottom-1/4 -right-32 w-72 h-72 sm:w-96 sm:h-96 bg-neon-purple/10 rounded-full blur-[120px]"
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] bg-cyber-500/5 rounded-full blur-[150px]" />

      {/* Interactive canvas particles */}
      <ParticleField />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-5 sm:px-6 text-center">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-cyber-500/10 border border-cyber-500/20 mb-6 sm:mb-8"
        >
          <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-full w-full bg-cyber-500" />
          </span>
          <span className="text-cyber-400 text-xs sm:text-sm font-medium">Available for freelance work</span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[2.5rem] leading-[1] sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-4 sm:mb-6"
        >
          <span className="text-white">Hi, I'm </span>
          <span className="gradient-text">Alex Rivera</span>
        </motion.h1>

        {/* Typing effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex items-center justify-center gap-2 mb-4 sm:mb-6"
        >
          <span className="text-gray-500 font-mono text-xs sm:text-sm md:text-base">{'>'}</span>
          <span className="font-mono text-neon-blue font-medium text-sm sm:text-base md:text-lg lg:text-xl">
            {text}
            <span className="typing-cursor text-neon-purple">|</span>
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-gray-400 text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto mb-3 sm:mb-4 leading-relaxed px-2"
        >
          Crafting elegant digital experiences with clean code, stunning visuals,
          and a keen eye for the beauty in nature.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex items-center justify-center gap-2 text-gray-500 text-xs sm:text-sm mb-8 sm:mb-10"
        >
          <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Portland, Oregon</span>
        </motion.div>

        {/* CTA Buttons – magnetic */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-12"
        >
          <MagneticButton
            as="a"
            href="#projects"
            strength={0.25}
            onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="group relative w-full sm:w-auto px-7 py-3.5 sm:px-8 sm:py-4 bg-gradient-to-r from-neon-blue to-cyber-500 rounded-2xl text-white font-bold text-sm sm:text-base lg:text-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl hover:shadow-neon-blue/25 text-center"
          >
            <span className="relative z-10">View My Work</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyber-500 to-neon-purple opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </MagneticButton>

          <MagneticButton
            as="a"
            href="#contact"
            strength={0.25}
            onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="w-full sm:w-auto px-7 py-3.5 sm:px-8 sm:py-4 border border-white/10 hover:border-neon-blue/30 rounded-2xl text-gray-300 hover:text-white font-semibold text-sm sm:text-base lg:text-lg transition-all duration-300 hover:bg-white/5 text-center"
          >
            Get In Touch
          </MagneticButton>
        </motion.div>

        {/* Socials – magnetic icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex items-center justify-center gap-3 sm:gap-4"
        >
          {[
            { icon: ExternalLink, href: '#', label: 'GitHub' },
            { icon: Globe, href: '#', label: 'LinkedIn' },
            { icon: MessageCircle, href: '#', label: 'Twitter' },
          ].map((social) => (
            <MagneticButton
              key={social.label}
              as="a"
              href={social.href}
              aria-label={social.label}
              strength={0.4}
              className="p-2.5 sm:p-3 rounded-xl border border-white/5 text-gray-500 hover:text-neon-blue hover:border-neon-blue/20 hover:bg-neon-blue/5 transition-all duration-300"
            >
              <social.icon className="w-4 h-4 sm:w-5 sm:h-5" />
            </MagneticButton>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-gray-600 text-[10px] sm:text-xs font-medium tracking-widest uppercase">Scroll</span>
          <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600" />
        </motion.div>
      </motion.div>
    </section>
  );
}
