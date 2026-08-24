import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import type { PreviewProps } from '@/types';
import { useProgress, useAnimationLoop, SAMPLE, range } from '@/lib/hooks';
import { PHOTOS } from './photos';

const IMG = PHOTOS.ganesh3;

function Shell({ children }: { children: React.ReactNode }) {
  return <div className="relative h-full w-full rounded-xl bg-forest-950 flex items-center justify-center overflow-hidden">{children}</div>;
}

function Tag() {
  return <span className="absolute bottom-1 right-2 text-[8px] text-gold-400/50 font-semibold tracking-wider">MODERN</span>;
}

/* 1. Glassmorphism Reveal */
export function ModGlassReveal({ playing, resetKey }: PreviewProps) {
  const p = useProgress(2.4, playing, resetKey);
  return (
    <Shell>
      <motion.div className="relative rounded-2xl p-4 backdrop-blur-md border border-white/20"
        style={{ background: 'rgba(255,255,255,0.08)' }}
        initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 0.8 + p * 0.2, opacity: p }}>
        <p className="font-display text-lg text-white">{SAMPLE.event}</p>
        <p className="text-white/60 text-[10px] mt-1">{SAMPLE.family}</p>
        <div className="flex gap-1.5 mt-2">
          {range(3).map((i) => <motion.div key={i} className="w-8 h-1 rounded-full bg-white/30" initial={{ width: 0 }} animate={{ width: 20 + p * 20 }} transition={{ delay: i * 0.15 }} />)}
        </div>
      </motion.div>
      <Tag />
    </Shell>
  );
}

/* 2. Gradient Mesh Reveal */
export function ModGradientMesh({ playing, resetKey }: PreviewProps) {
  const p = useProgress(3, playing, resetKey);
  return (
    <Shell>
      <motion.div className="absolute inset-0" style={{
        background: `conic-gradient(from ${p * 360}deg at 50% 50%, #e4c551, #f97316, #c03736, #3c7457, #e4c551)`,
        filter: 'blur(30px)', opacity: 0.4 }} />
      <motion.div className="relative z-10 text-center" initial={{ opacity: 0 }} animate={{ opacity: p }}>
        <p className="font-display text-xl text-white drop-shadow-lg">{SAMPLE.event}</p>
        <p className="text-white/70 text-xs mt-1">{SAMPLE.date}</p>
      </motion.div>
      <Tag />
    </Shell>
  );
}

/* 3. Liquid Blob Reveal */
export function ModLiquidBlob({ playing, resetKey }: PreviewProps) {
  const p = useProgress(2.6, playing, resetKey);
  const t = useAnimationLoop(4, playing, resetKey);
  return (
    <Shell>
      <motion.div className="absolute" style={{
        width: 160, height: 160, filter: 'blur(0px)',
        borderRadius: '42% 58% 63% 37% / 41% 44% 56% 59%',
        background: 'linear-gradient(135deg, #e4c551, #f97316)',
      }} animate={{
        borderRadius: [
          '42% 58% 63% 37% / 41% 44% 56% 59%',
          '58% 42% 37% 63% / 56% 59% 41% 44%',
          '42% 58% 63% 37% / 41% 44% 56% 59%',
        ],
        scale: 0.3 + p * 0.8, opacity: p, rotate: t * 60,
      }} transition={{ borderRadius: { duration: 4, repeat: Infinity } }} />
      <div className="relative z-10 text-center" style={{ opacity: p }}>
        <p className="font-deva text-gold-900 text-lg font-bold">{SAMPLE.bappa}</p>
      </div>
      <Tag />
    </Shell>
  );
}

/* 4. Neon Glow Reveal */
export function ModNeonGlow({ playing, resetKey }: PreviewProps) {
  const p = useProgress(2, playing, resetKey);
  const t = useAnimationLoop(2, playing, resetKey);
  const glow = 0.5 + Math.sin(t * Math.PI * 2) * 0.3;
  return (
    <Shell>
      <div className="absolute inset-0" style={{ background: '#0a0a0f' }} />
      <motion.div className="relative z-10 text-center" initial={{ opacity: 0 }} animate={{ opacity: p }}>
        <motion.p className="font-display text-xl font-bold"
          style={{ color: '#e4c551', textShadow: `0 0 ${10 + glow * 20}px #e4c551, 0 0 ${30 + glow * 40}px #f97316` }}>
          {SAMPLE.event}
        </motion.p>
        <motion.p className="text-xs mt-1" style={{ color: '#f97316', textShadow: `0 0 ${5 + glow * 10}px #f97316` }}>
          {SAMPLE.date}
        </motion.p>
      </motion.div>
      <Tag />
    </Shell>
  );
}

