import { motion } from 'framer-motion';
import type { PreviewProps } from '@/types';
import { useProgress, useAnimationLoop, range, SAMPLE } from '@/lib/hooks';
import { PHOTOS } from './photos';

/* 1. Cinematic Ganpati Reveal */
export function PremCinematicGanpati({ playing, resetKey }: PreviewProps) {
  const p = useProgress(3.2, playing, resetKey);
  return (
    <Shell>
      <motion.img src={PHOTOS.ganesh3} className="absolute inset-0 w-full h-full object-cover"
        animate={{ scale: 1.6 - p * 0.4, opacity: p }} />
      <motion.div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60" animate={{ opacity: p }} />
      <motion.div className="absolute inset-0 flex flex-col items-center justify-center"
        animate={{ opacity: p, scale: 0.8 + p * 0.2 }}>
        <p className="font-deva text-gold-300 text-lg">{SAMPLE.bappa}</p>
        <p className="text-cream-100 text-xs">{SAMPLE.event}</p>
      </motion.div>
      <PremiumTag />
    </Shell>
  );
}

/* 2. Golden Light Sweep */
export function PremGoldenSweep({ playing, resetKey }: PreviewProps) {
  const t = useAnimationLoop(3, playing, resetKey);
  return (
    <Shell>
      <div className="text-center z-10"><p className="font-display text-xl text-gradient-gold">{SAMPLE.event}</p></div>
      <motion.div className="absolute inset-y-0 w-1/3" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,254,248,0.4), transparent)' }}
        animate={{ x: ['-30%', '130%'] }} transition={{ duration: 2.5, repeat: Infinity }} />
      <PremiumTag />
    </Shell>
  );
}

/* 3. 3D Invitation Opening */
export function Prem3DOpening({ playing, resetKey }: PreviewProps) {
  const p = useProgress(3, playing, resetKey);
  return (
    <div className="h-full w-full rounded-xl bg-forest-950 flex items-center justify-center perspective-[1200px] overflow-hidden">
      <motion.div className="relative w-40 h-28" style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateX: p * -30, rotateY: p * 20, scale: 0.8 + p * 0.3 }}>
        <div className="absolute inset-0 bg-gradient-to-br from-cream-700 to-cream-800 rounded shadow-xl flex items-center justify-center">
          <p className="font-deva text-gold-600 text-xs">{SAMPLE.bappa}</p>
        </div>
        <motion.div className="absolute inset-0 bg-gradient-to-r from-brown-700 to-brown-900 origin-left rounded" style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateY: p * -160 }} />
      </motion.div>
      <PremiumTag />
    </div>
  );
}

/* 4. Depth Zoom */
export function PremDepthZoom({ playing, resetKey }: PreviewProps) {
  const p = useProgress(2.6, playing, resetKey);
  return (
    <Shell>
      {range(3).map((i) => (
        <motion.div key={i} className="absolute inset-0 flex items-center justify-center"
          animate={{ scale: 0.5 + p * 1.5 - i * 0.3, opacity: p > i / 3 && p < (i + 1) / 3 ? 1 : 0.3 }}>
          <p className="font-display text-2xl text-gradient-gold" style={{ filter: `blur(${i * 4}px)` }}>{SAMPLE.event}</p>
        </motion.div>
      ))}
      <PremiumTag />
    </Shell>
  );
}

/* 5. Cinematic Blur */
export function PremCinematicBlur({ playing, resetKey }: PreviewProps) {
  const p = useProgress(2.4, playing, resetKey);
  return (
    <Shell>
      <motion.img src={PHOTOS.ganesh5} className="absolute inset-0 w-full h-full object-cover"
        animate={{ scale: 1.2, filter: `blur(${(1 - p) * 16}px)`, opacity: p }} />
      <motion.div className="absolute inset-0 flex items-center justify-center" animate={{ opacity: p }}>
        <p className="font-deva text-gold-300 text-lg">{SAMPLE.bappa}</p>
      </motion.div>
      <PremiumTag />
    </Shell>
  );
}

