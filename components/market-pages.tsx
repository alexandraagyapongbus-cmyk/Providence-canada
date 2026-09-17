import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CircleHelp,
  Globe2,
  Headphones,
  RadioTower,
  ShieldCheck,
  Sparkles,
  Tv,
  Wrench,
} from 'lucide-react';
import { LeadForm } from '@/components/lead-form';
import { MarketShell } from '@/components/market-shell';
import { Reveal } from '@/components/reveal';
import { GHANA_CRM_URL, markets, marketUrl, storyValues, type MarketName, type SiteSection } from '@/lib/content';

function SectionHeading({ eyebrow, title, copy, light = false }: { eyebrow: string; title: string; copy?: string; light?: boolean }) {
  return <div className={`section-heading ${light ? 'light' : ''}`}><p className="section-kicker">{eyebrow}</p><h2>{title}</h2>{copy && <p>{copy}</p>}</div>;
}

function Hero({ market, interior = false, title, copy }: { market: MarketName; interior?: boolean; title?: string; copy?: string }) {
  const content = markets[market];
  return (
    <section className={`market-hero ${interior ? 'interior-hero' : ''}`}>
      <Image className="market-hero-image" src="/providence-hero.png" alt="Providence serving Canada and Ghana through practical technology and service" fill priority sizes="100vw" />
      <div className="market-hero-overlay" />
      <div className="market-hero-content">
        <p className="kicker">{market === 'canada' ? <RadioTower /> : <Tv />}{content.eyebrow}</p>
        <h1>{title || content.heroTitle}</h1>
        <p className="hero-copy">{copy || content.heroCopy}</p>
        {!interior && <div className="hero-actions">
          <Link className="button button-gold" href={`/${market}/${market === 'ghana' ? 'contact' : 'services'}`}>{content.primaryCta}<ArrowUpRight /></Link>
          <Link className="button button-glass" href={`/${market}/contact`}>{content.secondaryCta}</Link>
        </div>}
      </div>
      {!interior && <div className="hero-market-note"><span>{market === 'ghana' ? '$250' : 'One partner'}</span><p>{market === 'ghana' ? 'TV box sale + installation' : 'Telecom guidance + sales support'}</p></div>}
    </section>
  );
}

function ServiceGrid({ market, limit }: { market: MarketName; limit?: number }) {
  const services = markets[market].services.slice(0, limit);
  return <div className="service-grid">{services.map((service, index) => {
    const Icon = service.icon;
    return <Reveal key={service.title} delay={index * 55}><article className="service-card"><Icon /><span>{String(index + 1).padStart(2, '0')}</span><h3>{service.title}</h3><p>{service.text}</p></article></Reveal>;
  })}</div>;
}

function FinalCta({ market }: { market: MarketName }) {
  return <section className="final-cta"><div><p className="section-kicker">Start the conversation</p><h2>{market === 'ghana' ? 'Ready to set up your TV service?' : 'Ready for a clearer telecom conversation?'}</h2></div><Link className="button button-gold" href={`/${market}/contact`}>{market === 'ghana' ? 'Order or get support' : 'Talk to our team'}<ArrowUpRight /></Link></section>;
}

