import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MarketPage } from '@/components/market-pages';
import { isMarket, pageMeta, type SiteSection } from '@/lib/content';

const sections: SiteSection[] = ['services', 'about', 'contact'];

function isSection(value: string): value is SiteSection {
  return sections.includes(value as SiteSection);
}

export async function generateMetadata({ params }: { params: Promise<{ market: string; section: string }> }): Promise<Metadata> {
  const { market, section } = await params;
  if (!isMarket(market) || !isSection(section)) return {};
  return { title: pageMeta[market][section].title, description: pageMeta[market][section].description };
}

export default async function MarketSection({ params }: { params: Promise<{ market: string; section: string }> }) {
  const { market, section } = await params;
  if (!isMarket(market) || !isSection(section)) notFound();
  return <MarketPage market={market} section={section} />;
}
