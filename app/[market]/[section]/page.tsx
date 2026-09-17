import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MarketPage } from '@/components/market-pages';
import { isMarket, pageMeta, type MarketName, type SiteSection } from '@/lib/content';

const sections: Record<MarketName, SiteSection[]> = {
  canada: ['healthcare-staffing', 'care-organizations', 'healthcare-workers', 'telecom', 'services', 'about', 'contact'],
  ghana: ['services', 'about', 'contact'],
};

function isSection(market: MarketName, value: string): value is SiteSection {
  return sections[market].includes(value as SiteSection);
}

export async function generateMetadata({ params }: { params: Promise<{ market: string; section: string }> }): Promise<Metadata> {
  const { market, section } = await params;
  if (!isMarket(market) || !isSection(market, section)) return {};
  const meta = pageMeta[market][section];
  return meta ? { title: meta.title, description: meta.description } : {};
}

export default async function MarketSection({ params }: { params: Promise<{ market: string; section: string }> }) {
  const { market, section } = await params;
  if (!isMarket(market) || !isSection(market, section)) notFound();
  return <MarketPage market={market} section={section} />;
}
