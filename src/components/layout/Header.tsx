'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  ShoppingBag,
  Heart,
  Search,
  Menu,
  X,
  Globe,
  Coins,
  ShieldCheck,
  Palette,
  Megaphone,
} from 'lucide-react';
import { useStore } from '../../lib/store';
import { useStoreSettings } from '../../lib/settings-store';
import { Language, getDictionary } from '../../lib/i18n';
import { Currency } from '../../lib/currency';

export function Header({ lang = 'ar' }: { lang?: Language }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cartCount, wishlist, currency, setCurrency, setLanguage } = useStore();
  const { settings } = useStoreSettings();
  const router = useRouter();
  const pathname = usePathname();
  const dict = getDictionary(lang);

  const isRtl = lang === 'ar';

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

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gold-hairline transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-slateText-body hover:bg-surface-peachSoft/40 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6 text-burgundy" /> : <Menu className="w-6 h-6 text-burgundy" />}
            </button>
          </div>

          {/* Brand Logo / Wordmark in High-Contrast Serif */}
          <Link href={`/${lang}`} className="flex flex-col items-center group">
            {settings.logoMode === 'image' && settings.logoUrl ? (
              <div className="relative w-28 h-10">
                <Image
                  src={settings.logoUrl}
                  alt={settings.storeName.en}
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <span className="brand-wordmark text-2xl sm:text-3xl text-burgundy group-hover:text-burgundy-hover transition-colors">
                {settings.storeName.en}
              </span>
            )}
            <span className="text-[10px] tracking-widest uppercase font-semibold text-gold-shimmer -mt-0.5">
              {isRtl ? 'أزياء سودانية فاخرة • قطر' : 'Sudanese Couture • Qatar'}
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link
              href={`/${lang}`}
              className="text-xs font-semibold text-slateText-body hover:text-burgundy transition-colors uppercase tracking-wider"
            >
              {dict.nav.home}
            </Link>
            <Link
              href={`/${lang}/shop?category=toubs`}
              className="text-xs font-semibold text-slateText-body hover:text-burgundy transition-colors uppercase tracking-wider"
            >
              {dict.nav.toubs}
            </Link>
            <Link
              href={`/${lang}/shop?category=jalabiyas`}
              className="text-xs font-semibold text-slateText-body hover:text-burgundy transition-colors uppercase tracking-wider"
            >
              {dict.nav.jalabiyas}
            </Link>
            <Link
              href={`/${lang}/shop?category=scarves`}
              className="text-xs font-semibold text-slateText-body hover:text-burgundy transition-colors uppercase tracking-wider"
            >
              {dict.nav.accessories}
            </Link>
            <Link
              href={`/${lang}/custom-order`}
              className="text-xs font-semibold text-burgundy hover:text-burgundy-hover transition-colors uppercase tracking-wider flex items-center gap-1"
            >
              <Palette className="w-3.5 h-3.5" />
              <span>{dict.nav.customOrder}</span>
            </Link>
            <Link
              href={`/${lang}/advertise`}
              className="text-xs font-semibold text-gold-shimmer hover:text-burgundy transition-colors uppercase tracking-wider flex items-center gap-1"
            >
              <Megaphone className="w-3.5 h-3.5" />
              <span>{dict.nav.advertise}</span>
            </Link>
            <Link
              href={`/${lang}/about`}
              className="text-xs font-semibold text-slateText-body hover:text-burgundy transition-colors uppercase tracking-wider"
            >
              {dict.nav.about}
            </Link>
          </nav>

          {/* Right Actions: Currency, Language, Search, Wishlist, Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Currency Selector */}
            <div className="hidden sm:flex items-center text-xs font-semibold text-slateText-body bg-white border border-gold-hairline rounded-full px-2.5 py-1 shadow-sm">
              <Coins className="w-3.5 h-3.5 text-gold-line me-1.5 shrink-0" />
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as Currency)}
                className="bg-transparent focus:outline-none cursor-pointer"
                aria-label="Select currency"
              >
                <option value="QAR">QAR (ر.ق)</option>
                <option value="USD">USD ($)</option>
                <option value="SDG">SDG (ج.س)</option>
              </select>
            </div>

            {/* Language Switcher */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="flex items-center gap-1 text-xs font-bold text-slateText-body hover:text-burgundy bg-white border border-gold-hairline rounded-full px-2.5 py-1 transition-colors"
              aria-label="Switch language"
            >
              <Globe className="w-3.5 h-3.5 text-gold-line" />
              <span>{lang === 'ar' ? 'English' : 'العربية'}</span>
            </button>

            {/* Search Trigger */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-slateText-body hover:text-burgundy hover:bg-surface-peachSoft/40 rounded-full transition-colors"
              aria-label="Search products"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Link */}
            <Link
              href={`/${lang}/wishlist`}
              className="relative p-2 text-slateText-body hover:text-burgundy hover:bg-surface-peachSoft/40 rounded-full transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 end-1 w-4 h-4 text-[10px] font-bold bg-burgundy text-white rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Link */}
            <Link
              href={`/${lang}/cart`}
              className="relative flex items-center gap-1.5 p-2 bg-burgundy text-white hover:bg-burgundy-hover rounded-full px-3 py-1.5 transition-colors shadow-luxury"
              aria-label="Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="text-xs font-bold">{cartCount}</span>
            </Link>
          </div>
        </div>

        {/* Search Input Bar (Dropdown) */}
        {isSearchOpen && (
          <div className="py-3 pb-4 border-t border-gold-hairline animate-fadeIn">
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

        {/* Mobile Flyout Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gold-hairline space-y-3 animate-fadeIn">
            <div className="flex flex-col space-y-2">
              <Link
                href={`/${lang}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-bold text-slateText-body hover:text-burgundy hover:bg-surface-peachSoft/40 rounded-xl"
              >
                {dict.nav.home}
              </Link>
              <Link
                href={`/${lang}/shop?category=toubs`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-bold text-slateText-body hover:text-burgundy hover:bg-surface-peachSoft/40 rounded-xl"
              >
                {dict.nav.toubs}
              </Link>
              <Link
                href={`/${lang}/shop?category=jalabiyas`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-bold text-slateText-body hover:text-burgundy hover:bg-surface-peachSoft/40 rounded-xl"
              >
                {dict.nav.jalabiyas}
              </Link>
              <Link
                href={`/${lang}/shop?category=scarves`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-bold text-slateText-body hover:text-burgundy hover:bg-surface-peachSoft/40 rounded-xl"
              >
                {dict.nav.accessories}
              </Link>
              <Link
                href={`/${lang}/custom-order`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-bold text-burgundy hover:bg-surface-peachSoft/40 rounded-xl flex items-center gap-2"
              >
                <Palette className="w-4 h-4" />
                <span>{dict.nav.customOrder}</span>
              </Link>
              <Link
                href={`/${lang}/advertise`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-bold text-gold-shimmer hover:bg-surface-peachSoft/40 rounded-xl flex items-center gap-2"
              >
                <Megaphone className="w-4 h-4" />
                <span>{dict.nav.advertise}</span>
              </Link>
              <Link
                href={`/${lang}/about`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-bold text-slateText-body hover:text-burgundy hover:bg-surface-peachSoft/40 rounded-xl"
              >
                {dict.nav.about}
              </Link>
              <Link
                href={`/${lang}/admin`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-bold text-slateText-secondary hover:text-burgundy hover:bg-surface-peachSoft/40 rounded-xl flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{dict.nav.admin}</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
