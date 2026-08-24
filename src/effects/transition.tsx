import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import type { PreviewProps } from '@/types';
import { useProgress, SAMPLE } from '@/lib/hooks';

const A = 'Welcome';
const B = SAMPLE.bappa;

/* All transitions auto-play A->B->A loop */
function useTransitionCycle(playing: boolean, resetKey: number, duration: number) {
  const [phase, setPhase] = useState<'A' | 'B'>('A');
  const p = useProgress(duration, playing, resetKey);
  useEffect(() => {
    if (p >= 1) setPhase((ph) => (ph === 'A' ? 'B' : 'A'));
  }, [p]);
  return { phase, p };
}

function TransitionShell({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-forest-950 flex items-center justify-center">
      {children}
      <span className="absolute bottom-1 right-2 text-[8px] text-cream-200/40">{label}</span>
    </div>
  );
}

export function TransFade({ playing, resetKey }: PreviewProps) {
  const { phase } = useTransitionCycle(playing, resetKey, 1.6);
  return (
    <TransitionShell label="fade">
      <AnimatePresence mode="wait">
        <motion.p key={phase} className="font-display text-xl text-gradient-gold"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
          {phase === 'A' ? A : B}
        </motion.p>
      </AnimatePresence>
    </TransitionShell>
  );
}

export function TransSlide({ playing, resetKey }: PreviewProps) {
  const { phase } = useTransitionCycle(playing, resetKey, 1.6);
  return (
    <TransitionShell label="slide">
      <AnimatePresence mode="wait">
        <motion.p key={phase} className="font-display text-xl text-gradient-gold absolute"
          initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -100, opacity: 0 }} transition={{ duration: 0.5 }}>
          {phase === 'A' ? A : B}
        </motion.p>
      </AnimatePresence>
    </TransitionShell>
  );
}

export function TransCurtain({ playing, resetKey }: PreviewProps) {
  const { phase, p } = useTransitionCycle(playing, resetKey, 2);
  return (
    <TransitionShell label="curtain">
      <p className="font-display text-xl text-gradient-gold">{phase === 'A' ? A : B}</p>
      <div className="absolute inset-0 flex pointer-events-none">
        <motion.div className="h-full w-1/2 bg-maroon-900" animate={{ x: p < 0.5 ? -p * 200 : (1 - p) * -100 + '%', opacity: p < 0.5 ? 1 : 1 }} />
        <motion.div className="h-full w-1/2 bg-maroon-900" animate={{ x: p < 0.5 ? p * 200 : (1 - p) * 100 + '%' }} />
      </div>
    </TransitionShell>
  );
}

export function TransCircle({ playing, resetKey }: PreviewProps) {
  const { phase, p } = useTransitionCycle(playing, resetKey, 1.8);
  return (
    <TransitionShell label="circle">
      <p className="font-display text-xl text-gradient-gold z-10">{phase === 'A' ? A : B}</p>
      <motion.div className="absolute rounded-full bg-forest-700" style={{ width: 30, height: 30 }}
        animate={{ scale: p < 0.5 ? p * 20 : (1 - p) * 20, opacity: p < 0.5 ? 1 : 1 }} />
    </TransitionShell>
  );
}

export function TransDiagonal({ playing, resetKey }: PreviewProps) {
  const { phase, p } = useTransitionCycle(playing, resetKey, 1.6);
  return (
    <TransitionShell label="diagonal">
      <p className="font-display text-xl text-gradient-gold z-10">{phase === 'A' ? A : B}</p>
      <motion.div className="absolute inset-0 bg-gold-500" style={{ clipPath: `polygon(0 0, ${100 * p}% 0, ${100 * p - 100}% 100%, 0 100%)` }} />
    </TransitionShell>
  );
}

export function TransBlur({ playing, resetKey }: PreviewProps) {
  const { phase } = useTransitionCycle(playing, resetKey, 1.6);
  return (
    <TransitionShell label="blur">
      <AnimatePresence mode="wait">
        <motion.p key={phase} className="font-display text-xl text-gradient-gold"
          initial={{ filter: 'blur(20px)', opacity: 0 }} animate={{ filter: 'blur(0px)', opacity: 1 }} exit={{ filter: 'blur(20px)', opacity: 0 }} transition={{ duration: 0.5 }}>
          {phase === 'A' ? A : B}
        </motion.p>
      </AnimatePresence>
    </TransitionShell>
  );
}

