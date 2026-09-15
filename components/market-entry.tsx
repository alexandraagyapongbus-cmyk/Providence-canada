'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';

const destinations = [
  {
    market: 'canada' as const,
    country: 'Canada',
    flag: '🇨🇦',
    title: 'Providence Canada',
    description: 'Telecom sales, connectivity and practical business solutions.',
  },
  {
    market: 'ghana' as const,
    country: 'Ghana',
    flag: '🇬🇭',
    title: 'Providence Ghana',
    description: 'TV services, professional setup and dependable customer support.',
  },
];

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
      <section className="entry-content" aria-labelledby="market-entry-heading">
        <div className="wordmark entry-wordmark"><span className="wordmark-mark">P</span><span>Providence</span></div>
        <p className="kicker">One Providence · Two markets</p>
        <h1 id="market-entry-heading">Choose your Providence</h1>
        <p className="entry-supporting-copy">Select the country you’re in—or the market you’d like to explore. You can switch between Canada and Ghana at any time.</p>
        <div className="market-choices" aria-label="Choose a Providence market">
          {destinations.map((destination) => (
            <Link
              key={destination.market}
              href={`/${destination.market}`}
              className={`market-destination market-destination-${destination.market}`}
              aria-label={`Enter Providence ${destination.country}`}
              onClick={() => remember(destination.market)}
            >
              <span className="market-card-country">
                <span className="market-card-flag" aria-hidden="true">{destination.flag}</span>
                <span>{destination.country}</span>
              </span>
              <strong className="market-card-title">{destination.title}</strong>
              <p>{destination.description}</p>
              <span className="market-card-cta">Enter {destination.country}<ArrowRight aria-hidden="true" /></span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
