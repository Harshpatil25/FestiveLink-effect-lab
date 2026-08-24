import { motion } from 'framer-motion';
import type { PreviewProps } from '@/types';
import { useAnimationLoop, range } from '@/lib/hooks';

/* 1. Animated Gradient */
export function BgAnimatedGradient({ playing, resetKey }: PreviewProps) {
  const t = useAnimationLoop(8, playing, resetKey);
  const h1 = (t * 45) % 360;
  const h2 = (t * 45 + 60) % 360;
  return (
    <Shell>
      <div className="absolute inset-0" style={{ background: `linear-gradient(120deg, hsl(${h1},40%,20%), hsl(${h2},40%,15%))` }} />
      <Label>Animated Gradient</Label>
    </Shell>
  );
}

/* 2. Golden Particle Background */
export function BgGoldenParticles({ playing, resetKey }: PreviewProps) {
  return (
    <Shell>
      {range(25).map((i) => (
        <motion.div key={i} className="absolute w-1 h-1 rounded-full bg-gold-300" style={{ left: `${(i * 4) % 100}%`, top: `${(i * 7) % 100}%` }}
          animate={playing ? { y: [-10, -40], opacity: [0, 1, 0] } : {}} transition={{ duration: 3 + (i % 4), repeat: Infinity, delay: i * 0.1 }} />
      ))}
      <Label>Golden Particles</Label>
    </Shell>
  );
}

/* 3. Floating Petals (background) */
export function BgFloatingPetals({ playing, resetKey }: PreviewProps) {
  return (
    <Shell>
      {range(12).map((i) => (
        <motion.div key={i} className="absolute w-2 h-2 rounded-full bg-saffron-400" style={{ left: `${(i * 8) % 100}%` }}
          animate={playing ? { y: ['-5%', '110%'], rotate: [0, 360], opacity: [0, 1, 0] } : {}} transition={{ duration: 5 + (i % 3), repeat: Infinity, delay: i * 0.4, ease: 'linear' }} />
      ))}
      <Label>Floating Petals</Label>
    </Shell>
  );
}

/* 4. Star Field */
export function BgStarField({ playing, resetKey }: PreviewProps) {
  return (
    <Shell>
      {range(40).map((i) => (
        <motion.div key={i} className="absolute w-0.5 h-0.5 rounded-full bg-cream-100" style={{ left: `${(i * 7) % 100}%`, top: `${(i * 13) % 100}%` }}
          animate={playing ? { opacity: [0.2, 1, 0.2], scale: [1, 1.5, 1] } : {}} transition={{ duration: 2 + (i % 3), repeat: Infinity, delay: i * 0.05 }} />
      ))}
      <Label>Star Field</Label>
    </Shell>
  );
}

/* 5. Soft Glow */
export function BgSoftGlow({ playing, resetKey }: PreviewProps) {
  const t = useAnimationLoop(4, playing, resetKey);
  return (
    <Shell>
      <motion.div className="absolute rounded-full bg-saffron-400/20 blur-3xl" style={{ width: 200, height: 200 }}
        animate={{ x: Math.sin(t * Math.PI / 2) * 40, y: Math.cos(t * Math.PI / 2) * 30, opacity: 0.5 + Math.sin(t * Math.PI) * 0.2 }} />
      <Label>Soft Glow</Label>
    </Shell>
  );
}

/* 6. Moving Light Rays */
export function BgLightRays({ playing, resetKey }: PreviewProps) {
  const t = useAnimationLoop(5, playing, resetKey);
  return (
    <Shell>
      {range(5).map((i) => (
        <motion.div key={i} className="absolute top-0 bottom-0 w-12 opacity-30"
          style={{ background: 'linear-gradient(to bottom, rgba(228,197,81,0.4), transparent)', left: `${10 + i * 20}%`, transform: `rotate(${Math.sin(t + i) * 8}deg)` }} />
      ))}
      <Label>Light Rays</Label>
    </Shell>
  );
}

