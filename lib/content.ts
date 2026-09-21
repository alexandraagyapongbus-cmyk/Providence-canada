import {
  Accessibility,
  Award,
  BarChart3,
  BriefcaseBusiness,
  Building,
  Building2,
  Cable,
  CalendarCheck,
  CheckCircle2,
  ClipboardList,
  Clock3,
  FileCheck2,
  Handshake,
  Headphones,
  HeartHandshake,
  Home,
  Layers,
  MapPin,
  MapPinned,
  Megaphone,
  MessageCircle,
  Package,
  PhoneCall,
  RadioTower,
  Search,
  Settings2,
  ShoppingBag,
  Sparkles,
  Stethoscope,
  Store,
  TrendingUp,
  Tv,
  UserRoundCheck,
  Users,
  UtensilsCrossed,
  Wifi,
  Wrench,
  Zap,
} from 'lucide-react';

export type MarketName = 'canada' | 'ghana';
export type SiteSection = 'home' | 'residential' | 'business' | 'providers' | 'why-providence' | 'healthcare-staffing' | 'care-organizations' | 'healthcare-workers' | 'telecom' | 'services' | 'about' | 'contact';

export const GHANA_CRM_URL = 'https://providence-ghana-crm.agyapongalexandra.chatgpt.site';
export const MARKET_ORIGINS: Record<MarketName, string> = {
  canada: 'https://providencecanada.ca',
  ghana: 'https://providencecanadaltd.com',
};

export function marketUrl(market: MarketName, path = '') {
  return `${MARKET_ORIGINS[market]}/${market}${path}`;
}

export const markets = {
  canada: {
    name: 'Canada',
    shortLabel: 'Providence Canada',
    eyebrow: 'Internet, TV & telecom solutions · Ontario',
    heroTitle: 'Internet, TV, and telecom — sorted for home and business.',
    heroTagline: 'Compare available services from leading telecommunications providers, and let Providence help you find the right fit.',
    heroCopy: 'Providence Canada helps residential and business customers explore internet, TV, phone, and bundle options from the telecommunications providers we work with — with a person to talk to along the way.',
    primaryCta: 'For my home',
    secondaryCta: 'For my business',
    contactIntro: 'Tell us whether you need home services, business services, are a telecom provider, or have a healthcare inquiry. We will route your request to the right Providence Canada conversation.',
    contactOptions: [
      'Home telecom services',
      'Business telecom services',
      'Telecom provider / partnership inquiry',
      'Find staff for a care organization',
      'Explore healthcare work opportunities',
      'Healthcare staffing question',
      'General inquiry',
    ],
    services: [
      { icon: PhoneCall, title: 'Telesales & customer acquisition', text: 'Providence conducts the outbound and inbound sales conversations directly, from first contact through to close.' },
      { icon: Handshake, title: 'Sales representation', text: 'We represent a partner’s products and services directly to residential and business customers.' },
      { icon: Search, title: 'Lead generation & qualification', text: 'We build and qualify a pipeline so a partner’s own team spends time on the right conversations.' },
      { icon: Megaphone, title: 'Campaign execution', text: 'We plan and run the customer-acquisition campaign itself, not just the strategy behind it.' },
      { icon: TrendingUp, title: 'Business development', text: 'Identifying and pursuing new customer segments and channels on a partner’s behalf.' },
      { icon: RadioTower, title: 'Product & service promotion', text: 'Clear, compliant promotion of a partner’s offer to the right audience.' },
    ],
    process: [
      ['01', 'Understand the need', 'We learn about the role, location, schedule, timing, and priorities on either side of the staffing conversation.'],
      ['02', 'Identify a potential fit', 'We compare organizational needs with worker qualifications, interests, and availability.'],
      ['03', 'Coordinate the next step', 'Where there may be a suitable match, Providence helps organize the conversation and placement process.'],
    ],
  },
  ghana: {
    name: 'Ghana',
    shortLabel: 'Providence Ghana',
    eyebrow: 'TV box sales, setup & support',
    heroTitle: 'More to watch. Less to work out.',
    heroCopy: 'One TV box, professional installation, and straightforward service options—set up for easy entertainment at home.',
    primaryCta: 'Order a TV box',
    secondaryCta: 'Request installation',
    contactIntro: 'Order, arrange installation, renew your plan, or ask for help with your equipment. Choose the reason that fits and we will follow up.',
    contactOptions: [
      'Order a TV box',
      'Request installation',
      'Choose or renew a plan',
      'Equipment support',
      'General inquiry',
    ],
    services: [
      { icon: ShoppingBag, title: 'TV box purchase', text: 'A Providence TV box prepared for home entertainment and ready for professional setup.' },
      { icon: Wrench, title: 'Installation & setup', text: 'We connect the box, confirm internet access, complete setup, and help you get comfortable using it.' },
      { icon: Tv, title: 'Monthly service plan', text: 'A flexible month-to-month service option for $50.' },
      { icon: Sparkles, title: 'Three-month service plan', text: 'Three months of service for $90, giving you a longer service period at a lower total than three monthly renewals.' },
      { icon: Headphones, title: 'Customer support', text: 'Help for active customers who have a question or need assistance with their service.' },
      { icon: Settings2, title: 'Equipment & subscription help', text: 'Support for setup, plan choice, renewal, and common equipment questions.' },
    ],
    process: [
      ['01', 'Choose your service', 'Select the TV box and either the monthly or three-month plan.'],
      ['02', 'Send your request', 'Share your contact information and request an order or installation.'],
      ['03', 'Confirm your appointment', 'Providence follows up to confirm the details and installation time.'],
      ['04', 'Install & activate', 'Your box is connected, set up, and activated for service.'],
      ['05', 'Get ongoing support', 'Contact Providence when you need plan, subscription, or equipment assistance.'],
    ],
  },
} as const;

