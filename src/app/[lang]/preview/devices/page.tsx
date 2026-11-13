import React from 'react';
import { DeviceEmulator } from '@/components/preview/DeviceEmulator';
import { Language } from '@/lib/i18n';

export function generateStaticParams() {
  return [{ lang: 'ar' }, { lang: 'en' }];
}

export default async function DevicePreviewPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const currentLang = (lang === 'en' ? 'en' : 'ar') as Language;

  return <DeviceEmulator initialLang={currentLang} />;
}
