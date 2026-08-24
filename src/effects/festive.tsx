import { motion } from 'framer-motion';
import type { PreviewProps } from '@/types';
import { useAnimationLoop, range } from '@/lib/hooks';

/* 1. Falling Marigold Petals */
export function FestiveMarigoldPetals({ playing, resetKey, controls }: PreviewProps) {
  const count = Math.round((controls?.count ?? 1) * 12);
  return (
    <Shell>
      {range(count).map((i) => (
        <motion.div key={i} className="absolute w-2 h-2 rounded-full bg-saffron-400"
          style={{ left: `${(i * 13) % 100}%` }}
          animate={playing ? { y: ['0%', '120%'], rotate: [0, 360], opacity: [0, 1, 0] } : {}}
          transition={{ duration: 4 + (i % 3), repeat: Infinity, delay: i * 0.3, ease: 'linear' }} />
      ))}
    </Shell>
  );
}

/* 2. Floating Diyas */
export function FestiveFloatingDiyas({ playing, resetKey }: PreviewProps) {
  return (
    <Shell>
      {range(5).map((i) => (
        <motion.div key={i} className="absolute text-xl" style={{ left: `${15 + i * 18}%`, top: `${20 + (i % 2) * 40}%` }}
          animate={playing ? { y: [0, -15, 0], rotate: [0, 5, 0] } : {}}
          transition={{ duration: 3 + i, repeat: Infinity }}>
          🪔
        </motion.div>
      ))}
    </Shell>
  );
}

/* 3. Diya Glow */
export function FestiveDiyaGlow({ playing, resetKey }: PreviewProps) {
  const t = useAnimationLoop(2.5, playing, resetKey);
  const glow = (Math.sin(t * Math.PI * 2) + 1) / 2;
  return (
    <Shell>
      <motion.div className="absolute rounded-full bg-saffron-400/40 blur-2xl" style={{ width: 120, height: 120 }}
        animate={{ scale: 0.8 + glow * 0.4, opacity: 0.4 + glow * 0.5 }} />
      <div className="text-3xl">🪔</div>
    </Shell>
  );
}

/* 4. Golden Particles */
export function FestiveGoldenParticles({ playing, resetKey, controls }: PreviewProps) {
  const count = Math.round((controls?.count ?? 1) * 15);
  return (
    <Shell>
      {range(count).map((i) => (
        <motion.div key={i} className="absolute w-1 h-1 rounded-full bg-gold-300" style={{ left: `${(i * 7) % 100}%`, top: `${(i * 11) % 100}%` }}
          animate={playing ? { y: [-10, -40], opacity: [0, 1, 0] } : {}}
          transition={{ duration: 2 + (i % 3), repeat: Infinity, delay: i * 0.2 }} />
      ))}
    </Shell>
  );
}

/* 5. Rangoli Drawing */
export function FestiveRangoliDraw({ playing, resetKey }: PreviewProps) {
  const t = useAnimationLoop(5, playing, resetKey);
  const p = t / 5;
  return (
    <Shell>
      <div className="relative w-32 h-32">
        {range(4).map((i) => (
          <motion.div key={i} className="absolute inset-0 rounded-full border-2" style={{ borderColor: ['#e4c551', '#c03736', '#f97316', '#3c7457'][i], margin: i * 10 }}
            animate={{ rotate: p * 360, scale: 0.5 + (i + 1) * 0.15 }} />
        ))}
        {range(8).map((i) => {
          const ang = (i / 8) * Math.PI * 2 + p * Math.PI * 2;
          return <div key={`d${i}`} className="absolute w-2 h-2 rounded-full bg-gold-400" style={{ left: '50%', top: '50%', transform: `translate(${Math.cos(ang) * 40}px, ${Math.sin(ang) * 40}px)` }} />;
        })}
      </div>
    </Shell>
  );
}

/* 6. Flower Shower */
export function FestiveFlowerShower({ playing, resetKey }: PreviewProps) {
  const colors = ['#f97316', '#c03736', '#e4c551', '#3c7457'];
  return (
    <Shell>
      {range(14).map((i) => (
        <motion.div key={i} className="absolute w-2 h-2 rounded-full" style={{ background: colors[i % 4], left: `${(i * 7) % 100}%` }}
          animate={playing ? { y: ['-5%', '110%'], rotate: [0, 180], opacity: [0, 1, 1, 0] } : {}}
          transition={{ duration: 3 + (i % 2), repeat: Infinity, delay: i * 0.15, ease: 'linear' }} />
      ))}
    </Shell>
  );
}

/* 7. Sparkle Trail */
export function FestiveSparkleTrail({ playing, resetKey }: PreviewProps) {
  const t = useAnimationLoop(2, playing, resetKey);
  return (
    <Shell>
      {range(10).map((i) => {
        const x = (i / 10) * 200 - 100;
        return (
          <motion.div key={i} className="absolute w-1.5 h-1.5 bg-gold-200 rounded-full" style={{ left: '50%', top: '50%' }}
            animate={{ x, y: Math.sin(t * Math.PI * 2 + i) * 30, opacity: [0, 1, 0], scale: [0, 1, 0] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }} />
        );
      })}
      <div className="text-xl">✨</div>
    </Shell>
  );
}

