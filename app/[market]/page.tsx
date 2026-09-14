import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MarketPage } from '@/components/market-pages';
import { isMarket, pageMeta } from '@/lib/content';

export async function generateMetadata({ params }: { params: Promise<{ market: string }> }): Promise<Metadata> {
  const { market } = await params;
  if (!isMarket(market)) return {};
  return { title: pageMeta[market].home.title, description: pageMeta[market].home.description };
}

export default async function MarketHome({ params }: { params: Promise<{ market: string }> }) {
  const { market } = await params;
  if (!isMarket(market)) notFound();
  return <MarketPage market={market} section="home" />;
}
