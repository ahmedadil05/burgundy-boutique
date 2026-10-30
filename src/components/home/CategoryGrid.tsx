import React from 'react';
import Link from 'next/link';
import { Language, getDictionary } from '../../lib/i18n';
import { ArrowUpRight } from 'lucide-react';

export function CategoryGrid({ lang = 'ar' }: { lang?: Language }) {
  const dict = getDictionary(lang);
  const isAr = lang === 'ar';

  const categories = [
    {
      id: 'toubs',
      title: dict.nav.toubs,
      subtitle: isAr ? 'فوال سويسري، حرير جاكار، وتطريز ذهب' : 'Swiss Voile, Jacquard & Gold Embroidery',
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
      count: isAr ? '١٨ تصميماً' : '18 Designs',
      href: `/${lang}/shop?category=toubs`,
    },
    {
      id: 'jalabiyas',
      title: dict.nav.jalabiyas,
      subtitle: isAr ? 'جلابيات نسائية راقية للضيافة والمناسبات' : 'Festive & Hospitality Silhouettes',
      image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80',
      count: isAr ? '١٢ تصميماً' : '12 Designs',
      href: `/${lang}/shop?category=jalabiyas`,
    },
    {
      id: 'daraas',
      title: dict.nav.daraas,
      subtitle: isAr ? 'كتان الجزيرة وتطريزات الحناء الناعمة' : 'Gezira Linen with Henna Details',
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
      count: isAr ? '١٠ تصاميم' : '10 Designs',
      href: `/${lang}/shop?category=daraas`,
    },
    {
      id: 'dresses',
      title: dict.nav.dresses,
      subtitle: isAr ? 'فساتين عصرية مستوحاة من الهوية النوبية' : 'Contemporary Modest Silhouettes',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
      count: isAr ? '٨ تصاميم' : '8 Designs',
      href: `/${lang}/shop?category=dresses`,
    },
  ];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-bold text-coral-warm uppercase tracking-wider">
          {isAr ? 'عالم كنداكة' : 'Curated Categories'}
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-cocoa-dark font-cairo mt-1">
          {dict.home.featuredCategoriesTitle}
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-cocoa-muted">
          {dict.home.featuredCategoriesSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={cat.href}
            className="group relative flex flex-col h-80 rounded-3xl overflow-hidden border border-peach-soft shadow-sm hover:shadow-warm transition-all duration-300"
          >
            {/* Background Image */}
            <img
              src={cat.image}
              alt={cat.title}
              className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-cocoa-dark/85 via-cocoa-dark/30 to-transparent" />

            {/* Content at Bottom */}
            <div className="relative mt-auto p-5 text-white flex flex-col justify-end">
              <span className="text-[11px] font-bold text-peach-soft uppercase tracking-wider mb-1">
                {cat.count}
              </span>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold font-cairo leading-tight group-hover:text-peach-soft transition-colors">
                  {cat.title}
                </h3>
                <span className="p-2 rounded-full bg-white/20 group-hover:bg-coral-warm transition-colors">
                  <ArrowUpRight className="w-4 h-4 text-white rtl-flip" />
                </span>
              </div>
              <p className="text-[11px] text-cream-light/80 mt-1 line-clamp-1">
                {cat.subtitle}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
