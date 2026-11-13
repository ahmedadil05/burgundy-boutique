'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface StoreSettings {
  storeName: {
    ar: string;
    en: string;
  };
  logoMode: 'wordmark' | 'image';
  logoUrl: string;
  crNumber: string;
  licenseNumber: string;
  launchMode: boolean; // TRUE = Pre-launch coming-soon mode, FALSE = Full shop live
  brandColorPrimary: string;
  brandColorVelvet: string;
  instagramHandle: string;
  whatsappNumber: string;
  contactPhone: string;
  contactEmail: string;
  legalEntityName: {
    ar: string;
    en: string;
  };
  address: string;
  customerServiceHours: {
    ar: string;
    en: string;
  };
  taxEnabled: boolean;
  taxRatePercent: number;
  telegramBotToken?: string;
  telegramChatId?: string;
  whatsappCloudApiEnabled: boolean;
}

export const DEFAULT_SETTINGS: StoreSettings = {
  storeName: {
    ar: 'بيرغندي',
    en: 'BURGUNDY',
  },
  logoMode: 'wordmark',
  logoUrl: '/brand/teaser-clean.jpg',
  crNumber: 'CR-189420-QA',
  licenseNumber: 'ECOM-2026-974',
  launchMode: false, // Default to FULL SHOP LIVE so customers see the entire luxury boutique!
  brandColorPrimary: '#5F0F40',
  brandColorVelvet: '#421417',
  instagramHandle: '@burgundy974_',
  whatsappNumber: '+974 5000 0974',
  contactPhone: '+974 5000 0974',
  contactEmail: 'care@burgundy.com.qa',
  legalEntityName: {
    ar: 'مؤسسة بيرغندي للأزياء والتجارة الإلكترونية',
    en: 'BURGUNDY Fashion & E-Commerce Establishment',
  },
  address: 'Zone 55, Al Waab, Doha, Qatar',
  customerServiceHours: {
    ar: 'السبت - الخميس: 9:00 ص - 9:00 م (توقيت الدوحة)',
    en: 'Saturday - Thursday: 9:00 AM - 9:00 PM (Doha Time)',
  },
  taxEnabled: false,
  taxRatePercent: 0,
  telegramBotToken: '',
  telegramChatId: '',
  whatsappCloudApiEnabled: false,
};

const SETTINGS_STORAGE_KEY = 'burgundy_store_settings';

interface SettingsContextValue {
  settings: StoreSettings;
  updateSettings: (newSettings: Partial<StoreSettings>) => void;
  resetSettings: () => void;
  toggleLaunchMode: () => void;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<StoreSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(SETTINGS_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          const sanitized = { ...parsed, launchMode: false };
          localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(sanitized));
          setSettings((prev) => ({ ...prev, ...sanitized }));
        } else {
          localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(DEFAULT_SETTINGS));
        }
      }
    } catch {
      // Ignore SSR parsing fallback
    }
  }, []);

  const updateSettings = (newSettings: Partial<StoreSettings>) => {
    setSettings((prev) => {
      const merged = { ...prev, ...newSettings };
      try {
        if (typeof window !== 'undefined') {
          localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(merged));
        }
      } catch (err) {
        console.error('Failed to persist store settings:', err);
      }
      return merged;
    });
  };

  const toggleLaunchMode = () => {
    updateSettings({ launchMode: !settings.launchMode });
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(SETTINGS_STORAGE_KEY);
      }
    } catch {}
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateSettings,
        resetSettings,
        toggleLaunchMode,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useStoreSettings(): SettingsContextValue {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    return {
      settings: DEFAULT_SETTINGS,
      updateSettings: () => {},
      resetSettings: () => {},
      toggleLaunchMode: () => {},
    };
  }
  return ctx;
}
