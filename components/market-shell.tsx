'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useEffect, useState, type ReactNode } from 'react';
import { GHANA_CRM_URL, markets, type MarketName } from '@/lib/content';

const navItems = [
  ['Home', ''],
  ['Services', '/services'],
  ['About us', '/about'],
  ['Contact', '/contact'],
] as const;

export function MarketShell({ market, children }: { market: MarketName; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const otherMarket: MarketName = market === 'canada' ? 'ghana' : 'canada';
  const suffix = pathname.replace(/^\/(canada|ghana)/, '') || '';
  const otherPath = `/${otherMarket}${suffix}`;

  useEffect(() => {
    window.localStorage.setItem('providence-market', market);
    document.cookie = `providence-market=${market};path=/;max-age=31536000;samesite=lax`;
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
          <Link className="compact-market-switch" href={otherPath} onClick={() => window.localStorage.setItem('providence-market', otherMarket)}>
            <span>{markets[market].name}</span><b>Switch to {markets[otherMarket].name}</b>
          </Link>
          <button className="menu-toggle" type="button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
        <div className={`mobile-menu ${open ? 'open' : ''}`} aria-hidden={!open}>
          <nav aria-label="Mobile navigation">
            {navItems.map(([label, path]) => <Link key={label} href={`/${market}${path}`}>{label}</Link>)}
            {market === 'ghana' && <a href={GHANA_CRM_URL} target="_blank" rel="noreferrer">Staff CRM Login <ArrowUpRight /></a>}
          </nav>
          <Link className="mobile-market-switch" href={otherPath} onClick={() => window.localStorage.setItem('providence-market', otherMarket)}>
            Switch to Providence {markets[otherMarket].name}
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
