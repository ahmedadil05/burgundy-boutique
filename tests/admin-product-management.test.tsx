import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { AddProductDrawer } from '../src/components/admin/AddProductDrawer';
import { MobileProductList } from '../src/components/admin/MobileProductList';
import { products } from '../src/data/products';

describe('Mobile Product Management Components', () => {
  it('renders AddProductDrawer when open with image upload and bilingual input fields', () => {
    const handleClose = vi.fn();
    const handleAdd = vi.fn();

    const html = renderToString(
      <AddProductDrawer
        isOpen={true}
        onClose={handleClose}
        onAddProduct={handleAdd}
        lang="ar"
      />
    );

    expect(html).toContain('إضافة قطعة أو ثوب جديد');
    expect(html).toContain('عنوان الثوب بالعربية');
    expect(html).toContain('اسم الثوب بالإنجليزية');
    expect(html).toContain('السعر (ر.ق)');
    expect(html).toContain('نوع القماش');
    expect(html).toContain('حفظ ونشر القطعة');
  });

  it('renders MobileProductList with touch inventory cards, stock stepper and delete trigger', () => {
    const handleDelete = vi.fn();
    const handleStockUpdate = vi.fn();

    const html = renderToString(
      <MobileProductList
        products={products.slice(0, 3)}
        lang="ar"
        onDeleteProduct={handleDelete}
        onUpdateStock={handleStockUpdate}
      />
    );

    expect(html).toContain(products[0].title.ar);
    expect(html).toContain('ر.ق');
    expect(html).toContain('المخزون:');
    expect(html).toContain('حذف');
  });
});
