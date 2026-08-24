import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import type { PreviewProps } from '@/types';
import { PHOTOS } from './photos';

const GALLERY = [PHOTOS.ganesh1, PHOTOS.ganesh2, PHOTOS.ganesh3, PHOTOS.ganesh4, PHOTOS.ganesh5, PHOTOS.family1, PHOTOS.family2, PHOTOS.ganesh6];

/* 1. Masonry Gallery */
export function GalleryMasonry({ playing }: PreviewProps) {
  return (
    <div className="h-full w-full overflow-auto rounded-xl bg-forest-950 p-2 no-scrollbar">
      <div className="columns-2 gap-2">
        {GALLERY.map((src, i) => (
          <motion.img key={i} src={src}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full mb-2 rounded-md" style={{ height: 50 + (i % 3) * 22, objectFit: 'cover' }} />
        ))}
      </div>
    </div>
  );
}

/* 2. Horizontal Gallery */
export function GalleryHorizontal({ playing }: PreviewProps) {
  return (
    <div className="h-full w-full overflow-x-auto rounded-xl bg-forest-950 p-2 flex gap-2 no-scrollbar">
      {GALLERY.map((src, i) => (
        <img key={i} src={src} className="h-full w-32 object-cover rounded-md flex-shrink-0" />
      ))}
    </div>
  );
}

/* 3. Infinite Carousel */
export function GalleryInfinite({ playing }: PreviewProps) {
  const [idx, setIdx] = useState(0);
  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-forest-950 flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.img key={idx} src={GALLERY[idx]}
          className="h-full w-full object-cover"
          initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }} />
      </AnimatePresence>
      <button onClick={() => setIdx((i) => (i - 1 + GALLERY.length) % GALLERY.length)}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/50 text-cream-100 text-xs">‹</button>
      <button onClick={() => setIdx((i) => (i + 1) % GALLERY.length)}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/50 text-cream-100 text-xs">›</button>
    </div>
  );
}

/* 4. 3D Carousel */
export function Gallery3DCarousel({ playing }: PreviewProps) {
  const [idx, setIdx] = useState(0);
  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-forest-950 flex items-center justify-center perspective-[900px]">
      {GALLERY.slice(0, 5).map((src, i) => {
        const offset = ((i - idx + 5) % 5) - 2;
        const visible = Math.abs(offset) <= 2;
        return (
          <motion.img key={i} src={src}
            className="absolute w-24 h-28 object-cover rounded-md"
            animate={{
              x: offset * 60, z: -Math.abs(offset) * 100, rotateY: offset * -25,
              opacity: visible ? 1 - Math.abs(offset) * 0.3 : 0, scale: 1 - Math.abs(offset) * 0.15,
            }}
            style={{ transformStyle: 'preserve-3d' }}
            transition={{ duration: 0.4 }} />
        );
      })}
      <button onClick={() => setIdx((i) => (i + 1) % 5)} className="absolute bottom-2 px-3 py-1 rounded-full bg-gold-500/80 text-forest-950 text-[10px]">Next</button>
    </div>
  );
}

/* 5. Coverflow */
export function GalleryCoverflow({ playing }: PreviewProps) {
  const [idx, setIdx] = useState(0);
  const items = GALLERY.slice(0, 5);
  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-forest-950 flex items-center justify-center perspective-[1000px]">
      {items.map((src, i) => {
        const offset = i - idx;
        return (
          <motion.img key={i} src={src}
            className="absolute w-28 h-32 object-cover rounded-md shadow-xl"
            animate={{ x: offset * 70, rotateY: offset * -35, z: -Math.abs(offset) * 80, opacity: 1 - Math.abs(offset) * 0.35 }}
            style={{ transformStyle: 'preserve-3d' }} />
        );
      })}
      <div className="absolute bottom-2 flex gap-2">
        <button onClick={() => setIdx((i) => Math.max(0, i - 1))} className="px-2 py-0.5 rounded bg-cream-200/80 text-forest-950 text-[10px]">‹</button>
        <button onClick={() => setIdx((i) => Math.min(items.length - 1, i + 1))} className="px-2 py-0.5 rounded bg-cream-200/80 text-forest-950 text-[10px]">›</button>
      </div>
    </div>
  );
}

/* 6. Polaroid Stack */
export function GalleryPolaroidStack({ playing }: PreviewProps) {
  const [idx, setIdx] = useState(0);
  const items = GALLERY.slice(0, 4);
  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-forest-900 flex items-center justify-center">
      {items.map((src, i) => {
        const offset = i - idx;
        return (
          <motion.div key={i} className="absolute bg-cream-100 p-1.5 pb-5 rounded-sm shadow-xl"
            animate={{ y: offset * -40, x: offset * 12, rotate: offset * 6, scale: 1 - Math.abs(offset) * 0.08, zIndex: -offset }}
            style={{ transformOrigin: 'bottom center' }}>
            <img src={src} className="w-24 h-20 object-cover" />
          </motion.div>
        );
      })}
      <button onClick={() => setIdx((i) => (i + 1) % items.length)} className="absolute bottom-2 px-3 py-1 rounded-full bg-gold-500/80 text-forest-950 text-[10px]">Next</button>
    </div>
  );
}

