import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import type { PreviewProps } from '@/types';
import { useProgress, SAMPLE, range } from '@/lib/hooks';

/* 1. Tap To Reveal */
export function TapReveal({ playing, resetKey, mobile }: PreviewProps) {
  const [opened, setOpened] = useState(false);
  useEffect(() => { if (playing) setOpened(true); }, [playing, resetKey]);
  useEffect(() => { setOpened(false); }, [resetKey]);
  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-gradient-to-b from-forest-950 to-forest-800 flex items-center justify-center">
      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.button key="t" onClick={() => setOpened(true)}
            className="rounded-full border border-gold-400/60 px-6 py-3 text-gold-200 text-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
            Tap to Reveal
          </motion.button>
        ) : (
          <motion.div key="i" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            className="text-center px-4">
            <p className="font-deva text-gold-300 text-xl">{SAMPLE.bappa}</p>
            <p className="text-cream-200 text-xs mt-1">{SAMPLE.event}</p>
          </motion.div>
        )}
      </AnimatePresence>
      {mobile && <span className="absolute bottom-2 right-2 text-[9px] text-cream-200/40">tap</span>}
    </div>
  );
}

/* 2. Curtain Reveal */
export function CurtainReveal({ playing, resetKey }: PreviewProps) {
  const p = useProgress(2.2, playing, resetKey);
  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-forest-900 flex items-center justify-center">
      <div className="text-center z-10 px-4">
        <p className="font-deva text-gold-300 text-xl">{SAMPLE.bappa}</p>
        <p className="text-cream-200 text-xs mt-1">{SAMPLE.event}</p>
      </div>
      <div className="absolute inset-0 flex">
        <motion.div className="h-full w-1/2 bg-gradient-to-r from-maroon-900 to-maroon-800"
          animate={{ x: -p * 100 + '%' }} transition={{ ease: 'easeInOut' }} />
        <motion.div className="h-full w-1/2 bg-gradient-to-l from-maroon-900 to-maroon-800"
          animate={{ x: `${p * 100 - 100}%` }} transition={{ ease: 'easeInOut' }} />
      </div>
      <div className="absolute top-0 left-1/2 h-full w-px bg-gold-400/40" />
    </div>
  );
}

/* 3. Diya Light Reveal */
export function DiyaLightReveal({ playing, resetKey, controls }: PreviewProps) {
  const p = useProgress(2.6, playing, resetKey);
  const intensity = controls?.intensity ?? 1;
  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-forest-950 flex items-center justify-center">
      <motion.div className="absolute rounded-full bg-saffron-400/40 blur-2xl"
        style={{ width: 220, height: 220 }}
        animate={{ scale: 0.2 + p * 1.8 * intensity, opacity: p }} />
      <div className="relative z-10 text-center" style={{ opacity: p }}>
        <div className="text-3xl mb-1">🪔</div>
        <p className="font-deva text-gold-300 text-lg">{SAMPLE.bappa}</p>
        <p className="text-cream-200 text-xs">{SAMPLE.event}</p>
      </div>
    </div>
  );
}

/* 4. Golden Glow Reveal */
export function GoldenGlowReveal({ playing, resetKey }: PreviewProps) {
  const p = useProgress(2, playing, resetKey);
  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-forest-950 flex items-center justify-center">
      <motion.div className="absolute inset-0 bg-gold-400/20 blur-2xl"
        animate={{ opacity: p }} />
      <motion.div initial={{ filter: 'blur(20px)', opacity: 0 }}
        animate={{ filter: `blur(${(1 - p) * 20}px)`, opacity: p }}
        className="text-center relative z-10">
        <p className="font-display text-2xl text-gradient-gold">{SAMPLE.event}</p>
        <p className="text-cream-200 text-xs mt-1">{SAMPLE.family}</p>
      </motion.div>
    </div>
  );
}

/* 5. Circle Expansion */
export function CircleExpansion({ playing, resetKey }: PreviewProps) {
  const p = useProgress(1.8, playing, resetKey);
  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-forest-950 flex items-center justify-center">
      <div className="text-center z-10">
        <p className="font-deva text-gold-300 text-xl">{SAMPLE.bappa}</p>
        <p className="text-cream-200 text-xs">{SAMPLE.event}</p>
      </div>
      <motion.div className="absolute rounded-full bg-gold-400"
        style={{ width: 20, height: 20 }}
        animate={{ scale: p * 30, opacity: 1 - p }} />
    </div>
  );
}

