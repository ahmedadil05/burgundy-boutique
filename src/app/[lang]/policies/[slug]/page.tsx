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
    <div className="min-h-screen bg-canvas py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-xs text-slateText-secondary">
          <Link href={`/${currentLang}`} className="hover:text-burgundy">
            {isAr ? 'الرئيسية' : 'Home'}
          </Link>
          <span>/</span>
          <span className="text-burgundy font-semibold">{policyDoc.title}</span>
        </nav>

        {/* Header Banner */}
        <div className="bg-white border border-gold-hairline rounded-3xl p-6 sm:p-10 mb-10 shadow-luxury">
          <div className="flex items-center gap-2.5 text-xs font-bold text-burgundy mb-2">
            <Scale className="w-4 h-4 text-gold-line" />
            <span>
              {isAr
                ? 'لوائح وزارة التجارة والصناعة بدولة قطر — قرار رقم 25 لسنة 2026'
                : 'Qatar Ministry of Commerce & Industry Regulations (Decision 25/2026)'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-burgundy font-display">
            {policyDoc.title}
          </h1>
          <p className="mt-2 text-sm text-slateText-secondary leading-relaxed">
            {policyDoc.subtitle}
          </p>
          <div className="mt-4 pt-4 border-t border-gold-hairline flex items-center gap-4 text-[11px] text-slateText-secondary">
            <span>
              {isAr ? 'آخر تحديث رسمي:' : 'Last Updated:'} {policyDoc.lastUpdated}
            </span>
            <span className="text-emerald-800 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-gold-line" />
              {isAr ? 'موثق قانونياً' : 'Legally Verified'}
            </span>
          </div>
        </div>

        {/* Policy Sections */}
        <div className="space-y-8 bg-white rounded-3xl p-6 sm:p-10 border border-gold-hairline shadow-sm">
          {policyDoc.sections.map((section, idx) => (
            <div key={idx} className="pb-6 last:pb-0 border-b last:border-0 border-gold-hairline/60">
              <h2 className="text-lg font-bold text-burgundy mb-3 flex items-center gap-2 font-display">
                <FileText className="w-4 h-4 text-gold-line shrink-0" />
                <span>{section.heading}</span>
              </h2>
              <div className="space-y-2.5 text-xs sm:text-sm text-slateText-secondary leading-relaxed">
                {section.body.map((para, pIdx) => (
                  <p key={pIdx}>{para}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Strip */}
        <div className="mt-8 text-center text-xs text-slateText-secondary">
          <p>
            {isAr
              ? 'هل لديكِ استفسار بخصوص هذه السياسة؟ يمكنكِ دائماً'
              : 'Have questions regarding this policy? You can always'}{' '}
            <Link
              href={`/${currentLang}/complaints`}
              className="text-burgundy font-bold underline hover:text-burgundy-hover"
            >
              {isAr ? 'التواصل مع قسم حماية المستهلك' : 'Contact Consumer Care'}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