export function TransZoom({ playing, resetKey }: PreviewProps) {
  const { phase } = useTransitionCycle(playing, resetKey, 1.6);
  return (
    <TransitionShell label="zoom">
      <AnimatePresence mode="wait">
        <motion.p key={phase} className="font-display text-xl text-gradient-gold"
          initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 2, opacity: 0 }} transition={{ duration: 0.5 }}>
          {phase === 'A' ? A : B}
        </motion.p>
      </AnimatePresence>
    </TransitionShell>
  );
}

export function TransFlip({ playing, resetKey }: PreviewProps) {
  const { phase } = useTransitionCycle(playing, resetKey, 1.8);
  return (
    <div className="h-full w-full rounded-xl bg-forest-950 flex items-center justify-center perspective-[800px]">
      <AnimatePresence mode="wait">
        <motion.p key={phase} className="font-display text-xl text-gradient-gold"
          initial={{ rotateY: 90, opacity: 0 }} animate={{ rotateY: 0, opacity: 1 }} exit={{ rotateY: -90, opacity: 0 }} transition={{ duration: 0.5 }}>
          {phase === 'A' ? A : B}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

export function TransSplitScreen({ playing, resetKey }: PreviewProps) {
  const { phase, p } = useTransitionCycle(playing, resetKey, 1.8);
  return (
    <TransitionShell label="split">
      <p className="font-display text-xl text-gradient-gold z-10">{phase === 'A' ? A : B}</p>
      <motion.div className="absolute top-0 left-0 h-full bg-forest-700" animate={{ width: `${p < 0.5 ? p * 100 : (1 - p) * 100}%` }} style={{ width: '50%' }} />
    </TransitionShell>
  );
}

export function TransGoldenCurtain({ playing, resetKey }: PreviewProps) {
  const { phase, p } = useTransitionCycle(playing, resetKey, 2.2);
  return (
    <TransitionShell label="gold curtain">
      <p className="font-display text-xl text-gradient-gold z-10">{phase === 'A' ? A : B}</p>
      <div className="absolute inset-0 flex pointer-events-none">
        <motion.div className="h-full w-1/2 bg-gradient-to-r from-gold-600 to-gold-400" animate={{ x: p < 0.5 ? -p * 100 + '%' : -(1 - p) * 100 + '%' }} />
        <motion.div className="h-full w-1/2 bg-gradient-to-l from-gold-600 to-gold-400" animate={{ x: p < 0.5 ? p * 100 + '%' : (1 - p) * 100 + '%' }} />
      </div>
    </TransitionShell>
  );
}

export function TransRangoli({ playing, resetKey }: PreviewProps) {
  const { phase, p } = useTransitionCycle(playing, resetKey, 2);
  return (
    <TransitionShell label="rangoli">
      <p className="font-display text-xl text-gradient-gold z-10">{phase === 'A' ? A : B}</p>
      <motion.div className="absolute rounded-full border-4 border-gold-400" style={{ width: 20, height: 20 }}
        animate={{ scale: p < 0.5 ? p * 15 : (1 - p) * 15, rotate: p * 180, opacity: 1 }} />
      <motion.div className="absolute rounded-full border-2 border-maroon-500" style={{ width: 20, height: 20 }}
        animate={{ scale: p < 0.5 ? p * 10 : (1 - p) * 10, rotate: -p * 180 }} />
    </TransitionShell>
  );
}

export function TransParticle({ playing, resetKey }: PreviewProps) {
  const { phase, p } = useTransitionCycle(playing, resetKey, 2);
  return (
    <TransitionShell label="particle">
      <p className="font-display text-xl text-gradient-gold z-10">{phase === 'A' ? A : B}</p>
      {Array.from({ length: 20 }).map((_, i) => {
        const ang = (i / 20) * Math.PI * 2;
        return (
          <motion.div key={i} className="absolute w-1 h-1 rounded-full bg-gold-300" style={{ left: '50%', top: '50%' }}
            animate={{ x: Math.cos(ang) * (p < 0.5 ? p : 1 - p) * 120, y: Math.sin(ang) * (p < 0.5 ? p : 1 - p) * 80, opacity: 1 }} />
        );
      })}
    </TransitionShell>
  );
}
