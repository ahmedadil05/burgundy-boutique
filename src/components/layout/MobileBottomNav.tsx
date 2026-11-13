'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Sparkles, Palette, Heart, ShoppingBag } from 'lucide-react';
import { Language } from '@/lib/i18n';
import { useStore } from '@/lib/store';

export function MobileBottomNav({ lang = 'ar' }: { lang?: Language }) {
  const pathname = usePathname();
  const { cartCount, wishlist, openCart } = useStore();
  const isAr = lang === 'ar';

  const isActive = (path: string) => {
    if (path === `/${lang}`) {
      return pathname === `/${lang}` || pathname === `/${lang}/`;
    }
    return pathname?.startsWith(path);
  };

  const navItems = [
    {
      href: `/${lang}`,
      label: isAr ? 'الرئيسية' : 'Home',
      icon: Home,
      badge: null,
    },
    {
      href: `/${lang}/shop`,
      label: isAr ? 'المتجر' : 'Boutique',
      icon: Sparkles,
      badge: null,
    },
    {
      href: `/${lang}/custom-order`,
      label: isAr ? 'تفصيل خاص' : 'Bespoke',
      icon: Palette,
      badge: null,
    },
    {
      href: `/${lang}/wishlist`,
      label: isAr ? 'المفضلة' : 'Wishlist',
      icon: Heart,
      badge: wishlist.length > 0 ? wishlist.length : null,
    },
    {
      href: `/${lang}/cart`,
      label: isAr ? 'الحقيبة' : 'Bag',
      icon: ShoppingBag,
      badge: cartCount > 0 ? cartCount : null,
      isCartAction: true,
    },
  ];

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="lg:hidden fixed bottom-0 start-0 end-0 z-40 bg-white/95 backdrop-blur-lg border-t border-gold-hairline shadow-[0_-4px_20px_rgba(95,15,64,0.06)] px-2 py-1.5 transition-transform"
    >
      <div className="max-w-md mx-auto grid grid-cols-5 items-center">
        {navItems.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;

          if (item.isCartAction) {
            return (
              <button
                key={item.href}
                type="button"
                onClick={openCart}
                className="relative flex flex-col items-center justify-center py-1 touch-target-48 rounded-xl transition-all duration-200 text-slateText-secondary hover:text-burgundy font-medium focus:outline-none"
              >
                <div className="relative">
                  <Icon className="w-5 h-5 stroke-[1.6px]" />
                  {item.badge !== null && (
                    <span className="absolute -top-1.5 -end-2 min-w-[16px] h-4 px-1 rounded-full bg-burgundy text-white text-[9.5px] font-bold flex items-center justify-center shadow-sm">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="text-[10px] mt-1 tracking-tight leading-none text-slateText-secondary">
                  {item.label}
                </span>
              </button>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex flex-col items-center justify-center py-1 touch-target-48 rounded-xl transition-all duration-200 ${
                active
                  ? 'text-burgundy font-bold scale-[1.02]'
                  : 'text-slateText-secondary hover:text-burgundy font-medium'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    active ? 'stroke-[2.2px] text-burgundy scale-110' : 'stroke-[1.6px]'
                  }`}
                />
                {item.badge !== null && (
                  <span className="absolute -top-1.5 -end-2 min-w-[16px] h-4 px-1 rounded-full bg-burgundy text-white text-[9.5px] font-bold flex items-center justify-center shadow-sm">
                    {item.badge}
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] mt-1 tracking-tight leading-none ${
                  active ? 'text-burgundy font-bold' : 'text-slateText-secondary'
                }`}
              >
                {item.label}
              </span>
              {active && (
                <span className="w-1 h-1 rounded-full bg-burgundy mt-0.5" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