/* 5. Holographic Card */
export function ModHolographic({ playing, resetKey }: PreviewProps) {
  const t = useAnimationLoop(5, playing, resetKey);
  const rx = Math.sin(t * 2 * Math.PI) * 15;
  const ry = Math.cos(t * 2 * Math.PI) * 20;
  return (
    <Shell>
      <motion.div className="relative w-32 h-40 rounded-xl overflow-hidden perspective-[800px]"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateX: rx, rotateY: ry }}>
        <div className="absolute inset-0" style={{
          background: `linear-gradient(${t * 360}deg, rgba(228,197,81,0.5), rgba(249,115,22,0.3), rgba(192,55,54,0.4), rgba(60,116,87,0.3), rgba(228,197,81,0.5))`,
        }} />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="font-display text-sm text-white font-bold drop-shadow">{SAMPLE.event}</p>
          <p className="text-white/70 text-[9px] mt-1">{SAMPLE.date}</p>
        </div>
        <div className="absolute inset-0" style={{ background: `linear-gradient(${90 + t * 180}deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%)` }} />
      </motion.div>
      <Tag />
    </Shell>
  );
}

/* 6. Bento Grid Reveal */
export function ModBentoGrid({ playing, resetKey }: PreviewProps) {
  const p = useProgress(2.4, playing, resetKey);
  return (
    <Shell>
      <div className="grid grid-cols-3 gap-1.5 p-2 w-full h-full">
        {range(6).map((i) => (
          <motion.div key={i}
            className={`rounded-lg flex items-center justify-center ${i === 0 ? 'col-span-2 row-span-2' : ''}`}
            style={{ background: ['rgba(228,197,81,0.15)', 'rgba(249,115,22,0.15)', 'rgba(192,55,54,0.15)', 'rgba(60,116,87,0.15)', 'rgba(228,197,81,0.1)', 'rgba(249,115,22,0.1)'][i] }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: p > i * 0.12 ? 1 : 0, opacity: p > i * 0.12 ? 1 : 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}>
            {i === 0 && <p className="font-display text-xs text-white text-center px-2">{SAMPLE.event}</p>}
          </motion.div>
        ))}
      </div>
      <Tag />
    </Shell>
  );
}

/* 7. Spotlight Sweep */
export function ModSpotlightSweep({ playing, resetKey }: PreviewProps) {
  const t = useAnimationLoop(3, playing, resetKey);
  const x = Math.sin(t * 2 * Math.PI) * 50;
  return (
    <Shell>
      <div className="absolute inset-0" style={{ background: '#111' }} />
      <motion.div className="absolute inset-0" style={{
        background: `radial-gradient(circle at ${50 + x}% 50%, rgba(228,197,81,0.4), transparent 40%)`,
      }} />
      <div className="relative z-10 text-center">
        <p className="font-display text-lg text-white">{SAMPLE.event}</p>
        <p className="text-white/50 text-[10px]">{SAMPLE.venue}</p>
      </div>
      <Tag />
    </Shell>
  );
}

/* 8. Parallax Depth Cards */
export function ModParallaxCards({ playing, resetKey }: PreviewProps) {
  const t = useAnimationLoop(4, playing, resetKey);
  return (
    <Shell>
      {range(3).map((i) => {
        const depth = (i + 1) / 3;
        return (
          <motion.div key={i}
            className="absolute rounded-xl border border-gold-400/20"
            style={{ width: 120 - i * 15, height: 80 - i * 10, background: `rgba(228,197,81,${0.05 + i * 0.05})` }}
            animate={{ x: Math.sin(t * 2 * Math.PI + i) * 20 * depth, y: Math.cos(t * 2 * Math.PI + i) * 10 * depth, rotate: Math.sin(t * 2 * Math.PI) * 5 * depth }}
            initial={{ z: -i * 100, opacity: 0 }}
            >
            {i === 2 && <p className="text-center text-[10px] text-gold-300 mt-6">{SAMPLE.event}</p>}
          </motion.div>
        );
      })}
      <Tag />
    </Shell>
  );
}

