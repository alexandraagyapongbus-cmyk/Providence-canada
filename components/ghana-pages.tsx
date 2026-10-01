'use client';

import { useState, type ReactNode } from 'react';
import {
  BarChart3,
  Building2,
  Check,
  CircleDot,
  FileText,
  Globe2,
  Handshake,
  Landmark,
  Lightbulb,
  LineChart,
  MonitorPlay,
  Network,
  Play,
  Search,
  ShieldCheck,
  Target,
  Tv,
  Users,
} from 'lucide-react';
import { LeadForm } from '@/components/lead-form';
import { MarketShell } from '@/components/market-shell';
import {
  audiencePaths,
  focusIndustries,
  growthCycle,
  policyPlaceholders,
  programStages,
  servicePillars,
} from '@/lib/ghana-content';
import { GHANA_CRM_URL, type SiteSection } from '@/lib/content';

function Status({ children, kind = 'required' }: { children: ReactNode; kind?: 'required' | 'illustrative' | 'verified' }) {
  return <span className={`ghana-status ghana-status-${kind}`}>{children}</span>;
}

function PageHero({ eyebrow, title, copy, children }: { eyebrow: string; title: string; copy: string; children?: ReactNode }) {
  return <section className="ghana-page-hero">
    <div className="ghana-grid-field" aria-hidden="true" />
    <div className="ghana-page-hero-copy"><p className="ghana-eyebrow">{eyebrow}</p><h1>{title}</h1><p>{copy}</p>{children}</div>
    <div className="ghana-page-index" aria-hidden="true"><span>Research</span><span>Strategy</span><span>Implementation</span><span>Impact</span></div>
  </section>;
}

function VideoFrame({ title, duration, copy }: { title: string; duration: string; copy: string }) {
  return <figure className="ghana-video-frame" aria-label={`${title} film placeholder`}>
    <div className="ghana-video-screen">
      <div className="ghana-video-signal" aria-hidden="true"><span /><span /><span /></div>
      <div className="ghana-video-label"><MonitorPlay /><span>Film architecture</span></div>
      <div className="ghana-video-title"><small>{duration}</small><strong>{title}</strong></div>
      <div className="ghana-video-play" aria-hidden="true"><Play /></div>
    </div>
    <figcaption><Status>Professional footage required</Status><p>{copy}</p><details><summary>Transcript architecture</summary><p>A verified transcript and captions will be published with the final film.</p></details></figcaption>
  </figure>;
}

function MethodCycle({ compact = false }: { compact?: boolean }) {
  const [active, setActive] = useState(0);
  const phase = growthCycle[active];
  return <div className={`ghana-method ${compact ? 'ghana-method-compact' : ''}`}>
    <div className="ghana-method-rail" role="tablist" aria-label="Providence Enterprise Growth Framework">
      {growthCycle.map((item, index) => <button key={item.id} type="button" role="tab" aria-selected={active === index} onClick={() => setActive(index)}><span>{String(index + 1).padStart(2, '0')}</span>{item.label}</button>)}
    </div>
    <div className="ghana-method-detail" role="tabpanel"><p>Phase {String(active + 1).padStart(2, '0')}</p><h3>{phase.title}</h3><p>{phase.copy}</p><div className="ghana-method-loop"><span>Measure</span><span>Learn</span><span>Adapt</span><span>Implement</span></div></div>
  </div>;
}

function DiagnosticTree() {
  const [active, setActive] = useState('customer acquisition');
  const causes = ['customer acquisition', 'retention', 'pricing', 'production capacity', 'access to finance', 'internal process', 'management capacity', 'technology', 'distribution', 'market fit', 'regulation'];
  return <div className="diagnostic-tree">
    <div className="diagnostic-symptom"><small>Reported symptom</small><strong>“Revenue growth is below target.”</strong></div>
    <div className="diagnostic-branches" aria-label="Potential causes">{causes.map((cause) => <button type="button" key={cause} aria-pressed={active === cause} onClick={() => setActive(cause)}>{cause}</button>)}</div>
    <div className="diagnostic-reading"><Search /><div><small>Current line of inquiry</small><strong>{active}</strong><p>Evidence is gathered before this is accepted—or rejected—as a root constraint.</p></div></div>
  </div>;
}

