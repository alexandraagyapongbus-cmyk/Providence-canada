'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { useEffect } from 'react';
import { marketUrl } from '@/lib/content';

const destinations = [
  {
    market: 'canada' as const,
    country: 'Canada',
    flag: '🇨🇦',
    title: 'Providence Canada',
    description: 'Healthcare staffing and recruitment, with telecom sales and marketing services.',
  },
  {
    market: 'ghana' as const,
    country: 'Ghana',
    flag: '🇬🇭',
    title: 'Providence Ghana',
    description: 'TV box services, professional setup and dependable customer support.',
  },
];

export function MarketEntry() {
  const router = useRouter();

  useEffect(() => {
    const hostname = window.location.hostname.replace(/^www\./, '').toLowerCase();
    if (hostname === 'providencecanada.ca') router.replace('/canada');
    if (hostname === 'providencecanadaltd.com') router.replace('/ghana');
  }, [router]);

  function remember(market: 'canada' | 'ghana') {
    try {
      window.localStorage.setItem('providence-market', market);
    } catch {
      // Navigation must still work when browser storage is unavailable.
    }
    try {
      document.cookie = `providence-market=${market};path=/;max-age=31536000;samesite=lax`;
    } catch {
      // The market shell will retain the active market in the URL.
    }
  }

  return (
    <main className="entry-page">
      <Image src="/providence-hero.png" alt="Providence serving Canada and Ghana" fill priority sizes="100vw" className="entry-image" />
      <div className="entry-overlay" />
      <section className="entry-content" aria-labelledby="market-entry-heading">
        <div className="wordmark entry-wordmark"><span className="wordmark-logo"><Image src="/providence-logo-mark.png" alt="" width={512} height={320} priority /></span><span>Providence</span></div>
        <p className="kicker">One Providence · Two markets</p>
        <h1 id="market-entry-heading">Choose your Providence</h1>
        <p className="entry-supporting-copy">Select the country you’re in—or the market you’d like to explore. You can switch between Canada and Ghana at any time.</p>
        <div className="market-choices" aria-label="Choose a Providence market">
          {destinations.map((destination) => (
            <a
              key={destination.market}
              href={marketUrl(destination.market)}
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
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
