import React from 'react';
import { Star, Quote, CheckCircle2, Sparkles } from 'lucide-react';
import { Language, getDictionary } from '../../lib/i18n';

export function CustomerReviews({ lang = 'ar' }: { lang?: Language }) {
  const dict = getDictionary(lang);
  const isAr = lang === 'ar';

  const reviews = [
    {
      id: 'rev-1',
      author: isAr ? 'د. مريم النعيمي' : 'Dr. Maryam Al-Naimi',
      location: isAr ? 'الدوحة — اللؤلؤة' : 'Doha — The Pearl',
      rating: 5,
      item: isAr ? 'ثوب سويسري ملكي مطرز بالذهب' : 'Royal Swiss Voile Toub',
      text: isAr
        ? 'خامة الفوال السويسري تفوق الوصف في النعومة والانسيابية! وصلني الطلب خلال 24 ساعة فقط في اللؤلؤة مع تغليف قماشي فاخر يحفظ بريق التطريز.'
        : 'The Swiss voile drape is breathtaking! Delivery arrived at The Pearl in under 24 hours in signature protective dust-bag packaging.',
    },
    {
      id: 'rev-2',
      author: isAr ? 'أروى عثمان' : 'Arwa Osman',
      location: isAr ? 'الدوحة — لوسيل' : 'Doha — Lusail',
      rating: 5,
      item: isAr ? 'درّاعة كتان الجزيرة مع حرير' : 'Gezira Silk & Linen Dara’a',
      text: isAr
        ? 'كتان بارد ومثالي لأجواء قطر وتطريز الحناء على الأكمام شديد النعومة والدقة. تعامل راقٍ وخدمة كونسيرج متميزة عبر واتساب.'
        : 'Cool, breathable linen perfect for Qatar climate. The henna needlework on the cuffs is exquisite. Highly recommended boutique.',
    },
    {
      id: 'rev-3',
      author: isAr ? 'فاطمة الكواري' : 'Fatima Al-Kuwari',
      location: isAr ? 'الدوحة — الخليج الغربي' : 'Doha — West Bay',
      rating: 5,
      item: isAr ? 'ثوب حرير كريب صيني مرسوم يدوياً' : 'Hand-Painted Silk Crepe Toub',
      text: isAr
        ? 'ارتديته في حفل زفاف عائلي بالدوحة ونال إعجاب الجميع! دقة التفاصيل النوبية ونقاء الألوان كانت لافتة جداً.'
        : 'Wore it to a family wedding in Doha and received endless compliments! The Nubian motifs and pure silk drape were immaculate.',
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-gold-hairline text-burgundy text-[11px] font-semibold tracking-widest uppercase shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-gold-line" />
          <span>{isAr ? 'آراء عميلاتنا في قطر' : 'CLIENT EXPERIENCES'}</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-extrabold text-burgundy font-cairo">
          {dict.home.reviewsTitle}
        </h2>
        <p className="text-xs sm:text-sm text-slateText-secondary font-tajawal leading-relaxed">
          {dict.home.reviewsSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((r) => (
          <div
            key={r.id}
            className="flex flex-col justify-between bg-white p-6 sm:p-8 rounded-2xl border border-gold-hairline shadow-sm hover:shadow-luxury transition-all duration-300 relative space-y-5"
          >
            <div className="space-y-4">
              {/* Star Rating & Quote Accent */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-gold-shimmer">
                  {[...Array(r.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-gold-line" />
                  ))}
                </div>
                <Quote className="w-7 h-7 text-gold-hairline" />
              </div>

              {/* Review Text */}
              <p className="text-xs sm:text-sm text-slateText-body leading-relaxed font-tajawal">
                &ldquo;{r.text}&rdquo;
              </p>
            </div>

            {/* Author Meta */}
            <div className="pt-4 border-t border-gold-hairline/60 flex items-center justify-between">
              <div>
                <strong className="block text-xs font-bold text-burgundy font-cairo">
                  {r.author}
                </strong>
                <span className="text-[11px] text-slateText-secondary">{r.location}</span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>{isAr ? 'عميلة موثقة' : 'Verified Buyer'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
