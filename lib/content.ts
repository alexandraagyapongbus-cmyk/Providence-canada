import {
  Accessibility,
  Award,
  BarChart3,
  BriefcaseBusiness,
  Building2,
  CalendarCheck,
  ClipboardList,
  Clock3,
  FileCheck2,
  Handshake,
  Headphones,
  HeartHandshake,
  MapPin,
  Megaphone,
  MessageCircle,
  PhoneCall,
  RadioTower,
  Router,
  Search,
  Settings2,
  ShoppingBag,
  Sparkles,
  Stethoscope,
  Tv,
  UserRoundCheck,
  Users,
  Wrench,
} from 'lucide-react';

export type MarketName = 'canada' | 'ghana';
export type SiteSection = 'home' | 'healthcare-staffing' | 'care-organizations' | 'healthcare-workers' | 'telecom' | 'services' | 'about' | 'contact';

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
    eyebrow: 'Healthcare staffing & recruitment · Ontario',
    heroTitle: 'Healthcare careers. Healthcare talent. One connection.',
    heroTagline: 'The right care starts with the right connection.',
    heroCopy: 'Providence Canada connects healthcare and care-support professionals with Ontario organizations seeking staff—through thoughtful recruiting, matching, placement, and staffing coordination.',
    primaryCta: 'Find staff',
    secondaryCta: 'Find work',
    contactIntro: 'Tell us whether you need healthcare staff, want to explore work opportunities, or have a telecom inquiry. We will route your request to the right Providence Canada conversation.',
    contactOptions: [
      'Find staff for a care organization',
      'Explore healthcare work opportunities',
      'Healthcare staffing question',
      'Internet or telecom inquiry',
      'Telecom sales or marketing partnership',
      'General inquiry',
    ],
    services: [
      { icon: Router, title: 'Internet & connectivity', text: 'Clear guidance to help customers and businesses understand suitable connectivity options.' },
      { icon: RadioTower, title: 'Telecommunications sales', text: 'Customer-focused sales support that makes complex telecom choices easier to navigate.' },
      { icon: PhoneCall, title: 'Telesales support', text: 'Structured outbound sales support for campaigns, follow-up, qualification, and customer conversations.' },
      { icon: Megaphone, title: 'Marketing & acquisition', text: 'Practical campaign support designed to reach, engage, and convert the right audiences.' },
      { icon: BriefcaseBusiness, title: 'Business telecom consultation', text: 'A useful starting point for businesses assessing telecom needs, options, and next steps.' },
      { icon: Users, title: 'Sales partnerships', text: 'Flexible support for telecom teams and campaigns that need extra sales capacity and coordination.' },
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

export const pageMeta: Record<MarketName, Partial<Record<SiteSection, { title: string; description: string }>>> = {
  canada: {
    home: { title: 'Providence Canada | Healthcare Staffing & Recruitment', description: 'Providence Canada connects healthcare workers with Ontario care organizations seeking staff, while continuing to offer telecom sales and marketing support.' },
    'healthcare-staffing': { title: 'Healthcare Staffing | Providence Canada', description: 'Recruiting, matching, placement, and staffing coordination for Ontario healthcare workers and care organizations.' },
    'care-organizations': { title: 'Find Healthcare Staff | Providence Canada', description: 'Tell Providence Canada about your healthcare staffing needs, roles, locations, schedules, and timing.' },
    'healthcare-workers': { title: 'Find Healthcare Work | Providence Canada', description: 'Healthcare and care-support professionals can share qualifications, availability, and work interests with Providence Canada.' },
    telecom: { title: 'Telecom Sales & Marketing | Providence Canada', description: 'Explore Providence Canada telecom guidance, telesales, customer acquisition, marketing, and campaign coordination.' },
    services: { title: 'Healthcare Staffing | Providence Canada', description: 'Recruiting, matching, placement, and staffing coordination for Ontario healthcare workers and care organizations.' },
    about: { title: 'About Providence Canada', description: 'Learn about Providence Canada healthcare staffing, recruitment, and secondary telecom services.' },
    contact: { title: 'Contact Providence Canada', description: 'Contact Providence Canada about healthcare staffing, healthcare work interests, or telecom services.' },
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
