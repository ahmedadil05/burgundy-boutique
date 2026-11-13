'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import {
  Lock,
  Unlock,
  ShieldAlert,
  Users,
  Package,
  TrendingUp,
  MessageCircle,
  Phone,
  Search,
  Download,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  LogOut,
  Palette,
  Truck,
  Plus,
  Trash2,
  DollarSign,
  Filter,
  Layers,
  Boxes,
  BarChart3,
  SlidersHorizontal,
  X,
  AlertTriangle,
  FileText,
  Coins,
  ArrowUpRight,
} from 'lucide-react';
import { Language } from '@/lib/i18n';
import { BurgundyLogo } from '@/components/brand/BurgundyLogo';

// ==========================================
// TYPES & DATA STRUCTURES (20-STYLE OBJECTS)
// ==========================================

export interface VIPCustomer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  municipality: string;
  totalSpent: number;
  orderCount: number;
  tier: 'Royal VIP' | 'Atelier Patron' | 'New Client';
  lastOrderDate: string;
  notes?: string;
  measurementProfile?: string;
}

export interface AtelierCommission {
  id: string;
  customerName: string;
  phone: string;
  fabric: string;
  colorScheme: string;
  status: 'Inquiry' | 'Fabric' | 'Painting' | 'Tailoring' | 'Quality' | 'Delivery';
  date: string;
  priceQar: number;
  artisanName?: string;
  deliveryDateTarget?: string;
  notes?: string;
}

export interface FabricInventoryItem {
  id: string;
  name: { ar: string; en: string };
  origin: string;
  stockMeters: number;
  minThresholdMeters: number;
  costPerMeterQAR: number;
  retailYieldPerToub: number; // typically 4.5m
  status: 'optimal' | 'low' | 'critical';
  supplier: string;
}

export interface ServerOrder {
  id: string;
  orderNumber: string;
  customerId: string;
  status: 'Confirmed' | 'InProduction' | 'QualityInspection' | 'OutForDelivery' | 'Delivered';
  paymentMethod: string;
  paymentStatus: string;
  subtotalQAR: number;
  deliveryFeeQAR: number;
  totalQAR: number;
  createdAt: string;
  customer: {
    id: string;
    name: string;
    phone: string;
    municipality: string;
    addressLine: string;
    tier: string;
  };
  items: Array<{
    id: string;
    unitPriceQAR: number;
    quantity: number;
    selectedSizeCode: string;
    product: {
      title: { ar: string; en: string };
      basePriceQAR: number;
    };
  }>;
}

// Initial VIP Customers
const INITIAL_CUSTOMERS: VIPCustomer[] = [
  {
    id: 'cust-1',
    name: 'الشيخة عائشة آل ثاني',
    phone: '+974 5511 2233',
    email: 'aisha.althani@qatar.qa',
    municipality: 'لوسيل (Lusail)',
    totalSpent: 9250,
    orderCount: 4,
    tier: 'Royal VIP',
    lastOrderDate: '2026-10-28',
    notes: 'تفضل أقمشة الفوال السويسري الملكي بنقوش الذهب الخالص عيار 24.',
    measurementProfile: 'طول الثوب: 4.5م قياسي، خياطة الأطراف مخفية بخيوط حريرية',
  },
  {
    id: 'cust-2',
    name: 'مريم الكواري',
    phone: '+974 6622 3344',
    email: 'm.alkuwari@doha.com',
    municipality: 'اللؤلؤة (The Pearl)',
    totalSpent: 4800,
    orderCount: 2,
    tier: 'Atelier Patron',
    lastOrderDate: '2026-10-30',
    notes: 'طلبت رسم مخصص بزهور السوسن النيلية لزفاف عائلي خاص.',
    measurementProfile: 'جلابية حرير كريب صيني مقاس M مفصل مع تطريز الأكمام',
  },
  {
    id: 'cust-3',
    name: 'نورة المنصوري',
    phone: '+974 7733 4455',
    email: 'noura.m@outlook.qa',
    municipality: 'الخليج الغربي (West Bay)',
    totalSpent: 1850,
    orderCount: 1,
    tier: 'New Client',
    lastOrderDate: '2026-11-01',
    notes: 'مهتمة بالجلابيات الكتان الطبيعي المبردة لموسم الشتاء والربيع.',
    measurementProfile: 'مقاس موحد L مع وشاح حرير مطابق',
  },
  {
    id: 'cust-4',
    name: 'هند السليطي',
    phone: '+974 3344 5566',
    email: 'hind.sulaiti@gov.qa',
    municipality: 'الوكرة (Al Wakrah)',
    totalSpent: 6400,
    orderCount: 3,
    tier: 'Royal VIP',
    lastOrderDate: '2026-10-25',
    notes: 'مجموعة درّاعات العرائس وتطريز حناء النيل الذهبي.',
    measurementProfile: 'ثوبان ملكيان للأعراس 4.5 متر',
  },
];

// Initial Bespoke Commissions (Twenty Kanban Pipeline)
const INITIAL_COMMISSIONS: AtelierCommission[] = [
  {
    id: 'comm-101',
    customerName: 'الشيخة عائشة آل ثاني',
    phone: '+974 5511 2233',
    fabric: 'فوال سويسري نخب أول (St. Gallen Cotton)',
    colorScheme: 'عاجي ملكي مع رقائق الذهب السائل 24k',
    status: 'Painting',
    date: '2026-10-29',
    priceQar: 2850,
    artisanName: 'أستاذة ستنا (الخرطوم)',
    deliveryDateTarget: '2026-11-18',
    notes: 'ثوب عروس أثري خاص بنقوش مروية ذهبية.',
  },
  {
    id: 'comm-102',
    customerName: 'فاطمة العطية',
    phone: '+974 5599 8877',
    fabric: 'حرير كريب طبيعي 100% (Pure Silk)',
    colorScheme: 'بيرغندي داكن متدرج مع زهور ليلكية',
    status: 'Fabric',
    date: '2026-11-02',
    priceQar: 3400,
    artisanName: 'حنين الطيب (أتيليه الدوحة)',
    deliveryDateTarget: '2026-11-22',
    notes: 'بانتظار وصول شحنة الحرير من سويسرا.',
  },
  {
    id: 'comm-103',
    customerName: 'سارة الدوسري',
    phone: '+974 6677 8899',
    fabric: 'كتان هندي معالج مع قطن مصري',
    colorScheme: 'رمال الخليج مع نقوش هندسية نوبية',
    status: 'Delivery',
    date: '2026-10-26',
    priceQar: 1450,
    artisanName: 'ورشة أم درمان المركزية',
    deliveryDateTarget: '2026-11-14',
    notes: 'تم فحص الجودة ومرفق بالحقيبة القماشية الملكية.',
  },
  {
    id: 'comm-104',
    customerName: 'د. ريم الهاجري',
    phone: '+974 5544 3322',
    fabric: 'شيفون جورجيت ملكي مع أورجانزا',
    colorScheme: 'أسود فحمي مع خيوط فضية براقة',
    status: 'Inquiry',
    date: '2026-11-04',
    priceQar: 2200,
    artisanName: 'قيد التعيين',
    deliveryDateTarget: '2026-11-28',
    notes: 'طلبت معاينة عينات الأقمشة في مجلسها بالريان.',
  },
];

