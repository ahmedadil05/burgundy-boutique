'use client';

import React, { useState, useEffect } from 'react';
import {
  ShoppingBag,
  Home as HomeIcon,
  Phone,
  MapPin,
  Clock,
  Sparkles,
  Palette,
  CheckCircle,
  ArrowLeft,
  Share2,
  Filter,
  Check,
  ChevronRight,
  ChevronLeft,
  X,
  CreditCard,
  MessageCircle,
  Truck,
  ShieldCheck,
  Heart,
  Plus,
  Trash2,
  Star,
} from 'lucide-react';
import { Language } from '@/lib/i18n';

// --- DATA TYPES ---
export interface ProductItem {
  id: string;
  title: string;
  category: string;
  fabric: string;
  sizes: string;
  price: number;
  stock: number;
  imageUrl?: string;
  titleAr?: string;
  descriptionAr?: string;
  badge?: string;
}

export interface CartItem extends ProductItem {
  cartId: number;
  selectedSize: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  date: string;
  total: number;
  status: 'Confirmed' | 'Processing' | 'In Atelier' | 'Shipped' | 'Delivered' | string;
  customerInfo: {
    name: string;
    phone: string;
    address: string;
    municipality?: string;
    method: string;
    notes?: string;
  };
  items: CartItem[];
}

export interface BespokeCommission {
  id: string;
  name: string;
  phone: string;
  fabric: string;
  colorScheme: string;
  notes: string;
  date: string;
  status: 'Received' | 'Consultation' | 'Painting' | 'Delivered';
}

// Initial luxury hand-painted collection (MOCI Compliant, Qatar bespoke)
export const DEFAULT_PRODUCTS: ProductItem[] = [
  {
    id: 'prod-1',
    title: 'Royal Swiss Voile Toub — Golden Dunes',
    titleAr: 'توب توتال سويسري ملكي — كثبان الذهب',
    category: 'Toub',
    fabric: 'Swiss Voile 100%',
    sizes: 'Free Size (4.5m × 110cm)',
    price: 1850,
    stock: 6,
    imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    descriptionAr: 'توتال سويسري نخب أول برسم يدوي ناعم يحاكي التموجات الذهبية للرمال، مع رقائق مذهبة مقاومة للغسيل.',
    badge: 'الأكثر طلباً',
  },
  {
    id: 'prod-2',
    title: 'Hand-Painted Pure Silk Toub — Burgundy Bloom',
    titleAr: 'توب حرير طبيعي مشغول باليد — زهر البيرغندي',
    category: 'Toub',
    fabric: 'Pure Natural Silk',
    sizes: 'Free Size (4.5m × 110cm)',
    price: 2400,
    stock: 4,
    imageUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    descriptionAr: 'حرير انسيابي بارد مع نقوش يدوية منفذة بفرشاة الفنان الدقيقة، يعكس فخامة المناسبات الراقية.',
    badge: 'قطعة حصرية',
  },
  {
    id: 'prod-3',
    title: 'Bespoke Painted Linen Jalabiya — Pearl Oasis',
    titleAr: 'جلابية كتان راقية بالرسم اليدوي — واحة اللؤلؤ',
    category: 'Jalabiya',
    fabric: 'Pure French Linen',
    sizes: 'S, M, L, XL',
    price: 950,
    stock: 9,
    imageUrl: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80',
    descriptionAr: 'كتان فرنسي معالج مريح بياقة مطرزة ورسم هندسي سوداني معاصر على الأكمام والحاشية.',
    badge: 'تصميم جديد',
  },
  {
    id: 'prod-4',
    title: 'Artisanal Silk Scarf — Nile Whisper',
    titleAr: 'طرحة حريرية مذهبة — همس النيل',
    category: 'Scarf',
    fabric: 'Silk Chiffon',
    sizes: '200cm × 70cm',
    price: 450,
    stock: 14,
    imageUrl: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=800&q=80',
    descriptionAr: 'شال حريري خفيف بلمسات الرسم اليدوي الذهبية، يضفي هالة ملكية على أي إطلالة خليجية.',
    badge: 'إصدار محدود',
  },
  {
    id: 'prod-5',
    title: 'Bridal Daraa — Royal Oud & Henna Motif',
    titleAr: 'درّاعة عرائس فاخرة — نقشة الحناء والعود',
    category: 'Daraa',
    fabric: 'Raw Silk & Gold Thread',
    sizes: 'Made to Measure',
    price: 3200,
    stock: 2,
    imageUrl: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
    descriptionAr: 'قطعة العروس الملكية مطرزة بالخيوط الذهبية ومرسومة يدوياً بحناء سودانية معاصرة تدوم طويلاً.',
    badge: 'تفصيل خاص',
  },
];

