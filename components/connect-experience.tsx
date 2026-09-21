'use client';

import { ArrowUpRight } from 'lucide-react';
import { useState, type ReactNode } from 'react';

export type ConnectItem = {
  key: string;
  label: string;
  icon: ReactNode;
  description: string;
  ctas: { label: string; href: string }[];
};

export function ConnectExperienceSection({ items }: { items: ConnectItem[] }) {
  const [active, setActive] = useState(items[0].key);
  const activeItem = items.find((item) => item.key === active) ?? items[0];

  return (
    <section className="canada-section canada-section-light connect-experience">
      <div className="section-heading">
        <p className="section-kicker">What can we connect for you?</p>
        <h2>Pick a service to see how Providence can help.</h2>
      </div>
      <div className="connect-tabs" role="group" aria-label="Choose a service to explore">
        {items.map((item) => (
          <button
            key={item.key}
            type="button"
            aria-pressed={active === item.key}
            className={`connect-tab ${active === item.key ? 'is-active' : ''}`}
            onMouseEnter={() => setActive(item.key)}
            onFocus={() => setActive(item.key)}
            onClick={() => setActive(item.key)}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </div>
      <div className="connect-panel" key={activeItem.key}>
        <div className="connect-panel-icon" aria-hidden="true">{activeItem.icon}</div>
        <div className="connect-panel-body">
          <h3>{activeItem.label}</h3>
          <p>{activeItem.description}</p>
          <div className="connect-panel-ctas">
            {activeItem.ctas.map((cta) => (
              <a key={cta.label} className="text-link" href={cta.href}>{cta.label} <ArrowUpRight /></a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
