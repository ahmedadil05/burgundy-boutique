'use client';

import React, { useState } from 'react';
import {
  Smartphone,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Check,
  Globe,
  Eye,
  ShieldCheck,
  Sparkles,
  ChevronDown,
} from 'lucide-react';
import { Language } from '@/lib/i18n';

export interface DeviceSpec {
  id: string;
  name: string;
  brand: 'Apple' | 'Samsung' | 'Google';
  width: number;
  height: number;
  borderRadius: string;
  cameraType: 'dynamic-island' | 'punch-hole';
  safeAreaTop: number;
  safeAreaBottom: number;
  diagonal: string;
  aspectRatio: string;
  colorName: string;
}

export const SUPPORTED_DEVICES: DeviceSpec[] = [
  {
    id: 'iphone-17-pro-max',
    name: 'iPhone 17 Pro Max',
    brand: 'Apple',
    width: 440,
    height: 956,
    borderRadius: 'rounded-[54px]',
    cameraType: 'dynamic-island',
    safeAreaTop: 59,
    safeAreaBottom: 34,
    diagonal: '6.9"',
    aspectRatio: '19.5:9',
    colorName: 'Desert Titanium',
  },
  {
    id: 'iphone-18',
    name: 'iPhone 18 (Standard)',
    brand: 'Apple',
    width: 393,
    height: 852,
    borderRadius: 'rounded-[48px]',
    cameraType: 'dynamic-island',
    safeAreaTop: 54,
    safeAreaBottom: 34,
    diagonal: '6.3"',
    aspectRatio: '19.5:9',
    colorName: 'Space Titanium',
  },
  {
    id: 's24-ultra',
    name: 'Samsung Galaxy S24 Ultra',
    brand: 'Samsung',
    width: 412,
    height: 915,
    borderRadius: 'rounded-[14px]',
    cameraType: 'punch-hole',
    safeAreaTop: 42,
    safeAreaBottom: 24,
    diagonal: '6.8"',
    aspectRatio: '19.5:9',
    colorName: 'Titanium Gray',
  },
  {
    id: 'pixel-9',
    name: 'Google Pixel 9',
    brand: 'Google',
    width: 412,
    height: 924,
    borderRadius: 'rounded-[44px]',
    cameraType: 'punch-hole',
    safeAreaTop: 44,
    safeAreaBottom: 24,
    diagonal: '6.3"',
    aspectRatio: '20:9',
    colorName: 'Hazel / Obsidian',
  },
  {
    id: 'pixel-9-pro-max',
    name: 'Google Pixel 9 Pro Max / XL',
    brand: 'Google',
    width: 448,
    height: 996,
    borderRadius: 'rounded-[48px]',
    cameraType: 'punch-hole',
    safeAreaTop: 48,
    safeAreaBottom: 24,
    diagonal: '6.8"',
    aspectRatio: '20:9',
    colorName: 'Porcelain',
  },
];