/* 9. Gradient Text Reveal */
export function ModGradientText({ playing, resetKey }: PreviewProps) {
  const p = useProgress(2, playing, resetKey);
  const t = useAnimationLoop(3, playing, resetKey);
  return (
    <Shell>
      <motion.p className="font-display text-xl font-bold text-transparent bg-clip-text"
        style={{ backgroundImage: `linear-gradient(${90 + t * 360}deg, #e4c551, #f97316, #c03736, #e4c551)`, backgroundSize: '200% auto' }}
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: p, y: 0 }}>
        {SAMPLE.event}
      </motion.p>
      <motion.p className="text-gold-200/60 text-xs mt-1" initial={{ opacity: 0 }} animate={{ opacity: p }} transition={{ delay: 0.3 }}>
        {SAMPLE.family}
      </motion.p>
      <Tag />
    </Shell>
  );
}

/* 10. Paper Tear Reveal */
export function ModPaperTear({ playing, resetKey }: PreviewProps) {
  const p = useProgress(2.2, playing, resetKey);
  return (
    <Shell>
      <div className="absolute inset-0 flex">
        <motion.div className="h-full w-1/2" style={{
          background: 'linear-gradient(135deg, #3c7457, #2a5240)',
          clipPath: 'polygon(0 0, 100% 0, 95% 30%, 100% 50%, 92% 70%, 98% 100%, 0 100%)',
        }} animate={{ x: -p * 80 }} />
        <motion.div className="h-full w-1/2" style={{
          background: 'linear-gradient(225deg, #3c7457, #2a5240)',
          clipPath: 'polygon(5% 0, 100% 0, 100% 100%, 2% 100%, 8% 70%, 0 50%, 5% 30%)',
        }} animate={{ x: p * 80 }} />
      </div>
      <motion.div className="relative z-10 text-center" initial={{ opacity: 0 }} animate={{ opacity: p }} transition={{ delay: 0.5 }}>
        <p className="font-display text-lg text-gradient-gold">{SAMPLE.event}</p>
      </motion.div>
      <Tag />
    </Shell>
  );
}

/* 11. Glitch Reveal */
export function ModGlitch({ playing, resetKey }: PreviewProps) {
  const t = useAnimationLoop(2, playing, resetKey);
  const offset = Math.sin(t * 20) * 3;
  return (
    <Shell>
      <div className="absolute inset-0" style={{ background: '#0a0a0f' }} />
      <div className="relative z-10 text-center">
        <p className="font-display text-lg font-bold" style={{ color: '#e4c551', textShadow: `${offset}px 0 #c03736, ${-offset}px 0 #3c7457` }}>
          {SAMPLE.event}
        </p>
        <motion.p className="text-white/50 text-[10px] mt-1" animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 0.5, repeat: Infinity }}>
          {SAMPLE.date}
        </motion.p>
      </div>
      <motion.div className="absolute inset-x-0 h-0.5 bg-gold-400/40" animate={{ y: [0, 120, 0], opacity: [0, 1, 0] }} transition={{ duration: 0.3, repeat: Infinity }} />
      <Tag />
    </Shell>
  );
}

/* 12. Kinetic Typography */
export function ModKineticType({ playing, resetKey }: PreviewProps) {
  const t = useAnimationLoop(3, playing, resetKey);
  const words = SAMPLE.event.split(' ');
  return (
    <Shell>
      <div className="text-center">
        {words.map((w, i) => (
          <motion.span key={i} className="inline-block font-display text-lg font-bold text-gradient-gold mx-1"
            animate={{ y: Math.sin(t * 2 * Math.PI + i * 0.5) * 8, rotate: Math.sin(t * 2 * Math.PI + i * 0.5) * 3 }}>
            {w}
          </motion.span>
        ))}
        <motion.p className="text-gold-200/50 text-[10px] mt-2" animate={{ opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 2, repeat: Infinity }}>
          {SAMPLE.family}
        </motion.p>
      </div>
      <Tag />
    </Shell>
  );
}

