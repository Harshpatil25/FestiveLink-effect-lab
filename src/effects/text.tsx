import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import type { PreviewProps } from '@/types';
import { useProgress, useAnimationLoop, SAMPLE, range } from '@/lib/hooks';

const baseText = SAMPLE.event;

/* 1. Fade In */
export function TextFadeIn({ playing, resetKey }: PreviewProps) {
  const p = useProgress(1.5, playing, resetKey);
  return <TextShell opacity={p} y={0}>{baseText}</TextShell>;
}
/* 2. Fade Up */
export function TextFadeUp({ playing, resetKey }: PreviewProps) {
  const p = useProgress(1.5, playing, resetKey);
  return <TextShell opacity={p} y={(1 - p) * 30}>{baseText}</TextShell>;
}
/* 3. Fade Down */
export function TextFadeDown({ playing, resetKey }: PreviewProps) {
  const p = useProgress(1.5, playing, resetKey);
  return <TextShell opacity={p} y={(p - 1) * 30}>{baseText}</TextShell>;
}
/* 4. Slide From Left */
export function TextSlideLeft({ playing, resetKey }: PreviewProps) {
  const p = useProgress(1.4, playing, resetKey);
  return <TextShell opacity={Math.min(1, p * 2)} x={(p - 1) * 80}>{baseText}</TextShell>;
}
/* 5. Slide From Right */
export function TextSlideRight({ playing, resetKey }: PreviewProps) {
  const p = useProgress(1.4, playing, resetKey);
  return <TextShell opacity={Math.min(1, p * 2)} x={(1 - p) * 80}>{baseText}</TextShell>;
}

/* 6. Letter By Letter */
export function TextLetterByLetter({ playing, resetKey }: PreviewProps) {
  const p = useProgress(2, playing, resetKey);
  const chars = baseText.split('');
  return (
    <TextShell opacity={1} y={0}>
      {chars.map((c, i) => (
        <span key={i} style={{ opacity: Math.min(1, Math.max(0, p * chars.length - i)) }} className="inline-block">
          {c === ' ' ? '\u00A0' : c}
        </span>
      ))}
    </TextShell>
  );
}

/* 7. Word By Word */
export function TextWordByWord({ playing, resetKey }: PreviewProps) {
  const p = useProgress(1.8, playing, resetKey);
  const words = baseText.split(' ');
  return (
    <TextShell opacity={1} y={0}>
      {words.map((w, i) => (
        <span key={i} style={{ opacity: Math.min(1, Math.max(0, p * words.length - i)) }} className="inline-block mr-2">
          {w}
        </span>
      ))}
    </TextShell>
  );
}

/* 8. Typewriter */
export function TextTypewriter({ playing, resetKey }: PreviewProps) {
  const p = useProgress(2.2, playing, resetKey);
  const count = Math.floor(p * baseText.length);
  const [showCaret, setShowCaret] = useState(true);
  useEffect(() => { const t = setInterval(() => setShowCaret((v) => !v), 400); return () => clearInterval(t); }, []);
  return (
    <TextShell opacity={1} y={0}>
      {baseText.slice(0, count)}
      <span className={showCaret ? 'opacity-100' : 'opacity-0'}>|</span>
    </TextShell>
  );
}

/* 9. Blur To Sharp (text) */
export function TextBlurToSharp({ playing, resetKey }: PreviewProps) {
  const p = useProgress(1.8, playing, resetKey);
  return (
    <div className="flex h-full w-full items-center justify-center bg-forest-900 rounded-xl">
      <p className="font-display text-2xl text-gradient-gold" style={{ filter: `blur(${(1 - p) * 14}px)`, opacity: p }}>{baseText}</p>
    </div>
  );
}

/* 10. Scale In */
export function TextScaleIn({ playing, resetKey }: PreviewProps) {
  const p = useProgress(1.4, playing, resetKey);
  return <TextShell opacity={p} y={0} scale={0.6 + p * 0.4}>{baseText}</TextShell>;
}