/* 6. Particle Logo Reveal */
export function PremParticleLogo({ playing, resetKey }: PreviewProps) {
  const p = useProgress(2.6, playing, resetKey);
  return (
    <Shell>
      {range(40).map((i) => {
        const ang = (i / 40) * Math.PI * 2;
        const tx = Math.cos(ang) * 120, ty = Math.sin(ang) * 80;
        return (
          <motion.div key={i} className="absolute w-1 h-1 rounded-full bg-gold-300" style={{ left: '50%', top: '50%' }}
            animate={{ x: p < 0.5 ? tx * p * 2 : tx * (1 - p) * 2, y: p < 0.5 ? ty * p * 2 : ty * (1 - p) * 2, opacity: 1 }} />
        );
      })}
      <motion.p className="font-display text-xl text-gradient-gold" animate={{ opacity: p > 0.5 ? 1 : 0, scale: p > 0.5 ? 1 : 0 }}>{SAMPLE.event}</motion.p>
      <PremiumTag />
    </Shell>
  );
}

/* 7. Luxury Gold Shimmer */
export function PremLuxuryShimmer({ playing, resetKey }: PreviewProps) {
  const p = useProgress(2.2, playing, resetKey);
  return (
    <Shell>
      <motion.p className="font-display text-2xl gold-shimmer-text" animate={{ opacity: p, letterSpacing: `${(1 - p) * 8}px` }}>{SAMPLE.bappa}</motion.p>
      <motion.div className="absolute inset-x-0 h-px bg-gold-400/60" animate={{ top: `${p * 100}%`, opacity: p }} />
      <PremiumTag />
    </Shell>
  );
}

/* 8. Multi-Layer Parallax */
export function PremMultiLayer({ playing, resetKey }: PreviewProps) {
  const p = useProgress(3, playing, resetKey);
  return (
    <Shell>
      <motion.img src={PHOTOS.ganesh2} className="absolute inset-0 w-full h-full object-cover opacity-40" animate={{ scale: 1.3 - p * 0.2 }} />
      <motion.div className="absolute inset-0 bg-gradient-to-b from-transparent via-forest-950/40 to-forest-950/80" animate={{ opacity: p }} />
      <motion.div className="absolute" animate={{ y: (1 - p) * 40, opacity: p }}><p className="font-deva text-gold-300 text-lg">{SAMPLE.bappa}</p></motion.div>
      <motion.div className="absolute bottom-4" animate={{ y: (1 - p) * -30, opacity: p }}><p className="text-cream-200 text-xs">{SAMPLE.event}</p></motion.div>
      <PremiumTag />
    </Shell>
  );
}

/* 9. Camera Zoom */
export function PremCameraZoom({ playing, resetKey }: PreviewProps) {
  const p = useProgress(2.4, playing, resetKey);
  return (
    <Shell>
      <motion.img src={PHOTOS.ganesh4} className="w-full h-full object-cover"
        animate={{ scale: 1 + p * 1.5, opacity: 1 - p * 0.3 }} />
      <motion.div className="absolute inset-0 ring-4 ring-gold-400/60" animate={{ inset: `${p * 30}%` }} />
      <PremiumTag />
    </Shell>
  );
}

/* 10. 3D Card Rotation */
export function Prem3DCard({ playing, resetKey }: PreviewProps) {
  const t = useAnimationLoop(5, playing, resetKey);
  return (
    <div className="h-full w-full rounded-xl bg-forest-950 flex items-center justify-center perspective-[1000px] overflow-hidden">
      <motion.div className="w-32 h-40 rounded-xl bg-gradient-to-br from-gold-600 to-maroon-700 border border-gold-300/60 p-3 flex flex-col justify-between"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: t * 360, rotateX: Math.sin(t * Math.PI * 2) * 15 }}>
        <p className="font-deva text-cream-100 text-xs">{SAMPLE.om}</p>
        <p className="text-gold-200 text-[10px]">{SAMPLE.event}</p>
      </motion.div>
      <PremiumTag />
    </div>
  );
}

/* 11. Cinematic Photo Story */
export function PremPhotoStory({ playing, resetKey }: PreviewProps) {
  const t = useAnimationLoop(6, playing, resetKey);
  const idx = Math.floor(t * 3) % 3;
  const imgs = [PHOTOS.ganesh1, PHOTOS.ganesh3, PHOTOS.ganesh5];
  return (
    <Shell>
      <motion.img key={idx} src={imgs[idx]} className="absolute inset-0 w-full h-full object-cover" initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} />
      <motion.div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
        <p className="text-cream-100 text-xs font-display">Chapter {idx + 1}</p>
      </motion.div>
      <PremiumTag />
    </Shell>
  );
}

