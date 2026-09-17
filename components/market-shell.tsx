'use client';

import { usePathname } from 'next/navigation';
import { ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react';
import { useEffect, useState, type ReactNode } from 'react';
import Image from 'next/image';
import { GHANA_CRM_URL, markets, marketUrl, type MarketName } from '@/lib/content';

const navItems = {
  canada: [
    ['Home', ''],
    ['Healthcare Staffing', '/healthcare-staffing'],
    ['For Organizations', '/care-organizations'],
    ['For Workers', '/healthcare-workers'],
    ['Telecom', '/telecom'],
    ['About', '/about'],
    ['Contact', '/contact'],
  ],
  ghana: [
    ['Home', ''],
    ['TV Services', '/services'],
    ['About', '/about'],
    ['Contact', '/contact'],
  ],
} as const;

const marketDescriptions: Record<MarketName, string> = {
  canada: 'Healthcare Staffing & Telecom',
  ghana: 'TV Services',
};

const marketFlags: Record<MarketName, string> = {
  canada: '🇨🇦',
  ghana: '🇬🇭',
};

export function MarketShell({ market, children }: { market: MarketName; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const otherMarket: MarketName = market === 'canada' ? 'ghana' : 'canada';
  const suffix = pathname.replace(/^\/(canada|ghana)/, '') || '';
  const sharedSuffix = ['/about', '/contact', '/services'].includes(suffix) ? suffix : '';
  const otherPath = marketUrl(otherMarket, sharedSuffix);
  const currentNavItems = navItems[market];

  function rememberMarket(nextMarket: MarketName) {
    try {
      window.localStorage.setItem('providence-market', nextMarket);
    } catch {
      // The selected market remains explicit in the URL.
    }
    try {
      document.cookie = `providence-market=${nextMarket};path=/;max-age=31536000;samesite=lax`;
    } catch {
      // Navigation must still work when cookie access is unavailable.
    }
  }

  useEffect(() => {
    rememberMarket(market);
  }, [market]);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <div className={`site market-${market}`}>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header full-header">
        <a className="wordmark" href={`/${market}`} aria-label={`Providence ${markets[market].name} home`}>
          <span className="wordmark-logo"><Image src="/providence-logo-mark.png" alt="" width={512} height={320} priority /></span><span>Providence</span>
        </a>
        <nav aria-label="Primary navigation" className={`desktop-nav desktop-nav-${market}`}>
          {currentNavItems.map(([label, path]) => {
            const href = `/${market}${path}`;
            const active = pathname === href;
            return <a key={label} href={href} aria-current={active ? 'page' : undefined}>{label}</a>;
          })}
        </nav>
        <div className="header-actions">
          {market === 'ghana' && <a className="crm-link" href={GHANA_CRM_URL} target="_blank" rel="noreferrer">Staff CRM Login <ArrowUpRight /></a>}
          <details className="market-switcher">
            <summary aria-label={`Current market: ${markets[market].name}. Open market switcher.`}>
              <span aria-hidden="true">{marketFlags[market]}</span>
              <b>{markets[market].name}</b>
              <ChevronDown aria-hidden="true" />
            </summary>
            <div className="market-switcher-menu">
              <small>Choose your Providence</small>
              <div className="market-switcher-current"><span aria-hidden="true">{marketFlags[market]}</span><span><b>Providence {markets[market].name}</b><small>{marketDescriptions[market]}</small></span></div>
              <a href={otherPath} onClick={() => rememberMarket(otherMarket)}>
                <span aria-hidden="true">{marketFlags[otherMarket]}</span>
                <span><b>Providence {markets[otherMarket].name}</b><small>{marketDescriptions[otherMarket]}</small></span>
                <ArrowUpRight aria-hidden="true" />
              </a>
            </div>
          </details>
          <button className="menu-toggle" type="button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
        <div className={`mobile-menu ${open ? 'open' : ''}`} aria-hidden={!open}>
          <nav aria-label="Mobile navigation">
            {currentNavItems.map(([label, path]) => <a key={label} href={`/${market}${path}`}>{label}</a>)}
            {market === 'ghana' && <a href={GHANA_CRM_URL} target="_blank" rel="noreferrer">Staff CRM Login <ArrowUpRight /></a>}
          </nav>
          <a className="mobile-market-switch" href={otherPath} onClick={() => rememberMarket(otherMarket)}>
            <span aria-hidden="true">{marketFlags[market]}</span>
            <span>Providence {markets[market].name} · {marketDescriptions[market]}</span>
            <b>Switch to {marketFlags[otherMarket]} {markets[otherMarket].name} <ArrowUpRight aria-hidden="true" /></b>
          </a>
        </div>
      </header>
      <main id="main-content">{children}</main>
      <footer className="site-footer">
        <div className="footer-brand">
          <a className="wordmark" href={`/${market}`}><span className="wordmark-logo footer-wordmark-logo"><Image src="/providence-logo-mark.png" alt="" width={512} height={320} /></span><span>Providence</span></a>
          <p>Helpful service. Dependable communication. Practical technology.</p>
        </div>
        <div className="footer-links">
          <div><strong>{markets[market].shortLabel}</strong>{currentNavItems.map(([label, path]) => <a key={label} href={`/${market}${path}`}>{label}</a>)}</div>
          <div><strong>Other market</strong><a href={marketUrl(otherMarket)}>Providence {markets[otherMarket].name} · {marketDescriptions[otherMarket]}</a>{market === 'ghana' && <a href={GHANA_CRM_URL} target="_blank" rel="noreferrer">Staff CRM Login</a>}</div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Providence</span><span>Canada · Ghana</span></div>
      </footer>
    </div>
  );
}
