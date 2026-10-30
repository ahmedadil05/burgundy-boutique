import React from 'react';
import { notFound } from 'next/navigation';
import { policies } from '@/data/policies';
import { Language } from '@/lib/i18n';
import { ShieldCheck, Scale, FileText } from 'lucide-react';
import Link from 'next/link';

export function generateStaticParams() {
  const languages = ['ar', 'en'];
  const slugs = ['returns', 'shipping', 'privacy', 'terms'];

  const params: Array<{ lang: string; slug: string }> = [];
  languages.forEach((lang) => {
    slugs.forEach((slug) => {
      params.push({ lang, slug });
    });
  });

  return params;
}

export default async function PolicyPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const currentLang = (lang === 'en' ? 'en' : 'ar') as Language;

  if (!['returns', 'shipping', 'privacy', 'terms'].includes(slug)) {
    notFound();
  }

  const policyDoc = policies[slug as 'returns' | 'shipping' | 'privacy' | 'terms'][currentLang];
  const isAr = currentLang === 'ar';

  return (
    <div className="min-h-screen bg-cream py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-xs text-cocoa-muted">
          <Link href={`/${currentLang}`} className="hover:text-coral-warm">
            {isAr ? 'الرئيسية' : 'Home'}
          </Link>
          <span>/</span>
          <span className="text-cocoa-dark font-semibold">{policyDoc.title}</span>
        </nav>

        {/* Header Banner */}
        <div className="bg-blush-surface border border-peach-soft rounded-3xl p-6 sm:p-10 mb-10 shadow-sm">
          <div className="flex items-center gap-2.5 text-xs font-bold text-coral-warm mb-2">
            <Scale className="w-4 h-4" />
            <span>
              {isAr
                ? 'لوائح وزارة التجارة والصناعة بدولة قطر — قرار رقم 25 لسنة 2026'
                : 'Qatar Ministry of Commerce & Industry Regulations (Decision 25/2026)'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-cocoa-dark font-cairo">
            {policyDoc.title}
          </h1>
          <p className="mt-2 text-sm text-cocoa-muted leading-relaxed">
            {policyDoc.subtitle}
          </p>
          <div className="mt-4 pt-4 border-t border-peach-soft/60 flex items-center gap-4 text-[11px] text-cocoa-muted">
            <span>
              {isAr ? 'آخر تحديث رسمي:' : 'Last Updated:'} {policyDoc.lastUpdated}
            </span>
            <span className="text-emerald-700 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              {isAr ? 'موثق قانونياً' : 'Legally Verified'}
            </span>
          </div>
        </div>

        {/* Policy Sections */}
        <div className="space-y-8 bg-white/80 rounded-3xl p-6 sm:p-10 border border-peach-soft shadow-sm">
          {policyDoc.sections.map((section, idx) => (
            <div key={idx} className="pb-6 last:pb-0 border-b last:border-0 border-peach-soft/40">
              <h2 className="text-lg font-bold text-cocoa-dark mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-coral-warm shrink-0" />
                <span>{section.heading}</span>
              </h2>
              <div className="space-y-2.5 text-xs sm:text-sm text-cocoa-muted leading-relaxed">
                {section.body.map((para, pIdx) => (
                  <p key={pIdx}>{para}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Strip */}
        <div className="mt-8 text-center text-xs text-cocoa-muted">
          <p>
            {isAr
              ? 'هل لديكِ استفسار بخصوص هذه السياسة؟ يمكنكِ دائماً'
              : 'Have questions regarding this policy? You can always'}{' '}
            <Link
              href={`/${currentLang}/complaints`}
              className="text-coral-warm font-bold underline"
            >
              {isAr ? 'التواصل مع قسم حماية المستهلك' : 'Contact Consumer Care'}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