/* 7. Film Reel */
export function GalleryFilmReel({ playing }: PreviewProps) {
  const [idx, setIdx] = useState(0);
  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-black flex items-center">
      <div className="absolute left-0 top-0 bottom-0 w-4 bg-forest-900 flex flex-col justify-around">
        {Array.from({ length: 6 }).map((_, i) => <div key={i} className="w-2 h-2 rounded-full bg-cream-200/30 mx-auto" />)}
      </div>
      <div className="absolute right-0 top-0 bottom-0 w-4 bg-forest-900 flex flex-col justify-around">
        {Array.from({ length: 6 }).map((_, i) => <div key={i} className="w-2 h-2 rounded-full bg-cream-200/30 mx-auto" />)}
      </div>
      <motion.div className="flex gap-2 h-full items-center pl-6 pr-6"
        animate={{ x: -idx * 120 }} transition={{ duration: 0.4 }}>
        {GALLERY.map((src, i) => (
          <img key={i} src={src} className="w-24 h-24 object-cover flex-shrink-0" />
        ))}
      </motion.div>
      <button onClick={() => setIdx((i) => (i + 1) % GALLERY.length)} className="absolute bottom-1 right-6 px-2 py-0.5 rounded bg-gold-500/80 text-forest-950 text-[9px]">›</button>
    </div>
  );
}

/* 8. Memory Timeline */
export function GalleryTimeline({ playing }: PreviewProps) {
  const [idx, setIdx] = useState(0);
  const items = GALLERY.slice(0, 4);
  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-forest-950 p-2">
      <div className="absolute left-3 top-0 bottom-0 w-px bg-gold-400/40" />
      <div className="flex flex-col gap-1 pl-7 h-full overflow-auto no-scrollbar">
        {items.map((src, i) => (
          <motion.div key={i} className="flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
            <div className="absolute left-2 w-2.5 h-2.5 rounded-full bg-gold-400 ring-2 ring-forest-950" />
            <img src={src} className={`w-16 h-12 object-cover rounded transition-all ${idx === i ? 'ring-2 ring-gold-400 scale-105' : ''}`} onClick={() => setIdx(i)} />
            <span className="text-cream-200 text-[10px]">Memory {i + 1}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* 9. Fullscreen Gallery */
export function GalleryFullscreen({ playing }: PreviewProps) {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);
  return (
    <div className="relative h-full w-full rounded-xl bg-forest-950 overflow-hidden">
      <div className="grid grid-cols-3 gap-1 p-1 h-full">
        {GALLERY.slice(0, 6).map((src, i) => (
          <img key={i} src={src} className="w-full h-full object-cover rounded cursor-pointer" onClick={() => { setIdx(i); setOpen(true); }} />
        ))}
      </div>
      <AnimatePresence>
        {open && (
          <motion.div className="absolute inset-0 bg-black/90 flex items-center justify-center z-10"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <img src={GALLERY[idx]} className="max-h-full max-w-full object-contain" />
            <button onClick={() => setOpen(false)} className="absolute top-2 right-2 text-cream-100 text-lg">✕</button>
            <button onClick={() => setIdx((i) => (i + 1) % GALLERY.length)} className="absolute right-2 top-1/2 text-cream-100 text-2xl">›</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* 10. Story Gallery */
export function GalleryStory({ playing }: PreviewProps) {
  const [idx, setIdx] = useState(0);
  const items = GALLERY.slice(0, 5);
  return (
    <div className="relative h-full w-full rounded-xl bg-forest-950 overflow-hidden" onClick={() => setIdx((i) => (i + 1) % items.length)}>
      <div className="absolute top-1 left-1 right-1 flex gap-1 z-10">
        {items.map((_, i) => (
          <div key={i} className="flex-1 h-1 rounded-full bg-cream-200/30 overflow-hidden">
            <motion.div className="h-full bg-gold-400" animate={{ width: i < idx ? '100%' : i === idx ? '100%' : '0%' }} transition={{ duration: i === idx ? 2.5 : 0.2 }} />
          </div>
        ))}
      </div>
      <img src={items[idx]} className="w-full h-full object-cover" />
      <div className="absolute bottom-2 left-2 text-cream-100 text-[10px]">Tap to advance</div>
    </div>
  );
}