/* 8. Firefly Particles */
export function FestiveFirefly({ playing, resetKey }: PreviewProps) {
  return (
    <Shell>
      {range(12).map((i) => (
        <motion.div key={i} className="absolute w-1 h-1 rounded-full bg-saffron-300" style={{ left: `${(i * 11) % 100}%`, top: `${(i * 17) % 100}%` }}
          animate={playing ? { opacity: [0, 1, 0], scale: [0, 1.5, 0], x: [0, 20, 0], y: [0, -15, 0] } : {}}
          transition={{ duration: 2 + (i % 3), repeat: Infinity, delay: i * 0.2 }} />
      ))}
    </Shell>
  );
}

/* 9. Floating Leaves */
export function FestiveFloatingLeaves({ playing, resetKey }: PreviewProps) {
  return (
    <Shell>
      {range(8).map((i) => (
        <motion.div key={i} className="absolute text-sm" style={{ left: `${(i * 13) % 100}%`, top: `${(i * 19) % 100}%` }}
          animate={playing ? { y: [0, -20, 0], rotate: [0, 30, 0], x: [0, 10, 0] } : {}}
          transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.2 }}>🍃</motion.div>
      ))}
    </Shell>
  );
}

/* 10. Golden Dust */
export function FestiveGoldenDust({ playing, resetKey }: PreviewProps) {
  return (
    <Shell>
      {range(20).map((i) => (
        <motion.div key={i} className="absolute w-0.5 h-0.5 rounded-full bg-gold-200" style={{ left: `${(i * 5) % 100}%`, top: `${(i * 9) % 100}%` }}
          animate={playing ? { y: [-5, -25], opacity: [0, 0.8, 0] } : {}}
          transition={{ duration: 3 + (i % 4), repeat: Infinity, delay: i * 0.1 }} />
      ))}
    </Shell>
  );
}

/* 11. Celebration Confetti */
export function FestiveConfetti({ playing, resetKey }: PreviewProps) {
  const colors = ['#e4c551', '#f97316', '#c03736', '#3c7457', '#fffef8'];
  return (
    <Shell>
      {range(18).map((i) => (
        <motion.div key={i} className="absolute w-1.5 h-2" style={{ background: colors[i % 5], left: `${(i * 5) % 100}%` }}
          animate={playing ? { y: ['-5%', '110%'], rotate: [0, 720], opacity: [0, 1, 0] } : {}}
          transition={{ duration: 2.5 + (i % 2), repeat: Infinity, delay: i * 0.08, ease: 'linear' }} />
      ))}
    </Shell>
  );
}

/* 12. Temple Bell Ripple */
export function FestiveBellRipple({ playing, resetKey }: PreviewProps) {
  const t = useAnimationLoop(2, playing, resetKey);
  return (
    <Shell>
      {[0, 0.33, 0.66].map((off, i) => {
        const lp = (t + off) % 1;
        return <motion.div key={i} className="absolute rounded-full border-2 border-gold-400" style={{ width: 30, height: 30 }}
          animate={{ scale: lp * 8, opacity: 1 - lp }} />;
      })}
      <div className="text-2xl">🔔</div>
    </Shell>
  );
}

/* 13. Festive Light Rays */
export function FestiveLightRays({ playing, resetKey }: PreviewProps) {
  const t = useAnimationLoop(6, playing, resetKey);
  return (
    <Shell>
      {range(8).map((i) => {
        const ang = (i / 8) * 360 + t * 30;
        return (
          <motion.div key={i} className="absolute origin-bottom" style={{ left: '50%', bottom: '50%', width: 2, height: 200, background: 'linear-gradient(to top, rgba(228,197,81,0.5), transparent)', transform: `rotate(${ang}deg)` }} />
        );
      })}
      <div className="text-2xl">🕉️</div>
    </Shell>
  );
}

/* 14. Glowing Border */
export function FestiveGlowBorder({ playing, resetKey }: PreviewProps) {
  const t = useAnimationLoop(3, playing, resetKey);
  return (
    <div className="flex h-full w-full items-center justify-center rounded-xl bg-forest-950">
      <motion.div className="w-32 h-24 rounded-lg border-2 border-gold-400 flex items-center justify-center p-2"
        animate={{ boxShadow: `0 0 ${15 + Math.sin(t * Math.PI * 2) * 20}px rgba(228,197,81,0.7)` }}>
        <p className="font-deva text-gold-300 text-xs text-center">गणपति बप्पा मोरया</p>
      </motion.div>
    </div>
  );
}

/* 15. Divine Aura */
export function FestiveDivineAura({ playing, resetKey }: PreviewProps) {
  const t = useAnimationLoop(3, playing, resetKey);
  return (
    <Shell>
      <motion.div className="absolute rounded-full bg-saffron-400/20 blur-3xl" style={{ width: 160, height: 160 }}
        animate={{ scale: 1 + Math.sin(t * Math.PI * 2) * 0.15, opacity: 0.5 + Math.sin(t * Math.PI * 2) * 0.2 }} />
      <motion.div className="absolute rounded-full bg-gold-400/20 blur-2xl" style={{ width: 100, height: 100 }}
        animate={{ scale: 1 + Math.cos(t * Math.PI * 2) * 0.2 }} />
      <div className="text-3xl relative z-10">🕉️</div>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return <div className="relative h-full w-full overflow-hidden rounded-xl bg-forest-950 flex items-center justify-center">{children}</div>;
}
