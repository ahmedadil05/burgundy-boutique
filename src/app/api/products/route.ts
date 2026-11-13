import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/server/repository/relational-store';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const categorySlug = searchParams.get('category') || undefined;
  const fabricSlug = searchParams.get('fabric') || undefined;
  const minPriceStr = searchParams.get('minPrice');
  const maxPriceStr = searchParams.get('maxPrice');
  const searchQuery = searchParams.get('q') || undefined;

  const minPrice = minPriceStr ? parseFloat(minPriceStr) : undefined;
  const maxPrice = maxPriceStr ? parseFloat(maxPriceStr) : undefined;

  const products = db.listProducts({
    categorySlug,
    fabricSlug,
    minPrice,
    maxPrice,
    searchQuery,
  });

  return NextResponse.json({
    success: true,
    count: products.length,
    categories: db.listCategories(),
    fabrics: db.listFabrics(),
    products,
  });
}
