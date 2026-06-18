import { motion, useInView, AnimatePresence, useSpring } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Camera, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { useMousePosition } from '../hooks/useMouse';
import TiltCard from './ui/TiltCard';

interface Photo {
  id: number;
  src: string;
  title: string;
  location: string;
  category: string;
  span?: string;
}

const photos: Photo[] = [
  {
    id: 1,
    src: 'https://images.pexels.com/photos/6072751/pexels-photo-6072751.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    title: 'Misty Mountain Peaks',
    location: 'Mount Hood, Oregon',
    category: 'Landscapes',
    span: 'sm:col-span-2 sm:row-span-2',
  },
  {
    id: 2,
    src: 'https://images.pexels.com/photos/10195041/pexels-photo-10195041.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    title: 'Forest Cathedral',
    location: 'Olympic National Park, WA',
    category: 'Forests',
  },
  {
    id: 3,
    src: 'https://images.pexels.com/photos/28237726/pexels-photo-28237726.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    title: 'Northern Lights',
    location: 'Karasjok, Norway',
    category: 'Night Sky',
  },
  {
    id: 4,
    src: 'https://images.pexels.com/photos/6873614/pexels-photo-6873614.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    title: 'Emerald Falls',
    location: 'Krabi, Thailand',
    category: 'Waterfalls',
    span: 'sm:row-span-2',
  },
  {
    id: 5,
    src: 'https://images.pexels.com/photos/33240146/pexels-photo-33240146.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    title: 'Alpine Grandeur',
    location: 'Slovenian Alps',
    category: 'Landscapes',
  },
  {
    id: 6,
    src: 'https://images.pexels.com/photos/31693313/pexels-photo-31693313.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    title: 'Garden Visitor',
    location: 'Portland, Oregon',
    category: 'Macro',
  },
  {
    id: 7,
    src: 'https://images.pexels.com/photos/33843011/pexels-photo-33843011.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    title: 'Dolomite Sunset',
    location: 'Dolomites, Italy',
    category: 'Landscapes',
    span: 'sm:col-span-2',
  },
  {
    id: 8,
    src: 'https://images.pexels.com/photos/28920480/pexels-photo-28920480.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    title: 'Aurora Dance',
    location: 'Tromsø, Norway',
    category: 'Night Sky',
  },
  {
    id: 9,
    src: 'https://images.pexels.com/photos/36114893/pexels-photo-36114893.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    title: 'Misty Valleys',
    location: 'Bolu, Türkiye',
    category: 'Landscapes',
  },
];

/* ── Lightbox Modal ─────────────────────────────────────── */
function LightboxModal({ photo, photos: allPhotos, onClose, onNav }: {
  photo: Photo;
  photos: Photo[];
  onClose: () => void;
  onNav: (dir: 'prev' | 'next') => void;
}) {
  const idx = allPhotos.findIndex(p => p.id === photo.id);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && idx > 0) onNav('prev');
      if (e.key === 'ArrowRight' && idx < allPhotos.length - 1) onNav('next');
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [idx, allPhotos.length, onClose, onNav]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-3 sm:p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
      >
        <X className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {idx > 0 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNav('prev'); }}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      )}

      {idx < allPhotos.length - 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNav('next'); }}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      )}

      <motion.div
        key={photo.id}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="max-w-5xl max-h-[90vh] sm:max-h-[85vh] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={photo.src}
          alt={photo.title}
          className="max-w-full max-h-[75vh] sm:max-h-[75vh] object-contain rounded-lg"
        />
        <div className="mt-3 sm:mt-4 text-center">
          <h3 className="text-white text-base sm:text-xl font-bold">{photo.title}</h3>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">{photo.location} · {photo.category}</p>
        </div>
      </motion.div>

      {/* Photo counter */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 text-gray-500 text-xs sm:text-sm font-mono">
        {idx + 1} / {allPhotos.length}
      </div>
    </motion.div>
  );
}

