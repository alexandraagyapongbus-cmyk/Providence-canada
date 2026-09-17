import type { Metadata } from 'next';
import { Manrope, Space_Grotesk } from 'next/font/google';
import './globals.css';

const bodyFont = Manrope({ variable: '--font-body', subsets: ['latin'], display: 'swap' });
const displayFont = Space_Grotesk({ variable: '--font-display', subsets: ['latin'], display: 'swap' });

const description = 'Healthcare staffing and telecom services from Providence Canada, and TV box sales, installation, plans, and support from Providence Ghana.';

export const metadata: Metadata = {
  metadataBase: new URL('https://providence-canada-ghana.agyapongalexandra.chatgpt.site'),
  title: { default: 'Providence | Canada & Ghana', template: '%s' },
  description,
  icons: { icon: '/providence-logo-mark.png', shortcut: '/providence-logo-mark.png', apple: '/providence-logo-mark.png' },
  openGraph: {
    title: 'Providence | Canada & Ghana',
    description,
    type: 'website',
    images: [{ url: '/providence-logo.jpg', width: 500, height: 500, alt: 'Providence Canada Inc logo' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Providence | Canada & Ghana',
    description,
    images: ['/providence-logo.jpg'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${bodyFont.variable} ${displayFont.variable}`}>{children}</body></html>;
}
