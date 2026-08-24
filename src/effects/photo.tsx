import { motion } from 'framer-motion';
import type { PreviewProps } from '@/types';
import { useProgress, useAnimationLoop, range } from '@/lib/hooks';
import { PHOTOS } from './photos';

const IMG = PHOTOS.ganesh3;
const IMG2 = PHOTOS.ganesh5;
const IMG3 = PHOTOS.family1;

/* 1. Polaroid Reveal */
export function PhotoPolaroid({ playing, resetKey }: PreviewProps) {
  const p = useProgress(1.8, playing, resetKey);
  return (
    <div className="flex h-full w-full items-center justify-center bg-forest-900 rounded-xl">
      <motion.div className="bg-cream-100 p-2 pb-8 rounded-sm shadow-xl"
        initial={{ rotate: -20, y: 60, opacity: 0 }}
        animate={{ rotate: -6 + p * 6, y: 60 - p * 60, opacity: p }}>
        <img src={IMG} alt="" className="w-32 h-24 object-cover" />
        <p className="text-brown-700 text-center text-[10px] mt-1 font-display">Ganpati 2026</p>
      </motion.div>
    </div>
  );
}

/* 2. Photo Fade */
export function PhotoFade({ playing, resetKey }: PreviewProps) {
  const p = useProgress(1.6, playing, resetKey);
  return (
    <Shell>
      <motion.img src={IMG} className="w-full h-full object-cover" animate={{ opacity: p }} />
    </Shell>
  );
}

/* 3. Photo Zoom */
export function PhotoZoom({ playing, resetKey }: PreviewProps) {
  const p = useProgress(2, playing, resetKey);
  return (
    <Shell>
      <motion.img src={IMG} className="w-full h-full object-cover"
        animate={{ scale: 1.3 - p * 0.3, opacity: p }} />
    </Shell>
  );
}

/* 4. Photo Slide */
export function PhotoSlide({ playing, resetKey }: PreviewProps) {
  const p = useProgress(1.6, playing, resetKey);
  return (
    <Shell>
      <motion.img src={IMG} className="w-full h-full object-cover"
        animate={{ x: (1 - p) * 200, opacity: p }} />
    </Shell>
  );
}

/* 5. Photo Parallax */
export function PhotoParallax({ playing, resetKey }: PreviewProps) {
  const p = useProgress(2.4, playing, resetKey);
  return (
    <Shell>
      <motion.img src={IMG2} className="w-full h-[120%] object-cover"
        animate={{ y: (p - 0.5) * 30 }} />
      <motion.div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent"
        animate={{ opacity: p }}>
        <p className="text-cream-100 text-xs font-display">{SAMPLE_EVENT}</p>
      </motion.div>
    </Shell>
  );
}

/* 6. Photo Ken Burns */
export function PhotoKenBurns({ playing, resetKey }: PreviewProps) {
  const t = useAnimationLoop(6, playing, resetKey);
  return (
    <Shell>
      <motion.img src={IMG} className="w-full h-full object-cover"
        animate={{ scale: 1.1 + Math.sin(t * Math.PI / 3) * 0.08, x: Math.sin(t * Math.PI / 3) * 12, y: Math.cos(t * Math.PI / 3) * 8 }}
        transition={{ duration: 0.4 }} />
    </Shell>
  );
}

/* 7. 3D Tilt */
export function Photo3DTilt({ playing, resetKey }: PreviewProps) {
  const t = useAnimationLoop(4, playing, resetKey);
  return (
    <div className="flex h-full w-full items-center justify-center bg-forest-950 rounded-xl perspective-[800px]">
      <motion.img src={IMG3} className="w-28 h-36 object-cover rounded-md shadow-gold-lg"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: Math.sin(t * Math.PI / 2) * 20, rotateX: Math.cos(t * Math.PI / 2) * 12 }}
        transition={{ duration: 0.3 }} />
    </div>
  );
}

/* 8. Photo Flip */
export function PhotoFlip({ playing, resetKey }: PreviewProps) {
  const p = useProgress(2, playing, resetKey);
  return (
    <div className="flex h-full w-full items-center justify-center bg-forest-900 rounded-xl perspective-[800px]">
      <motion.div className="relative w-32 h-40" style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: p * 180 }}>
        <img src={IMG} className="absolute inset-0 w-full h-full object-cover rounded-md [backface-visibility:hidden]" />
        <div className="absolute inset-0 w-full h-full object-cover rounded-md bg-cream-100 flex items-center justify-center [transform:rotateY(180deg)]">
          <p className="font-deva text-gold-600 text-sm text-center px-2">गणपति बप्पा मोरया</p>
        </div>
      </motion.div>
    </div>
  );
}

/* 9. Circular Reveal */
export function PhotoCircularReveal({ playing, resetKey }: PreviewProps) {
  const p = useProgress(1.8, playing, resetKey);
  return (
    <Shell>
      <motion.img src={IMG} className="w-full h-full object-cover"
        style={{ clipPath: `circle(${p * 80}% at 50% 50%)` }} />
    </Shell>
  );
}

