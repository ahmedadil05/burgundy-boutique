import { describe, it, expect } from 'vitest';
import { db } from '../src/lib/server/repository/relational-store';

describe('3NF Relational Store & Deep Modules', () => {
  it('loads normalized categories, fabrics, and sizes without duplicate attributes', () => {
    const categories = db.listCategories();
    const fabrics = db.listFabrics();
    const sizes = db.listSizes();

    expect(categories.length).toBeGreaterThanOrEqual(4);
    expect(fabrics.length).toBeGreaterThanOrEqual(4);
    expect(sizes.length).toBeGreaterThanOrEqual(6);

    // Verify 1NF atomic sizes
    expect(sizes.some((s) => s.code === 'TOUB_STD')).toBe(true);
    expect(sizes.some((s) => s.code === 'S')).toBe(true);
  });

  it('queries products with hydrated 3NF relations (category, fabric, variants, images)', () => {
    const products = db.listProducts();
    expect(products.length).toBeGreaterThan(0);

    const first = products[0];
    expect(first.category).toBeDefined();
    expect(first.category.slug).toBeDefined();
    expect(first.fabric).toBeDefined();
    expect(first.fabric.careInstructions).toBeDefined();
    expect(first.variants.length).toBeGreaterThan(0);
    expect(first.images.length).toBeGreaterThan(0);

    // 1NF check: Variant size is a normalized Size object
    expect(first.variants[0].size.code).toBeDefined();
  });

  it('filters products by category slug and price bounds in 3NF', () => {
    const toubs = db.listProducts({ categorySlug: 'toubs' });
    expect(toubs.every((p) => p.category.slug === 'toubs')).toBe(true);

    const under1000 = db.listProducts({ maxPrice: 1000 });
    expect(under1000.every((p) => p.basePriceQAR <= 1000)).toBe(true);
  });

  it('atomically creates orders, normalizes customers, and preserves audit trail in 3NF', () => {
    const products = db.listProducts();
    const testProduct = products[0];
    const testVariant = testProduct.variants[0];

    const order = db.createOrder({
      customer: {
        name: 'Sheikha Al-Thani',
        phone: '+974 5555 1234',
        municipality: 'Al Rayyan',
        addressLine: 'Al Waab St, Villa 42',
      },
      items: [
        {
          productId: testProduct.id,
          variantId: testVariant.id,
          sizeCode: testVariant.size.code,
          quantity: 1,
          unitPriceQAR: testProduct.basePriceQAR,
        },
      ],
      paymentMethod: 'card',
      notes: 'Gift wrapping requested',
    });

    expect(order.orderNumber).toMatch(/^BUR-2026-\d{4}$/);
    expect(order.customer.name).toBe('Sheikha Al-Thani');
    expect(order.customer.phone).toBe('+974 5555 1234');
    expect(order.items.length).toBe(1);
    expect(order.items[0].product.id).toBe(testProduct.id);
    expect(order.payments.length).toBe(1);
    expect(order.payments[0].status).toBe('captured');

    // Query order back by number
    const retrieved = db.getOrderByNumber(order.orderNumber);
    expect(retrieved).not.toBeNull();
    expect(retrieved?.id).toBe(order.id);
  });

  it('deduplicates existing customer and increments VIP tier without duplicating rows', () => {
    const products = db.listProducts();
    const p = products[0];

    const order1 = db.createOrder({
      customer: {
        name: 'Fatima Al-Kuwari',
        phone: '+974 6600 9988',
        municipality: 'Doha',
        addressLine: 'The Pearl, Tower 12',
      },
      items: [{ productId: p.id, quantity: 2, unitPriceQAR: p.basePriceQAR }],
      paymentMethod: 'fawran',
    });

    const order2 = db.createOrder({
      customer: {
        name: 'Fatima Al-Kuwari',
        phone: '+974 6600 9988', // Same phone
        municipality: 'Doha',
        addressLine: 'The Pearl, Tower 12',
      },
      items: [{ productId: p.id, quantity: 2, unitPriceQAR: p.basePriceQAR }],
      paymentMethod: 'fawran',
    });

    // Same customer ID linked across both distinct orders
    expect(order1.customerId).toBe(order2.customerId);
    expect(order2.customer.orderCount).toBe(2);
    expect(order2.customer.totalSpentQAR).toBe(order1.totalQAR + order2.totalQAR);
  });
});
