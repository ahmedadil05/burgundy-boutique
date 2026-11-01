'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';
import { Language, getDictionary } from '../../lib/i18n';
import { useStoreSettings } from '../../lib/settings-store';

export function AnnouncementBar({ lang = 'ar' }: { lang?: Language }) {
  const dict = getDictionary(lang);
  const { settings } = useStoreSettings();

  return (
    <aside
      aria-label="Announcement banner"
      className="bg-burgundy text-white py-2 px-4 text-center text-xs font-medium tracking-wide border-b border-gold-hairline"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-gold-line shrink-0" />
        <span className="font-cairo">
          {settings.launchMode
            ? lang === 'ar'
              ? 'شيءٌ استثنائي يلوح في الأفق – انضمي لقائمة الانتظار الحصرية لدار بيرغندي'
              : "Something's on the Horizon – Join the exclusive inaugural waitlist"
            : dict.announcement.text}
        </span>
      </div>
    </aside>
  );
}