function BaselineScorecard() {
  const rows = [
    ['Financial health', 42, 58, 68], ['Operational efficiency', 51, 61, 74], ['Market readiness', 38, 54, 70], ['Management capability', 55, 66, 77], ['Digital maturity', 31, 49, 65],
  ];
  return <div className="scorecard-wrap"><div className="scorecard-head"><div><Status kind="illustrative">Illustrative example</Status><h3>Enterprise Growth Scorecard</h3></div><p>Neutral demonstration data only. Real scores require a defined assessment, data source, period, and limitations.</p></div><div className="scorecard" role="table" aria-label="Illustrative enterprise growth scorecard"><div className="scorecard-row scorecard-labels" role="row"><span>Dimension</span><span>Baseline</span><span>6 months</span><span>12 months</span></div>{rows.map(([label, baseline, six, twelve]) => <div className="scorecard-row" role="row" key={String(label)}><strong>{label}</strong>{[baseline, six, twelve].map((value, index) => <span key={index}><i style={{ width: `${value}%` }} /><b>{value}</b></span>)}</div>)}</div></div>;
}

function InstitutionalHero() {
  return <section className="ghana-institutional-hero">
    <div className="ghana-grid-field" aria-hidden="true" />
    <div className="ghana-hero-copy"><p className="ghana-eyebrow">Business advisory & enterprise development · Africa</p><h1>Building stronger businesses.<br /><em>Growing African economies.</em></h1><p>Providence Ghana works with businesses, institutions, and development partners to understand enterprise constraints, design practical responses, support implementation, and measure what changes.</p><div className="ghana-hero-actions"><a className="ghana-button ghana-button-gold" href="/ghana/projects-impact">Explore our work</a><a className="ghana-button ghana-button-line" href="/ghana/partnerships">Partner with Providence</a></div></div>
    <div className="ghana-hero-media"><div className="ghana-hero-film"><div className="ghana-film-top"><span>Future flagship film</span><small>01:30</small></div><div className="ghana-film-center"><Play /><span>Who we are</span></div><p>Architecture ready for verified documentary footage, captions, poster imagery, and transcript.</p></div><div className="ghana-hero-proof"><span>01</span><p><strong>Evidence before prescription</strong>Research the enterprise and its market.</p><span>02</span><p><strong>Implementation beside management</strong>Turn decisions into accountable action.</p><span>03</span><p><strong>Measurement throughout</strong>Learn, adapt, and scale what works.</p></div></div>
  </section>;
}

