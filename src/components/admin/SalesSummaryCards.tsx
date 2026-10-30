'use client';

import React from 'react';
import { Language } from '../../lib/i18n';
import { formatPrice } from '../../lib/currency';
import { OrderRow } from './OrdersTable';
import {
  TrendingUp,
  ShoppingBag,
  CreditCard,
  CheckCircle2,
  Clock,
  Truck,
  DollarSign,
  Smartphone,
  Banknote,
} from 'lucide-react';

export interface SalesKPIs {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  rails: {
    fawran: number;
    qpay: number;
    card: number;
    cod: number;
  };
  byStatus: {
    confirmed: number;
    processing: number;
    shipped: number;
    delivered: number;
  };
}

export function computeSalesKPIs(orders: OrderRow[]): SalesKPIs {
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totals?.total || 0), 0);
  const averageOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

  const rails = {
    fawran: 0,
    qpay: 0,
    card: 0,
    cod: 0,
  };

  const byStatus = {
    confirmed: 0,
    processing: 0,
    shipped: 0,
    delivered: 0,
  };

  orders.forEach((o) => {
    if (o.paymentMethod in rails) {
      rails[o.paymentMethod as keyof typeof rails]++;
    }
    if (o.status in byStatus) {
      byStatus[o.status as keyof typeof byStatus]++;
    }
  });

  return {
    totalRevenue,
    totalOrders,
    averageOrderValue,
    rails,
    byStatus,
  };
}

export function SalesSummaryCards({
  orders,
  lang = 'ar',
}: {
  orders: OrderRow[];
  lang?: Language;
}) {
  const isAr = lang === 'ar';
  const kpis = computeSalesKPIs(orders);

  return (
    <div className="space-y-4">
      {/* Primary KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {/* Total Revenue */}
        <div className="col-span-2 md:col-span-1 bg-gradient-to-br from-blush-surface to-peach-soft/30 rounded-3xl p-5 border border-peach-soft shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-cocoa-muted font-cairo">
              {isAr ? 'إجمالي المبيعات' : 'Total Revenue'}
            </span>
            <div className="w-9 h-9 rounded-2xl bg-coral-warm/15 text-coral-warm flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl md:text-3xl font-extrabold text-cocoa-dark font-playfair tracking-tight">
              {formatPrice(kpis.totalRevenue, 'QAR', lang)}
            </div>
            <p className="text-[11px] text-cocoa-muted mt-1">
              {isAr ? 'صافي المبيعات لجميع الطلبات' : 'Net sales across all orders'}
            </p>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white/95 rounded-3xl p-5 border border-peach-soft shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-cocoa-muted font-cairo">
              {isAr ? 'عدد الطلبات' : 'Total Orders'}
            </span>
            <div className="w-9 h-9 rounded-2xl bg-peach-deep/20 text-peach-deep flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl md:text-3xl font-extrabold text-cocoa-dark font-cairo">
              {kpis.totalOrders}
            </div>
            <p className="text-[11px] text-cocoa-muted mt-1">
              {isAr ? `${kpis.byStatus.delivered} تم تسليمها` : `${kpis.byStatus.delivered} delivered`}
            </p>
          </div>
        </div>

        {/* Average Order Value */}
        <div className="bg-white/95 rounded-3xl p-5 border border-peach-soft shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-cocoa-muted font-cairo">
              {isAr ? 'متوسط قيمة الطلب' : 'Average Order'}
            </span>
            <div className="w-9 h-9 rounded-2xl bg-amber-500/15 text-amber-600 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl md:text-3xl font-extrabold text-cocoa-dark font-playfair">
              {formatPrice(kpis.averageOrderValue, 'QAR', lang)}
            </div>
            <p className="text-[11px] text-cocoa-muted mt-1">
              {isAr ? 'لكل عميلة' : 'Per customer'}
            </p>
          </div>
        </div>
      </div>

      {/* Qatar Payment Rails Distribution Bar */}
      <div className="bg-white/90 rounded-3xl p-4 md:p-5 border border-peach-soft shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-cocoa-dark font-cairo flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-coral-warm" />
            <span>{isAr ? 'توزيع بوابات الدفع القطرية' : 'Qatar Payment Rails Distribution'}</span>
          </h4>
          <span className="text-[10px] text-cocoa-muted uppercase tracking-wider font-semibold">
            {isAr ? 'مطابق لتعليمات المصرف المركزي' : 'QCB Compliant'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {/* Fawran */}
          <div className="p-3 rounded-2xl bg-cream-50 border border-peach-soft/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                <Smartphone className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-xs font-bold text-cocoa-dark font-cairo">
                  {isAr ? 'فوران' : 'Fawran'}
                </span>
                <span className="text-[10px] text-cocoa-muted font-mono">QCB Instant</span>
              </div>
            </div>
            <span className="text-sm font-extrabold text-cocoa-dark bg-white px-2 py-0.5 rounded-lg border border-peach-soft/40">
              {kpis.rails.fawran}
            </span>
          </div>

          {/* QPay / NAPS */}
          <div className="p-3 rounded-2xl bg-cream-50 border border-peach-soft/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                <CreditCard className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-xs font-bold text-cocoa-dark">QPay / NAPS</span>
                <span className="text-[10px] text-cocoa-muted">Debit Card</span>
              </div>
            </div>
            <span className="text-sm font-extrabold text-cocoa-dark bg-white px-2 py-0.5 rounded-lg border border-peach-soft/40">
              {kpis.rails.qpay}
            </span>
          </div>

          {/* Card */}
          <div className="p-3 rounded-2xl bg-cream-50 border border-peach-soft/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <CreditCard className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-xs font-bold text-cocoa-dark font-cairo">
                  {isAr ? 'بطاقة ائتمان' : 'Card'}
                </span>
                <span className="text-[10px] text-cocoa-muted">Visa / MC</span>
              </div>
            </div>
            <span className="text-sm font-extrabold text-cocoa-dark bg-white px-2 py-0.5 rounded-lg border border-peach-soft/40">
              {kpis.rails.card}
            </span>
          </div>

          {/* COD */}
          <div className="p-3 rounded-2xl bg-cream-50 border border-peach-soft/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <Banknote className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-xs font-bold text-cocoa-dark font-cairo">
                  {isAr ? 'عند الاستلام' : 'COD'}
                </span>
                <span className="text-[10px] text-cocoa-muted">Qatar Cash</span>
              </div>
            </div>
            <span className="text-sm font-extrabold text-cocoa-dark bg-white px-2 py-0.5 rounded-lg border border-peach-soft/40">
              {kpis.rails.cod}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
