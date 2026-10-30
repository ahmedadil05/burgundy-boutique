'use client';

import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Language, getDictionary } from '../../lib/i18n';
import { Mail, CheckCircle2, Instagram, ArrowUpRight } from 'lucide-react';

export function NewsletterSection({ lang = 'ar' }: { lang?: Language }) {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const dict = getDictionary(lang);
  const isAr = lang === 'ar';

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubmitted(true);
      setEmail('');
    }
  };

  const instagramPosts = [
    {
      img: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80',
      title: isAr ? 'أناقة الفوال الملكي' : 'Royal Voile Elegance',
    },
    {
      img: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=80',
      title: isAr ? 'كولكشن الجلابيات التراثية' : 'Heritage Jalabiyas',
    },
    {
      img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80',
      title: isAr ? 'جلسات تصوير الدوحة' : 'Doha Editorial',
    },
    {
      img: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80',
      title: isAr ? 'تفاصيل التطريز المذهب' : 'Gilded Stitch Details',
    },
  ];

  return (
    <section className="py-14 bg-cream">
      {/* Instagram Grid (Linking back to site) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs font-bold text-coral-warm uppercase tracking-wider flex items-center gap-1.5">
              <Instagram className="w-3.5 h-3.5" />
              <span>@kandaka.qa</span>
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-cocoa-dark font-cairo">
              {isAr ? 'شاركينا إطلالتكِ في قطر' : 'Kandaka on Instagram'}
            </h3>
          </div>
          <span className="text-xs text-cocoa-muted hidden sm:inline-block">
            {isAr
              ? 'تتم جميع عمليات الشراء حصرياً عبر موقعنا المرخص'
              : 'All purchases fulfilled exclusively through our licensed web store'}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {instagramPosts.map((post, idx) => (
            <div
              key={idx}
              className="group relative aspect-square rounded-2xl overflow-hidden border border-peach-soft shadow-sm"
            >
              <img
                src={post.img}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-cocoa-dark/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center text-white">
                <Instagram className="w-6 h-6 mb-1 text-peach-soft" />
                <span className="text-xs font-bold">{post.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Box */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blush-surface via-cream to-peach-soft/50 border border-peach-soft p-8 sm:p-12 text-center shadow-warm">
          <div className="w-12 h-12 bg-white text-coral-warm rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
            <Mail className="w-6 h-6" />
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-cocoa-dark font-cairo">
            {dict.home.newsletterTitle}
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-cocoa-muted max-w-md mx-auto">
            {dict.home.newsletterSubtitle}
          </p>

          {isSubmitted ? (
            <div className="mt-6 p-4 bg-emerald-100 text-emerald-800 rounded-2xl text-xs font-bold flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{dict.home.subscribed}</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="mt-6 flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={dict.home.newsletterPlaceholder}
                className="flex-1 px-4 py-3 rounded-full border border-peach-soft bg-white text-xs text-cocoa-dark focus:outline-none focus:ring-2 focus:ring-coral-warm"
              />
              <Button type="submit" variant="primary">
                {dict.home.subscribe}
              </Button>
            </form>
          )}

          <p className="mt-3 text-[10px] text-cocoa-muted">
            {isAr
              ? 'نحترم خصوصيتكِ ولا نرسل رسائل مزعجة إطلاقاً.'
              : 'We respect your privacy under Qatar Law No. 13 of 2016. Unsubscribe anytime.'}
          </p>
        </div>
      </div>
    </section>
  );
}
