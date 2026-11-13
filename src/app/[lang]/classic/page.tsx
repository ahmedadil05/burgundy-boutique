import React from 'react';
import { Language } from '@/lib/i18n';
import { HomeContent } from '@/components/home/HomeContent';

export function generateStaticParams() {
  return [{ lang: 'ar' }, { lang: 'en' }];
}

export default async function ClassicHomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const currentLang = (lang === 'en' ? 'en' : 'ar') as Language;

  return <HomeContent lang={currentLang} />;
}
