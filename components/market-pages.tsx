import Image from 'next/image';
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Check,
  CircleHelp,
  Clock3,
  Globe2,
  Headphones,
  HeartHandshake,
  Home,
  MapPin,
  RadioTower,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Tv,
  Users,
  Wrench,
} from 'lucide-react';
import { AnimatedWords } from '@/components/animated-words';
import { AudienceSplitSection, type AudiencePanel } from '@/components/audience-split';
import { ConnectExperienceSection, type ConnectItem } from '@/components/connect-experience';
import { ConnectionGraphic } from '@/components/connection-graphic';
import { InteractiveHero } from '@/components/interactive-hero';
import { InView } from '@/components/in-view';
import { LeadForm } from '@/components/lead-form';
import { MarketShell } from '@/components/market-shell';
import { Reveal } from '@/components/reveal';
import {
  businessServices,
  businessUseCases,
  candidateJourney,
  careIndustries,
  GHANA_CRM_URL,
  healthcareRoles,
  howProvidenceWorksSteps,
  markets,
  marketUrl,
  recruitmentServices,
  residentialServices,
  salesCampaignProcess,
  storyValues,
  telecomWhyProvidence,
  whyBuyThroughProvidence,
  whyProvidence,
  type MarketName,
  type SiteSection,
} from '@/lib/content';

function SectionHeading({ eyebrow, title, copy, light = false }: { eyebrow: string; title: string; copy?: string; light?: boolean }) {
  return <div className={`section-heading ${light ? 'light' : ''}`}><p className="section-kicker">{eyebrow}</p><h2>{title}</h2>{copy && <p>{copy}</p>}</div>;
}

