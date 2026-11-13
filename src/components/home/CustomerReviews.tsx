'use client';

import React, { useEffect, useState } from 'react';
import { Star, Quote, CheckCircle2, Sparkles, PenLine } from 'lucide-react';
import { Language, getDictionary } from '../../lib/i18n';
import { ReviewSubmitModal } from '../reviews/ReviewSubmitModal';

interface ReviewCard {
  id: string;
  author: string;
  location?: string;
  rating: number;
  item?: string;
  text: string;
}

const SEED_REVIEWS: ReviewCard[] = [
  {
    id: 'seed-1',
    author: 'د. مريم النعيمي',
    location: 'الدوحة — اللؤلؤة',
    rating: 5,
    item: 'ثوب سويسري ملكي مطرز بالذهب',
    text: 'خامة الفوال السويسري تفوق الوصف في النعومة والانسيابية! وصلني الطلب خلال 24 ساعة فقط في اللؤلؤة مع تغليف قماشي فاخر يحفظ بريق التطريز.',
  },
  {
    id: 'seed-2',
    author: 'أروى عثمان',
    location: 'الدوحة — لوسيل',
    rating: 5,
    item: 'درّاعة كتان الجزيرة مع حرير',
    text: 'كتان بارد ومثالي لأجواء قطر وتطريز الحناء على الأكمام شديد النعومة والدقة. تعامل راقٍ وخدمة كونسيرج متميزة عبر واتساب.',
  },
  {
    id: 'seed-3',
    author: 'فاطمة الكواري',
    location: 'الدوحة — الخليج الغربي',
    rating: 5,
    item: 'ثوب حرير كريب صيني مرسوم يدوياً',
    text: 'ارتديته في حفل زفاف عائلي بالدوحة ونال إعجاب الجميع! دقة التفاصيل النوبية ونقاء الألوان كانت لافتة جداً.',
  },
];

export function CustomerReviews({ lang = 'ar' }: { lang?: Language }) {
  const dict = getDictionary(lang);
  const isAr = lang === 'ar';
  const [reviews, setReviews] = useState<ReviewCard[]>(SEED_REVIEWS);
  const [isLive, setIsLive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/reviews')
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        if (data?.success && Array.isArray(data.reviews) && data.reviews.length > 0) {
          setReviews(
            data.reviews.map((r: any) => ({
              id: r.id,
              author: r.authorName,
              rating: r.rating,
              item: r.item,
              text: r.text,
            }))
          );
          setIsLive(true);
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-gold-hairline text-burgundy text-[11px] font-semibold tracking-widest uppercase shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-gold-line" />
          <span>{isAr ? 'آراء عميلاتنا في قطر' : 'CLIENT EXPERIENCES'}</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-extrabold text-burgundy font-display">
          {dict.home.reviewsTitle}
        </h2>
        <p className="text-xs sm:text-sm text-slateText-secondary font-body leading-relaxed">
          {dict.home.reviewsSubtitle}
        </p>

        <div className="pt-2">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-burgundy text-white hover:bg-burgundy-hover text-xs font-bold transition-colors shadow-luxury focus:outline-none focus-visible:ring-2 focus-visible:ring-burgundy"
          >
            <PenLine className="w-4 h-4" />
            {isAr ? 'اكتبي مراجعتكِ' : 'Write Your Review'}
          </button>
        </div>
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
                <div className="flex items-center gap-1 text-gold-ink">
                  {[...Array(Math.max(0, Math.min(5, Math.round(r.rating))))].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-gold-line" />
                  ))}
                </div>
                <Quote className="w-7 h-7 text-gold-hairline" />
              </div>

              {/* Review Text */}
              <p className="text-xs sm:text-sm text-slateText-body leading-relaxed font-body">
                &ldquo;{r.text}&rdquo;
              </p>
              {r.item && (
                <p className="text-[11px] font-semibold text-gold-ink">
                  {isAr ? 'بخصوص: ' : 'For: '}{r.item}
                </p>
              )}
            </div>

            {/* Author Meta */}
            <div className="pt-4 border-t border-gold-hairline/60 flex items-center justify-between">
              <div>
                <strong className="block text-xs font-bold text-burgundy font-display">
                  {r.author}
                </strong>
                {r.location && (
                  <span className="text-[11px] text-slateText-secondary">{r.location}</span>
                )}
              </div>
              <div className="flex items-center gap-1 text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>{isAr ? 'عميلة موثقة' : 'Verified Buyer'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ReviewSubmitModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} lang={lang} />
    </section>
  );
}
