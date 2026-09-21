'use client';

import { usePathname } from 'next/navigation';
import { ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import Image from 'next/image';
import { GHANA_CRM_URL, markets, marketUrl, type MarketName } from '@/lib/content';

type NavLink = { label: string; path: string };
type NavDropdown = { label: string; items: NavLink[] };
type NavEntry = NavLink | NavDropdown;

function isDropdown(entry: NavEntry): entry is NavDropdown {
  return 'items' in entry;
}

const navItems: Record<MarketName, NavEntry[]> = {
  canada: [
    { label: 'Home', path: '' },
    { label: 'Residential', items: [
      { label: 'Internet', path: '/residential#internet' },
      { label: 'TV', path: '/residential#tv' },
      { label: 'Home Phone', path: '/residential#phone' },
      { label: 'Bundles', path: '/residential#bundles' },
    ] },
    { label: 'Business', items: [
      { label: 'Business Internet', path: '/business#internet' },
      { label: 'Business Phone', path: '/business#phone' },
      { label: 'TV', path: '/business#tv' },
      { label: 'Connectivity', path: '/business#connectivity' },
      { label: 'Business Packages', path: '/business#packages' },
    ] },
    { label: 'Solutions', path: '/solutions' },
    { label: 'Why Providence', path: '/why-providence' },
    { label: 'Healthcare', path: '/healthcare-staffing' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ],
  ghana: [
    { label: 'Home', path: '' },
    { label: 'TV Services', path: '/services' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ],
};

const footerNavItems: Record<MarketName, NavLink[]> = {
  canada: [
    { label: 'Home', path: '' },
    { label: 'Residential services', path: '/residential' },
    { label: 'Business services', path: '/business' },
    { label: 'Solutions', path: '/solutions' },
    { label: 'Why Providence', path: '/why-providence' },
    { label: 'Partner With Providence', path: '/telecom' },
    { label: 'Healthcare staffing', path: '/healthcare-staffing' },
    { label: 'For care organizations', path: '/care-organizations' },
    { label: 'For healthcare workers', path: '/healthcare-workers' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ],
  ghana: navItems.ghana as NavLink[],
};

const marketDescriptions: Record<MarketName, string> = {
  canada: 'Telecom & Healthcare Staffing',
  ghana: 'TV Services',
};

const marketFlags: Record<MarketName, string> = {
  canada: '🇨🇦',
  ghana: '🇬🇭',
};

export function MarketShell({ market, children }: { market: MarketName; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [expandedMobileGroups, setExpandedMobileGroups] = useState<Set<string>>(new Set());
  const pathname = usePathname();
  const otherMarket: MarketName = market === 'canada' ? 'ghana' : 'canada';
  const suffix = pathname.replace(/^\/(canada|ghana)/, '') || '';
  const sharedSuffix = ['/about', '/contact', '/services'].includes(suffix) ? suffix : '';
  const otherPath = marketUrl(otherMarket, sharedSuffix);
  const currentNavItems = navItems[market];
  const headerRef = useRef<HTMLElement>(null);

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

  useEffect(() => {
    if (market !== 'canada') return;
    function onScroll() {
      setScrolled(window.scrollY > 64);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [market]);

  useEffect(() => {
    const node = headerRef.current;
    if (!node) return;
    function closeAllExcept(target: Node | null) {
      node!.querySelectorAll('details[open]').forEach((details) => {
        if (!target || !details.contains(target)) (details as HTMLDetailsElement).open = false;
      });
    }
    function closeIfOutside(event: MouseEvent) {
      closeAllExcept(node!.contains(event.target as Node) ? (event.target as Node) : null);
    }
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') closeAllExcept(null);
    }
    document.addEventListener('click', closeIfOutside);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('click', closeIfOutside);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, []);

  function toggleMobileGroup(label: string) {
    setExpandedMobileGroups((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  }

  return (
    <div className={`site market-${market}`}>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className={`site-header full-header ${scrolled ? 'is-scrolled' : ''}`} ref={headerRef}>
        <a className="wordmark" href={`/${market}`} aria-label={`Providence ${markets[market].name} home`}>
          <span className="wordmark-logo"><Image src="/providence-logo-mark.png" alt="" width={512} height={320} priority /></span><span>Providence</span>
        </a>
        <nav aria-label="Primary navigation" className={`desktop-nav desktop-nav-${market}`}>
          {currentNavItems.map((entry) => {
            if (isDropdown(entry)) {
              const groupActive = entry.items.some((item) => pathname === `/${market}${item.path.split('#')[0]}`);
              return (
                <details className="nav-dropdown" key={entry.label}>
                  <summary aria-current={groupActive ? 'page' : undefined}>{entry.label}<ChevronDown aria-hidden="true" /></summary>
                  <div className="nav-dropdown-menu">
                    {entry.items.map((item) => <a key={item.label} href={`/${market}${item.path}`}>{item.label}</a>)}
                  </div>
                </details>
              );
            }
            const href = `/${market}${entry.path}`;
            const active = pathname === href;
            return <a key={entry.label} href={href} aria-current={active ? 'page' : undefined}>{entry.label}</a>;
          })}
        </nav>
        <div className="header-actions">
          {market === 'ghana' && <a className="crm-link" href={GHANA_CRM_URL} target="_blank" rel="noreferrer">Staff CRM Login <ArrowUpRight /></a>}
          {market === 'canada' && <div className="header-pathway-actions">
            <a className="header-action header-action-solid" href="/canada/contact">Get a Quote</a>
          </div>}
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
        <div className={`mobile-menu ${open ? 'open' : ''}`} aria-hidden={!open} inert={!open}>
          {market === 'canada' && <div className="mobile-pathway-actions">
            <a className="header-action header-action-solid" href="/canada/contact">Get a Quote</a>
          </div>}
          <nav aria-label="Mobile navigation">
            {currentNavItems.map((entry) => {
              if (isDropdown(entry)) {
                const isExpanded = expandedMobileGroups.has(entry.label);
                return (
                  <div className="mobile-nav-group" key={entry.label}>
                    <button type="button" className="mobile-nav-group-toggle" aria-expanded={isExpanded} onClick={() => toggleMobileGroup(entry.label)}>
                      {entry.label}
                      <ChevronDown aria-hidden="true" className={isExpanded ? 'rotated' : ''} />
                    </button>
                    <div className={`mobile-nav-group-items ${isExpanded ? 'open' : ''}`}>
                      {entry.items.map((item) => <a key={item.label} href={`/${market}${item.path}`}>{item.label}</a>)}
                    </div>
                  </div>
                );
              }
              return <a key={entry.label} href={`/${market}${entry.path}`}>{entry.label}</a>;
            })}
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
          <div><strong>{markets[market].shortLabel}</strong>{footerNavItems[market].map((item) => <a key={item.label} href={`/${market}${item.path}`}>{item.label}</a>)}</div>
          <div><strong>Other market</strong><a href={marketUrl(otherMarket)}>Providence {markets[otherMarket].name} · {marketDescriptions[otherMarket]}</a>{market === 'ghana' && <a href={GHANA_CRM_URL} target="_blank" rel="noreferrer">Staff CRM Login</a>}</div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Providence</span><span>Canada · Ghana</span></div>
      </footer>
    </div>
  );
}