function GhanaHome() {
  return <MarketShell market="ghana">
    <InstitutionalHero />
    <section className="ghana-audience-strip"><p>Built for several kinds of serious work</p><div>{audiencePaths.map(([title]) => <a key={title} href="/ghana/contact">{title}</a>)}</div></section>
    <section className="ghana-thesis-section"><div className="ghana-thesis-intro"><p className="ghana-eyebrow">How Providence thinks</p><h2>Research → Strategy → Implementation → Impact → Learning</h2></div><div className="ghana-thesis-columns"><article><Search /><span>Research</span><h3>Understand before prescribing.</h3><p>Use qualitative research, quantitative analysis, market intelligence, enterprise diagnostics, and direct observation according to the question.</p></article><article><Target /><span>Strategy</span><h3>Translate evidence into decisions.</h3><p>Identify the binding constraints, establish priorities, and co-design a roadmap grounded in the enterprise’s own operating reality.</p></article><article><Building2 /><span>Implementation</span><h3>Work alongside the organization.</h3><p>Structure initiatives around owners, indicators, milestones, resources, dependencies, and risks—not recommendations alone.</p></article><article><LineChart /><span>Impact</span><h3>Measure, learn, and adapt.</h3><p>Establish a baseline, review progress periodically, examine unintended outcomes, and improve delivery using evidence.</p></article></div></section>
    <section className="ghana-foundation-section"><div className="ghana-foundation-copy"><p className="ghana-eyebrow">Ghana: our foundation. Africa: our mandate.</p><h2>Depth in one market. Discipline in every new one.</h2><p>Providence’s operating experience in Ghana grounds its understanding of entrepreneurship, SMEs, infrastructure constraints, technology adoption, access to finance, employment, formalization, and growth.</p><blockquote>Ghana gives us depth. Regional research gives us breadth.</blockquote><p>Africa is not one market. Ghanaian experience is a foundation—not a substitute for local knowledge elsewhere.</p><a className="ghana-text-link" href="/ghana/about">Read our African perspective</a></div><div className="ghana-market-equation"><div><span>Ghanaian operating experience</span><b>+</b><span>Country-specific research</span><b>+</b><span>Local stakeholders</span><b>+</b><span>Sector expertise</span><b>+</b><span>Field evidence & economic data</span><strong>= Market-specific strategy</strong></div><small>No countries are marked as project locations until evidence is verified.</small></div></section>
    <section className="ghana-method-section"><div className="ghana-section-heading"><p className="ghana-eyebrow">The Providence Enterprise Growth Framework</p><h2>An iterative system for enterprise change.</h2><p>Not every engagement uses every instrument. The questions, evidence, and sequence are tailored to the enterprise, program, sector, and market.</p></div><MethodCycle compact /><a className="ghana-text-link" href="/ghana/methodology">Explore the full methodology</a></section>
    <section className="ghana-video-section"><div className="ghana-section-heading"><p className="ghana-eyebrow">Methodology on film</p><h2>Show the work—not only the outcome.</h2><p>The film system is ready to document interviews, field visits, analysis, workshops, implementation, periodic assessment, and learning without loading video before a visitor chooses to play it.</p></div><VideoFrame title="How Providence works" duration="2–3 minute film" copy="Final media will use real enterprises, real fieldwork, and verified Providence activity." /></section>
    <section className="ghana-services-editorial"><div className="ghana-section-heading"><p className="ghana-eyebrow">What we do</p><h2>Capabilities organized around the enterprise—not a menu of disconnected advice.</h2></div><div>{servicePillars.map((service) => <a key={service.number} href="/ghana/what-we-do"><span>{service.number}</span><h3>{service.title}</h3><p>{service.copy}</p></a>)}</div></section>
    <section className="ghana-program-band"><div><p className="ghana-eyebrow">For development & funding partners</p><h2>From program design to institutional reporting.</h2><p>Providence is building an operating model for structured enterprise-development programs involving cohorts of businesses, tailored technical assistance, implementation support, monitoring, evaluation, learning, and knowledge transfer.</p><a className="ghana-button ghana-button-gold" href="/ghana/development-programs">Explore development programs</a></div><ol>{programStages.slice(0, 7).map((stage, index) => <li key={stage}><span>{String(index + 1).padStart(2, '0')}</span>{stage}</li>)}</ol></section>
    <section className="ghana-evidence-section"><div className="ghana-section-heading"><p className="ghana-eyebrow">Projects & impact</p><h2>Evidence will be published with context—or not published at all.</h2><p>Case studies will document context, research, intervention, implementation, results, learning, and what happened next. Impact figures will include baselines, periods, sources, and limitations.</p></div><div className="ghana-evidence-empty"><Status>Verified project material required</Status><BarChart3 /><h3>No client metrics have been invented.</h3><p>The system is ready for substantiated projects, documentaries, datasets, and methodology notes as Providence supplies them.</p><a className="ghana-text-link" href="/ghana/projects-impact">View the impact architecture</a></div></section>
    <section className="ghana-other-business"><div><p className="ghana-eyebrow">Our other businesses</p><h2>Providence TV</h2><p>Providence Ghana continues to provide TV box sales, professional installation, service plans, renewals, and customer support through a separate commercial pathway.</p></div><a className="ghana-button ghana-button-dark" href="/ghana/providence-tv">Visit Providence TV</a></section>
    <section className="ghana-final-cta"><p>For businesses and institutions</p><h2>Begin with the problem, the evidence available, and the change you need to achieve.</h2><a className="ghana-button ghana-button-gold" href="/ghana/contact">Start a conversation</a></section>
  </MarketShell>;
}