/* 7. Grain Texture */
export function BgGrain({ playing, resetKey }: PreviewProps) {
  return (
    <Shell>
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)', backgroundSize: '3px 3px' }} />
      <Label>Grain</Label>
    </Shell>
  );
}

/* 8. Animated Rangoli */
export function BgRangoli({ playing, resetKey }: PreviewProps) {
  const t = useAnimationLoop(10, playing, resetKey);
  return (
    <Shell>
      <div className="relative w-48 h-48 opacity-30">
        {range(6).map((i) => (
          <motion.div key={i} className="absolute inset-0 rounded-full border" style={{ borderColor: ['#e4c551', '#c03736', '#f97316'][i % 3], margin: i * 8 }}
            animate={{ rotate: t * 360 + i * 30 }} />
        ))}
      </div>
      <Label>Rangoli</Label>
    </Shell>
  );
}

/* 9. Aurora Glow */
export function BgAurora({ playing, resetKey }: PreviewProps) {
  const t = useAnimationLoop(6, playing, resetKey);
  return (
    <Shell>
      <motion.div className="absolute rounded-full bg-gold-400/30 blur-3xl" style={{ width: 200, height: 100 }}
        animate={{ x: Math.sin(t * Math.PI) * 60, skewX: Math.sin(t * Math.PI) * 20 }} />
      <motion.div className="absolute rounded-full bg-maroon-500/30 blur-3xl" style={{ width: 180, height: 90 }}
        animate={{ x: -Math.sin(t * Math.PI) * 50, y: Math.cos(t * Math.PI) * 20 }} />
      <Label>Aurora</Label>
    </Shell>
  );
}

/* 10. Bokeh Particles */
export function BgBokeh({ playing, resetKey }: PreviewProps) {
  return (
    <Shell>
      {range(8).map((i) => (
        <motion.div key={i} className="absolute rounded-full bg-gold-300/20 blur-md" style={{ width: 20 + (i % 3) * 15, height: 20 + (i % 3) * 15, left: `${(i * 12) % 100}%`, top: `${(i * 16) % 100}%` }}
          animate={playing ? { y: [-10, -30], opacity: [0.3, 0.7, 0.3] } : {}} transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.3 }} />
      ))}
      <Label>Bokeh</Label>
    </Shell>
  );
}

/* 11. Floating Diyas (bg) */
export function BgFloatingDiyas({ playing, resetKey }: PreviewProps) {
  return (
    <Shell>
      {range(4).map((i) => (
        <motion.div key={i} className="absolute text-lg" style={{ left: `${15 + i * 22}%`, top: `${25 + (i % 2) * 35}%` }}
          animate={playing ? { y: [0, -12, 0], opacity: [0.6, 1, 0.6] } : {}} transition={{ duration: 3 + i, repeat: Infinity }}>🪔</motion.div>
      ))}
      <Label>Floating Diyas</Label>
    </Shell>
  );
}

/* 12. Slow Parallax Background */
export function BgParallax({ playing, resetKey }: PreviewProps) {
  const t = useAnimationLoop(8, playing, resetKey);
  return (
    <Shell>
      <motion.div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 30% 40%, rgba(228,197,81,0.2), transparent 60%)' }} animate={{ x: Math.sin(t * Math.PI / 4) * 20 }} />
      <motion.div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 70% 60%, rgba(192,55,54,0.15), transparent 60%)' }} animate={{ x: -Math.sin(t * Math.PI / 4) * 20 }} />
      <Label>Parallax BG</Label>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return <div className="relative h-full w-full overflow-hidden rounded-xl bg-forest-950 flex items-center justify-center">{children}</div>;
}
function Label({ children }: { children: React.ReactNode }) {
  return <span className="relative z-10 text-cream-200/60 text-[10px] font-display">{children}</span>;
}
