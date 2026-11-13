'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { Language, getDictionary } from '../../lib/i18n';

export function CookieBanner({ lang = 'ar' }: { lang?: Language }) {
  const [isVisible, setIsVisible] = useState(false);
  const dict = getDictionary(lang);

  useEffect(() => {
    try {
      const consented = localStorage.getItem('burgundy_cookie_consent');
      if (!consented) {
        setIsVisible(true);
      }
    } catch {}
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('burgundy_cookie_consent', 'accepted');
    } catch {}
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-20 lg:bottom-4 inset-x-4 max-w-xl mx-auto z-40 bg-white/95 backdrop-blur-md border border-gold-hairline rounded-3xl p-5 shadow-2xl animate-scaleUp">
      <div className="flex items-start gap-3.5">
        <ShieldCheck className="w-5 h-5 text-gold-line shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-xs text-slateText-body font-medium leading-relaxed">
            {dict.compliance.cookieNotice}
          </p>
          <div className="mt-3 flex items-center gap-3">
            <Button size="sm" variant="primary" onClick={handleAccept} className="bg-burgundy text-white hover:bg-burgundy-hover">
              {dict.compliance.acceptCookies}
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setIsVisible(false)} className="text-slateText-secondary hover:text-burgundy">
              {dict.compliance.cookieSettings}
            </Button>
          </div>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-slateText-secondary hover:text-burgundy p-1"
          aria-label="Dismiss cookie banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