function AboutPage() {
  return <MarketShell market="ghana"><PageHero eyebrow="About Providence Ghana" title="African enterprise expertise, grounded in evidence and built for implementation." copy="Providence Ghana is repositioning as a professional consulting, business advisory, enterprise-development, and implementation firm serving businesses and institutions across Africa." />
    <section className="ghana-editorial-split"><div><p className="ghana-eyebrow">Our purpose</p><h2>Stronger enterprises can build stronger economies.</h2></div><div><p>Providence studies businesses in context, turns evidence into decisions, supports implementation, measures outcomes, and transfers capability into the organizations it serves.</p><p>The firm’s Ghanaian operating experience provides depth. Work elsewhere begins with country-specific evidence, local stakeholders, sector knowledge, field research, and economic data.</p></div></section>
    <section className="ghana-foundation-section ghana-foundation-page"><div className="ghana-foundation-copy"><p className="ghana-eyebrow">Our African perspective begins with depth</p><h2>Africa is not one market.</h2><p>Ghana is an important foundation for understanding enterprise, entrepreneurship, employment, technology adoption, infrastructure, formalization, and regional trade. It is not treated as a proxy for Nigeria, Kenya, Côte d’Ivoire, Rwanda, Senegal, South Africa, or any other economy.</p></div><div className="ghana-market-principles"><article><Globe2 /><h3>Market-specific research</h3><p>Validate demand, institutions, regulation, customers, infrastructure, and competition locally.</p></article><article><Users /><h3>Local stakeholders</h3><p>Work with people and organizations that understand the market from direct experience.</p></article><article><Network /><h3>Contextual strategy</h3><p>Combine sector expertise and field evidence into recommendations designed for that market.</p></article></div></section>
    <section className="ghana-content-status"><div><Status>Content required</Status><h2>Leadership evidence is not yet supplied.</h2><p>Profiles will publish only verified biographies, professional experience, education, expertise, sectors, and geographic experience.</p><a className="ghana-text-link" href="/ghana/leadership">View leadership architecture</a></div><div><Status>Content required</Status><h2>Governance materials are being prepared.</h2><p>Policies and controls will not be represented as adopted until Providence provides approved documents.</p><a className="ghana-text-link" href="/ghana/governance">View governance architecture</a></div></section>
  </MarketShell>;
}

function WhatWeDoPage() {
  return <MarketShell market="ghana"><PageHero eyebrow="What we do" title="Enterprise advice that continues into action." copy="Providence brings research, strategy, implementation support, and measurement together around the needs of each business or program." />
    <section className="ghana-services-full">{servicePillars.map((service, index) => <article key={service.number}><header><span>{service.number}</span><h2>{service.title}</h2></header><p>{service.copy}</p><div className="ghana-service-lens"><small>Engagement lens</small><strong>{index % 3 === 0 ? 'What is constraining growth?' : index % 3 === 1 ? 'What evidence should guide the decision?' : 'What must change in practice?'}</strong></div></article>)}</section>
    <section className="ghana-caution-band"><ShieldCheck /><div><h2>Scope follows the evidence.</h2><p>Frameworks and instruments are selected to fit the engagement. Providence does not mechanically apply every method to every enterprise, and does not present regulated financial services it is not authorized to provide.</p></div></section>
  </MarketShell>;
}

