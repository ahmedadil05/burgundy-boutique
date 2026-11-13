import {
  Category,
  Fabric,
  Size,
  Product,
  ProductVariant,
  ProductImage,
} from '../../domain/schema';
import { products as legacyProducts } from '../../../data/products';

export const SEED_CATEGORIES: Category[] = [
  {
    id: 'cat-toubs',
    slug: 'toubs',
    name: { ar: 'ثياب سودانية راقية', en: 'Artisanal Sudanese Toubs' },
    description: {
      ar: 'ثياب سودانية أصيلة مشغولة يدوياً بأرقى خامات الفوال والحرير السويسري',
      en: 'Authentic Sudanese toubs hand-painted on luxury Swiss voile and pure silk',
    },
    sortOrder: 1,
  },
  {
    id: 'cat-jalabiyas',
    slug: 'jalabiyas',
    name: { ar: 'جلابيات وفخامة المنزل', en: 'Luxury Jalabiyas & Loungewear' },
    description: {
      ar: 'قصات معاصرة مطرزة ومزينة بلمسات تراثية فاخرة',
      en: 'Contemporary silhouettes adorned with heritage artisan touches',
    },
    sortOrder: 2,
  },
  {
    id: 'cat-scarves',
    slug: 'scarves',
    name: { ar: 'طرح وشالات فنية', en: 'Hand-painted Silk Scarves' },
    description: {
      ar: 'شالات حريرية ناعمة مرسومة بضربات فرشاة فنية فريدة',
      en: 'Pure silk scarves featuring unique hand-painted botanical motifs',
    },
    sortOrder: 3,
  },
  {
    id: 'cat-accessories',
    slug: 'accessories',
    name: { ar: 'إكسسوارات وحلي', en: 'Artisanal Accessories' },
    description: {
      ar: 'حلي وتفاصيل راقية مستوحاة من التراث النوبي والسوداني',
      en: 'Finely crafted accents inspired by Nubian and Sudanese heritage',
    },
    sortOrder: 4,
  },
];

export const SEED_FABRICS: Fabric[] = [
  {
    id: 'fab-swiss-voile',
    slug: 'swiss-voile',
    name: { ar: 'فوال سويسري قطني 100%', en: '100% Pure Swiss Cotton Voile' },
    origin: { ar: 'منسوج في سويسرا ومطرز يدوياً في الخرطوم', en: 'Woven in Switzerland, embroidered in Khartoum' },
    careInstructions: {
      ar: 'غسيل جاف فقط. الكي على درجة حرارة متوسطة من الجهة الخلفية.',
      en: 'Dry clean only. Steam or iron on medium setting from reverse side.',
    },
  },
  {
    id: 'fab-pure-silk',
    slug: 'pure-silk',
    name: { ar: 'حرير كريب صيني طبيعي 100%', en: '100% Pure Silk Crepe de Chine' },
    origin: { ar: 'حرير مستورد، مرسوم يدوياً بألوان حية مقاومة للماء', en: 'Imported silk, hand-painted with waterproof dyes' },
    careInstructions: {
      ar: 'غسيل يدوي بماء بارد وشامبو حرير، أو غسيل جاف.',
      en: 'Hand wash cold with silk detergent or dry clean.',
    },
  },
  {
    id: 'fab-linen-cotton',
    slug: 'linen-cotton',
    name: { ar: 'كتان هندي فاخر مع قطن مصري', en: 'Luxury Indian Linen & Egyptian Cotton Blend' },
    origin: { ar: 'منسوج من خيوط الكتان الطبيعية المبردة', en: 'Woven from breathable natural linen fibers' },
    careInstructions: {
      ar: 'غسيل لطيف بدرجة حرارة 30 مئوية. الكي بالبخار وهو رطب قليلاً.',
      en: 'Gentle wash at 30°C. Steam iron while slightly damp.',
    },
  },
  {
    id: 'fab-chiffon-georgette',
    slug: 'chiffon-georgette',
    name: { ar: 'شيفون جورجيت ملكي مع أورجانزا', en: 'Royal Chiffon Georgette & Organza' },
    origin: { ar: 'طبقات خفيفة وشفافة منسوجة بمهارة إيطالية', en: 'Weightless semi-sheer layers woven with Italian finesse' },
    careInstructions: {
      ar: 'غسيل جاف فقط للحفاظ على نقاء الأورجانزا وتطريز الترتر.',
      en: 'Dry clean only to protect organza and sequin embroidery.',
    },
  },
];

