import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTelecomServiceMeta, isTelecomService, TelecomServicePage } from '@/components/market-pages';

type DetailParams = { market: string; section: string; detail: string };

export async function generateMetadata({ params }: { params: Promise<DetailParams> }): Promise<Metadata> {
  const { market, section, detail } = await params;
  if (market !== 'canada' || !isTelecomService(section, detail)) return {};
  return getTelecomServiceMeta(section, detail) || {};
}

export default async function MarketServiceDetail({ params }: { params: Promise<DetailParams> }) {
  const { market, section, detail } = await params;
  if (market !== 'canada' || !isTelecomService(section, detail)) notFound();
  return <TelecomServicePage audience={section} service={detail} />;
}
