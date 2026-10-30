import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
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
        ? 'خامة الفوال السويسري تفوق الوصف في النعومة والانسيابية! وصلني الطلب خلال 24 ساعة فقط في الدوحة مع تغليف مبرد وفاخر يحفظ التطريز.'
        : 'The Swiss voile drape is breathtaking! Delivery arrived at The Pearl in under 24 hours in protective luxury packaging.',
    },
    {
      id: 'rev-2',
      author: isAr ? 'أروى عثمان' : 'Arwa Osman',
      location: isAr ? 'الريان، قطر' : 'Al Rayyan, Qatar',
      rating: 5,
      item: isAr ? 'درّاعة كتان الجزيرة' : 'Gezira Linen Dara’a',
      text: isAr
        ? 'كتان بارد ومثالي لأجواء قطر وتطريز الحناء على الأكمام شديد النعومة والجمال. سعيدة جداً بالتعامل معكم.'
        : 'Cool, breathable linen perfect for Qatar heat. The henna needlework on the cuffs is exquisite. Highly recommended boutique.',
    },
    {
      id: 'rev-3',
      author: isAr ? 'فاطمة الكواري' : 'Fatima Al-Kuwari',
      location: isAr ? 'الوكرة، قطر' : 'Al Wakrah, Qatar',
      rating: 5,
      item: isAr ? 'ثوب حرير جاكار فاخر' : 'Silk Jacquard Toub',
      text: isAr
        ? 'ارتديته في حفل زفاف العائلة ونال إعجاب الجميع! دقة التفاصيل النوبية والخدمة عبر واتساب كانت راقية وسريعة.'
        : 'Wore it to a family wedding and received endless compliments! The Nubian motifs and WhatsApp styling help were immaculate.',
    },
  ];

  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-bold text-coral-warm uppercase tracking-wider">
          {isAr ? 'شهادات نعتز بها' : 'Client Testimonials'}
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-cocoa-dark font-cairo mt-1">
          {dict.home.reviewsTitle}
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-cocoa-muted">
          {dict.home.reviewsSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((r) => (
          <div
            key={r.id}
            className="flex flex-col justify-between bg-white/80 p-6 sm:p-7 rounded-3xl border border-peach-soft shadow-sm hover:shadow-warm transition-all"
          >
            <div>
              {/* Stars */}
              <div className="flex items-center gap-1 text-amber-500 mb-3">
                {[...Array(r.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>

              {/* Text */}
              <p className="text-xs sm:text-sm text-cocoa-dark leading-relaxed italic mb-4">
                "{r.text}"
              </p>
            </div>

            <div className="pt-4 border-t border-peach-soft/60 flex items-center justify-between text-xs">
              <div>
                <strong className="block text-cocoa-dark font-bold">{r.author}</strong>
                <span className="text-[11px] text-cocoa-muted">{r.location}</span>
              </div>
              <span className="text-[10px] text-coral-warm font-semibold bg-blush-surface px-2 py-0.5 rounded-full">
                {r.item}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