export const SEED_SIZES: Size[] = [
  { id: 'size-s', code: 'S', label: { ar: 'صغير (S)', en: 'Small (S)' }, sortOrder: 1 },
  { id: 'size-m', code: 'M', label: { ar: 'متوسط (M)', en: 'Medium (M)' }, sortOrder: 2 },
  { id: 'size-l', code: 'L', label: { ar: 'كبير (L)', en: 'Large (L)' }, sortOrder: 3 },
  { id: 'size-xl', code: 'XL', label: { ar: 'كبير جداً (XL)', en: 'Extra Large (XL)' }, sortOrder: 4 },
  { id: 'size-toub-std', code: 'TOUB_STD', label: { ar: 'قياس ثوب موحد (4.5 متر)', en: 'Standard Toub (4.5m)' }, sortOrder: 5 },
  { id: 'size-custom', code: 'CUSTOM', label: { ar: 'تفصيل خاص للمقاس', en: 'Custom Bespoke Sizing' }, sortOrder: 6 },
];

export function generateNormalizedSeedData() {
  const products: Product[] = [];
  const variants: ProductVariant[] = [];
  const images: ProductImage[] = [];

  const fabricMap: Record<string, string> = {
    toubs: 'fab-swiss-voile',
    jalabiyas: 'fab-linen-cotton',
    scarves: 'fab-pure-silk',
    accessories: 'fab-chiffon-georgette',
    daraas: 'fab-swiss-voile',
    dresses: 'fab-pure-silk',
  };

  const categoryMap: Record<string, string> = {
    toubs: 'cat-toubs',
    jalabiyas: 'cat-jalabiyas',
    scarves: 'cat-scarves',
    accessories: 'cat-accessories',
    daraas: 'cat-jalabiyas',
    dresses: 'cat-toubs',
  };

  legacyProducts.forEach((p, idx) => {
    const categoryId = categoryMap[p.category] || 'cat-toubs';
    const fabricId = fabricMap[p.category] || 'fab-swiss-voile';

    products.push({
      id: p.id,
      slug: p.slug,
      title: p.title,
      subtitle: p.subtitle,
      description: p.description,
      basePriceQAR: p.priceQAR,
      originalPriceQAR: p.originalPriceQAR,
      categoryId,
      fabricId,
      badge: p.badge,
      isSample: p.isSample,
      isMadeToOrder: p.isMadeToOrder,
      leadTimeDays: p.leadTimeDays,
      isActive: true,
      features: p.features,
      createdAt: new Date(Date.now() - idx * 86400000).toISOString(),
    });

    // Variants (1NF atomic sizes)
    p.sizes.forEach((s) => {
      const sizeId = s.id === 'standard' ? 'size-toub-std' : `size-${s.id.toLowerCase()}`;
      variants.push({
        id: `var-${p.id}-${s.id}`,
        productId: p.id,
        sizeId: SEED_SIZES.find((sz) => sz.id === sizeId)?.id || 'size-toub-std',
        sku: `${p.id.toUpperCase()}-${s.id.toUpperCase()}`,
        stockCount: s.available ? 5 : 0,
        inStock: s.available,
      });
    });

    // Images
    p.images.forEach((imgUrl, imgIdx) => {
      images.push({
        id: `img-${p.id}-${imgIdx}`,
        productId: p.id,
        url: imgUrl,
        alt: p.title,
        isPrimary: imgIdx === 0,
        sortOrder: imgIdx + 1,
      });
    });
  });

  return { products, variants, images };
}
