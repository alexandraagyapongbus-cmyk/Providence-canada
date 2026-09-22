'use client';

import Image from 'next/image';
import { ArrowUpRight, RadioTower } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { AnimatedWords } from '@/components/animated-words';
import { markets } from '@/lib/content';

type Hotspot = { label: string; text: string; href: string; top: number; left: number };

const MEDIA = {
  video: '/providence-canada-home-hero.mp4',
  poster: '/providence-canada-home-hero-poster.jpg',
  alt: 'A family relaxing on a sofa at home, using a laptop and a phone',
};

// Positioned in the hero's open right-hand side, clear of the headline/copy column (which
// occupies roughly the left 56% of the frame) so dots never sit on top of body text.
const HOTSPOTS: Hotspot[] = [
  { label: 'Home Phone', text: 'Stay connected with a home phone line.', href: '/canada/residential#phone', top: 26, left: 68 },
  { label: 'Home Bundles', text: 'Combine services for a simpler bill.', href: '/canada/residential#bundles', top: 52, left: 81 },
  { label: 'Home Internet', text: 'Fast, reliable internet for your household.', href: '/canada/residential#internet', top: 80, left: 66 },
];

export function InteractiveHero() {
  const [showVideo, setShowVideo] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
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

  const content = markets.canada;

  return (
    <div className={`hero-pin-wrap ${reducedMotion ? 'no-pin' : ''}`}>
      <section className="market-hero healthcare-hero interactive-hero" ref={stageRef}>
        <Image className="market-hero-image" src={MEDIA.poster} alt={MEDIA.alt} fill priority sizes="100vw" />
        {showVideo && (
          <video className="market-hero-image hero-video" autoPlay muted loop playsInline preload="auto" poster={MEDIA.poster} aria-hidden="true">
            <source src={MEDIA.video} type="video/mp4" />
          </video>
        )}
        <div className="market-hero-overlay" />
        <div className="hero-aurora" aria-hidden="true"><span /><span /></div>

        <div className="hero-hotspots">
          {HOTSPOTS.map((spot) => (
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
          <p className="kicker"><RadioTower />{content.eyebrow}</p>
          <h1><AnimatedWords text={content.heroTitle} /></h1>
          <p className="hero-tagline">{content.heroTagline}</p>
          <p className="hero-copy">{content.heroCopy}</p>
          <div className="hero-cta-row">
            <a className="button button-primary hero-cta-button" href="/canada/residential">
              <span>Get Connected</span>
              <ArrowUpRight aria-hidden="true" />
              <span className="hero-cta-microlabel">For your home</span>
            </a>
            <a className="text-link hero-secondary-link" href="/canada/business">Looking for business services?</a>
          </div>
        </div>
      </section>
      <div className="hero-signal-horizon" aria-hidden="true">
        <span className="hero-signal-orbit hero-signal-orbit-gold" />
        <span className="hero-signal-orbit hero-signal-orbit-blue" />
        <span className="hero-signal-node" />
      </div>
    </div>
  );
}
