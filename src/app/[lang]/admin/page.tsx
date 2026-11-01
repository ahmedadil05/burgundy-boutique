'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Language } from '@/lib/i18n';
import { useCatalogStore } from '@/lib/catalog-store';
import { useStoreSettings } from '@/lib/settings-store';
import { useCRM, LeadStatus } from '@/lib/crm-store';
import { useAds, AdStatus, AdPlacement } from '@/lib/ads-store';
import { MobileOrdersList } from '@/components/admin/MobileOrdersList';
import { MobileProductList } from '@/components/admin/MobileProductList';
import { AddProductDrawer } from '@/components/admin/AddProductDrawer';
import { SalesSummaryCards } from '@/components/admin/SalesSummaryCards';
import { OrderRow } from '@/components/admin/OrdersTable';
import {
  ShieldCheck,
  Package,
  Layers,
  Settings,
  Plus,
  BarChart3,
  CheckCircle2,
  Users,
  Megaphone,
  Bell,
  Download,
  Eye,
  LogOut,
  Lock,
  Smartphone,
  Send,
  MessageCircle,
  FileSpreadsheet,
  Check,
  AlertTriangle,
  Clock,
  Trash2,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const params = useParams();
  const lang = (params?.lang === 'en' ? 'en' : 'ar') as Language;
  const isAr = lang === 'ar';

  // State Stores
  const { products, addProduct, deleteProduct, updateStock, removeSampleProducts } = useCatalogStore();
  const { settings, updateSettings, toggleLaunchMode } = useStoreSettings();
  const { leads, customers, updateLeadStatus, updateLeadReminder, exportCRMToCSV } = useCRM();
  const { ads, addAd, updateAd, deleteAd } = useAds();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminRole, setAdminRole] = useState<'owner' | 'staff'>('owner');
  const [pinCode, setPinCode] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active Tab
  const [activeTab, setActiveTab] = useState<
    'overview' | 'orders' | 'products' | 'crm' | 'ads' | 'settings' | 'notifications'
  >('overview');

  // Orders State
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Telegram Alert Simulation State
  const [telegramLogs, setTelegramLogs] = useState<Array<{ id: string; text: string; time: string }>>([
    {
      id: 'tg-1',
      text: '🔔 New Order QA-894210 received! 1,650 QAR via Fawran. Customer: Sara Al-Kuwari.',
      time: 'Just now',
    },
  ]);

  // Load orders on mount
  useEffect(() => {
    try {
      const savedOrders = JSON.parse(
        localStorage.getItem('burgundy_orders') || localStorage.getItem('kandaka_orders') || '[]'
      );
      if (savedOrders.length > 0) {
        setOrders(savedOrders);
      } else {
        // Seed initial orders for preview
        const initialSeed: OrderRow[] = [
          {
            orderId: 'QA-894210',
            orderDate: new Date().toISOString(),
            customer: {
              name: 'سارة الكواري (Sara Al-Kuwari)',
              phone: '+974 5000 0974',
              email: 'sara@example.qa',
              shippingAddress: {
                zone: '55',
                street: 'Al Waab St.',
                building: 'Villa 9',
                municipality: 'Al Rayyan',
              },
            },
            items: [
              {
                id: 'sample-001',
                slug: 'burgundy-hand-painted-silk-toub',
                title: { ar: 'ثوب حرير مرسوم يدوياً بتدرجات البيرغندي', en: 'Hand-Painted Royal Silk Toub in Burgundy Sunset' },
                priceQAR: 1650,
                quantity: 1,
                size: 'Free Size (4.5m x 1.15m)',
                color: 'بيرغندي ملكي',
                image: '/brand/teaser-clean.jpg',
              },
            ],
            totals: { subtotal: 1650, shipping: 0, total: 1650 },
            paymentMethod: 'fawran',
            status: 'confirmed',
          },
          {
            orderId: 'QA-894208',
            orderDate: new Date(Date.now() - 86400000).toISOString(),
            customer: {
              name: 'مريم النعيمي',
              phone: '+974 5511 4455',
              email: 'maryam@example.qa',
              shippingAddress: {
                zone: '66',
                street: '12',
                building: '10',
                municipality: 'الظعاين (Al Daayen)',
              },
            },
            items: [
              {
                id: 'sample-003',
                slug: 'bespoke-painted-linen-jalabiya',
                title: { ar: 'جلابية كتان سودانية راقية برسم يدوي ناعم', en: 'Hand-Painted Pure Linen Sudanese Jalabiya' },
                priceQAR: 850,
                quantity: 1,
                size: 'M (Length 56 in)',
                color: 'خوخي باهت',
                image: '/brand/teaser-clean.jpg',
              },
            ],
            totals: { subtotal: 850, shipping: 0, total: 850 },
            paymentMethod: 'card',
            status: 'processing',
          },
        ];
        setOrders(initialSeed);
      }
    } catch {}
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Auth Submit
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinCode === '9740' || pinCode === 'admin' || pinCode === 'burgundy') {
      setIsAuthenticated(true);
      setLoginError('');
      showToast(isAr ? 'تم تسجيل الدخول بنجاح كمدير' : 'Logged in successfully as Administrator');
    } else {
      setLoginError(isAr ? 'رمز الدخول غير صحيح. الرمز التجريبي هو: 9740' : 'Invalid PIN. Demo passcode is: 9740');
    }
  };

  const handleUpdateOrderStatus = (orderId: string, status: OrderRow['status']) => {
    const updated = orders.map((o) => (o.orderId === orderId ? { ...o, status } : o));
    setOrders(updated);
    try {
      localStorage.setItem('burgundy_orders', JSON.stringify(updated));
      localStorage.setItem('kandaka_orders', JSON.stringify(updated));
    } catch {}

    // Dispatch Telegram simulation alert with quick reply button
    const alertText = `⚡ Order ${orderId} updated to status: ${status.toUpperCase()}!`;
    setTelegramLogs((prev) => [{ id: `tg-${Date.now()}`, text: alertText, time: 'Just now' }, ...prev]);
    showToast(isAr ? `تم تحديث حالة الطلب إلى: ${status}` : `Order status updated to: ${status}`);
  };

  const handleSimulateTelegramQuickReply = (orderId: string, action: 'ship' | 'delivered') => {
    handleUpdateOrderStatus(orderId, action === 'ship' ? 'shipped' : 'delivered');
    showToast(isAr ? 'تم تنفيذ الإجراء عبر بوت تيليغرام' : 'Quick reply executed via Telegram Bot');
  };

  // Login Screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-canvas leaf-shadow-bg">
        <div className="w-full max-w-sm bg-white p-7 sm:p-8 rounded-2xl border border-gold-hairline shadow-luxury text-center space-y-6 animate-scaleUp">
          <div className="w-12 h-12 bg-surface-peachSoft/50 text-burgundy rounded-full flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6 text-burgundy" />
          </div>

          <div>
            <span className="brand-wordmark text-2xl text-burgundy block font-extrabold">
              BURGUNDY
            </span>
            <h1 className="text-sm font-bold text-slateText-body font-cairo mt-1">
              {isAr ? 'لوحة تحكم إدارة المتجر' : 'Atelier Mobile Operations Hub'}
            </h1>
            <p className="text-[11px] text-slateText-secondary mt-1">
              {isAr ? 'سجلي الدخول كمالكة أو موظفة (الرمز: 9740)' : 'Owner / Staff access (Demo PIN: 9740)'}
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="flex justify-center gap-2 mb-2">
              <button
                type="button"
                onClick={() => setAdminRole('owner')}
                className={`px-3 py-1 text-xs font-bold rounded-lg border transition-all ${
                  adminRole === 'owner'
                    ? 'bg-burgundy text-white border-burgundy'
                    : 'bg-white text-slateText-secondary border-gold-hairline'
                }`}
              >
                {isAr ? 'المالكة (Owner)' : 'Owner'}
              </button>
              <button
                type="button"
                onClick={() => setAdminRole('staff')}
                className={`px-3 py-1 text-xs font-bold rounded-lg border transition-all ${
                  adminRole === 'staff'
                    ? 'bg-burgundy text-white border-burgundy'
                    : 'bg-white text-slateText-secondary border-gold-hairline'
                }`}
              >
                {isAr ? 'فريق العمل (Staff)' : 'Staff'}
              </button>
            </div>

            <div>
              <input
                type="password"
                maxLength={8}
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                placeholder={isAr ? 'أدخلي رمز الدخول (9740)' : 'Enter PIN (9740)'}
                className="w-full px-4 py-3 rounded-xl border border-surface-peachMuted text-center font-mono text-base tracking-widest focus:outline-none focus:ring-2 focus:ring-burgundy/40"
                autoFocus
              />
            </div>

            {loginError && <p className="text-xs text-coral font-medium">{loginError}</p>}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-burgundy hover:bg-burgundy-hover text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md"
            >
              {isAr ? 'دخول لوحة التحكم' : 'Unlock Dashboard'}
            </button>
          </form>

          <div className="pt-2 border-t border-gold-hairline/40 text-[10px] text-slateText-secondary">
            <p>{isAr ? 'دولة قطر • نظام محمي ومشفر' : 'State of Qatar • Encrypted Session'}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-canvas pb-20">
      {/* Toast alert */}
      {toastMessage && (
        <div className="fixed top-20 start-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-burgundy text-white text-xs font-bold shadow-luxury flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-gold-line" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Admin Bar */}
      <div className="bg-white border-b border-gold-hairline px-4 sm:px-6 py-4 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="brand-wordmark text-xl text-burgundy font-bold">
              {settings.storeName.en}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-surface-peachSoft/50 text-burgundy px-2 py-0.5 rounded border border-gold-hairline">
              {adminRole === 'owner' ? 'OWNER PORTAL' : 'STAFF PORTAL'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Launch Mode Live Switch */}
            <div className="flex items-center gap-2 bg-canvas-warm/50 border border-gold-hairline px-3 py-1 rounded-full text-xs">
              <span className="text-[11px] font-semibold text-slateText-secondary hidden sm:inline">
                {isAr ? 'وضع ما قبل الإطلاق:' : 'Pre-Launch Mode:'}
              </span>
              <button
                onClick={() => {
                  toggleLaunchMode();
                  showToast(
                    !settings.launchMode
                      ? isAr ? 'تم تفعيل وضع ما قبل الإطلاق' : 'Pre-launch mode activated'
                      : isAr ? 'تم فتح المتجر الكامل للزوار' : 'Full shop is now LIVE!'
                  );
                }}
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase transition-all ${
                  settings.launchMode
                    ? 'bg-amber-100 text-amber-800 border border-amber-300'
                    : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                }`}
              >
                {settings.launchMode ? (isAr ? 'مفعل (Teaser ON)' : 'Teaser ON') : (isAr ? 'المتجر متاح (Live)' : 'Shop LIVE')}
              </button>
            </div>

            <Link
              href={`/${lang}`}
              target="_blank"
              className="p-1.5 rounded-lg text-slateText-secondary hover:text-burgundy hover:bg-surface-peachSoft/30 transition-colors"
              title={isAr ? 'عرض المتجر المباشر' : 'View Live Store'}
            >
              <Eye className="w-4 h-4" />
            </Link>

            <button
              onClick={() => setIsAuthenticated(false)}
              className="p-1.5 rounded-lg text-slateText-secondary hover:text-coral transition-colors"
              title={isAr ? 'تسجيل الخروج' : 'Log Out'}
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Tabs (Horizontal Scrollable) */}
        <div className="max-w-7xl mx-auto flex gap-1 sm:gap-2 overflow-x-auto pt-3 text-xs font-semibold no-scrollbar">
          {[
            { id: 'overview', label: isAr ? 'نظرة عامة ومبيعات' : 'Overview', icon: BarChart3 },
            { id: 'orders', label: isAr ? 'الطلبات والفواتير' : 'Orders', icon: Package, badge: orders.length },
            { id: 'products', label: isAr ? 'إدارة الثياب والقطع' : 'Catalog', icon: Layers, badge: products.length },
            { id: 'crm', label: isAr ? 'العملاء والطلبات الخاصة' : 'CRM & Leads', icon: Users, badge: leads.length },
            { id: 'ads', label: isAr ? 'المساحات الإعلانية' : 'Sponsored Ads', icon: Megaphone, badge: ads.length },
            { id: 'settings', label: isAr ? 'إعدادات المتجر والتراخيص' : 'Store Settings', icon: Settings },
            { id: 'notifications', label: isAr ? 'إشعارات تيليغرام وإيميل' : 'Alerts & Bots', icon: Bell },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-2 rounded-xl flex items-center gap-1.5 whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-burgundy text-white shadow-sm'
                    : 'text-slateText-secondary hover:text-burgundy hover:bg-surface-peachSoft/30'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-canvas-warm text-slateText-body'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* TAB 1: OVERVIEW & SALES */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Pre-launch Banner Notification */}
            {settings.launchMode && (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-soft">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-5 h-5 text-amber-700 shrink-0" />
                  <div>
                    <p className="text-xs font-bold">
                      {isAr ? 'المتجر يعمل حالياً في وضع ما قبل الإطلاق (Teaser Mode)' : 'Pre-Launch Teaser Mode is currently ACTIVE'}
                    </p>
                    <p className="text-[11px] text-amber-800">
                      {isAr
                        ? 'الزوار يشاهدون صفحة الإعلان التشويقي وقائمة الانتظار. يمكنكِ تعطيله بكبسة واحدة فور جاهزية الافتتاح.'
                        : 'Visitors see the brand teaser and waitlist. Flip the toggle when ready for the grand launch.'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={toggleLaunchMode}
                  className="px-4 py-1.5 rounded-full bg-burgundy text-white text-xs font-bold shrink-0 shadow-sm"
                >
                  {isAr ? 'فتح المتجر الآن' : 'Launch Full Shop'}
                </button>
              </div>
            )}

            {/* Sales Summary Cards */}
            <SalesSummaryCards orders={orders} lang={lang} />

            {/* Quick Actions Panel */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button
                onClick={() => setIsAddDrawerOpen(true)}
                className="p-4 rounded-xl bg-white border border-gold-hairline shadow-soft hover:shadow-luxury text-start transition-all flex flex-col justify-between group"
              >
                <div className="w-8 h-8 rounded-lg bg-burgundy/10 text-burgundy flex items-center justify-center mb-2 group-hover:bg-burgundy group-hover:text-white transition-colors">
                  <Plus className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-burgundy">{isAr ? 'إضافة ثوب جديد' : 'Add New Toub'}</h4>
                  <p className="text-[10px] text-slateText-secondary">{isAr ? 'رفع صور من الجوال' : 'Camera upload'}</p>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('orders')}
                className="p-4 rounded-xl bg-white border border-gold-hairline shadow-soft hover:shadow-luxury text-start transition-all flex flex-col justify-between group"
              >
                <div className="w-8 h-8 rounded-lg bg-burgundy/10 text-burgundy flex items-center justify-center mb-2 group-hover:bg-burgundy group-hover:text-white transition-colors">
                  <Package className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-burgundy">{isAr ? 'متابعة الطلبات' : 'Manage Orders'}</h4>
                  <p className="text-[10px] text-slateText-secondary">{orders.length} {isAr ? 'طلبات مسجلة' : 'active'}</p>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('crm')}
                className="p-4 rounded-xl bg-white border border-gold-hairline shadow-soft hover:shadow-luxury text-start transition-all flex flex-col justify-between group"
              >
                <div className="w-8 h-8 rounded-lg bg-burgundy/10 text-burgundy flex items-center justify-center mb-2 group-hover:bg-burgundy group-hover:text-white transition-colors">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-burgundy">{isAr ? 'طلبات التفصيل' : 'Bespoke Leads'}</h4>
                  <p className="text-[10px] text-slateText-secondary">{leads.length} {isAr ? 'استفسارات' : 'inquiries'}</p>
                </div>
              </button>

              <button
                onClick={exportCRMToCSV}
                className="p-4 rounded-xl bg-white border border-gold-hairline shadow-soft hover:shadow-luxury text-start transition-all flex flex-col justify-between group"
              >
                <div className="w-8 h-8 rounded-lg bg-burgundy/10 text-burgundy flex items-center justify-center mb-2 group-hover:bg-burgundy group-hover:text-white transition-colors">
                  <FileSpreadsheet className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-burgundy">{isAr ? 'تصدير إكسل / CSV' : 'Export Data'}</h4>
                  <p className="text-[10px] text-slateText-secondary">{isAr ? 'تنزيل بيانات العملاء' : 'Download leads'}</p>
                </div>
              </button>
            </div>

            {/* Recent Orders Snapshot */}
            <div className="bg-white p-5 rounded-2xl border border-gold-hairline shadow-soft space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gold-hairline/60">
                <h3 className="text-sm font-bold text-burgundy font-cairo">
                  {isAr ? 'أحدث الطلبات الواردة' : 'Recent Inbound Orders'}
                </h3>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="text-xs font-bold text-burgundy hover:underline"
                >
                  {isAr ? 'عرض الكل' : 'View All'}
                </button>
              </div>

              <MobileOrdersList
                orders={orders.slice(0, 3)}
                onUpdateStatus={handleUpdateOrderStatus}
                lang={lang}
              />
            </div>
          </div>
        )}

        {/* TAB 2: ORDERS & INVOICES */}
        {activeTab === 'orders' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-burgundy font-cairo">
                  {isAr ? 'سجل طلبات وفواتير العملاء' : 'Orders & Invoices Management'}
                </h2>
                <p className="text-xs text-slateText-secondary">
                  {isAr
                    ? 'بطاقات طلبات مهيأة للجوال لتحديث الحالة بلمسة واحدة وتحميل الفاتورة'
                    : 'Mobile-first order cards with one-tap status updates'}
                </p>
              </div>
            </div>

            <MobileOrdersList
              orders={orders}
              onUpdateStatus={handleUpdateOrderStatus}
              lang={lang}
            />
          </div>
        )}

        {/* TAB 3: PRODUCTS & ATELIER CATALOG */}
        {activeTab === 'products' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-burgundy font-cairo">
                  {isAr ? 'تشكيلة الأزياء والثياب' : 'Garments & Atelier Catalog'}
                </h2>
                <p className="text-xs text-slateText-secondary">
                  {isAr
                    ? 'إدارة المنتجات، الصور المضغوطة، المخزون، ونظام التفصيل حسب الطلب'
                    : 'Manage products, compressed imagery, stock count, and made-to-order flags'}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    removeSampleProducts();
                    showToast(isAr ? 'تم حذف العينات التجريبية بنجاح' : 'Demo samples purged successfully');
                  }}
                  className="px-3 py-2 rounded-xl border border-red-200 text-red-700 bg-red-50 hover:bg-red-100 text-xs font-bold flex items-center gap-1 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{isAr ? 'حذف العينات التجريبية' : 'Purge Demo Samples'}</span>
                </button>

                <button
                  onClick={() => setIsAddDrawerOpen(true)}
                  className="px-4 py-2 rounded-xl bg-burgundy hover:bg-burgundy-hover text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>{isAr ? 'إضافة ثوب جديد' : 'New Product'}</span>
                </button>
              </div>
            </div>

            <MobileProductList
              products={products}
              onDeleteProduct={(id) => {
                deleteProduct(id);
                showToast(isAr ? 'تم حذف القطعة من المتجر' : 'Product removed');
              }}
              onUpdateStock={(id, delta, isAbs) => {
                updateStock(id, delta, isAbs);
                showToast(isAr ? 'تم تحديث المخزون' : 'Stock updated');
              }}
              lang={lang}
            />
          </div>
        )}

        {/* TAB 4: CRM & LEADS */}
        {activeTab === 'crm' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-burgundy font-cairo">
                  {isAr ? 'إدارة علاقات العملاء والطلبات الخاصة' : 'Customer CRM & Bespoke Leads'}
                </h2>
                <p className="text-xs text-slateText-secondary">
                  {isAr ? 'استفسارات التفصيل الخاص، الإعلانات، ومتابعة العميلات' : 'Leads from custom order & advertise forms'}
                </p>
              </div>

              <button
                onClick={exportCRMToCSV}
                className="px-4 py-2 rounded-xl bg-white border border-gold-hairline hover:bg-surface-peachSoft/30 text-burgundy text-xs font-bold flex items-center gap-1.5 transition-all self-start sm:self-auto shadow-sm"
              >
                <Download className="w-4 h-4 text-gold-line" />
                <span>{isAr ? 'تصدير جدول العملاء (CSV)' : 'Export CSV'}</span>
              </button>
            </div>

            {/* Inbound Leads Cards */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gold-shimmer">
                {isAr ? 'الطلبات والاستفسارات الواردة' : 'Inbound Leads Pipeline'} ({leads.length})
              </h3>

              {leads.map((lead) => (
                <div
                  key={lead.id}
                  className="bg-white p-5 rounded-2xl border border-gold-hairline shadow-soft space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-burgundy">{lead.name}</span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                            lead.type === 'custom_order'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {lead.type === 'custom_order' ? (isAr ? 'تفصيل خاص' : 'Bespoke Order') : (isAr ? 'إعلان ورعاية' : 'Advertising')}
                        </span>
                      </div>
                      <p className="text-xs text-slateText-secondary mt-0.5 font-mono" dir="ltr">
                        {lead.phone} • {lead.email}
                      </p>
                    </div>

                    <select
                      value={lead.status}
                      onChange={(e) => {
                        updateLeadStatus(lead.id, e.target.value as LeadStatus);
                        showToast(isAr ? 'تم تحديث حالة العميل' : 'Lead status updated');
                      }}
                      className="text-xs font-bold bg-canvas border border-gold-hairline rounded-lg px-2 py-1 focus:outline-none"
                    >
                      <option value="new">{isAr ? 'جديد (New)' : 'New'}</option>
                      <option value="contacted">{isAr ? 'تم التواصل' : 'Contacted'}</option>
                      <option value="quoted">{isAr ? 'تم إرسال العرض' : 'Quoted'}</option>
                      <option value="closed">{isAr ? 'مكتمل' : 'Closed'}</option>
                    </select>
                  </div>

                  <p className="text-xs text-slateText-body bg-canvas-warm/40 p-3 rounded-xl border border-gold-hairline/50 leading-relaxed">
                    {lead.details}
                  </p>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-[11px] text-slateText-secondary">
                      {isAr ? 'تاريخ الورود:' : 'Received:'} {new Date(lead.createdAt).toLocaleDateString()}
                    </span>

                    <a
                      href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                        isAr ? 'مرحباً، نتواصل معكِ من دار بيرغندي للأزياء بخصوص طلبكم.' : 'Hello, we are contacting you from BURGUNDY Atelier.'
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold flex items-center gap-1.5 hover:bg-emerald-100 transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                      <span>{isAr ? 'مراسلة عبر واتساب' : 'WhatsApp'}</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Existing Customers */}
            <div className="space-y-3 pt-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gold-shimmer">
                {isAr ? 'قائمة العميلات وسجل المشتريات' : 'Client Directory & Purchase Records'} ({customers.length})
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {customers.map((c) => (
                  <div
                    key={c.id}
                    className="bg-white p-5 rounded-2xl border border-gold-hairline shadow-soft space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-burgundy">{c.name}</span>
                      {c.isRepeat && (
                        <span className="text-[10px] font-bold bg-surface-peachSoft/50 text-burgundy px-2 py-0.5 rounded-full border border-gold-hairline">
                          {isAr ? 'عميلة متكررة (Repeat)' : 'Repeat VIP'}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slateText-secondary font-mono" dir="ltr">{c.phone}</p>

                    <div className="flex items-center gap-4 text-xs pt-1 text-slateText-body">
                      <div>
                        <span className="text-slateText-secondary block text-[10px]">{isAr ? 'عدد الطلبات' : 'Orders'}</span>
                        <strong className="font-bold">{c.ordersCount}</strong>
                      </div>
                      <div>
                        <span className="text-slateText-secondary block text-[10px]">{isAr ? 'إجمالي المشتريات' : 'Total Spent'}</span>
                        <strong className="font-bold text-burgundy font-mono">{c.totalSpentQAR} QAR</strong>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {c.tags.map((t, i) => (
                        <span key={i} className="text-[10px] bg-canvas px-2 py-0.5 rounded border border-gold-hairline/60 text-slateText-body">
                          {t}
                        </span>
                      ))}
                    </div>

                    {c.notes && (
                      <p className="text-[11px] text-slateText-secondary italic pt-1 border-t border-gold-hairline/40">
                        "{c.notes}"
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: SPONSORED ADS MANAGER */}
        {activeTab === 'ads' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-burgundy font-cairo">
                  {isAr ? 'إدارة المساحات الإعلانية والرعايات' : 'Sponsored Advertising Management'}
                </h2>
                <p className="text-xs text-slateText-secondary">
                  {isAr
                    ? 'إعلانات الشركاء (شريط الرئيسية، شبكة المتجر، التذييل) مع إحصائيات المشاهدة والنقر'
                    : 'Manage sponsored slots and view verified click/impression analytics'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {ads.map((ad) => (
                <div
                  key={ad.id}
                  className="bg-white p-5 rounded-2xl border border-gold-hairline shadow-soft space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-gold-shimmer block">
                        {ad.placement.replace('_', ' ').toUpperCase()}
                      </span>
                      <h4 className="font-bold text-sm text-burgundy">{ad.advertiserName}</h4>
                    </div>

                    <select
                      value={ad.status}
                      onChange={(e) => {
                        updateAd(ad.id, { status: e.target.value as AdStatus });
                        showToast(isAr ? 'تم تحديث حالة الإعلان' : 'Ad status updated');
                      }}
                      className="text-xs font-bold bg-canvas border border-gold-hairline rounded-lg px-2 py-1"
                    >
                      <option value="active">{isAr ? 'نشط (Active)' : 'Active'}</option>
                      <option value="draft">{isAr ? 'مسودة (Draft)' : 'Draft'}</option>
                      <option value="expired">{isAr ? 'منتهي (Expired)' : 'Expired'}</option>
                    </select>
                  </div>

                  <p className="text-xs font-semibold text-slateText-body">{ad.title[lang]}</p>
                  <p className="text-xs text-slateText-secondary">{ad.description[lang]}</p>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gold-hairline/50 text-center">
                    <div className="bg-canvas-warm/40 p-2 rounded-xl">
                      <span className="text-[10px] text-slateText-secondary block">{isAr ? 'المشاهدات' : 'Impressions'}</span>
                      <strong className="text-base font-bold text-burgundy font-mono">{ad.viewsCount}</strong>
                    </div>
                    <div className="bg-canvas-warm/40 p-2 rounded-xl">
                      <span className="text-[10px] text-slateText-secondary block">{isAr ? 'النقرات' : 'Clicks'}</span>
                      <strong className="text-base font-bold text-burgundy font-mono">{ad.clicksCount}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: STORE SETTINGS & LICENSING TABLE */}
        {activeTab === 'settings' && (
          <div className="space-y-6 animate-fadeIn max-w-3xl">
            <div>
              <h2 className="text-lg font-bold text-burgundy font-cairo">
                {isAr ? 'إعدادات المتجر وبيانات التراخيص القطرية' : 'Store Settings & Qatar Licensing Table'}
              </h2>
              <p className="text-xs text-slateText-secondary">
                {isAr
                  ? 'جدول إعدادات موحد قابل للتعديل يحدّث بيانات المتجر والفاتورة مباشرة'
                  : 'Central settings table that updates live storefront, invoices, and brand tokens instantly'}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gold-hairline shadow-soft space-y-5">
              {/* Pre-launch Mode Switch */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-surface-peachSoft/30 border border-gold-hairline">
                <div>
                  <h4 className="text-xs font-bold text-burgundy">
                    {isAr ? 'تفعيل وضع ما قبل الإطلاق (Launch Mode)' : 'Pre-Launch Teaser Mode Toggle'}
                  </h4>
                  <p className="text-[11px] text-slateText-secondary">
                    {isAr
                      ? 'عند التفعيل، تظهر صفحة الإعلان التشويقي مع رابط الواتساب وقائمة الانتظار.'
                      : 'When ON, shows teaser page with waitlist. When OFF, reveals full boutique shop.'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    toggleLaunchMode();
                    showToast(isAr ? 'تم تعديل وضع الإطلاق' : 'Launch mode toggled');
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                    settings.launchMode
                      ? 'bg-amber-600 text-white hover:bg-amber-700'
                      : 'bg-emerald-600 text-white hover:bg-emerald-700'
                  }`}
                >
                  {settings.launchMode ? (isAr ? 'تشويقي (ON)' : 'Teaser ON') : (isAr ? 'المتجر متاح (OFF)' : 'Shop LIVE')}
                </button>
              </div>

              {/* Store Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slateText-body mb-1">
                    {isAr ? 'اسم المتجر بالعربية' : 'Store Name (Arabic)'}
                  </label>
                  <input
                    type="text"
                    value={settings.storeName.ar}
                    onChange={(e) =>
                      updateSettings({ storeName: { ...settings.storeName, ar: e.target.value } })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-surface-peachMuted text-xs focus:ring-2 focus:ring-burgundy/40"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slateText-body mb-1">
                    {isAr ? 'اسم المتجر بالإنجليزية' : 'Store Name (English)'}
                  </label>
                  <input
                    type="text"
                    value={settings.storeName.en}
                    onChange={(e) =>
                      updateSettings({ storeName: { ...settings.storeName, en: e.target.value } })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-surface-peachMuted text-xs focus:ring-2 focus:ring-burgundy/40"
                  />
                </div>
              </div>

              {/* CR & License Numbers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slateText-body mb-1">
                    {isAr ? 'رقم السجل التجاري (CR Number) *' : 'Commercial Registration (CR) *'}
                  </label>
                  <input
                    type="text"
                    value={settings.crNumber}
                    onChange={(e) => updateSettings({ crNumber: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-surface-peachMuted text-xs font-mono focus:ring-2 focus:ring-burgundy/40"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slateText-body mb-1">
                    {isAr ? 'رقم رخصة التجارة الإلكترونية *' : 'E-Commerce License Number *'}
                  </label>
                  <input
                    type="text"
                    value={settings.licenseNumber}
                    onChange={(e) => updateSettings({ licenseNumber: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-surface-peachMuted text-xs font-mono focus:ring-2 focus:ring-burgundy/40"
                  />
                </div>
              </div>

              {/* Brand Colors & Instagram */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slateText-body mb-1">
                    {isAr ? 'لون البيرغندي الأساسي' : 'Primary Brand Burgundy'}
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={settings.brandColorPrimary}
                      onChange={(e) => updateSettings({ brandColorPrimary: e.target.value })}
                      className="w-9 h-9 rounded-lg border border-gold-hairline cursor-pointer"
                    />
                    <input
                      type="text"
                      value={settings.brandColorPrimary}
                      onChange={(e) => updateSettings({ brandColorPrimary: e.target.value })}
                      className="flex-1 px-3 py-2 rounded-xl border border-surface-peachMuted text-xs font-mono uppercase"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slateText-body mb-1">
                    {isAr ? 'حساب إنستغرام' : 'Instagram Handle'}
                  </label>
                  <input
                    type="text"
                    value={settings.instagramHandle}
                    onChange={(e) => updateSettings({ instagramHandle: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-surface-peachMuted text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slateText-body mb-1">
                    {isAr ? 'رقم هاتف الدعم / واتساب' : 'Support Phone / WhatsApp'}
                  </label>
                  <input
                    type="text"
                    value={settings.contactPhone}
                    onChange={(e) =>
                      updateSettings({ contactPhone: e.target.value, whatsappNumber: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-surface-peachMuted text-xs font-mono"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* Tax rate configuration */}
              <div className="p-4 rounded-xl bg-canvas border border-gold-hairline/60 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slateText-body">
                    {isAr ? 'تطبيق ضريبة القيمة المضافة (Tax Lines)' : 'Configurable Tax Line'}
                  </h4>
                  <p className="text-[11px] text-slateText-secondary">
                    {isAr ? 'معطلة افتراضياً (0%) وفق القوانين المعمول بها حالياً في قطر' : 'Default 0% off pursuant to current Qatar regulation'}
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.taxEnabled}
                  onChange={(e) => updateSettings({ taxEnabled: e.target.checked })}
                  className="w-5 h-5 accent-burgundy cursor-pointer"
                />
              </div>

              <button
                type="button"
                onClick={() => showToast(isAr ? 'تم حفظ وتحديث الإعدادات بنجاح' : 'Settings saved successfully')}
                className="w-full py-3 rounded-xl bg-burgundy hover:bg-burgundy-hover text-white text-xs font-bold tracking-wider uppercase transition-all shadow-md"
              >
                {isAr ? 'حفظ التعديلات' : 'Save Settings'}
              </button>
            </div>
          </div>
        )}

        {/* TAB 7: NOTIFICATIONS & TELEGRAM BOT */}
        {activeTab === 'notifications' && (
          <div className="space-y-6 animate-fadeIn max-w-3xl">
            <div>
              <h2 className="text-lg font-bold text-burgundy font-cairo">
                {isAr ? 'تنبيهات تيليغرام الفورية وإشعارات الواتساب والبريد' : 'Telegram Bot & Omnichannel Notifications'}
              </h2>
              <p className="text-xs text-slateText-secondary">
                {isAr
                  ? 'تنبيهات فورية للمالكة عند ورود أي طلب مع أزرار الإجراء السريع (تأكيد / شحن)'
                  : 'Real-time alert dispatch to Telegram Bot with inline quick-reply action buttons'}
              </p>
            </div>

            {/* Telegram Bot Simulation Card */}
            <div className="bg-white p-6 rounded-2xl border border-gold-hairline shadow-soft space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gold-hairline/60">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#0088cc]/10 text-[#0088cc] flex items-center justify-center">
                    <Send className="w-4 h-4 rtl-flip" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slateText-body">
                      {isAr ? 'بوت دار بيرغندي في تيليغرام (@BurgundyStoreBot)' : 'BURGUNDY Telegram Bot (@BurgundyStoreBot)'}
                    </h3>
                    <span className="text-[10px] text-emerald-600 font-bold">● ONLINE / WEBHOOK ACTIVE</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    const testMsg = `🔔 Test Alert: System ping at ${new Date().toLocaleTimeString()} - All payment & order rails green.`;
                    setTelegramLogs((prev) => [{ id: `tg-${Date.now()}`, text: testMsg, time: 'Just now' }, ...prev]);
                    showToast(isAr ? 'تم إرسال إشعار تجريبي عبر البوت' : 'Test alert pushed via Telegram Bot');
                  }}
                  className="px-3 py-1.5 rounded-lg bg-[#0088cc] text-white text-xs font-bold hover:bg-[#0077b5] transition-colors"
                >
                  {isAr ? 'إرسال تنبيه تجريبي' : 'Send Test Ping'}
                </button>
              </div>

              {/* Bot Simulation Logs with Quick Actions */}
              <div className="space-y-3 bg-canvas p-4 rounded-xl border border-gold-hairline/40 max-h-72 overflow-y-auto">
                {telegramLogs.map((log) => (
                  <div key={log.id} className="p-3 rounded-lg bg-white border border-gold-hairline/50 text-xs space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-slateText-secondary">
                      <span className="font-bold text-burgundy">BURGUNDY Alert</span>
                      <span>{log.time}</span>
                    </div>
                    <p className="text-slateText-body leading-relaxed">{log.text}</p>
                    {/* Quick Action Buttons for the merchant directly inside the bot */}
                    <div className="flex items-center gap-2 pt-1 border-t border-gold-hairline/30">
                      <button
                        onClick={() => handleSimulateTelegramQuickReply('QA-894210', 'ship')}
                        className="px-2.5 py-1 rounded bg-blue-50 text-blue-800 text-[11px] font-bold hover:bg-blue-100 transition-colors"
                      >
                        📦 {isAr ? 'تسليم للمندوب (Ship)' : 'Ship'}
                      </button>
                      <button
                        onClick={() => handleSimulateTelegramQuickReply('QA-894210', 'delivered')}
                        className="px-2.5 py-1 rounded bg-purple-50 text-purple-800 text-[11px] font-bold hover:bg-purple-100 transition-colors"
                      >
                        ✅ {isAr ? 'تم الاستلام (Delivered)' : 'Delivered'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* WhatsApp Cloud API & Email Info */}
            <div className="bg-white p-6 rounded-2xl border border-gold-hairline shadow-soft space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-[#25D366]" />
                  <div>
                    <h4 className="text-xs font-bold text-slateText-body">
                      WhatsApp Cloud API (Meta Official)
                    </h4>
                    <p className="text-[11px] text-slateText-secondary">
                      {isAr ? 'بوابة الواتساب السحابية المعتمدة (تحت راية الميزات Feature Flag)' : 'Official Meta Business templates behind feature flag'}
                    </p>
                  </div>
                </div>

                <input
                  type="checkbox"
                  checked={settings.whatsappCloudApiEnabled}
                  onChange={(e) => {
                    updateSettings({ whatsappCloudApiEnabled: e.target.checked });
                    showToast(isAr ? 'تم تحديث حالة واجهة واتساب' : 'WhatsApp API flag updated');
                  }}
                  className="w-5 h-5 accent-burgundy cursor-pointer"
                />
              </div>

              <div className="text-xs text-slateText-body bg-canvas-warm/40 p-3.5 rounded-xl border border-gold-hairline/50 leading-relaxed">
                <p>
                  {isAr
                    ? 'قوالب الرسائل المعتمدة في واتساب: رسالة تأكيد الطلب، إشعار قبول إيصال التحويل البنكي، ورسالة خروج الطلب مع مندوب التوصيل في قطر.'
                    : 'Pre-approved WhatsApp notification templates: Order Confirmed, Bank Receipt Verified, and Out for Delivery with courier contact.'}
                </p>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Add Product Drawer */}
      <AddProductDrawer
        isOpen={isAddDrawerOpen}
        onClose={() => setIsAddDrawerOpen(false)}
        onAddProduct={(newProd) => {
          addProduct(newProd);
          setIsAddDrawerOpen(false);
          showToast(isAr ? 'تمت إضافة القطعة بنجاح إلى المتجر المباشر' : 'Product published to live boutique!');
        }}
        lang={lang}
      />
    </div>
  );
}
