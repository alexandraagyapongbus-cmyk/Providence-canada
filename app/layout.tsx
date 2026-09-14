import type { Metadata } from 'next';
import { Manrope, Space_Grotesk } from 'next/font/google';
import './globals.css';

const bodyFont = Manrope({ variable: '--font-body', subsets: ['latin'], display: 'swap' });
const displayFont = Space_Grotesk({ variable: '--font-display', subsets: ['latin'], display: 'swap' });

const description = 'Practical telecommunications, sales support, and home entertainment services from Providence Canada and Providence Ghana.';

export const metadata: Metadata = {
  metadataBase: new URL('https://providence-canada-ghana.agyapongalexandra.chatgpt.site'),
  title: { default: 'Providence | Canada & Ghana', template: '%s' },
  description,
  icons: { icon: '/favicon.svg', shortcut: '/favicon.svg' },
  openGraph: {
    title: 'Providence | Canada & Ghana',
    description,
    type: 'website',
    images: [{ url: '/og.png', width: 1733, height: 907, alt: 'Providence — Canada connected. Ghana entertained.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Providence | Canada & Ghana',
    description,
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${bodyFont.variable} ${displayFont.variable}`}>{children}</body></html>;
}
