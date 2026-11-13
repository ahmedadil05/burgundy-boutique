import React from 'react';
import { notFound } from 'next/navigation';
import { Language, isRTL, getDirection } from '@/lib/i18n';
import { StoreProvider } from '@/lib/store';
import { CatalogProvider } from '@/lib/catalog-store';
import { AdsProvider } from '@/lib/ads-store';
import { CRMProvider } from '@/lib/crm-store';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Header } from '@/components/layout/Header';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { LegalFooter } from '@/components/layout/LegalFooter';
import { CookieBanner } from '@/components/compliance/CookieBanner';
import { WhatsAppFloat } from '@/components/common/WhatsAppFloat';

export function generateStaticParams() {
  return [{ lang: 'ar' }, { lang: 'en' }];
}

export default async function LanguageLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (lang !== 'ar' && lang !== 'en') {
    notFound();
  }

  const currentLang = lang as Language;
  const dir = getDirection(currentLang);

  return (
    <div lang={currentLang} dir={dir} className="flex flex-col min-h-screen">
      <StoreProvider initialLang={currentLang}>
        <CatalogProvider>
          <AdsProvider>
            <CRMProvider>
              {/* Top Announcement Ribbon */}
              <AnnouncementBar lang={currentLang} />

              {/* Sticky Header */}
              <Header lang={currentLang} />

              {/* Slide-over Luxury Cart Drawer */}
              <CartDrawer lang={currentLang} />

              {/* Main Content Area */}
              <main className="flex-1 pb-16 lg:pb-0">{children}</main>

              {/* Qatar Compliance Legal Footer */}
              <LegalFooter lang={currentLang} />

              {/* Mobile Phone App Bottom Dock */}
              <MobileBottomNav lang={currentLang} />

              {/* Global Compliance & Support Floaters */}
              <CookieBanner lang={currentLang} />
              <WhatsAppFloat lang={currentLang} />
            </CRMProvider>
          </AdsProvider>
        </CatalogProvider>
      </StoreProvider>
    </div>
  );
}
