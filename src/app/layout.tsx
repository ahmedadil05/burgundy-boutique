import type { Metadata } from 'next';
import { Cairo, Tajawal, Playfair_Display, Inter } from 'next/font/google';
import '../styles/globals.css';
import { siteConfig } from '../config/site';
import { SettingsProvider } from '../lib/settings-store';

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
  display: 'swap',
  weight: ['400', '600', '700', '800'],
});

const tajawal = Tajawal({
  subsets: ['arabic', 'latin'],
  variable: '--font-tajawal',
  display: 'swap',
  weight: ['400', '500', '700'],
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '600', '700', '800', '900'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
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
    icon: '/brand/teaser-clean.jpg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={`${cairo.variable} ${tajawal.variable} ${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col bg-canvas text-slateText-body selection:bg-peach-sorbet selection:text-burgundy antialiased">
        <SettingsProvider>
          {children}
        </SettingsProvider>
      </body>
    </html>
  );
}
