import React from 'react';
import { BurgundyInteractiveApp } from '@/components/burgundy-app/BurgundyInteractiveApp';
import { Language } from '@/lib/i18n';

export function generateStaticParams() {
  return [{ lang: 'ar' }, { lang: 'en' }];
}

export default async function AppPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const currentLang = (lang === 'en' ? 'en' : 'ar') as Language;

  return <BurgundyInteractiveApp initialLang={currentLang} />;
}
