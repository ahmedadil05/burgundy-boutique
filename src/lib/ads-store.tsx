'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type AdPlacement = 'home_banner' | 'shop_grid' | 'footer_strip';
export type AdStatus = 'active' | 'draft' | 'expired';

export interface SponsoredAd {
  id: string;
  advertiserName: string;
  title: { ar: string; en: string };
  description: { ar: string; en: string };
  placement: AdPlacement;
  mediaUrl: string;
  targetUrl: string;
  startDate: string;
  endDate: string;
  status: AdStatus;
  viewsCount: number;
  clicksCount: number;
}

const SEED_ADS: SponsoredAd[] = [
  {
    id: 'ad-001',
    advertiserName: 'Dar Al-Teeb Qatar',
    title: {
      ar: 'دار الطيب - دهن عود وبخور ملكي في الدوحة',
      en: 'Dar Al-Teeb - Royal Oud & Incense in Doha',
    },
    description: {
      ar: 'روائح شرقية نادرة تليق بفخامة ثوبكِ السوداني المشغول يدوياً.',
      en: 'Rare oriental perfumes harmonizing with your hand-painted couture toub.',
    },
    placement: 'home_banner',
    mediaUrl: '/brand/teaser-clean.jpg',
    targetUrl: 'https://instagram.com',
    startDate: '2026-11-01',
    endDate: '2026-12-31',
    status: 'active',
    viewsCount: 142,
    clicksCount: 18,
  },
  {
    id: 'ad-002',
    advertiserName: 'Qatari Henna Studio',
    title: {
      ar: 'مرسم نقش الحناء الفاخر - اللؤلؤة قطر',
      en: 'Luxury Henna Studio - The Pearl Qatar',
    },
    description: {
      ar: 'نقوش حناء سودانية وخليجية ناعمة للأفراح والمناسبات الخاصة.',
      en: 'Bespoke bridal and festive henna art designed for celebrations in Doha.',
    },
    placement: 'shop_grid',
    mediaUrl: '/brand/teaser-clean.jpg',
    targetUrl: 'https://instagram.com',
    startDate: '2026-11-01',
    endDate: '2026-12-31',
    status: 'active',
    viewsCount: 89,
    clicksCount: 9,
  },
];

const ADS_STORAGE_KEY = 'burgundy_sponsored_ads';

interface AdsContextValue {
  ads: SponsoredAd[];
  getActiveAd: (placement: AdPlacement) => SponsoredAd | undefined;
  recordView: (adId: string) => void;
  recordClick: (adId: string) => void;
  addAd: (ad: Omit<SponsoredAd, 'id' | 'viewsCount' | 'clicksCount'>) => void;
  updateAd: (id: string, updates: Partial<SponsoredAd>) => void;
  deleteAd: (id: string) => void;
}

const AdsContext = createContext<AdsContextValue | null>(null);

export function AdsProvider({ children }: { children: React.ReactNode }) {
  const [ads, setAds] = useState<SponsoredAd[]>(SEED_ADS);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(ADS_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setAds(parsed);
          }
        }
      }
    } catch {}
  }, []);

  const saveAds = (nextAds: SponsoredAd[]) => {
    setAds(nextAds);
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(ADS_STORAGE_KEY, JSON.stringify(nextAds));
      }
    } catch {}
  };

  const getActiveAd = useCallback(
    (placement: AdPlacement) => {
      return ads.find(
        (ad) =>
          ad.placement === placement &&
          ad.status === 'active' &&
          new Date(ad.endDate) >= new Date()
      );
    },
    [ads]
  );

  const recordView = useCallback((adId: string) => {
    setAds((prev) => {
      const next = prev.map((ad) =>
        ad.id === adId ? { ...ad, viewsCount: ad.viewsCount + 1 } : ad
      );
      try {
        if (typeof window !== 'undefined') {
          localStorage.setItem(ADS_STORAGE_KEY, JSON.stringify(next));
        }
      } catch {}
      return next;
    });
  }, []);

  const recordClick = useCallback((adId: string) => {
    setAds((prev) => {
      const next = prev.map((ad) =>
        ad.id === adId ? { ...ad, clicksCount: ad.clicksCount + 1 } : ad
      );
      try {
        if (typeof window !== 'undefined') {
          localStorage.setItem(ADS_STORAGE_KEY, JSON.stringify(next));
        }
      } catch {}
      return next;
    });
  }, []);

  const addAd = useCallback(
    (newAdData: Omit<SponsoredAd, 'id' | 'viewsCount' | 'clicksCount'>) => {
      const newAd: SponsoredAd = {
        ...newAdData,
        id: `ad-${Date.now().toString(36)}`,
        viewsCount: 0,
        clicksCount: 0,
      };
      saveAds([newAd, ...ads]);
    },
    [ads]
  );

  const updateAd = useCallback(
    (id: string, updates: Partial<SponsoredAd>) => {
      const updated = ads.map((ad) => (ad.id === id ? { ...ad, ...updates } : ad));
      saveAds(updated);
    },
    [ads]
  );

  const deleteAd = useCallback(
    (id: string) => {
      const filtered = ads.filter((ad) => ad.id !== id);
      saveAds(filtered);
    },
    [ads]
  );

  return (
    <AdsContext.Provider
      value={{
        ads,
        getActiveAd,
        recordView,
        recordClick,
        addAd,
        updateAd,
        deleteAd,
      }}
    >
      {children}
    </AdsContext.Provider>
  );
}

export function useAds(): AdsContextValue {
  const ctx = useContext(AdsContext);
  if (!ctx) {
    return {
      ads: SEED_ADS,
      getActiveAd: (placement) => SEED_ADS.find((a) => a.placement === placement),
      recordView: () => {},
      recordClick: () => {},
      addAd: () => {},
      updateAd: () => {},
      deleteAd: () => {},
    };
  }
  return ctx;
}
