'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  ShoppingBag,
  Heart,
  Search,
  Menu,
  X,
  Globe,
  Coins,
  Palette,
  MessageCircle,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  Sparkles,
} from 'lucide-react';
import { useStore } from '../../lib/store';
import { useStoreSettings } from '../../lib/settings-store';
import { Language, getDictionary } from '../../lib/i18n';
import { Currency } from '../../lib/currency';
import { BurgundyLogo } from '../brand/BurgundyLogo';

export function Header({ lang = 'ar' }: { lang?: Language }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  const { cartCount, wishlist, currency, setCurrency, setLanguage, openCart } = useStore();
  const { settings } = useStoreSettings();
  const router = useRouter();
  const pathname = usePathname();
  const dict = getDictionary(lang);
  const isRtl = lang === 'ar';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const toggleLanguage = () => {
    const nextLang = lang === 'ar' ? 'en' : 'ar';
    setLanguage(nextLang);
    const newPath = pathname ? pathname.replace(`/${lang}`, `/${nextLang}`) : `/${nextLang}`;
    router.push(newPath);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/${lang}/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  const navLinks: Array<{
    href: string;
    label: string;
    highlight?: boolean;
    secondary?: boolean;
  }> = [
    { href: `/${lang}/shop`, label: isRtl ? 'المتجر الكامل' : 'All Collections' },
    { href: `/${lang}/shop?category=toubs`, label: isRtl ? 'ثياب سودانية' : 'Sudanese Toubs' },
    { href: `/${lang}/shop?category=jalabiyas`, label: isRtl ? 'جلابيات راقية' : 'Luxury Jalabiyas' },
    { href: `/${lang}/custom-order`, label: isRtl ? 'تفصيل ورسم خاص' : 'Bespoke Atelier', highlight: true },
    { href: `/${lang}/about`, label: isRtl ? 'قصة الدار' : 'Atelier Story' },
    // Secondary destination — only from xl up to avoid overcrowding at lg
    { href: `/${lang}/tracking`, label: isRtl ? 'تتبع طلبك' : 'Track Order', secondary: true },
  ];

  const isActiveLink = (href: string) => {
    if (href.includes('?') || !pathname) return false;
    if (href === `/${lang}`) return pathname === `/${lang}` || pathname === `/${lang}/`;
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Floating Apple-style pill navigation — restyled for the rebrand */}
      <header className="pointer-events-none fixed top-10 sm:top-11 inset-x-0 z-40 px-2 sm:px-4">
        <div className="pointer-events-auto max-w-[1440px] mx-auto h-16 xl:h-[4.5rem] flex items-center justify-between gap-3 px-3 sm:px-4 xl:px-6 rounded-3xl border border-gold-hairline/60 bg-white/85 supports-[backdrop-filter]:bg-white/80 backdrop-blur-2xl shadow-[0_8px_40px_rgba(66,20,23,0.14),0_2px_8px_rgba(66,20,23,0.06)] transition-all duration-300">
          
          {/* ========================================================= */}
          {/* 1. DESKTOP HEADER (lg and above)                          */}
          {/* ========================================================= */}
          <div className="hidden lg:flex items-center justify-between h-16 xl:h-[4.5rem] gap-4 xl:gap-6">
            {/* Left: Brand Emblem & Wordmark */}
            <div className="shrink-0 flex items-center">
              <BurgundyLogo
                variant="full"
                size="lg"
                href={`/${lang}`}
                lang={lang}
              />
            </div>

            {/* Center: Single Unified Primary Navigation */}
            <nav
              aria-label={isRtl ? 'التنقل الرئيسي' : 'Primary navigation'}
              className="flex items-center gap-1.5 xl:gap-2 min-w-0"
            >
              {navLinks.map((link) => {
                const active = isActiveLink(link.href);
                const secondary = link.secondary;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? 'page' : undefined}
                    className={`${
                      secondary ? 'hidden xl:inline-flex' : 'inline-flex'
                    } items-center gap-1.5 whitespace-nowrap text-[12.5px] font-semibold tracking-normal normal-case transition-colors px-3 py-1.5 rounded-full ${
                      link.highlight
                        ? 'text-burgundy font-bold bg-burgundy/10 ring-1 ring-burgundy/20'
                        : active
                        ? 'bg-burgundy/10 text-burgundy ring-1 ring-burgundy/20'
                        : 'text-slateText-body hover:text-burgundy hover:bg-surface-peachSoft/50'
                    }`}
                  >
                    {link.highlight && (
                      <Sparkles className="w-3.5 h-3.5 text-gold-line" aria-hidden="true" />
                    )}
                    <span>{link.label}</span>
                    <span
                      aria-hidden="true"
                      className={`absolute bottom-0 start-0 h-[1.5px] bg-gold-line transition-all duration-300 ${
                        active ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Right: Compact Utilities */}
            <div className="flex items-center gap-1 xl:gap-2 shrink-0">
              {/* Currency Switcher */}
              <div className="flex items-center text-[11px] font-semibold text-slateText-secondary bg-white border border-gold-hairline rounded-full px-2.5 py-1">
                <Coins className="w-3.5 h-3.5 text-gold-line me-1" aria-hidden="true" />
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as Currency)}
                  className="bg-transparent focus:outline-none cursor-pointer"
                  aria-label="Currency"
                >
                  <option value="QAR">QAR (ر.ق)</option>
                  <option value="USD">USD ($)</option>
                </select>
              </div>

              {/* Language Switcher */}
              <button
                type="button"
                onClick={toggleLanguage}
                className="flex items-center gap-1 text-[11px] font-bold text-slateText-body hover:text-burgundy bg-white border border-gold-hairline rounded-full px-2.5 py-1 transition-colors"
                aria-label="Switch Language"
              >
                <Globe className="w-3.5 h-3.5 text-gold-line" aria-hidden="true" />
                <span>{lang === 'ar' ? 'EN' : 'عربي'}</span>
              </button>

              {/* Search */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-slateText-body hover:text-burgundy hover:bg-surface-peachSoft/40 rounded-full transition-colors"
                aria-label="Search"
                aria-expanded={isSearchOpen}
              >
                <Search className="w-4 h-4" aria-hidden="true" />
              </button>

              {/* Wishlist */}
              <Link
                href={`/${lang}/wishlist`}
                className="relative p-2 text-slateText-body hover:text-burgundy hover:bg-surface-peachSoft/40 rounded-full transition-colors"
                aria-label={isRtl ? 'المفضلة' : 'Wishlist'}
              >
                <Heart className="w-4 h-4" aria-hidden="true" />
                {wishlist.length > 0 && (
                  <span className="absolute top-0.5 end-0.5 min-w-[14px] h-3.5 px-0.5 text-[9px] font-bold bg-burgundy text-white rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Bag CTA (Opens Slide-over Cart Drawer) */}
              <button
                type="button"
                onClick={openCart}
                className="relative inline-flex items-center gap-1.5 bg-burgundy hover:bg-burgundy-hover text-white text-xs font-bold rounded-full px-3 py-1.5 transition-colors shadow-luxury focus:outline-none focus-visible:ring-2 focus-visible:ring-burgundy"
                aria-label={isRtl ? 'افتحي الحقيبة' : 'Open Shopping Bag'}
              >
                <ShoppingBag className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{cartCount}</span>
              </button>
            </div>
          </div>

          {/* ========================================================= */}
          {/* 2. PHONE / MOBILE HEADER (under lg)                       */}
          {/* ========================================================= */}
          <div className="flex lg:hidden items-center justify-between h-16">
            {/* Mobile Hamburger Drawer Trigger */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -ms-2 touch-target-48 rounded-xl text-burgundy hover:bg-surface-peachSoft/30 flex items-center justify-center focus:outline-none"
              aria-label="Open mobile navigation menu"
            >
              <Menu className="w-6 h-6 stroke-[2]" strokeWidth={2} />
            </button>

            {/* Compact Brand Logo */}
            <div className="flex-1 flex justify-center">
              <BurgundyLogo
                variant="compact"
                size="md"
                href={`/${lang}`}
                lang={lang}
              />
            </div>

            {/* Mobile Actions: Search & Quick Bag */}
            <div className="flex items-center gap-1 -me-2">
              <button
                type="button"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 touch-target-48 text-slateText-body hover:text-burgundy flex items-center justify-center"
                aria-label="Search"
              >
                <Search className="w-5 h-5 stroke-[2]" strokeWidth={2} />
              </button>

              <button
                type="button"
                onClick={openCart}
                className="relative p-2 touch-target-48 text-burgundy flex items-center justify-center focus:outline-none"
                aria-label="Open Shopping Bag"
              >
                <div className="relative">
                  <ShoppingBag className="w-5 h-5 stroke-[2]" strokeWidth={2} />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -end-1 min-w-[15px] h-3.5 px-0.5 text-[9px] font-bold bg-burgundy text-white rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Global Search Bar Dropdown */}
        {isSearchOpen && (
          <div className="py-3 px-4 pb-4 border-t border-gold-hairline/60 bg-white/95 backdrop-blur-md animate-fadeIn">
            <form onSubmit={handleSearchSubmit} className="relative max-w-xl mx-auto flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={dict.nav.searchPlaceholder}
                className="w-full px-4 py-2.5 pe-10 rounded-full border border-gold-line bg-canvas text-sm text-slateText-body focus:outline-none focus:ring-2 focus:ring-burgundy/40"
                autoFocus
              />
              <button
                type="submit"
                className="absolute end-2 p-1.5 text-slateText-secondary hover:text-burgundy"
                aria-label="Submit search"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </header>

      {/* ========================================================= */}
      {/* 3. MOBILE EDITORIAL SLIDE-OUT DRAWER                      */}
      {/* ========================================================= */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-burgundy-deep/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer Panel */}
          <div
            dir={isRtl ? 'rtl' : 'ltr'}
            className="relative w-full max-w-xs sm:max-w-sm bg-canvas h-full flex flex-col shadow-2xl border-e border-gold-hairline z-10 overflow-y-auto"
          >
            {/* Drawer Header */}
            <div className="p-5 border-b border-gold-hairline flex items-center justify-between bg-white">
              <BurgundyLogo variant="compact" size="sm" lang={lang} />
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-full text-slateText-body hover:bg-surface-peachSoft/40 touch-target-48 flex items-center justify-center"
                aria-label="Close menu"
              >
                <X className="w-5 h-5 text-burgundy" />
              </button>
            </div>

            {/* WhatsApp VIP Concierge Action */}
            <div className="p-4 bg-surface-cream border-b border-gold-hairline">
              <a
                href={`https://wa.me/97450000974?text=${encodeURIComponent(
                  isRtl
                    ? 'مرحباً دار بيرغندي للأزياء، أود الاستفسار عن التشكيلة الخاصة وحجز استشارة.'
                    : 'Hello BURGUNDY Haute Couture Atelier, I would like to inquire about bespoke collections.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-2xl bg-white border border-gold-line shadow-sm hover:border-burgundy transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-burgundy block">
                      {isRtl ? 'خدمة كبار الشخصيات VIP' : 'VIP Concierge Desk'}
                    </span>
                    <span className="text-[10px] text-slateText-secondary">
                      {isRtl ? 'واتساب مباشر مع الأتيليه' : 'Direct WhatsApp Atelier'}
                    </span>
                  </div>
                </div>
                {isRtl ? (
                  <ChevronLeft className="w-4 h-4 text-gold-line" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gold-line" />
                )}
              </a>
            </div>

            {/* Navigation Category List */}
            <div className="flex-1 p-4 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gold-ink px-3 mb-2 block">
                {isRtl ? 'التصاميم والتشكيلات' : 'Collections & Atelier'}
              </span>

              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-3 rounded-xl text-sm font-semibold text-slateText-body hover:text-burgundy hover:bg-white border border-transparent hover:border-gold-hairline transition-all"
                >
                  <span className={link.highlight ? 'text-burgundy font-bold flex items-center gap-1.5' : ''}>
                    {link.highlight && <Sparkles className="w-4 h-4 text-gold-line" />}
                    {link.label}
                  </span>
                  {isRtl ? (
                    <ChevronLeft className="w-4 h-4 text-slateText-secondary/50" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-slateText-secondary/50" />
                  )}
                </Link>
              ))}

              <div className="pt-4 mt-4 border-t border-gold-hairline/60">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gold-ink px-3 mb-2 block">
                  {isRtl ? 'الإدارة والخدمات' : 'Management & Portal'}
                </span>

                <Link
                  href={`/${lang}/atelier-portal`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-3 rounded-xl text-sm font-semibold text-burgundy hover:bg-white border border-transparent hover:border-gold-hairline"
                >
                  <span>{isRtl ? 'بوابة إدارة الأتيليه (ERP/CRM)' : 'Atelier Admin Portal'}</span>
                  {isRtl ? (
                    <ChevronLeft className="w-4 h-4 text-slateText-secondary/50" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-slateText-secondary/50" />
                  )}
                </Link>
              </div>
            </div>

            {/* Drawer Footer: Language & Currency Switchers */}
            <div className="p-4 bg-white border-t border-gold-hairline space-y-3">
              <div className="flex items-center justify-between gap-3">
                {/* Language Switch */}
                <button
                  type="button"
                  onClick={() => {
                    toggleLanguage();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-gold-hairline text-xs font-bold text-slateText-body hover:text-burgundy bg-canvas"
                >
                  <Globe className="w-4 h-4 text-gold-line" />
                  <span>{lang === 'ar' ? 'English Version' : 'النسخة العربية'}</span>
                </button>

                {/* Currency Switch */}
                <div className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl border border-gold-hairline text-xs font-semibold text-slateText-body bg-canvas">
                  <Coins className="w-3.5 h-3.5 text-gold-line" />
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value as Currency)}
                    className="bg-transparent text-xs font-bold focus:outline-none cursor-pointer"
                  >
                    <option value="QAR">QAR (ر.ق)</option>
                    <option value="USD">USD ($)</option>
                  </select>
                </div>
              </div>

              {/* Legal Note */}
              <div className="text-[10px] text-slateText-secondary text-center flex items-center justify-center gap-1.5 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-line shrink-0" />
                <span>{isRtl ? 'بوتيك مرخص رسمياً في دولة قطر' : 'Official Licensed Qatar Boutique'}</span>
              </div>
            </div>
          </div>
        </div>
        )}
    </>
  );
}
