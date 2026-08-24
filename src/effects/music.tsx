import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import type { PreviewProps } from '@/types';
import { useAnimationLoop, range, SAMPLE } from '@/lib/hooks';

/* 1. Music Play Button */
export function MusicPlayBtn({ playing, resetKey }: PreviewProps) {
  const [on, setOn] = useState(false);
  return (
    <Shell>
      <button onClick={() => setOn((v) => !v)} className="w-12 h-12 rounded-full bg-gold-500 text-forest-950 flex items-center justify-center text-lg">
        {on ? '⏸' : '▶'}
      </button>
      <span className="absolute bottom-2 text-cream-200/50 text-[9px]">{on ? 'Playing' : 'Paused'}</span>
    </Shell>
  );
}

/* 2. Music Pause */
export function MusicPause({ playing, resetKey }: PreviewProps) {
  const [on, setOn] = useState(true);
  return (
    <Shell>
      <button onClick={() => setOn((v) => !v)} className="w-12 h-12 rounded-full bg-maroon-600 text-cream-100 flex items-center justify-center">
        {on ? <><div className="w-1.5 h-4 bg-cream-100 mr-1" /><div className="w-1.5 h-4 bg-cream-100" /></> : '▶'}
      </button>
    </Shell>
  );
}

/* 3. Animated Audio Bars */
export function MusicAudioBars({ playing: live, resetKey, controls }: PreviewProps) {
  const t = useAnimationLoop(0.8, live, resetKey);
  return (
    <Shell>
      <div className="flex items-end gap-1 h-16">
        {range(9).map((i) => {
          const h = 20 + Math.abs(Math.sin(t * Math.PI * 2 + i * 0.5)) * 40;
          return <motion.div key={i} className="w-1.5 rounded-t bg-gold-400" animate={{ height: h }} transition={{ duration: 0.1 }} />;
        })}
      </div>
    </Shell>
  );
}

/* 4. Music Disc Rotation */
export function MusicDisc({ playing: live, resetKey }: PreviewProps) {
  const [on, setOn] = useState(false);
  return (
    <Shell>
      <motion.div className="w-20 h-20 rounded-full bg-forest-700 border-4 border-gold-400 flex items-center justify-center relative"
        animate={{ rotate: on ? 360 : 0 }} transition={{ duration: 3, repeat: on ? Infinity : 0, ease: 'linear' }}
        onClick={() => setOn((v) => !v)}>
        <div className="w-6 h-6 rounded-full bg-gold-500" />
        {range(3).map((i) => <div key={i} className="absolute rounded-full border border-gold-400/30" style={{ width: 40 + i * 12, height: 40 + i * 12 }} />)}
      </motion.div>
      <span className="absolute bottom-2 text-cream-200/50 text-[9px]">{on ? 'Spinning' : 'Tap to spin'}</span>
    </Shell>
  );
}

/* 5. Sound Wave */
export function MusicSoundWave({ playing: live, resetKey }: PreviewProps) {
  const t = useAnimationLoop(1.5, live, resetKey);
  return (
    <Shell>
      <svg viewBox="0 0 120 60" className="w-32 h-16">
        <motion.path d="M0,30 Q15,10 30,30 T60,30 T90,30 T120,30" stroke="#e4c551" strokeWidth="2" fill="none"
          animate={{ d: [`M0,30 Q15,${10 + Math.sin(t * 4) * 15} 30,30 T60,30 T90,30 T120,30`, `M0,30 Q15,${50 + Math.sin(t * 4) * 15} 30,30 T60,30 T90,30 T120,30`] }}
          transition={{ duration: 0.3, repeat: Infinity, repeatType: 'reverse' }} />
      </svg>
    </Shell>
  );
}

/* 6. Floating Music Notes */
export function MusicNotes({ playing: live, resetKey }: PreviewProps) {
  const notes = ['♪', '♫', '♩', '♬'];
  return (
    <Shell>
      {range(6).map((i) => (
        <motion.div key={i} className="absolute text-gold-300 text-sm" style={{ left: `${15 + i * 14}%` }}
          animate={live ? { y: [0, -80], opacity: [0, 1, 0], rotate: [0, 20] } : {}} transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}>
          {notes[i % 4]}
        </motion.div>
      ))}
      <div className="text-2xl">🎵</div>
    </Shell>
  );
}

/* 7. Music Button Glow */
export function MusicGlow({ playing: live, resetKey }: PreviewProps) {
  const t = useAnimationLoop(1.5, live, resetKey);
  return (
    <Shell>
      <motion.button className="w-12 h-12 rounded-full bg-gold-500 text-forest-950 flex items-center justify-center text-lg"
        animate={{ boxShadow: `0 0 ${10 + Math.sin(t * Math.PI * 2) * 25}px rgba(228,197,81,0.8)` }}>
        ♫
      </motion.button>
    </Shell>
  );
}

/* 8. Audio Start After Reveal */
export function MusicAfterReveal({ playing: live, resetKey }: PreviewProps) {
  const [stage, setStage] = useState(0);
  useEffect(() => {
    if (!live) return;
    setStage(0);
    const t1 = setTimeout(() => setStage(1), 1500);
    const t2 = setTimeout(() => setStage(2), 2500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [live, resetKey]);
  return (
    <Shell>
      {stage < 2 && <motion.div className="absolute inset-0 bg-forest-950" animate={{ opacity: stage >= 1 ? 0 : 1 }} />}
      <motion.div className="text-center" animate={{ opacity: stage >= 1 ? 1 : 0 }}>
        <p className="font-deva text-gold-300 text-sm mb-2">{SAMPLE.bappa}</p>
        {stage >= 2 && (
          <motion.div className="flex items-end gap-1 justify-center h-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {range(5).map((i) => <motion.div key={i} className="w-1 bg-gold-400" animate={{ height: [10, 25, 10] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }} />)}
          </motion.div>
        )}
      </motion.div>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return <div className="relative h-full w-full rounded-xl bg-forest-950 flex items-center justify-center overflow-hidden">{children}</div>;
}