/* 6. Radial Reveal (clip-path) */
export function RadialReveal({ playing, resetKey }: PreviewProps) {
  const p = useProgress(2, playing, resetKey);
  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-forest-900 flex items-center justify-center">
      <div className="text-center">
        <p className="font-deva text-gold-300 text-xl">{SAMPLE.bappa}</p>
        <p className="text-cream-200 text-xs">{SAMPLE.event}</p>
      </div>
      <motion.div className="absolute inset-0 bg-forest-950"
        style={{ clipPath: `circle(${100 - p * 100}% at 50% 50%)` }} />
    </div>
  );
}

/* 7. Split Door Reveal */
export function SplitDoorReveal({ playing, resetKey }: PreviewProps) {
  const p = useProgress(2.2, playing, resetKey);
  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-forest-900 flex items-center justify-center">
      <div className="text-center z-10 px-4">
        <p className="font-deva text-gold-300 text-lg">{SAMPLE.bappa}</p>
        <p className="text-cream-200 text-xs">{SAMPLE.event}</p>
      </div>
      <div className="absolute inset-0 flex">
        <motion.div className="h-full w-1/2 bg-gradient-to-r from-brown-800 to-brown-700 origin-left"
          animate={{ rotateY: p * -90 }} style={{ transformStyle: 'preserve-3d' }} />
        <motion.div className="h-full w-1/2 bg-gradient-to-l from-brown-800 to-brown-700 origin-right"
          animate={{ rotateY: p * 90 }} style={{ transformStyle: 'preserve-3d' }} />
      </div>
    </div>
  );
}

/* 8. Book Opening */
export function BookOpening({ playing, resetKey }: PreviewProps) {
  const p = useProgress(2.4, playing, resetKey);
  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-forest-950 flex items-center justify-center perspective-[1000px]">
      <div className="text-center z-10 px-4">
        <p className="font-deva text-gold-300 text-lg">{SAMPLE.bappa}</p>
        <p className="text-cream-200 text-xs">{SAMPLE.event}</p>
      </div>
      <motion.div className="absolute left-1/2 top-0 h-full w-1/2 bg-gradient-to-l from-cream-700 to-cream-800 origin-left"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: p * -180 }} />
    </div>
  );
}

/* 9. Envelope Opening */
export function EnvelopeOpening({ playing, resetKey }: PreviewProps) {
  const p = useProgress(2.2, playing, resetKey);
  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-forest-900 flex items-center justify-center">
      <motion.div className="relative w-40 h-24 rounded-md bg-cream-200 shadow-lg overflow-hidden"
        animate={{ y: -p * 30 }}>
        <div className="text-center mt-3 px-2">
          <p className="font-deva text-maroon-700 text-sm">{SAMPLE.bappa}</p>
          <p className="text-brown-700 text-[10px]">{SAMPLE.event}</p>
        </div>
      </motion.div>
      <motion.div className="absolute w-40 h-0 border-l-[80px] border-r-[80px] border-b-[40px] border-l-transparent border-r-transparent border-b-cream-700"
        style={{ bottom: '30%' }}
        animate={{ rotateX: p * -180 }} />
    </div>
  );
}

/* 10. Temple Door Opening */
export function TempleDoorReveal({ playing, resetKey }: PreviewProps) {
  const p = useProgress(2.6, playing, resetKey);
  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-forest-900 flex items-center justify-center">
      <div className="text-center z-10 px-4">
        <p className="font-deva text-gold-300 text-lg">{SAMPLE.bappa}</p>
        <p className="text-cream-200 text-xs">{SAMPLE.event}</p>
      </div>
      <div className="absolute inset-0 flex">
        <motion.div className="h-full w-1/2 bg-gradient-to-br from-brown-700 to-brown-900 border-r-2 border-gold-500/60 origin-left"
          animate={{ x: -p * 100 + '%' }} />
        <motion.div className="h-full w-1/2 bg-gradient-to-bl from-brown-700 to-brown-900 border-l-2 border-gold-500/60 origin-right"
          animate={{ x: `${p * 100 - 100}%` }} />
      </div>
      <div className="absolute top-2 left-1/2 -translate-x-1/2 text-gold-400 text-lg">⚜</div>
    </div>
  );
}

