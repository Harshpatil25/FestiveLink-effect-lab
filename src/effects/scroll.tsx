import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import type { PreviewProps } from '@/types';
import { SAMPLE, range } from '@/lib/hooks';
import { PHOTOS } from './photos';

/* Demo area: mini invitation scroll */
export function ScrollDemoArea() {
  return (
    <div className="rounded-2xl border border-gold-500/30 bg-forest-950/60 p-4 my-8">
      <p className="text-cream-200 text-sm mb-3">Scroll inside this area to experience scroll effects:</p>
      <div className="h-72 overflow-y-auto rounded-xl bg-gradient-to-b from-forest-900 to-forest-950 no-scrollbar">
        <div className="p-6 space-y-16 pb-40">
          <FadeOnScroll />
          <SlideUpOnScroll />
          <SlideFromLeft />
          <SlideFromRight />
          <ScaleOnScroll />
          <BlurToSharpOnScroll />
          <ParallaxImage />
          <StickyStory />
          <TextRevealOnScroll />
          <TimelineReveal />
        </div>
      </div>
    </div>
  );
}

function useScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  return { ref, scrollYProgress };
}

function FadeOnScroll() {
  const { ref, scrollYProgress } = useScrollProgress();
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  return <motion.div ref={ref} style={{ opacity }} className="text-center"><SectionText>{SAMPLE.bappa}</SectionText></motion.div>;
}

function SlideUpOnScroll() {
  const { ref, scrollYProgress } = useScrollProgress();
  const y = useTransform(scrollYProgress, [0, 0.5], [60, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  return <motion.div ref={ref} style={{ y, opacity }} className="text-center"><SectionText>{SAMPLE.event}</SectionText></motion.div>;
}

function SlideFromLeft() {
  const { ref, scrollYProgress } = useScrollProgress();
  const x = useTransform(scrollYProgress, [0, 0.5], [-100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  return <motion.div ref={ref} style={{ x, opacity }} className="text-center"><SectionText>{SAMPLE.family}</SectionText></motion.div>;
}

function SlideFromRight() {
  const { ref, scrollYProgress } = useScrollProgress();
  const x = useTransform(scrollYProgress, [0, 0.5], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  return <motion.div ref={ref} style={{ x, opacity }} className="text-center"><SectionText>{SAMPLE.date}</SectionText></motion.div>;
}

function ScaleOnScroll() {
  const { ref, scrollYProgress } = useScrollProgress();
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.5, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  return <motion.div ref={ref} style={{ scale, opacity }} className="text-center"><SectionText>{SAMPLE.venue}</SectionText></motion.div>;
}

function BlurToSharpOnScroll() {
  const { ref, scrollYProgress } = useScrollProgress();
  const blur = useTransform(scrollYProgress, [0, 0.5], [12, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);
  return <motion.div ref={ref} style={{ filter, opacity }} className="text-center"><SectionText>{SAMPLE.time}</SectionText></motion.div>;
}

function ParallaxImage() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  return (
    <div ref={ref} className="relative h-40 overflow-hidden rounded-xl">
      <motion.img src={PHOTOS.ganesh2} style={{ y }} className="w-full h-56 object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 to-transparent" />
      <p className="absolute bottom-2 left-3 text-cream-100 font-display text-lg">{SAMPLE.bappa}</p>
    </div>
  );
}

function StickyStory() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start center', 'end center'] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  return (
    <div ref={ref} className="h-60 flex items-center justify-center sticky top-0">
      <motion.div style={{ scale }} className="text-center">
        <img src={PHOTOS.ganesh5} className="w-32 h-32 object-cover rounded-full mx-auto mb-3 ring-4 ring-gold-400/40" />
        <SectionText>{SAMPLE.bappa}</SectionText>
      </motion.div>
    </div>
  );
}

function TextRevealOnScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'start 0.4'] });
  return (
    <div ref={ref} className="text-center">
      <p className="font-display text-2xl text-gradient-gold overflow-hidden">
        {SAMPLE.event.split('').map((c, i) => (
          <motion.span key={i} className="inline-block"
            style={{ opacity: useTransform(scrollYProgress, [i / SAMPLE.event.length, (i + 1) / SAMPLE.event.length], [0, 1]) }}>
            {c === ' ' ? '\u00A0' : c}
          </motion.span>
        ))}
      </p>
    </div>
  );
}

function TimelineReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'end 0.5'] });
  const h = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  return (
    <div ref={ref} className="relative pl-6">
      <div className="absolute left-2 top-0 bottom-0 w-px bg-cream-200/20" />
      <motion.div className="absolute left-2 top-0 w-px bg-gold-400" style={{ height: h }} />
      {['Welcome', 'Pooja', 'Aarti', 'Blessings'].map((t, i) => (
        <motion.div key={i} className="mb-3"
          initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false }}>
          <div className="absolute -left-1 w-2.5 h-2.5 rounded-full bg-gold-400 ring-2 ring-forest-950" style={{ marginTop: i * 0 }} />
          <p className="text-cream-200 text-sm font-display">{t}</p>
        </motion.div>
      ))}
    </div>
  );
}

/* Card previews (mini representations) */
export function ScrollFadeCard({ playing, resetKey }: PreviewProps) {
  return <MiniScrollDemo effect="fade" playing={playing} resetKey={resetKey} />;
}
export function ScrollSlideUpCard({ playing, resetKey }: PreviewProps) {
  return <MiniScrollDemo effect="slideUp" playing={playing} resetKey={resetKey} />;
}
export function ScrollSlideLeftCard({ playing, resetKey }: PreviewProps) {
  return <MiniScrollDemo effect="slideLeft" playing={playing} resetKey={resetKey} />;
}
export function ScrollSlideRightCard({ playing, resetKey }: PreviewProps) {
  return <MiniScrollDemo effect="slideRight" playing={playing} resetKey={resetKey} />;
}
export function ScrollScaleCard({ playing, resetKey }: PreviewProps) {
  return <MiniScrollDemo effect="scale" playing={playing} resetKey={resetKey} />;
}
export function ScrollBlurCard({ playing, resetKey }: PreviewProps) {
  return <MiniScrollDemo effect="blur" playing={playing} resetKey={resetKey} />;
}
export function ScrollParallaxCard({ playing, resetKey }: PreviewProps) {
  return <MiniScrollDemo effect="parallax" playing={playing} resetKey={resetKey} />;
}
export function ScrollParallaxBgCard({ playing, resetKey }: PreviewProps) {
  return <MiniScrollDemo effect="parallaxBg" playing={playing} resetKey={resetKey} />;
}
export function ScrollStickyCard({ playing, resetKey }: PreviewProps) {
  return <MiniScrollDemo effect="sticky" playing={playing} resetKey={resetKey} />;
}
export function ScrollHorizontalCard({ playing, resetKey }: PreviewProps) {
  return <MiniScrollDemo effect="horizontal" playing={playing} resetKey={resetKey} />;
}
export function ScrollImageZoomCard({ playing, resetKey }: PreviewProps) {
  return <MiniScrollDemo effect="imgZoom" playing={playing} resetKey={resetKey} />;
}
export function ScrollTextRevealCard({ playing, resetKey }: PreviewProps) {
  return <MiniScrollDemo effect="textReveal" playing={playing} resetKey={resetKey} />;
}
export function ScrollTimelineCard({ playing, resetKey }: PreviewProps) {
  return <MiniScrollDemo effect="timeline" playing={playing} resetKey={resetKey} />;
}
export function ScrollColorCard({ playing, resetKey }: PreviewProps) {
  return <MiniScrollDemo effect="color" playing={playing} resetKey={resetKey} />;
}
export function ScrollProgressCard({ playing, resetKey }: PreviewProps) {
  const [p, setP] = useState(0);
  useEffect(() => {
    if (!playing) return;
    let raf: number; const start = performance.now();
    const tick = (now: number) => { setP(((now - start) / 1000) % 2 / 2); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick); return () => cancelAnimationFrame(raf);
  }, [playing, resetKey]);
  return (
    <div className="relative h-full w-full rounded-xl bg-forest-950 flex items-center justify-center">
      <div className="absolute top-0 left-0 right-0 h-1 bg-cream-200/20">
        <motion.div className="h-full bg-gold-400" animate={{ width: `${p * 100}%` }} />
      </div>
      <p className="text-cream-200 text-xs">Scroll Progress</p>
    </div>
  );
}