// Initial Fabric & Raw Materials ERP
const INITIAL_FABRICS: FabricInventoryItem[] = [
  {
    id: 'fab-1',
    name: { ar: 'فوال سويسري قطن 100% (توتال سويس)', en: '100% Pure Swiss Cotton Voile' },
    origin: 'سانت غالن، سويسرا (St. Gallen, Switzerland)',
    stockMeters: 180,
    minThresholdMeters: 50,
    costPerMeterQAR: 120,
    retailYieldPerToub: 4.5,
    status: 'optimal',
    supplier: 'Swiss Voile Textiles AG',
  },
  {
    id: 'fab-2',
    name: { ar: 'حرير كريب صيني طبيعي 100%', en: '100% Pure Mulberry Silk Crepe' },
    origin: 'ليون، فرنسا (Mulberry Silk Importers)',
    stockMeters: 42,
    minThresholdMeters: 45,
    costPerMeterQAR: 240,
    retailYieldPerToub: 4.5,
    status: 'low',
    supplier: 'Soieries de Lyon France',
  },
  {
    id: 'fab-3',
    name: { ar: 'كتان هندي فاخر مع قطن مصري', en: 'Luxury Linen & Egyptian Cotton Blend' },
    origin: 'كلكتا والقاهرة (Fine Linen Weavers)',
    stockMeters: 135,
    minThresholdMeters: 40,
    costPerMeterQAR: 85,
    retailYieldPerToub: 3.5,
    status: 'optimal',
    supplier: 'Nile & Indus Mills',
  },
  {
    id: 'fab-4',
    name: { ar: 'شيفون جورجيت ملكي وأورجانزا', en: 'Royal Chiffon Georgette & Organza' },
    origin: 'كومو، إيطاليا (Como Silks)',
    stockMeters: 22,
    minThresholdMeters: 30,
    costPerMeterQAR: 160,
    retailYieldPerToub: 4.5,
    status: 'critical',
    supplier: 'Tessiture Como Italia',
  },
];

