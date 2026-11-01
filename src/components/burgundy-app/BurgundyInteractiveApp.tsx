'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  ShoppingBag,
  Home as HomeIcon,
  Phone,
  MapPin,
  Clock,
  Camera,
  Plus,
  Trash2,
  CheckCircle,
  Package,
  Truck,
  Menu,
  X,
  ArrowLeft,
  CreditCard,
  DollarSign,
  Activity,
  Globe,
  Share2,
} from 'lucide-react';
import { Language } from '@/lib/i18n';

// --- COLOR PALETTE DEFINITION (from user design) ---
export const colors = {
  primary: '#5F0F40', // Deep Burgundy
  secondary: '#495867', // Dark Slate Gray
  accent: '#4E5166', // Slate Gray
  lightSand: '#F3D8C7', // Peach/Light Sand
  mocha: '#D0B8AC', // Tan/Mocha
  beige: '#EFE5DC', // Off-white beige
  offWhite: '#FBFEFB', // Light green-ish white
  white: '#FFFFFF', // Pure White
};

// --- IMAGE COMPRESSION UTILITY ---
// Resizes images from the mobile camera to fit within document limits (<800px, 70% quality)
export const compressImage = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', 0.7)); // Compress to 70% quality JPEG
        } else {
          resolve(event.target?.result as string);
        }
      };
    };
  });
};

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
  status: 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered' | string;
  customerInfo: {
    name: string;
    phone: string;
    address: string;
    method: string;
  };
  items: CartItem[];
}

// Initial seed products for immediate rich demo
const DEFAULT_PRODUCTS: ProductItem[] = [
  {
    id: 'prod-1',
    title: 'Royal Swiss Voile Toub',
    titleAr: 'توب توتال سويسري ملكي',
    category: 'Toub',
    fabric: 'Swiss Voile',
    sizes: 'Free Size (4.5m)',
    price: 1850,
    stock: 8,
    imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'prod-2',
    title: 'Hand-Painted Silk Toub',
    titleAr: 'توب حرير طبيعي مشغول باليد',
    category: 'Toub',
    fabric: 'Pure Silk',
    sizes: 'Free Size (4.5m)',
    price: 2400,
    stock: 5,
    imageUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'prod-3',
    title: 'Bespoke Painted Linen Jalabiya',
    titleAr: 'جلابية كتان رسم يدوي راقية',
    category: 'Jalabiya',
    fabric: 'Pure Linen',
    sizes: 'S, M, L, XL',
    price: 950,
    stock: 12,
    imageUrl: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'prod-4',
    title: 'Artisanal Silk Scarf',
    titleAr: 'طرحة حرير سودانية مذهبة',
    category: 'Scarf',
    fabric: 'Raw Silk',
    sizes: 'Standard (2m)',
    price: 450,
    stock: 15,
    imageUrl: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'prod-5',
    title: 'Midnight Velvet Gold Toub',
    titleAr: 'توب مخمل ملكي مذهب',
    category: 'Toub',
    fabric: 'Silk Velvet',
    sizes: 'Free Size (4.5m)',
    price: 2900,
    stock: 2,
    imageUrl: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'prod-6',
    title: 'Embroidered Heritage Daraa',
    titleAr: 'درّاعة سودانية تراثية',
    category: 'Daraa',
    fabric: 'Cotton Voile',
    sizes: 'Free Size',
    price: 1200,
    stock: 6,
    imageUrl: 'https://images.unsplash.com/photo-1518049362265-d5b2a6467637?auto=format&fit=crop&w=800&q=80',
  },
];

// Initial seed orders for admin analytics
const DEFAULT_ORDERS: OrderItem[] = [
  {
    id: 'ord-1',
    orderId: 'ORD-9741',
    date: new Date(Date.now() - 3600000 * 3).toISOString(),
    total: 2400,
    status: 'Delivered',
    customerInfo: {
      name: 'Aisha Al-Thani (عائشة آل ثاني)',
      phone: '+974 5512 3456',
      address: 'Zone 66, Al Dafna, West Bay, Villa 14',
      method: 'Fawran',
    },
    items: [
      {
        ...DEFAULT_PRODUCTS[1],
        cartId: 101,
        selectedSize: 'Free Size',
      },
    ],
  },
  {
    id: 'ord-2',
    orderId: 'ORD-9742',
    date: new Date(Date.now() - 3600000 * 8).toISOString(),
    total: 1850,
    status: 'Shipped',
    customerInfo: {
      name: 'Fatima Al-Kuwari (فاطمة الكواري)',
      phone: '+974 6698 7123',
      address: 'Zone 55, Al Waab, Street 810, House 22',
      method: 'QPay',
    },
    items: [
      {
        ...DEFAULT_PRODUCTS[0],
        cartId: 102,
        selectedSize: 'Free Size',
      },
    ],
  },
  {
    id: 'ord-3',
    orderId: 'ORD-9743',
    date: new Date(Date.now() - 3600000 * 20).toISOString(),
    total: 950,
    status: 'Processing',
    customerInfo: {
      name: 'Noora Al-Attiyah (نورة العطية)',
      phone: '+974 3345 6789',
      address: 'The Pearl Qatar, Porto Arabia, Tower 12',
      method: 'Card',
    },
    items: [
      {
        ...DEFAULT_PRODUCTS[2],
        cartId: 103,
        selectedSize: 'M',
      },
    ],
  },
  {
    id: 'ord-4',
    orderId: 'ORD-9744',
    date: new Date(Date.now() - 3600000 * 36).toISOString(),
    total: 450,
    status: 'Confirmed',
    customerInfo: {
      name: 'Mariam Al-Sulaiti (مريم السليطي)',
      phone: '+974 5589 0123',
      address: 'Lusail City, Fox Hills, Building 4B',
      method: 'COD',
    },
    items: [
      {
        ...DEFAULT_PRODUCTS[3],
        cartId: 104,
        selectedSize: 'Standard',
      },
    ],
  },
];

