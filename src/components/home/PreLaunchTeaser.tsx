'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Instagram, Send, CheckCircle2, MessageCircle, Sparkles, ArrowRight, Eye, Shield } from 'lucide-react';
import { useStoreSettings } from '../../lib/settings-store';
import { Language, getDictionary } from '../../lib/i18n';
import { BurgundyLogo } from '../brand/BurgundyLogo';

interface PreLaunchTeaserProps {
  lang: Language;
}

export function PreLaunchTeaser({ lang }: PreLaunchTeaserProps) {
  const { settings, toggleLaunchMode } = useStoreSettings();
  const dict = getDictionary(lang);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const isRtl = lang === 'ar';

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMsg(isRtl ? 'يرجى إدخال بريد إلكتروني صحيح' : 'Please enter a valid email address');
      return;
    }
    setErrorMsg('');
    setIsSubscribed(true);
    // Persist to local waitlist storage
    try {
      const existing = JSON.parse(localStorage.getItem('burgundy_waitlist') || '[]');
      existing.push({ email, date: new Date().toISOString() });
      localStorage.setItem('burgundy_waitlist', JSON.stringify(existing));
    } catch {}
  };

  const whatsappMessage = encodeURIComponent(
    isRtl
      ? 'مرحباً دار بيرغندي، أود الانضمام لقائمة الانتظار والحصول على أحدث تفاصيل تشكيلة الإطلاق.'
      : 'Hello BURGUNDY, I would love to join the exclusive launch waitlist and receive collection updates.'
  );

  return (
    <div className="relative min-h-[92vh] flex flex-col items-center justify-center px-4 sm:px-6 py-12 bg-canvas overflow-hidden leaf-shadow-bg">
      {/* Background delicate radial glow */}
      <div className="absolute top-1/4 -start-20 w-96 h-96 rounded-full bg-surface-peachSoft/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -end-20 w-96 h-96 rounded-full bg-peach-sorbet/30 blur-3xl pointer-events-none" />

      {/* Main Container constrained to mobile 390px baseline, scaling elegantly */}
      <div className="relative z-10 w-full max-w-[420px] mx-auto text-center flex flex-col items-center">
        
        {/* Bespoke Regal Logo & Monogram */}
        <div className="mb-6">
          <BurgundyLogo variant="full" size="lg" lang={lang} />
        </div>

        {/* Client Supplied Teaser Banner Card with Leaf Shadows & Draped Fabric */}
        <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-luxury border border-gold-hairline bg-white mb-8 group">
          <Image
            src={settings.logoUrl || '/brand/teaser-clean.jpg'}
            alt="BURGUNDY - Something's on the Horizon"
            fill
            priority
            className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
            sizes="(max-width: 450px) 100vw, 420px"
          />
          {/* Subtle gradient overlay to enhance hairline frame */}
          <div className="absolute inset-0 bg-gradient-to-t from-burgundy-deep/30 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Poetic Arabic / English Brand Teaser */}
        <div className="space-y-3 mb-8 px-2">
          <h2 className="text-2xl font-bold font-cairo text-burgundy leading-snug">
            {isRtl ? 'شيءٌ استثنائي يلوح في الأفق' : "Something's on the Horizon"}
          </h2>
          <p className="text-xs uppercase tracking-[0.25em] text-gold-shimmer font-semibold">
            STAY TUNED • ترقبونا
          </p>
          <p className="text-sm text-slateText-body font-normal leading-relaxed">
            {isRtl
              ? 'أناقة الثوب والجلابية السودانية المشغولة يدوياً بأنامل فنية راقية.. نلتقي قريباً في الدوحة.'
              : 'Hand-painted Sudanese women’s wear crafted with soft luxury and timeless grace in Qatar.'}
          </p>
        </div>

        {/* Waitlist Signup Form */}
        <div className="w-full bg-white/90 backdrop-blur-md p-5 rounded-2xl border border-gold-hairline shadow-soft mb-6">
          <h3 className="text-sm font-bold text-slateText-body mb-1">
            {dict.teaser.waitlistTitle}
          </h3>
          <p className="text-xs text-slateText-secondary mb-4">
            {isRtl ? 'كوني أول من يستقبل دعوة الافتتاح وتفاصيل القطع الحصرية' : 'Be first to receive our private inaugural invitation'}
          </p>

          {isSubscribed ? (
            <div className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-surface-peachSoft/40 text-burgundy font-semibold text-xs border border-gold-hairline animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-burgundy shrink-0" />
              <span>{dict.teaser.success}</span>
            </div>
          ) : (
            <form onSubmit={handleEmailSubmit} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={dict.teaser.waitlistPlaceholder}
                  className="w-full px-4 py-3 rounded-xl border border-surface-peachMuted/50 bg-canvas text-sm text-slateText-body placeholder:text-slateText-secondary/60 focus:outline-none focus:ring-2 focus:ring-burgundy/40 transition-all"
                  dir="ltr"
                />
              </div>
              {errorMsg && <p className="text-xs text-coral font-medium text-start">{errorMsg}</p>}
              <button
                type="submit"
                className="w-full py-3 px-5 rounded-xl bg-burgundy hover:bg-burgundy-hover active:scale-[0.99] text-white text-xs font-bold tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>{dict.teaser.joinWaitlist}</span>
                <Send className="w-3.5 h-3.5 rtl-flip" />
              </button>
            </form>
          )}
        </div>

        {/* WhatsApp Waitlist Direct Inquiries Button */}
        <a
          href={`https://wa.me/97450000974?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 px-4 rounded-xl bg-white border border-surface-peachMuted text-slateText-body hover:text-burgundy hover:border-burgundy font-semibold text-xs flex items-center justify-center gap-2.5 transition-all shadow-sm mb-4"
        >
          <MessageCircle className="w-4 h-4 text-[#25D366]" />
          <span>{dict.teaser.whatsappWaitlist}</span>
        </a>

        {/* Instagram Link (@burgundy974_) */}
        <a
          href="https://www.instagram.com/burgundy974_"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-semibold text-burgundy hover:text-burgundy-hover transition-colors py-1 group"
        >
          <Instagram className="w-4 h-4 text-burgundy group-hover:scale-110 transition-transform" />
          <span dir="ltr">@burgundy974_</span>
          <span className="text-slateText-secondary text-[11px]">({dict.teaser.instagram})</span>
        </a>

        {/* Admin Quick Preview Bar */}
        <div className="mt-8 pt-6 border-t border-gold-hairline w-full flex flex-col items-center gap-2 text-[11px] text-slateText-secondary">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-peachSoft/50 text-burgundy font-medium">
            <Shield className="w-3 h-3 text-burgundy" />
            <span>{isRtl ? 'وضع ما قبل الإطلاق مفعل حالياً' : 'Pre-launch mode is active'}</span>
          </div>

          <div className="flex items-center gap-3 mt-1">
            <button
              onClick={toggleLaunchMode}
              className="text-xs font-bold text-burgundy hover:underline flex items-center gap-1"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{isRtl ? 'معاينة المتجر الكامل' : 'Preview Full Shop'}</span>
            </button>
            <span>•</span>
            <Link
              href={`/${lang}/admin`}
              className="text-xs font-bold text-slateText-secondary hover:text-burgundy transition-colors"
            >
              {isRtl ? 'دخول لوحة الإدارة' : 'Admin Login'}
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
