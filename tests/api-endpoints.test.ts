import { describe, it, expect } from 'vitest';
import { POST as createOrderRoute } from '../src/app/api/orders/route';
import { GET as getOrderRoute } from '../src/app/api/orders/[orderNumber]/route';
import { GET as getProductsRoute } from '../src/app/api/products/route';
import { NextRequest } from 'next/server';

describe('Server API Endpoints', () => {
  it('GET /api/products returns 3NF normalized catalog, categories and fabrics', async () => {
    const req = new NextRequest('http://localhost:3000/api/products');
    const res = await getProductsRoute(req);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.success).toBe(true);
    expect(data.count).toBeGreaterThan(0);
    expect(data.categories.length).toBeGreaterThanOrEqual(4);
    expect(data.fabrics.length).toBeGreaterThanOrEqual(4);
    expect(data.products[0].variants).toBeDefined();
  });

  it('POST /api/orders rejects incomplete payloads with descriptive 400 errors', async () => {
    // Missing customer phone
    const req = new NextRequest('http://localhost:3000/api/orders', {
      method: 'POST',
      body: JSON.stringify({
        customer: { name: 'Al-Maha', municipality: 'Doha', addressLine: 'St 12' },
        items: [{ productId: 'prod-001', quantity: 1, unitPriceQAR: 1000 }],
        paymentMethod: 'card',
      }),
    });
    const res = await createOrderRoute(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toContain('phone');
  });

  it('POST /api/orders creates order and GET /api/orders/[orderNumber] retrieves sanitized tracking', async () => {
    const createReq = new NextRequest('http://localhost:3000/api/orders', {
      method: 'POST',
      body: JSON.stringify({
        customer: {
          name: 'Nouf Al-Sulaiti',
          phone: '+974 7788 9900',
          municipality: 'Al Wakrah',
          addressLine: 'Ezdan Oasis 4',
        },
        items: [
          {
            productId: 'prod-001',
            quantity: 1,
            unitPriceQAR: 1450,
            sizeCode: 'TOUB_STD',
          },
        ],
        paymentMethod: 'fawran',
      }),
    });

    const createRes = await createOrderRoute(createReq);
    expect(createRes.status).toBe(201);
    const createData = await createRes.json();
    expect(createData.success).toBe(true);
    expect(createData.orderNumber).toMatch(/^BUR-2026-\d{4}$/);

    // Now test public tracking GET
    const trackReq = new NextRequest(`http://localhost:3000/api/orders/${createData.orderNumber}`);
    const trackRes = await getOrderRoute(trackReq, {
      params: Promise.resolve({ orderNumber: createData.orderNumber }),
    });

    expect(trackRes.status).toBe(200);
    const trackData = await trackRes.json();
    expect(trackData.success).toBe(true);
    expect(trackData.orderNumber).toBe(createData.orderNumber);
    expect(trackData.customer.name).toBe('Nouf Al-Sulaiti');
    // Verify phone is masked for privacy
    expect(trackData.customer.maskedPhone).toContain('****');
    expect(trackData.items.length).toBe(1);
  });
});