/* 11. Rangoli Draw Reveal */
export function RangoliDrawReveal({ playing, resetKey }: PreviewProps) {
  const p = useProgress(2.8, playing, resetKey);
  const rings = range(4);
  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-forest-950 flex items-center justify-center">
      <div className="absolute text-center z-10" style={{ opacity: p }}>
        <p className="font-deva text-gold-300 text-sm">{SAMPLE.bappa}</p>
      </div>
      <div className="relative w-44 h-44">
        {rings.map((i) => (
          <motion.div key={i} className="absolute inset-0 rounded-full border-2"
            style={{ borderColor: ['#e4c551', '#c03736', '#f97316', '#3c7457'][i], margin: i * 14 }}
            initial={{ pathLength: 0, scale: 0.6, opacity: 0 }}
            animate={{ pathLength: p > i / 4 ? 1 : 0, scale: 0.6 + p * 0.6, opacity: 1 }} />
        ))}
        {range(8).map((i) => {
          const ang = (i / 8) * Math.PI * 2;
          return (
            <motion.div key={`p${i}`} className="absolute w-2 h-2 rounded-full bg-gold-400"
              style={{ left: '50%', top: '50%' }}
              animate={{ x: Math.cos(ang) * p * 70, y: Math.sin(ang) * p * 70, opacity: p }} />
          );
        })}
      </div>
    </div>
  );
}

/* 12. Blur To Sharp */
export function BlurToSharp({ playing, resetKey }: PreviewProps) {
  const p = useProgress(1.8, playing, resetKey);
  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-forest-900 flex items-center justify-center">
      <motion.div style={{ filter: `blur(${(1 - p) * 16}px)`, opacity: p }}
        className="text-center">
        <p className="font-display text-2xl text-gradient-gold">{SAMPLE.event}</p>
        <p className="text-cream-200 text-xs mt-1">{SAMPLE.family}</p>
      </motion.div>
    </div>
  );
}

/* 13. Black Screen To Invitation */
export function BlackToInvite({ playing, resetKey }: PreviewProps) {
  const p = useProgress(2, playing, resetKey);
  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-gradient-to-b from-forest-800 to-forest-950 flex items-center justify-center">
      <motion.div className="absolute inset-0 bg-black" animate={{ opacity: 1 - p }} />
      <div className="text-center z-10">
        <p className="font-deva text-gold-300 text-xl" style={{ opacity: p }}>{SAMPLE.bappa}</p>
        <p className="text-cream-200 text-xs mt-1" style={{ opacity: p }}>{SAMPLE.event}</p>
      </div>
    </div>
  );
}

/* 14. Particle Reveal */
export function ParticleReveal({ playing, resetKey }: PreviewProps) {
  const p = useProgress(2.4, playing, resetKey);
  const particles = range(30);
  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-forest-950 flex items-center justify-center">
      <div className="text-center z-10" style={{ opacity: p }}>
        <p className="font-deva text-gold-300 text-lg">{SAMPLE.bappa}</p>
        <p className="text-cream-200 text-xs">{SAMPLE.event}</p>
      </div>
      {particles.map((i) => {
        const ang = (i / 30) * Math.PI * 2;
        return (
          <motion.div key={i} className="absolute w-1 h-1 rounded-full bg-gold-300"
            style={{ left: '50%', top: '50%' }}
            initial={{ x: 0, y: 0, opacity: 0 }}
            animate={{ x: Math.cos(ang) * p * 160, y: Math.sin(ang) * 100, opacity: 1 - p }} />
        );
      })}
    </div>
  );
}

/* 15. Ganpati Reveal */
export function GanpatiReveal({ playing, resetKey }: PreviewProps) {
  const p = useProgress(2.6, playing, resetKey);
  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-gradient-to-b from-maroon-900 to-forest-950 flex items-center justify-center">
      <motion.div className="absolute rounded-full bg-saffron-400/30 blur-3xl"
        style={{ width: 200, height: 200 }}
        animate={{ scale: p * 1.6, opacity: p }} />
      <motion.div className="text-center z-10"
        initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 0.5 + p * 0.5, opacity: p }}>
        <div className="text-4xl mb-1">🕉️</div>
        <p className="font-deva text-gold-300 text-lg">{SAMPLE.bappa}</p>
        <p className="text-cream-200 text-xs">{SAMPLE.event}</p>
      </motion.div>
      {range(12).map((i) => (
        <motion.div key={i} className="absolute w-1 h-1 rounded-full bg-gold-300"
          style={{ left: `${10 + i * 7}%`, top: '10%' }}
          animate={{ y: [0, 200], opacity: [0, 1, 0] }}
          transition={{ duration: 3, delay: i * 0.2, repeat: Infinity }} />
      ))}
    </div>
  );
}
