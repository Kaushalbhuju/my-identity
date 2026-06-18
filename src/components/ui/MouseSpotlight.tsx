import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function MouseSpotlight() {
  const [visible, setVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  useEffect(() => {
    // Detect touch device
    const touchCheck = () => setIsTouch(true);
    window.addEventListener('touchstart', touchCheck, { once: true });

    const handler = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
    };

    window.addEventListener('mousemove', handler);
    return () => {
      window.removeEventListener('mousemove', handler);
      window.removeEventListener('touchstart', touchCheck);
    };
  }, [x, y, visible]);

  if (isTouch) return null;

  return (
    <>
      {/* Large soft glow */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block"
        style={{
          x,
          y,
          width: 600,
          height: 600,
          translateX: '-50%',
          translateY: '-50%',
          opacity: visible ? 1 : 0,
        }}
      >
        <div className="w-full h-full rounded-full bg-neon-blue/[0.04] blur-[80px]" />
      </motion.div>

      {/* Small follow dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block"
        style={{
          x,
          y,
          width: 8,
          height: 8,
          translateX: '-50%',
          translateY: '-50%',
          opacity: visible ? 0.6 : 0,
        }}
      >
        <div className="w-full h-full rounded-full bg-neon-blue/80 shadow-[0_0_12px_rgba(0,212,255,0.5)]" />
      </motion.div>
    </>
  );
}
