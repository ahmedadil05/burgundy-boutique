'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { siteConfig } from '../../config/site';
import { Language } from '../../lib/i18n';

export interface WhatsAppFloatProps {
  lang?: Language;
  productTitle?: string;
  productUrl?: string;
}

export function WhatsAppFloat({
  lang = 'ar',
  productTitle,
  productUrl,
}: WhatsAppFloatProps) {
  const isAr = lang === 'ar';

  const defaultText = isAr
    ? `مرحباً، أود الاستفسار عن تصاميم ومقاسات دار بيرغندي للأزياء الفاخرة.`
    : `Hello, I would like to inquire about BURGUNDY luxury atelier designs and bespoke sizing.`;

  const productText = isAr
    ? `مرحباً، أود الاستفسار بخصوص هذه القطعة من دار بيرغندي: ${productTitle || ''} - ${productUrl || ''}`
    : `Hello, I would like to inquire regarding this BURGUNDY piece: ${productTitle || ''} - ${productUrl || ''}`;

  const message = encodeURIComponent(productTitle ? productText : defaultText);
  const whatsappUrl = `https://wa.me/${siteConfig.support.whatsappNumber.replace(/[^0-9]/g, '')}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 lg:bottom-6 end-6 z-30 flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 group focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
      aria-label="Customer Service WhatsApp"
    >
      <MessageCircle className="w-5 h-5 fill-current" />
      <span className="text-xs font-bold hidden sm:inline-block">
        {isAr ? 'مستشار الأزياء عبر واتساب' : 'VIP Concierge WhatsApp'}
      </span>
    </a>
  );
}
