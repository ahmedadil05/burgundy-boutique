import React from 'react';
import { Sparkles } from 'lucide-react';
import { Language, getDictionary } from '../../lib/i18n';

export function AnnouncementBar({ lang = 'ar' }: { lang?: Language }) {
  const dict = getDictionary(lang);

  return (
    <div className="bg-coral-warm text-white py-2 px-4 text-center text-xs font-medium tracking-wide">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 shrink-0 opacity-80" />
        <span>{dict.announcement.text}</span>
      </div>
    </div>
  );
}