/* 10. Mask Reveal */
export function PhotoMaskReveal({ playing, resetKey }: PreviewProps) {
  const p = useProgress(1.8, playing, resetKey);
  return (
    <Shell>
      <div className="absolute inset-0 overflow-hidden">
        <motion.img src={IMG} className="w-full h-full object-cover"
          animate={{ y: (1 - p) * 100 + '%' }} />
      </div>
      <motion.div className="absolute inset-0 bg-forest-950" animate={{ y: p * -100 + '%' }} />
    </Shell>
  );
}

/* 11. Film Strip */
export function PhotoFilmStrip({ playing, resetKey }: PreviewProps) {
  const t = useAnimationLoop(5, playing, resetKey);
  const imgs = [PHOTOS.ganesh1, PHOTOS.ganesh2, PHOTOS.ganesh4, PHOTOS.ganesh6];
  return (
    <div className="flex h-full w-full items-center bg-black rounded-xl overflow-hidden">
      <motion.div className="flex gap-2 px-2"
        animate={{ x: -t * 180 }}>
        {[...imgs, ...imgs].map((src, i) => (
          <div key={i} className="flex-shrink-0">
            <div className="h-2 bg-forest-900 flex justify-between"><Dot /><Dot /></div>
            <img src={src} className="w-28 h-20 object-cover" />
            <div className="h-2 bg-forest-900 flex justify-between"><Dot /><Dot /></div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* 12. Floating Photos */
export function PhotoFloating({ playing, resetKey }: PreviewProps) {
  const t = useAnimationLoop(4, playing, resetKey);
  const imgs = [PHOTOS.ganesh2, PHOTOS.family2, PHOTOS.ganesh7];
  return (
    <div className="relative h-full w-full bg-forest-950 rounded-xl overflow-hidden">
      {imgs.map((src, i) => (
        <motion.img key={i} src={src}
          className="absolute w-20 h-24 object-cover rounded-md shadow-lg"
          style={{ left: `${15 + i * 30}%`, top: '20%' }}
          animate={{ y: Math.sin(t * Math.PI / 2 + i) * 18, rotate: Math.sin(t + i) * 8 }}
          transition={{ duration: 0.3 }} />
      ))}
    </div>
  );
}

/* 13. Stacked Photos */
export function PhotoStacked({ playing, resetKey }: PreviewProps) {
  const p = useProgress(2.4, playing, resetKey);
  const imgs = [PHOTOS.ganesh1, PHOTOS.ganesh3, PHOTOS.ganesh5];
  return (
    <div className="relative h-full w-full bg-forest-900 rounded-xl flex items-center justify-center">
      {imgs.map((src, i) => {
        const lp = Math.max(0, Math.min(1, p * imgs.length - i));
        return (
          <motion.img key={i} src={src}
            className="absolute w-32 h-28 object-cover rounded-md shadow-xl border-2 border-cream-100/80"
            animate={{ y: -lp * 100, x: (i - 1) * lp * 30, rotate: (i - 1) * lp * 8, opacity: lp }}
            transition={{ duration: 0.2 }} />
        );
      })}
    </div>
  );
}

/* 14. Cinematic Photo Reveal */
export function PhotoCinematic({ playing, resetKey }: PreviewProps) {
  const p = useProgress(2.6, playing, resetKey);
  return (
    <Shell>
      <motion.img src={IMG} className="w-full h-full object-cover"
        animate={{ scale: 1.4 - p * 0.3, opacity: p }} />
      <motion.div className="absolute inset-y-0 left-0 bg-black" style={{ width: `${(1 - p) * 50}%` }} />
      <motion.div className="absolute inset-y-0 right-0 bg-black" style={{ width: `${(1 - p) * 50}%` }} />
      <motion.p className="absolute bottom-3 left-0 right-0 text-center text-cream-100 font-display text-sm"
        animate={{ opacity: p }}>Ganpati Chaturthi 2026</motion.p>
    </Shell>
  );
}

/* 15. Photo Lightbox */
export function PhotoLightbox({ playing, resetKey }: PreviewProps) {
  const p = useProgress(1.6, playing, resetKey);
  return (
    <div className="relative h-full w-full bg-forest-950 rounded-xl flex items-center justify-center">
      <motion.img src={IMG} className="w-24 h-20 object-cover rounded-md"
        animate={{ scale: 0.7 + p * 0.8, boxShadow: `0 0 ${p * 60}px rgba(228,197,81,${p * 0.6})` }} />
      {p > 0.6 && <motion.div className="absolute inset-0 bg-black/70" animate={{ opacity: (p - 0.6) * 2.5 }} />}
    </div>
  );
}

const SAMPLE_EVENT = 'Ganpati Chaturthi 2026';
function Shell({ children }: { children: React.ReactNode }) {
  return <div className="relative h-full w-full overflow-hidden rounded-xl bg-forest-950">{children}</div>;
}
function Dot() { return <div className="w-1 h-1 rounded-full bg-cream-200/40 m-0.5" />; }