/* 13. Scroll-Snap Story */
export function ModScrollSnapStory({ playing, resetKey }: PreviewProps) {
  const t = useAnimationLoop(6, playing, resetKey);
  const idx = Math.floor((t / 6) * 3) % 3;
  return (
    <Shell>
      <div className="flex gap-1 absolute top-2 left-2 right-2 z-10">
        {range(3).map((i) => (
          <div key={i} className="flex-1 h-0.5 rounded-full bg-white/20 overflow-hidden">
            <motion.div className="h-full bg-gold-400" animate={{ width: i < idx ? '100%' : i === idx ? `${((t / 6) * 3 % 1) * 100}%` : '0%' }} />
          </div>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={idx} className="text-center px-4" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
          <p className="font-display text-base text-gradient-gold">{[SAMPLE.event, SAMPLE.date, SAMPLE.venue][idx]}</p>
        </motion.div>
      </AnimatePresence>
      <Tag />
    </Shell>
  );
}

/* 14. Inverse Mask Reveal */
export function ModInverseMask({ playing, resetKey }: PreviewProps) {
  const p = useProgress(2, playing, resetKey);
  return (
    <Shell>
      <motion.img src={IMG} className="absolute inset-0 w-full h-full object-cover" initial={{ scale: 1.3 }} animate={{ scale: 1.3 - p * 0.3 }} />
      <motion.div className="absolute inset-0 flex items-center justify-center" style={{ background: '#0a0a0f' }}
        animate={{ clipPath: `circle(${p * 80}% at 50% 50%)` }} />
      <motion.div className="relative z-10 text-center" initial={{ opacity: 0 }} animate={{ opacity: p }}>
        <p className="font-display text-lg text-white drop-shadow-lg">{SAMPLE.event}</p>
      </motion.div>
      <Tag />
    </Shell>
  );
}

/* 15. Tilt-Shift Focus */
export function ModTiltShift({ playing, resetKey }: PreviewProps) {
  const p = useProgress(2.4, playing, resetKey);
  return (
    <Shell>
      <motion.img src={IMG} className="absolute inset-0 w-full h-full object-cover"
        animate={{ filter: `blur(${(1 - p) * 12}px) saturate(${1 + p * 0.5})` }} />
      <motion.div className="relative z-10 text-center bg-black/30 backdrop-blur-sm rounded-lg p-2"
        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: p }}>
        <p className="font-display text-sm text-white">{SAMPLE.event}</p>
        <p className="text-white/60 text-[10px]">{SAMPLE.date}</p>
      </motion.div>
      <Tag />
    </Shell>
  );
}

/* 16. Duotone Reveal */
export function ModDuotone({ playing, resetKey }: PreviewProps) {
  const p = useProgress(2, playing, resetKey);
  return (
    <Shell>
      <motion.img src={IMG} className="absolute inset-0 w-full h-full object-cover" animate={{ opacity: p * 0.4 }} style={{ filter: 'grayscale(1) contrast(1.2)' }} />
      <motion.div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(228,197,81,0.6), rgba(192,55,54,0.4))', mixBlendMode: 'multiply' }}
        animate={{ opacity: p }} />
      <div className="relative z-10 text-center">
        <p className="font-display text-lg text-white font-bold">{SAMPLE.event}</p>
        <p className="text-gold-100 text-xs">{SAMPLE.family}</p>
      </div>
      <Tag />
    </Shell>
  );
}

/* 17. Chromatic Aberration */
export function ModChromatic({ playing, resetKey }: PreviewProps) {
  const t = useAnimationLoop(2, playing, resetKey);
  const d = 2 + Math.sin(t * 2 * Math.PI) * 3;
  return (
    <Shell>
      <div className="absolute inset-0" style={{ background: '#0a0a0f' }} />
      <div className="relative z-10 text-center">
        <p className="font-display text-xl font-bold text-white" style={{ textShadow: `${d}px 0 rgba(228,197,81,0.7), ${-d}px 0 rgba(192,55,54,0.7)` }}>
          {SAMPLE.event}
        </p>
        <p className="text-white/40 text-[10px] mt-1">{SAMPLE.date}</p>
      </div>
      <Tag />
    </Shell>
  );
}