/* 12. Divine Light Explosion */
export function PremDivineLight({ playing, resetKey }: PreviewProps) {
  const p = useProgress(2.8, playing, resetKey);
  return (
    <Shell>
      {range(16).map((i) => {
        const ang = (i / 16) * Math.PI * 2;
        return <motion.div key={i} className="absolute origin-center h-px" style={{ width: 200, left: '50%', top: '50%', background: 'linear-gradient(to right, rgba(228,197,81,0.6), transparent)' }}
          animate={{ rotate: ang + p * 360, opacity: p, scale: p * 1.5 }} />;
      })}
      <motion.div className="absolute rounded-full bg-saffron-300/40 blur-2xl" style={{ width: 100, height: 100 }} animate={{ scale: p * 1.6, opacity: p }} />
      <p className="font-deva text-gold-300 text-lg relative z-10" style={{ opacity: p }}>{SAMPLE.bappa}</p>
      <PremiumTag />
    </Shell>
  );
}

/* 13. Temple Door Cinematic */
export function PremTempleCinematic({ playing, resetKey }: PreviewProps) {
  const p = useProgress(3, playing, resetKey);
  return (
    <Shell>
      <motion.img src={PHOTOS.ganesh7} className="absolute inset-0 w-full h-full object-cover" animate={{ scale: 1.3 - p * 0.3, opacity: p }} />
      <div className="absolute inset-0 flex">
        <motion.div className="h-full w-1/2 bg-gradient-to-r from-brown-900 to-brown-700 border-r-2 border-gold-500" animate={{ x: -p * 100 + '%' }} />
        <motion.div className="h-full w-1/2 bg-gradient-to-l from-brown-900 to-brown-700 border-l-2 border-gold-500" animate={{ x: `${p * 100 - 100}%` }} />
      </div>
      <motion.div className="absolute top-2 left-1/2 -translate-x-1/2 text-gold-400 text-xl" animate={{ opacity: p }}>⚜</motion.div>
      <PremiumTag />
    </Shell>
  );
}

/* 14. Premium Curtain */
export function PremCurtain({ playing, resetKey }: PreviewProps) {
  const p = useProgress(2.8, playing, resetKey);
  return (
    <Shell>
      <motion.img src={PHOTOS.ganesh6} className="absolute inset-0 w-full h-full object-cover" animate={{ scale: 1.1, opacity: p }} />
      <div className="absolute inset-0 flex">
        <motion.div className="h-full w-1/2 bg-gradient-to-r from-gold-700 to-gold-500" animate={{ x: -p * 100 + '%' }} />
        <motion.div className="h-full w-1/2 bg-gradient-to-l from-gold-700 to-gold-500" animate={{ x: `${p * 100 - 100}%` }} />
      </div>
      <motion.div className="absolute top-1 left-1/2 -translate-x-1/2 text-gold-200 text-sm" animate={{ opacity: p }}>✨</motion.div>
      <PremiumTag />
    </Shell>
  );
}

/* 15. Fullscreen Celebration Reveal */
export function PremFullscreenCelebration({ playing, resetKey }: PreviewProps) {
  const p = useProgress(3.4, playing, resetKey);
  const colors = ['#e4c551', '#f97316', '#c03736', '#3c7457'];
  return (
    <Shell>
      <motion.div className="absolute inset-0 bg-gradient-to-b from-maroon-800 to-forest-950" animate={{ opacity: p }} />
      <motion.p className="font-deva text-gold-300 text-lg relative z-10" animate={{ opacity: p, scale: 0.5 + p * 0.5 }}>{SAMPLE.bappa}</motion.p>
      {range(20).map((i) => {
        const ang = (i / 20) * Math.PI * 2;
        return (
          <motion.div key={i} className="absolute w-1.5 h-2 rounded-sm" style={{ background: colors[i % 4], left: '50%', top: '50%' }}
            animate={{ x: Math.cos(ang) * p * 120, y: Math.sin(ang) * p * 80, rotate: p * 360, opacity: p * (1 - p * 0.5) }} />
        );
      })}
      <PremiumTag />
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return <div className="relative h-full w-full overflow-hidden rounded-xl bg-forest-950 flex items-center justify-center">{children}</div>;
}
function PremiumTag() {
  return <span className="absolute bottom-1 right-2 text-[8px] text-gold-400/60 font-semibold tracking-wider">PREMIUM</span>;
}