/* 11. Split Text Reveal (top/bottom halves) */
export function TextSplitReveal({ playing, resetKey }: PreviewProps) {
  const p = useProgress(1.8, playing, resetKey);
  return (
    <div className="flex h-full w-full items-center justify-center bg-forest-900 rounded-xl overflow-hidden">
      <div className="relative font-display text-2xl text-gradient-gold leading-none">
        <div className="overflow-hidden"><motion.div animate={{ y: -(1 - p) * 50 }}>{baseText}</motion.div></div>
        <div className="overflow-hidden absolute top-0 left-0"><motion.div animate={{ y: (1 - p) * 50 + 50 }} className="opacity-50">{baseText}</motion.div></div>
      </div>
    </div>
  );
}

/* 12. Character Wave */
export function TextCharWave({ playing, resetKey }: PreviewProps) {
  const t = useAnimationLoop(2.4, playing, resetKey);
  const chars = baseText.split('');
  return (
    <div className="flex h-full w-full items-center justify-center bg-forest-900 rounded-xl">
      <p className="font-display text-xl text-gradient-gold flex">
        {chars.map((c, i) => (
          <motion.span key={i} className="inline-block"
            animate={{ y: Math.sin(t * Math.PI * 2 + i * 0.4) * 8 }}
            transition={{ duration: 0.05 }}>
            {c === ' ' ? '\u00A0' : c}
          </motion.span>
        ))}
      </p>
    </div>
  );
}

/* 13. Golden Shimmer */
export function TextGoldenShimmer({ playing, resetKey }: PreviewProps) {
  const p = useProgress(2, playing, resetKey);
  return (
    <div className="flex h-full w-full items-center justify-center bg-forest-950 rounded-xl">
      <p className="font-display text-2xl gold-shimmer-text" style={{ opacity: p }}>{SAMPLE.bappa}</p>
    </div>
  );
}

/* 14. Text Glow */
export function TextGlow({ playing, resetKey }: PreviewProps) {
  const t = useAnimationLoop(2.5, playing, resetKey);
  const glow = (Math.sin(t * Math.PI * 2) + 1) / 2;
  return (
    <div className="flex h-full w-full items-center justify-center bg-forest-950 rounded-xl">
      <p className="font-deva text-xl text-gold-200" style={{ textShadow: `0 0 ${10 + glow * 30}px rgba(228,197,81,${0.4 + glow * 0.6})` }}>{SAMPLE.bappa}</p>
    </div>
  );
}

/* 15. Handwritten Reveal (stroke draw illusion) */
export function TextHandwrittenReveal({ playing, resetKey }: PreviewProps) {
  const p = useProgress(2.2, playing, resetKey);
  return (
    <div className="flex h-full w-full items-center justify-center bg-cream-100 rounded-xl">
      <svg viewBox="0 0 220 60" className="w-3/4 h-auto">
        <motion.text x="110" y="40" textAnchor="middle" fontSize="28" fontFamily="Cormorant Garamond, serif"
          fill="none" stroke="#865715" strokeWidth="1.5"
          initial={{ strokeDasharray: 400, strokeDashoffset: 400 }}
          animate={{ strokeDashoffset: 400 - p * 400 }}>
          {SAMPLE.event}
        </motion.text>
        <motion.text x="110" y="40" textAnchor="middle" fontSize="28" fontFamily="Cormorant Garamond, serif"
          fill="#865715" style={{ opacity: p }}>
          {SAMPLE.event}
        </motion.text>
      </svg>
    </div>
  );
}

function TextShell({ children, opacity, y = 0, x = 0, scale = 1 }: { children: React.ReactNode; opacity: number; y?: number; x?: number; scale?: number }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-forest-900 rounded-xl px-4">
      <motion.p className="font-display text-2xl text-gradient-gold text-center"
        style={{ opacity, y, x, scale }}>{children}</motion.p>
    </div>
  );
}
