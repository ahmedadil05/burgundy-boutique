import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { Language } from '@/lib/i18n';
import { Sparkles, Crown, Feather, Gem, MessageCircle, ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { BurgundyLogo } from '@/components/brand/BurgundyLogo';

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
      ? 'قصة الدار | بيرغندي أزياء سودانية فاخرة في قطر'
      : 'Atelier Story | BURGUNDY Sudanese Haute Couture in Qatar',
    description: isAr
      ? 'اكتشفي قصة دار بيرغندي: من عراقة الملكات الكنداكات وورشات الرسم اليدوي على النيل، إلى أرقى مجالس الدوحة.'
      : 'Discover the story of BURGUNDY Atelier: From ancient Nubian queen Kandaka and hand-painted silk artisans on the Nile, to contemporary luxury in Doha.',
  };
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
    <div className="min-h-screen bg-canvas text-slateText-body py-12 px-4 sm:px-6 lg:px-8 leaf-shadow-bg">
      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* ========================================================= */}
        {/* 1. HERO CHAPTER: THE WHISPER OF LUXURY                    */}
        {/* ========================================================= */}
        <section className="relative rounded-3xl overflow-hidden bg-white/90 border border-gold-hairline p-8 sm:p-16 text-center shadow-luxury">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-0 -start-10 w-72 h-72 rounded-full bg-surface-peachSoft/30 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 -end-10 w-80 h-80 rounded-full bg-peach-sorbet/25 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center">
            <BurgundyLogo variant="emblem" size="lg" className="mb-6" />

            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-canvas-warm/70 text-burgundy border border-gold-hairline mb-5">
              <Crown className="w-3.5 h-3.5 text-gold-line" />
              <span>{isAr ? 'إرث الملكات الكنداكات • النيل والدوحة' : 'The Kandaka Queen Legacy • Nile to Doha'}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-burgundy font-display leading-tight max-w-3xl tracking-tight">
              {isAr
                ? 'حين تلتقي عراقة النيل بأناقة الدوحة المعاصرة'
                : 'Where Nile Heritage Meets Contemporary Doha Grace'}
            </h1>

            <p className="mt-6 text-sm sm:text-base lg:text-lg text-slateText-secondary max-w-2xl leading-relaxed font-body">
              {isAr
                ? 'دار بيرغندي ليست مجرد متجر أزياء، بل هي أتيليه فني يحتفي بهوية الثوب السوداني كتحفة تشكيلية متفردة، صُنعت بأيدي فنانات سودانيات من خيوط الفوال السويسري الفاخر وحرير الكريب الصيني، لتتألق بها سيدات قطر والخليج.'
                : 'BURGUNDY is not merely a fashion label; it is a fine art atelier celebrating the Sudanese Toub as an authentic canvas of wearable artistry, hand-painted on imported Swiss voile and pure silk for the discerning women of Qatar and the Gulf.'}
            </p>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 2. CHAPTER ONE: THE CANDACE / KANDAKA LINEAGE             */}
        {/* ========================================================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-bold text-gold-ink uppercase tracking-[0.25em] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-gold-line" />
              <span>{isAr ? 'الفصل الأول: الأصل والاسم' : 'Chapter I: The Queen Kandaka'}</span>
            </span>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-burgundy font-display leading-snug">
              {isAr
                ? 'كنداكة.. تاج العزّة وسيدة النيل التاريخية'
                : 'Kandaka: The Sovereign Queens of Ancient Nubia'}
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-slateText-body leading-relaxed font-body">
              <p>
                {isAr
                  ? 'منذ آلاف السنين في مملكة كوش ومروي القديمة، حُمِل لقب «كنداكة» كأرفع وسام للملكات المحاربات والحاكمات اللواتي عُرفن بالوقار والشجاعة والجمال الاستثنائي. ارتدت الكنداكات أقمشة بيضاء وكتانية منسوجة ببراعة، تلتف حول أجسادهن كرمز للسيادة والأصالة.'
                  : 'Millennia ago in the ancient kingdoms of Kush and Meroë, the revered royal title "Kandaka" belonged to warrior queens renowned for their regal wisdom, courage, and majestic grace. Draped in finely woven linens along the Nile, they turned attire into a timeless statement of sovereignty.'}
              </p>
              <p>
                {isAr
                  ? 'هذا الإرث العريق هو القلب النابض لدار بيرغندي. نحن نستحضر روح الملكة في كل تفصيلة، محوّلين الثوب التقليدي إلى رداء ملكي معاصر يجمع بين الحشمة والترف.'
                  : 'This heirloom dignity is the beating heart of BURGUNDY. We channel the queen’s poise into every contour, elevating the traditional toub into a contemporary royal garment blending modesty with effortless opulence.'}
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 relative aspect-[4/5] rounded-3xl overflow-hidden border border-gold-hairline shadow-luxury bg-white group">
            <Image
              src="/brand/teaser-clean.jpg"
              alt="BURGUNDY Heritage Toub"
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-burgundy-deep/70 via-transparent to-transparent flex items-end p-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-gold-ink font-bold">HERITAGE PIECE</span>
                <p className="text-white text-xs sm:text-sm font-semibold font-display mt-0.5">
                  {isAr ? 'ثوب تراثي مرسوم ومطرز بأنامل حرفيات الخرطوم' : 'Artisanal Toub Hand-Painted in Khartoum'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 3. CHAPTER TWO: THE ARTISANAL CRAFT (THE 4.5m CANVAS)     */}
        {/* ========================================================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1 relative aspect-[4/5] rounded-3xl overflow-hidden border border-gold-hairline shadow-luxury bg-white group">
            <Image
              src="/brand/teaser-post.jpg"
              alt="Hand-Painting on Silk Crepe"
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-burgundy-deep/70 via-transparent to-transparent flex items-end p-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-gold-ink font-bold">THE ATELIER BRUSH</span>
                <p className="text-white text-xs sm:text-sm font-semibold font-display mt-0.5">
                  {isAr ? 'رسم يدوي متفرد بضربات الفرشاة والألوان المائية الثابتة' : 'One-of-a-Kind Water-Resistant Brushwork'}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2 space-y-5">
            <span className="text-xs font-bold text-gold-ink uppercase tracking-[0.25em] flex items-center gap-1.5">
              <Feather className="w-3.5 h-3.5 text-gold-line" />
              <span>{isAr ? 'الفصل الثاني: الحرفة والفرشاة' : 'Chapter II: The 4.5-Meter Canvas'}</span>
            </span>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-burgundy font-display leading-snug">
              {isAr
                ? 'أربعة أمتار ونصف من الفن الخالص.. لا طباعة، لا تكرار'
                : 'Four and a Half Meters of Pure Artistry: No Prints, No Duplicates'}
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-slateText-body leading-relaxed font-body">
              <p>
                {isAr
                  ? 'يتميز الثوب السوداني بطوله البالغ 4.5 أمتار وعرضه الفسيح، ما يجعله بمثابة لوحة فنية متكاملة. في ورشات بيرغندي، لا نستخدم الطباعة الرقمية الجاهزة؛ بل تمتد الأقمشة البيضاء على طاولات خشبية، لتقوم الفنانات بالرسم اليدوي المباشر ضربة بضربة فرشاة.'
                  : 'The Sudanese Toub spans 4.5 meters in length—a sprawling continuous canvas. In the BURGUNDY atelier, industrial screen-printing is forbidden. Fabrics are stretched across cedar frames, where female artisans compose botanical and geometric motifs stroke by deliberate stroke.'}
              </p>
              <p>
                {isAr
                  ? 'نستخدم خامات معتمدة: فوال سويسري قطني 100% مستورد من معامل سانت غالن بسويسرا، وأصباغ نباتية فرنسية مقاومة للماء والغسيل، لتبقى الألوان حية براقة لعشرات السنين.'
                  : 'We import exclusively: 100% pure Swiss cotton voile woven in St. Gallen, and permanent textile pigments tested against sunlight and humidity to preserve radiance across generations.'}
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 4. PILLARS OF EXCELLENCE GRID                             */}
        {/* ========================================================= */}
        <section className="space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-bold text-gold-ink uppercase tracking-[0.25em]">
              {isAr ? 'قيم ووعود الدار' : 'Pillars of Haute Couture'}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-burgundy font-display mt-1">
              {isAr ? 'أربعة مبادئ لا نساوم عليها' : 'Our Four Uncompromising Standards'}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gold-hairline shadow-sm hover:shadow-luxury transition-all text-center space-y-3">
              <div className="w-12 h-12 bg-burgundy/10 text-burgundy rounded-full flex items-center justify-center mx-auto border border-gold/30">
                <Gem className="w-5 h-5 text-burgundy" />
              </div>
              <h4 className="text-sm font-bold text-burgundy font-display">
                {isAr ? 'نقاء الخامات الإمبراطورية' : 'Textile Purity'}
              </h4>
              <p className="text-xs text-slateText-secondary leading-relaxed">
                {isAr
                  ? 'فوال سويسري قطني 100% وحرير كريب صيني من أجود المناسج العالمية.'
                  : '100% Pure Swiss Voile & pure silk crepe de chine from certified European mills.'}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gold-hairline shadow-sm hover:shadow-luxury transition-all text-center space-y-3">
              <div className="w-12 h-12 bg-burgundy/10 text-burgundy rounded-full flex items-center justify-center mx-auto border border-gold/30">
                <Feather className="w-5 h-5 text-burgundy" />
              </div>
              <h4 className="text-sm font-bold text-burgundy font-display">
                {isAr ? 'رسم يدوي أصيل 100%' : '100% Hand-Painted'}
              </h4>
              <p className="text-xs text-slateText-secondary leading-relaxed">
                {isAr
                  ? 'كل قطعة تحفة فريدة برسم يدوي لا يتكرر تفصيله في أي قطعة أخرى.'
                  : 'Every garment is a non-fungible heirloom crafted by hand, never mass-produced.'}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gold-hairline shadow-sm hover:shadow-luxury transition-all text-center space-y-3">
              <div className="w-12 h-12 bg-burgundy/10 text-burgundy rounded-full flex items-center justify-center mx-auto border border-gold/30">
                <Crown className="w-5 h-5 text-burgundy" />
              </div>
              <h4 className="text-sm font-bold text-burgundy font-display">
                {isAr ? 'تمكين الحرفيات في النيل' : 'Empowering Artisans'}
              </h4>
              <p className="text-xs text-slateText-secondary leading-relaxed">
                {isAr
                  ? 'رعاية مباشرة ودعم مستدام لعشرات الفنانات والحرفيات السودانيات.'
                  : 'Direct ethical patronage sustaining talented women embroidery and painting collectives.'}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gold-hairline shadow-sm hover:shadow-luxury transition-all text-center space-y-3">
              <div className="w-12 h-12 bg-burgundy/10 text-burgundy rounded-full flex items-center justify-center mx-auto border border-gold/30">
                <ShieldCheck className="w-5 h-5 text-burgundy" />
              </div>
              <h4 className="text-sm font-bold text-burgundy font-display">
                {isAr ? 'خدمة وضمان دولة قطر' : 'Qatar Bespoke Concierge'}
              </h4>
              <p className="text-xs text-slateText-secondary leading-relaxed">
                {isAr
                  ? 'ترخيص رسمي، توصيل في حقائب فاخرة، وتفصيل خاص لعميلات الدوحة.'
                  : 'Official MOCI registration, signature dust-bag delivery, and bespoke atelier appointments.'}
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 5. CHAPTER THREE: BESPOKE ATELIER DOHA (INTERACTIVE CTA) */}
        {/* ========================================================= */}
        <section className="bg-canvas-warm rounded-3xl border border-gold-line/40 p-8 sm:p-12 text-center space-y-6 shadow-sm">
          <BurgundyLogo variant="compact" size="md" className="mx-auto" />

          <div className="max-w-xl mx-auto space-y-2">
            <h3 className="text-2xl sm:text-3xl font-bold text-burgundy font-display">
              {isAr ? 'هل تبحثين عن قطعة خاصة لمناسبة لا تُنسى؟' : 'Commission a Bespoke Heirloom'}
            </h3>
            <p className="text-xs sm:text-sm text-slateText-secondary leading-relaxed font-body">
              {isAr
                ? 'استشيري مصممي الأتيليه في الدوحة لاختيار القماش، نظام الألوان، والتطريز المذهب لأعراسكِ ومناسباتكِ الخاصة.'
                : 'Consult our Doha atelier curators to choose your base fabric, botanical color palette, and bespoke metallic gold embroidery.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Button asChild size="lg" className="bg-burgundy text-white hover:bg-burgundy-hover font-bold shadow-luxury">
              <Link href={`/${currentLang}/custom-order`}>
                {isAr ? 'طلب تفصيل خاص' : 'Start Bespoke Order'}
                {isAr ? <ArrowLeft className="w-4 h-4 ms-2" /> : <ArrowRight className="w-4 h-4 ms-2" />}
              </Link>
            </Button>

            <a
              href={`https://wa.me/97450000974?text=${encodeURIComponent(
                isAr
                  ? 'مرحباً دار بيرغندي، أود حجز استشارة خاصة لاختيار ثوب عروس / ثوب للمناسبات.'
                  : 'Hello BURGUNDY Atelier, I would like to book a private bespoke toub consultation in Doha.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-gold-line text-burgundy text-xs font-bold hover:border-burgundy transition-all shadow-sm"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>{isAr ? 'تواصل مع كونسيرج الدوحة (واتساب)' : 'Doha WhatsApp Concierge'}</span>
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}
