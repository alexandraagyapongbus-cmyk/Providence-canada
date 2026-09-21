'use client';

import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { useState, type ReactNode } from 'react';

export type AudiencePanel = {
  key: string;
  kicker: string;
  title: string;
  media: { src: string; alt: string };
  services: { title: string; icon: ReactNode }[];
  ctaLabel: string;
  ctaHref: string;
  accent: 'blue' | 'gold';
};

export function AudienceSplitSection({ panels }: { panels: [AudiencePanel, AudiencePanel] }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="audience-split" data-expanded={expanded ?? undefined}>
      {panels.map((panel) => (
        <div
          key={panel.key}
          className={`audience-split-panel audience-split-${panel.accent} ${expanded === panel.key ? 'is-tapped' : ''}`}
          onClick={(e) => {
            if ((e.target as HTMLElement).closest('a')) return;
            setExpanded((prev) => (prev === panel.key ? null : panel.key));
          }}
        >
          <Image className="audience-split-media" src={panel.media.src} alt={panel.media.alt} fill sizes="(max-width: 900px) 100vw, 50vw" />
          <div className="audience-split-overlay" />
          <div className="audience-split-content">
            <p className="section-kicker">{panel.kicker}</p>
            <h3>{panel.title}</h3>
            <ul className="audience-split-services">
              {panel.services.map((service) => <li key={service.title}>{service.icon}<span>{service.title}</span></li>)}
            </ul>
            <a className={`button ${panel.accent === 'gold' ? 'button-gold' : 'button-primary'}`} href={panel.ctaHref}>{panel.ctaLabel} <ArrowUpRight /></a>
          </div>
        </div>
      ))}
    </div>
  );
}
