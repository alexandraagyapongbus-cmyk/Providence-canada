import Image from 'next/image';
import * as React from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  CalendarDays,
  Check,
  CircleHelp,
  Clock3,
  Globe2,
  Headphones,
  HeartHandshake,
  MapPin,
  RadioTower,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Tv,
  UserRoundCheck,
  Users,
  Wrench,
} from 'lucide-react';
import { ConnectionGraphic } from '@/components/connection-graphic';
import { HeroMedia } from '@/components/hero-media';
import { InView } from '@/components/in-view';
import { LeadForm } from '@/components/lead-form';
import { MarketShell } from '@/components/market-shell';
import { Reveal } from '@/components/reveal';
import {
  candidateJourney,
  careIndustries,
  careSettings,
  GHANA_CRM_URL,
  healthcareRoles,
  markets,
  marketUrl,
  recruitmentServices,
  telecomCustomerSegments,
  storyValues,
  whyProvidence,
  type MarketName,
  type SiteSection,
} from '@/lib/content';

function SectionHeading({ eyebrow, title, copy, light = false }: { eyebrow: string; title: string; copy?: string; light?: boolean }) {
  return <div className={`section-heading ${light ? 'light' : ''}`}><p className="section-kicker">{eyebrow}</p><h2>{title}</h2>{copy && <p>{copy}</p>}</div>;
}

function AnimatedWords({ text }: { text: string }) {
  const words = text.split(' ');
  return <>{words.map((word, index) => <React.Fragment key={index}>{index > 0 ? ' ' : ''}<span style={{ '--word-index': index } as React.CSSProperties}>{word}</span></React.Fragment>)}</>;
}

