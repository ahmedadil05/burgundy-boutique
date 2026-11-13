'use client';

import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Language, getDictionary } from '../../lib/i18n';
import { Mail, CheckCircle2, Instagram, ArrowUpRight, Send, Sparkles } from 'lucide-react';

export function NewsletterSection({ lang = 'ar' }: { lang?: Language }) {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const dict = getDictionary(lang);
  const isAr = lang === 'ar';

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setIsSubmitted(true);
      setEmail('');
      try {
        const existing = JSON.parse(localStorage.getItem('burgundy_newsletter') || '[]');
        existing.push({ email, date: new Date().toISOString() });
        localStorage.setItem('burgundy_newsletter', JSON.stringify(existing));
      } catch {}
    }
  };

  const instagramPosts = [
    {
      img: '/brand/teaser-clean.jpg',
      title: isAr ? 'فخامة الفوال السويسري الملكي' : 'Royal Swiss Voile',
    },
    {
      img: '/brand/teaser-post.jpg',
      title: isAr ? 'رسم يدوي متفرد على الحرير الطبيعي' : 'Artisanal Silk Brushwork',
    },
    {
      img: '/brand/burgundy-avatar.jpg',
      title: isAr ? 'جلسات تصوير الدوحة الخاصة' : 'Doha Private Editorial',
    },
    {
      img: '/brand/teaser-clean.jpg',
      title: isAr ? 'تفاصيل التطريز المذهب لأعراس قطر' : 'Bridal Gilded Needlework',
    },
  ];

  return (
    <section className="py-16 bg-canvas border-t border-gold-hairline">
      {/* Instagram Grid (Linking back to official Instagram @burgundy974_) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <a
              href="https://www.instagram.com/burgundy974_"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-burgundy uppercase tracking-wider flex items-center gap-1.5 hover:underline"
            >
              <Instagram className="w-4 h-4 text-burgundy" />
              <span dir="ltr">@burgundy974_</span>
            </a>
            <h3 className="text-xl sm:text-3xl font-extrabold text-burgundy font-display mt-1">
              {isAr ? 'عالم بيرغندي على إنستغرام' : 'BURGUNDY on Instagram'}
            </h3>
          </div>
          <a
            href="https://www.instagram.com/burgundy974_"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-burgundy hover:text-burgundy-hover flex items-center gap-1 px-4 py-2 rounded-full border border-gold-hairline bg-white hover:bg-canvas transition-colors shadow-sm"
          >
            <span>{isAr ? 'متابعة الحساب الرسمي' : 'Follow @burgundy974_'}</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-gold-line" />
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {instagramPosts.map((post, idx) => (
            <a
              key={idx}
              href="https://www.instagram.com/burgundy974_"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-[4/5] rounded-2xl overflow-hidden border border-gold-hairline shadow-sm hover:shadow-luxury transition-all bg-white"
            >
              <img
                src={post.img}
                alt={post.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-burgundy-deep/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-white text-xs font-bold font-display line-clamp-1">
                  {post.title}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Newsletter Signup Box */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-canvas-warm rounded-3xl p-8 sm:p-12 border border-gold-line/40 text-center space-y-4 shadow-sm">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto border border-gold-hairline text-burgundy">
            <Mail className="w-5 h-5 text-burgundy" />
          </div>

          <h3 className="text-xl sm:text-3xl font-extrabold text-burgundy font-display">
            {dict.home.newsletterTitle}
          </h3>

          <p className="text-xs sm:text-sm text-slateText-secondary max-w-md mx-auto leading-relaxed font-body">
            {dict.home.newsletterSubtitle}
          </p>

          <div className="pt-2 max-w-md mx-auto">
            {isSubmitted ? (
              <div className="flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-white text-burgundy font-bold text-xs border border-gold-line shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{dict.home.subscribed}</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={dict.home.newsletterPlaceholder}
                  required
                  className="flex-1 px-5 py-3 rounded-full border border-gold-hairline bg-white text-xs text-slateText-body focus:outline-none focus:ring-2 focus:ring-burgundy/40 shadow-sm"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-full bg-burgundy hover:bg-burgundy-hover text-white text-xs font-bold uppercase tracking-wider transition-all shadow-luxury flex items-center justify-center gap-2"
                >
                  <span>{dict.home.subscribe}</span>
                  <Send className="w-3.5 h-3.5 rtl-flip" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
