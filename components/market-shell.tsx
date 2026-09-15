'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react';
import { useEffect, useState, type ReactNode } from 'react';
import { GHANA_CRM_URL, markets, type MarketName } from '@/lib/content';

const navItems = [
  ['Home', ''],
  ['Services', '/services'],
  ['About us', '/about'],
  ['Contact', '/contact'],
] as const;

const marketFlags: Record<MarketName, string> = {
  canada: '🇨🇦',
  ghana: '🇬🇭',
};

export function MarketShell({ market, children }: { market: MarketName; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const otherMarket: MarketName = market === 'canada' ? 'ghana' : 'canada';
  const suffix = pathname.replace(/^\/(canada|ghana)/, '') || '';
  const otherPath = `/${otherMarket}${suffix}`;

  function rememberMarket(nextMarket: MarketName) {
    window.localStorage.setItem('providence-market', nextMarket);
    document.cookie = `providence-market=${nextMarket};path=/;max-age=31536000;samesite=lax`;
  }

  useEffect(() => {
    rememberMarket(market);
  }, [market]);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <div className={`site market-${market}`}>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header full-header">
        <Link className="wordmark" href={`/${market}`} aria-label={`Providence ${markets[market].name} home`}>
          <span className="wordmark-mark">P</span><span>Providence</span>
        </Link>
        <nav aria-label="Primary navigation" className="desktop-nav">
          {navItems.map(([label, path]) => {
            const href = `/${market}${path}`;
            const active = pathname === href;
            return <Link key={label} href={href} aria-current={active ? 'page' : undefined}>{label}</Link>;
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
              <small>Switch market</small>
              <Link href={otherPath} onClick={() => rememberMarket(otherMarket)}>
                <span aria-hidden="true">{marketFlags[otherMarket]}</span>
                <span><b>{markets[otherMarket].name}</b><small>Open Providence {markets[otherMarket].name}</small></span>
                <ArrowUpRight aria-hidden="true" />
              </Link>
            </div>
          </details>
          <button className="menu-toggle" type="button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
        <div className={`mobile-menu ${open ? 'open' : ''}`} aria-hidden={!open}>
          <nav aria-label="Mobile navigation">
            {navItems.map(([label, path]) => <Link key={label} href={`/${market}${path}`}>{label}</Link>)}
            {market === 'ghana' && <a href={GHANA_CRM_URL} target="_blank" rel="noreferrer">Staff CRM Login <ArrowUpRight /></a>}
          </nav>
          <Link className="mobile-market-switch" href={otherPath} onClick={() => rememberMarket(otherMarket)}>
            <span aria-hidden="true">{marketFlags[market]}</span>
            <span>Providence {markets[market].name}</span>
            <b>Switch to {marketFlags[otherMarket]} {markets[otherMarket].name} <ArrowUpRight aria-hidden="true" /></b>
          </Link>
        </div>
      </header>
      <main id="main-content">{children}</main>
      <footer className="site-footer">
        <div className="footer-brand">
          <Link className="wordmark" href={`/${market}`}><span className="wordmark-mark">P</span><span>Providence</span></Link>
          <p>Helpful service. Dependable communication. Practical technology.</p>
        </div>
        <div className="footer-links">
          <div><strong>{markets[market].shortLabel}</strong>{navItems.map(([label, path]) => <Link key={label} href={`/${market}${path}`}>{label}</Link>)}</div>
          <div><strong>Other market</strong><Link href={`/${otherMarket}`}>Providence {markets[otherMarket].name}</Link>{market === 'ghana' && <a href={GHANA_CRM_URL} target="_blank" rel="noreferrer">Staff CRM Login</a>}</div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Providence</span><span>Canada · Ghana</span></div>
      </footer>
    </div>
  );
}