function MethodologyPage() {
  return <MarketShell market="ghana"><PageHero eyebrow="Our approach" title="Understand. Diagnose. Build. Implement. Measure. Learn." copy="The Providence Enterprise Growth Framework is iterative: evidence changes decisions, implementation creates new evidence, and learning improves the next cycle." />
    <section className="ghana-method-section ghana-method-page"><div className="ghana-section-heading"><p className="ghana-eyebrow">Enterprise growth framework</p><h2>Eight connected phases. One continuous learning loop.</h2></div><MethodCycle /></section>
    <section className="ghana-research-grid"><div><p className="ghana-eyebrow">Discover</p><h2>Research methods are chosen for the question.</h2><p>Potential methods include executive, employee, customer, supplier, and stakeholder interviews; focus groups; field and workflow observation; financial and operational analysis; surveys; market datasets; benchmarking; value-chain mapping; customer segmentation; unit economics; market sizing; regulatory analysis; technology assessment; and supply-chain mapping.</p></div><div className="ghana-research-types"><article><Users /><h3>Qualitative</h3><p>Interviews, observation, focus groups, site visits, thematic analysis.</p></article><article><BarChart3 /><h3>Quantitative</h3><p>Finance, KPIs, surveys, productivity, sales, benchmarks, datasets.</p></article><article><Globe2 /><h3>Market & enterprise</h3><p>Competition, customers, value chains, economics, regulation, technology.</p></article></div></section>
    <section className="ghana-diagnostic-section"><div className="ghana-section-heading"><p className="ghana-eyebrow">Diagnose</p><h2>Do not confuse the symptom with the cause.</h2><p>This interactive model shows how one reported issue opens several lines of inquiry. It does not diagnose a real company.</p></div><Status kind="illustrative">Illustrative example</Status><DiagnosticTree /></section>
    <section className="ghana-scorecard-section"><div className="ghana-section-heading"><p className="ghana-eyebrow">Baseline & measure</p><h2>Progress needs a starting point.</h2><p>Scores, indicators, assessment periods, and evidence standards are defined for the engagement. The model below demonstrates the architecture only.</p></div><BaselineScorecard /></section>
    <section className="ghana-measure-timeline"><div><p className="ghana-eyebrow">Continuous evaluation</p><h2>Evaluation begins on day zero.</h2></div><ol><li><span>Day 0</span><strong>Baseline</strong></li><li><span>Day 30</span><strong>Early implementation review</strong></li><li><span>Day 90</span><strong>Progress assessment</strong></li><li><span>Month 6</span><strong>Outcomes assessment</strong></li><li><span>Month 12</span><strong>Impact evaluation</strong></li></ol><p>Schedules are illustrative and depend on the engagement. Each review asks what changed, what did not, why, what barriers emerged, and what should be adapted or scaled.</p></section>
    <section className="ghana-video-section"><VideoFrame title="The work behind the strategy" duration="Methodology film" copy="Future footage will document the real sequence from field research through implementation and measurement." /></section>
  </MarketShell>;
}

