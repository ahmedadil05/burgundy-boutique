import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { SalesSummaryCards, computeSalesKPIs } from '../src/components/admin/SalesSummaryCards';
import { MobileOrdersList } from '../src/components/admin/MobileOrdersList';
import { OrderRow } from '../src/components/admin/OrdersTable';

describe('SalesSummaryCards Component & KPI Calculation', () => {
  const sampleOrders: OrderRow[] = [
    {
      orderId: 'QA-1001',
      orderDate: '2026-10-30T10:00:00Z',
      customer: { name: 'Aisha Al-Kuwari', phone: '+974 5500 1122' },
      items: [
        {
          id: 'prod-001',
          slug: 'royal-swiss-voile-toub',
          title: { ar: 'ثوب سويسري', en: 'Swiss Toub' },
          priceQAR: 1450,
          quantity: 1,
          size: 'Free Size',
          color: 'Soft Peach',
          image: '/img1.jpg',
        },
      ],
      totals: { subtotal: 1450, shipping: 0, total: 1450 },
      paymentMethod: 'fawran',
      status: 'confirmed',
    },
    {
      orderId: 'QA-1002',
      orderDate: '2026-10-30T11:00:00Z',
      customer: { name: 'Noor Al-Sulaiti', phone: '+974 3300 4455' },
      items: [
        {
          id: 'prod-002',
          slug: 'bridal-gold-zari-toub',
          title: { ar: 'ثوب عرائسي', en: 'Bridal Toub' },
          priceQAR: 2850,
          quantity: 1,
          size: 'Free Size',
          color: 'Burgundy',
          image: '/img2.jpg',
        },
      ],
      totals: { subtotal: 2850, shipping: 0, total: 2850 },
      paymentMethod: 'qpay',
      status: 'shipped',
    },
  ];

  it('correctly calculates total revenue, order count, AOV and rail distribution', () => {
    const kpis = computeSalesKPIs(sampleOrders);
    expect(kpis.totalRevenue).toBe(4300);
    expect(kpis.totalOrders).toBe(2);
    expect(kpis.averageOrderValue).toBe(2150);
    expect(kpis.rails.fawran).toBe(1);
    expect(kpis.rails.qpay).toBe(1);
    expect(kpis.rails.card).toBe(0);
    expect(kpis.byStatus.confirmed).toBe(1);
    expect(kpis.byStatus.shipped).toBe(1);
  });

  it('renders KPI summary cards markup with revenue and payment rail counts', () => {
    const html = renderToString(<SalesSummaryCards orders={sampleOrders} lang="ar" />);
    expect(html).toContain('4,300'); // Total revenue formatted
    expect(html).toContain('2,150'); // Average order value
    expect(html).toContain('فوران'); // Fawran label in Arabic
    expect(html).toContain('QPay / NAPS');
  });
});

describe('MobileOrdersList Component', () => {
  const sampleOrders: OrderRow[] = [
    {
      orderId: 'QA-1001',
      orderDate: '2026-10-30T10:00:00Z',
      customer: {
        name: 'Aisha Al-Kuwari',
        phone: '+974 5500 1122',
        email: 'aisha@example.com',
        shippingAddress: {
          zone: '66',
          street: '12',
          building: '45',
          municipality: 'Al Daayen',
        },
      },
      items: [
        {
          id: 'prod-001',
          slug: 'royal-swiss-voile-toub',
          title: { ar: 'ثوب سويسري ملكي', en: 'Royal Swiss Toub' },
          priceQAR: 1450,
          quantity: 1,
          size: 'Free Size',
          color: 'Soft Peach',
          image: '/img1.jpg',
        },
      ],
      totals: { subtotal: 1450, shipping: 0, total: 1450 },
      paymentMethod: 'fawran',
      status: 'confirmed',
    },
  ];

  it('renders order card with customer phone link, address details and payment badge', () => {
    const handleStatusUpdate = vi.fn();
    const html = renderToString(
      <MobileOrdersList
        orders={sampleOrders}
        lang="ar"
        onUpdateStatus={handleStatusUpdate}
      />
    );

    expect(html).toContain('QA-1001');
    expect(html).toContain('Aisha Al-Kuwari');
    expect(html).toContain('tel:+974 5500 1122');
    expect(html).toContain('66'); // Zone
    expect(html).toContain('12'); // Street
    expect(html).toContain('45'); // Building
    expect(html).toContain('FAWRAN');
    expect(html).toContain('1,450');
  });
});
