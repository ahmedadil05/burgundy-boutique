import type { Metadata } from 'next';
import {
  Cairo,
  Tajawal,
  Playfair_Display,
  Inter,
  Amiri,
  Almarai,
  Cormorant_Garamond,
  Plus_Jakarta_Sans,
} from 'next/font/google';
import '../styles/globals.css';
import { siteConfig } from '../config/site';
import { SettingsProvider } from '../lib/settings-store';

const amiri = Amiri({
  subsets: ['arabic', 'latin'],
  variable: '--font-amiri',
  display: 'swap',
  weight: ['400', '700'],
});

const almarai = Almarai({
  subsets: ['arabic'],
  variable: '--font-almarai',
  display: 'swap',
  weight: ['300', '400', '700', '800'],
});

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
    <html
      className={`${amiri.variable} ${almarai.variable} ${cormorant.variable} ${jakarta.variable} ${cairo.variable} ${tajawal.variable} ${playfair.variable} ${inter.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-canvas text-slateText-body selection:bg-peach-sorbet selection:text-burgundy antialiased">
        <SettingsProvider>
          {children}
        </SettingsProvider>
      </body>
    </html>
  );
}