/* 18. Scroll-Driven Counter */
export function ModCounterReveal({ playing, resetKey }: PreviewProps) {
  const p = useProgress(2.5, playing, resetKey);
  const count = Math.floor(p * 2026);
  return (
    <Shell>
      <motion.div className="text-center" initial={{ opacity: 0 }} animate={{ opacity: p }}>
        <motion.p className="font-display text-3xl font-bold text-gradient-gold tabular-nums"
          key={count}>{count}</motion.p>
        <p className="text-gold-200/60 text-xs mt-1">{SAMPLE.event}</p>
      </motion.div>
      <Tag />
    </Shell>
  );
}

/* 19. Marquee Scroll Text */
export function ModMarquee({ playing, resetKey }: PreviewProps) {
  const t = useAnimationLoop(8, playing, resetKey);
  return (
    <Shell>
      <div className="overflow-hidden w-full">
        <motion.div className="whitespace-nowrap flex gap-8" animate={{ x: -t * 200 }}>
          {range(4).map((i) => (
            <span key={i} className="font-display text-lg font-bold text-gradient-gold flex items-center gap-8">
              {SAMPLE.event} <span className="text-gold-400/30">✦</span>
            </span>
          ))}
        </motion.div>
      </div>
      <Tag />
    </Shell>
  );
}

/* 20. Aperture Reveal */
export function ModAperture({ playing, resetKey }: PreviewProps) {
  const p = useProgress(2.2, playing, resetKey);
  return (
    <Shell>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-24 h-24">
          {range(6).map((i) => {
            const ang = (i / 6) * 360;
            return (
              <motion.div key={i} className="absolute w-24 h-12 overflow-hidden"
                style={{ transformOrigin: '50% 100%', transform: `rotate(${ang}deg)`, top: 0, left: 0 }}>
                <motion.div className="w-24 h-24 rounded-full bg-gradient-to-br from-gold-600 to-gold-400"
                  style={{ transformOrigin: '50% 100%' }}
                  animate={{ rotate: p * -60 }} />
              </motion.div>
            );
          })}
        </div>
      </div>
      <motion.div className="relative z-10 text-center" initial={{ opacity: 0 }} animate={{ opacity: p }} transition={{ delay: 0.5 }}>
        <p className="font-display text-sm text-gradient-gold">{SAMPLE.event}</p>
      </motion.div>
      <Tag />
    </Shell>
  );
}

/* 21. Shimmer Card */
export function ModShimmerCard({ playing, resetKey }: PreviewProps) {
  const t = useAnimationLoop(3, playing, resetKey);
  return (
    <Shell>
      <div className="relative w-36 h-24 rounded-xl overflow-hidden border border-gold-400/20"
        style={{ background: 'linear-gradient(135deg, #1a2a1e, #0f1f14)' }}>
        <motion.div className="absolute inset-0" style={{
          background: `linear-gradient(${90 + t * 360}deg, transparent 40%, rgba(228,197,81,0.3) 50%, transparent 60%)`,
        }} />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="font-display text-sm text-gold-300 font-bold">{SAMPLE.event}</p>
          <p className="text-gold-200/40 text-[9px]">{SAMPLE.date}</p>
        </div>
      </div>
      <Tag />
    </Shell>
  );
}

/* 22. Pixel Dissolve */
export function ModPixelDissolve({ playing, resetKey }: PreviewProps) {
  const p = useProgress(2.6, playing, resetKey);
  return (
    <Shell>
      <div className="grid grid-cols-10 gap-0.5 p-2 w-full h-full">
        {range(100).map((i) => {
          const visible = p > (i * 7 % 100) / 100;
          return (
            <motion.div key={i} className="rounded-sm"
              style={{ background: visible ? `hsl(${(i * 3.6 + 30) % 60 + 30}, 70%, 55%)` : 'transparent' }}
              animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0 }} transition={{ duration: 0.2 }} />
          );
        })}
      </div>
      <Tag />
    </Shell>
  );
}

