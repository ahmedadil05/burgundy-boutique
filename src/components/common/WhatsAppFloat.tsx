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
    ? `مرحباً، أود الاستفسار عن تصاميم ومقاسات بوتيك كنداكة.`
    : `Hello, I have an inquiry regarding Kandaka Boutique designs and sizing.`;

  const productText = isAr
    ? `مرحباً، أود الاستفسار بخصوص ${productTitle || 'هذا المنتج'}: ${productUrl || ''}`
    : `Hello, I'd like to ask about ${productTitle || 'this item'}: ${productUrl || ''}`;

  const message = encodeURIComponent(productTitle ? productText : defaultText);
  const whatsappUrl = `https://wa.me/${siteConfig.support.whatsappNumber.replace(/[^0-9]/g, '')}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 end-6 z-40 flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white px-4 py-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 group focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
      aria-label="Customer Service WhatsApp"
    >
      <MessageCircle className="w-5 h-5 fill-current" />
      <span className="text-xs font-bold hidden sm:inline-block">
        {isAr ? 'مساعدة فورية عبر واتساب' : 'WhatsApp Assistance'}
      </span>
    </a>
  );
}
