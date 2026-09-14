'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowUpRight, RadioTower, Tv } from 'lucide-react';

export function MarketEntry() {
  const router = useRouter();

  useEffect(() => {
    const remembered = window.localStorage.getItem('providence-market');
    if (remembered === 'canada' || remembered === 'ghana') router.replace(`/${remembered}`);
  }, [router]);

  function remember(market: 'canada' | 'ghana') {
    window.localStorage.setItem('providence-market', market);
    document.cookie = `providence-market=${market};path=/;max-age=31536000;samesite=lax`;
  }

  return (
    <main className="entry-page">
      <Image src="/providence-hero.png" alt="Providence serving Canada and Ghana" fill priority sizes="100vw" className="entry-image" />
      <div className="entry-overlay" />
      <section className="entry-content">
        <div className="wordmark entry-wordmark"><span className="wordmark-mark">P</span><span>Providence</span></div>
        <p className="kicker">One Providence · Two local experiences</p>
        <h1>Where should we connect you?</h1>
        <p>Choose your market. Providence will remember it as you move through the website.</p>
        <div className="market-choices">
          <Link href="/canada" onClick={() => remember('canada')}>
            <RadioTower />
            <span><small>Providence Canada</small><strong>Telecom sales & growth support</strong></span>
            <ArrowUpRight />
          </Link>
          <Link href="/ghana" onClick={() => remember('ghana')}>
            <Tv />
            <span><small>Providence Ghana</small><strong>TV box sales, setup & support</strong></span>
            <ArrowUpRight />
          </Link>
        </div>
      </section>
    </main>
  );
}
