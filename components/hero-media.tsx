'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export function HeroMedia({ videoSrc, posterSrc, alt }: { videoSrc: string; posterSrc: string; alt: string }) {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const wideEnough = window.matchMedia('(min-width: 768px)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const saveData = (navigator as unknown as { connection?: { saveData?: boolean } }).connection?.saveData;
    if (wideEnough && !reducedMotion && !saveData) setShowVideo(true);
  }, []);

  return (
    <>
      <Image className="market-hero-image" src={posterSrc} alt={alt} fill priority sizes="100vw" />
      {showVideo && (
        <video className="market-hero-image hero-video" autoPlay muted loop playsInline preload="auto" poster={posterSrc} aria-hidden="true">
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}
    </>
  );
}