function ProgramsPage() {
  return <MarketShell market="ghana"><PageHero eyebrow="Enterprise development programs" title="Structured support for cohorts of businesses." copy="Providence’s program architecture is designed for institutions commissioning SME growth, entrepreneurship, capacity-building, investment-readiness, job-creation, and private-sector development initiatives." />
    <section className="ghana-program-flow"><ol>{programStages.map((stage, index) => <li key={stage}><span>{String(index + 1).padStart(2, '0')}</span><strong>{stage}</strong></li>)}</ol></section>
    <section className="ghana-program-capabilities"><article><Target /><h2>Program design</h2><p>Translate economic objectives into participant criteria, delivery models, indicators, learning questions, governance, and reporting requirements.</p></article><article><Building2 /><h2>Enterprise assessment</h2><p>Establish baselines and individual development priorities rather than applying one intervention to every company.</p></article><article><Users /><h2>Technical assistance</h2><p>Combine group capacity-building with one-on-one advisory and implementation support.</p></article><article><LineChart /><h2>Monitoring, evaluation & learning</h2><p>Track delivery, outputs, outcomes, assumptions, emerging barriers, and lessons for program adaptation.</p></article><article><FileText /><h2>Institutional reporting</h2><p>Structure transparent reporting around indicators, evidence sources, periods, populations, methods, and limitations.</p></article><article><Handshake /><h2>Knowledge transfer</h2><p>Build capability in participating enterprises and partner institutions so learning continues after the program.</p></article></section>
    <section className="ghana-mel-band"><div><p className="ghana-eyebrow">MEL — Monitoring, Evaluation & Learning</p><h2>Inputs → Activities → Outputs → Outcomes → Long-term impact</h2></div><p>Potential indicators may include revenue, productivity, jobs, finance, market expansion, exports, management capability, digital adoption, operational efficiency, survival, or investment readiness. The exact indicators must be defined and verified for the program.</p></section>
    <section className="ghana-content-status single"><div><Status>Credibility boundary</Status><h2>No program delivery history is claimed here.</h2><p>This page describes Providence’s proposed delivery architecture. Verified programs, funders, companies, countries, and outcomes will be added only when substantiated.</p></div></section>
  </MarketShell>;
}

function IndustriesPage() {
  return <MarketShell market="ghana"><PageHero eyebrow="Industries & enterprise contexts" title="Sector questions before sector claims." copy="Providence’s architecture can expand across industries, but depth will be represented only where qualified people, evidence, and engagement experience support it." />
    <section className="ghana-industry-list"><div className="ghana-section-heading"><Status kind="illustrative">Areas of focus — not claims of completed projects</Status><h2>Enterprise questions vary by sector.</h2></div>{focusIndustries.map(([title, copy], index) => <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{copy}</p></article>)}</section>
  </MarketShell>;
}

function ProjectsImpactPage() {
  const caseFields = ['The context', 'The challenge', 'The research', 'What we discovered', 'The intervention', 'Implementation', 'Results', 'What we learned', 'What happened next'];
  return <MarketShell market="ghana"><PageHero eyebrow="Projects & impact" title="Evidence with context, methods, and limits." copy="Providence will publish project stories as documented records of research, action, results, learning, and sustainability—not as promotional claims without evidence." />
    <section className="ghana-case-architecture"><div><Status>Verified project material required</Status><h2>Case-study architecture</h2><p>Each project can support documentary film, baseline data, cited evidence, and a transparent account of the work.</p></div><ol>{caseFields.map((field, index) => <li key={field}><span>{String(index + 1).padStart(2, '0')}</span>{field}</li>)}</ol></section>
    <section className="ghana-impact-explorer"><div className="ghana-section-heading"><p className="ghana-eyebrow">Impact explorer</p><h2>Designed for real data. Intentionally empty today.</h2></div><div className="impact-filter-row" aria-label="Future impact filters"><button disabled>Country</button><button disabled>Sector</button><button disabled>Program</button><button disabled>Year</button><button disabled>Intervention</button></div><div className="impact-empty"><BarChart3 /><Status>Content required</Status><h3>No verified impact dataset has been supplied.</h3><p>Future records can disclose what was measured, the period, population, baseline, data source, method, and limitations.</p></div></section>
  </MarketShell>;
}