export function BurgundyInteractiveApp({ initialLang = 'ar' }: { initialLang?: Language }) {
  const [lang, setLang] = useState<Language>(initialLang);
  const isAr = lang === 'ar';

  const [appMode, setAppMode] = useState<'customer' | 'admin'>('customer');
  const [customerView, setCustomerView] = useState<'home' | 'shop' | 'cart' | 'checkout' | 'invoice'>('home');
  const [adminView, setAdminView] = useState<'dashboard' | 'products' | 'orders'>('dashboard');

  // Data State with LocalStorage Persistence
  const [products, setProducts] = useState<ProductItem[]>(DEFAULT_PRODUCTS);
  const [orders, setOrders] = useState<OrderItem[]>(DEFAULT_ORDERS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentOrder, setCurrentOrder] = useState<OrderItem | null>(null);

  // Load from localStorage on mount if available
  useEffect(() => {
    try {
      const storedProds = localStorage.getItem('burgundy_interactive_products');
      if (storedProds) {
        setProducts(JSON.parse(storedProds));
      }
      const storedOrders = localStorage.getItem('burgundy_interactive_orders');
      if (storedOrders) {
        setOrders(JSON.parse(storedOrders));
      }
    } catch {
      // ignore
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('burgundy_interactive_products', JSON.stringify(products));
    } catch {
      // ignore
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('burgundy_interactive_orders', JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  // Cart operations
  const addToCart = (product: ProductItem, size: string) => {
    setCart((prev) => [...prev, { ...product, cartId: Date.now(), selectedSize: size }]);
    // Quick visual feedback
    setCustomerView('cart');
  };

  const removeFromCart = (cartId: number) => {
    setCart((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const cartTotal = cart.reduce((sum, item) => sum + Number(item.price || 0), 0);

  // --- STYLED BUTTON ---
  const Button = ({
    children,
    onClick,
    variant = 'primary',
    className = '',
    disabled = false,
    type = 'button',
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'whatsapp';
    className?: string;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
  }) => {
    const baseStyle =
      'px-4 py-3 rounded-lg font-medium transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

    const inlineStyles: Record<string, React.CSSProperties> = {
      primary: { backgroundColor: colors.primary, color: colors.white },
      secondary: { backgroundColor: colors.secondary, color: colors.white },
      outline: { borderColor: colors.primary, color: colors.primary, borderWidth: '2px', backgroundColor: 'transparent' },
      ghost: { color: colors.primary, backgroundColor: 'transparent' },
      whatsapp: { backgroundColor: '#25D366', color: colors.white },
    };

    return (
      <button
        type={type}
        disabled={disabled}
        onClick={onClick}
        className={`${baseStyle} ${className}`}
        style={inlineStyles[variant]}
      >
        {children}
      </button>
    );
  };

  // ==========================================
  // CUSTOMER VIEWS
  // ==========================================
  const CustomerApp = () => (
    <div
      dir={isAr ? 'rtl' : 'ltr'}
      className="min-h-screen font-sans pb-20 selection:bg-[#F3D8C7]"
      style={{ backgroundColor: colors.beige, color: colors.secondary }}
    >
      {/* Top Nav */}
      <header
        className="sticky top-0 z-50 shadow-sm px-4 py-3 flex justify-between items-center"
        style={{ backgroundColor: colors.offWhite }}
      >
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setAppMode('admin')}
            title={isAr ? 'الانتقال إلى لوحة التحكم' : 'Switch to Admin CRM'}
            className="p-1.5 rounded-lg hover:bg-black/5 transition-colors cursor-pointer"
          >
            <Menu className="w-6 h-6" style={{ color: colors.primary }} />
          </button>
          <span
            onClick={() => setCustomerView('home')}
            className="font-serif text-xl tracking-widest font-bold cursor-pointer select-none"
            style={{ color: colors.primary }}
          >
            BURGUNDY
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#5F0F40]/10 text-[#5F0F40] font-mono hidden sm:inline-block">
            {isAr ? 'بيرغندي' : 'QATAR'}
          </span>
        </div>

        <div className="flex items-center gap-4">
          {/* Language Switcher */}
          <button
            type="button"
            onClick={() => setLang(isAr ? 'en' : 'ar')}
            className="text-xs font-semibold px-2 py-1 rounded border border-current hover:bg-black/5 transition-colors flex items-center gap-1"
            style={{ color: colors.primary }}
          >
            <Globe size={13} />
            <span>{isAr ? 'English' : 'عربي'}</span>
          </button>

          <button
            type="button"
            onClick={() => setCustomerView('home')}
            className="p-1 hover:opacity-80 transition-opacity"
            aria-label="Home"
          >
            <HomeIcon className="w-5 h-5" style={{ color: customerView === 'home' ? colors.primary : colors.accent }} />
          </button>
          <button
            type="button"
            onClick={() => setCustomerView('shop')}
            className="p-1 hover:opacity-80 transition-opacity"
            aria-label="Shop"
          >
            <ShoppingBag className="w-5 h-5" style={{ color: customerView === 'shop' ? colors.primary : colors.accent }} />
          </button>
          <button
            type="button"
            onClick={() => setCustomerView('cart')}
            className="relative p-1 hover:opacity-80 transition-opacity"
            aria-label="Cart"
          >
            <ShoppingBag className="w-5 h-5" style={{ color: customerView === 'cart' ? colors.primary : colors.accent }} />
            {cart.length > 0 && (
              <span
                className="absolute -top-1 -right-2 text-[10px] w-4 h-4 rounded-full flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: colors.primary }}
              >
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main>
        {customerView === 'home' && <CustomerHome />}
        {customerView === 'shop' && <CustomerShop />}
        {customerView === 'cart' && <CustomerCart />}
        {customerView === 'checkout' && <CustomerCheckout />}
        {customerView === 'invoice' && <CustomerInvoice />}
      </main>
    </div>
  );

  const CustomerHome = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Cinematic Hero */}
      <div className="relative h-[70vh] w-full overflow-hidden flex items-center justify-center text-center">
        {/* CSS Parallax / Cinematic gradient background */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#5F0F40] via-[#495867] to-[#D0B8AC] bg-[length:400%_400%] animate-[gradient_15s_ease_infinite] opacity-90 mix-blend-multiply" />
        <div
          className="absolute inset-0 z-0"
          style={{ backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.5) 100%)' }}
        />

        <div className="relative z-10 px-6 flex flex-col items-center">
          <span className="text-white/80 text-xs uppercase tracking-widest font-mono mb-2">
            {isAr ? 'أزياء سودانية فاخرة بالرسم اليدوي' : 'HAUTE COUTURE • DOHA'}
          </span>
          <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-widest text-white drop-shadow-lg mb-4">
            BURGUNDY
          </h1>
          <p className="text-white/90 text-lg md:text-xl font-light tracking-wide mb-8 max-w-md leading-relaxed">
            {isAr
              ? 'أصالة الثوب والجلابية السودانية بأنامل فنية راقية للمرأة في قطر.'
              : 'Elevating everyday elegance. Curated fashion for the modern Qatari woman.'}
          </p>
          <Button
            variant="outline"
            className="backdrop-blur-sm bg-white/10 !text-white !border-white hover:bg-white/20 shadow-lg px-8 py-3.5 text-base"
            onClick={() => setCustomerView('shop')}
          >
            {isAr ? 'استكشفي المجموعة' : 'Explore Collection'}
          </Button>
        </div>
      </div>

      {/* About Section */}
      <section className="py-16 px-6 text-center" style={{ backgroundColor: colors.white }}>
        <h2 className="font-serif text-3xl mb-6" style={{ color: colors.primary }}>
          {isAr ? 'جوهر بيرغندي' : 'Our Essence'}
        </h2>
        <p className="max-w-2xl mx-auto leading-relaxed text-base" style={{ color: colors.accent }}>
          {isAr
            ? 'بيرغندي أكثر من مجرد متجر؛ إنها عنوان للأناقة والذوق الرفيع. ننتقي أفخر الأقمشة من التوتال السويسري والحرير الطبيعي ونرسم عليها نقوشاً يدوية تمزج بين الأصالة السودانية العريقة والفخامة المعاصرة في الدوحة.'
            : "Burgundy is more than a boutique; it's a statement of sophistication. We source premium fabrics and design silhouettes that honor tradition while embracing contemporary aesthetics. Experience the perfect blend of modesty and luxury."}
        </p>
      </section>

      {/* Reviews Section */}
      <section className="py-16 px-4" style={{ backgroundColor: colors.lightSand }}>
        <h2 className="font-serif text-2xl mb-8 text-center" style={{ color: colors.primary }}>
          {isAr ? 'آراء عميلاتنا الراقيات' : 'Client Love'}
        </h2>
        <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
          {[
            {
              t: isAr
                ? 'جودة الثوب السويسري والرسم اليدوي تفوق الوصف! إتقان وأناقة سينمائية تأسر الأنظار.'
                : 'The quality of the abayas is unmatched. Truly cinematic elegance in every thread.',
              n: isAr ? 'عائشة آل ثاني' : 'Aisha M.',
            },
            {
              t: isAr
                ? 'اهتمام بيرغندي بأدق التفاصيل وسرعة التوصيل في الدوحة أمر استثنائي حقاً.'
                : "Burgundy's attention to detail and customer service in Doha is phenomenal.",
              n: isAr ? 'فاطمة الكواري' : 'Fatima A.',
            },
          ].map((r, i) => (
            <div key={i} className="p-6 rounded-2xl shadow-sm flex-1" style={{ backgroundColor: colors.white }}>
              <div className="flex text-amber-500 mb-3 tracking-widest text-lg">★★★★★</div>
              <p className="italic mb-4 leading-relaxed" style={{ color: colors.accent }}>
                "{r.t}"
              </p>
              <p className="font-medium text-sm" style={{ color: colors.primary }}>
                — {r.n}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Ad Space */}
      <section
        className="py-12 px-4 border-y border-opacity-20"
        style={{ backgroundColor: colors.mocha, borderColor: colors.primary }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-xs uppercase tracking-wider font-bold opacity-60">
            {isAr ? 'شريك التميز • إعلان ممول' : 'Partner Spotlight'}
          </span>
          <h3 className="font-serif text-xl mt-2 mb-3" style={{ color: colors.primary }}>
            {isAr ? 'خدمات الكونسيرج الفاخرة بالدوحة' : 'Doha Luxury Concierge'}
          </h3>
          <p className="text-sm opacity-80 mb-4 max-w-lg mx-auto">
            {isAr
              ? 'إدارة أسلوب الحياة الراقي، وتنسيق الإطلالات والمشتريات الحصرية للمناسبات الخاصة.'
              : 'Exclusive lifestyle management and personal shopping experiences.'}
          </p>
          <span className="text-sm underline cursor-pointer font-medium" style={{ color: colors.primary }}>
            {isAr ? 'اكتشفي المزيد' : 'Discover More'}
          </span>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6" style={{ backgroundColor: colors.secondary, color: colors.beige }}>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          <div>
            <h4 className="font-serif text-xl mb-4 text-white">BURGUNDY</h4>
            <p className="opacity-80 leading-relaxed">
              {isAr ? 'حيث تلتقي الأصالة السودانية بالفخامة المعاصرة.' : 'Where tradition meets modern luxury.'}
            </p>
            <p className="text-xs opacity-60 mt-3 font-mono">CR: CR-189420-QA • MOCI</p>
          </div>
          <div className="space-y-3 opacity-80">
            <a href="tel:+97400000000" className="flex items-center gap-2 hover:text-white">
              <Phone size={16} /> +974 0000 0000
            </a>
            <a
              href="https://maps.google.com/?q=Doha,Qatar"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 hover:text-white"
            >
              <MapPin size={16} /> {isAr ? 'الدوحة، قطر (اتجاهات الموقع)' : 'Doha, Qatar (Directions)'}
            </a>
            <p className="flex items-center gap-2">
              <Clock size={16} /> {isAr ? 'الأحد - الخميس: 10 ص - 10 م' : 'Sun - Thu: 10AM - 10PM'}
            </p>
          </div>
          <div>
            <p className="opacity-80 mb-2">{isAr ? 'تابعي إبداعاتنا على إنستغرام' : 'Follow our journey on Instagram'}</p>
            <a
              href="https://instagram.com/burgundy974_"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-white hover:underline block"
            >
              @burgundy974_
            </a>
            <button
              onClick={() => setAppMode('admin')}
              className="mt-4 text-xs underline opacity-60 hover:opacity-100 block"
            >
              {isAr ? 'دخول لوحة الإدارة (CRM)' : 'Admin Portal Access'}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );

  const CustomerShop = () => (
    <div className="p-4 max-w-5xl mx-auto animate-in fade-in duration-500">
      <h2 className="font-serif text-3xl mb-6 mt-4 text-center" style={{ color: colors.primary }}>
        {isAr ? 'المجموعة الحصرية' : 'Collection'}
      </h2>
      {products.length === 0 ? (
        <div className="text-center py-20 opacity-60">{isAr ? 'لا توجد قطع متاحة حالياً.' : 'No items available currently.'}</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-8">
          {products.map((p) => (
            <div
              key={p.id}
              className="rounded-2xl overflow-hidden shadow-sm flex flex-col transition-transform hover:-translate-y-1"
              style={{ backgroundColor: colors.white }}
            >
              <div className="aspect-[3/4] bg-gray-100 relative overflow-hidden group">
                {p.imageUrl ? (
                  <img
                    src={p.imageUrl}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center opacity-30">
                    <Camera size={40} />
                  </div>
                )}
                {p.stock <= 0 && (
                  <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
                    <span className="bg-black text-white px-3 py-1 text-xs tracking-wider uppercase font-medium">
                      {isAr ? 'نفذت الكمية' : 'Out of Stock'}
                    </span>
                  </div>
                )}
              </div>
              <div className="p-4 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-serif font-medium line-clamp-1" style={{ color: colors.secondary }}>
                    {isAr && p.titleAr ? p.titleAr : p.title}
                  </h3>
                </div>
                <p className="text-xs mb-3 opacity-70">
                  {p.category} • {p.fabric}
                </p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="font-semibold text-sm sm:text-base" style={{ color: colors.primary }}>
                    QAR {p.price}
                  </span>
                  <button
                    disabled={p.stock <= 0}
                    onClick={() => addToCart(p, p.sizes ? p.sizes.split(',')[0].trim() : 'Free Size')}
                    className="w-8 h-8 rounded-full flex items-center justify-center transition-colors disabled:opacity-50 hover:opacity-80 active:scale-90 cursor-pointer"
                    style={{ backgroundColor: colors.beige, color: colors.primary }}
                    title={isAr ? 'إضافة إلى الحقيبة' : 'Add to Bag'}
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const CustomerCart = () => (
    <div className="p-4 max-w-md mx-auto animate-in slide-in-from-right-4">
      <div className="flex items-center gap-3 mb-6 mt-2">
        <ArrowLeft size={20} className="cursor-pointer" onClick={() => setCustomerView('shop')} />
        <h2 className="font-serif text-2xl" style={{ color: colors.primary }}>
          {isAr ? 'حقيبة المشتريات' : 'Your Bag'}
        </h2>
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-20 opacity-60 flex flex-col items-center">
          <ShoppingBag size={48} className="mb-4 opacity-50" />
          <p>{isAr ? 'حقيبتكِ فارغة حالياً.' : 'Your bag is empty.'}</p>
          <Button variant="outline" className="mt-6" onClick={() => setCustomerView('shop')}>
            {isAr ? 'متابعة التسوق' : 'Continue Shopping'}
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.cartId}
              className="flex gap-4 p-3 rounded-xl shadow-sm relative"
              style={{ backgroundColor: colors.white }}
            >
              <div className="w-20 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                {item.imageUrl ? <img src={item.imageUrl} className="w-full h-full object-cover" alt="" /> : null}
              </div>
              <div className="flex-1 py-1">
                <h4 className="font-serif text-sm font-medium" style={{ color: colors.secondary }}>
                  {isAr && item.titleAr ? item.titleAr : item.title}
                </h4>
                <p className="text-xs opacity-60 mt-1">
                  {isAr ? 'المقاس:' : 'Size:'} {item.selectedSize}
                </p>
                <p className="font-semibold mt-3" style={{ color: colors.primary }}>
                  QAR {item.price}
                </p>
              </div>
              <button
                type="button"
                onClick={() => removeFromCart(item.cartId)}
                className="absolute top-3 right-3 text-gray-400 hover:text-red-500 cursor-pointer p-1"
                aria-label="Remove item"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}

          <div className="pt-6 mt-6 border-t" style={{ borderColor: colors.mocha }}>
            <div className="flex justify-between font-serif text-lg font-bold mb-6">
              <span>{isAr ? 'الإجمالي' : 'Total'}</span>
              <span style={{ color: colors.primary }}>QAR {cartTotal}</span>
            </div>
            <Button className="w-full py-4 text-lg" onClick={() => setCustomerView('checkout')}>
              {isAr ? 'المتابعة إلى الدفع' : 'Proceed to Checkout'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );

  const CustomerCheckout = () => {
    const [formData, setFormData] = useState({
      name: '',
      phone: '',
      address: '',
      method: 'Fawran',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      try {
        const orderData: OrderItem = {
          id: `ord-${Date.now()}`,
          orderId: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
          date: new Date().toISOString(),
          total: cartTotal,
          status: 'Confirmed',
          customerInfo: formData,
          items: cart,
        };

        setOrders((prev) => [orderData, ...prev]);
        setCurrentOrder(orderData);
        setCart([]);
        setCustomerView('invoice');
      } catch (err) {
        console.error(err);
      }
      setIsSubmitting(false);
    };

    return (
      <div className="p-4 max-w-md mx-auto animate-in fade-in">
        <div className="flex items-center gap-3 mb-6 mt-2">
          <ArrowLeft size={20} className="cursor-pointer" onClick={() => setCustomerView('cart')} />
          <h2 className="font-serif text-2xl" style={{ color: colors.primary }}>
            {isAr ? 'إتمام الطلب' : 'Checkout'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium opacity-80">{isAr ? 'الاسم الكامل' : 'Full Name'}</label>
            <input
              required
              type="text"
              className="w-full p-3 rounded-lg border outline-none focus:ring-2 focus:ring-[#5F0F40]"
              placeholder={isAr ? 'عائشة آل ثاني' : 'Aisha Al-Thani'}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={{ backgroundColor: colors.white, borderColor: colors.mocha }}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium opacity-80">
              {isAr ? 'رقم الهاتف (واتساب)' : 'Phone Number (WhatsApp)'}
            </label>
            <input
              required
              type="tel"
              className="w-full p-3 rounded-lg border outline-none focus:ring-2 focus:ring-[#5F0F40]"
              placeholder="+974 0000 0000"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              style={{ backgroundColor: colors.white, borderColor: colors.mocha }}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium opacity-80">
              {isAr ? 'عنوان التوصيل في قطر' : 'Delivery Address in Qatar'}
            </label>
            <textarea
              required
              rows={2}
              className="w-full p-3 rounded-lg border outline-none focus:ring-2 focus:ring-[#5F0F40]"
              placeholder={isAr ? 'المنطقة، الشارع، رقم المبنى / الفيلا' : 'Zone, Street, Building No.'}
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              style={{ backgroundColor: colors.white, borderColor: colors.mocha }}
            />
          </div>

          <div className="pt-4">
            <label className="text-sm font-medium opacity-80 mb-2 block">
              {isAr ? 'طريقة الدفع في قطر' : 'Payment Method'}
            </label>
            <div className="grid grid-cols-2 gap-3">
              {['Fawran', 'QPay', 'Card', 'COD'].map((m) => (
                <div
                  key={m}
                  onClick={() => setFormData({ ...formData, method: m })}
                  className={`p-3 rounded-lg border text-center cursor-pointer transition-colors ${
                    formData.method === m
                      ? 'border-[#5F0F40] bg-[#5F0F40]/10 font-bold'
                      : 'border-[#D0B8AC] bg-white'
                  }`}
                >
                  <p className="font-semibold text-sm">{m}</p>
                  <span className="text-[10px] opacity-70">
                    {m === 'Fawran'
                      ? isAr
                        ? 'فوران فوري'
                        : 'Instant QCB'
                      : m === 'QPay'
                        ? isAr
                          ? 'بوابة كيو باي'
                          : 'Debit / NAPS'
                        : m === 'Card'
                          ? isAr
                            ? 'بطاقة بنكية'
                            : 'Credit Card'
                          : isAr
                            ? 'الدفع عند الاستلام'
                            : 'Cash on Delivery'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-8">
            <Button type="submit" className="w-full py-4 text-base" disabled={isSubmitting}>
              {isSubmitting
                ? isAr
                  ? 'جاري تأكيد الطلب...'
                  : 'Processing...'
                : isAr
                  ? `تأكيد الطلب (QAR ${cartTotal})`
                  : `Place Order (QAR ${cartTotal})`}
            </Button>
          </div>
        </form>
      </div>
    );
  };

  const CustomerInvoice = () => {
    if (!currentOrder) return <div className="p-4 text-center">{isAr ? 'لا يوجد طلب نشط' : 'No active order'}</div>;

    const handleWhatsApp = () => {
      const text = isAr
        ? `مرحباً بيرغندي! قمت للتو بطلب القطعة رقم ${currentOrder.orderId}. الإجمالي: ${currentOrder.total} ر.ق. طريقة الدفع: ${currentOrder.customerInfo.method}.`
        : `Hello Burgundy! I just placed order ${currentOrder.orderId}. Total: QAR ${currentOrder.total}. Payment: ${currentOrder.customerInfo.method}.`;
      window.open(`https://wa.me/97400000000?text=${encodeURIComponent(text)}`, '_blank');
    };

    return (
      <div className="p-4 max-w-md mx-auto pt-12 animate-in zoom-in-95 duration-500 text-center">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} />
        </div>
        <h2 className="font-serif text-3xl mb-2" style={{ color: colors.primary }}>
          {isAr ? 'تم تأكيد طلبكِ بنجاح' : 'Order Confirmed'}
        </h2>
        <p className="opacity-70 mb-8 text-sm">
          {isAr
            ? `شكراً لكِ، ${currentOrder.customerInfo.name.split(' ')[0]}. إطلالتكِ الملكية قيد التجهيز بعناية.`
            : `Thank you, ${currentOrder.customerInfo.name.split(' ')[0]}. Your elegant pieces are being prepared.`}
        </p>

        <div className="p-6 rounded-2xl shadow-sm text-left mb-8" style={{ backgroundColor: colors.white }} dir={isAr ? 'rtl' : 'ltr'}>
          <div className="flex justify-between mb-4 pb-4 border-b border-gray-100">
            <span className="opacity-60 text-sm">{isAr ? 'رقم الطلب' : 'Order Number'}</span>
            <span className="font-medium font-mono">{currentOrder.orderId}</span>
          </div>
          <div className="space-y-3 mb-4">
            {currentOrder.items.map((item, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="opacity-80">
                  {isAr && item.titleAr ? item.titleAr : item.title} ({item.selectedSize})
                </span>
                <span className="font-medium">QAR {item.price}</span>
              </div>
            ))}
          </div>
          <div
            className="flex justify-between pt-4 border-t border-gray-100 font-bold text-lg"
            style={{ color: colors.primary }}
          >
            <span>{isAr ? 'الإجمالي النهائي' : 'Total'}</span>
            <span>QAR {currentOrder.total}</span>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 text-sm flex justify-between">
            <span className="opacity-60">{isAr ? 'طريقة الدفع' : 'Payment'}</span>
            <span className="font-medium">{currentOrder.customerInfo.method}</span>
          </div>
        </div>

        <Button variant="whatsapp" className="w-full py-4 text-base mb-4" onClick={handleWhatsApp}>
          {isAr ? 'متابعة عبر الواتساب' : 'Complete via WhatsApp'}
        </Button>
        <Button variant="ghost" className="w-full" onClick={() => setCustomerView('home')}>
          {isAr ? 'العودة للرئيسية' : 'Return Home'}
        </Button>
      </div>
    );
  };

  // ==========================================
  // ADMIN CRM VIEWS (Mobile First)
  // ==========================================
  const AdminApp = () => (
    <div className="min-h-screen font-sans pb-20 bg-gray-50 text-gray-800" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Admin Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm px-4 py-3 flex justify-between items-center border-b">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-[#5F0F40] text-white flex items-center justify-center font-serif font-bold">
            B
          </div>
          <span className="font-semibold text-gray-800">{isAr ? 'إدارة بيرغندي (CRM)' : 'Admin CRM'}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLang(isAr ? 'en' : 'ar')}
            className="text-xs px-2 py-1 rounded bg-gray-100 font-medium hover:bg-gray-200"
          >
            {isAr ? 'EN' : 'عربي'}
          </button>
          <button
            onClick={() => setAppMode('customer')}
            className="text-xs px-3 py-1.5 rounded-full bg-gray-100 font-medium hover:bg-gray-200 flex items-center gap-1 cursor-pointer"
          >
            <Menu size={14} /> {isAr ? 'عرض المتجر' : 'Store View'}
          </button>
        </div>
      </header>

      <main className="p-4 max-w-md mx-auto">
        {adminView === 'dashboard' && <AdminDashboard />}
        {adminView === 'products' && <AdminProducts />}
        {adminView === 'orders' && <AdminOrders />}
      </main>

      {/* Admin Bottom Nav */}
      <nav className="fixed bottom-0 w-full max-w-md left-1/2 -translate-x-1/2 bg-white border-t flex justify-around p-3 pb-safe z-50 shadow-lg">
        <button
          onClick={() => setAdminView('dashboard')}
          className={`flex flex-col items-center gap-1 text-[10px] font-medium cursor-pointer ${
            adminView === 'dashboard' ? 'text-[#5F0F40]' : 'text-gray-400'
          }`}
        >
          <Activity size={20} /> {isAr ? 'لوحة التحكم' : 'Dashboard'}
        </button>
        <button
          onClick={() => setAdminView('products')}
          className={`flex flex-col items-center gap-1 text-[10px] font-medium cursor-pointer ${
            adminView === 'products' ? 'text-[#5F0F40]' : 'text-gray-400'
          }`}
        >
          <Package size={20} /> {isAr ? 'المنتجات' : 'Products'}
        </button>
        <button
          onClick={() => setAdminView('orders')}
          className={`flex flex-col items-center gap-1 text-[10px] font-medium cursor-pointer ${
            adminView === 'orders' ? 'text-[#5F0F40]' : 'text-gray-400'
          }`}
        >
          <Truck size={20} /> {isAr ? 'الطلبات' : 'Orders'}
        </button>
      </nav>
    </div>
  );

  const AdminDashboard = () => {
    const totalRev = orders.reduce((sum, o) => sum + Number(o.total || 0), 0);
    const orderCount = orders.length;
    const aov = orderCount ? (totalRev / orderCount).toFixed(0) : 0;

    const paymentMethods = orders.reduce<Record<string, number>>((acc, o) => {
      const method = o.customerInfo?.method || 'Other';
      acc[method] = (acc[method] || 0) + 1;
      return acc;
    }, {});

    return (
      <div className="animate-in fade-in">
        <h2 className="text-xl font-bold mb-6 text-gray-800">
          {isAr ? 'الملخص التنفيذي للمبيعات' : 'Executive Summary'}
        </h2>

        {/* KPI Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
              <DollarSign size={14} /> {isAr ? 'الإيرادات (QAR)' : 'Revenue (QAR)'}
            </p>
            <p className="text-2xl font-bold text-[#5F0F40]">{totalRev.toLocaleString()}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
              <Package size={14} /> {isAr ? 'إجمالي الطلبات' : 'Orders'}
            </p>
            <p className="text-2xl font-bold text-gray-800">{orderCount}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 col-span-2">
            <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
              <Activity size={14} /> {isAr ? 'متوسط قيمة الطلب' : 'Avg. Order Value'}
            </p>
            <p className="text-xl font-semibold text-gray-700">QAR {aov}</p>
          </div>
        </div>

        {/* Payment Rails */}
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3 mt-8">
          {isAr ? 'قنوات الدفع في قطر' : 'Payment Rails'}
        </h3>
        <div className="space-y-3">
          {['Fawran', 'QPay', 'Card', 'COD'].map((method) => {
            const count = paymentMethods[method] || 0;
            const percentage = orderCount ? ((count / orderCount) * 100).toFixed(0) : '0';
            return (
              <div key={method} className="bg-white p-3 rounded-lg shadow-sm flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-[#F3D8C7] flex items-center justify-center text-[#5F0F40]">
                  <CreditCard size={16} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium text-sm">{method}</span>
                    <span className="text-xs font-bold">
                      {count} ({percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#5F0F40] h-full transition-all duration-500" style={{ width: `${percentage}%` }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const AdminProducts = () => {
    const [isAdding, setIsAdding] = useState(false);
    const [formData, setFormData] = useState({
      title: '',
      titleAr: '',
      category: 'Toub',
      fabric: '',
      sizes: 'Free Size',
      price: '',
      stock: '10',
      imageUrl: '',
    });
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      setIsUploading(true);
      try {
        const base64Img = await compressImage(file);
        setFormData((prev) => ({ ...prev, imageUrl: base64Img }));
      } catch (err) {
        console.error('Image processing error', err);
      }
      setIsUploading(false);
    };

    const handleSave = async (e: React.FormEvent) => {
      e.preventDefault();
      const newProduct: ProductItem = {
        id: `prod-${Date.now()}`,
        title: formData.title || 'Handcrafted Garment',
        titleAr: formData.titleAr || formData.title,
        category: formData.category,
        fabric: formData.fabric || 'Pure Fabric',
        sizes: formData.sizes || 'Free Size',
        price: Number(formData.price) || 0,
        stock: Number(formData.stock) || 0,
        imageUrl:
          formData.imageUrl ||
          'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      };

      setProducts((prev) => [newProduct, ...prev]);
      setIsAdding(false);
      setFormData({
        title: '',
        titleAr: '',
        category: 'Toub',
        fabric: '',
        sizes: 'Free Size',
        price: '',
        stock: '10',
        imageUrl: '',
      });
    };

    const handleDelete = (id: string) => {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    };

    if (isAdding) {
      return (
        <div className="animate-in slide-in-from-bottom-4 bg-white rounded-xl shadow-lg p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg text-gray-800">{isAr ? 'إضافة قطعة جديدة' : 'New Garment'}</h3>
            <button onClick={() => setIsAdding(false)}>
              <X size={20} className="text-gray-400" />
            </button>
          </div>
          <form onSubmit={handleSave} className="space-y-4">
            {/* Image Upload Area */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="w-full aspect-[4/3] bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center overflow-hidden cursor-pointer relative"
            >
              {formData.imageUrl ? (
                <img src={formData.imageUrl} className="w-full h-full object-cover" alt="Preview" />
              ) : (
                <>
                  <Camera size={32} className="text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">
                    {isUploading
                      ? isAr
                        ? 'جاري ضغط ومعالجة الصورة...'
                        : 'Processing...'
                      : isAr
                        ? 'انقري لالتقاط صورة بكاميرا الهاتف أو الرفع'
                        : 'Tap to Take Photo or Upload'}
                  </span>
                </>
              )}
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2 space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">
                  {isAr ? 'اسم القطعة (بالعربية / الإنجليزية)' : 'Title'}
                </label>
                <input
                  required
                  className="w-full p-2.5 bg-gray-50 rounded border-none focus:ring-2 focus:ring-[#5F0F40]"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Royal Painted Silk Toub"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">{isAr ? 'التصنيف' : 'Category'}</label>
                <select
                  className="w-full p-2.5 bg-gray-50 rounded border-none focus:ring-2"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option>Toub</option>
                  <option>Jalabiya</option>
                  <option>Scarf</option>
                  <option>Daraa</option>
                  <option>Accessories</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">{isAr ? 'نوع القماش' : 'Fabric'}</label>
                <input
                  className="w-full p-2.5 bg-gray-50 rounded border-none focus:ring-2"
                  value={formData.fabric}
                  onChange={(e) => setFormData({ ...formData, fabric: e.target.value })}
                  placeholder="Swiss Voile, Silk..."
                />
              </div>
              <div className="col-span-2 space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">
                  {isAr ? 'المقاسات (مفصولة بفاصلة)' : 'Sizes (comma separated)'}
                </label>
                <input
                  className="w-full p-2.5 bg-gray-50 rounded border-none focus:ring-2"
                  value={formData.sizes}
                  onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">{isAr ? 'السعر (QAR)' : 'Price (QAR)'}</label>
                <input
                  required
                  type="number"
                  className="w-full p-2.5 bg-gray-50 rounded border-none focus:ring-2"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">
                  {isAr ? 'الكمية المتوفرة' : 'Stock Count'}
                </label>
                <input
                  required
                  type="number"
                  className="w-full p-2.5 bg-gray-50 rounded border-none focus:ring-2"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={isUploading}
              className="w-full bg-[#5F0F40] text-white py-3 rounded-lg font-bold mt-4 shadow-sm disabled:opacity-50 cursor-pointer"
            >
              {isAr ? 'حفظ القطعة في الكتالوج' : 'Save Product to Catalog'}
            </button>
          </form>
        </div>
      );
    }

    return (
      <div className="animate-in fade-in">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">{isAr ? 'الكتالوج المباشر' : 'Live Catalog'}</h2>
          <button
            onClick={() => setIsAdding(true)}
            className="bg-[#5F0F40] text-white px-3 py-1.5 rounded flex items-center gap-1 text-sm font-medium shadow-sm cursor-pointer"
          >
            <Plus size={16} /> {isAr ? 'إضافة قطعة' : 'Add Item'}
          </button>
        </div>

        <div className="space-y-3">
          {products.map((p) => (
            <div key={p.id} className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex gap-3">
              <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 relative">
                {p.imageUrl ? (
                  <img src={p.imageUrl} className="w-full h-full object-cover" alt="" />
                ) : (
                  <Camera className="absolute inset-0 m-auto text-gray-300" />
                )}
              </div>
              <div className="flex-1 py-0.5">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-sm text-gray-800">{isAr && p.titleAr ? p.titleAr : p.title}</h4>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="text-red-400 p-1 hover:bg-red-50 rounded cursor-pointer"
                    aria-label="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <div className="flex justify-between mt-1 text-xs text-gray-500">
                  <span>QAR {p.price}</span>
                  <span>
                    {isAr ? 'المخزون:' : 'Stock:'}{' '}
                    <span className={p.stock <= 0 ? 'text-red-500 font-bold' : ''}>{p.stock}</span>
                  </span>
                </div>
                <div className="mt-1 flex flex-wrap gap-1">
                  {p.sizes?.split(',').map((s) => (
                    <span key={s} className="px-1.5 py-0.5 bg-gray-100 text-[10px] rounded text-gray-600">
                      {s.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
          {products.length === 0 && (
            <div className="text-center py-10 text-gray-400 text-sm">
              {isAr ? 'الكتالوج فارغ حالياً.' : 'Catalog is empty. Add a product to sync with the shop.'}
            </div>
          )}
        </div>
      </div>
    );
  };

  const AdminOrders = () => {
    const statuses = ['Confirmed', 'Processing', 'Shipped', 'Delivered'];

    const updateStatus = (orderId: string, newStatus: string) => {
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );
    };

    // Sort newest first
    const sortedOrders = [...orders].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return (
      <div className="animate-in fade-in">
        <h2 className="text-xl font-bold mb-6 text-gray-800">{isAr ? 'متابعة الطلبات' : 'Order Tracking'}</h2>

        <div className="space-y-4">
          {sortedOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Order Header */}
              <div className="bg-gray-50 px-4 py-3 flex justify-between items-center border-b border-gray-100">
                <span className="font-mono text-xs font-bold text-gray-500">{order.orderId}</span>
                <span className="text-xs font-medium text-gray-500">
                  {new Date(order.date).toLocaleDateString()}
                </span>
              </div>

              {/* Customer & Items */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm">{order.customerInfo?.name}</h4>
                    <p className="text-xs text-gray-500">{order.customerInfo?.phone}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#5F0F40] text-sm">QAR {order.total}</p>
                    <p className="text-[10px] bg-gray-100 px-2 py-0.5 rounded text-gray-600 inline-block mt-1">
                      {order.customerInfo?.method}
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-1 truncate">{order.customerInfo?.address}</p>
                  <p className="text-xs text-gray-400 italic">
                    {order.items?.map((i) => `${i.title} (${i.selectedSize})`).join(', ')}
                  </p>
                </div>

                {/* Status Chips */}
                <div className="flex gap-1 overflow-x-auto pb-1 hide-scrollbar">
                  {statuses.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => updateStatus(order.id, s)}
                      className={`text-[10px] px-3 py-1.5 rounded-full font-medium whitespace-nowrap transition-colors cursor-pointer
                        ${
                          order.status === s
                            ? 'bg-[#5F0F40] text-white shadow-sm'
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                        }`}
                    >
                      {s === 'Confirmed'
                        ? isAr
                          ? 'مؤكد'
                          : 'Confirmed'
                        : s === 'Processing'
                          ? isAr
                            ? 'قيد التجهيز'
                            : 'Processing'
                          : s === 'Shipped'
                            ? isAr
                              ? 'تم الشحن'
                              : 'Shipped'
                            : isAr
                              ? 'تم التسليم'
                              : 'Delivered'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
          {sortedOrders.length === 0 && (
            <div className="text-center py-10 text-gray-400 text-sm">{isAr ? 'لا توجد طلبات بعد.' : 'No orders yet.'}</div>
          )}
        </div>
      </div>
    );
  };

  // Main Render Switch
  return (
    <div className="w-full min-h-screen">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes gradient { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .pb-safe { padding-bottom: env(safe-area-inset-bottom, 20px); }
      `,
        }}
      />
      {appMode === 'customer' ? <CustomerApp /> : <AdminApp />}
    </div>
  );
}

export default BurgundyInteractiveApp;
