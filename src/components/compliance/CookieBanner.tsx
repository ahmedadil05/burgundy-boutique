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
      const consented = localStorage.getItem('kandaka_cookie_consent');
      if (!consented) {
        setIsVisible(true);
      }
    } catch {}
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('kandaka_cookie_consent', 'accepted');
    } catch {}
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 inset-x-4 max-w-xl mx-auto z-50 bg-cream/95 backdrop-blur-md border-2 border-peach-deep/40 rounded-3xl p-5 shadow-2xl animate-scaleUp">
      <div className="flex items-start gap-3.5">
        <ShieldCheck className="w-5 h-5 text-coral-warm shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-xs text-cocoa-dark font-medium leading-relaxed">
            {dict.compliance.cookieNotice}
          </p>
          <div className="mt-3 flex items-center gap-3">
            <Button size="sm" variant="primary" onClick={handleAccept}>
              {dict.compliance.acceptCookies}
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setIsVisible(false)}>
              {dict.compliance.cookieSettings}
            </Button>
          </div>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-cocoa-muted hover:text-cocoa-dark p-1"
          aria-label="Dismiss cookie banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