/* 23. Wave Reveal */
export function ModWaveReveal({ playing, resetKey }: PreviewProps) {
  const p = useProgress(2.4, playing, resetKey);
  const t = useAnimationLoop(3, playing, resetKey);
  return (
    <Shell>
      <motion.div className="absolute bottom-0 left-0 right-0" style={{ height: '100%' }}
        animate={{ height: `${p * 100}%` }}>
        <svg className="absolute bottom-0 w-full h-12" viewBox="0 0 200 50" preserveAspectRatio="none">
          <motion.path d="M0,25 Q50,10 100,25 T200,25 L200,50 L0,50 Z" fill="url(#waveGrad)"
            animate={{ d: [
              'M0,25 Q50,10 100,25 T200,25 L200,50 L0,50 Z',
              'M0,25 Q50,40 100,25 T200,25 L200,50 L0,50 Z',
              'M0,25 Q50,10 100,25 T200,25 L200,50 L0,50 Z',
            ] }} transition={{ duration: 3, repeat: Infinity }} />
          <defs><linearGradient id="waveGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e4c551" /><stop offset="100%" stopColor="#f97316" />
          </linearGradient></defs>
        </svg>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #e4c551, #f97316)', opacity: 0.8 }} />
      </motion.div>
      <motion.div className="relative z-10 text-center" initial={{ opacity: 0 }} animate={{ opacity: p }} transition={{ delay: 0.5 }}>
        <p className="font-display text-lg text-forest-950 font-bold">{SAMPLE.event}</p>
      </motion.div>
      <Tag />
    </Shell>
  );
}

/* 24. Card Stack 3D */
export function ModCardStack3D({ playing, resetKey }: PreviewProps) {
  const t = useAnimationLoop(5, playing, resetKey);
  return (
    <div className="relative h-full w-full rounded-xl bg-forest-950 flex items-center justify-center overflow-hidden perspective-[1000px]">
      {range(4).map((i) => {
        const phase = (t + i * 0.25) % 1;
        return (
          <motion.div key={i} className="absolute w-28 h-36 rounded-xl border border-gold-400/20 flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, rgba(228,197,81,${0.05 + i * 0.05}), rgba(60,116,87,${0.05 + i * 0.05}))` }}
            animate={{
              y: phase * -200 + 50, z: phase * -100, rotateX: phase * 20,
              opacity: phase < 0.8 ? 1 : 1 - (phase - 0.8) * 5,
            }}>
            <p className="text-[10px] text-gold-300 text-center px-2">{SAMPLE.event}</p>
          </motion.div>
        );
      })}
      <Tag />
    </div>
  );
}

/* 25. Scan Line Reveal */
export function ModScanLine({ playing, resetKey }: PreviewProps) {
  const p = useProgress(2.2, playing, resetKey);
  return (
    <Shell>
      <div className="absolute inset-0" style={{ background: '#0a0a0f' }} />
      <motion.div className="absolute inset-0" style={{
        background: `linear-gradient(to bottom, transparent ${p * 100 - 10}%, rgba(228,197,81,0.6) ${p * 100}%, transparent ${p * 100 + 10}%)`,
      }} />
      <motion.div className="relative z-10 text-center" style={{ filter: `blur(${(1 - p) * 8}px)` }}>
        <p className="font-display text-lg text-gold-300 font-bold">{SAMPLE.event}</p>
        <p className="text-gold-200/40 text-[10px]">{SAMPLE.date}</p>
      </motion.div>
      <Tag />
    </Shell>
  );
}

/* 26. Flip Card Reveal */
export function ModFlipCard({ playing, resetKey }: PreviewProps) {
  const p = useProgress(2.4, playing, resetKey);
  const flipped = p > 0.5;
  return (
    <div className="relative h-full w-full rounded-xl bg-forest-950 flex items-center justify-center overflow-hidden perspective-[800px]">
      <motion.div className="relative w-32 h-40" style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: flipped ? 180 : 0 }} transition={{ duration: 1 }}>
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-gold-600 to-gold-400 flex items-center justify-center" style={{ backfaceVisibility: 'hidden' }}>
          <p className="font-deva text-forest-950 text-sm font-bold">{SAMPLE.om}</p>
        </div>
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-forest-700 to-forest-900 border border-gold-400/30 flex items-center justify-center" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
          <div className="text-center">
            <p className="font-display text-sm text-gradient-gold">{SAMPLE.event}</p>
            <p className="text-gold-200/50 text-[9px] mt-1">{SAMPLE.date}</p>
          </div>
        </div>
      </motion.div>
      <Tag />
    </div>
  );
}