export default function AtelierPortalPage() {
  const params = useParams();
  const lang = (params?.lang === 'en' ? 'en' : 'ar') as Language;
  const isAr = lang === 'ar';

  // Security & Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [lockoutRemaining, setLockoutRemaining] = useState(0);
  const [authError, setAuthError] = useState('');
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);

  // Twenty Workspace Navigation Tab
  type WorkspaceTab = 'overview' | 'crm' | 'commissions' | 'inventory' | 'orders' | 'finance';
  const [activeTab, setActiveTab] = useState<WorkspaceTab>('overview');

  // CRM & ERP State
  const [customers, setCustomers] = useState<VIPCustomer[]>(INITIAL_CUSTOMERS);
  const [commissions, setCommissions] = useState<AtelierCommission[]>(INITIAL_COMMISSIONS);
  const [fabrics, setFabrics] = useState<FabricInventoryItem[]>(INITIAL_FABRICS);
  const [orders, setOrders] = useState<ServerOrder[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);

  // View & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [tierFilter, setTierFilter] = useState<'all' | 'Royal VIP' | 'Atelier Patron' | 'New Client'>('all');
  const [selectedRecord, setSelectedRecord] = useState<any | null>(null);
  const [selectedRecordType, setSelectedRecordType] = useState<'customer' | 'commission' | 'order' | 'fabric' | null>(null);

  // Check existing session via Server API on load
  useEffect(() => {
    fetch('/api/atelier/auth')
      .then((res) => res.json())
      .then((data) => {
        if (data?.authenticated) {
          setIsAuthenticated(true);
        }
      })
      .catch(() => {});
  }, []);

  // Fetch real 3NF orders when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      setIsLoadingOrders(true);
      fetch('/api/atelier/orders')
        .then((res) => res.json())
        .then((data) => {
          if (data?.success && Array.isArray(data?.orders)) {
            setOrders(data.orders);
          }
        })
        .catch(() => {})
        .finally(() => setIsLoadingOrders(false));
    }
  }, [isAuthenticated]);

  // Lockout countdown timer
  useEffect(() => {
    if (lockoutRemaining <= 0) return;
    const timer = setInterval(() => {
      setLockoutRemaining((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [lockoutRemaining]);

  // PIN Submit Handler (Server-Side Rate-Limited Authentication)
  const handlePinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lockoutRemaining > 0) return;
    setIsLoadingAuth(true);

    try {
      const res = await fetch('/api/atelier/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: pinInput }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setIsAuthenticated(true);
        setAuthError('');
        setPinInput('');
      } else {
        setPinInput('');
        if (res.status === 429 || data.locked) {
          setLockoutRemaining(data.retryAfterSec || 300);
          setAuthError(
            isAr
              ? 'تم تجاوز عدد المحاولات المسموحة. تم قفل البوابة مؤقتاً لحماية البيانات.'
              : 'Maximum attempts exceeded. Security lockout engaged for 5 minutes.'
          );
        } else {
          setAuthError(
            isAr
              ? `رمز الدخول غير صحيح. متبقي ${data.remainingAttempts ?? 0} محاولات.`
              : `Invalid PIN. ${data.remainingAttempts ?? 0} attempts remaining.`
          );
        }
      }
    } catch {
      setAuthError(isAr ? 'حدث خطأ في الاتصال بالسيرفر' : 'Network error verifying credentials');
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/atelier/auth', { method: 'DELETE' }).catch(() => {});
    setIsAuthenticated(false);
    setPinInput('');
  };

  // Status Updater for 3NF Orders
  const handleUpdateOrderStatus = async (orderId: string, nextStatus: ServerOrder['status']) => {
    try {
      const res = await fetch('/api/atelier/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, status: nextStatus }),
      });
      const data = await res.json();
      if (res.ok && data?.success) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status: nextStatus } : o))
        );
        if (selectedRecord && selectedRecord.id === orderId) {
          setSelectedRecord({ ...selectedRecord, status: nextStatus });
        }
      }
    } catch {
      alert(isAr ? 'فشل تحديث حالة الطلب' : 'Failed to update order status');
    }
  };

  // Commission status transition
  const handleUpdateCommissionStatus = (commId: string, nextStatus: AtelierCommission['status']) => {
    setCommissions((prev) =>
      prev.map((c) => (c.id === commId ? { ...c, status: nextStatus } : c))
    );
    if (selectedRecord && selectedRecord.id === commId) {
      setSelectedRecord({ ...selectedRecord, status: nextStatus });
    }
  };

  // WhatsApp Concierge message trigger
  const triggerWhatsAppConcierge = (phone: string, customerName: string, context?: string) => {
    const text = isAr
      ? `مرحباً بكِ ${customerName}، من إدارة دار بيرغندي للأزياء الفاخرة بالدوحة. بخصوص ${context || 'طلبكِ الخاص وتفصيل الثوب'}. يسعدنا خدمتكم في أي وقت.`
      : `Hello ${customerName}, from BURGUNDY Haute Couture Atelier Doha regarding your inquiry. We are at your service.`;
    window.open(`https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`, '_blank');
  };

  // CSV Export for records
  const exportCSV = (data: any[], filename: string) => {
    if (!data.length) return;
    const headers = Object.keys(data[0]);
    const rows = data.map((item) =>
      headers.map((h) => `"${item[h] !== undefined ? String(item[h]).replace(/"/g, '""') : ''}"`).join(',')
    );
    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows].join('\n');
    const link = document.createElement('a');
    link.href = encodeURI(csvContent);
    link.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Computed KPIs
  const totalRevenue = useMemo(() => {
    const crmRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);
    const orderRevenue = orders.reduce((sum, o) => sum + o.totalQAR, 0);
    return Math.max(crmRevenue, orderRevenue);
  }, [customers, orders]);

  const activeCommissionsCount = commissions.filter((c) => c.status !== 'Delivery').length;
  const totalFabricMeters = fabrics.reduce((sum, f) => sum + f.stockMeters, 0);
  const lowFabricAlertCount = fabrics.filter((f) => f.status !== 'optimal').length;

  // Filtered Lists
  const filteredCustomers = customers.filter((c) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = c.name.toLowerCase().includes(q) || c.phone.includes(q) || c.municipality.toLowerCase().includes(q);
    const matchesTier = tierFilter === 'all' || c.tier === tierFilter;
    return matchesSearch && matchesTier;
  });

  const filteredOrders = orders.filter((o) => {
    const q = searchQuery.toLowerCase();
    return o.orderNumber.toLowerCase().includes(q) || o.customer?.name.toLowerCase().includes(q);
  });

  // ==========================================
  // VIEW 1: LOCKED PIN AUTHENTICATION GATE
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div
        dir={isAr ? 'rtl' : 'ltr'}
        className="min-h-screen bg-canvas flex flex-col items-center justify-center p-4 font-body text-slateText-body relative leaf-shadow-bg"
      >
        <div className="w-full max-w-sm bg-white p-8 rounded-3xl border border-gold-hairline shadow-luxury text-center space-y-6">
          <BurgundyLogo variant="emblem" size="lg" className="mx-auto" />

          <div>
            <h1 className="font-cormorant text-2xl font-bold tracking-[0.2em] text-burgundy">BURGUNDY ATELIER</h1>
            <p className="text-xs text-gold-ink font-bold uppercase tracking-wider mt-1">
              {isAr ? 'بوابة إدارة الأتيليه وخدمة العملاء (Twenty CRM & ERP)' : 'Atelier Twenty CRM & ERP Management'}
            </p>
          </div>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div className="space-y-2 text-start">
              <label className="text-xs font-semibold text-slateText-secondary block">
                {isAr ? 'رمز الدخول السري (Master PIN)' : 'Security Access PIN'}
              </label>
              <input
                type="password"
                maxLength={8}
                inputMode="numeric"
                pattern="[0-9]*"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="••••"
                disabled={lockoutRemaining > 0 || isLoadingAuth}
                className="w-full text-center tracking-[0.5em] text-2xl py-3 border border-gold-hairline rounded-2xl bg-canvas focus:outline-none focus:ring-2 focus:ring-burgundy disabled:opacity-50"
                autoFocus
              />
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 text-start">
                <ShieldAlert className="w-4 h-4 shrink-0 text-red-500" />
                <span>{authError}</span>
              </div>
            )}

            {lockoutRemaining > 0 && (
              <div className="text-xs text-coral-ink font-bold flex items-center justify-center gap-1">
                <Clock className="w-4 h-4" />
                <span>
                  {isAr ? `إعادة المحاولة بعد ${lockoutRemaining} ثانية` : `Retry in ${lockoutRemaining}s`}
                </span>
              </div>
            )}

            <button
              type="submit"
              disabled={lockoutRemaining > 0 || !pinInput || isLoadingAuth}
              className="w-full py-3.5 bg-burgundy hover:bg-burgundy-hover text-white rounded-2xl font-bold text-sm shadow-luxury transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4" />
              <span>{isLoadingAuth ? (isAr ? 'جاري التحقق...' : 'Verifying...') : isAr ? 'دخول لوحة التحكم' : 'Unlock Workspace'}</span>
            </button>
          </form>

          <div className="pt-2 border-t border-gold-hairline/60 text-[11px] text-slateText-secondary flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-gold-line" />
            <span>{isAr ? 'محمي ببروتوكول التشفير الآمن والتحقق السيرفري' : 'Cryptographically Secured Session'}</span>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 2: TWENTY CRM & ERP ATELIER WORKSPACE
  // ==========================================
  return (
    <div
      dir={isAr ? 'rtl' : 'ltr'}
      className="min-h-screen bg-canvas flex flex-col lg:flex-row font-body text-slateText-body"
    >
      {/* ========================================================= */}
      {/* 1. TWENTY-INSPIRED COLLAPSIBLE WORKSPACE SIDEBAR          */}
      {/* ========================================================= */}
      <aside className="w-full lg:w-64 bg-white border-b lg:border-b-0 lg:border-e border-gold-hairline flex flex-col shrink-0">
        {/* Workspace Brand Switcher */}
        <div className="p-4 border-b border-gold-hairline/70 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BurgundyLogo variant="emblem" size="sm" />
            <div>
              <span className="font-cormorant font-bold text-base text-burgundy tracking-wider block">
                BURGUNDY ATELIER
              </span>
              <span className="text-[10px] text-gold-ink font-bold uppercase tracking-wider block">
                {isAr ? 'مقر الدوحة • Twenty CRM' : 'Doha HQ • Twenty CRM'}
              </span>
            </div>
          </div>
        </div>

        {/* Database Status Tag */}
        <div className="px-4 py-2 bg-canvas-warm/40 border-b border-gold-hairline/40 flex items-center justify-between text-[10px] text-slateText-secondary">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-emerald-800">{isAr ? 'قاعدة 3NF نشطة' : '3NF Store Live'}</span>
          </div>
          <span className="font-mono text-xs">{orders.length} {isAr ? 'طلبات' : 'Orders'}</span>
        </div>

        {/* Workspace Nav Items (Twenty Objects) */}
        <nav className="flex-1 p-3 space-y-1">
          <button
            onClick={() => { setActiveTab('overview'); setSelectedRecord(null); }}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'overview'
                ? 'bg-burgundy text-white shadow-luxury'
                : 'text-slateText-body hover:bg-surface-peachSoft/30 hover:text-burgundy'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <BarChart3 className="w-4 h-4" />
              <span>{isAr ? 'لوحة القيادة والمؤشرات' : 'Executive Overview'}</span>
            </div>
          </button>

          <button
            onClick={() => { setActiveTab('crm'); setSelectedRecord(null); }}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'crm'
                ? 'bg-burgundy text-white shadow-luxury'
                : 'text-slateText-body hover:bg-surface-peachSoft/30 hover:text-burgundy'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Users className="w-4 h-4" />
              <span>{isAr ? 'سيدات الأتيليه (VIP Patrons)' : 'Patrons CRM (People)'}</span>
            </div>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono ${activeTab === 'crm' ? 'bg-white/20' : 'bg-canvas-warm'}`}>
              {customers.length}
            </span>
          </button>

          <button
            onClick={() => { setActiveTab('commissions'); setSelectedRecord(null); }}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'commissions'
                ? 'bg-burgundy text-white shadow-luxury'
                : 'text-slateText-body hover:bg-surface-peachSoft/30 hover:text-burgundy'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Palette className="w-4 h-4" />
              <span>{isAr ? 'مسار التفصيل والرسم (Kanban)' : 'Commissions Pipeline'}</span>
            </div>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono ${activeTab === 'commissions' ? 'bg-white/20' : 'bg-canvas-warm'}`}>
              {commissions.length}
            </span>
          </button>

          <button
            onClick={() => { setActiveTab('inventory'); setSelectedRecord(null); }}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'inventory'
                ? 'bg-burgundy text-white shadow-luxury'
                : 'text-slateText-body hover:bg-surface-peachSoft/30 hover:text-burgundy'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Layers className="w-4 h-4" />
              <span>{isAr ? 'مخزون الأقمشة (ERP Fabric)' : 'Fabric Inventory (ERP)'}</span>
            </div>
            {lowFabricAlertCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-coral animate-ping" />
            )}
          </button>

          <button
            onClick={() => { setActiveTab('orders'); setSelectedRecord(null); }}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'orders'
                ? 'bg-burgundy text-white shadow-luxury'
                : 'text-slateText-body hover:bg-surface-peachSoft/30 hover:text-burgundy'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Package className="w-4 h-4" />
              <span>{isAr ? 'طلبات المتجر الفورية (Orders)' : 'Orders & Fulfillment'}</span>
            </div>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono ${activeTab === 'orders' ? 'bg-white/20' : 'bg-canvas-warm'}`}>
              {orders.length}
            </span>
          </button>

          <button
            onClick={() => { setActiveTab('finance'); setSelectedRecord(null); }}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'finance'
                ? 'bg-burgundy text-white shadow-luxury'
                : 'text-slateText-body hover:bg-surface-peachSoft/30 hover:text-burgundy'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Coins className="w-4 h-4" />
              <span>{isAr ? 'المالية وبوابات الدفع (Qatar)' : 'Finance & Payment Rails'}</span>
            </div>
          </button>
        </nav>

        {/* Sidebar Footer & Logout */}
        <div className="p-3 border-t border-gold-hairline/70 space-y-2">
          <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-canvas text-xs">
            <span className="text-[11px] text-slateText-secondary">
              {isAr ? 'المشرف: إدارة الأتيليه' : 'Atelier Admin'}
            </span>
            <button
              onClick={handleLogout}
              className="text-coral-ink hover:text-red-700 flex items-center gap-1 font-bold text-xs"
              title="Logout"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{isAr ? 'خروج' : 'Exit'}</span>
            </button>
          </div>
        </div>
      </aside>

      {/* ========================================================= */}
      {/* 2. MAIN WORKSPACE CONTENT AREA                            */}
      {/* ========================================================= */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Action Bar (Twenty Style Search & Filter) */}
        <header className="bg-white border-b border-gold-hairline px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute start-3 top-3 text-slateText-secondary" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                activeTab === 'crm'
                  ? isAr ? 'بحث بالاسم، الهاتف، البلدية...' : 'Search patrons by name, phone...'
                  : activeTab === 'orders'
                  ? isAr ? 'بحث برقم الطلب أو اسم العميلة...' : 'Search order number...'
                  : isAr ? 'بحث في الأتيليه...' : 'Search workspace records...'
              }
              className="w-full ps-9 pe-4 py-2 border border-gold-hairline rounded-xl text-xs bg-canvas focus:outline-none focus:ring-1 focus:ring-burgundy"
            />
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            {activeTab === 'crm' && (
              <select
                value={tierFilter}
                onChange={(e) => setTierFilter(e.target.value as any)}
                className="text-xs font-semibold px-3 py-2 border border-gold-hairline rounded-xl bg-canvas focus:outline-none"
              >
                <option value="all">{isAr ? 'جميع التصنيفات' : 'All Tiers'}</option>
                <option value="Royal VIP">Royal VIP (فوق 5000 ر.ق)</option>
                <option value="Atelier Patron">Atelier Patron</option>
                <option value="New Client">New Client</option>
              </select>
            )}

            <button
              onClick={() => {
                if (activeTab === 'crm') exportCSV(customers, 'burgundy_vip_patrons');
                if (activeTab === 'commissions') exportCSV(commissions, 'burgundy_commissions');
                if (activeTab === 'inventory') exportCSV(fabrics, 'burgundy_fabrics_inventory');
                if (activeTab === 'orders') exportCSV(orders, 'burgundy_store_orders');
              }}
              className="px-3 py-2 border border-gold-hairline rounded-xl text-xs font-bold text-slateText-body hover:text-burgundy bg-white hover:bg-canvas flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-gold-line" />
              <span>{isAr ? 'تصدير CSV' : 'Export'}</span>
            </button>
          </div>
        </header>

        {/* Content Body Based on Active Tab */}
        <div className="p-6 space-y-6">
          
          {/* TAB 1: EXECUTIVE OVERVIEW (METRICS & QUICK ACTIONS) */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Metric Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-gold-hairline shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-slateText-secondary text-xs">
                    <span>{isAr ? 'إجمالي المبيعات المحققة' : 'Total Revenue'}</span>
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="text-2xl font-bold font-mono text-burgundy">
                    {totalRevenue.toLocaleString()} QAR
                  </div>
                  <span className="text-[10px] text-emerald-600 font-bold block">
                    {isAr ? 'معاملات مؤكدة عبر بوابات قطر' : 'Verified Qatar Payment Rails'}
                  </span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gold-hairline shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-slateText-secondary text-xs">
                    <span>{isAr ? 'عميلات كبار الشخصيات' : 'VIP Patrons (CRM)'}</span>
                    <Users className="w-4 h-4 text-burgundy" />
                  </div>
                  <div className="text-2xl font-bold font-mono text-burgundy">
                    {customers.length}
                  </div>
                  <span className="text-[10px] text-gold-ink font-bold block">
                    {customers.filter((c) => c.tier === 'Royal VIP').length} {isAr ? 'ملكات تصنيف Royal VIP' : 'Royal VIP Clients'}
                  </span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gold-hairline shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-slateText-secondary text-xs">
                    <span>{isAr ? 'طلبات تفصيل قيد التنفيذ' : 'Active Commissions'}</span>
                    <Palette className="w-4 h-4 text-burgundy" />
                  </div>
                  <div className="text-2xl font-bold font-mono text-burgundy">
                    {activeCommissionsCount}
                  </div>
                  <span className="text-[10px] text-slateText-secondary block">
                    {isAr ? 'تتبع مراحل الرسم والخياطة' : 'In production at Khartoum/Doha'}
                  </span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gold-hairline shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-slateText-secondary text-xs">
                    <span>{isAr ? 'مخزون الأقمشة الملكية' : 'Raw Fabrics (ERP)'}</span>
                    <Layers className="w-4 h-4 text-gold-line" />
                  </div>
                  <div className="text-2xl font-bold font-mono text-burgundy">
                    {totalFabricMeters} م
                  </div>
                  <span className="text-[10px] text-slateText-secondary block">
                    {lowFabricAlertCount > 0 ? (
                      <span className="text-coral-ink font-bold">{lowFabricAlertCount} {isAr ? 'أقمشة قاربت على النفاد' : 'Restock alerts'}</span>
                    ) : (
                      <span className="text-emerald-600 font-bold">{isAr ? 'المخزون مثالي' : 'Optimal Inventory'}</span>
                    )}
                  </span>
                </div>
              </div>

              {/* Quick Commission Stages Snapshot */}
              <div className="bg-white p-6 rounded-2xl border border-gold-hairline shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-sm text-burgundy">
                    {isAr ? 'نظرة سريعة على ورشة الرسم والتفصيل' : 'Atelier Production Snapshot'}
                  </h3>
                  <button
                    onClick={() => setActiveTab('commissions')}
                    className="text-xs font-bold text-burgundy hover:underline flex items-center gap-1"
                  >
                    <span>{isAr ? 'عرض مسار Kanban' : 'View Full Kanban'}</span>
                    {isAr ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {commissions.slice(0, 3).map((comm) => (
                    <div
                      key={comm.id}
                      onClick={() => { setSelectedRecord(comm); setSelectedRecordType('commission'); }}
                      className="p-4 rounded-xl border border-gold-hairline bg-canvas hover:border-burgundy cursor-pointer transition-all space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-burgundy">{comm.customerName}</span>
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-burgundy/10 text-burgundy">
                          {comm.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-slateText-secondary line-clamp-1">{comm.fabric}</p>
                      <div className="flex items-center justify-between text-[11px] pt-1">
                        <span className="font-mono font-bold text-burgundy">{comm.priceQar} QAR</span>
                        <span className="text-[10px] text-slateText-secondary">{comm.deliveryDateTarget}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: VIP PATRONS (TWENTY CRM PEOPLE OBJECT) */}
          {activeTab === 'crm' && (
            <div className="bg-white rounded-2xl border border-gold-hairline shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gold-hairline/60 flex items-center justify-between">
                <div>
                  <h3 className="font-display font-bold text-sm text-burgundy">
                    {isAr ? 'سيدات الأتيليه وكبار الشخصيات (VIP Patrons CRM)' : 'VIP Patrons (CRM Directory)'}
                  </h3>
                  <p className="text-xs text-slateText-secondary">
                    {isAr ? 'إدارة العملاء، سجل الإنفاق (LTV)، وسجل الملاحظات الخاصة' : 'Customer Lifetime Value, notes, and direct concierge desk'}
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-start text-xs">
                  <thead className="bg-canvas border-b border-gold-hairline/60 text-slateText-secondary font-semibold uppercase tracking-wider">
                    <tr>
                      <th className="px-4 py-3 text-start">{isAr ? 'العميلة' : 'Client Name'}</th>
                      <th className="px-4 py-3 text-start">{isAr ? 'رقم الهاتف' : 'Phone'}</th>
                      <th className="px-4 py-3 text-start">{isAr ? 'المنطقة / البلدية' : 'Municipality'}</th>
                      <th className="px-4 py-3 text-start">{isAr ? 'التصنيف' : 'Tier'}</th>
                      <th className="px-4 py-3 text-start">{isAr ? 'إجمالي المشتريات' : 'LTV (QAR)'}</th>
                      <th className="px-4 py-3 text-start">{isAr ? 'الطلبات' : 'Orders'}</th>
                      <th className="px-4 py-3 text-start">{isAr ? 'إجراء فوري' : 'Action'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gold-hairline/40">
                    {filteredCustomers.map((cust) => (
                      <tr
                        key={cust.id}
                        onClick={() => { setSelectedRecord(cust); setSelectedRecordType('customer'); }}
                        className="hover:bg-canvas transition-colors cursor-pointer"
                      >
                        <td className="px-4 py-3 font-bold text-burgundy">{cust.name}</td>
                        <td className="px-4 py-3 font-mono text-slateText-secondary">{cust.phone}</td>
                        <td className="px-4 py-3 text-slateText-body">{cust.municipality}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              cust.tier === 'Royal VIP'
                                ? 'bg-burgundy text-white'
                                : cust.tier === 'Atelier Patron'
                                ? 'bg-gold-soft text-slateText-body'
                                : 'bg-surface-peachSoft text-slateText-body'
                            }`}
                          >
                            {cust.tier}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-mono font-bold text-burgundy">{cust.totalSpent.toLocaleString()} QAR</td>
                        <td className="px-4 py-3 font-mono">{cust.orderCount}</td>
                        <td className="px-4 py-3">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              triggerWhatsAppConcierge(cust.phone, cust.name);
                            }}
                            className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 flex items-center gap-1 font-bold text-[11px]"
                            title="Chat via WhatsApp Concierge"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>واتساب</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: COMMISSIONS PIPELINE (TWENTY KANBAN BOARD) */}
          {activeTab === 'commissions' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display font-bold text-sm text-burgundy">
                    {isAr ? 'مسار ورشة التفصيل والرسم اليدوي (Kanban Board)' : 'Bespoke Atelier Kanban Pipeline'}
                  </h3>
                  <p className="text-xs text-slateText-secondary">
                    {isAr ? 'تتبع مراحل الثوب من استفسار القماش حتى التسليم في الدوحة' : 'Drag or click cards to transition production stages'}
                  </p>
                </div>
              </div>

              {/* Kanban Columns */}
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {(['Inquiry', 'Fabric', 'Painting', 'Tailoring', 'Quality', 'Delivery'] as AtelierCommission['status'][]).map((stage) => {
                  const stageCommissions = commissions.filter((c) => c.status === stage);
                  return (
                    <div key={stage} className="bg-canvas-warm/50 p-3 rounded-2xl border border-gold-hairline space-y-3">
                      <div className="flex items-center justify-between text-xs font-bold text-burgundy border-b border-gold-hairline/60 pb-2">
                        <span>{stage}</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white">{stageCommissions.length}</span>
                      </div>

                      <div className="space-y-2 min-h-[150px]">
                        {stageCommissions.map((comm) => (
                          <div
                            key={comm.id}
                            onClick={() => { setSelectedRecord(comm); setSelectedRecordType('commission'); }}
                            className="bg-white p-3 rounded-xl border border-gold-hairline shadow-sm hover:border-burgundy cursor-pointer space-y-1.5 transition-all text-xs"
                          >
                            <div className="font-bold text-burgundy line-clamp-1">{comm.customerName}</div>
                            <div className="text-[10px] text-slateText-secondary line-clamp-1">{comm.fabric}</div>
                            <div className="flex items-center justify-between font-mono pt-1 text-[11px]">
                              <span className="font-bold text-burgundy">{comm.priceQar} QAR</span>
                              <span className="text-[9.5px] text-slateText-secondary">{comm.deliveryDateTarget}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: RAW MATERIALS & FABRIC INVENTORY (ERP) */}
          {activeTab === 'inventory' && (
            <div className="bg-white rounded-2xl border border-gold-hairline shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gold-hairline/60 flex items-center justify-between">
                <div>
                  <h3 className="font-display font-bold text-sm text-burgundy">
                    {isAr ? 'مخزون الأقمشة والخامات الملكية (ERP Inventory)' : 'Fabric & Raw Materials ERP'}
                  </h3>
                  <p className="text-xs text-slateText-secondary">
                    {isAr ? 'متابعة الأمتار المتوفرة، تكلفة المتر، وتنبيهات إعادة الطلب' : 'Track fabric meters, origin mills, and yield per toub'}
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-start text-xs">
                  <thead className="bg-canvas border-b border-gold-hairline/60 text-slateText-secondary font-semibold uppercase">
                    <tr>
                      <th className="px-4 py-3 text-start">{isAr ? 'نوع القماش' : 'Fabric Spec'}</th>
                      <th className="px-4 py-3 text-start">{isAr ? 'المصدر والمنسج' : 'Mill & Origin'}</th>
                      <th className="px-4 py-3 text-start">{isAr ? 'المخزون الحالي' : 'Stock (Meters)'}</th>
                      <th className="px-4 py-3 text-start">{isAr ? 'الحد الأدنى' : 'Min Threshold'}</th>
                      <th className="px-4 py-3 text-start">{isAr ? 'تكلفة المتر' : 'Cost/m'}</th>
                      <th className="px-4 py-3 text-start">{isAr ? 'الحالة' : 'Status'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gold-hairline/40">
                    {fabrics.map((fab) => (
                      <tr
                        key={fab.id}
                        onClick={() => { setSelectedRecord(fab); setSelectedRecordType('fabric'); }}
                        className="hover:bg-canvas transition-colors cursor-pointer"
                      >
                        <td className="px-4 py-3 font-bold text-burgundy">{isAr ? fab.name.ar : fab.name.en}</td>
                        <td className="px-4 py-3 text-slateText-secondary">{fab.origin}</td>
                        <td className="px-4 py-3 font-mono font-bold">{fab.stockMeters} م</td>
                        <td className="px-4 py-3 font-mono text-slateText-secondary">{fab.minThresholdMeters} م</td>
                        <td className="px-4 py-3 font-mono">{fab.costPerMeterQAR} QAR</td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              fab.status === 'optimal'
                                ? 'bg-emerald-50 text-emerald-700'
                                : fab.status === 'low'
                                ? 'bg-amber-50 text-amber-700'
                                : 'bg-red-50 text-red-700'
                            }`}
                          >
                            {fab.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: ORDERS & FULFILLMENT (3NF LIVE SYNC) */}
          {activeTab === 'orders' && (
            <div className="bg-white rounded-2xl border border-gold-hairline shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gold-hairline/60 flex items-center justify-between">
                <div>
                  <h3 className="font-display font-bold text-sm text-burgundy">
                    {isAr ? 'إدارة وتتبع طلبات المتجر (3NF Order Fulfillment)' : 'Order Fulfillment Engine'}
                  </h3>
                  <p className="text-xs text-slateText-secondary">
                    {isAr ? 'متصل بقاعدة البيانات العلاقية ومسارات الدفع الإلكتروني' : 'Synced live with 3NF database store'}
                  </p>
                </div>
              </div>

              {isLoadingOrders ? (
                <div className="p-8 text-center text-xs text-slateText-secondary">
                  {isAr ? 'جاري تحميل الطلبات من السيرفر...' : 'Loading orders...'}
                </div>
              ) : filteredOrders.length === 0 ? (
                <div className="p-8 text-center text-xs text-slateText-secondary">
                  {isAr ? 'لا توجد طلبات مسجلة حالياً' : 'No orders found matching query.'}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-start text-xs">
                    <thead className="bg-canvas border-b border-gold-hairline/60 text-slateText-secondary font-semibold uppercase">
                      <tr>
                        <th className="px-4 py-3 text-start">{isAr ? 'رقم الطلب' : 'Order #'}</th>
                        <th className="px-4 py-3 text-start">{isAr ? 'العميلة' : 'Customer'}</th>
                        <th className="px-4 py-3 text-start">{isAr ? 'البلدية' : 'Municipality'}</th>
                        <th className="px-4 py-3 text-start">{isAr ? 'الإجمالي' : 'Total (QAR)'}</th>
                        <th className="px-4 py-3 text-start">{isAr ? 'طريقة الدفع' : 'Payment'}</th>
                        <th className="px-4 py-3 text-start">{isAr ? 'الحالة' : 'Status'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gold-hairline/40">
                      {filteredOrders.map((ord) => (
                        <tr
                          key={ord.id}
                          onClick={() => { setSelectedRecord(ord); setSelectedRecordType('order'); }}
                          className="hover:bg-canvas transition-colors cursor-pointer"
                        >
                          <td className="px-4 py-3 font-mono font-bold text-burgundy">{ord.orderNumber}</td>
                          <td className="px-4 py-3 font-semibold">{ord.customer?.name}</td>
                          <td className="px-4 py-3 text-slateText-secondary">{ord.customer?.municipality}</td>
                          <td className="px-4 py-3 font-mono font-bold text-burgundy">{ord.totalQAR} QAR</td>
                          <td className="px-4 py-3 uppercase text-[11px] font-mono">{ord.paymentMethod}</td>
                          <td className="px-4 py-3">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-burgundy/10 text-burgundy">
                              {ord.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 6: FINANCE & PAYMENT AUDIT */}
          {activeTab === 'finance' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-gold-hairline shadow-sm space-y-1">
                  <span className="text-xs text-slateText-secondary">{isAr ? 'مدفوعات فورية (Fawran)' : 'Fawran Instant'}</span>
                  <div className="text-xl font-bold font-mono text-emerald-700">14,250 QAR</div>
                  <span className="text-[10px] text-slateText-secondary">{isAr ? 'تسوية لحظية بالريال القطري' : 'Instant QAR Settlement'}</span>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-gold-hairline shadow-sm space-y-1">
                  <span className="text-xs text-slateText-secondary">{isAr ? 'بوابة بطاقات QPay / NAPS' : 'QPay / NAPS Gateway'}</span>
                  <div className="text-xl font-bold font-mono text-burgundy">8,900 QAR</div>
                  <span className="text-[10px] text-slateText-secondary">{isAr ? 'بطاقات فيزا وماستركارد وبطاقة الخصم' : 'Debit/Credit Rails'}</span>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-gold-hairline shadow-sm space-y-1">
                  <span className="text-xs text-slateText-secondary">{isAr ? 'تحويل بنكي مدقق' : 'Verified Bank Wires'}</span>
                  <div className="text-xl font-bold font-mono text-gold-ink">6,200 QAR</div>
                  <span className="text-[10px] text-slateText-secondary">{isAr ? 'تحويل حساب بنك قطر الوطني QNB' : 'QNB Corporate Account'}</span>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* ========================================================= */}
      {/* 3. TWENTY SLIDE-OVER DETAIL DRAWER (RECORD INSPECTOR)     */}
      {/* ========================================================= */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-burgundy-deep/40 backdrop-blur-xs transition-opacity"
            onClick={() => setSelectedRecord(null)}
          />

          {/* Drawer Panel */}
          <div
            dir={isAr ? 'rtl' : 'ltr'}
            className="relative w-full max-w-md bg-white h-full shadow-2xl border-s border-gold-hairline z-10 flex flex-col overflow-y-auto animate-fadeIn"
          >
            {/* Header */}
            <div className="p-5 border-b border-gold-hairline flex items-center justify-between bg-canvas">
              <div>
                <span className="text-[10px] font-bold text-gold-ink uppercase tracking-wider block">
                  {selectedRecordType === 'customer'
                    ? isAr ? 'ملف عميلة كبار الشخصيات' : 'VIP Patron Profile'
                    : selectedRecordType === 'commission'
                    ? isAr ? 'تفاصيل طلب التفصيل' : 'Commission Record'
                    : selectedRecordType === 'order'
                    ? isAr ? 'بيانات طلب المتجر' : 'Store Order Inspector'
                    : isAr ? 'تفاصيل القماش' : 'Fabric Record'}
                </span>
                <h3 className="text-base font-bold text-burgundy font-display">
                  {selectedRecord.name || selectedRecord.customerName || selectedRecord.orderNumber || selectedRecord.name?.ar}
                </h3>
              </div>
              <button
                onClick={() => setSelectedRecord(null)}
                className="p-2 rounded-full hover:bg-surface-peachSoft/40 text-slateText-body"
              >
                <X className="w-5 h-5 text-burgundy" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="p-6 space-y-6 flex-1 text-xs">
              
              {/* CUSTOMER DETAILS */}
              {selectedRecordType === 'customer' && (
                <div className="space-y-4">
                  <div className="p-4 bg-canvas rounded-2xl border border-gold-hairline space-y-2">
                    <span className="text-[10px] text-slateText-secondary block">{isAr ? 'رقم الهاتف والتواصل' : 'Phone'}</span>
                    <span className="font-mono text-sm font-bold text-burgundy">{selectedRecord.phone}</span>
                    <div className="pt-2">
                      <button
                        onClick={() => triggerWhatsAppConcierge(selectedRecord.phone, selectedRecord.name)}
                        className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center justify-center gap-2"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>{isAr ? 'فتح محادثة واتساب VIP' : 'Open WhatsApp Concierge'}</span>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-slateText-secondary">{isAr ? 'المنطقة / البلدية في قطر:' : 'Municipality:'}</span>
                    <p className="font-semibold text-slateText-body">{selectedRecord.municipality}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-slateText-secondary">{isAr ? 'ملف القياسات الخاصة:' : 'Measurements:'}</span>
                    <p className="p-3 bg-canvas-warm/50 rounded-xl border border-gold-hairline/60 text-slateText-body">
                      {selectedRecord.measurementProfile || 'القياس القياسي للثوب 4.5 متر'}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-slateText-secondary">{isAr ? 'ملاحظات الأتيليه والتفضيلات:' : 'Atelier Notes:'}</span>
                    <p className="p-3 bg-canvas-warm/50 rounded-xl border border-gold-hairline/60 text-slateText-body">
                      {selectedRecord.notes || 'لا توجد ملاحظات إضافية.'}
                    </p>
                  </div>
                </div>
              )}

              {/* COMMISSION DETAILS */}
              {selectedRecordType === 'commission' && (
                <div className="space-y-4">
                  <div className="p-4 bg-canvas rounded-2xl border border-gold-hairline space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-slateText-secondary">{isAr ? 'مرحلة الإنتاج الحالية' : 'Current Stage'}</span>
                      <span className="font-bold text-burgundy font-mono">{selectedRecord.status}</span>
                    </div>

                    <div className="pt-2 flex items-center gap-1.5">
                      {(['Inquiry', 'Fabric', 'Painting', 'Tailoring', 'Quality', 'Delivery'] as AtelierCommission['status'][]).map((st) => (
                        <button
                          key={st}
                          onClick={() => handleUpdateCommissionStatus(selectedRecord.id, st)}
                          className={`flex-1 py-1 text-[9px] font-bold rounded-lg transition-colors ${
                            selectedRecord.status === st ? 'bg-burgundy text-white' : 'bg-white border border-gold-hairline text-slateText-body'
                          }`}
                        >
                          {st.slice(0, 4)}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-slateText-secondary">{isAr ? 'القماش المختار:' : 'Fabric Spec:'}</span>
                    <p className="font-semibold text-slateText-body">{selectedRecord.fabric}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-slateText-secondary">{isAr ? 'الفنانة المسؤولة عن الرسم:' : 'Assigned Artisan:'}</span>
                    <p className="font-semibold text-burgundy">{selectedRecord.artisanName || 'أتيليه الدوحة المركزي'}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-slateText-secondary">{isAr ? 'تاريخ التسليم المستهدف:' : 'Target Delivery:'}</span>
                    <p className="font-mono font-bold text-slateText-body">{selectedRecord.deliveryDateTarget}</p>
                  </div>
                </div>
              )}

              {/* ORDER DETAILS */}
              {selectedRecordType === 'order' && (
                <div className="space-y-4">
                  <div className="p-4 bg-canvas rounded-2xl border border-gold-hairline space-y-2">
                    <span className="text-slateText-secondary block">{isAr ? 'تحديث حالة الطلب (3NF Sync)' : 'Transition Order Status'}</span>
                    <select
                      value={selectedRecord.status}
                      onChange={(e) => handleUpdateOrderStatus(selectedRecord.id, e.target.value as any)}
                      className="w-full py-2 px-3 border border-gold-line rounded-xl font-bold text-burgundy bg-white focus:outline-none"
                    >
                      <option value="Confirmed">Confirmed</option>
                      <option value="InProduction">InProduction</option>
                      <option value="QualityInspection">QualityInspection</option>
                      <option value="OutForDelivery">OutForDelivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <span className="text-slateText-secondary font-bold block">{isAr ? 'القطع المطلوبة:' : 'Line Items:'}</span>
                    {selectedRecord.items?.map((item: any, i: number) => (
                      <div key={i} className="p-3 bg-canvas rounded-xl border border-gold-hairline flex items-center justify-between">
                        <div>
                          <p className="font-bold text-burgundy">{item.product?.title?.ar || item.product?.title?.en}</p>
                          <span className="text-[10px] text-slateText-secondary">كمية: {item.quantity} • مقاس: {item.selectedSizeCode}</span>
                        </div>
                        <span className="font-mono font-bold text-burgundy">{item.unitPriceQAR * item.quantity} QAR</span>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-canvas-warm rounded-2xl border border-gold-hairline flex items-center justify-between text-sm">
                    <span className="font-bold text-slateText-body">{isAr ? 'الإجمالي النهائي:' : 'Final Total:'}</span>
                    <span className="font-mono font-bold text-lg text-burgundy">{selectedRecord.totalQAR} QAR</span>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
