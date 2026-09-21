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
    { key: 'internet', label: 'Internet', icon: <InternetIcon />, description: residentialServices[0].text, ctas: [{ label: 'Explore residential internet', href: '/canada/residential#internet' }, { label: 'Explore business internet', href: '/canada/business#internet' }] },
    { key: 'tv', label: 'TV', icon: <TvIcon />, description: residentialServices[1].text, ctas: [{ label: 'Explore TV', href: '/canada/residential#tv' }] },
    { key: 'phone', label: 'Phone', icon: <PhoneIcon />, description: residentialServices[2].text, ctas: [{ label: 'Explore home phone', href: '/canada/residential#phone' }, { label: 'Explore business phone', href: '/canada/business#phone' }] },
    { key: 'bundles', label: 'Home Bundles', icon: <BundlesIcon />, description: residentialServices[3].text, ctas: [{ label: 'Explore bundles', href: '/canada/residential#bundles' }] },
    { key: 'business', label: 'Business Solutions', icon: <ConnectivityIcon />, description: 'Connectivity, phone, and packages built around how your business operates.', ctas: [{ label: 'Explore business solutions', href: '/canada/business' }] },
  ];
  return <Reveal><ConnectExperienceSection items={items} /></Reveal>;
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

function ResidentialPage() {
  const details = [
    { anchor: 'internet', icon: residentialServices[0].icon, title: 'Internet — speed, usage, technology, and price', text: 'Compare download and upload speed, unlimited or capped usage, the connection technology available at your address, contract term, installation, and which provider serves your area.' },
    { anchor: 'tv', icon: residentialServices[1].icon, title: 'TV — channels, packages, and equipment', text: 'Compare package size, channel lineups, premium and sports options, streaming integration, and the equipment included.' },
    { anchor: 'phone', icon: residentialServices[2].icon, title: 'Home Phone — calling features', text: 'Compare calling areas, voicemail, caller ID, and long-distance options, which vary by provider and plan.' },
    { anchor: 'bundles', icon: residentialServices[3].icon, title: 'Bundles — combine services, simplify your bill', text: 'Internet + TV, Internet + Phone, or Internet + TV + Phone — compare bundle pricing against buying services separately.' },
  ];
  return <MarketShell market="canada">
    <Hero market="canada" interior title="Telecom that fits your home." copy="Explore internet, TV, phone, and bundle options — all through Providence." />
    <section className="canada-section canada-section-light">
      <div className="canada-compare-list">
        {details.map((d) => { const Icon = d.icon; return <article key={d.anchor} id={d.anchor}><Icon /><div><h3>{d.title}</h3><p>{d.text}</p></div></article>; })}
      </div>
    </section>
    <section className="canada-employer-band">
      <div><h2>Not sure what you need?</h2><p>Tell us about your household and we'll help you explore the available options.</p></div>
      <a className="button button-primary" href="/canada/contact?interest=Home%20telecom%20services">Check Availability <ArrowUpRight /></a>
    </section>
  </MarketShell>;
}

function BusinessPage() {
  const details = [
    { anchor: 'internet', icon: businessServices[0].icon, title: 'Business Internet — speed and reliability', text: 'Compare speed, reliability, and upload/download needs for your number of users, cloud applications, video calls, point-of-sale systems, and guest Wi-Fi.' },
    { anchor: 'phone', icon: businessServices[1].icon, title: 'Business Phone — lines and features', text: 'Compare business lines, VoIP, call forwarding, auto attendant, voicemail, and extensions, depending on what your provider offers.' },
    { anchor: 'tv', icon: businessServices[2].icon, title: 'TV — for customer-facing spaces', text: 'TV service for waiting rooms, common areas, and other customer-facing spaces.' },
    { anchor: 'connectivity', icon: businessServices[3].icon, title: 'Connectivity — single and multi-location', text: 'Network and connectivity options sized for one location or several.' },
    { anchor: 'packages', icon: businessServices[4].icon, title: 'Business Packages — combined and custom', text: 'Combined service packages built around what your business actually needs, rather than a one-size-fits-all plan.' },
  ];
  return <MarketShell market="canada">
    <Hero market="canada" interior title="Connectivity built around your business." copy="Tell Providence what your business needs, and we'll help you compare business internet, phone, TV, and connectivity options." />
    <section className="canada-section canada-section-light">
      <div className="canada-compare-list">
        {details.map((d) => { const Icon = d.icon; return <article key={d.anchor} id={d.anchor}><Icon /><div><h3>{d.title}</h3><p>{d.text}</p></div></article>; })}
      </div>
    </section>
    <section className="canada-section canada-section-tint">
      <Reveal><SectionHeading eyebrow="What kind of business do you run?" title="Tell us your business type — we'll guide you from there." /></Reveal>
      <div className="canada-industry-grid three-col">
        {businessUseCases.map((u) => { const Icon = u.icon; return <article key={u.title}><Icon /><h3>{u.title}</h3><p>{u.text}</p></article>; })}
      </div>
    </section>
    <section className="canada-employer-band">
      <div><h2>Ready for a business quote?</h2><p>Tell us your company, location, current provider, and the services you need — Providence will follow up with options.</p></div>
      <a className="button button-primary" href="/canada/contact?interest=Business%20telecom%20services">Get a Business Quote <ArrowUpRight /></a>
    </section>
  </MarketShell>;
}

function SolutionsPage() {
  const solutions = [
    { icon: residentialServices[0].icon, title: 'Internet', text: 'Reliable internet for your home or business, matched to how you actually use it.', href: '/canada/residential#internet' },
    { icon: residentialServices[1].icon, title: 'TV', text: 'Channels, packages, and equipment for how you watch, at home or in customer-facing spaces.', href: '/canada/residential#tv' },
    { icon: residentialServices[2].icon, title: 'Phone', text: 'Home and business phone service, with the features that fit how you communicate.', href: '/canada/residential#phone' },
    { icon: businessServices[3].icon, title: 'Connectivity', text: 'Network and connectivity solutions sized for one location or several.', href: '/canada/business#connectivity' },
    { icon: residentialServices[3].icon, title: 'Bundles', text: 'Combine services for a simpler bill, at home or as a custom business package.', href: '/canada/residential#bundles' },
  ];
  return <MarketShell market="canada">
    <Hero market="canada" interior title="Solutions for however you stay connected." copy="Internet, TV, phone, and connectivity — explore what Providence can help you with, for home or business." />
    <section className="canada-section canada-section-light">
      <div className="canada-compare-list">
        {solutions.map((s) => { const Icon = s.icon; return <a key={s.title} href={s.href} className="canada-compare-link"><Icon /><div><h3>{s.title}</h3><p>{s.text}</p></div></a>; })}
      </div>
    </section>
    <section className="canada-section canada-section-tint">
      <SectionHeading eyebrow="How service is delivered" title="Providence handles the details." copy="Providence works with underlying telecommunications providers to deliver these services. That relationship is disclosed where relevant to a specific offer, contract, or billing detail — Providence remains your point of contact throughout." />
    </section>
    <section className="canada-employer-band">
      <div><h2>Not sure where to start?</h2><p>Tell Providence what you need and we'll point you in the right direction.</p></div>
      <a className="button button-primary" href="/canada/contact?interest=General%20inquiry">Contact Providence <ArrowUpRight /></a>
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
