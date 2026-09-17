import {
  BarChart3,
  BriefcaseBusiness,
  Cable,
  Headphones,
  Megaphone,
  PhoneCall,
  RadioTower,
  Router,
  Settings2,
  ShoppingBag,
  Sparkles,
  Tv,
  Users,
  Wrench,
} from 'lucide-react';

export type MarketName = 'canada' | 'ghana';
export type SiteSection = 'home' | 'services' | 'about' | 'contact';

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
    eyebrow: 'Telecom sales & growth support',
    heroTitle: 'Clear connections. Confident growth.',
    heroCopy: 'Providence helps people and businesses understand, select, and access practical telecom solutions—backed by thoughtful sales and campaign support.',
    primaryCta: 'Explore services',
    secondaryCta: 'Talk to our team',
    contactIntro: 'Tell us what you are trying to solve. We will start with the right conversation, not a one-size-fits-all pitch.',
    contactOptions: [
      'Internet or telecom inquiry',
      'Business consultation',
      'Telesales support',
      'Marketing or sales partnership',
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
      ['01', 'Understand the need', 'We clarify the customer, business goal, service need, and practical constraints.'],
      ['02', 'Shape the right path', 'We help narrow the available solution or build the right sales-support approach.'],
      ['03', 'Support the next move', 'We help carry the conversation forward with clear communication and organized follow-through.'],
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

export const pageMeta: Record<MarketName, Record<SiteSection, { title: string; description: string }>> = {
  canada: {
    home: { title: 'Providence Canada | Telecom Sales & Growth Support', description: 'Internet, telecom sales, telesales, marketing, consultation, and campaign support from Providence Canada.' },
    services: { title: 'Canada Services | Providence', description: 'Explore Providence Canada services for connectivity, telecom sales, telesales, marketing, consultation, and partnerships.' },
    about: { title: 'About Providence Canada', description: 'Learn how Providence brings helpful service, dependable communication, and practical technology support to Canada.' },
    contact: { title: 'Contact Providence Canada', description: 'Talk to Providence about a telecom inquiry, business consultation, telesales support, or sales partnership.' },
  },
  ghana: {
    home: { title: 'Providence Ghana | TV Box Sales, Installation & Support', description: 'Order a Providence TV box, arrange installation, choose a service plan, or get customer support in Ghana.' },
    services: { title: 'Ghana TV Box Services | Providence', description: 'TV box purchase, installation, monthly and three-month plans, and equipment support from Providence Ghana.' },
    about: { title: 'About Providence Ghana', description: 'Learn how Providence Ghana provides straightforward TV box setup, service, and continuing customer support.' },
    contact: { title: 'Order or Contact Providence Ghana', description: 'Order a TV box, request installation, renew a plan, or ask Providence Ghana for equipment support.' },
  },
};

export const storyValues = [
  { icon: Cable, title: 'Practical technology', text: 'We focus on technology that solves a clear need and is easier to understand and use.' },
  { icon: BarChart3, title: 'Dependable follow-through', text: 'Good service means organized communication before, during, and after the decision.' },
  { icon: Users, title: 'Helpful by design', text: 'We make room for questions and guide each person toward a sensible next step.' },
];

export function isMarket(value: string): value is MarketName {
  return value === 'canada' || value === 'ghana';
}