/* ── Photo Card with tilt + cursor spotlight ────────────── */
function PhotoCard({ photo, index, inView, onClick }: {
  photo: Photo;
  index: number;
  inView: boolean;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [glow, setGlow] = useState({ x: 50, y: 50 });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className={photo.span || ''}
    >
      <TiltCard
        className="rounded-2xl h-full"
        tiltAmount={10}
        glareOpacity={0.1}
        scale={1.03}
        onClick={onClick}
      >
        <div
          ref={cardRef}
          onMouseMove={(e) => {
            const rect = cardRef.current?.getBoundingClientRect();
            if (rect) {
              setGlow({
                x: ((e.clientX - rect.left) / rect.width) * 100,
                y: ((e.clientY - rect.top) / rect.height) * 100,
              });
            }
          }}
          className="group relative rounded-2xl overflow-hidden cursor-pointer h-full"
        >
          <div className="aspect-[4/3] overflow-hidden">
            <img
              src={photo.src}
              alt={photo.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>

          {/* Mouse-following spotlight overlay */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `radial-gradient(circle 180px at ${glow.x}% ${glow.y}%, rgba(0,212,255,0.12), transparent)`,
            }}
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5">
              <div className="flex items-end justify-between">
                <div>
                  <h3 className="text-white font-bold text-sm sm:text-lg">{photo.title}</h3>
                  <p className="text-gray-300 text-xs sm:text-sm">{photo.location}</p>
                </div>
                <div className="p-1.5 sm:p-2 rounded-full bg-white/20 backdrop-blur-sm text-white">
                  <Maximize2 className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>
              </div>
            </div>
          </div>

          {/* Category badge */}
          <div className="absolute top-2 left-2 sm:top-4 sm:left-4 px-2 py-0.5 sm:px-3 sm:py-1 bg-black/40 backdrop-blur-sm rounded-full text-white text-[10px] sm:text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {photo.category}
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

export default function Photography() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [lightbox, setLightbox] = useState<Photo | null>(null);
  const mouse = useMousePosition();

  const orbX = useSpring(0, { damping: 50, stiffness: 60 });
  const orbY = useSpring(0, { damping: 50, stiffness: 60 });

  useEffect(() => {
    orbX.set(mouse.normalizedX * 30);
    orbY.set(mouse.normalizedY * 30);
  }, [mouse.normalizedX, mouse.normalizedY, orbX, orbY]);

  const handleNav = (dir: 'prev' | 'next') => {
    if (!lightbox) return;
    const idx = photos.findIndex(p => p.id === lightbox.id);
    const newIdx = dir === 'prev' ? idx - 1 : idx + 1;
    if (newIdx >= 0 && newIdx < photos.length) setLightbox(photos[newIdx]);
  };

  return (
    <>
      <section id="photography" className="relative py-20 sm:py-24 lg:py-32 overflow-hidden">
        <motion.div style={{ x: orbX, y: orbY }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-cyber-500/5 rounded-full blur-[200px]" />

        <div ref={ref} className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 sm:mb-16"
          >
            <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-emerald-400 bg-emerald-500/10 rounded-full border border-emerald-500/20 mb-4">
              <Camera className="w-3 h-3 inline mr-1" />
              Photography
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 sm:mb-4">
              Through My <span className="gradient-text">Lens</span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-2">
              Capturing the raw beauty of nature — from sweeping landscapes and dramatic skies 
              to the intimate details of the natural world.
            </p>
          </motion.div>

          {/* Photo grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 auto-rows-fr">
            {photos.map((photo, i) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                index={i}
                inView={isInView}
                onClick={() => setLightbox(photo)}
              />
            ))}
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-2 sm:flex sm:flex-wrap sm:justify-center gap-6 sm:gap-8 lg:gap-16 mt-12 sm:mt-16 pt-12 sm:pt-16 border-t border-white/5"
          >
            {[
              { label: 'Countries Visited', value: '14' },
              { label: 'Photos Taken', value: '5,000+' },
              { label: 'Featured In', value: '8 Pubs' },
              { label: 'Prints Sold', value: '200+' },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="text-center cursor-default"
              >
                <div className="text-xl sm:text-2xl lg:text-3xl font-black text-white mb-0.5 sm:mb-1">{stat.value}</div>
                <div className="text-gray-500 text-xs sm:text-sm font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <LightboxModal
            photo={lightbox}
            photos={photos}
            onClose={() => setLightbox(null)}
            onNav={handleNav}
          />
        )}
      </AnimatePresence>
    </>
  );
}
