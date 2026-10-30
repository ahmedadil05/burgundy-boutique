import type { Metadata } from 'next';
import { Cairo, Tajawal, Playfair_Display, Inter } from 'next/font/google';
import '../styles/globals.css';
import { siteConfig } from '../config/site';

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
  display: 'swap',
  weight: ['400', '600', '700', '800', '900'],
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
  weight: ['400', '600', '700', '800'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: `${siteConfig.name.ar} | ${siteConfig.name.en}`,
  description: siteConfig.description.ar,
  metadataBase: new URL('https://kandaka.com.qa'),
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={`${cairo.variable} ${tajawal.variable} ${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col bg-cream text-cocoa-dark selection:bg-peach-soft selection:text-cocoa-dark antialiased">
        {children}
      </body>
    </html>
  );
}