/* 27. Aurora Curtain */
export function ModAuroraCurtain({ playing, resetKey }: PreviewProps) {
  const t = useAnimationLoop(6, playing, resetKey);
  const p = useProgress(3, playing, resetKey);
  return (
    <Shell>
      {range(4).map((i) => (
        <motion.div key={i} className="absolute" style={{
          width: '60%', height: '60%', borderRadius: '50%', filter: 'blur(30px)',
          background: ['rgba(228,197,81,0.3)', 'rgba(249,115,22,0.2)', 'rgba(60,116,87,0.25)', 'rgba(192,55,54,0.2)'][i],
        }} animate={{
          x: Math.sin(t * 2 * Math.PI + i * 1.5) * 60,
          y: Math.cos(t * 2 * Math.PI + i * 1.5) * 40,
          scale: 0.5 + p * 0.5,
        }} />
      ))}
      <motion.div className="relative z-10 text-center" initial={{ opacity: 0 }} animate={{ opacity: p }}>
        <p className="font-display text-lg text-white drop-shadow-lg">{SAMPLE.event}</p>
      </motion.div>
      <Tag />
    </Shell>
  );
}

/* 28. Torn Paper Reveal */
export function ModTornPaper({ playing, resetKey }: PreviewProps) {
  const p = useProgress(2, playing, resetKey);
  return (
    <Shell>
      <div className="absolute inset-0" style={{ background: '#1a1a2e' }} />
      {range(5).map((i) => {
        const delay = i * 0.15;
        return (
          <motion.div key={i} className="absolute left-0 right-0"
            style={{ height: '20%', top: `${i * 20}%`, background: i % 2 === 0 ? '#e4c551' : '#f97316',
              clipPath: i % 2 === 0 ? 'polygon(0 0, 100% 0, 95% 100%, 0 100%)' : 'polygon(0 0, 100% 0, 5% 100%, 0 100%)' }}
            initial={{ x: -200 }} animate={{ x: p > delay ? 0 : -200 }} transition={{ type: 'spring', stiffness: 100, damping: 12 }} />
        );
      })}
      <Tag />
    </Shell>
  );
}

/* 29. Floating Action Stack */
export function ModFloatingStack({ playing, resetKey }: PreviewProps) {
  const [open, setOpen] = useState(false);
  const t = useAnimationLoop(4, playing, resetKey);
  return (
    <Shell>
      <div className="relative">
        {['💌', '📅', '📍'].map((emoji, i) => (
          <motion.button key={i} className="absolute w-10 h-10 rounded-full bg-gold-500 text-forest-950 flex items-center justify-center shadow-lg"
            style={{ left: 0, top: 0 }}
            animate={open ? { y: -(i + 1) * 48, x: 0, opacity: 1 } : { y: 0, x: 0, opacity: 0 }}
            onClick={() => {}}>
            {emoji}
          </motion.button>
        ))}
        <motion.button className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 text-forest-950 flex items-center justify-center shadow-xl"
          animate={{ rotate: open ? 135 : 0, scale: 1 + Math.sin(t * 2 * Math.PI) * 0.05 }}
          onClick={() => setOpen((v) => !v)}>
          <span className="text-xl font-bold">+</span>
        </motion.button>
      </div>
      <Tag />
    </Shell>
  );
}

/* 30. Grain + Glow Reveal */
export function ModGrainGlow({ playing, resetKey }: PreviewProps) {
  const p = useProgress(2.4, playing, resetKey);
  const t = useAnimationLoop(2, playing, resetKey);
  return (
    <Shell>
      <motion.div className="absolute inset-0" style={{
        background: 'radial-gradient(circle at 50% 50%, rgba(228,197,81,0.2), transparent 60%)',
        opacity: p,
      }} animate={{ scale: 0.5 + Math.sin(t * 2 * Math.PI) * 0.1 + p * 0.5 }} />
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'4\' height=\'4\'%3E%3Crect width=\'4\' height=\'4\' fill=\'%23ffffff\' fill-opacity=\'0.08\'/%3E%3C/svg%3E")' }} />
      <motion.div className="relative z-10 text-center" initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: p }}>
        <p className="font-display text-lg text-white font-bold">{SAMPLE.event}</p>
        <p className="text-gold-200/50 text-[10px]">{SAMPLE.venue}</p>
      </motion.div>
      <Tag />
    </Shell>
  );
}
