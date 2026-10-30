'use client';

import React, { useState } from 'react';
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
  ShieldCheck,
} from 'lucide-react';
import { useStore } from '../../lib/store';
import { Language, getDictionary } from '../../lib/i18n';
import { Currency } from '../../lib/currency';
import { siteConfig } from '../../config/site';

export function Header({ lang = 'ar' }: { lang?: Language }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cartCount, wishlist, currency, setCurrency, setLanguage } = useStore();
  const router = useRouter();
  const pathname = usePathname();
  const dict = getDictionary(lang);

  const toggleLanguage = () => {
    const nextLang = lang === 'ar' ? 'en' : 'ar';
    setLanguage(nextLang);
    // Replace URL lang prefix if present
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
    <header className="sticky top-0 z-40 bg-cream/95 backdrop-blur-md border-b border-peach-soft/70 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-cocoa-dark hover:bg-blush-surface focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Brand Logo */}
          <Link href={`/${lang}`} className="flex flex-col items-center group">
            <span className="text-2xl sm:text-3xl font-extrabold font-cairo text-cocoa-dark tracking-wide group-hover:text-coral-warm transition-colors">
              {siteConfig.name[lang]}
            </span>
            <span className="text-[10px] tracking-widest uppercase font-semibold text-coral-warm -mt-1">
              {lang === 'ar' ? 'فخامة سودانية في قطر' : 'Sudanese Couture'}
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            <Link
              href={`/${lang}`}
              className="text-sm font-semibold text-cocoa-dark hover:text-coral-warm transition-colors"
            >
              {dict.nav.home}
            </Link>
            <Link
              href={`/${lang}/shop?category=toubs`}
              className="text-sm font-semibold text-cocoa-dark hover:text-coral-warm transition-colors"
            >
              {dict.nav.toubs}
            </Link>
            <Link
              href={`/${lang}/shop?category=jalabiyas`}
              className="text-sm font-semibold text-cocoa-dark hover:text-coral-warm transition-colors"
            >
              {dict.nav.jalabiyas}
            </Link>
            <Link
              href={`/${lang}/shop?category=daraas`}
              className="text-sm font-semibold text-cocoa-dark hover:text-coral-warm transition-colors"
            >
              {dict.nav.daraas}
            </Link>
            <Link
              href={`/${lang}/shop?category=dresses`}
              className="text-sm font-semibold text-cocoa-dark hover:text-coral-warm transition-colors"
            >
              {dict.nav.dresses}
            </Link>
            <Link
              href={`/${lang}/about`}
              className="text-sm font-semibold text-cocoa-dark hover:text-coral-warm transition-colors"
            >
              {dict.nav.about}
            </Link>
            <Link
              href={`/${lang}/style-guide`}
              className="text-xs font-bold text-coral-warm bg-blush-surface px-2.5 py-1 rounded-full border border-peach-soft hover:bg-peach-soft/60 transition-colors"
            >
              {dict.nav.styleGuide}
            </Link>
          </nav>

          {/* Right Actions: Currency, Language, Search, Wishlist, Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Currency Selector */}
            <div className="hidden sm:flex items-center text-xs font-semibold text-cocoa-dark bg-white/70 border border-peach-soft rounded-full px-2.5 py-1 shadow-sm">
              <Coins className="w-3.5 h-3.5 text-coral-warm me-1.5 shrink-0" />
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
              className="flex items-center gap-1 text-xs font-bold text-cocoa-dark hover:text-coral-warm bg-white/70 border border-peach-soft rounded-full px-2.5 py-1 transition-colors"
              aria-label="Switch language"
            >
              <Globe className="w-3.5 h-3.5 text-coral-warm" />
              <span>{lang === 'ar' ? 'English' : 'العربية'}</span>
            </button>

            {/* Search Trigger */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-cocoa-dark hover:text-coral-warm hover:bg-blush-surface rounded-full transition-colors"
              aria-label="Search products"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Link */}
            <Link
              href={`/${lang}/wishlist`}
              className="relative p-2 text-cocoa-dark hover:text-coral-warm hover:bg-blush-surface rounded-full transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 end-1 w-4 h-4 text-[10px] font-bold bg-coral-warm text-white rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Link */}
            <Link
              href={`/${lang}/cart`}
              className="relative flex items-center gap-1.5 p-2 bg-coral-warm text-white hover:bg-coral-hover rounded-full px-3 py-1.5 transition-colors shadow-warm"
              aria-label="Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="text-xs font-bold">{cartCount}</span>
            </Link>
          </div>
        </div>

        {/* Search Input Bar (Dropdown) */}
        {isSearchOpen && (
          <div className="py-3 pb-4 border-t border-peach-soft/50 animate-fadeIn">
            <form onSubmit={handleSearchSubmit} className="relative max-w-xl mx-auto flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={dict.nav.searchPlaceholder}
                className="w-full px-4 py-2.5 pe-10 rounded-full border border-peach-deep/60 bg-white text-sm text-cocoa-dark focus:outline-none focus:ring-2 focus:ring-coral-warm"
                autoFocus
              />
              <button
                type="submit"
                className="absolute end-2 p-1.5 text-cocoa-muted hover:text-coral-warm"
                aria-label="Submit search"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-cream border-b border-peach-soft px-4 py-6 space-y-4 animate-fadeIn">
          <nav className="flex flex-col space-y-3">
            <Link
              href={`/${lang}`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-bold text-cocoa-dark hover:text-coral-warm"
            >
              {dict.nav.home}
            </Link>
            <Link
              href={`/${lang}/shop?category=toubs`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-bold text-cocoa-dark hover:text-coral-warm"
            >
              {dict.nav.toubs}
            </Link>
            <Link
              href={`/${lang}/shop?category=jalabiyas`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-bold text-cocoa-dark hover:text-coral-warm"
            >
              {dict.nav.jalabiyas}
            </Link>
            <Link
              href={`/${lang}/shop?category=daraas`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-bold text-cocoa-dark hover:text-coral-warm"
            >
              {dict.nav.daraas}
            </Link>
            <Link
              href={`/${lang}/shop?category=dresses`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-bold text-cocoa-dark hover:text-coral-warm"
            >
              {dict.nav.dresses}
            </Link>
            <Link
              href={`/${lang}/about`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-bold text-cocoa-dark hover:text-coral-warm"
            >
              {dict.nav.about}
            </Link>
            <Link
              href={`/${lang}/complaints`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-bold text-coral-warm"
            >
              {dict.nav.complaints}
            </Link>
            <Link
              href={`/${lang}/style-guide`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-bold text-cocoa-muted"
            >
              {dict.nav.styleGuide}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