function Hero({ market, interior = false, title, copy, photo = true, eyebrow, eyebrowIcon: EyebrowIcon }: { market: MarketName; interior?: boolean; title?: string; copy?: string; photo?: boolean; eyebrow?: string; eyebrowIcon?: typeof Stethoscope }) {
  const content = markets[market];
  const isCanada = market === 'canada';
  const headline = title || content.heroTitle;
  const canadaAlt = 'Healthcare professionals conferring in a hospital corridor';
  const showPhoto = isCanada ? photo : true;
  const Icon = EyebrowIcon || (isCanada ? Stethoscope : Tv);
  return (
    <section className={`market-hero ${interior ? 'interior-hero' : ''} ${isCanada ? 'healthcare-hero' : ''} ${!showPhoto ? 'no-photo-hero' : ''}`}>
      {showPhoto && (isCanada && !interior ? (
        <HeroMedia videoSrc="/providence-canada-hero.mp4" posterSrc="/providence-canada-hero-poster.jpg" alt={canadaAlt} />
      ) : (
        <Image
          className="market-hero-image"
          src={isCanada ? '/providence-canada-hero-poster.jpg' : '/providence-hero.png'}
          alt={isCanada ? canadaAlt : 'A family enjoying Providence Ghana TV services at home'}
          fill
          priority
          sizes="100vw"
        />
      ))}
      <div className="market-hero-overlay" />
      {isCanada && <div className="hero-aurora" aria-hidden="true"><span /><span /></div>}
      <div className="market-hero-content">
        <p className="kicker"><Icon />{eyebrow || content.eyebrow}</p>
        <h1>{isCanada ? <AnimatedWords text={headline} /> : headline}</h1>
        {isCanada && !interior && <p className="hero-tagline">{markets.canada.heroTagline}</p>}
        <p className="hero-copy">{copy || content.heroCopy}</p>
        {!interior && (isCanada ? (
          <div className="hero-pathways">
            <a className="hero-pathway hero-pathway-employer" href="/canada/care-organizations">
              <span className="hero-pathway-label">Looking for staff?</span>
              <strong>Find healthcare professionals</strong>
              <span className="hero-pathway-detail">Tell us the role, setting, and schedule — we'll help you find the right fit.</span>
              <span className="hero-pathway-cta">Find Staff <ArrowUpRight /></span>
            </a>
            <a className="hero-pathway hero-pathway-worker" href="/canada/healthcare-workers">
              <span className="hero-pathway-label">Looking for work?</span>
              <strong>Explore healthcare opportunities</strong>
              <span className="hero-pathway-detail">Share your qualifications and availability — we'll consider suitable opportunities.</span>
              <span className="hero-pathway-cta">Find Work <ArrowUpRight /></span>
            </a>
          </div>
        ) : (
          <div className="hero-actions">
            <a className="button button-gold" href="/ghana/contact?interest=Order%20a%20TV%20box">Order a TV box <ArrowUpRight /></a>
            <a className="button button-glass" href="/ghana/contact?interest=Request%20installation">Request installation</a>
          </div>
        ))}
      </div>
      {!interior && !isCanada && <div className="hero-market-note"><span>$250</span><p>TV box sale + installation</p></div>}
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

function HealthcareRoleGrid() {
  return <div className="healthcare-role-grid">{healthcareRoles.map((role, index) => {
    const Icon = role.icon;
    return <Reveal key={role.title} delay={index * 60}><article><div><Icon /><span>{role.short}</span></div><h3>{role.title}</h3><p>{role.text}</p></article></Reveal>;
  })}</div>;
}

function CareSettingsGrid() {
  return <div className="care-settings-grid">{careSettings.map((setting, index) => <Reveal key={setting.title} delay={index * 70} variant="left"><article><span>0{index + 1}</span><h3>{setting.title}</h3><p>{setting.text}</p></article></Reveal>)}</div>;
}

function StaffingProcess({ light = false }: { light?: boolean }) {
  return <InView className="process-grid">{markets.canada.process.map(([number, title, text]) => <article key={number} className={light ? 'on-light' : ''}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</InView>;
}

function AudiencePaths({ compact = false }: { compact?: boolean }) {
  return <div className={`audience-paths ${compact ? 'compact' : ''}`}>
    <Reveal variant="left"><article className="audience-card organization-card">
      <Building2 />
      <p className="section-kicker">For care organizations</p>
      <h3>Tell us what your team needs.</h3>
      <p>Share the role, location, schedule, timing, and context. Providence will review the request and coordinate a practical next conversation.</p>
      <a className="button button-dark" href="/canada/care-organizations">Find staff <ArrowUpRight /></a>
    </article></Reveal>
    <Reveal variant="right" delay={90}><article className="audience-card worker-card">
      <UserRoundCheck />
      <p className="section-kicker">For healthcare workers</p>
      <h3>Tell us where you can contribute.</h3>
      <p>Share your role, qualifications, location, availability, and preferred settings so Providence can consider suitable opportunities.</p>
      <a className="button button-gold" href="/canada/healthcare-workers">Find work <ArrowUpRight /></a>
    </article></Reveal>
  </div>;
}

function WhoWeConnectSection() {
  return <section className="canada-section canada-section-light">
    <Reveal><SectionHeading eyebrow="Who we connect" title="Healthcare and care-support professionals, ready to work." copy="Current areas of interest include the role groups below. Other relevant healthcare and care-support professionals are welcome to inquire." /></Reveal>
    <HealthcareRoleGrid />
    <a className="text-link" href="/canada/healthcare-workers" style={{ marginTop: '2rem' }}>Explore healthcare opportunities <ArrowRight /></a>
  </section>;
}

function ForOrganizationsSection() {
  return <section className="canada-section canada-section-blue">
    <div className="canada-split">
      <div className="canada-split-copy">
        <SectionHeading eyebrow="For healthcare organizations" title="Build your healthcare team with a partner who listens first." copy="Long-term care and retirement homes, home and community care organizations, clinics, and other health and community organizations bring Providence a role, a setting, and a timeline. We take the time to understand all three before suggesting a fit." />
        <a className="button button-primary" href="/canada/care-organizations">Find staff <ArrowUpRight /></a>
      </div>
      <div className="canada-split-media">
        <Image src="/providence-canada-team.jpg" alt="A team of healthcare professionals in scrubs and coats walking together down a hospital corridor" fill sizes="(max-width: 800px) 100vw, 40vw" />
      </div>
    </div>
  </section>;
}

function ForProfessionalsSection() {
  return <section className="canada-section canada-section-light">
    <Reveal><SectionHeading eyebrow="For healthcare professionals" title="From discovering a fit to starting the work." copy="Providence coordinates the process so you always know what happens next." /></Reveal>
    <div className="canada-journey">
      {candidateJourney.map(([number, title, text, Icon]) => (
        <article key={number}><Icon /><span>{number}</span><h3>{title}</h3><p>{text}</p></article>
      ))}
    </div>
    <a className="button button-primary" href="/canada/healthcare-workers" style={{ marginTop: '2.5rem' }}>Find work <ArrowUpRight /></a>
  </section>;
}

function WhyProvidenceSection() {
  return <section className="canada-section canada-section-tint">
    <Reveal><SectionHeading eyebrow="Why Providence" title="A recruitment partner that pays attention to detail." /></Reveal>
    <div className="canada-differentiator-grid">
      {whyProvidence.map((item, index) => { const Icon = item.icon; return <Reveal key={item.title} delay={index * 50}><article><Icon /><h3>{item.title}</h3><p>{item.text}</p></article></Reveal>; })}
    </div>
  </section>;
}

function RecruitmentServicesSection() {
  return <section className="canada-section canada-section-blue">
    <SectionHeading eyebrow="Recruitment & staffing services" title="Service built around how organizations actually hire." />
    <div className="canada-services-grid">
      {recruitmentServices.map((service) => { const Icon = service.icon; return <article key={service.title}><Icon /><h3>{service.title}</h3><p>{service.text}</p></article>; })}
    </div>
  </section>;
}

function IndustriesSection() {
  return <section className="canada-section canada-section-light">
    <SectionHeading eyebrow="Industries & settings we serve" title="A range of Ontario care environments." />
    <div className="canada-industry-grid">
      {careIndustries.map((industry) => <article key={industry.title}><h3>{industry.title}</h3><p>{industry.text}</p></article>)}
    </div>
  </section>;
}

function CareersBand() {
  return <div className="canada-employer-band">
    <div><h2>Looking for your next healthcare role?</h2><p>Share your qualifications and availability, and Providence will consider you for suitable Ontario opportunities as they arise.</p></div>
    <a className="button button-primary" href="/canada/healthcare-workers">Explore opportunities <ArrowUpRight /></a>
  </div>;
}

function EmployerCtaBand() {
  return <div className="canada-employer-band canada-employer-band-alt">
    <div><h2>Build your healthcare team.</h2><p>Tell Providence what your organization needs, and we'll help coordinate the right next conversation.</p></div>
    <a className="button button-primary" href="/canada/care-organizations">Tell us what you need <ArrowUpRight /></a>
  </div>;
}

function AboutTeaserSection() {
  return <section className="canada-section canada-section-light">
    <div className="canada-about-teaser">
      <div>
        <SectionHeading eyebrow="About Providence" title="One Providence, focused on the right connection." copy="Providence Canada listens carefully, communicates clearly, and coordinates the next step—for the organizations that need healthcare staff and the professionals ready to work." />
      </div>
      <a className="button button-dark" href="/canada/about">About Providence <ArrowRight /></a>
    </div>
  </section>;
}

function CanadaFinalCta() {
  return <section className="final-cta"><div><p className="section-kicker">Start the right conversation</p><h2>Need staff—or ready to explore healthcare work?</h2></div><div className="final-cta-actions"><a className="button button-primary" href="/canada/care-organizations">I'm looking for staff <ArrowUpRight /></a><a className="button button-outline-light" href="/canada/healthcare-workers">I'm looking for work</a></div></section>;
}

function GhanaFinalCta() {
  return <section className="final-cta"><div><p className="section-kicker">Start the conversation</p><h2>Ready to set up your TV service?</h2></div><a className="button button-gold" href="/ghana/contact">Order or get support <ArrowUpRight /></a></section>;
}

function CanadaHome() {
  return <MarketShell market="canada">
    <Hero market="canada" />
    <WhoWeConnectSection />
    <ForOrganizationsSection />
    <ForProfessionalsSection />
    <section className="canada-section canada-section-blue" style={{ paddingBottom: 0 }}>
      <SectionHeading light eyebrow="How Providence works" title="The connection between healthcare talent and healthcare organizations." copy="Providence sits between both sides of the staffing conversation and helps coordinate the connection." />
    </section>
    <ConnectionGraphic />
    <WhyProvidenceSection />
    <RecruitmentServicesSection />
    <IndustriesSection />
    <CareersBand />
    <EmployerCtaBand />
    <section className="telecom-secondary"><div><RadioTower /><p className="section-kicker">Also from Providence Canada</p><h2>Telecom sales & marketing.</h2><p>Our established telecom work remains active as a focused secondary service for customer guidance, telesales, acquisition, and campaign coordination.</p></div><a className="button button-dark" href="/canada/telecom">Explore telecom services <ArrowRight /></a></section>
    <AboutTeaserSection />
    <CanadaFinalCta />
  </MarketShell>;
}

function GhanaHome() {
  return <MarketShell market="ghana">
    <Hero market="ghana" />
    <section className="offer-band"><div><span>TV box + installation</span><strong>$250</strong><small>One-time customer price</small></div><div><span>Monthly service</span><strong>$50</strong><small>Flexible month-to-month option</small></div><div><span>Three-month service</span><strong>$90</strong><small>One payment for three months</small></div></section>
    <section className="content-section"><Reveal><SectionHeading eyebrow="The Providence offer" title="A straightforward path to home entertainment." copy="Choose your box and service period, request your installation, and get continuing help when you need it." /></Reveal><ServiceGrid market="ghana" limit={3} /><a className="text-link" href="/ghana/services">Explore the complete Ghana service <ArrowRight /></a></section>
    <section className="pricing-section"><Reveal><SectionHeading light eyebrow="Transparent pricing" title="Choose the service rhythm that fits." copy="Prices are shown in the supplied dollar amounts. No conversion rate has been assumed." /></Reveal><div className="plan-grid">
      <article><p>Monthly</p><h3><sup>$</sup>50<span>/ month</span></h3><ul><li><Check />One month of service</li><li><Check />Renew month by month</li><li><Check />Support for service questions</li></ul><a href="/ghana/contact?interest=Choose%20or%20renew%20a%20plan" className="button button-outline-light">Choose monthly</a></article>
      <article className="featured-plan"><div className="plan-label">Better three-month value</div><p>Three months</p><h3><sup>$</sup>90<span>/ 3 months</span></h3><ul><li><Check />Three months of service</li><li><Check />One renewal for the full period</li><li><Check />$60 less than three monthly renewals</li></ul><a href="/ghana/contact?interest=Choose%20or%20renew%20a%20plan" className="button button-gold">Choose three months</a></article>
    </div><p className="pricing-note"><ShieldCheck />The TV box sale and installation is a separate one-time $250 charge.</p></section>
    <section className="journey-section"><Reveal><SectionHeading eyebrow="From order to watching" title="Five clear steps. Support continues after setup." /></Reveal><ol>{markets.ghana.process.map(([number, title, text]) => <li key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol></section>
    <section className="support-section"><div><Headphones /><p className="section-kicker">Existing customers</p><h2>Need help with your box or plan?</h2><p>Providence can help with equipment questions, service-plan selection, renewals, and common setup concerns.</p></div><div className="support-actions"><a className="button button-dark" href="/ghana/contact?interest=Equipment%20support">Contact support <ArrowUpRight /></a><a href={GHANA_CRM_URL} className="text-link" target="_blank" rel="noreferrer">Staff CRM Login <ArrowUpRight /></a></div></section>
    <GhanaFinalCta />
  </MarketShell>;
}

function HealthcareStaffingPage() {
  return <MarketShell market="canada">
    <Hero market="canada" interior title="Healthcare staffing starts with understanding both sides." copy="Providence Canada supports recruiting, matching, placement, and staffing coordination for care organizations and healthcare professionals across Ontario." />
    <section className="content-section page-intro"><Reveal><SectionHeading eyebrow="Healthcare staffing" title="A human connection between workforce needs and career interests." copy="Organizations can describe the staff they need. Workers can share what they bring and where they want to contribute. Providence helps identify and coordinate suitable next steps." /></Reveal><AudiencePaths compact /></section>
    <ConnectionGraphic />
    <section className="roles-section"><SectionHeading eyebrow="Role groups" title="Clear enough to navigate. Flexible enough to listen." /><HealthcareRoleGrid /></section>
    <section className="settings-section"><div className="settings-copy"><p className="section-kicker">Potential client settings</p><h2>Different care environments. Different staffing realities.</h2><p>Providence considers each setting, schedule, and role on its own terms. The categories below are examples of organizations we welcome hearing from.</p></div><CareSettingsGrid /></section>
    <section className="dark-section"><SectionHeading light eyebrow="Our coordination approach" title="Three practical stages, with no unsupported promises." /><StaffingProcess /></section>
    <section className="grounded-note"><ShieldCheck /><div><p className="section-kicker">A clear starting point</p><h2>Interest begins a conversation.</h2><p>Providence does not present this site as a list of current job openings or confirmed client contracts. An inquiry helps us understand potential fit and next steps; it does not guarantee staffing, employment, or placement.</p></div></section>
    <CanadaFinalCta />
  </MarketShell>;
}

function CareOrganizationsPage() {
  return <MarketShell market="canada">
    <Hero market="canada" interior title="Tell us where your care team needs support." copy="Share the role, location, schedule, and timing. Providence will review the need and coordinate an appropriate next conversation." />
    <section className="inquiry-overview"><div><p className="section-kicker">For care organizations</p><h2>Useful staffing details, without a lengthy intake.</h2><p>Providence welcomes inquiries from Ontario care organizations, including retirement and long-term care homes, hospices, hospitals, and home and community care providers.</p><p>These categories indicate the kinds of conversations we are open to—not a claim of an existing contract with every type of organization.</p></div><div className="inquiry-facts"><div><Users /><strong>Role & headcount</strong><span>Who you need and approximately how many.</span></div><div><MapPin /><strong>Location & setting</strong><span>Where the work takes place and the care environment.</span></div><div><CalendarDays /><strong>Schedule & timing</strong><span>Shift pattern, duration, and expected start.</span></div></div></section>
    <section className="contact-section focused-form-section"><div className="contact-context"><p className="section-kicker">Find staff</p><h2>Start a staffing conversation.</h2><p>Provide the core details below. Providence will use them to understand the request and follow up—not to imply that staffing is already confirmed.</p><div className="contact-reassurance"><ShieldCheck /><span><strong>Needs-led review</strong>We begin with the role, setting, schedule, and practical requirements.</span></div><div className="contact-reassurance"><HeartHandshake /><span><strong>Human follow-through</strong>A Providence team member can clarify details and discuss next steps.</span></div></div><div className="form-panel"><LeadForm market="canada" mode="organization" /></div></section>
  </MarketShell>;
}

function HealthcareWorkersPage() {
  return <MarketShell market="canada">
    <Hero market="canada" interior title="Bring your skills to the right care setting." copy="PSWs, RPNs, RNs, support workers, and other care professionals can share their qualifications, availability, and work interests with Providence Canada." />
    <section className="inquiry-overview worker-overview"><div><p className="section-kicker">For healthcare workers</p><h2>Let us understand what a suitable opportunity means to you.</h2><p>Tell us about your role, experience, Ontario location, availability, and preferred care environment. Providence can use that information when considering relevant staffing conversations.</p><p>This is an expression of interest, not a job application to a named opening and not a guarantee of placement.</p></div><div className="inquiry-facts"><div><Stethoscope /><strong>Role & qualifications</strong><span>Your professional background and relevant credentials.</span></div><div><Clock3 /><strong>Availability</strong><span>Full-time, part-time, casual, or flexible preferences.</span></div><div><Building2 /><strong>Preferred settings</strong><span>The care environments and locations that suit you.</span></div></div></section>
    <section className="roles-section"><SectionHeading eyebrow="Professionals we want to hear from" title="A focused set of care roles—with room for others." /><HealthcareRoleGrid /></section>
    <section className="contact-section focused-form-section"><div className="contact-context"><p className="section-kicker">Find work</p><h2>Share your healthcare work interests.</h2><p>Provide a concise overview. You do not need to upload a résumé at this stage; Providence can request supporting information later if an appropriate next step emerges.</p><div className="contact-reassurance"><ShieldCheck /><span><strong>Your information has a purpose</strong>Details are collected to respond and consider suitable opportunities.</span></div><div className="contact-reassurance"><Sparkles /><span><strong>No automatic promises</strong>Submitting interest does not create employment or guarantee placement.</span></div></div><div className="form-panel"><LeadForm market="canada" mode="worker" /></div></section>
  </MarketShell>;
}

function TelecomPage() {
  return <MarketShell market="canada">
    <Hero market="canada" interior photo={false} eyebrow="Telecom sales & marketing · Ontario" eyebrowIcon={RadioTower} title="We help telecom companies sell, and help customers find service." copy="Providence performs telesales, customer acquisition, and campaign work directly for telecom partners, and helps residential and business customers think through their connectivity options." />

    <section className="content-section page-intro"><Reveal><SectionHeading eyebrow="For telecom companies & business partners" title="Sales and customer-acquisition work, performed directly." copy="Providence's own team does the outreach, representation, and campaign work — we do not supply or place sales staff on behalf of another organization." /></Reveal><ServiceGrid market="canada" />
      <div className="telecom-audience-actions">
        <a className="button button-primary" href="/canada/contact?interest=Partner%20with%20Providence%20%28telecom%20company%29">Partner with Providence <ArrowUpRight /></a>
        <a className="button button-outline-dark" href="/canada/contact?interest=Partner%20with%20Providence%20%28telecom%20company%29">Discuss a sales campaign</a>
      </div>
    </section>

    <section className="grounded-note"><ShieldCheck /><div><p className="section-kicker">A clear distinction</p><h2>We sell and reach customers. We do not supply sales employees.</h2><p>Providence performs telesales, representation, and customer-acquisition work directly for telecom partners. We do not recruit, place, or supply sales workers or staff to another company — that is a different service, and not one Providence offers today.</p></div></section>

    <section className="canada-section canada-section-light" id="telecom-customers">
      <SectionHeading eyebrow="For telecom customers" title="Residential and business connectivity, coming into focus." copy="Providence is building toward offering telecom products directly to customers. Nothing below reflects pricing, carriers, or confirmed availability — only the kinds of needs we intend to help with once those relationships are in place." />
      <div className="telecom-customer-split">
        {telecomCustomerSegments.map((segment) => { const Icon = segment.icon; return <article key={segment.title}><Icon /><h3>{segment.title}</h3><p>{segment.text}</p><small>Products and availability to be confirmed.</small></article>; })}
      </div>
    </section>

    <section className="telecom-final-cta">
      <article>
        <p>I represent a telecom company</p>
        <h3>Partner With Providence</h3>
        <a className="text-link" href="/canada/contact?interest=Partner%20with%20Providence%20%28telecom%20company%29">Partner with Providence <ArrowUpRight /></a>
      </article>
      <article>
        <p>I'm looking for telecom services</p>
        <h3>Explore Solutions</h3>
        <a className="text-link" href="#telecom-customers">Explore solutions <ArrowRight /></a>
      </article>
      <article>
        <p>I'm looking for healthcare services</p>
        <h3>Explore Healthcare</h3>
        <a className="text-link" href="/canada">Explore healthcare <ArrowRight /></a>
      </article>
    </section>
  </MarketShell>;
}

function GhanaServicesPage() {
  return <MarketShell market="ghana">
    <Hero market="ghana" interior title="Your TV box service, from order to support." copy="Purchase, installation, service plans, and continuing help are organized as one straightforward experience." />
    <section className="content-section page-intro"><Reveal><SectionHeading eyebrow="Providence Ghana services" title="Everything around one focused service." copy="Providence Ghana currently focuses only on the TV box business, with clear pricing and support around that offer." /></Reveal><ServiceGrid market="ghana" /></section>
    <section className="ghana-offer-detail"><div><p className="section-kicker">One-time setup</p><h2>TV box sale & installation</h2><strong>$250</strong><p>Includes the TV box sale and professional installation. Providence confirms appointment details before the visit.</p><a className="button button-gold" href="/ghana/contact?interest=Order%20a%20TV%20box">Order a TV box <ArrowUpRight /></a></div><div className="detail-list"><article><Wrench /><h3>Installation</h3><p>Connection, setup, service activation, and a practical introduction to the box.</p></article><article><CircleHelp /><h3>Continuing help</h3><p>Support for plan questions, equipment assistance, and customer service after setup.</p></article></div></section>
    <section className="comparison-section"><SectionHeading eyebrow="Service plans" title="Monthly flexibility or three-month value." /><div className="comparison-table"><div className="comparison-row heading"><span>Plan</span><span>Service period</span><span>Customer price</span><span></span></div><div className="comparison-row"><strong>Monthly</strong><span>1 month</span><span>$50</span><a href="/ghana/contact?interest=Choose%20or%20renew%20a%20plan">Choose plan <ArrowRight /></a></div><div className="comparison-row"><strong>Three months</strong><span>3 months</span><span>$90</span><a href="/ghana/contact?interest=Choose%20or%20renew%20a%20plan">Choose plan <ArrowRight /></a></div></div></section>
    <GhanaFinalCta />
  </MarketShell>;
}

function AboutPage({ market }: { market: MarketName }) {
  return <MarketShell market={market}>
    <Hero market={market} interior title="One Providence. Two focused markets." copy="Providence operates across Canada and Ghana with distinct local services and one shared commitment to helpful, dependable communication." />
    <section className="about-story"><Reveal className="about-copy"><p className="section-kicker">Who we are</p><h2>Useful work begins with understanding what people need.</h2><p>In Canada, Providence now focuses primarily on healthcare staffing and recruitment: connecting care organizations with healthcare and care-support professionals through recruiting, matching, placement, and coordination. Telecom sales and marketing remain an active secondary service.</p><p>In Ghana, Providence continues to focus on its TV box offer, installation, service plans, and customer support. The services differ, but the standard is the same: listen carefully, communicate clearly, and organize the next step.</p></Reveal><div className="market-story-grid"><a href={market === 'canada' ? '/canada' : marketUrl('canada')}><HeartHandshake /><small>Canada</small><strong>Healthcare staffing & telecom</strong><ArrowUpRight /></a><a href={market === 'ghana' ? '/ghana' : marketUrl('ghana')}><Tv /><small>Ghana</small><strong>TV box sales, setup & support</strong><ArrowUpRight /></a></div></section>
    <section className="values-section"><SectionHeading eyebrow="What connects our work" title="A shared service standard." /><div className="value-grid">{storyValues.map((value) => { const Icon = value.icon; return <article key={value.title}><Icon /><h3>{value.title}</h3><p>{value.text}</p></article>; })}</div></section>
    <section className="truth-section"><Globe2 /><div><p className="section-kicker">Grounded, not overstated</p><h2>We say what Providence does—and leave unsupported claims out.</h2><p>This website does not claim confirmed staffing contracts, current job openings, guaranteed placements, carrier ownership, exclusive partnerships, invented customer numbers, or licence status. Verified details can be added as the business develops.</p></div></section>
    {market === 'canada' ? <CanadaFinalCta /> : <GhanaFinalCta />}
  </MarketShell>;
}

function ContactPage({ market }: { market: MarketName }) {
  return <MarketShell market={market}>
    <Hero market={market} interior title={market === 'ghana' ? 'Order, install, renew, or get help.' : 'Tell us which Providence Canada conversation you need.'} copy={markets[market].contactIntro} />
    <section className="contact-section"><div className="contact-context"><p className="section-kicker">Contact {markets[market].shortLabel}</p><h2>Tell us what brings you here.</h2><p>{markets[market].contactIntro}</p>{market === 'canada' && <div className="contact-path-links"><a href="/canada/care-organizations">Need staff? Use the organization form <ArrowRight /></a><a href="/canada/healthcare-workers">Looking for work? Use the worker form <ArrowRight /></a></div>}<div className="contact-reassurance"><ShieldCheck /><span><strong>Useful details only</strong>Your information is used to respond to this request.</span></div><div className="contact-reassurance"><Sparkles /><span><strong>Market-specific follow-up</strong>Your inquiry is routed as a {markets[market].name} request.</span></div>{market === 'ghana' && <div className="staff-callout"><small>Providence staff</small><p>Customer ordering is handled through this form. Staff access remains separate.</p><a href={GHANA_CRM_URL} target="_blank" rel="noreferrer">Staff CRM Login <ArrowUpRight /></a></div>}</div><div className="form-panel"><LeadForm market={market} /></div></section>
  </MarketShell>;
}

export function MarketPage({ market, section }: { market: MarketName; section: SiteSection }) {
  if (section === 'home') return market === 'canada' ? <CanadaHome /> : <GhanaHome />;
  if (market === 'canada') {
    if (section === 'healthcare-staffing' || section === 'services') return <HealthcareStaffingPage />;
    if (section === 'care-organizations') return <CareOrganizationsPage />;
    if (section === 'healthcare-workers') return <HealthcareWorkersPage />;
    if (section === 'telecom') return <TelecomPage />;
  }
  if (market === 'ghana' && section === 'services') return <GhanaServicesPage />;
  if (section === 'about') return <AboutPage market={market} />;
  return <ContactPage market={market} />;
}
