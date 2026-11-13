import type { Metadata } from 'next';
import {
  Amiri,
  Cormorant_Garamond,
  Plus_Jakarta_Sans,
} from 'next/font/google';
import '../styles/globals.css';
import { siteConfig } from '../config/site';
import { SettingsProvider } from '../lib/settings-store';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const amiri = Amiri({
  subsets: ['arabic'],
  variable: '--font-amiri',
  display: 'swap',
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: `${siteConfig.name.en} | ${siteConfig.name.ar} - Hand-painted Luxury Sudanese Toubs`,
  description: siteConfig.description.ar,
  metadataBase: new URL('https://burgundy.com.qa'),
  openGraph: {
    title: 'BURGUNDY (@burgundy974_) | Hand-painted Sudanese Luxury Toubs',
    description: 'Bespoke hand-painted Sudanese toubs, jalabiyas, and scarves. Soft luxury, crafted for women in Qatar and the Gulf.',
    images: ['/brand/teaser-clean.jpg'],
  },
  icons: {
    // src/app/icon.svg (brand emblem) is auto-served by Next.js metadata conventions.
    icon: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      className={`${cormorant.variable} ${jakarta.variable} ${amiri.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-canvas text-slateText-body selection:bg-peach-sorbet selection:text-burgundy antialiased">
        <SettingsProvider>
          {children}
        </SettingsProvider>
      </body>
    </html>
  );
}