function CanadaHome() {
  const market: MarketName = 'canada';
  return <MarketShell market={market}>
    <Hero market={market} />
    <section className="signal-strip"><span>One Providence</span><strong>Local market focus</strong><strong>Clear customer conversations</strong><strong>Practical next steps</strong></section>
    <section className="content-section" id="services"><Reveal><SectionHeading eyebrow="What we do" title="Telecom and sales support, without the noise." copy="Providence helps customers and businesses move from too many options to a clear, practical next step." /></Reveal><ServiceGrid market={market} /><Link className="text-link" href="/canada/services">See all Canada services <ArrowRight /></Link></section>
    <section className="dark-section"><Reveal><SectionHeading light eyebrow="How we help" title="A useful process from first question to follow-through." /></Reveal><div className="process-grid">{markets.canada.process.map(([number, title, text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <section className="partnership-section"><Reveal className="partnership-copy"><p className="section-kicker">For business teams</p><h2>Add thoughtful sales capacity where it matters.</h2><p>Providence supports telecom and sales campaigns with structured outreach, qualification, customer acquisition, and dependable communication. The work is shaped around the campaign—not a claim that Providence owns the underlying network.</p><Link className="button button-dark" href="/canada/contact">Discuss a partnership <ArrowUpRight /></Link></Reveal><div className="partnership-visual"><div><small>01</small><strong>Campaign clarity</strong><span>Audience, offer, message, and outcome</span></div><div><small>02</small><strong>Customer conversations</strong><span>Helpful outreach and qualification</span></div><div><small>03</small><strong>Organized follow-through</strong><span>A practical path from interest to next step</span></div></div></section>
    <FinalCta market={market} />
  </MarketShell>;
}

function GhanaHome() {
  const market: MarketName = 'ghana';
  return <MarketShell market={market}>
    <Hero market={market} />
    <section className="offer-band"><div><span>TV box + installation</span><strong>$250</strong><small>One-time customer price</small></div><div><span>Monthly service</span><strong>$50</strong><small>Flexible month-to-month option</small></div><div><span>Three-month service</span><strong>$90</strong><small>One payment for three months</small></div></section>
    <section className="content-section"><Reveal><SectionHeading eyebrow="The Providence offer" title="A straightforward path to home entertainment." copy="Choose your box and service period, request your installation, and get continuing help when you need it." /></Reveal><ServiceGrid market={market} limit={3} /><Link className="text-link" href="/ghana/services">Explore the complete Ghana service <ArrowRight /></Link></section>
    <section className="pricing-section"><Reveal><SectionHeading light eyebrow="Transparent pricing" title="Choose the service rhythm that fits." copy="Prices are shown in the supplied dollar amounts. No conversion rate has been assumed." /></Reveal><div className="plan-grid">
      <article><p>Monthly</p><h3><sup>$</sup>50<span>/ month</span></h3><ul><li><Check />One month of service</li><li><Check />Renew month by month</li><li><Check />Support for service questions</li></ul><Link href="/ghana/contact?interest=Choose%20or%20renew%20a%20plan" className="button button-outline-light">Choose monthly</Link></article>
      <article className="featured-plan"><div className="plan-label">Better three-month value</div><p>Three months</p><h3><sup>$</sup>90<span>/ 3 months</span></h3><ul><li><Check />Three months of service</li><li><Check />One renewal for the full period</li><li><Check />$60 less than three monthly renewals</li></ul><Link href="/ghana/contact?interest=Choose%20or%20renew%20a%20plan" className="button button-gold">Choose three months</Link></article>
    </div><p className="pricing-note"><ShieldCheck />The TV box sale and installation is a separate one-time $250 charge.</p></section>
    <section className="journey-section"><Reveal><SectionHeading eyebrow="From order to watching" title="Five clear steps. Support continues after setup." /></Reveal><ol>{markets.ghana.process.map(([number, title, text]) => <li key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol></section>
    <section className="support-section"><div><Headphones /><p className="section-kicker">Existing customers</p><h2>Need help with your box or plan?</h2><p>Providence can help with equipment questions, service-plan selection, renewals, and common setup concerns.</p></div><div className="support-actions"><Link className="button button-dark" href="/ghana/contact?interest=Equipment%20support">Contact support <ArrowUpRight /></Link><a href={GHANA_CRM_URL} className="text-link" target="_blank" rel="noreferrer">Staff CRM Login <ArrowUpRight /></a></div></section>
    <FinalCta market={market} />
  </MarketShell>;
}

function ServicesPage({ market }: { market: MarketName }) {
  return <MarketShell market={market}>
    <Hero market={market} interior title={market === 'canada' ? 'Support for the full sales conversation.' : 'Your TV box service, from order to support.'} copy={market === 'canada' ? 'From connectivity questions to outbound campaigns, Providence brings structure, clarity, and human follow-through.' : 'Purchase, installation, service plans, and continuing help are organized as one straightforward experience.'} />
    <section className="content-section page-intro"><Reveal><SectionHeading eyebrow={`${markets[market].shortLabel} services`} title={market === 'canada' ? 'Six practical ways we can help.' : 'Everything around one focused service.'} copy={market === 'canada' ? 'Our role is to help people and businesses access suitable telecom solutions and to support the sales work around them.' : 'Providence Ghana currently focuses only on the TV box business, with clear pricing and support around that offer.'} /></Reveal><ServiceGrid market={market} /></section>
    {market === 'ghana' ? <>
      <section className="ghana-offer-detail"><div><p className="section-kicker">One-time setup</p><h2>TV box sale & installation</h2><strong>$250</strong><p>Includes the TV box sale and professional installation. Providence confirms appointment details before the visit.</p><Link className="button button-gold" href="/ghana/contact?interest=Order%20a%20TV%20box">Order a TV box <ArrowUpRight /></Link></div><div className="detail-list"><article><Wrench /><h3>Installation</h3><p>Connection, setup, service activation, and a practical introduction to the box.</p></article><article><CircleHelp /><h3>Continuing help</h3><p>Support for plan questions, equipment assistance, and customer service after setup.</p></article></div></section>
      <section className="comparison-section"><SectionHeading eyebrow="Service plans" title="Monthly flexibility or three-month value." /><div className="comparison-table"><div className="comparison-row heading"><span>Plan</span><span>Service period</span><span>Customer price</span><span></span></div><div className="comparison-row"><strong>Monthly</strong><span>1 month</span><span>$50</span><Link href="/ghana/contact?interest=Choose%20or%20renew%20a%20plan">Choose plan <ArrowRight /></Link></div><div className="comparison-row"><strong>Three months</strong><span>3 months</span><span>$90</span><Link href="/ghana/contact?interest=Choose%20or%20renew%20a%20plan">Choose plan <ArrowRight /></Link></div></div></section>
    </> : <section className="dark-section campaign-detail"><SectionHeading light eyebrow="Campaign support" title="Built around the actual sales need." copy="Providence can support individual inquiries, business consultations, or a structured campaign. Scope, audience, responsibilities, and outcomes are clarified before work begins." /><div className="campaign-points"><span>Telecom inquiry support</span><span>Outbound sales capacity</span><span>Customer acquisition activity</span><span>Campaign coordination</span></div></section>}
    <FinalCta market={market} />
  </MarketShell>;
}

function AboutPage({ market }: { market: MarketName }) {
  return <MarketShell market={market}>
    <Hero market={market} interior title="One Providence. Two focused markets." copy="Providence operates across Canada and Ghana with distinct local services and one shared commitment to helpful, dependable communication." />
    <section className="about-story"><Reveal className="about-copy"><p className="section-kicker">Who we are</p><h2>Technology is only useful when people can make sense of it.</h2><p>Providence helps close the distance between a service and the person who needs it. In Canada, that means telecom sales, consultation, marketing, and campaign support. In Ghana, it means a focused TV box offer with installation, service plans, and continuing help.</p><p>These are different services, but the standard is the same: communicate clearly, support the next step, and make the experience practical.</p></Reveal><div className="market-story-grid"><a href={market === 'canada' ? '/canada' : marketUrl('canada')}><RadioTower /><small>Canada</small><strong>Telecom sales & growth support</strong><ArrowUpRight /></a><a href={market === 'ghana' ? '/ghana' : marketUrl('ghana')}><Tv /><small>Ghana</small><strong>TV box sales, setup & support</strong><ArrowUpRight /></a></div></section>
    <section className="values-section"><SectionHeading eyebrow="What connects our work" title="A shared service standard." /><div className="value-grid">{storyValues.map((value) => { const Icon = value.icon; return <article key={value.title}><Icon /><h3>{value.title}</h3><p>{value.text}</p></article>; })}</div></section>
    <section className="truth-section"><Globe2 /><div><p className="section-kicker">Grounded, not overstated</p><h2>We say what Providence does—and leave unsupported claims out.</h2><p>This website does not claim carrier ownership, exclusive partnerships, invented coverage, customer numbers, awards, offices, or guarantees. As Providence grows, verified details can be added without changing the structure of the site.</p></div></section>
    <FinalCta market={market} />
  </MarketShell>;
}

function ContactPage({ market }: { market: MarketName }) {
  return <MarketShell market={market}>
    <Hero market={market} interior title={market === 'ghana' ? 'Order, install, renew, or get help.' : 'Let’s make the next step clearer.'} copy={markets[market].contactIntro} />
    <section className="contact-section"><div className="contact-context"><p className="section-kicker">Contact {markets[market].shortLabel}</p><h2>Tell us what brings you here.</h2><p>{markets[market].contactIntro}</p><div className="contact-reassurance"><ShieldCheck /><span><strong>Useful details only</strong>Your information is used to respond to this request.</span></div><div className="contact-reassurance"><Sparkles /><span><strong>Market-specific follow-up</strong>Your inquiry is routed as a {markets[market].name} request.</span></div>{market === 'ghana' && <div className="staff-callout"><small>Providence staff</small><p>Customer ordering is handled through this form. Staff access remains separate.</p><a href={GHANA_CRM_URL} target="_blank" rel="noreferrer">Staff CRM Login <ArrowUpRight /></a></div>}</div><div className="form-panel"><LeadForm market={market} /></div></section>
  </MarketShell>;
}

export function MarketPage({ market, section }: { market: MarketName; section: SiteSection }) {
  if (section === 'home') return market === 'canada' ? <CanadaHome /> : <GhanaHome />;
  if (section === 'services') return <ServicesPage market={market} />;
  if (section === 'about') return <AboutPage market={market} />;
  return <ContactPage market={market} />;
}
