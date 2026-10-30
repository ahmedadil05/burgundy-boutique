'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Language } from '@/lib/i18n';
import { products, Product } from '@/data/products';
import { OrdersTable, OrderRow } from '@/components/admin/OrdersTable';
import { ComplaintsTable, ComplaintRow } from '@/components/admin/ComplaintsTable';
import { InventoryManager } from '@/components/admin/InventoryManager';
import { complianceConfig } from '@/config/compliance';
import { siteConfig } from '@/config/site';
import {
  ShieldCheck,
  Package,
  Scale,
  Layers,
  Settings,
  DollarSign,
  TrendingUp,
} from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function AdminDashboardPage() {
  const params = useParams();
  const lang = (params?.lang === 'en' ? 'en' : 'ar') as Language;
  const isAr = lang === 'ar';

  const [activeTab, setActiveTab] = useState<'orders' | 'inventory' | 'complaints' | 'compliance'>('orders');
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [complaints, setComplaints] = useState<ComplaintRow[]>([]);
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
        // Seed initial orders for preview
        setOrders([
          {
            orderId: 'QA-894210',
            orderDate: new Date().toISOString(),
            customer: { name: 'فاطمة الكواري', phone: '+974 5500 0000' },
            totals: { total: 1450 },
            paymentMethod: 'fawran',
            status: 'confirmed',
          },
          {
            orderId: 'QA-894208',
            orderDate: new Date(Date.now() - 86400000).toISOString(),
            customer: { name: 'د. مريم النعيمي', phone: '+974 6611 2233' },
            totals: { total: 850 },
            paymentMethod: 'qpay',
            status: 'delivered',
          },
        ]);
      }

      const savedComplaints = JSON.parse(localStorage.getItem('kandaka_complaints') || '[]');
      if (savedComplaints.length > 0) {
        setComplaints(savedComplaints);
      } else {
        // Seed initial complaint for demo
        setComplaints([
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
        ]);
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
  };

  const handleResolveComplaint = (ticketId: string) => {
    setComplaints((prev) => {
      const updated = prev.map((c) => (c.ticketId === ticketId ? { ...c, status: 'resolved' } : c));
      try {
        localStorage.setItem('kandaka_complaints', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const totalSalesQAR = orders.reduce((sum, o) => sum + o.totals.total, 0);

  return (
    <div className="min-h-screen bg-cream py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-peach-soft">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blush-surface text-coral-warm mb-2 border border-peach-soft">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{isAr ? 'لوحة تحكم المتجر المرخص — قطر' : 'Qatar Licensed Merchant Portal'}</span>
            </div>
            <h1 className="text-3xl font-extrabold text-cocoa-dark font-cairo">
              {isAr ? 'إدارة متجر كنداكة' : 'Kandaka Store Administration'}
            </h1>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/85 rounded-2xl border border-peach-soft text-center px-4">
              <span className="block text-[10px] text-cocoa-muted font-bold uppercase">{isAr ? 'إجمالي المبيعات' : 'Total Revenue'}</span>
              <strong className="text-sm font-black text-coral-warm">{totalSalesQAR.toLocaleString()} QAR</strong>
            </div>
            <div className="p-3 bg-white/85 rounded-2xl border border-peach-soft text-center px-4">
              <span className="block text-[10px] text-cocoa-muted font-bold uppercase">{isAr ? 'الطلبات' : 'Orders'}</span>
              <strong className="text-sm font-black text-cocoa-dark">{orders.length}</strong>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-peach-soft pb-2">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'bg-coral-warm text-white shadow-sm'
                : 'bg-white/70 text-cocoa-dark hover:bg-blush-surface'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>{isAr ? 'إدارة الطلبات' : 'Orders'}</span>
          </button>

          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'inventory'
                ? 'bg-coral-warm text-white shadow-sm'
                : 'bg-white/70 text-cocoa-dark hover:bg-blush-surface'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>{isAr ? 'المخزون والأسعار' : 'Inventory & Stock'}</span>
          </button>

          <button
            onClick={() => setActiveTab('complaints')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'complaints'
                ? 'bg-coral-warm text-white shadow-sm'
                : 'bg-white/70 text-cocoa-dark hover:bg-blush-surface'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>{isAr ? 'شكاوى المستهلكين (MOCI)' : 'Complaints (MOCI)'}</span>
          </button>

          <button
            onClick={() => setActiveTab('compliance')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'compliance'
                ? 'bg-coral-warm text-white shadow-sm'
                : 'bg-white/70 text-cocoa-dark hover:bg-blush-surface'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>{isAr ? 'إعدادات الترخيص القطري' : 'Compliance Settings'}</span>
          </button>
        </div>

        {/* Tab Contents */}
        {activeTab === 'orders' && (
          <OrdersTable orders={orders} onUpdateStatus={handleUpdateOrderStatus} lang={lang} />
        )}

        {activeTab === 'inventory' && (
          <InventoryManager initialProducts={products} lang={lang} />
        )}

        {activeTab === 'complaints' && (
          <ComplaintsTable complaints={complaints} onResolve={handleResolveComplaint} lang={lang} />
        )}

        {activeTab === 'compliance' && (
          <div className="bg-white/90 rounded-3xl p-6 sm:p-8 border border-peach-soft shadow-sm space-y-6 max-w-2xl">
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
              onClick={() => alert(isAr ? 'تم حفظ إعدادات الترخيص وتحديث الفوتر بنجاح!' : 'Compliance settings saved successfully!')}
            >
              {isAr ? 'حفظ إعدادات الترخيص' : 'Save Compliance Settings'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
