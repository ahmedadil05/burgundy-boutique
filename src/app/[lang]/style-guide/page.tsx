'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Textarea, Select, Checkbox } from '@/components/ui/Controls';
import { Accordion } from '@/components/ui/Accordion';
import { ProductCard } from '@/components/ui/ProductCard';
import { ShoppingBag, ArrowRight, ArrowLeft, Heart, Sparkles, CheckCircle2 } from 'lucide-react';

export default function StyleGuidePage() {
  const [activeTab, setActiveTab] = useState<'both' | 'rtl' | 'ltr'>('both');

  const colorTokens = [
    { name: 'Primary Soft Peach', hex: '#FFC9A8', token: 'bg-peach-soft', desc: 'Borders, light tags, subtle accents' },
    { name: 'Deep Peach', hex: '#F9A57B', token: 'bg-peach-deep', desc: 'Secondary buttons, active highlights' },
    { name: 'Warm Coral', hex: '#E8795A', token: 'bg-coral-warm', desc: 'Primary CTA, sale badges, key highlights' },
    { name: 'Cream Background', hex: '#FFF6EE', token: 'bg-cream', desc: 'Main page background canvas' },
    { name: 'Blush Surface', hex: '#FFE5D4', token: 'bg-blush-surface', desc: 'Cards, elevated containers, light hovers' },
    { name: 'Deep Cocoa', hex: '#3B2A24', token: 'bg-cocoa-dark', desc: 'Headings & primary body (11.2:1 contrast)' },
    { name: 'Warm Muted Cocoa', hex: '#725447', token: 'bg-cocoa-muted', desc: 'Captions, subtitles (5.4:1 contrast AA)' },
  ];

  const sampleProduct = {
    id: 'sg-prod-1',
    slug: 'royal-swiss-voile-toub',
    title: {
      ar: 'ثوب سويسري ملكي مطرز بالذهب',
      en: 'Royal Swiss Voile Toub with Gold Work',
    },
    priceQAR: 1450,
    originalPriceQAR: 1750,
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    category: 'toubs',
    badge: 'heritage' as const,
    inStock: true,
    fabric: { ar: 'فوال سويسري 100% قطن', en: '100% Swiss Cotton Voile' },
  };

  const sampleAccordion = (isArabic: boolean) => [
    {
      id: 'acc-1',
      title: isArabic ? 'مواصفات القماش وجودة الحياكة' : 'Fabric Specifications & Craftsmanship',
      content: isArabic
        ? 'فوال سويسري قطني 100% مستورد ومطرز بخيوط الحرير والذهب في ورشاتنا بالسودان بأعلى معايير الدقة.'
        : '100% pure imported Swiss cotton voile, hand-embroidered with gold and silk threads in Sudan.',
    },
    {
      id: 'acc-2',
      title: isArabic ? 'إرشادات الغسيل والعناية' : 'Washing & Care Instructions',
      content: isArabic
        ? 'غسيل جاف (Dry Clean) لحماية التطريز اليدوي وثبات الألوان الأصيلة.'
        : 'Dry clean only to preserve intricate hand needlework and brilliant fabric luster.',
    },
  ];

  return (
    <div className="min-h-screen bg-cream py-10 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-10 text-center">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-peach-soft text-cocoa-dark mb-3">
          <Sparkles className="w-3.5 h-3.5 text-coral-warm" />
          Kandaka Boutique Design System
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-cocoa-dark font-cairo">
          دليل التصميم — Peach Sorbet Palette & Components
        </h1>
        <p className="mt-2 text-sm text-cocoa-muted max-w-2xl mx-auto">
          Showcasing responsive UI primitives, WCAG AA accessible typography, and cultural touches in both Arabic (RTL) and English (LTR).
        </p>

        {/* View Switcher */}
        <div className="mt-6 inline-flex p-1 bg-blush-surface rounded-full border border-peach-soft shadow-inner">
          <button
            onClick={() => setActiveTab('both')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'both'
                ? 'bg-coral-warm text-white shadow-sm'
                : 'text-cocoa-dark hover:text-coral-warm'
            }`}
          >
            Side-by-Side (RTL & LTR)
          </button>
          <button
            onClick={() => setActiveTab('rtl')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'rtl'
                ? 'bg-coral-warm text-white shadow-sm'
                : 'text-cocoa-dark hover:text-coral-warm'
            }`}
          >
            Arabic (RTL) View
          </button>
          <button
            onClick={() => setActiveTab('ltr')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'ltr'
                ? 'bg-coral-warm text-white shadow-sm'
                : 'text-cocoa-dark hover:text-coral-warm'
            }`}
          >
            English (LTR) View
          </button>
        </div>
      </div>

      {/* Palette Swatches Section */}
      <div className="max-w-7xl mx-auto mb-14 bg-white/70 rounded-3xl p-6 sm:p-8 border border-peach-soft shadow-sm">
        <h2 className="text-xl font-bold text-cocoa-dark mb-4 flex items-center gap-2">
          <span>لوحة الألوان & التحقق من التباين (WCAG AA Compliance)</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
          {colorTokens.map((c) => (
            <div key={c.hex} className="flex flex-col rounded-2xl overflow-hidden border border-peach-soft/60 shadow-sm bg-white">
              <div className={`h-20 w-full ${c.token}`} />
              <div className="p-3 flex flex-col flex-1 justify-between text-xs">
                <div>
                  <p className="font-bold text-cocoa-dark leading-tight">{c.name}</p>
                  <p className="font-mono text-[11px] text-cocoa-muted mt-0.5">{c.hex}</p>
                </div>
                <p className="text-[10px] text-cocoa-muted mt-2 border-t border-peach-soft/40 pt-1.5">
                  {c.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Component Showcase Container */}
      <div
        className={`max-w-7xl mx-auto grid gap-8 ${
          activeTab === 'both' ? 'lg:grid-cols-2' : 'grid-cols-1'
        }`}
      >
        {/* RTL (Arabic) Panel */}
        {(activeTab === 'both' || activeTab === 'rtl') && (
          <div dir="rtl" className="bg-cream-light border-2 border-peach-deep/30 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-peach-soft">
              <div>
                <span className="text-xs font-bold text-coral-warm uppercase tracking-wider">الواجهة العربية (RTL)</span>
                <h3 className="text-xl font-bold font-cairo text-cocoa-dark">العناصر والأنماط التفاعلية</h3>
              </div>
              <Badge variant="new">الوضع الافتراضي</Badge>
            </div>

            {/* Buttons */}
            <section className="mb-8">
              <h4 className="text-sm font-bold text-cocoa-muted mb-3">١. الأزرار (Buttons)</h4>
              <div className="flex flex-wrap gap-3 items-center">
                <Button variant="primary" icon={<ShoppingBag className="w-4 h-4" />}>
                  تسوقي الآن (Primary)
                </Button>
                <Button variant="secondary">
                  استكشفي المجموعة (Secondary)
                </Button>
                <Button variant="outline">
                  إضافة للمفضلة (Outline)
                </Button>
                <Button variant="ghost">
                  عرض المزيد (Ghost)
                </Button>
                <Button variant="primary" isLoading>
                  جاري التحميل
                </Button>
              </div>
            </section>

            {/* Badges */}
            <section className="mb-8">
              <h4 className="text-sm font-bold text-cocoa-muted mb-3">٢. الشارات (Badges)</h4>
              <div className="flex flex-wrap gap-2.5 items-center">
                <Badge variant="heritage">أصالة سودانية</Badge>
                <Badge variant="new">جديد هذا الأسبوع</Badge>
                <Badge variant="sale">خصم 25%</Badge>
                <Badge variant="soldout">نفدت الكمية</Badge>
                <Badge variant="neutral">فوال سويسري</Badge>
              </div>
            </section>

            {/* Form Inputs */}
            <section className="mb-8">
              <h4 className="text-sm font-bold text-cocoa-muted mb-3">٣. حقول الإدخال (Inputs)</h4>
              <div className="space-y-3.5">
                <Input
                  label="الاسم الكامل"
                  placeholder="أدخلي اسمكِ الثلاثي"
                  defaultValue="سارة أحمد المهدي"
                />
                <Input
                  label="رقم الجوال القطري"
                  placeholder="+974 5000 0000"
                  helperText="يستخدم للتوصيل وتأكيد الطلب فقط"
                />
                <Select
                  label="المدينة / المنطقة"
                  options={[
                    { value: 'doha', label: 'الدوحة (Zone 1 - 50)' },
                    { value: 'rayyan', label: 'الريان (Zone 51 - 60)' },
                    { value: 'wakrah', label: 'الوكرة (Zone 90)' },
                  ]}
                />
                <Checkbox
                  label="أوافق على الشروط وسياسة الخصوصية وفق القرار الوزاري القطري رقم 25 لسنة 2026"
                  defaultChecked
                />
              </div>
            </section>

            {/* Product Card */}
            <section className="mb-8">
              <h4 className="text-sm font-bold text-cocoa-muted mb-3">٤. بطاقة المنتج (Product Card)</h4>
              <div className="max-w-xs">
                <ProductCard product={sampleProduct} lang="ar" currency="QAR" />
              </div>
            </section>

            {/* Accordion */}
            <section>
              <h4 className="text-sm font-bold text-cocoa-muted mb-3">٥. القائمة المنسدلة (Accordion)</h4>
              <Accordion items={sampleAccordion(true)} defaultOpenId="acc-1" />
            </section>
          </div>
        )}

        {/* LTR (English) Panel */}
        {(activeTab === 'both' || activeTab === 'ltr') && (
          <div dir="ltr" className="bg-cream-light border-2 border-peach-soft rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-peach-soft">
              <div>
                <span className="text-xs font-bold text-coral-warm uppercase tracking-wider">English Interface (LTR)</span>
                <h3 className="text-xl font-bold font-playfair text-cocoa-dark">Components & Design Primitives</h3>
              </div>
              <Badge variant="neutral">LTR Switched</Badge>
            </div>

            {/* Buttons */}
            <section className="mb-8">
              <h4 className="text-sm font-bold text-cocoa-muted mb-3">1. Buttons</h4>
              <div className="flex flex-wrap gap-3 items-center">
                <Button variant="primary" icon={<ShoppingBag className="w-4 h-4" />}>
                  Shop Now (Primary)
                </Button>
                <Button variant="secondary">
                  Explore Collection (Secondary)
                </Button>
                <Button variant="outline">
                  Save to Wishlist (Outline)
                </Button>
                <Button variant="ghost">
                  View More (Ghost)
                </Button>
                <Button variant="primary" isLoading>
                  Loading
                </Button>
              </div>
            </section>

            {/* Badges */}
            <section className="mb-8">
              <h4 className="text-sm font-bold text-cocoa-muted mb-3">2. Badges</h4>
              <div className="flex flex-wrap gap-2.5 items-center">
                <Badge variant="heritage">Sudanese Craft</Badge>
                <Badge variant="new">New Arrival</Badge>
                <Badge variant="sale">25% OFF</Badge>
                <Badge variant="soldout">Sold Out</Badge>
                <Badge variant="neutral">Swiss Voile</Badge>
              </div>
            </section>

            {/* Form Inputs */}
            <section className="mb-8">
              <h4 className="text-sm font-bold text-cocoa-muted mb-3">3. Form Controls</h4>
              <div className="space-y-3.5">
                <Input
                  label="Full Name"
                  placeholder="Enter your full name"
                  defaultValue="Sara Ahmed Al-Mahdi"
                />
                <Input
                  label="Qatar Mobile Number"
                  placeholder="+974 5000 0000"
                  helperText="Used strictly for courier delivery updates"
                />
                <Select
                  label="Municipality / Area"
                  options={[
                    { value: 'doha', label: 'Doha (Zones 1 - 50)' },
                    { value: 'rayyan', label: 'Al Rayyan (Zones 51 - 60)' },
                    { value: 'wakrah', label: 'Al Wakrah (Zone 90)' },
                  ]}
                />
                <Checkbox
                  label="I agree to Terms & Conditions under Qatar Ministerial Decision No. 25 of 2026"
                  defaultChecked
                />
              </div>
            </section>

            {/* Product Card */}
            <section className="mb-8">
              <h4 className="text-sm font-bold text-cocoa-muted mb-3">4. Product Card</h4>
              <div className="max-w-xs">
                <ProductCard product={sampleProduct} lang="en" currency="QAR" />
              </div>
            </section>

            {/* Accordion */}
            <section>
              <h4 className="text-sm font-bold text-cocoa-muted mb-3">5. Accordion</h4>
              <Accordion items={sampleAccordion(false)} defaultOpenId="acc-1" />
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