function MiniScrollDemo({ effect, playing, resetKey }: { effect: string; playing: boolean; resetKey: number }) {
  const [p, setP] = useState(0);
  useEffect(() => {
    if (!playing) return;
    let raf: number; const start = performance.now();
    const tick = (now: number) => { setP(((now - start) / 2500) % 1); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick); return () => cancelAnimationFrame(raf);
  }, [playing, resetKey]);
  const stage = Math.sin(p * Math.PI);
  const renderItem = () => {
    const base = <p className="font-display text-base text-gradient-gold">{SAMPLE.event}</p>;
    switch (effect) {
      case 'fade': return <motion.div animate={{ opacity: stage }}>{base}</motion.div>;
      case 'slideUp': return <motion.div animate={{ y: (1 - stage) * 30, opacity: stage }}>{base}</motion.div>;
      case 'slideLeft': return <motion.div animate={{ x: (1 - stage) * -50, opacity: stage }}>{base}</motion.div>;
      case 'slideRight': return <motion.div animate={{ x: (1 - stage) * 50, opacity: stage }}>{base}</motion.div>;
      case 'scale': return <motion.div animate={{ scale: 0.5 + stage * 0.5, opacity: stage }}>{base}</motion.div>;
      case 'blur': return <motion.div style={{ filter: `blur(${(1 - stage) * 10}px)`, opacity: stage }}>{base}</motion.div>;
      case 'parallax': return (
        <div className="relative w-full h-full overflow-hidden rounded">
          <motion.img src={PHOTOS.ganesh2} className="w-full h-full object-cover" animate={{ y: (p - 0.5) * 30 }} />
        </div>);
      case 'parallaxBg': return (
        <div className="relative w-full h-full overflow-hidden rounded">
          <motion.div className="absolute inset-0 bg-gradient-to-b from-maroon-700 to-gold-500" animate={{ y: (p - 0.5) * 40 }} style={{ height: '120%' }} />
          <div className="relative z-10 flex items-center justify-center h-full">{base}</div>
        </div>);
      case 'sticky': return <motion.div animate={{ scale: 0.7 + stage * 0.3 }} className="text-center"><img src={PHOTOS.ganesh5} className="w-16 h-16 rounded-full object-cover mx-auto mb-1" />{base}</motion.div>;
      case 'horizontal': return (
        <div className="flex gap-2 w-full overflow-hidden">
          {range(3).map((i) => <motion.img key={i} src={PHOTOS.ganesh1} className="w-20 h-full object-cover rounded" animate={{ x: -p * 100 }} />)}
        </div>);
      case 'imgZoom': return <motion.img src={PHOTOS.ganesh3} className="w-full h-full object-cover rounded" animate={{ scale: 1 + stage * 0.4 }} />;
      case 'textReveal': return (
        <p className="font-display text-base text-gradient-gold flex">
          {SAMPLE.event.split('').map((c, i) => <span key={i} style={{ opacity: Math.min(1, Math.max(0, stage * SAMPLE.event.length - i)) }} className="inline-block">{c === ' ' ? '\u00A0' : c}</span>)}
        </p>);
      case 'timeline': return (
        <div className="relative pl-4">
          <div className="absolute left-1 top-0 bottom-0 w-px bg-cream-200/20" />
          <motion.div className="absolute left-1 top-0 w-px bg-gold-400" animate={{ height: `${stage * 100}%` }} />
          {['Welcome', 'Pooja', 'Aarti'].map((t, i) => <p key={i} className="text-cream-200 text-[10px] my-1">{t}</p>)}
        </div>);
      case 'color': return (
        <motion.div className="w-full h-full rounded flex items-center justify-center"
          animate={{ backgroundColor: `rgb(${Math.round(20 + stage * 100)}, ${Math.round(30 + stage * 50)}, ${Math.round(40 - stage * 20)})` }}>
          {base}
        </motion.div>);
      default: return base;
    }
  };
  return (
    <div className="relative h-full w-full rounded-xl bg-gradient-to-b from-forest-900 to-forest-950 flex items-center justify-center p-2 overflow-hidden">
      {renderItem()}
      <span className="absolute bottom-1 right-2 text-[8px] text-cream-200/40">scroll sim</span>
    </div>
  );
}

function SectionText({ children }: { children: React.ReactNode }) {
  return <p className="font-display text-2xl text-gradient-gold">{children}</p>;
}