function Hero({ market, interior = false, title, copy, photo = true, eyebrow, eyebrowIcon: EyebrowIcon, image, imageAlt }: { market: MarketName; interior?: boolean; title?: string; copy?: string; photo?: boolean; eyebrow?: string; eyebrowIcon?: typeof Stethoscope; image?: string; imageAlt?: string }) {
  const content = markets[market];
  const isCanada = market === 'canada';
  const headline = title || content.heroTitle;
  const defaultAlt = 'A business team collaborating around a table in a modern office';
  const canadaImage = image || '/providence-canada-telecom-hero-poster.jpg';
  const canadaAlt = imageAlt || defaultAlt;
  const showPhoto = isCanada ? photo : true;
  const Icon = EyebrowIcon || (isCanada ? RadioTower : Tv);
  return (
    <section className={`market-hero ${interior ? 'interior-hero' : ''} ${isCanada ? 'healthcare-hero' : ''} ${!showPhoto ? 'no-photo-hero' : ''}`}>
      {showPhoto && (
        <Image
          className="market-hero-image"
          src={isCanada ? canadaImage : '/providence-hero.png'}
          alt={isCanada ? canadaAlt : 'A family enjoying Providence Ghana TV services at home'}
          fill
          priority
          sizes="100vw"
        />
      )}
      <div className="market-hero-overlay" />
      {isCanada && <div className="hero-aurora" aria-hidden="true"><span /><span /></div>}
      <div className="market-hero-content">
        <p className="kicker"><Icon />{eyebrow || content.eyebrow}</p>
        <h1>{isCanada ? <AnimatedWords text={headline} /> : headline}</h1>
        <p className="hero-copy">{copy || content.heroCopy}</p>
        {!interior && !isCanada && (
          <div className="hero-actions">
            <a className="button button-gold" href="/ghana/contact?interest=Order%20a%20TV%20box">Order a TV box <ArrowUpRight /></a>
            <a className="button button-glass" href="/ghana/contact?interest=Request%20installation">Request installation</a>
          </div>
        )}
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

function StaffingProcess({ light = false }: { light?: boolean }) {
  return <InView className="process-grid">{markets.canada.process.map(([number, title, text]) => <article key={number} className={light ? 'on-light' : ''}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</InView>;
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

function AboutTeaserSection() {
  return <section className="canada-section canada-section-light">
    <div className="canada-about-teaser">
      <div>
        <SectionHeading eyebrow="About Providence" title="Connection, service, and choice — with a growing second division." copy="Providence Canada connects residential and business customers with internet, TV, and phone solutions, and is developing healthcare staffing and recruitment as an expanding second division." />
      </div>
      <a className="button button-dark" href="/canada/about">About Providence <ArrowRight /></a>
    </div>
  </section>;
}

function CanadaFinalCta() {
  return <section className="final-cta"><div><p className="section-kicker">Start the right conversation</p><h2>Need staff—or ready to explore healthcare work?</h2></div><div className="final-cta-actions"><a className="button button-primary" href="/canada/care-organizations">I'm looking for staff <ArrowUpRight /></a><a className="button button-outline-light" href="/canada/healthcare-workers">I'm looking for work</a></div></section>;
}

function WhatAreYouLookingForSection() {
  const [InternetIcon, TvIcon, PhoneIcon, BundlesIcon] = residentialServices.map((s) => s.icon);
  const ConnectivityIcon = businessServices[3].icon;
  const items: ConnectItem[] = [
    { key: 'internet', label: 'Internet', icon: <InternetIcon />, description: residentialServices[0].text, ctas: [{ label: 'Explore residential internet', href: '/canada/residential/internet' }, { label: 'Explore business internet', href: '/canada/business/internet' }] },
    { key: 'tv', label: 'TV', icon: <TvIcon />, description: residentialServices[1].text, ctas: [{ label: 'Explore TV', href: '/canada/residential/tv' }] },
    { key: 'phone', label: 'Phone', icon: <PhoneIcon />, description: residentialServices[2].text, ctas: [{ label: 'Explore home phone', href: '/canada/residential/home-phone' }, { label: 'Explore business phone', href: '/canada/business/phone' }] },
    { key: 'bundles', label: 'Home Bundles', icon: <BundlesIcon />, description: residentialServices[3].text, ctas: [{ label: 'Explore bundles', href: '/canada/residential/bundles' }] },
    { key: 'business', label: 'Business Solutions', icon: <ConnectivityIcon />, description: 'Connectivity, phone, and packages built around how your business operates.', ctas: [{ label: 'Explore business solutions', href: '/canada/business' }] },
  ];
  return <Reveal className="hero-followup"><ConnectExperienceSection items={items} /></Reveal>;
}

function ResidentialBusinessSplitSection() {
  const panels: [AudiencePanel, AudiencePanel] = [
    {
      key: 'home',
      kicker: 'For your home',
      title: 'Internet, TV, phone, and bundles.',
      media: { src: '/providence-canada-home-hero-poster.jpg', alt: 'A family relaxing on a sofa at home, using a laptop and a phone' },
      services: residentialServices.map((s) => { const Icon = s.icon; return { title: s.title, icon: <Icon /> }; }),
      ctaLabel: 'For My Home',
      ctaHref: '/canada/residential',
      accent: 'blue',
    },
    {
      key: 'business',
      kicker: 'For your business',
      title: 'Connectivity built around your operations.',
      media: { src: '/providence-canada-telecom-hero-poster.jpg', alt: 'A business team collaborating around a table in a modern office' },
      services: businessServices.map((s) => { const Icon = s.icon; return { title: s.title, icon: <Icon /> }; }),
      ctaLabel: 'For My Business',
      ctaHref: '/canada/business',
      accent: 'gold',
    },
  ];
  return <section className="canada-section canada-section-blue">
    <Reveal><SectionHeading light eyebrow="Residential & business" title="Whichever you're shopping for, Providence can help." /></Reveal>
    <AudienceSplitSection panels={panels} />
  </section>;
}

function SolutionsTeaserSection() {
  return <section className="canada-employer-band">
    <div><h2>One place for everything you need.</h2><p>Internet, TV, phone, and connectivity — see the full range of solutions Providence can help with, for home or business.</p></div>
    <a className="button button-primary" href="/canada/solutions">Explore Solutions <ArrowUpRight /></a>
  </section>;
}

function HowProvidenceWorksSection() {
  return <section className="canada-section canada-section-light">
    <Reveal><SectionHeading eyebrow="How Providence works" title="From what you need to getting connected." /></Reveal>
    <div className="canada-journey">
      {howProvidenceWorksSteps.map(([number, title, text, Icon]) => (
        <article key={number}><Icon /><span>{number}</span><h3>{title}</h3><p>{text}</p></article>
      ))}
    </div>
  </section>;
}

function WhyBuyThroughProvidenceSection() {
  return <section className="canada-section canada-section-tint">
    <Reveal><SectionHeading eyebrow="Why Providence" title="Why customers choose Providence." /></Reveal>
    <div className="canada-differentiator-grid">
      {whyBuyThroughProvidence.map((item, index) => { const Icon = item.icon; return <Reveal key={item.title} delay={index * 50}><article><Icon /><h3>{item.title}</h3><p>{item.text}</p></article></Reveal>; })}
    </div>
  </section>;
}

function HealthcareSecondaryDivisionSection() {
  return <section className="canada-section canada-section-light">
    <div className="canada-split reverse">
      <div className="canada-split-copy">
        <SectionHeading eyebrow="More from Providence" title="Healthcare staffing &amp; recruitment." copy="Providence Canada is also developing its healthcare staffing and recruitment capabilities in Ontario, connecting care organizations with healthcare professionals as that division grows." />
        <a className="button button-dark" href="/canada/healthcare-staffing">Explore healthcare <ArrowRight /></a>
      </div>
      <div className="canada-split-media">
        <Image src="/providence-canada-team.jpg" alt="A team of healthcare professionals in scrubs and coats walking together down a hospital corridor" fill sizes="(max-width: 800px) 100vw, 40vw" />
      </div>
    </div>
  </section>;
}

function HomeBusinessHealthcareFinalCta() {
  return <>
    <section className="canada-section canada-section-blue telecom-final-cta-intro">
      <SectionHeading light eyebrow="Get started" title="What brings you to Providence?" />
    </section>
    <section className="telecom-final-cta">
      <article>
        <p>I need home services</p>
        <h3>For My Home</h3>
        <a className="text-link" href="/canada/residential">Explore residential <ArrowRight /></a>
      </article>
      <article>
        <p>I need business services</p>
        <h3>For My Business</h3>
        <a className="text-link" href="/canada/business">Get a business quote <ArrowRight /></a>
      </article>
      <article>
        <p>I'm interested in healthcare</p>
        <h3>Explore Healthcare</h3>
        <a className="text-link" href="/canada/healthcare-staffing">Explore healthcare <ArrowRight /></a>
      </article>
    </section>
  </>;
}

function GhanaFinalCta() {
  return <section className="final-cta"><div><p className="section-kicker">Start the conversation</p><h2>Ready to set up your TV service?</h2></div><a className="button button-gold" href="/ghana/contact">Order or get support <ArrowUpRight /></a></section>;
}

function CanadaHome() {
  return <MarketShell market="canada">
    <InteractiveHero />
    <WhatAreYouLookingForSection />
    <ResidentialBusinessSplitSection />
    <SolutionsTeaserSection />
    <HowProvidenceWorksSection />
    <WhyBuyThroughProvidenceSection />
    <HealthcareSecondaryDivisionSection />
    <AboutTeaserSection />
    <HomeBusinessHealthcareFinalCta />
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
    <Hero market="canada" interior eyebrow="Healthcare staffing & recruitment · Ontario" eyebrowIcon={Stethoscope} image="/providence-canada-hero-poster.jpg" imageAlt="Healthcare professionals conferring in a hospital corridor" title="Healthcare staffing starts with understanding both sides." copy="Providence Canada is developing this division to support recruiting, matching, placement, and staffing coordination for care organizations and healthcare professionals across Ontario." />
    <section className="grounded-note"><ShieldCheck /><div><p className="section-kicker">A developing division</p><h2>Growing alongside our telecommunications business.</h2><p>Healthcare staffing and recruitment is a second, developing division of Providence Canada. We do not present regulated staffing or recruitment services as fully available until the relevant licensing is in place; an inquiry today helps us understand interest and plan ahead.</p></div></section>
    <ForOrganizationsSection />
    <ForProfessionalsSection />
    <ConnectionGraphic />
    <section className="roles-section"><SectionHeading eyebrow="Role groups" title="Clear enough to navigate. Flexible enough to listen." /><HealthcareRoleGrid /></section>
    <IndustriesSection />
    <section className="dark-section"><SectionHeading light eyebrow="Our coordination approach" title="Three practical stages, with no unsupported promises." /><StaffingProcess /></section>
    <WhyProvidenceSection />
    <RecruitmentServicesSection />
    <section className="grounded-note"><ShieldCheck /><div><p className="section-kicker">A clear starting point</p><h2>Interest begins a conversation.</h2><p>Providence does not present this site as a list of current job openings or confirmed client contracts. An inquiry helps us understand potential fit and next steps; it does not guarantee staffing, employment, or placement.</p></div></section>
    <CanadaFinalCta />
  </MarketShell>;
}

function CareOrganizationsPage() {
  return <MarketShell market="canada">
    <Hero market="canada" interior eyebrow="Healthcare staffing & recruitment · Ontario" eyebrowIcon={Stethoscope} image="/providence-canada-hero-poster.jpg" imageAlt="Healthcare professionals conferring in a hospital corridor" title="Tell us where your care team needs support." copy="Share the role, location, schedule, and timing. Providence will review the need and coordinate an appropriate next conversation." />
    <section className="inquiry-overview"><div><p className="section-kicker">For care organizations</p><h2>Useful staffing details, without a lengthy intake.</h2><p>Providence welcomes inquiries from Ontario care organizations, including retirement and long-term care homes, hospices, hospitals, and home and community care providers.</p><p>These categories indicate the kinds of conversations we are open to—not a claim of an existing contract with every type of organization.</p></div><div className="inquiry-facts"><div><Users /><strong>Role & headcount</strong><span>Who you need and approximately how many.</span></div><div><MapPin /><strong>Location & setting</strong><span>Where the work takes place and the care environment.</span></div><div><CalendarDays /><strong>Schedule & timing</strong><span>Shift pattern, duration, and expected start.</span></div></div></section>
    <section className="contact-section focused-form-section"><div className="contact-context"><p className="section-kicker">Find staff</p><h2>Start a staffing conversation.</h2><p>Provide the core details below. Providence will use them to understand the request and follow up—not to imply that staffing is already confirmed.</p><div className="contact-reassurance"><ShieldCheck /><span><strong>Needs-led review</strong>We begin with the role, setting, schedule, and practical requirements.</span></div><div className="contact-reassurance"><HeartHandshake /><span><strong>Human follow-through</strong>A Providence team member can clarify details and discuss next steps.</span></div></div><div className="form-panel"><LeadForm market="canada" mode="organization" /></div></section>
  </MarketShell>;
}

function HealthcareWorkersPage() {
  return <MarketShell market="canada">
    <Hero market="canada" interior eyebrow="Healthcare staffing & recruitment · Ontario" eyebrowIcon={Stethoscope} image="/providence-canada-hero-poster.jpg" imageAlt="Healthcare professionals conferring in a hospital corridor" title="Bring your skills to the right care setting." copy="PSWs, RPNs, RNs, support workers, and other care professionals can share their qualifications, availability, and work interests with Providence Canada." />
    <section className="inquiry-overview worker-overview"><div><p className="section-kicker">For healthcare workers</p><h2>Let us understand what a suitable opportunity means to you.</h2><p>Tell us about your role, experience, Ontario location, availability, and preferred care environment. Providence can use that information when considering relevant staffing conversations.</p><p>This is an expression of interest, not a job application to a named opening and not a guarantee of placement.</p></div><div className="inquiry-facts"><div><Stethoscope /><strong>Role & qualifications</strong><span>Your professional background and relevant credentials.</span></div><div><Clock3 /><strong>Availability</strong><span>Full-time, part-time, casual, or flexible preferences.</span></div><div><Building2 /><strong>Preferred settings</strong><span>The care environments and locations that suit you.</span></div></div></section>
    <section className="roles-section"><SectionHeading eyebrow="Professionals we want to hear from" title="A focused set of care roles—with room for others." /><HealthcareRoleGrid /></section>
    <section className="contact-section focused-form-section"><div className="contact-context"><p className="section-kicker">Find work</p><h2>Share your healthcare work interests.</h2><p>Provide a concise overview. You do not need to upload a résumé at this stage; Providence can request supporting information later if an appropriate next step emerges.</p><div className="contact-reassurance"><ShieldCheck /><span><strong>Your information has a purpose</strong>Details are collected to respond and consider suitable opportunities.</span></div><div className="contact-reassurance"><Sparkles /><span><strong>No automatic promises</strong>Submitting interest does not create employment or guarantee placement.</span></div></div><div className="form-panel"><LeadForm market="canada" mode="worker" /></div></section>
  </MarketShell>;
}

function TelecomPage() {
  return <MarketShell market="canada">
    <Hero market="canada" interior photo={false} eyebrow="Partner With Providence · Telecom Sales" title="We help telecom companies reach more customers." copy="Providence performs telesales, sales representation, lead generation, and campaign execution directly for telecom partners — this page is for telecom companies, not their customers." />

    <section className="canada-section canada-section-blue" style={{ paddingBottom: 0 }} id="overview">
      <SectionHeading light eyebrow="Overview" title="We connect telecom providers with the customers who need them." copy="Providence Canada performs the sales, telesales, and customer-acquisition work that brings telecommunications products and services to residential and business customers — directly, as our own team, not as supplied staff." />
    </section>
    <ConnectionGraphic
      ariaLabel="Telecom providers connect with residential and business customers through Providence's sales and customer-acquisition work"
      leftLabel="Telecom provider"
      leftSub="Products · services · offers"
      rightLabel="Customers"
      rightSub="Residential · business"
      caption="Sales, telesales, and customer-acquisition work — performed directly, on a partner's behalf."
    />

    <section className="content-section page-intro" id="capabilities"><Reveal><SectionHeading eyebrow="For telecom companies & business partners" title="Sales and customer-acquisition work, performed directly." copy="Telesales, customer acquisition, sales representation, lead generation, campaign execution, and business development — Providence's own team does the outreach and campaign work, and does not supply or place sales staff on behalf of another organization." /></Reveal><ServiceGrid market="canada" />
      <div className="telecom-audience-actions">
        <a className="button button-primary" href="/canada/contact?interest=Telecom%20provider%20%2F%20partnership%20inquiry">Partner with Providence <ArrowUpRight /></a>
        <a className="button button-outline-dark" href="/canada/contact?interest=Telecom%20provider%20%2F%20partnership%20inquiry">Discuss a sales campaign</a>
      </div>
    </section>

    <section className="grounded-note"><ShieldCheck /><div><p className="section-kicker">A clear distinction</p><h2>We sell and reach customers. We do not supply sales employees.</h2><p>Providence performs telesales, representation, and customer-acquisition work directly for telecom partners. We do not recruit, place, or supply sales workers or staff to another company — that is a different service, and not one Providence offers today.</p></div></section>

    <section className="canada-section canada-section-blue" id="sales-campaigns">
      <Reveal><SectionHeading light eyebrow="How a Providence sales campaign works" title="A clear process from strategy to results." /></Reveal>
      <div className="canada-journey">
        {salesCampaignProcess.map(([number, title, text, Icon]) => (
          <article key={number}><Icon /><span>{number}</span><h3>{title}</h3><p>{text}</p></article>
        ))}
      </div>
    </section>

    <section className="canada-section canada-section-tint">
      <Reveal><SectionHeading eyebrow="Why partner with Providence" title="A sales partner that pays attention to detail." /></Reveal>
      <div className="canada-differentiator-grid">
        {telecomWhyProvidence.map((item, index) => { const Icon = item.icon; return <Reveal key={item.title} delay={index * 50}><article><Icon /><h3>{item.title}</h3><p>{item.text}</p></article></Reveal>; })}
      </div>
    </section>

    <section className="canada-employer-band">
      <div><h2>Interested in working with Providence?</h2><p>Tell us about your company and the kind of sales support you're looking for.</p></div>
      <a className="button button-primary" href="/canada/contact?interest=Telecom%20provider%20%2F%20partnership%20inquiry">Partner With Providence <ArrowUpRight /></a>
    </section>
  </MarketShell>;
}

type TelecomAudience = 'residential' | 'business';

const residentialOverview = [
  { slug: 'internet', icon: residentialServices[0].icon, title: 'Home Internet', text: 'Choose around the number of people and devices in your home, what you do online, and what is available at your address.', image: '/service-images/residential-internet.png', alt: 'A family using connected devices together at home' },
  { slug: 'tv', icon: residentialServices[1].icon, title: 'TV', text: 'Start with what you actually watch—live channels, news, sports, family programming, or streaming—and then compare equipment and packages.', image: '/service-images/residential-tv.png', alt: 'A multigenerational family enjoying television together' },
  { slug: 'home-phone', icon: residentialServices[2].icon, title: 'Home Phone', text: 'Explore a dependable home line, calling features, voicemail, number transfer, and long-distance choices where available.', image: '/service-images/residential-phone.png', alt: 'A woman speaking on a home telephone' },
  { slug: 'bundles', icon: residentialServices[3].icon, title: 'Home Bundles', text: 'Bring internet, TV, and home phone into one conversation and compare the complete cost—not just the introductory price.', image: '/service-images/residential-bundles.png', alt: 'A couple reviewing home service options on a laptop' },
];

const businessOverview = [
  { slug: 'internet', icon: businessServices[0].icon, title: 'Business Internet', text: 'Match connectivity to your team size, cloud tools, video calls, payments, guest Wi-Fi, and operating hours.', image: '/service-images/business-connectivity.png', alt: 'A business team collaborating with connected technology' },
  { slug: 'phone', icon: businessServices[1].icon, title: 'Business Phone', text: 'Plan how calls should reach your team, including lines, extensions, forwarding, voicemail, and call handling.', image: '/service-images/business-connectivity.png', alt: 'A team working together in a connected office' },
  { slug: 'tv', icon: businessServices[2].icon, title: 'Business TV', text: 'Consider the viewing environment, content, screen locations, and account requirements for shared or customer-facing spaces.', image: '/service-images/business-customer-space.png', alt: 'A customer-facing business with television and point-of-sale service' },
  { slug: 'connectivity', icon: businessServices[3].icon, title: 'Business Connectivity', text: 'Think beyond one connection: offices, locations, Wi-Fi coverage, network dependencies, and room to grow.', image: '/service-images/business-connectivity.png', alt: 'A connected office team during a video meeting' },
  { slug: 'packages', icon: businessServices[4].icon, title: 'Business Packages', text: 'Combine the services your operation needs and review installation, equipment, billing, and support as one solution.', image: '/service-images/business-customer-space.png', alt: 'A modern business using connected customer service systems' },
];

function TelecomOverviewPage({ audience }: { audience: TelecomAudience }) {
  const residential = audience === 'residential';
  const services = residential ? residentialOverview : businessOverview;
  return <MarketShell market="canada">
    <Hero
      market="canada"
      interior
      title={residential ? 'Find the right services for your home.' : 'Build the right connection for your business.'}
      copy={residential ? 'Explore each service in detail, learn what matters before you compare, and tell Providence how your household actually uses technology.' : 'Start with how your organization works. Providence will help you translate users, locations, calls, customer spaces, and critical systems into the services worth comparing.'}
      image={residential ? '/service-images/residential-internet.png' : '/service-images/business-connectivity.png'}
      imageAlt={residential ? 'A family using internet-connected devices at home' : 'A Canadian business team using connected workplace technology'}
    />
    <section className="canada-section canada-section-light service-overview-section">
      <Reveal><SectionHeading eyebrow={residential ? 'Residential services' : 'Business services'} title="Choose a service to understand your options." copy="Each guide explains who the service is for, what to compare, which questions help narrow the choices, and what Providence needs to check availability." /></Reveal>
      <div className="service-journey-grid">
        {services.map((service, index) => { const Icon = service.icon; return <Reveal key={service.slug} delay={index * 45}><a className="service-journey-card" href={`/canada/${audience}/${service.slug}`}><div className="service-card-media"><Image src={service.image} alt={service.alt} fill sizes="(max-width: 800px) 100vw, 50vw" /></div><div className="service-card-copy"><span><Icon />{residential ? 'For your home' : 'For your business'}</span><h3>{service.title}</h3><p>{service.text}</p><strong>Explore {service.title} <ArrowRight /></strong></div></a></Reveal>; })}
      </div>
    </section>
    {!residential && <section className="canada-section canada-section-tint">
      <Reveal><SectionHeading eyebrow="Business context matters" title="The same service can look different in every operation." copy="Providence starts with how your organization functions, then checks what service options are available at the location or locations you provide." /></Reveal>
      <div className="canada-industry-grid three-col">{businessUseCases.map((u) => { const Icon = u.icon; return <article key={u.title}><Icon /><h3>{u.title}</h3><p>{u.text}</p></article>; })}</div>
    </section>}
    <section className="canada-employer-band">
      <div><h2>{residential ? 'Still not sure where to begin?' : 'Ready to describe your setup?'}</h2><p>{residential ? 'Tell us about your household, address, priorities, and current services. Providence can help narrow the next questions.' : 'Tell us your locations, team size, current services, critical tools, and the problems you want to solve.'}</p></div>
      <a className="button button-primary" href={`/canada/contact?interest=${residential ? 'Home%20telecom%20services' : 'Business%20telecom%20services'}`}>{residential ? 'Ask Providence' : 'Get a Business Quote'} <ArrowUpRight /></a>
    </section>
  </MarketShell>;
}

function ResidentialPage() { return <TelecomOverviewPage audience="residential" />; }
function BusinessPage() { return <TelecomOverviewPage audience="business" />; }

const telecomServiceDetails = {
  residential: {
    internet: {
      icon: residentialServices[0].icon, title: 'Home Internet', eyebrow: 'Residential · Internet', image: '/service-images/residential-internet.png', alt: 'A family using several internet-connected devices at home',
      intro: 'The right internet option begins with your address and how your household uses the connection—not with the biggest number on a plan.',
      fit: [['Everyday connection', 'Browsing, email, schoolwork, and a smaller number of connected devices.'], ['Busy household', 'Several people streaming, working, studying, or joining video calls at the same time.'], ['Performance-focused', 'Gaming, frequent large downloads, content creation, or work that depends on upload performance.']],
      compare: [['Availability at your address', 'The connection technologies and providers available can differ from one street or building to another.'], ['Download and upload needs', 'Streaming and downloads rely heavily on download speed; video calls, cloud backups, and sending large files also depend on upload performance.'], ['Usage and equipment', 'Ask whether usage is unlimited, what modem or router is supplied, and whether your home may need additional Wi-Fi coverage.'], ['Full cost and terms', 'Review installation, equipment, promotional periods, regular pricing, term commitments, and cancellation conditions before deciding.']],
      questions: ['How many people and devices are usually online?', 'Do you work or study from home?', 'Do you stream, game, or upload large files?', 'Where does Wi-Fi need to reach in your home?'],
      cta: 'Check home internet options', interest: 'Residential internet', related: [['TV', '/canada/residential/tv'], ['Home Bundles', '/canada/residential/bundles']],
    },
    tv: {
      icon: residentialServices[1].icon, title: 'TV', eyebrow: 'Residential · TV', image: '/service-images/residential-tv.png', alt: 'A family enjoying television together in their living room',
      intro: 'A useful TV package should reflect what your household watches, how you prefer to watch it, and which equipment you actually need.',
      fit: [['Live essentials', 'Local programming, news, and a focused selection of live channels.'], ['Sports and specialty', 'Households that care about specific leagues, languages, premium channels, or specialty programming.'], ['Flexible viewing', 'Families that want live television alongside on-demand or streaming access on more than one screen.']],
      compare: [['The channels that matter', 'Build your must-have list first. A larger channel count is not automatically a better fit.'], ['Live, on-demand, and streaming', 'Clarify how live channels, recordings, apps, and on-demand viewing work together.'], ['Screens and equipment', 'Consider how many televisions you use and whether each one requires a box, app, or other equipment.'], ['Package cost and changes', 'Review add-ons, equipment charges, promotional periods, and how easily the package can change later.']],
      questions: ['Which channels or programs are must-haves?', 'Do sports, news, specialty, or international channels matter?', 'How many televisions will use the service?', 'Do you want recording or on-demand features?'],
      cta: 'Explore TV options', interest: 'Residential TV', related: [['Home Internet', '/canada/residential/internet'], ['Home Bundles', '/canada/residential/bundles']],
    },
    'home-phone': {
      icon: residentialServices[2].icon, title: 'Home Phone', eyebrow: 'Residential · Home Phone', image: '/service-images/residential-phone.png', alt: 'A woman speaking on a cordless home telephone',
      intro: 'A dedicated home line can keep household calling simple. The details—number transfer, features, calling areas, and how the service operates—are what matter.',
      fit: [['Everyday household line', 'A shared number for family calls, appointments, schools, services, and household contacts.'], ['Feature-conscious calling', 'Households that value caller ID, voicemail, call waiting, or other available calling features.'], ['Frequent or long-distance calling', 'People who need to understand local calling areas and domestic or international options before choosing.']],
      compare: [['Keep or change your number', 'Ask whether an existing telephone number can be transferred and avoid cancelling the current line before transfer instructions are confirmed.'], ['Calling features', 'Confirm which features are included and which cost extra; availability varies by provider and plan.'], ['Long-distance details', 'Review rates, included destinations, calling limits, and any add-ons that match who you call.'], ['How the line operates', 'Ask how the service connects, what equipment it uses, and what happens during an internet or power interruption.']],
      questions: ['Do you want to keep an existing number?', 'Which calling features do you use?', 'Do you make long-distance or international calls?', 'Is the line used for household, accessibility, or emergency-related needs?'],
      cta: 'Discuss home phone service', interest: 'Home phone', related: [['Home Internet', '/canada/residential/internet'], ['Home Bundles', '/canada/residential/bundles']],
    },
    bundles: {
      icon: residentialServices[3].icon, title: 'Home Bundles', eyebrow: 'Residential · Bundles', image: '/service-images/residential-bundles.png', alt: 'A couple comparing home service options on a laptop',
      intro: 'A bundle is useful when the combination fits—not simply because several services appear on one offer. Compare the complete setup and the cost after any promotion.',
      fit: [['Internet + TV', 'For households that want connected viewing and live or packaged television.'], ['Internet + Home Phone', 'For households that want online service and a dedicated shared calling line.'], ['Internet + TV + Phone', 'For households that prefer to coordinate all three services through one conversation.']],
      compare: [['The services you will use', 'Remove features or services that do not solve a real household need before comparing totals.'], ['Bundle versus separate pricing', 'Compare the complete monthly cost, equipment, installation, and the price after introductory periods.'], ['Terms and flexibility', 'Understand commitment periods and what happens to pricing if one service is changed or removed.'], ['Installation and account details', 'Ask whether services are installed together, what equipment is required, and how billing and support are handled.']],
      questions: ['Which services do you already have?', 'What works well—and what needs to improve?', 'Which channels, calling features, or internet activities matter?', 'Are you comfortable with a term, or is flexibility more important?'],
      cta: 'Compare a home bundle', interest: 'Home bundle', related: [['Home Internet', '/canada/residential/internet'], ['TV', '/canada/residential/tv']],
    },
  },
  business: {
    internet: {
      icon: businessServices[0].icon, title: 'Business Internet', eyebrow: 'Business · Internet', image: '/service-images/business-connectivity.png', alt: 'A business team using connected technology in a modern office',
      intro: 'Business internet should be planned around the work that stops when the connection slows or fails—not around speed alone.',
      fit: [['Connected office', 'Email, cloud software, file sharing, video meetings, and day-to-day team collaboration.'], ['Customer transactions', 'Point-of-sale, online ordering, bookings, guest Wi-Fi, or other customer-facing systems.'], ['Demanding operations', 'Larger teams, frequent uploads, multiple simultaneous calls, or systems that depend on consistent performance.']],
      compare: [['Users and simultaneous activity', 'Count staff, devices, guests, video meetings, payments, cloud systems, and busy periods.'], ['Upload as well as download', 'Cloud backups, shared files, cameras, and video calls may make upload performance especially important.'], ['Continuity needs', 'Consider support expectations, backup options, and the operational impact of an outage.'], ['Location, installation, and terms', 'Service type, installation timing, equipment, commitments, and pricing depend on the address and provider.']],
      questions: ['How many staff and devices connect during busy periods?', 'Which systems cannot operate without internet?', 'Do customers or guests use your Wi-Fi?', 'Do you upload large files or rely on video calls?'],
      cta: 'Discuss business internet', interest: 'Business internet', related: [['Connectivity', '/canada/business/connectivity'], ['Business Packages', '/canada/business/packages']],
    },
    phone: {
      icon: businessServices[1].icon, title: 'Business Phone', eyebrow: 'Business · Phone', image: '/service-images/business-connectivity.png', alt: 'A connected team working together in a Canadian office',
      intro: 'Start with the customer calling experience and how your team handles calls. The right setup follows from that workflow.',
      fit: [['Direct business line', 'A clear company number and core calling features for a small operation.'], ['Team call handling', 'Extensions, forwarding, voicemail, or routing that helps calls reach the right person.'], ['Growing or distributed team', 'A more flexible calling setup for several staff, departments, locations, or remote work.']],
      compare: [['Call flow', 'Map what should happen when someone calls, when no one answers, and outside business hours.'], ['Numbers and extensions', 'Confirm how many lines, numbers, users, or extensions are required and whether existing numbers can transfer.'], ['Features and devices', 'Ask which calling features, desk phones, apps, headsets, or other equipment are included or supported.'], ['Reliability and support', 'Understand connectivity dependencies, installation, ongoing support, and the effect of power or internet interruptions.']],
      questions: ['How many people answer or place calls?', 'Do calls need menus, extensions, queues, or forwarding?', 'Do you want to keep existing numbers?', 'Will staff take calls away from the main location?'],
      cta: 'Plan business phone service', interest: 'Business phone', related: [['Business Internet', '/canada/business/internet'], ['Business Packages', '/canada/business/packages']],
    },
    tv: {
      icon: businessServices[2].icon, title: 'Business TV', eyebrow: 'Business · TV', image: '/service-images/business-customer-space.png', alt: 'A modern customer-facing business with a television in a shared area',
      intro: 'TV in a business should support the environment—whether that means news in a waiting area, sports in hospitality, or programming in a common space.',
      fit: [['Waiting and reception areas', 'Programming that helps create a comfortable experience while customers or visitors wait.'], ['Hospitality and shared spaces', 'Content selected for dining, lounge, fitness, staff, or other communal environments.'], ['Multiple screens or zones', 'Businesses that need to think through where screens are located and whether different spaces need different content.']],
      compare: [['Business use and content', 'Describe the setting, audience, operating hours, and must-have channels before comparing packages.'], ['Commercial account requirements', 'Business viewing can have different terms from residential service; confirm the applicable service and permissions.'], ['Screens and equipment', 'Count televisions, identify their locations, and ask what equipment or wiring each screen requires.'], ['Installation and ongoing changes', 'Plan installation around operations and clarify how channel, equipment, or location changes are handled.']],
      questions: ['What type of space will show television?', 'How many screens and viewing areas are involved?', 'Which content is important to customers or staff?', 'Are there different needs in different areas?'],
      cta: 'Discuss business TV', interest: 'Business TV', related: [['Business Internet', '/canada/business/internet'], ['Business Packages', '/canada/business/packages']],
    },
    connectivity: {
      icon: businessServices[3].icon, title: 'Business Connectivity', eyebrow: 'Business · Connectivity', image: '/service-images/business-connectivity.png', alt: 'A business team collaborating through connected workplace systems',
      intro: 'Connectivity planning brings the whole operating picture together: locations, coverage, devices, critical systems, and how the organization may grow.',
      fit: [['One location with coverage challenges', 'A business that needs reliable connectivity throughout offices, work areas, or customer spaces.'], ['Several sites', 'Organizations that want to review service needs consistently across multiple addresses.'], ['Operations with critical dependencies', 'Businesses whose cloud tools, payments, communications, or connected systems need careful planning.']],
      compare: [['The complete environment', 'Document locations, floor areas, users, devices, guest access, and systems that connect.'], ['Coverage and capacity', 'A fast connection does not automatically solve weak indoor coverage or congestion in busy areas.'], ['Resilience', 'Consider what a disruption would affect and whether backup or alternate connectivity should be discussed.'], ['Growth and support', 'Plan for new users, devices, locations, and the level of help your team expects after activation.']],
      questions: ['How many locations need service?', 'Where are current weak spots or disruptions?', 'Which systems are operationally critical?', 'What may change over the next year?'],
      cta: 'Review connectivity needs', interest: 'Business connectivity', related: [['Business Internet', '/canada/business/internet'], ['Business Packages', '/canada/business/packages']],
    },
    packages: {
      icon: businessServices[4].icon, title: 'Business Packages', eyebrow: 'Business · Packages', image: '/service-images/business-customer-space.png', alt: 'A modern business using phone, television, and point-of-sale technology',
      intro: 'A useful business package coordinates the services your operation genuinely needs and makes the costs, installation, equipment, and responsibilities clear.',
      fit: [['Internet + Phone', 'For organizations that want core connectivity and calling planned together.'], ['Internet + TV', 'For customer-facing businesses that need online systems and shared-screen programming.'], ['Multi-service or multi-location', 'For operations that need several services or addresses considered as one project.']],
      compare: [['Operational fit', 'Start with essential workflows and customer needs, then include only services that support them.'], ['Complete cost', 'Review recurring charges, equipment, installation, promotions, regular pricing, and optional features.'], ['Implementation', 'Clarify timing, site access, wiring, number transfers, equipment delivery, and how disruption will be minimized.'], ['Account and support structure', 'Understand billing, contacts, support paths, and what happens when the business changes a service or location.']],
      questions: ['Which services and locations are in scope?', 'What do you use today and what is not working?', 'Are there deadlines, moves, or opening dates?', 'Who will coordinate installation and account decisions?'],
      cta: 'Build a business package', interest: 'Business package', related: [['Business Internet', '/canada/business/internet'], ['Business Phone', '/canada/business/phone']],
    },
  },
} as const;

export type TelecomServiceSlug = keyof typeof telecomServiceDetails.residential | keyof typeof telecomServiceDetails.business;

export function isTelecomService(audience: string, service: string): audience is TelecomAudience {
  return (audience === 'residential' || audience === 'business') && service in telecomServiceDetails[audience];
}

export function getTelecomServiceMeta(audience: TelecomAudience, service: string) {
  if (!isTelecomService(audience, service)) return null;
  const detail = telecomServiceDetails[audience][service as keyof typeof telecomServiceDetails[typeof audience]];
  return { title: `${detail.title} | Providence Canada`, description: detail.intro };
}

export function TelecomServicePage({ audience, service }: { audience: TelecomAudience; service: string }) {
  if (!isTelecomService(audience, service)) return null;
  const detail = telecomServiceDetails[audience][service as keyof typeof telecomServiceDetails[typeof audience]];
  const Icon = detail.icon;
  return <MarketShell market="canada">
    <Hero market="canada" interior eyebrow={detail.eyebrow} eyebrowIcon={Icon} title={detail.title} copy={detail.intro} image={detail.image} imageAlt={detail.alt} />
    <section className="canada-section canada-section-light service-fit-section">
      <Reveal><SectionHeading eyebrow="Find your starting point" title={`Which ${detail.title.toLowerCase()} situation sounds closest?`} copy="These are guidance profiles, not fixed plans. Your address, provider availability, and the details you share determine which actual options can be considered." /></Reveal>
      <div className="service-fit-grid">{detail.fit.map(([title, text], index) => <Reveal key={title} delay={index * 60}><article><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article></Reveal>)}</div>
    </section>
    <section className="canada-section canada-section-tint service-compare-section">
      <div className="service-detail-split"><Reveal><div className="service-detail-intro"><p className="section-kicker">What to compare</p><h2>Look beyond the headline offer.</h2><p>Providence helps organize the details so you can understand the practical fit before you decide.</p></div></Reveal><div className="service-comparison-stack">{detail.compare.map(([title, text]) => <article key={title}><Check /><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div>
    </section>
    <section className="canada-section canada-section-blue service-questions-section">
      <div className="service-detail-split"><Reveal><div className="service-detail-intro"><p className="section-kicker">Before Providence checks options</p><h2>Four questions that make the conversation useful.</h2><p>You do not need technical answers. A clear picture of how the service will be used is the best place to begin.</p></div></Reveal><ol>{detail.questions.map((question, index) => <li key={question}><span>0{index + 1}</span><p>{question}</p></li>)}</ol></div>
    </section>
    <section className="canada-section canada-section-light service-next-step">
      <Reveal><SectionHeading eyebrow="What happens next" title="From needs to a clear next step." /></Reveal>
      <div className="service-process-grid"><article><span>01</span><h3>Tell us about the setup</h3><p>Share the address or locations, current services, priorities, and any timing considerations.</p></article><article><span>02</span><h3>Providence checks the fit</h3><p>We use those details to focus the conversation on relevant service options and the questions that still need answers.</p></article><article><span>03</span><h3>Review before you decide</h3><p>Compare availability, features, equipment, installation, pricing, and terms for the specific offer presented.</p></article></div>
    </section>
    <section className="canada-employer-band">
      <div><h2>{detail.cta}</h2><p>Tell Providence what you need. Availability, plans, pricing, and provider details are confirmed for the specific address and request.</p></div>
      <a className="button button-primary" href={`/canada/contact?interest=${encodeURIComponent(detail.interest)}`}>Start the conversation <ArrowUpRight /></a>
    </section>
    <section className="related-service-band"><p>Also explore</p>{detail.related.map(([label, href]) => <a href={href} key={label}>{label}<ArrowRight /></a>)}<a href={`/canada/${audience}`}>All {audience} services<ArrowRight /></a></section>
  </MarketShell>;
}

function SolutionsPage() {
  const problems = [
    { icon: RadioTower, title: 'Your speed still falls short', text: 'You have changed plans or equipment, but calls, streaming, uploads, or everyday work still feel slow.' },
    { icon: MapPin, title: 'Some rooms have little or no Wi-Fi', text: 'The connection works near the router but drops or weakens elsewhere in the home, office, or property.' },
    { icon: Building2, title: 'The building is difficult to cover', text: 'Multiple floors, thick walls, long corridors, separate units, or a large footprint make consistent coverage difficult.' },
    { icon: Wrench, title: 'The service is unstable', text: 'Devices disconnect, video calls freeze, or performance changes significantly throughout the day.' },
    { icon: CircleHelp, title: 'You have already tried the usual fixes', text: 'Restarting equipment, moving the router, changing plans, or calling the provider has not solved the underlying problem.' },
    { icon: Globe2, title: 'Your setup has more than one location', text: 'A business, multi-unit property, or growing operation needs a more coordinated view of connectivity.' },
  ];
  return <MarketShell market="canada">
    <Hero market="canada" interior eyebrow="Connection problems · Home & business" eyebrowIcon={Wrench} title="When the usual connection is not working." copy="Slow internet after repeated upgrades? Wi-Fi dead zones? A building that never seems to get reliable coverage? Providence helps you describe the real problem, separate service issues from in-building Wi-Fi issues, and explore a more suitable next step." image="/service-images/business-connectivity.png" imageAlt="A team using connected technology throughout a modern building" />
    <section className="canada-section canada-section-light">
      <Reveal><SectionHeading eyebrow="Does this sound familiar?" title="The problem may be bigger than choosing another plan." copy="If conventional provider support has not resolved the issue, Providence starts with the property, the equipment, and how the connection is actually being used." /></Reveal>
      <div className="canada-differentiator-grid solution-problem-grid">
        {problems.map((problem, index) => { const Icon = problem.icon; return <Reveal key={problem.title} delay={index * 45}><article><Icon /><h3>{problem.title}</h3><p>{problem.text}</p></article></Reveal>; })}
      </div>
    </section>
    <section className="canada-section canada-section-tint">
      <div className="canada-split solution-explainer">
        <Reveal><div className="canada-split-copy"><p className="section-kicker">An important distinction</p><h2>Internet to the building and Wi-Fi inside it are not the same problem.</h2><p>A provider may deliver service to the address while devices still struggle inside the space. Router location, building materials, layout, distance, interference, the number of users, and the equipment in use can all affect the experience.</p><p>Providence begins by understanding where the problem appears and what has already been tried. That helps avoid treating every issue as though a faster plan will automatically fix it.</p></div></Reveal>
        <div className="solution-layers" aria-label="Four layers Providence considers when reviewing a connection problem">
          <article><span>01</span><div><strong>Service to the property</strong><small>What reaches the address and which options are available there.</small></div></article>
          <article><span>02</span><div><strong>Equipment and placement</strong><small>How the modem, router, access points, and connected devices are arranged.</small></div></article>
          <article><span>03</span><div><strong>Building and coverage</strong><small>Size, floors, walls, distance, interference, and hard-to-reach areas.</small></div></article>
          <article><span>04</span><div><strong>Real-world demand</strong><small>Users, devices, calls, streaming, cloud tools, payments, and busy periods.</small></div></article>
        </div>
      </div>
    </section>
    <section className="canada-section canada-section-blue solution-process-section">
      <Reveal><SectionHeading light eyebrow="How Providence approaches it" title="Start with the problem—not another generic recommendation." copy="We organize the information needed to understand the situation, identify realistic avenues to explore, and help coordinate the next conversation." /></Reveal>
      <div className="solution-process-grid">
        <article><span>01</span><h3>Describe the symptoms</h3><p>Tell us what fails, where it fails, when it happens, and which activities are affected.</p></article>
        <article><span>02</span><h3>Map the environment</h3><p>We gather the address, building layout, service, equipment, users, devices, and fixes already attempted.</p></article>
        <article><span>03</span><h3>Separate the likely issues</h3><p>We distinguish questions about provider service, capacity, equipment, indoor coverage, or a more complex business setup.</p></article>
        <article><span>04</span><h3>Explore the next step</h3><p>Depending on availability and the situation, that may involve another service option, better coverage planning, or specialist assessment.</p></article>
      </div>
    </section>
    <section className="canada-section canada-section-light">
      <Reveal><SectionHeading eyebrow="What to have ready" title="A few details make the assessment more useful." copy="You do not need technical expertise. Photos, a simple floor-plan sketch, recent speed-test results, and a list of problem areas can help explain what is happening." /></Reveal>
      <div className="solution-prep-grid">
        <article><Home /><h3>The property</h3><p>Address, building type, approximate size, floors, units, and the rooms or areas with weak coverage.</p></article>
        <article><RadioTower /><h3>The current service</h3><p>Provider, plan if known, equipment, router location, and whether wired connections also have problems.</p></article>
        <article><Users /><h3>The demand</h3><p>Number of users and devices, critical activities, busy periods, and what acceptable performance would look like.</p></article>
        <article><Wrench /><h3>What you have tried</h3><p>Provider visits, plan changes, replacement equipment, extenders, relocation, or other attempted fixes.</p></article>
      </div>
    </section>
    <section className="grounded-note solution-grounded-note"><ShieldCheck /><div><p className="section-kicker">Clear expectations</p><h2>The right answer depends on the address and the cause.</h2><p>Providence does not promise that every property can be fixed with a particular provider, plan, or device. Recommendations depend on service availability and the information gathered. Some situations may require an on-site or specialist assessment before a solution can be confirmed.</p></div></section>
    <section className="telecom-final-cta two-up">
      <article><p>Home connection problem</p><h3>Tell us where your home service is struggling.</h3><a className="text-link" href="/canada/contact?interest=Home%20connection%20problem">Get connection help <ArrowRight /></a></article>
      <article><p>Business or building problem</p><h3>Describe the location, operations, and coverage issue.</h3><a className="text-link" href="/canada/contact?interest=Business%20or%20building%20connectivity%20problem">Discuss the site <ArrowRight /></a></article>
    </section>
  </MarketShell>;
}

function WhyProvidencePage() {
  return <MarketShell market="canada">
    <Hero market="canada" interior title="Why Providence?" copy="A straightforward answer to a fair question." />
    <section className="canada-section canada-section-light">
      <Reveal><SectionHeading eyebrow="Why Providence" title="One conversation. Multiple options." copy="You do not need to understand Mbps, fibre technology, bundles, or equipment specs. Providence helps you compare what is actually available and explains it in plain terms." /></Reveal>
      <div className="canada-differentiator-grid">
        {whyBuyThroughProvidence.map((item, index) => { const Icon = item.icon; return <Reveal key={item.title} delay={index * 50}><article><Icon /><h3>{item.title}</h3><p>{item.text}</p></article></Reveal>; })}
      </div>
    </section>
    <section className="telecom-final-cta two-up">
      <article><p>Ready to compare</p><h3>Explore Residential</h3><a className="text-link" href="/canada/residential">Explore residential <ArrowRight /></a></article>
      <article><p>Running a business</p><h3>Get a Business Quote</h3><a className="text-link" href="/canada/business">Get a business quote <ArrowRight /></a></article>
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
    <section className="about-story"><Reveal className="about-copy"><p className="section-kicker">Who we are</p><h2>Connection, service, and choice — built around what people need.</h2><p>In Canada, Providence connects residential and business customers with internet, TV, phone, and connectivity solutions — one conversation with Providence, with real people to help along the way. Healthcare staffing and recruitment is a developing second division, connecting care organizations with healthcare professionals as it grows.</p><p>In Ghana, Providence continues to focus on its TV box offer, installation, service plans, and customer support. The services differ, but the standard is the same: listen carefully, communicate clearly, and organize the next step.</p></Reveal><div className="market-story-grid"><a href={market === 'canada' ? '/canada' : marketUrl('canada')}><RadioTower /><small>Canada</small><strong>Telecom services & healthcare staffing</strong><ArrowUpRight /></a><a href={market === 'ghana' ? '/ghana' : marketUrl('ghana')}><Tv /><small>Ghana</small><strong>TV box sales, setup & support</strong><ArrowUpRight /></a></div></section>
    <section className="values-section"><SectionHeading eyebrow="What connects our work" title="A shared service standard." /><div className="value-grid">{storyValues.map((value) => { const Icon = value.icon; return <article key={value.title}><Icon /><h3>{value.title}</h3><p>{value.text}</p></article>; })}</div></section>
    <section className="truth-section"><Globe2 /><div><p className="section-kicker">Grounded, not overstated</p><h2>We say what Providence does—and leave unsupported claims out.</h2><p>This website does not claim confirmed provider partnerships, carrier authorization, staffing contracts, current job openings, guaranteed placements, licence status, invented customer numbers, or sales results. Verified details can be added as the business develops.</p></div></section>
    {market === 'canada' && <section className="canada-employer-band canada-employer-band-alt"><div><h2>Interested in partnering with Providence?</h2><p>Providence also performs telesales and customer-acquisition work directly for telecom companies.</p></div><a className="button button-dark" href="/canada/telecom">Partner With Providence <ArrowRight /></a></section>}
    {market === 'canada' ? <HomeBusinessHealthcareFinalCta /> : <GhanaFinalCta />}
  </MarketShell>;
}

function ContactPage({ market }: { market: MarketName }) {
  return <MarketShell market={market}>
    <Hero market={market} interior title={market === 'ghana' ? 'Order, install, renew, or get help.' : 'How can we help?'} copy={markets[market].contactIntro} />
    {market === 'canada' && <section className="canada-section canada-section-light" style={{ paddingBottom: 0 }}>
      <div className="canada-lookup-grid">
        <a className="canada-lookup-tile" href="/canada/contact?interest=Home%20telecom%20services"><Home /><span>I need home services</span></a>
        <a className="canada-lookup-tile" href="/canada/contact?interest=Business%20telecom%20services"><BriefcaseBusiness /><span>I need business services</span></a>
        <a className="canada-lookup-tile" href="/canada/contact?interest=Telecom%20provider%20%2F%20partnership%20inquiry"><RadioTower /><span>I'm a telecom provider / partner</span></a>
        <a className="canada-lookup-tile" href="/canada/contact?interest=General%20inquiry"><Sparkles /><span>Something else</span></a>
      </div>
    </section>}
    <section className="contact-section"><div className="contact-context"><p className="section-kicker">Contact {markets[market].shortLabel}</p><h2>Tell us what brings you here.</h2><p>{markets[market].contactIntro}</p>{market === 'canada' && <div className="contact-path-links"><a href="/canada/care-organizations">Need healthcare staff? Use the organization form <ArrowRight /></a><a href="/canada/healthcare-workers">Looking for healthcare work? Use the worker form <ArrowRight /></a></div>}<div className="contact-reassurance"><ShieldCheck /><span><strong>Useful details only</strong>Your information is used to respond to this request.</span></div><div className="contact-reassurance"><Sparkles /><span><strong>Market-specific follow-up</strong>Your inquiry is routed as a {markets[market].name} request.</span></div>{market === 'ghana' && <div className="staff-callout"><small>Providence staff</small><p>Customer ordering is handled through this form. Staff access remains separate.</p><a href={GHANA_CRM_URL} target="_blank" rel="noreferrer">Staff CRM Login <ArrowUpRight /></a></div>}</div><div className="form-panel"><LeadForm market={market} /></div></section>
  </MarketShell>;
}

export function MarketPage({ market, section }: { market: MarketName; section: SiteSection }) {
  if (section === 'home') return market === 'canada' ? <CanadaHome /> : <GhanaHome />;
  if (market === 'canada') {
    if (section === 'residential') return <ResidentialPage />;
    if (section === 'business') return <BusinessPage />;
    if (section === 'solutions') return <SolutionsPage />;
    if (section === 'why-providence') return <WhyProvidencePage />;
    if (section === 'healthcare-staffing' || section === 'services') return <HealthcareStaffingPage />;
    if (section === 'care-organizations') return <CareOrganizationsPage />;
    if (section === 'healthcare-workers') return <HealthcareWorkersPage />;
    if (section === 'telecom') return <TelecomPage />;
  }
  if (market === 'ghana' && section === 'services') return <GhanaServicesPage />;
  if (section === 'about') return <AboutPage market={market} />;
  return <ContactPage market={market} />;
}