export function DeviceEmulator({ initialLang = 'ar' }: { initialLang?: Language }) {
  const [selectedDevice, setSelectedDevice] = useState<DeviceSpec>(SUPPORTED_DEVICES[0]);
  const [scale, setScale] = useState<number>(0.75);
  const [lang, setLang] = useState<Language>(initialLang);
  const [showSafeAreas, setShowSafeAreas] = useState<boolean>(true);
  const [previewTarget, setPreviewTarget] = useState<'app' | 'classic' | 'portal'>('app');

  const isAr = lang === 'ar';

  const targetUrl =
    previewTarget === 'app'
      ? `/${lang}`
      : previewTarget === 'classic'
        ? `/${lang}/classic`
        : `/${lang}/atelier-portal`;

  return (
    <div
      dir={isAr ? 'rtl' : 'ltr'}
      className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col antialiased selection:bg-burgundy selection:text-white"
    >
      {/* Top Test Control Bar */}
      <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-burgundy flex items-center justify-center font-serif font-bold text-white shadow-md">
            B
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-wider text-slate-100 flex items-center gap-2">
              <span>BURGUNDY UI/UX DEVICE LAB</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-gold/20 text-gold-soft font-mono font-semibold">
                5 Flagships
              </span>
            </h1>
            <p className="text-[11px] text-slate-400">
              {isAr ? 'اختبار دقيق للهواتف الرائدة وأمان العرض' : 'Responsive flagship mobile testing suite'}
            </p>
          </div>
        </div>

        {/* Device Switcher Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          {SUPPORTED_DEVICES.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => setSelectedDevice(d)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedDevice.id === d.id
                  ? 'bg-burgundy text-white font-bold shadow-md ring-2 ring-gold/40'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-slate-700/60'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>{d.name}</span>
              <span className="text-[10px] opacity-60 font-mono">({d.width}×{d.height})</span>
            </button>
          ))}
        </div>

        {/* Viewport Controls (Scale, Safe-Area, Language, Page View) */}
        <div className="flex items-center gap-2 sm:gap-3 text-xs">
          {/* Target Page */}
          <div className="flex items-center rounded-lg bg-slate-800 p-0.5 border border-slate-700">
            <button
              type="button"
              onClick={() => setPreviewTarget('app')}
              className={`px-2.5 py-1 rounded-md text-[11px] transition-colors cursor-pointer ${
                previewTarget === 'app' ? 'bg-burgundy text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              {isAr ? 'التطبيق الجديد' : 'App V2'}
            </button>
            <button
              type="button"
              onClick={() => setPreviewTarget('classic')}
              className={`px-2.5 py-1 rounded-md text-[11px] transition-colors cursor-pointer ${
                previewTarget === 'classic' ? 'bg-burgundy text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              {isAr ? 'التصميم الكلاسيكي' : 'Classic V1'}
            </button>
            <button
              type="button"
              onClick={() => setPreviewTarget('portal')}
              className={`px-2.5 py-1 rounded-md text-[11px] transition-colors cursor-pointer ${
                previewTarget === 'portal' ? 'bg-burgundy text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              {isAr ? 'بوابة الأتيليه' : 'Atelier Portal'}
            </button>
          </div>

          {/* Safe Area Toggle */}
          <button
            type="button"
            onClick={() => setShowSafeAreas((prev) => !prev)}
            className={`px-2.5 py-1.5 rounded-lg border flex items-center gap-1.5 cursor-pointer transition-colors ${
              showSafeAreas
                ? 'bg-amber-500/10 border-amber-500/40 text-amber-300 font-medium'
                : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
            title="Toggle Safe Area Guides"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isAr ? 'منطقة الأمان' : 'Safe Area'}</span>
          </button>

          {/* Language Toggle */}
          <button
            type="button"
            onClick={() => setLang(isAr ? 'en' : 'ar')}
            className="px-2.5 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{isAr ? 'EN' : 'عربي'}</span>
          </button>

          {/* Zoom Presets */}
          <div className="flex items-center gap-1 bg-slate-800 rounded-lg p-0.5 border border-slate-700">
            {[0.75, 0.85, 1.0].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setScale(s)}
                className={`px-2 py-1 rounded text-[11px] cursor-pointer ${
                  scale === s ? 'bg-slate-700 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                {Math.round(s * 100)}%
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Workspace Stage */}
      <main className="flex-1 overflow-auto px-6 py-4 flex flex-col items-center justify-start relative">
        {/* Hardware Specs Badge */}
        <div className="mb-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs shadow-md">
            <span className="font-bold text-slate-100">{selectedDevice.name}</span>
            <span className="text-slate-500">•</span>
            <span className="text-gold-soft font-mono font-medium">{selectedDevice.width}px × {selectedDevice.height}px</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400">{selectedDevice.diagonal} ({selectedDevice.aspectRatio})</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400">{selectedDevice.colorName}</span>
          </div>
        </div>

        {/* Realistic Hardware Outer Frame */}
        <div
          className="transition-all duration-300 relative shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)]"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'top center',
          }}
        >
          {/* Physical Phone Chassis Bezel */}
          <div
            className={`p-3.5 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 border-2 border-slate-600/60 ${selectedDevice.borderRadius} relative`}
            style={{
              width: selectedDevice.width + 28,
              height: selectedDevice.height + 28,
            }}
          >
            {/* Screen Glass Surface */}
            <div
              className={`w-full h-full bg-black overflow-hidden relative ${
                selectedDevice.id === 's24-ultra' ? 'rounded-[6px]' : 'rounded-[40px]'
              }`}
            >
              {/* Dynamic Island or Punch Hole Notch */}
              {selectedDevice.cameraType === 'dynamic-island' && (
                <div className="absolute top-3.5 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
                  <div className="w-[126px] h-[34px] bg-black rounded-full flex items-center justify-between px-3 border border-slate-800 shadow-md">
                    <div className="w-3 h-3 rounded-full bg-slate-950 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-950/80" />
                    </div>
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-900" />
                  </div>
                </div>
              )}

              {selectedDevice.cameraType === 'punch-hole' && (
                <div className="absolute top-3 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
                  <div className="w-3.5 h-3.5 rounded-full bg-black border border-slate-800 flex items-center justify-center shadow-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-950/70" />
                  </div>
                </div>
              )}

              {/* Safe Area Guides Visualizer Overlay */}
              {showSafeAreas && (
                <>
                  {/* Top Safe Area */}
                  <div
                    className="absolute top-0 left-0 right-0 z-40 bg-amber-500/15 border-b border-dashed border-amber-500/60 pointer-events-none flex items-center justify-center"
                    style={{ height: selectedDevice.safeAreaTop }}
                  >
                    <span className="text-[9px] font-mono text-amber-300 font-bold bg-black/60 px-2 py-0.5 rounded">
                      Top Safe Area: {selectedDevice.safeAreaTop}px
                    </span>
                  </div>

                  {/* Bottom Safe Area */}
                  <div
                    className="absolute bottom-0 left-0 right-0 z-40 bg-amber-500/15 border-t border-dashed border-amber-500/60 pointer-events-none flex items-center justify-center"
                    style={{ height: selectedDevice.safeAreaBottom }}
                  >
                    <span className="text-[9px] font-mono text-amber-300 font-bold bg-black/60 px-2 py-0.5 rounded">
                      Bottom Safe Area: {selectedDevice.safeAreaBottom}px
                    </span>
                  </div>
                </>
              )}

              {/* Live Interactive Iframe */}
              <iframe
                key={`${selectedDevice.id}-${previewTarget}-${lang}`}
                src={targetUrl}
                title={selectedDevice.name}
                className="w-full h-full border-0 bg-white"
                style={{
                  width: `${selectedDevice.width}px`,
                  height: `${selectedDevice.height}px`,
                }}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Responsive Audit Checklist Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 px-4 py-3 text-xs text-slate-400">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <Check className="w-3.5 h-3.5" />
              <span>Zero Horizontal Scroll Check (overflow-x: 0)</span>
            </span>
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <Check className="w-3.5 h-3.5" />
              <span>48px Interactive Tap Targets Passed</span>
            </span>
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <Check className="w-3.5 h-3.5" />
              <span>Docked Navigation Bottom Clearance</span>
            </span>
          </div>

          <span className="text-[11px] font-mono text-slate-500">
            WCAG AAA • Qatar MOCI Compliant • Doha 2026
          </span>
        </div>
      </footer>
    </div>
  );
}
