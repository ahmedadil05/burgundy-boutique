import { describe, it, expect } from 'vitest';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { OrdersTable } from '../src/components/admin/OrdersTable';
import { ComplaintsTable } from '../src/components/admin/ComplaintsTable';
import { InventoryManager } from '../src/components/admin/InventoryManager';
import { products } from '../src/data/products';

describe('Admin Dashboard Components', () => {
  it('renders OrdersTable with orders and payment rails', () => {
    const mockOrders = [
      {
        orderId: 'QA-554120',
        orderDate: '2026-10-30T12:00:00Z',
        customer: { name: 'Maryam Al-Thani', phone: '+974 5511 2233' },
        totals: { total: 1450 },
        paymentMethod: 'fawran' as const,
        status: 'confirmed' as const,
      },
    ];

    const html = renderToString(<OrdersTable orders={mockOrders} lang="ar" />);
    expect(html).toContain('QA-554120');
    expect(html).toContain('Maryam Al-Thani');
    expect(html).toContain('FAWRAN');
  });

  it('renders ComplaintsTable with ticket ID and message', () => {
    const mockComplaints = [
      {
        ticketId: 'QA-COMP-789012',
        fullName: 'Fatima Al-Kuwari',
        complaintType: 'sizing',
        message: 'Need advice on toub drape length',
        status: 'pending',
        createdAt: '2026-10-30T10:00:00Z',
      },
    ];

    const html = renderToString(<ComplaintsTable complaints={mockComplaints} lang="ar" />);
    expect(html).toContain('QA-COMP-789012');
    expect(html).toContain('Fatima Al-Kuwari');
  });

  it('renders InventoryManager with product list and stock counts', () => {
    const html = renderToString(<InventoryManager initialProducts={products} lang="ar" />);
    expect(html).toContain(products[0].title.ar);
    expect(html).toContain('المخزون');
  });
});
