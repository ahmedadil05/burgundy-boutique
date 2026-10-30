import React from 'react';
import Link from 'next/link';
import { Language } from '@/lib/i18n';
import { Sparkles, Heart, Crown, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function generateStaticParams() {
  return [{ lang: 'ar' }, { lang: 'en' }];
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const currentLang = (lang === 'en' ? 'en' : 'ar') as Language;
  const isAr = currentLang === 'ar';

  return (
    <div className="min-h-screen bg-cream py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-blush-surface via-cream to-peach-soft/40 border border-peach-soft p-8 sm:p-14 text-center shadow-sm">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-white/80 text-coral-warm mb-4 border border-peach-deep/30">
            <Crown className="w-4 h-4 text-[#CBA05C]" />
            <span>{isAr ? 'روح الملكات الكنداكات' : 'The Kandaka Queen Legacy'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-cocoa-dark font-cairo leading-tight">
            {isAr
              ? 'قصة كنداكة.. حين تلتقي عراقة النيل بأناقة الحاضر'
              : 'The Kandaka Story: Nile Heritage, Modern Grace'}
          </h1>
          <p className="mt-4 text-sm sm:text-base text-cocoa-muted max-w-2xl mx-auto leading-relaxed">
            {isAr
              ? 'نحتفي بالمرأة السودانية كملكة وملهمة. نصنع أثواباً تجسد الهوية، الكبرياء، وحرارة التراث السوداني الأصيل لنساء قطر والخليج.'
              : 'Celebrating Sudanese women as modern queens. Curating exquisite toubs and artisanal modest couture with uncompromised craftsmanship.'}
          </p>
        </div>

        {/* Narrative Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold text-coral-warm uppercase tracking-wider">
              {isAr ? 'أصالة الثوب السوداني' : 'The Sudanese Toub'}
            </span>
            <h2 className="text-2xl font-bold text-cocoa-dark font-cairo">
              {isAr ? 'أكثر من مجرد رداء.. إنه رمز للهوية' : 'More Than Attire, A Cultural Identity'}
            </h2>
            <p className="text-xs sm:text-sm text-cocoa-muted leading-relaxed">
              {isAr
                ? 'يمتد تاريخ الثوب السوداني لآلاف السنين منذ حضارات كرمة ومروي القديمة. يتميز بطوله البالغ 4.5 أمتار وطريقة لفه المهيبة التي تمنح المرأة وقاراً وسحراً استثنائياً.'
                : 'Dating back millennia to Ancient Nubia and Meroe, the 4.5-meter Sudanese Toub is draped with unmatched dignity, representing generational heritage.'}
            </p>
            <p className="text-xs sm:text-sm text-cocoa-muted leading-relaxed">
              {isAr
                ? 'في بوتيك كنداكة، ننتقي الفوال السويسري الفاخر والحرير الطبيعي ونطرزه بأيدي حرفيات سودانيات متميزات، لنقدم لكِ قطعة أثرية تزين مناسباتكِ السعيدة.'
                : 'At Kandaka, we blend Swiss voile and pure silks with artisanal Sudanese embroidery to deliver heirloom pieces for your most memorable moments.'}
            </p>
          </div>

          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border-2 border-peach-soft shadow-warm">
            <img
              src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80"
              alt="Sudanese Model in Luxury Toub"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cocoa-dark/60 via-transparent to-transparent flex items-end p-6">
              <p className="text-white text-xs font-semibold">
                {isAr ? 'فخامة الفوال السويسري الملكي والتطريز اليدوي' : 'Royal Swiss Voile & Hand-Guided Embroidery'}
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white/80 p-6 rounded-3xl border border-peach-soft/80 shadow-sm text-center">
            <div className="w-12 h-12 bg-blush-surface text-coral-warm rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-cocoa-dark mb-1">
              {isAr ? 'أقمشة ملكية مختارة' : 'Curated Royal Fabrics'}
            </h3>
            <p className="text-xs text-cocoa-muted leading-relaxed">
              {isAr
                ? 'فوال سويسري وقطن مصري وحرير شيفون يضمن أعلى درجات النعومة وثبات الألوان.'
                : 'Finest Swiss voile, Egyptian cotton, and pure silk chiffon guaranteeing vibrant longevity.'}
            </p>
          </div>

          <div className="bg-white/80 p-6 rounded-3xl border border-peach-soft/80 shadow-sm text-center">
            <div className="w-12 h-12 bg-blush-surface text-coral-warm rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-cocoa-dark mb-1">
              {isAr ? 'دعم الحرفيات في السودان' : 'Empowering Artisans'}
            </h3>
            <p className="text-xs text-cocoa-muted leading-relaxed">
              {isAr
                ? 'كل ثوب يساهم في دعم ورش الحياكة والتطريز النسائية في الخرطوم والولايات.'
                : 'Every purchase sustains female artisan embroidery collectives across Sudan.'}
            </p>
          </div>

          <div className="bg-white/80 p-6 rounded-3xl border border-peach-soft/80 shadow-sm text-center">
            <div className="w-12 h-12 bg-blush-surface text-coral-warm rounded-2xl flex items-center justify-center mx-auto mb-3">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-cocoa-dark mb-1">
              {isAr ? 'معايير جودة قطرية' : 'Qatar Quality Standard'}
            </h3>
            <p className="text-xs text-cocoa-muted leading-relaxed">
              {isAr
                ? 'مرخصون رسمياً في دولة قطر مع ضمان استرجاع 14 يوماً وتوصيل فوري لباب منزلكِ.'
                : 'Fully licensed under Qatar MOCI with 14-day returns and 24-48 hr climate-controlled delivery.'}
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-blush-surface border border-peach-soft rounded-3xl p-8 text-center space-y-4">
          <h3 className="text-xl font-bold text-cocoa-dark font-cairo">
            {isAr ? 'مستعدة لاكتشاف أناقة التراث؟' : 'Ready to Experience Sudanese Elegance?'}
          </h3>
          <p className="text-xs sm:text-sm text-cocoa-muted max-w-md mx-auto">
            {isAr
              ? 'تصفحي تشكيلة الثياب والجلابيات الجديدة واختاري ما يليق بذوقكِ الرفيع.'
              : 'Browse our latest drops and select the piece that mirrors your regal poise.'}
          </p>
          <div className="pt-2">
            <Link href={`/${currentLang}/shop`}>
              <Button size="lg" variant="primary">
                {isAr ? 'استكشاف التشكيلة الآن' : 'Explore Collections'}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