export function BurgundyInteractiveApp({ initialLang = 'ar' }: { initialLang?: Language }) {
  const [lang, setLang] = useState<Language>(initialLang);
  const isAr = lang === 'ar';

  // Navigation State
  const [customerView, setCustomerView] = useState<'home' | 'shop' | 'bespoke' | 'cart' | 'checkout' | 'invoice'>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  // Data State with LocalStorage Persistence
  const [products, setProducts] = useState<ProductItem[]>(DEFAULT_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentOrder, setCurrentOrder] = useState<OrderItem | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const storedProds = localStorage.getItem('burgundy_boutique_products');
      if (storedProds) {
        setProducts(JSON.parse(storedProds));
      }
      const storedCart = localStorage.getItem('burgundy_boutique_cart');
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    } catch {
      // ignore
    }
  }, []);

  // Save cart
  useEffect(() => {
    try {
      localStorage.setItem('burgundy_boutique_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Cart operations
  const addToCart = (product: ProductItem, size: string) => {
    setCart((prev) => [...prev, { ...product, cartId: Date.now(), selectedSize: size }]);
    setCustomerView('cart');
  };

  const removeFromCart = (cartId: number) => {
    setCart((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const cartTotal = cart.reduce((sum, item) => sum + Number(item.price || 0), 0);

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());

  // ==========================================
  // CUSTOMER VIEWS
  // ==========================================
  return (
    <div
      dir={isAr ? 'rtl' : 'ltr'}
      className="min-h-screen bg-canvas text-slateText-body font-body selection:bg-peach-sorbet selection:text-burgundy flex flex-col antialiased relative"
    >
      {/* 1. Subtle Luxury Top Status Bar */}
      <div className="bg-canvas-warm/70 border-b border-gold/20 py-1.5 px-4 text-center text-[11px] text-slateText-secondary flex items-center justify-center gap-2">
        <Sparkles className="w-3 h-3 text-gold-ink" strokeWidth={1.5} />
        <span>
          {isAr
            ? 'توصيل فاخر وسريع خلال 24–48 ساعة في كافة مناطق قطر • دفع آمن عبر فوران وكيوباي'
            : 'Exclusive hand-painted couture • 24–48h express white-glove delivery across Qatar'}
        </span>
      </div>

      {/* 2. Haute Couture Header */}
      <header className="sticky top-0 z-40 bg-canvas/90 backdrop-blur-md border-b border-gold/25 px-4 py-3.5 transition-all">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          {/* Brand Wordmark */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setCustomerView('home')}
              className="text-left cursor-pointer group flex items-center gap-2.5"
            >
              <div className="w-8 h-8 rounded-full bg-burgundy flex items-center justify-center shadow-gold">
                <span className="font-cormorant font-bold text-white text-base leading-none">B</span>
              </div>
              <div className="flex flex-col">
                <span className="font-cormorant text-xl tracking-[0.2em] font-bold text-burgundy group-hover:text-burgundy-hover transition-colors">
                  BURGUNDY
                </span>
                <span className="text-[9px] tracking-widest text-gold-ink font-sans uppercase -mt-1 font-semibold">
                  {isAr ? 'بيرغندي • الدوحة' : 'DOHA • HAUTE COUTURE'}
                </span>
              </div>
            </button>
          </div>

          {/* Quick Actions (Language, Bespoke, Bag) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher */}
            <button
              type="button"
              onClick={() => setLang(isAr ? 'en' : 'ar')}
              className="text-xs font-semibold px-2.5 py-1.5 rounded-full border border-gold/40 text-burgundy hover:bg-gold/10 transition-colors flex items-center gap-1.5"
              aria-label="Toggle Language"
            >
              <span className="text-[11px] font-sans">{isAr ? 'English' : 'عربي'}</span>
            </button>

            {/* Bespoke Shortcut Pill (Desktop) */}
            <button
              type="button"
              onClick={() => setCustomerView('bespoke')}
              className="hidden sm:flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-surface-peachSoft text-burgundy hover:bg-peach-sorbet transition-colors"
            >
              <Palette className="w-3.5 h-3.5" strokeWidth={1.5} />
              <span>{isAr ? 'تفصيل خاص' : 'Bespoke Toub'}</span>
            </button>

            {/* Shopping Bag Button with Counter */}
            <button
              type="button"
              onClick={() => setCustomerView('cart')}
              className="relative p-2 rounded-full border border-gold/30 hover:bg-burgundy/5 text-burgundy transition-all cursor-pointer"
              aria-label="View Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-burgundy text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-sm animate-pulse">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* 3. Main Dynamic Content Area */}
      <main className="flex-1 pb-[calc(env(safe-area-inset-bottom)+80px)]">
        {customerView === 'home' && (
          <div className="animate-in fade-in duration-500">
            {/* Hero Banner */}
            <section className="relative overflow-hidden bg-gradient-to-b from-canvas-warm/80 via-canvas to-surface-peachSoft/30 py-12 sm:py-20 px-4 text-center border-b border-gold/20">
              <div className="max-w-3xl mx-auto flex flex-col items-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-burgundy/5 border border-gold/30 text-burgundy text-xs font-medium mb-4">
                  <Sparkles className="w-3.5 h-3.5 text-gold-ink" strokeWidth={1.5} />
                  {isAr ? 'مجموعة أثواب التوتال السويسري والحرير الطبيعي' : 'Artisanal Sudanese Toubs & Swiss Voile'}
                </span>

                <h1 className="font-display text-4xl sm:text-6xl font-bold text-burgundy leading-tight mb-4 drop-shadow-sm">
                  {isAr ? 'أصالة الثوب السوداني بلمسة ملكية' : 'Bespoke Sudanese Luxury in Doha'}
                </h1>

                <p className="font-body text-base sm:text-lg text-slateText-body max-w-xl leading-relaxed mb-8">
                  {isAr
                    ? 'قطع فنية نادرة مرسومة يدوياً بالفرشاة على أفخر أقمشة التوتال السويسري والحرير، صممت خصيصاً للمرأة الأنيقة في قطر والخليج.'
                    : 'Hand-painted couture toubs and tailored linen jalabiyas, combining ancient Nubian craftsmanship with understated Gulf opulence.'}
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3 w-full max-w-md">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory('all');
                      setCustomerView('shop');
                    }}
                    className="flex-1 py-3.5 px-6 rounded-full bg-burgundy text-white font-medium text-sm hover:bg-burgundy-hover shadow-luxury transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{isAr ? 'تصفحي المجموعة الحصرية' : 'Explore Haute Collection'}</span>
                    {isAr ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => setCustomerView('bespoke')}
                    className="py-3.5 px-5 rounded-full border border-gold bg-canvas text-burgundy font-medium text-sm hover:bg-gold/10 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Palette className="w-4 h-4 text-gold-ink" strokeWidth={1.5} />
                    <span>{isAr ? 'طلب تفصيل خاص' : 'Commission Bespoke'}</span>
                  </button>
                </div>
              </div>
            </section>

            {/* Featured Collections Strip */}
            <section className="py-12 px-4 max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-burgundy">
                    {isAr ? 'روائع الأتيليه الأكثر طلباً' : 'Curated Atelier Pieces'}
                  </h2>
                  <p className="text-xs sm:text-sm text-slateText-secondary mt-1">
                    {isAr ? 'كميات محدودة مرسومة يدوياً قطعة بقطعة' : 'Handcrafted in limited runs per bespoke season'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setCustomerView('shop')}
                  className="text-xs sm:text-sm font-semibold text-burgundy hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>{isAr ? 'عرض الكل' : 'View All'}</span>
                  {isAr ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {products.slice(0, 4).map((p) => (
                  <ProductCardItem
                    key={p.id}
                    product={p}
                    isAr={isAr}
                    isFavorite={favorites.includes(p.id)}
                    onToggleFavorite={() => toggleFavorite(p.id)}
                    onSelect={() => setSelectedProduct(p)}
                    onAddToCart={() => addToCart(p, p.sizes.split(',')[0].trim())}
                  />
                ))}
              </div>
            </section>

            {/* Artisanal Story ("Behind The Brush") */}
            <section className="py-12 px-4 bg-canvas-warm/50 border-y border-gold/20">
              <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
                <div className="w-full md:w-1/2 aspect-square rounded-2xl overflow-hidden shadow-soft relative border border-gold/30">
                  <img
                    src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80"
                    alt="Hand painting Toub"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-burgundy/60 via-transparent to-transparent flex items-end p-6">
                    <span className="text-white text-xs font-mono tracking-wider uppercase">
                      {isAr ? 'الرسم اليدوي الحي • أتيليه بيرغندي' : 'LIVE ATELIER PAINTING'}
                    </span>
                  </div>
                </div>

                <div className="w-full md:w-1/2 space-y-4">
                  <span className="text-xs font-bold text-coral-ink uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-gold-ink" strokeWidth={1.5} />
                    {isAr ? 'وراء الريشة والألوان' : 'BEHIND THE BRUSH'}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-burgundy leading-snug">
                    {isAr
                      ? 'لكل ثوب حكاية نُسجت بفرشاة الفنان وخيوط الحرير'
                      : 'Each piece is a wearable canvas painted by master artisans'}
                  </h3>
                  <p className="text-sm text-slateText-body leading-relaxed">
                    {isAr
                      ? 'نستخدم أصباغاً نباتية ومعدنية مخصصة للأقمشة السويسرية والحريرية الطبيعية، تثبت بحرارة دقيقة وتُزيّن بالرقائق الذهبية لتمنحكِ قطعة فريدة لا تتكرر، تدوم بريقها لسنوات.'
                      : 'Our artisans layer natural pigments onto Swiss voile and pure silk. Fixed with artisanal steaming techniques, each Toub withstands delicate hand-washing while retaining its shimmer.'}
                  </p>
                  <div className="pt-2 flex items-center gap-4 text-xs font-medium text-slateText-secondary">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-gold-ink" strokeWidth={1.5} />
                      <span>{isAr ? 'أقمشة سويسرية 100%' : '100% Swiss Voile'}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Truck className="w-4 h-4 text-gold-ink" strokeWidth={1.5} />
                      <span>{isAr ? 'توصيل قطر السريع' : 'Qatar Express'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Client Testimonials */}
            <section className="py-12 px-4 max-w-4xl mx-auto text-center">
              <h3 className="font-display text-2xl font-bold text-burgundy mb-6">
                {isAr ? 'آراء عميلاتنا في قطر' : 'Client Testimonials in Qatar'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-canvas-white border border-gold/25 shadow-soft text-right">
                <div className="flex items-center gap-0.5 mb-2" role="img" aria-label={isAr ? 'تقييم ٥ من ٥' : '5 out of 5 stars'}>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-gold-ink text-gold-ink" aria-hidden="true" />
                  ))}
                </div>
                  <p className="font-body text-xs sm:text-sm text-slateText-body leading-relaxed mb-3">
                    "{isAr ? 'الثوب السويسري والرسم يفوق الوصف من الفخامة والنعومة! وصلني في لوسيل مع تغليف ملكي فاخر.' : 'The Swiss toub and delicate painting exceeded my expectations. Delivered in Lusail in regal packaging.'}"
                  </p>
                  <p className="text-xs font-bold text-burgundy">{isAr ? 'عائشة آل ثاني — لوسيل' : 'Aisha Al-Thani — Lusail'}</p>
                </div>
                <div className="p-5 rounded-2xl bg-canvas-white border border-gold/25 shadow-soft text-right">
                <div className="flex items-center gap-0.5 mb-2" role="img" aria-label={isAr ? 'تقييم ٥ من ٥' : '5 out of 5 stars'}>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-gold-ink text-gold-ink" aria-hidden="true" />
                  ))}
                </div>
                  <p className="font-body text-xs sm:text-sm text-slateText-body leading-relaxed mb-3">
                    "{isAr ? 'طلبت تفصيل خاص لمناسبة زواج، وتعامل الأتيليه وسرعة التنسيق عبر الواتساب كانت استثنائية.' : 'Commissioned a bespoke piece for a wedding. The atelier WhatsApp concierge was exceptionally attentive.'}"
                  </p>
                  <p className="text-xs font-bold text-burgundy">{isAr ? 'مريم الكواري — الدوحة' : 'Maryam Al-Kuwari — Doha'}</p>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* SHOP VIEW */}
        {customerView === 'shop' && (
          <div className="max-w-6xl mx-auto px-4 py-8 animate-in fade-in duration-300">
            <div className="text-center mb-8">
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-burgundy mb-2">
                {isAr ? 'المجموعة الكاملة' : 'Boutique Collection'}
              </h2>
              <p className="text-xs sm:text-sm text-slateText-secondary max-w-md mx-auto">
                {isAr ? 'أثواب توتال، حرير طبيعي، وجلابيات مرسومة يدوياً متوفرة للتسليم الفوري في قطر.' : 'Exclusive hand-painted Toubs, Swiss voile, and luxury jalabiyas.'}
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
              {[
                { id: 'all', labelAr: 'الكل', labelEn: 'All Items' },
                { id: 'Toub', labelAr: 'الأثواب الفاخرة', labelEn: 'Royal Toubs' },
                { id: 'Jalabiya', labelAr: 'الجلابيات الكتان', labelEn: 'Linen Jalabiyas' },
                { id: 'Scarf', labelAr: 'الشيلان الحريرية', labelEn: 'Silk Scarves' },
                { id: 'Daraa', labelAr: 'درّاعات العرائس', labelEn: 'Bridal Daraas' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory.toLowerCase() === cat.id.toLowerCase()
                      ? 'bg-burgundy text-white shadow-soft font-semibold'
                      : 'bg-canvas-white border border-gold/30 text-slateText-body hover:bg-gold/10'
                  }`}
                >
                  {isAr ? cat.labelAr : cat.labelEn}
                </button>
              ))}
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredProducts.map((p) => (
                <ProductCardItem
                  key={p.id}
                  product={p}
                  isAr={isAr}
                  isFavorite={favorites.includes(p.id)}
                  onToggleFavorite={() => toggleFavorite(p.id)}
                  onSelect={() => setSelectedProduct(p)}
                  onAddToCart={() => addToCart(p, p.sizes.split(',')[0].trim())}
                />
              ))}
            </div>
          </div>
        )}

        {/* BESPOKE COMMISSIONS VIEW */}
        {customerView === 'bespoke' && (
          <BespokeFormView isAr={isAr} onBack={() => setCustomerView('home')} />
        )}

        {/* CART VIEW */}
        {customerView === 'cart' && (
          <div className="max-w-md mx-auto px-4 py-8 animate-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center gap-3 mb-6">
              <button
                type="button"
                onClick={() => setCustomerView('shop')}
                className="p-1.5 rounded-full hover:bg-gold/15 text-burgundy cursor-pointer"
                aria-label="Back to Shop"
              >
                {isAr ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
              </button>
              <h2 className="font-display text-2xl font-bold text-burgundy">
                {isAr ? 'حقيبة المشتريات' : 'Shopping Bag'}
              </h2>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-16 px-4 bg-canvas-white rounded-2xl border border-gold/20 shadow-soft">
                <ShoppingBag className="w-12 h-12 text-gold-line mx-auto mb-3 opacity-60" strokeWidth={1.5} />
                <p className="text-slateText-body font-medium mb-1">
                  {isAr ? 'حقيبتكِ فارغة حالياً' : 'Your bag is currently empty'}
                </p>
                <p className="text-xs text-slateText-secondary mb-6">
                  {isAr ? 'استكشفي أحدث أثواب الأتيليه وشاركينا ذوقكِ الرفيع.' : 'Discover our hand-painted toub collection.'}
                </p>
                <button
                  type="button"
                  onClick={() => setCustomerView('shop')}
                  className="px-6 py-3 rounded-full bg-burgundy text-white text-xs font-semibold hover:bg-burgundy-hover transition-colors shadow-soft cursor-pointer"
                >
                  {isAr ? 'تصفح المجموعة' : 'Explore Catalog'}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.cartId}
                    className="flex gap-3.5 p-3.5 rounded-2xl bg-canvas-white border border-gold/25 shadow-soft relative"
                  >
                    <div className="w-20 h-24 rounded-xl overflow-hidden bg-canvas-warm flex-shrink-0 border border-gold/20">
                      {item.imageUrl && (
                        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                      <div>
                        <h4 className="font-display text-base font-bold text-burgundy truncate">
                          {isAr && item.titleAr ? item.titleAr : item.title}
                        </h4>
                        <p className="text-[11px] text-slateText-secondary mt-0.5">
                          {item.fabric} • {item.selectedSize}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-bold text-sm text-burgundy">
                          {item.price} <span className="text-[10px] text-gold-ink font-sans font-semibold">QAR</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.cartId)}
                          className="text-slateText-secondary hover:text-coral-ink transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Subtotal & Action Bar */}
                <div className="p-4 rounded-2xl bg-canvas-warm/70 border border-gold/25 space-y-3 mt-6">
                  <div className="flex justify-between text-xs text-slateText-secondary">
                    <span>{isAr ? 'قيمة المشتريات' : 'Subtotal'}</span>
                    <span>{cartTotal} QAR</span>
                  </div>
                  <div className="flex justify-between text-xs text-slateText-secondary">
                    <span>{isAr ? 'التوصيل (داخل قطر)' : 'Delivery (Qatar)'}</span>
                    <span className="text-green-700 font-semibold">{isAr ? 'مجاني للطلبات الفاخرة' : 'Complimentary'}</span>
                  </div>
                  <div className="border-t border-gold/30 pt-3 flex justify-between items-center font-bold text-base text-burgundy">
                    <span className="font-display text-lg">{isAr ? 'المجموع النهائي' : 'Total'}</span>
                    <span>{cartTotal} QAR</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setCustomerView('checkout')}
                    className="w-full py-3.5 rounded-full bg-burgundy text-white font-medium text-sm hover:bg-burgundy-hover shadow-luxury transition-all cursor-pointer flex items-center justify-center gap-2 mt-4"
                  >
                    <span>{isAr ? 'المتابعة لتأكيد الطلب والدفع' : 'Proceed to Checkout'}</span>
                    {isAr ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* CHECKOUT VIEW */}
        {customerView === 'checkout' && (
          <CheckoutView
            cart={cart}
            cartTotal={cartTotal}
            isAr={isAr}
            onBack={() => setCustomerView('cart')}
            onOrderSuccess={(order) => {
              setCurrentOrder(order);
              setCart([]);
              setCustomerView('invoice');
            }}
          />
        )}

        {/* INVOICE VIEW */}
        {customerView === 'invoice' && currentOrder && (
          <InvoiceView order={currentOrder} isAr={isAr} onHome={() => setCustomerView('home')} />
        )}
      </main>

      {/* 4. Luxury Mobile Docked Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-canvas-white/95 backdrop-blur-lg border-t border-gold/30 px-4 py-2 pb-[calc(env(safe-area-inset-bottom)+8px)] shadow-lg">
        <div className="max-w-md mx-auto flex items-center justify-around">
          {/* Home */}
          <button
            type="button"
            onClick={() => setCustomerView('home')}
            className={`flex flex-col items-center gap-1 text-[11px] font-medium transition-colors cursor-pointer ${
              customerView === 'home' ? 'text-burgundy font-bold' : 'text-slateText-secondary hover:text-burgundy'
            }`}
          >
            <HomeIcon className="w-5 h-5" strokeWidth={customerView === 'home' ? 2 : 1.5} />
            <span>{isAr ? 'الرئيسية' : 'Home'}</span>
          </button>

          {/* Shop */}
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('all');
              setCustomerView('shop');
            }}
            className={`flex flex-col items-center gap-1 text-[11px] font-medium transition-colors cursor-pointer ${
              customerView === 'shop' ? 'text-burgundy font-bold' : 'text-slateText-secondary hover:text-burgundy'
            }`}
          >
            <Sparkles className="w-5 h-5 text-gold-ink" strokeWidth={customerView === 'shop' ? 2 : 1.5} />
            <span>{isAr ? 'المجموعات' : 'Toubs'}</span>
          </button>

          {/* Bespoke Request */}
          <button
            type="button"
            onClick={() => setCustomerView('bespoke')}
            className={`flex flex-col items-center gap-1 text-[11px] font-medium transition-colors cursor-pointer ${
              customerView === 'bespoke' ? 'text-burgundy font-bold' : 'text-slateText-secondary hover:text-burgundy'
            }`}
          >
            <Palette className="w-5 h-5" strokeWidth={customerView === 'bespoke' ? 2 : 1.5} />
            <span>{isAr ? 'تفصيل خاص' : 'Bespoke'}</span>
          </button>

          {/* Shopping Bag */}
          <button
            type="button"
            onClick={() => setCustomerView('cart')}
            className={`relative flex flex-col items-center gap-1 text-[11px] font-medium transition-colors cursor-pointer ${
              customerView === 'cart' || customerView === 'checkout'
                ? 'text-burgundy font-bold'
                : 'text-slateText-secondary hover:text-burgundy'
            }`}
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5" strokeWidth={customerView === 'cart' ? 2 : 1.5} />
              {cart.length > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-burgundy text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cart.length}
                </span>
              )}
            </div>
            <span>{isAr ? 'الحقيبة' : 'Bag'}</span>
          </button>

          {/* VIP Concierge WhatsApp */}
          <a
            href="https://wa.me/97400000000?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20%D8%A8%D9%8A%D8%B1%D8%BA%D9%86%D8%AF%D9%8A%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AA%D8%B5%D8%A7%D9%85%D9%8A%D9%85%20%D8%A7%D9%84%D8%A3%D8%AB%D9%88%D8%A7%D8%A8"
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center gap-1 text-[11px] font-medium text-slateText-secondary hover:text-emerald-700 transition-colors"
          >
            <MessageCircle className="w-5 h-5 text-emerald-600" strokeWidth={1.5} />
            <span>{isAr ? 'الكونسيرج' : 'VIP Chat'}</span>
          </a>
        </div>
      </nav>

      {/* 5. Product Quick View Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          isAr={isAr}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={(p, size) => {
            addToCart(p, size);
            setSelectedProduct(null);
          }}
        />
      )}

      {/* 6. Clean Luxury Footer */}
      <footer className="bg-canvas-warm/80 border-t border-gold/25 py-8 px-4 text-center text-xs text-slateText-secondary space-y-3">
        <div className="font-cormorant text-lg font-bold text-burgundy tracking-widest">BURGUNDY DOHA</div>
        <p className="max-w-md mx-auto opacity-80 leading-relaxed font-body">
          {isAr
            ? 'أتيليه الأثواب السودانية الفاخرة والرسم اليدوي الراقي في دولة قطر.'
            : 'Artisanal hand-painted Sudanese toubs and bespoke women’s luxury in Doha, Qatar.'}
        </p>
        <p className="font-mono text-[11px] text-slateText-secondary/70">
          سجل تجاري: CR-189420-QA • ترخيص تجارة إلكترونية: ECOM-2026-974
        </p>
      </footer>
    </div>
  );
}

// ==========================================
// SUB-COMPONENTS
// ==========================================

function ProductCardItem({
  product,
  isAr,
  isFavorite,
  onToggleFavorite,
  onSelect,
  onAddToCart,
}: {
  product: ProductItem;
  isAr: boolean;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onSelect: () => void;
  onAddToCart: () => void;
}) {
  return (
    <div className="group rounded-2xl overflow-hidden bg-canvas-white border border-gold/25 shadow-soft flex flex-col transition-all hover:shadow-luxury hover:-translate-y-1">
      <div className="aspect-[3/4] relative overflow-hidden bg-canvas-warm cursor-pointer" onClick={onSelect}>
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slateText-secondary/40">
            <Palette className="w-8 h-8" strokeWidth={1} />
          </div>
        )}

        {/* Badge */}
        {product.badge && (
          <span className="absolute top-2.5 right-2.5 bg-burgundy/90 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded-full font-medium shadow-sm">
            {product.badge}
          </span>
        )}

        {/* Favorite Heart Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          className="absolute top-2.5 left-2.5 w-7 h-7 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-burgundy hover:bg-white transition-colors"
          aria-label="Save to Wishlist"
        >
          <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-coral text-coral-ink' : 'text-burgundy'}`} strokeWidth={1.5} />
        </button>
      </div>

      <div className="p-3.5 flex flex-col flex-1 justify-between gap-2">
        <div onClick={onSelect} className="cursor-pointer">
          <p className="text-[10px] text-gold-ink font-medium uppercase tracking-wider">{product.fabric}</p>
          <h3 className="font-display text-sm sm:text-base font-bold text-burgundy line-clamp-1 mt-0.5">
            {isAr && product.titleAr ? product.titleAr : product.title}
          </h3>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="font-bold text-sm sm:text-base text-burgundy">
            {product.price} <span className="text-[10px] text-gold-ink font-sans font-semibold">QAR</span>
          </span>
          <button
            type="button"
            onClick={onAddToCart}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-surface-peachSoft text-burgundy hover:bg-burgundy hover:text-white transition-colors flex items-center justify-center cursor-pointer shadow-sm active:scale-95"
            title={isAr ? 'إضافة للحقيبة' : 'Add to Bag'}
          >
            <Plus className="w-4 h-4" strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
}

function ProductDetailModal({
  product,
  isAr,
  onClose,
  onAddToCart,
}: {
  product: ProductItem;
  isAr: boolean;
  onClose: () => void;
  onAddToCart: (p: ProductItem, size: string) => void;
}) {
  const sizes = product.sizes ? product.sizes.split(',') : ['Free Size'];
  const [selectedSize, setSelectedSize] = useState(sizes[0].trim());

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
      <div className="bg-canvas w-full max-w-lg rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl border border-gold/30 max-h-[90vh] flex flex-col">
        {/* Header Bar */}
        <div className="p-4 border-b border-gold/20 flex justify-between items-center bg-canvas-warm/50">
          <span className="text-xs font-semibold text-gold-ink tracking-widest uppercase">
            {isAr ? 'تفاصيل القطعة الحصرية' : 'Product Details'}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gold/15 text-burgundy"
            aria-label="Close"
          >
            <X className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>

        <div className="overflow-y-auto p-5 space-y-4">
          <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-canvas-warm border border-gold/20">
            {product.imageUrl && <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover" />}
          </div>

          <div>
            <span className="text-xs font-bold text-coral-ink">{product.fabric}</span>
            <h3 className="font-display text-2xl font-bold text-burgundy mt-1">
              {isAr && product.titleAr ? product.titleAr : product.title}
            </h3>
            <p className="text-lg font-bold text-burgundy mt-1">
              {product.price} <span className="text-xs text-gold-ink font-sans font-semibold">QAR</span>
            </p>
          </div>

          {product.descriptionAr && (
            <p className="text-xs sm:text-sm text-slateText-body leading-relaxed bg-canvas-warm/40 p-3.5 rounded-xl border border-gold/15">
              {product.descriptionAr}
            </p>
          )}

          {/* Size Choice */}
          <div>
            <label className="text-xs font-bold text-slateText-secondary block mb-2">
              {isAr ? 'المقاس / الطول:' : 'Size / Length:'}
            </label>
            <div className="flex flex-wrap gap-2">
              {sizes.map((s) => {
                const cleanS = s.trim();
                return (
                  <button
                    key={cleanS}
                    type="button"
                    onClick={() => setSelectedSize(cleanS)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
                      selectedSize === cleanS
                        ? 'border-burgundy bg-burgundy text-white'
                        : 'border-gold/30 bg-canvas text-slateText-body hover:bg-gold/10'
                    }`}
                  >
                    {cleanS}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="p-4 border-t border-gold/20 bg-canvas-warm/40">
          <button
            type="button"
            onClick={() => onAddToCart(product, selectedSize)}
            className="w-full py-3.5 rounded-full bg-burgundy text-white font-medium text-sm hover:bg-burgundy-hover shadow-luxury transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" strokeWidth={1.5} />
            <span>{isAr ? `إضافة إلى الحقيبة (${product.price} ر.ق)` : `Add to Bag (${product.price} QAR)`}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function BespokeFormView({ isAr, onBack }: { isAr: boolean; onBack: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    fabric: 'توتال سويسري فاخر (Swiss Voile)',
    colorScheme: 'ألوان البيرغندي والذهب (Burgundy & Gold)',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const openWhatsApp = () => {
    const text = isAr
      ? `مرحباً أتيليه بيرغندي! أود طلب تفصيل ثوب خاص.\nالاسم: ${formData.name}\nنوع القماش: ${formData.fabric}\nدرجة الألوان: ${formData.colorScheme}\nملاحظات: ${formData.notes || 'لا يوجد'}`
      : `Hello Burgundy Atelier! I would like to request a bespoke toub commission.\nName: ${formData.name}\nFabric: ${formData.fabric}\nColors: ${formData.colorScheme}\nNotes: ${formData.notes || 'None'}`;
    window.open(`https://wa.me/97400000000?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-8 animate-in fade-in duration-300">
      <div className="flex items-center gap-3 mb-6">
        <button type="button" onClick={onBack} className="p-1 rounded-full hover:bg-gold/15 text-burgundy cursor-pointer">
          {isAr ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
        <h2 className="font-display text-2xl font-bold text-burgundy">
          {isAr ? 'طلب تفصيل ورسم خاص' : 'Bespoke Atelier Commission'}
        </h2>
      </div>

      {submitted ? (
        <div className="p-6 rounded-2xl bg-canvas-white border border-gold/30 shadow-soft text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
            <CheckCircle className="w-7 h-7" strokeWidth={1.5} />
          </div>
          <h3 className="font-display text-2xl font-bold text-burgundy">
            {isAr ? 'تم استلام طلبكِ الراقي' : 'Commission Received'}
          </h3>
          <p className="text-xs sm:text-sm text-slateText-body leading-relaxed">
            {isAr
              ? `شكراً لكِ ${formData.name}. سيتواصل معكِ مصممنا عبر الواتساب لتأكيد خامات القماش والنقشات اليدوية.`
              : 'Our master designer will contact you via WhatsApp to finalize silk swatch selection and bespoke dimensions.'}
          </p>
          <button
            type="button"
            onClick={openWhatsApp}
            className="w-full py-3.5 rounded-full bg-emerald-600 text-white font-medium text-xs hover:bg-emerald-700 shadow-soft flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{isAr ? 'بدء المحادثة الفورية مع الأتيليه' : 'Chat Instantly on WhatsApp'}</span>
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 bg-canvas-white p-5 rounded-2xl border border-gold/25 shadow-soft">
          <p className="text-xs text-slateText-secondary leading-relaxed">
            {isAr
              ? 'هل ترغبين في قطعة فريدة لمناسبة خاصة؟ اختاري نوع القماش والألوان المفضلة وسنقوم برسمها لكِ يدوياً.'
              : 'Commission an exclusive one-of-a-kind hand-painted Toub or Daraa tailored to your occasion.'}
          </p>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slateText-body">{isAr ? 'الاسم الكريم' : 'Full Name'}</label>
            <input
              required
              type="text"
              placeholder={isAr ? 'مثال: فاطمة الكواري' : 'Fatima Al-Kuwari'}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-3 rounded-xl border border-gold/30 bg-canvas text-xs focus:ring-2 focus:ring-burgundy outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slateText-body">{isAr ? 'رقم الواتساب (في قطر)' : 'WhatsApp Phone (+974)'}</label>
            <input
              required
              type="tel"
              placeholder="+974 5500 0000"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full p-3 rounded-xl border border-gold/30 bg-canvas text-xs focus:ring-2 focus:ring-burgundy outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slateText-body">{isAr ? 'نوع القماش المفضل' : 'Fabric Preference'}</label>
            <select
              value={formData.fabric}
              onChange={(e) => setFormData({ ...formData, fabric: e.target.value })}
              className="w-full p-3 rounded-xl border border-gold/30 bg-canvas text-xs focus:ring-2 focus:ring-burgundy outline-none"
            >
              <option value="توتال سويسري فاخر (Swiss Voile)">توتال سويسري فاخر (Swiss Voile 100%)</option>
              <option value="حرير طبيعي خالص (Pure Silk)">حرير طبيعي خالص (Pure Natural Silk)</option>
              <option value="كتان فرنسي معالج (French Linen)">كتان فرنسي معالج (French Linen)</option>
              <option value="شيفون مذهب (Silk Chiffon)">شيفون حريري مذهب (Silk Chiffon)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slateText-body">{isAr ? 'تدرجات الألوان المطلوبة' : 'Color Palette'}</label>
            <input
              type="text"
              placeholder={isAr ? 'مثال: درجات العاجي مع خطوط مذهبة وخزامية' : 'Ivory with gold leaf and lavender'}
              value={formData.colorScheme}
              onChange={(e) => setFormData({ ...formData, colorScheme: e.target.value })}
              className="w-full p-3 rounded-xl border border-gold/30 bg-canvas text-xs focus:ring-2 focus:ring-burgundy outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slateText-body">{isAr ? 'ملاحظات وتفاصيل إضافية' : 'Special Notes'}</label>
            <textarea
              rows={3}
              placeholder={isAr ? 'موعد المناسبة، الطول المطلوب، إلخ...' : 'Event date, drape preference, etc.'}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full p-3 rounded-xl border border-gold/30 bg-canvas text-xs focus:ring-2 focus:ring-burgundy outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-full bg-burgundy text-white font-medium text-xs hover:bg-burgundy-hover shadow-luxury transition-all cursor-pointer mt-4"
          >
            {isAr ? 'إرسال طلب التفصيل الخاص' : 'Submit Bespoke Inquiry'}
          </button>
        </form>
      )}
    </div>
  );
}

function CheckoutView({
  cart,
  cartTotal,
  isAr,
  onBack,
  onOrderSuccess,
}: {
  cart: CartItem[];
  cartTotal: number;
  isAr: boolean;
  onBack: () => void;
  onOrderSuccess: (order: OrderItem) => void;
}) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    municipality: 'الدوحة (Doha)',
    method: 'Fawran',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const newOrder: OrderItem = {
      id: `ord-${Date.now()}`,
      orderId: `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString(),
      total: cartTotal,
      status: 'Confirmed',
      customerInfo: formData,
      items: cart,
    };
    setTimeout(() => {
      onOrderSuccess(newOrder);
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-8 animate-in fade-in duration-300">
      <div className="flex items-center gap-3 mb-6">
        <button type="button" onClick={onBack} className="p-1 rounded-full hover:bg-gold/15 text-burgundy cursor-pointer">
          {isAr ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
        <h2 className="font-display text-2xl font-bold text-burgundy">{isAr ? 'إتمام الطلب' : 'Checkout'}</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 bg-canvas-white p-5 rounded-2xl border border-gold/25 shadow-soft">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slateText-body">{isAr ? 'الاسم الكريم' : 'Full Name'}</label>
          <input
            required
            type="text"
            placeholder={isAr ? 'عائشة آل ثاني' : 'Aisha Al-Thani'}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-3 rounded-xl border border-gold/30 bg-canvas text-xs focus:ring-2 focus:ring-burgundy outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slateText-body">{isAr ? 'رقم الهاتف (واتساب قطر)' : 'Phone Number (+974)'}</label>
          <input
            required
            type="tel"
            placeholder="+974 5500 0000"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full p-3 rounded-xl border border-gold/30 bg-canvas text-xs focus:ring-2 focus:ring-burgundy outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slateText-body">{isAr ? 'البلدية / المنطقة' : 'Municipality / Zone'}</label>
          <select
            value={formData.municipality}
            onChange={(e) => setFormData({ ...formData, municipality: e.target.value })}
            className="w-full p-3 rounded-xl border border-gold/30 bg-canvas text-xs focus:ring-2 focus:ring-burgundy outline-none"
          >
            <option value="الدوحة (Doha)">الدوحة (Doha)</option>
            <option value="لوسيل (Lusail)">لوسيل (Lusail)</option>
            <option value="الريان (Al Rayyan)">الريان (Al Rayyan)</option>
            <option value="الوكرة (Al Wakrah)">الوكرة (Al Wakrah)</option>
            <option value="الخور (Al Khor)">الخور (Al Khor)</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slateText-body">{isAr ? 'تفاصيل العنوان' : 'Street & Villa Details'}</label>
          <textarea
            required
            rows={2}
            placeholder={isAr ? 'المنطقة، الشارع، رقم الفيلا أو المبنى' : 'Street name, Villa/Building number'}
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="w-full p-3 rounded-xl border border-gold/30 bg-canvas text-xs focus:ring-2 focus:ring-burgundy outline-none"
          />
        </div>

        {/* Payment Methods */}
        <div className="pt-2">
          <label className="text-xs font-bold text-slateText-body block mb-2">{isAr ? 'طريقة الدفع في قطر' : 'Payment Method'}</label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'Fawran', labelAr: 'فوران (QCB Instant)', labelEn: 'Fawran Instant' },
              { id: 'QPay', labelAr: 'كيوباي / NAPS', labelEn: 'QPay Debit' },
              { id: 'Card', labelAr: 'بطاقة فيزا / ماستركارد', labelEn: 'Credit Card' },
            ].map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setFormData({ ...formData, method: m.id })}
                className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                  formData.method === m.id
                    ? 'border-burgundy bg-burgundy/10 text-burgundy font-bold shadow-sm'
                    : 'border-gold/30 bg-canvas text-slateText-body hover:bg-gold/10'
                }`}
              >
                <span className="text-xs block font-semibold">{isAr ? m.labelAr : m.labelEn}</span>
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 rounded-full bg-burgundy text-white font-medium text-sm hover:bg-burgundy-hover shadow-luxury transition-all cursor-pointer mt-4"
        >
          {isSubmitting
            ? isAr
              ? 'جاري اعتماد الطلب...'
              : 'Processing...'
            : isAr
              ? `تأكيد الطلب الفاخر (${cartTotal} ر.ق)`
              : `Confirm Order (${cartTotal} QAR)`}
        </button>
      </form>
    </div>
  );
}

function InvoiceView({ order, isAr, onHome }: { order: OrderItem; isAr: boolean; onHome: () => void }) {
  const openWhatsAppReceipt = () => {
    const text = isAr
      ? `مرحباً بيرغندي! قمت بطلب القطعة رقم ${order.orderId}.\nالإجمالي: ${order.total} ر.ق.\nالاسم: ${order.customerInfo.name}\nطريقة الدفع: ${order.customerInfo.method}`
      : `Hello Burgundy! Confirmed order ${order.orderId}.\nTotal: ${order.total} QAR.\nCustomer: ${order.customerInfo.name}`;
    window.open(`https://wa.me/97400000000?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-8 animate-in zoom-in-95 duration-400 text-center space-y-6">
      <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-soft">
        <CheckCircle className="w-8 h-8" strokeWidth={1.5} />
      </div>

      <div>
        <h2 className="font-display text-3xl font-bold text-burgundy mb-1">
          {isAr ? 'تم تأكيد طلبكِ بنجاح' : 'Order Confirmed'}
        </h2>
        <p className="text-xs text-slateText-secondary">
          {isAr ? 'إطلالتكِ الملكية قيد التجهيز الفاخر في الأتيليه.' : 'Your bespoke items are being packaged in our Doha atelier.'}
        </p>
      </div>

      {/* Invoice Card */}
      <div className="bg-canvas-white p-5 rounded-2xl border border-gold/30 shadow-soft text-right space-y-3 font-body">
        <div className="flex justify-between items-center pb-3 border-b border-gold/20 text-xs">
          <span className="text-slateText-secondary">{isAr ? 'رقم الفاتورة الرسمية' : 'Invoice No.'}</span>
          <span className="font-mono font-bold text-burgundy">{order.orderId}</span>
        </div>

        <div className="flex justify-between items-center text-xs">
          <span className="text-slateText-secondary">{isAr ? 'العميلة الكريمة' : 'Customer'}</span>
          <span className="font-semibold text-slateText-body">{order.customerInfo.name}</span>
        </div>

        <div className="flex justify-between items-center text-xs">
          <span className="text-slateText-secondary">{isAr ? 'الوجهة' : 'Destination'}</span>
          <span className="text-slateText-body">{order.customerInfo.municipality || 'قطر'}</span>
        </div>

        <div className="py-2 border-y border-gold/15 space-y-2">
          {order.items.map((it, idx) => (
            <div key={idx} className="flex justify-between text-xs">
              <span className="text-slateText-body">
                {isAr && it.titleAr ? it.titleAr : it.title} ({it.selectedSize})
              </span>
              <span className="font-bold text-burgundy">{it.price} QAR</span>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center pt-1 font-bold text-sm text-burgundy">
          <span className="font-display text-base">{isAr ? 'المجموع النهائي' : 'Total Paid'}</span>
          <span>{order.total} QAR</span>
        </div>
      </div>

      <div className="space-y-3">
        <button
          type="button"
          onClick={openWhatsAppReceipt}
          className="w-full py-3.5 rounded-full bg-emerald-600 text-white font-medium text-xs hover:bg-emerald-700 shadow-soft flex items-center justify-center gap-2 cursor-pointer"
        >
          <MessageCircle className="w-4 h-4" />
          <span>{isAr ? 'متابعة الطلب مع الأتيليه عبر الواتساب' : 'Track Order via WhatsApp'}</span>
        </button>

        <button
          type="button"
          onClick={onHome}
          className="w-full py-3 rounded-full border border-gold/40 text-burgundy text-xs font-semibold hover:bg-gold/10 transition-colors cursor-pointer"
        >
          {isAr ? 'العودة للرئيسية' : 'Return Home'}
        </button>
      </div>
    </div>
  );
}
