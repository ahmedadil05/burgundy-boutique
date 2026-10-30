'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Language } from '@/lib/i18n';
import { useCatalogStore } from '@/lib/catalog-store';
import { OrdersTable, OrderRow } from '@/components/admin/OrdersTable';
import { ComplaintsTable, ComplaintRow } from '@/components/admin/ComplaintsTable';
import { SalesSummaryCards } from '@/components/admin/SalesSummaryCards';
import { MobileOrdersList } from '@/components/admin/MobileOrdersList';
import { MobileProductList } from '@/components/admin/MobileProductList';
import { AddProductDrawer } from '@/components/admin/AddProductDrawer';
import { complianceConfig } from '@/config/compliance';
import {
  ShieldCheck,
  Package,
  Scale,
  Layers,
  Settings,
  Plus,
  BarChart3,
  CheckCircle2,
} from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function AdminDashboardPage() {
  const params = useParams();
  const lang = (params?.lang === 'en' ? 'en' : 'ar') as Language;
  const isAr = lang === 'ar';

  const { products, addProduct, deleteProduct, updateStock } = useCatalogStore();

  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'inventory' | 'complaints' | 'compliance'>('overview');
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [complaints, setComplaints] = useState<ComplaintRow[]>([]);
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
  const [successToast, setSuccessToast] = useState('');

  const [complianceSettings, setComplianceSettings] = useState({
    crNumber: complianceConfig.crNumber,
    licenseNumber: complianceConfig.licenseNumber,
    phone: complianceConfig.contactPhone,
    email: complianceConfig.contactEmail,
  });

  useEffect(() => {
    try {
      const savedOrders = JSON.parse(localStorage.getItem('kandaka_orders') || '[]');
      if (savedOrders.length > 0) {
        setOrders(savedOrders);
      } else {
        // Seed initial orders for Qatar compliance preview
        const initialSeed: OrderRow[] = [
          {
            orderId: 'QA-894210',
            orderDate: new Date().toISOString(),
            customer: {
              name: 'فاطمة الكواري',
              phone: '+974 5500 0000',
              email: 'fatima@example.qa',
              shippingAddress: {
                zone: '66',
                street: '12',
                building: '45',
                municipality: 'الظعاين (Al Daayen)',
              },
            },
            items: [
              {
                id: 'prod-001',
                slug: 'royal-swiss-voile-toub',
                title: { ar: 'ثوب سويسري ملكي مطرز بالذهب', en: 'Royal Swiss Voile Toub' },
                priceQAR: 1450,
                quantity: 1,
                size: 'Free Size (4.5m)',
                color: 'دراق ناعم',
                image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&q=80',
              },
            ],
            totals: { subtotal: 1450, shipping: 0, total: 1450 },
            paymentMethod: 'fawran',
            status: 'confirmed',
          },
          {
            orderId: 'QA-894208',
            orderDate: new Date(Date.now() - 86400000).toISOString(),
            customer: {
              name: 'د. مريم النعيمي',
              phone: '+974 6611 2233',
              email: 'maryam@example.qa',
              shippingAddress: {
                zone: '55',
                street: '22',
                building: '10',
                municipality: 'الدوحة (Doha)',
              },
            },
            items: [
              {
                id: 'prod-002',
                slug: 'sheikha-pure-silk-daraa',
                title: { ar: 'دراعة الشيخة حرير طبيعي', en: 'Sheikha Pure Silk Daraa' },
                priceQAR: 850,
                quantity: 1,
                size: 'M',
                color: 'عاجي كريمي',
                image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80',
              },
            ],
            totals: { subtotal: 850, shipping: 0, total: 850 },
            paymentMethod: 'qpay',
            status: 'delivered',
          },
        ];
        setOrders(initialSeed);
        localStorage.setItem('kandaka_orders', JSON.stringify(initialSeed));
      }

      const savedComplaints = JSON.parse(localStorage.getItem('kandaka_complaints') || '[]');
      if (savedComplaints.length > 0) {
        setComplaints(savedComplaints);
      } else {
        const seedComplaints: ComplaintRow[] = [
          {
            ticketId: 'QA-COMP-492104',
            fullName: 'سارة المهدي',
            complaintType: isAr ? 'استفسار عن المقاس' : 'Sizing inquiry',
            message: isAr
              ? 'أود التأكد من طول ثوب الفوال السويسري قبل حضور مناسبة نهاية الأسبوع.'
              : 'Checking exact voile length for an upcoming celebration.',
            status: 'pending',
            createdAt: new Date().toISOString(),
          },
        ];
        setComplaints(seedComplaints);
        localStorage.setItem('kandaka_complaints', JSON.stringify(seedComplaints));
      }
    } catch {}
  }, [isAr]);

  const handleUpdateOrderStatus = (orderId: string, status: OrderRow['status']) => {
    setOrders((prev) => {
      const updated = prev.map((o) => (o.orderId === orderId ? { ...o, status } : o));
      try {
        localStorage.setItem('kandaka_orders', JSON.stringify(updated));
      } catch {}
      return updated;
    });
    showToast(isAr ? 'تم تحديث حالة الطلب بنجاح' : 'Order status updated successfully');
  };

  const handleResolveComplaint = (ticketId: string) => {
    setComplaints((prev) => {
      const updated = prev.map((c) => (c.ticketId === ticketId ? { ...c, status: 'resolved' as const } : c));
      try {
        localStorage.setItem('kandaka_complaints', JSON.stringify(updated));
      } catch {}
      return updated;
    });
    showToast(isAr ? 'تم حل الشكوى وإغلاق التذكرة' : 'Complaint marked as resolved');
  };

  const handleCreateProduct = (newProductInput: Parameters<typeof addProduct>[0]) => {
    const created = addProduct(newProductInput);
    showToast(isAr ? `تمت إضافة "${created.title.ar}" إلى المتجر!` : `"${created.title.en}" published to shop!`);
  };

  const handleDeleteProduct = (id: string) => {
    deleteProduct(id);
    showToast(isAr ? 'تم حذف القطعة من المتجر' : 'Product removed from catalog');
  };

  const showToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(''), 3500);
  };

  return (
    <div className="min-h-screen bg-cream py-6 sm:py-10 px-3 sm:px-6 lg:px-8 pb-24">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        {/* Top Header & Mobile Quick Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 sm:pb-6 border-b border-peach-soft">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blush-surface text-coral-warm mb-2 border border-peach-soft">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{isAr ? 'لوحة تحكم المتجر المرخص — قطر' : 'Qatar Licensed Merchant Portal'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-cocoa-dark font-cairo">
              {isAr ? 'إدارة متجر كنداكة' : 'Kandaka Store Administration'}
            </h1>
            <p className="text-xs text-cocoa-muted mt-0.5">
              {isAr
                ? 'إدارة الطلبات، المخزون، الصور، وشكاوى وزارة التجارة والصناعة (MOCI)'
                : 'Manage orders, inventory, photos & Qatar MOCI consumer feedback'}
            </p>
          </div>

          {/* Primary Action Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAddDrawerOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-coral-warm hover:bg-coral-warm/95 text-white font-bold text-xs sm:text-sm shadow-md transition-transform active:scale-[0.98]"
            >
              <Plus className="w-4 h-4" />
              <span>{isAr ? 'إضافة ثوب جديد' : 'Add New Garment'}</span>
            </button>
          </div>
        </div>

        {/* Global Sales Summary Metrics */}
        <SalesSummaryCards orders={orders} lang={lang} />

        {/* Tab Navigation - Mobile Horizontally Scrollable Pills */}
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar border-b border-peach-soft text-xs font-bold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2.5 rounded-2xl whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'overview'
                ? 'bg-coral-warm text-white shadow-xs'
                : 'bg-white/80 text-cocoa-dark hover:bg-blush-surface'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>{isAr ? 'نظرة عامة' : 'Overview'}</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2.5 rounded-2xl whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'bg-coral-warm text-white shadow-xs'
                : 'bg-white/80 text-cocoa-dark hover:bg-blush-surface'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>{isAr ? `الطلبات (${orders.length})` : `Orders (${orders.length})`}</span>
          </button>

          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-4 py-2.5 rounded-2xl whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'inventory'
                ? 'bg-coral-warm text-white shadow-xs'
                : 'bg-white/80 text-cocoa-dark hover:bg-blush-surface'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>{isAr ? `المخزون (${products.length})` : `Inventory (${products.length})`}</span>
          </button>

          <button
            onClick={() => setActiveTab('complaints')}
            className={`px-4 py-2.5 rounded-2xl whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'complaints'
                ? 'bg-coral-warm text-white shadow-xs'
                : 'bg-white/80 text-cocoa-dark hover:bg-blush-surface'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>{isAr ? `الشكاوى (${complaints.length})` : `Complaints (${complaints.length})`}</span>
          </button>

          <button
            onClick={() => setActiveTab('compliance')}
            className={`px-4 py-2.5 rounded-2xl whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'compliance'
                ? 'bg-coral-warm text-white shadow-xs'
                : 'bg-white/80 text-cocoa-dark hover:bg-blush-surface'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>{isAr ? 'بيانات الترخيص' : 'Licenses'}</span>
          </button>
        </div>

        {/* Tab Contents */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-cocoa-dark font-cairo flex items-center gap-2">
                <Package className="w-4 h-4 text-coral-warm" />
                <span>{isAr ? 'آخر الطلبات الواردة' : 'Recent Customer Orders'}</span>
              </h3>
              <button
                onClick={() => setActiveTab('orders')}
                className="text-xs font-bold text-coral-warm hover:underline"
              >
                {isAr ? 'عرض جميع الطلبات' : 'View all orders'}
              </button>
            </div>

            {/* Mobile Cards for touch devices */}
            <MobileOrdersList
              orders={orders.slice(0, 5)}
              onUpdateStatus={handleUpdateOrderStatus}
              lang={lang}
            />
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-4">
            {/* Mobile Card list on phones, Table on desktop */}
            <div className="block lg:hidden">
              <MobileOrdersList
                orders={orders}
                onUpdateStatus={handleUpdateOrderStatus}
                lang={lang}
              />
            </div>
            <div className="hidden lg:block">
              <OrdersTable orders={orders} onUpdateStatus={handleUpdateOrderStatus} lang={lang} />
            </div>
          </div>
        )}

        {activeTab === 'inventory' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2">
              <p className="text-xs text-cocoa-muted">
                {isAr
                  ? 'يمكنك تعديل المخزون مباشرة، أو حذف القطع غير المتوفرة، أو إضافة قطع جديدة عبر زر الإضافة'
                  : 'Adjust stock directly, delete discontinued pieces, or add garments via the Add button'}
              </p>
              <button
                onClick={() => setIsAddDrawerOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-coral-warm text-white text-xs font-bold shadow-2xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{isAr ? 'قطعة جديدة' : 'New Piece'}</span>
              </button>
            </div>

            <MobileProductList
              products={products}
              onDeleteProduct={handleDeleteProduct}
              onUpdateStock={updateStock}
              lang={lang}
            />
          </div>
        )}

        {activeTab === 'complaints' && (
          <ComplaintsTable complaints={complaints} onResolve={handleResolveComplaint} lang={lang} />
        )}

        {activeTab === 'compliance' && (
          <div className="bg-white/95 rounded-3xl p-5 sm:p-8 border border-peach-soft shadow-xs space-y-6 max-w-2xl">
            <h3 className="font-bold text-base text-cocoa-dark font-cairo flex items-center gap-2 pb-3 border-b border-peach-soft">
              <ShieldCheck className="w-5 h-5 text-coral-warm" />
              <span>{isAr ? 'تعديل بيانات السجل التجاري ورخصة المتجر' : 'Edit Qatar Registration & Licenses'}</span>
            </h3>

            <div className="space-y-4">
              <Input
                label={isAr ? 'رقم السجل التجاري (Commercial Registration - CR) *' : 'CR Number *'}
                value={complianceSettings.crNumber}
                onChange={(e) => setComplianceSettings({ ...complianceSettings, crNumber: e.target.value })}
              />
              <Input
                label={isAr ? 'رقم رخصة التجارة الإلكترونية (E-Com License) *' : 'E-Commerce License Number *'}
                value={complianceSettings.licenseNumber}
                onChange={(e) => setComplianceSettings({ ...complianceSettings, licenseNumber: e.target.value })}
              />
              <Input
                label={isAr ? 'هاتف خدمة العملاء الرسمي *' : 'Support Hotline *'}
                value={complianceSettings.phone}
                onChange={(e) => setComplianceSettings({ ...complianceSettings, phone: e.target.value })}
              />
              <Input
                label={isAr ? 'البريد الإلكتروني للشكاوى والفواتير *' : 'Legal & Complaints Email *'}
                value={complianceSettings.email}
                onChange={(e) => setComplianceSettings({ ...complianceSettings, email: e.target.value })}
              />
            </div>

            <Button
              variant="primary"
              onClick={() => showToast(isAr ? 'تم حفظ إعدادات الترخيص وتحديث الفوتر بنجاح!' : 'Compliance settings saved successfully!')}
            >
              {isAr ? 'حفظ إعدادات الترخيص' : 'Save Compliance Settings'}
            </Button>
          </div>
        )}
      </div>

      {/* Slide-over Product Creation Drawer */}
      <AddProductDrawer
        isOpen={isAddDrawerOpen}
        onClose={() => setIsAddDrawerOpen(false)}
        onAddProduct={handleCreateProduct}
        lang={lang}
      />

      {/* Floating Action Button (FAB) on Mobile Screens */}
      <div className="fixed bottom-6 end-6 z-40 sm:hidden">
        <button
          onClick={() => setIsAddDrawerOpen(true)}
          className="w-14 h-14 rounded-full bg-coral-warm text-white shadow-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
          aria-label={isAr ? 'إضافة ثوب جديد' : 'Add new garment'}
        >
          <Plus className="w-7 h-7" />
        </button>
      </div>

      {/* Floating Toast Notification */}
      {successToast && (
        <div className="fixed bottom-6 start-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-2xl bg-cocoa-dark text-white text-xs font-bold shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{successToast}</span>
        </div>
      )}
    </div>
  );
}
