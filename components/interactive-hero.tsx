'use client';

import Image from 'next/image';
import { ArrowUpRight, RadioTower } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { AnimatedWords } from '@/components/animated-words';
import { markets } from '@/lib/content';

type Mode = 'home' | 'business';

type Hotspot = { label: string; text: string; href: string; top: number; left: number };

const MEDIA: Record<Mode, { video: string; poster: string; alt: string }> = {
  home: {
    video: '/providence-canada-home-hero.mp4',
    poster: '/providence-canada-home-hero-poster.jpg',
    alt: 'A family relaxing on a sofa at home, using a laptop and a phone',
  },
  business: {
    video: '/providence-canada-telecom-hero.mp4',
    poster: '/providence-canada-telecom-hero-poster.jpg',
    alt: 'A business team collaborating around a table in a modern office',
  },
};

// Positioned in the hero's open right-hand side, clear of the headline/copy column (which
// occupies roughly the left 56% of the frame) so dots never sit on top of body text.
const HOTSPOTS: Record<Mode, Hotspot[]> = {
  home: [
    { label: 'Home Phone', text: 'Stay connected with a home phone line.', href: '/canada/residential#phone', top: 26, left: 68 },
    { label: 'Home Bundles', text: 'Combine services for a simpler bill.', href: '/canada/residential#bundles', top: 52, left: 81 },
    { label: 'Home Internet', text: 'Fast, reliable internet for your household.', href: '/canada/residential#internet', top: 80, left: 66 },
  ],
  business: [
    { label: 'Business Solutions', text: 'Custom packages built around your operations.', href: '/canada/business', top: 28, left: 74 },
    { label: 'Connectivity', text: 'Network solutions for one location or several.', href: '/canada/business#connectivity', top: 55, left: 83 },
    { label: 'Business Internet', text: 'Internet sized for how your team works.', href: '/canada/business#internet', top: 80, left: 68 },
  ],
};

export function InteractiveHero() {
  const [mode, setMode] = useState<Mode>('home');
  const [showVideo, setShowVideo] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const wideEnough = window.matchMedia('(min-width: 768px)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const saveData = (navigator as unknown as { connection?: { saveData?: boolean } }).connection?.saveData;
    setReducedMotion(reduce);
    if (wideEnough && !reduce && !saveData) setShowVideo(true);
  }, []);

  // The shared .market-hero-image/.market-hero-content entrance animations use
  // animation-fill-mode: both, which permanently pins their own transform/opacity
  // value above any other declaration for that property. Release it once the
  // one-time entrance finishes so scroll/parallax transforms can take over.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    function onAnimationEnd(e: AnimationEvent) {
      const target = e.target as HTMLElement;
      if (target.classList.contains('market-hero-image') || target.classList.contains('market-hero-content')) {
        target.style.animation = 'none';
      }
    }
    stage.addEventListener('animationend', onAnimationEnd);
    return () => stage.removeEventListener('animationend', onAnimationEnd);
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || reducedMotion) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    let raf = 0;
    function onMove(e: PointerEvent) {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = stage!.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        stage!.style.setProperty('--parallax-x', `${(x * -12).toFixed(2)}px`);
        stage!.style.setProperty('--parallax-y', `${(y * -9).toFixed(2)}px`);
      });
    }
    function onLeave() {
      stage!.style.setProperty('--parallax-x', '0px');
      stage!.style.setProperty('--parallax-y', '0px');
    }
    stage.addEventListener('pointermove', onMove);
    stage.addEventListener('pointerleave', onLeave);
    return () => {
      stage.removeEventListener('pointermove', onMove);
      stage.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, [reducedMotion]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const stage = stageRef.current;
    if (!wrap || !stage || reducedMotion) return;
    let raf = 0;
    function onScroll() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = wrap!.getBoundingClientRect();
        // Use the sticky element's own (content-driven) height rather than assuming
        // it always matches the viewport — on short viewports the hero can grow
        // taller than 100svh to fit its content instead of clipping it.
        const total = wrap!.offsetHeight - stage!.offsetHeight;
        const progress = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
        wrap!.style.setProperty('--hero-progress', progress.toFixed(3));
      });
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reducedMotion]);

  const media = MEDIA[mode];
  const content = markets.canada;

  return (
    <div className={`hero-pin-wrap ${reducedMotion ? 'no-pin' : ''}`} ref={wrapRef}>
      <section className="market-hero healthcare-hero interactive-hero" ref={stageRef}>
        <Image className="market-hero-image" src={media.poster} alt={media.alt} fill priority sizes="100vw" />
        {showVideo && (
          <video key={media.video} className="market-hero-image hero-video" autoPlay muted loop playsInline preload="auto" poster={media.poster} aria-hidden="true">
            <source src={media.video} type="video/mp4" />
          </video>
        )}
        <div className="market-hero-overlay" />
        <div className="hero-aurora" aria-hidden="true"><span /><span /></div>

        <div className="hero-hotspots">
          {HOTSPOTS[mode].map((spot) => (
            <a key={spot.label} href={spot.href} className={`hero-hotspot ${spot.left >= 58 ? 'hero-hotspot-flip' : ''}`} style={{ top: `${spot.top}%`, left: `${spot.left}%` }}>
              <span className="hero-hotspot-dot" aria-hidden="true" />
              <span className="hero-hotspot-line" aria-hidden="true" />
              <span className="hero-hotspot-card">
                <strong>{spot.label}</strong>
                <span>{spot.text}</span>
                <span className="hero-hotspot-cta">Explore <ArrowUpRight /></span>
              </span>
            </a>
          ))}
        </div>

        <div className="market-hero-content">
          <div className="hero-mode-toggle" role="group" aria-label="Show services for home or business">
            <button type="button" aria-pressed={mode === 'home'} className={mode === 'home' ? 'is-active' : ''} onClick={() => setMode('home')}>For My Home</button>
            <button type="button" aria-pressed={mode === 'business'} className={mode === 'business' ? 'is-active' : ''} onClick={() => setMode('business')}>For My Business</button>
          </div>
          <p className="kicker"><RadioTower />{content.eyebrow}</p>
          <h1><AnimatedWords text={content.heroTitle} /></h1>
          <p className="hero-tagline">{content.heroTagline}</p>
          <p className="hero-copy">{content.heroCopy}</p>
          <div className="hero-cta-row">
            <a className="button button-primary hero-cta-button" href={mode === 'home' ? '/canada/residential' : '/canada/business'}>
              <span>Get Connected</span>
              <ArrowUpRight aria-hidden="true" />
              <span className="hero-cta-microlabel">{mode === 'home' ? 'For your home' : 'For your business'}</span>
            </a>
            <a className="text-link hero-secondary-link" href={mode === 'home' ? '/canada/business' : '/canada/residential'}>
              {mode === 'home' ? 'Looking for business services?' : 'Looking for home services?'}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
