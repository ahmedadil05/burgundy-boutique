import React from 'react';
import { Metadata } from 'next';
import { Language } from '@/lib/i18n';
import { HomeContent } from '@/components/home/HomeContent';

export function generateStaticParams() {
  return [{ lang: 'ar' }, { lang: 'en' }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isAr = lang === 'ar';

  return {
    title: isAr
      ? 'بيرغندي | فخامة الثوب السوداني والعبايات المشغولة يدوياً في قطر'
      : 'BURGUNDY | Luxury Hand-Painted Sudanese Toubs & Artisan Wear in Qatar',
    description: isAr
      ? 'متجر بيرغندي في قطر للأزياء النسائية الفاخرة، الثياب السودانية والجلابيات المصنوعة من أفخر أنواع الفوال والحرير السويسري والمرسومة يدوياً.'
      : 'Qatar-based luxury atelier for authentic hand-painted Sudanese toubs and jalabiyas, crafted on imported Swiss voile and pure silk.',
    openGraph: {
      title: isAr ? 'بيرغندي - أزياء سودانية فاخرة' : 'BURGUNDY Luxury Artisan Wear',
      description: isAr ? 'أصالة الثوب السوداني بلمسة قطرية فاخرة' : 'Artisanal Sudanese Elegance in Qatar',
      url: `https://burgundy.qa/${lang}`,
      siteName: 'BURGUNDY',
      locale: isAr ? 'ar_QA' : 'en_US',
      type: 'website',
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const currentLang = (lang === 'en' ? 'en' : 'ar') as Language;

  return <HomeContent lang={currentLang} />;
}
