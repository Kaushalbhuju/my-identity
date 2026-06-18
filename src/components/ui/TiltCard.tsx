import { useRef, useState, type ReactNode } from 'react';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  tiltAmount?: number;
  glareOpacity?: number;
  scale?: number;
  onClick?: () => void;
}

export default function TiltCard({
  children,
  className = '',
  tiltAmount = 12,
  glareOpacity = 0.08,
  scale = 1.02,
  onClick,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({
    transform: 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)',
    glareX: '50%',
    glareY: '50%',
    glareOp: 0,
  });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setStyle({
      transform: `perspective(800px) rotateY(${x * tiltAmount}deg) rotateX(${-y * tiltAmount}deg) scale(${scale})`,
      glareX: `${(x + 1) * 50}%`,
      glareY: `${(y + 1) * 50}%`,
      glareOp: glareOpacity,
    });
  };

  const handleLeave = () => {
    setStyle({
      transform: 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)',
      glareX: '50%',
      glareY: '50%',
      glareOp: 0,
    });
  };

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      style={{
        transform: style.transform,
        transition: 'transform 0.35s cubic-bezier(0.03, 0.98, 0.52, 0.99)',
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
    >
      {children}
      {/* Glare overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] z-20"
        style={{
          background: `radial-gradient(circle at ${style.glareX} ${style.glareY}, rgba(255,255,255,${style.glareOp}), transparent 60%)`,
          transition: 'background 0.35s ease',
        }}
      />
    </div>
  );
}