export const healthcareRoles = [
  { icon: HeartHandshake, title: 'Personal support workers', short: 'PSWs', text: 'Care and daily-living support across residential and community settings.' },
  { icon: Stethoscope, title: 'Registered practical nurses', short: 'RPNs', text: 'Practical nursing professionals for appropriate care environments and schedules.' },
  { icon: UserRoundCheck, title: 'Registered nurses', short: 'RNs', text: 'Registered nursing professionals for suitable clinical and care needs.' },
  { icon: Users, title: 'Support workers', short: 'Support', text: 'Daily-living and care-support roles across a range of settings.' },
  { icon: Accessibility, title: 'Developmental service workers', short: 'DSWs', text: 'Professionals supporting people with developmental disabilities.' },
  { icon: ClipboardList, title: 'Healthcare admin & support', short: 'Admin', text: 'Coordination, scheduling, and other support roles behind frontline care.' },
] as const;

export const careSettings = [
  { title: 'Residential care', text: 'Retirement homes and long-term care homes.' },
  { title: 'Clinical & comfort care', text: 'Hospitals and hospices where appropriate opportunities arise.' },
  { title: 'Home & community care', text: 'Organizations supporting people in their homes and communities.' },
] as const;

export const careIndustries = [
  { title: 'Long-term care & retirement', text: 'Residential homes providing ongoing care and daily support.' },
  { title: 'Home & community care', text: 'Organizations supporting people where they live.' },
  { title: 'Clinics & outpatient settings', text: 'Ambulatory and outpatient care environments.' },
  { title: 'Hospitals & hospices', text: 'Clinical and comfort-care settings where appropriate opportunities arise.' },
  { title: 'Health & community organizations', text: 'Other organizations delivering health or community-support services.' },
] as const;

export const staffingPrinciples = [
  { icon: Building2, title: 'Needs-led', text: 'Every conversation starts with the actual role, environment, schedule, and timing.' },
  { icon: HeartHandshake, title: 'Human matching', text: 'We look beyond a title to understand preferences and practical fit on both sides.' },
  { icon: UserRoundCheck, title: 'Clear next steps', text: 'Interest is coordinated carefully without promising a placement or staffing outcome.' },
] as const;

export const whyProvidence = [
  { icon: HeartHandshake, title: 'Thoughtful matching', text: 'We look past the job title to understand fit on both sides of the conversation.' },
  { icon: Clock3, title: 'Responsive recruitment', text: 'Inquiries are reviewed and followed up on promptly, not left to sit.' },
  { icon: Building2, title: 'Understanding employer needs', text: 'We take time to understand a role, setting, and schedule before suggesting a fit.' },
  { icon: UserRoundCheck, title: 'Candidate support', text: 'Healthcare professionals get clear communication throughout the process.' },
  { icon: MapPin, title: 'Ontario-focused', text: 'Our attention is on Ontario care organizations and the professionals who work here.' },
  { icon: Award, title: 'Quality-focused recruitment', text: 'We would rather coordinate the right conversation than rush a volume of them.' },
] as const;

export const candidateJourney = [
  ['01', 'Discover', 'Explore the healthcare roles Providence is currently recruiting for.', Search],
  ['02', 'Apply', 'Share your qualifications, experience, and availability with us.', FileCheck2],
  ['03', 'Get matched', 'Providence reviews potential fit with organizations seeking your role.', Handshake],
  ['04', 'Complete requirements', 'Provide the documentation or verification a specific opportunity requires.', ClipboardList],
  ['05', 'Connect & start', 'Meet the organization and take the next step when it is the right fit.', CalendarCheck],
] as const;