function InsightsPage() {
  const themes = ['Financing challenges facing Ghanaian SMEs', 'Preparing African SMEs for institutional investment', 'Digital transformation among African SMEs', 'Expanding from Ghana into regional markets', 'Operating systems required as SMEs scale', 'Management capability and enterprise performance'];
  return <MarketShell market="ghana"><PageHero eyebrow="Insights & research" title="Evidence for the decisions enterprises and institutions face." copy="The Insights platform is structured for research, market intelligence, field notes, case studies, and perspectives with citations and downloadable reports where appropriate." />
    <section className="ghana-insight-lead"><div><Status>Editorial pipeline — not published research</Status><h2>Research themes Providence can develop.</h2></div><div>{themes.map((theme, index) => <article key={theme}><span>{['Research', 'Enterprise growth', 'Digital adoption'][index % 3]}</span><h3>{theme}</h3><p>Author, evidence, references, and publication date required before release.</p></article>)}</div></section>
    <section className="ghana-article-template"><FileText /><div><p className="ghana-eyebrow">Article architecture</p><h2>Executive introduction, evidence, charts, citations, and related research.</h2><p>The template supports serious analysis rather than a generic company blog. No sample article is presented as completed research.</p></div></section>
  </MarketShell>;
}

function PartnershipsPage() {
  return <MarketShell market="ghana"><PageHero eyebrow="Partnerships" title="Local depth for institutions pursuing measurable enterprise growth." copy="Providence welcomes conversations with development organizations, governments, funders, financial institutions, investors, corporations, universities, research organizations, foundations, and technical partners." ><div className="ghana-hero-actions"><a className="ghana-button ghana-button-gold" href="/ghana/contact?interest=Development%20%2F%20institutional%20partnership">Discuss a partnership</a></div></PageHero>
    <section className="ghana-partnership-models"><article><Landmark /><h2>Commissioned programs</h2><p>Design and deliver structured enterprise-support initiatives around defined economic objectives and transparent reporting.</p></article><article><Handshake /><h2>Implementation partnerships</h2><p>Contribute local operating knowledge, field delivery, enterprise advisory, monitoring, and adaptation within a broader program.</p></article><article><Search /><h2>Research collaboration</h2><p>Combine field research, enterprise evidence, sector expertise, academic or technical methods, and market-specific interpretation.</p></article><article><Network /><h2>Technical consortiums</h2><p>Work with complementary organizations where a mandate requires several specialist capabilities.</p></article></section>
    <section className="ghana-content-status single"><div><Status>Credibility boundary</Status><h2>Collaboration models, not claimed relationships.</h2><p>No funder, government, investor, university, NGO, or international organization is presented as a Providence partner until that relationship is verified and approved for publication.</p></div></section>
  </MarketShell>;
}

function LeadershipPage() {
  return <MarketShell market="ghana"><PageHero eyebrow="Leadership" title="Credentials will be specific, verifiable, and relevant to the work." copy="Providence’s leadership and advisor profiles will document the people accountable for strategy, delivery, technical quality, ethics, and institutional relationships." />
    <section className="ghana-leadership-placeholder"><Status>Content required</Status><Users /><h2>Leadership profiles have not yet been supplied.</h2><p>Each profile will include a verified name, position, biography, experience, education or qualifications, expertise, sectors, market experience, and professional link where appropriate.</p><div><span>Leadership</span><span>Consultants & advisors</span><span>Technical specialists</span></div></section>
  </MarketShell>;
}

function GovernancePage() {
  return <MarketShell market="ghana"><PageHero eyebrow="Governance & accountability" title="Institutional trust requires more than confident language." copy="Providence’s governance area is designed to publish approved policies, ownership, review dates, reporting routes, and accountability mechanisms as they are formally adopted." />
    <section className="ghana-policy-list"><div><Status>Content required</Status><h2>Policy publication register</h2><p>These are placeholders for documents Providence still needs to supply. Their presence does not imply adoption or certification.</p></div>{policyPlaceholders.map((policy) => <article key={policy}><ShieldCheck /><h3>{policy}</h3><span>Not yet published</span></article>)}</section>
  </MarketShell>;
}