export const recruitmentServices = [
  { icon: Handshake, title: 'Permanent recruitment', text: 'Helping care organizations find, and healthcare professionals move into, permanent roles.' },
  { icon: MessageCircle, title: 'Staffing coordination', text: 'Coordinating conversations between organizations and available professionals for flexible coverage needs.' },
  { icon: BriefcaseBusiness, title: 'Employer consultation', text: 'Helping organizations think through role definitions, headcount, and timing before a search begins.' },
] as const;

export const residentialServices = [
  { icon: Wifi, title: 'Internet', text: 'Compare speed, usage, technology, and pricing options for your home.', anchor: 'internet' },
  { icon: Tv, title: 'TV', text: 'Channel packages, premium options, and equipment to fit how you watch.', anchor: 'tv' },
  { icon: PhoneCall, title: 'Home Phone', text: 'Calling features, voicemail, and long-distance options where available.', anchor: 'phone' },
  { icon: Layers, title: 'Bundles', text: 'Combine internet, TV, and phone for a single, simpler monthly bill.', anchor: 'bundles' },
] as const;

export const businessServices = [
  { icon: Wifi, title: 'Business Internet', text: 'Speed and reliability sized to your team, applications, and locations.', anchor: 'internet' },
  { icon: PhoneCall, title: 'Business Phone', text: 'Business lines, calling features, and options for growing teams.', anchor: 'phone' },
  { icon: Tv, title: 'TV', text: 'TV service for waiting rooms, common areas, and customer-facing spaces.', anchor: 'tv' },
  { icon: Cable, title: 'Connectivity', text: 'Network and connectivity options for single and multi-location businesses.', anchor: 'connectivity' },
  { icon: Package, title: 'Business Packages', text: 'Combined service packages built around what your business actually needs.', anchor: 'packages' },
] as const;

export const businessUseCases = [
  { icon: Building2, title: 'Office', text: 'Reliable connectivity for day-to-day business operations.' },
  { icon: Store, title: 'Retail', text: 'Point-of-sale, guest Wi-Fi, and dependable connectivity for storefronts.' },
  { icon: UtensilsCrossed, title: 'Restaurant', text: 'Connectivity for orders, payments, and guest experience.' },
  { icon: Stethoscope, title: 'Healthcare facility', text: 'Dependable connectivity for clinics and care settings.' },
  { icon: BriefcaseBusiness, title: 'Professional services', text: 'Connectivity built around calls, video, and cloud applications.' },
  { icon: MapPinned, title: 'Multi-location business', text: 'Consistent service and support across more than one address.' },
] as const;

export const howProvidenceWorksSteps = [
  ['01', 'Tell us what you need', 'Home or business, location, services, and priorities.', MessageCircle],
  ['02', 'We check available options', 'Providence identifies applicable services and packages from the providers we work with.', Search],
  ['03', 'Compare your options', 'See the relevant internet, TV, phone, or bundle choices side by side.', ClipboardList],
  ['04', 'Choose your service', 'Providence assists with the order once you have decided.', CheckCircle2],
  ['05', 'Get connected', 'Installation and activation proceed according to the applicable provider process.', Zap],
] as const;

export const whyBuyThroughProvidence = [
  { icon: Layers, title: 'Multiple providers in one place', text: 'One conversation instead of visiting several telecom websites.' },
  { icon: MessageCircle, title: 'Human assistance', text: 'Talk to someone who can explain the options in plain terms.' },
  { icon: Building, title: 'Residential + business expertise', text: 'Providence supports both home and business customers.' },
  { icon: UserRoundCheck, title: 'Help choosing the right package', text: 'We help you compare options rather than guess.' },
  { icon: Handshake, title: 'One point of contact', text: 'A single Providence contact through selection and setup.' },
] as const;

export const telecomCustomerSegments = [
  { icon: Home, title: 'Residential', text: 'Internet, phone, mobility, and other connectivity options for home customers, where Providence is an authorized provider.' },
  { icon: Building, title: 'Business', text: 'Business internet, network solutions, and connectivity for organizations, where Providence is an authorized provider.' },
] as const;

export const salesCampaignProcess = [
  ['01', 'Understand', 'We learn the product, the target customer, and the campaign goals before anything else.', Search],
  ['02', 'Plan', 'We define the sales approach, messaging, targeting, and customer journey.', ClipboardList],
  ['03', 'Reach', 'We engage prospective customers through the appropriate sales channels.', Megaphone],
  ['04', 'Connect', 'We understand customer needs and connect qualified customers with the right offering.', Handshake],
  ['05', 'Grow', 'We use campaign performance and learnings to improve targeting and execution over time.', TrendingUp],
] as const;

export const telecomWhyProvidence = [
  { icon: MessageCircle, title: 'Human customer conversations', text: 'Real conversations with prospective customers, not scripted noise.' },
  { icon: Settings2, title: 'Flexible campaign execution', text: 'Campaigns shaped around a partner’s product, timeline, and goals.' },
  { icon: Building, title: 'Residential + business focus', text: 'Providence works across both consumer and business customer segments.' },
  { icon: Award, title: 'Professional representation', text: 'Every customer conversation represents a partner’s brand carefully.' },
  { icon: UserRoundCheck, title: 'Customer-focused selling', text: 'We sell by understanding the customer’s actual need, not by pressure.' },
  { icon: Zap, title: 'Sales-oriented execution', text: 'Built to move from strategy into real outbound activity quickly.' },
] as const;

export const pageMeta: Record<MarketName, Partial<Record<SiteSection, { title: string; description: string }>>> = {
  canada: {
    home: { title: 'Providence Canada | Internet, TV & Telecom for Home and Business', description: 'Compare internet, TV, phone, and bundle options from the telecommunications providers Providence Canada works with, for residential and business customers across Ontario.' },
    residential: { title: 'Residential Internet, TV & Phone | Providence Canada', description: 'Explore internet, TV, home phone, and bundle options for your household.' },
    business: { title: 'Business Internet, Phone & Connectivity | Providence Canada', description: 'Explore business internet, phone, TV, connectivity, and package options for your organization.' },
    providers: { title: 'Our Provider Network | Providence Canada', description: 'The kinds of telecommunications providers Providence Canada works with to bring you service options.' },
    'why-providence': { title: 'Why Providence | Providence Canada', description: 'Why buy your telecom service through Providence Canada instead of going directly to a provider.' },
    'healthcare-staffing': { title: 'Healthcare Staffing (Developing Division) | Providence Canada', description: 'Recruiting, matching, placement, and staffing coordination for Ontario healthcare workers and care organizations — a developing second division of Providence Canada.' },
    'care-organizations': { title: 'Find Healthcare Staff | Providence Canada', description: 'Tell Providence Canada about your healthcare staffing needs, roles, locations, schedules, and timing.' },
    'healthcare-workers': { title: 'Find Healthcare Work | Providence Canada', description: 'Healthcare and care-support professionals can share qualifications, availability, and work interests with Providence Canada.' },
    telecom: { title: 'Partner With Providence | Telecom Sales & Customer Acquisition', description: 'Providence Canada performs telesales, sales representation, lead generation, campaign execution, and business development directly for telecom partners.' },
    services: { title: 'Healthcare Staffing (Developing Division) | Providence Canada', description: 'Recruiting, matching, placement, and staffing coordination for Ontario healthcare workers and care organizations.' },
    about: { title: 'About Providence Canada', description: 'Providence Canada helps residential and business customers find telecom services from the providers we work with, with healthcare staffing and recruitment as a developing second division.' },
    contact: { title: 'Contact Providence Canada', description: 'Contact Providence Canada about home or business telecom service, a provider partnership, or a healthcare inquiry.' },
  },
  ghana: {
    home: { title: 'Providence Ghana | TV Box Sales, Installation & Support', description: 'Order a Providence TV box, arrange installation, choose a service plan, or get customer support in Ghana.' },
    services: { title: 'Ghana TV Box Services | Providence', description: 'TV box purchase, installation, monthly and three-month plans, and equipment support from Providence Ghana.' },
    about: { title: 'About Providence Ghana', description: 'Learn how Providence Ghana provides straightforward TV box setup, service, and continuing customer support.' },
    contact: { title: 'Order or Contact Providence Ghana', description: 'Order a TV box, request installation, renew a plan, or ask Providence Ghana for equipment support.' },
  },
};

export const storyValues = [
  { icon: HeartHandshake, title: 'Human understanding', text: 'We begin with the people, priorities, and practical details behind each request.' },
  { icon: BarChart3, title: 'Dependable follow-through', text: 'Good service means organized communication before, during, and after a decision.' },
  { icon: Users, title: 'Helpful by design', text: 'We make room for questions and guide each person toward a sensible next step.' },
];

export function isMarket(value: string): value is MarketName {
  return value === 'canada' || value === 'ghana';
}