function ProvidenceTvPage() {
  return <MarketShell market="ghana"><section className="ghana-tv-hero"><div><p className="ghana-eyebrow">A Providence Ghana commercial service</p><h1>Providence TV</h1><p>TV box sales, professional installation, flexible service plans, renewals, and customer support—kept clear and separate from Providence Ghana’s advisory and enterprise-development work.</p><div className="ghana-hero-actions"><a className="ghana-button ghana-button-gold" href="/ghana/contact?interest=Providence%20TV">Order or request support</a></div></div><Tv aria-hidden="true" /></section>
    <section className="ghana-tv-pricing"><article><small>One-time setup</small><strong>$250</strong><h2>TV box + installation</h2><p>Includes the TV box sale and professional installation. Providence confirms appointment details before the visit.</p></article><article><small>Monthly service</small><strong>$50</strong><h2>One month</h2><p>Renew month by month with support for service questions.</p></article><article><small>Three-month service</small><strong>$90</strong><h2>Three months</h2><p>One renewal for the full period, based on the supplied customer pricing.</p></article></section>
    <section className="ghana-tv-journey"><div><h2>From order to watching.</h2><p>Choose the service, send your request, confirm the appointment, complete installation and activation, then contact Providence when you need plan or equipment help.</p></div><ol>{['Choose your service', 'Send your request', 'Confirm your appointment', 'Install & activate', 'Get ongoing support'].map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, '0')}</span>{item}</li>)}</ol></section>
    <section className="ghana-other-business ghana-tv-support"><div><p className="ghana-eyebrow">Existing customers</p><h2>Need help with your box or plan?</h2><p>Use the contact form for equipment questions, plan selection, renewals, installation, or other customer service.</p></div><div><a className="ghana-button ghana-button-dark" href="/ghana/contact?interest=Providence%20TV">Contact TV support</a><a className="ghana-text-link" href={GHANA_CRM_URL} target="_blank" rel="noreferrer">Staff CRM login</a></div></section>
  </MarketShell>;
}

function ContactPage() {
  return <MarketShell market="ghana"><PageHero eyebrow="Contact Providence Ghana" title="Start with the conversation you need." copy="Choose business advisory, an institutional partnership, research collaboration, a general inquiry, or Providence TV. Your selection helps route the request appropriately." />
    <section className="ghana-contact-paths">{audiencePaths.slice(0, 3).map(([title, copy], index) => <article key={title}>{index === 0 ? <Building2 /> : index === 1 ? <Landmark /> : <Lightbulb />}<h2>{title}</h2><p>{copy}</p></article>)}<article><Tv /><h2>Providence TV</h2><p>Order a box, arrange installation, renew a plan, or request equipment support.</p></article></section>
    <section className="ghana-contact-form"><div><p className="ghana-eyebrow">Send an inquiry</p><h2>Useful context helps us prepare.</h2><p>Tell Providence who you represent, the challenge or opportunity, the market or sector involved, and your timing. Do not include confidential commercial information in this initial form.</p><div className="ghana-contact-note"><CircleDot /><span><strong>No automatic claims</strong>Submitting an inquiry does not imply a contract, partnership, or engagement.</span></div></div><div className="form-panel"><LeadForm market="ghana" /></div></section>
  </MarketShell>;
}

export function GhanaPage({ section }: { section: SiteSection }) {
  if (section === 'home') return <GhanaHome />;
  if (section === 'about') return <AboutPage />;
  if (section === 'what-we-do') return <WhatWeDoPage />;
  if (section === 'methodology') return <MethodologyPage />;
  if (section === 'development-programs') return <ProgramsPage />;
  if (section === 'industries') return <IndustriesPage />;
  if (section === 'projects-impact') return <ProjectsImpactPage />;
  if (section === 'insights') return <InsightsPage />;
  if (section === 'partnerships') return <PartnershipsPage />;
  if (section === 'leadership') return <LeadershipPage />;
  if (section === 'governance') return <GovernancePage />;
  if (section === 'providence-tv' || section === 'services') return <ProvidenceTvPage />;
  return <ContactPage />;
}
