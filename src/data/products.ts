export interface Product {
  id: string;
  slug: string;
  title: { ar: string; en: string };
  subtitle: { ar: string; en: string };
  description: { ar: string; en: string };
  priceQAR: number;
  originalPriceQAR?: number;
  category: 'toubs' | 'jalabiyas' | 'scarves' | 'accessories' | 'daraas' | 'dresses';
  badge?: 'sample' | 'new' | 'sale' | 'soldout' | 'heritage' | 'madeToOrder';
  isSample?: boolean;
  inStock: boolean;
  stockCount: number;
  isMadeToOrder?: boolean;
  leadTimeDays?: number;
  fabric: { ar: string; en: string };
  origin: { ar: string; en: string };
  careInstructions: { ar: string; en: string };
  colors: Array<{ id: string; name: { ar: string; en: string }; hex: string }>;
  sizes: Array<{ id: string; label: string; available: boolean; measurements?: string }>;
  images: string[];
  features: Array<{ ar: string; en: string }>;
}

export const products: Product[] = [
  {
    id: 'prod-001',
    slug: 'royal-swiss-voile-toub',
    title: {
      ar: 'ثوب سويسري ملكي مطرز بالذهب والبيرغندي',
      en: 'Royal Swiss Voile Toub with Gold Work',
    },
    subtitle: {
      ar: 'عينة تجريبية: فوال سويسري قطن 100% مطرز ومرسوم يدوياً',
      en: 'Demo Sample: 100% pure Swiss cotton voile with regal hand-guided embroidery',
    },
    description: {
      ar: 'تحفة فنية سودانية أصيلة. صُنع من أجود خيوط الفوال السويسري الفاخر بملمس ناعم كالحرير، وطُرزت حواشيه وأطرافه يدوياً في ورشاتنا بالسودان بخيوط مذهبة تدوم طويلاً دون أن تفقد بريقها.',
      en: 'An authentic Sudanese masterpiece. Crafted from the finest imported Swiss cotton voile with a silk-soft drape, delicately hand-embroidered by artisan women in Khartoum.',
    },
    priceQAR: 1450,
    originalPriceQAR: 1750,
    category: 'toubs',
    badge: 'sample',
    isSample: true,
    inStock: true,
    stockCount: 8,
    isMadeToOrder: false,
    leadTimeDays: 2,
    fabric: {
      ar: 'فوال سويسري قطني 100%',
      en: '100% Pure Swiss Cotton Voile',
    },
    origin: {
      ar: 'منسوج في سويسرا ومطرز يدوياً في الخرطوم، السودان',
      en: 'Woven in Switzerland, hand-embroidered in Khartoum, Sudan',
    },
    careInstructions: {
      ar: 'غسيل جاف فقط (Dry Clean). الكي على درجة حرارة متوسطة من الجهة الخلفية لحماية التطريز.',
      en: 'Dry clean only. Steam or iron on medium setting from reverse side to preserve embroidery.',
    },
    colors: [
      { id: 'burgundy', name: { ar: 'بيرغندي ملكي', en: 'Royal Burgundy' }, hex: '#5F0F40' },
      { id: 'peach', name: { ar: 'دراق ناعم', en: 'Soft Peach' }, hex: '#FFC9A8' },
      { id: 'cream', name: { ar: 'عاجي كريمي', en: 'Ivory Cream' }, hex: '#FBFEFB' },
    ],
    sizes: [
      { id: 'free', label: 'Free Size (4.5m x 1.15m)', available: true, measurements: 'الطول: 4.5 متر | العرض: 1.15 متر' },
    ],
    images: [
      '/brand/teaser-clean.jpg',
      '/brand/burgundy-avatar.jpg',
      '/brand/teaser-post.jpg',
    ],
    features: [
      { ar: 'رسم يدوي متفرد لا يتكرر في أي قطعة أخرى', en: 'Unique one-of-a-kind brushwork' },
      { ar: 'خامات معتمدة ومقاومة لبهتان اللون', en: 'High durability tested pigments' },
      { ar: 'مرفق بحقيبة حفظ قماشية فاخرة تحمل شعار الدار', en: 'Delivered in signature dust bag' },
    ],
  },
  {
    id: 'sample-002',
    slug: 'burgundy-hand-painted-silk-toub',
    title: {
      ar: 'ثوب حرير مرسوم يدوياً بتدرجات البيرغندي',
      en: 'Hand-Painted Royal Silk Toub in Burgundy Sunset',
    },
    subtitle: {
      ar: 'عينة تجريبية: حرير طبيعي 100% برسم يدوي وتطريز أطراف خفيف',
      en: 'Demo Sample: 100% Pure Silk with artisanal hand brushwork',
    },
    description: {
      ar: 'نموذج تجريبي استعراضي للوحة الإدارة. ثوب سوداني مشغول يدوياً بخيوط حرير طبيعي وأصباغ فنية ثابتة، تم تصميمه ليتناغم مع الذوق القطري الرفيع في المناسبات والاستقبالات.',
      en: 'Demonstration sample for admin catalog preview. Hand-painted Sudanese silk toub with organic permanent pigments, crafted for celebrations in Doha.',
    },
    priceQAR: 1650,
    originalPriceQAR: 1950,
    category: 'toubs',
    badge: 'sample',
    isSample: true,
    inStock: true,
    stockCount: 4,
    isMadeToOrder: true,
    leadTimeDays: 7,
    fabric: {
      ar: 'حرير طبيعي خالص 100%',
      en: '100% Pure Natural Silk',
    },
    origin: {
      ar: 'مرسم بيرغندي - الخرطوم والدوحة، السودان',
      en: 'BURGUNDY Atelier - Khartoum, Sudan & Doha',
    },
    careInstructions: {
      ar: 'غسيل جاف فقط لحماية الألوان اليدوية والخيوط الحريرية.',
      en: 'Specialist dry clean only to preserve painted pigments and silk weave.',
    },
    colors: [
      { id: 'burgundy', name: { ar: 'بيرغندي ملكي', en: 'Royal Burgundy' }, hex: '#5F0F40' },
      { id: 'cream', name: { ar: 'كريمي عاجي', en: 'Ivory Cream' }, hex: '#FBFEFB' },
      { id: 'peach', name: { ar: 'دراق ناعم', en: 'Soft Peach' }, hex: '#FFC9A8' },
    ],
    sizes: [
      { id: 'free', label: 'Free Size (4.5m x 1.15m)', available: true, measurements: 'الطول: 4.5 متر | العرض: 1.15 متر' },
    ],
    images: [
      '/brand/teaser-clean.jpg',
      '/brand/burgundy-avatar.jpg',
      '/brand/teaser-post.jpg',
    ],
    features: [
      { ar: 'رسم يدوي متفرد لا يتكرر في أي قطعة أخرى', en: 'Unique one-of-a-kind brushwork' },
      { ar: 'خامات معتمدة ومقاومة لبهتان اللون', en: 'High durability tested pigments' },
    ],
  },
  {
    id: 'sample-003',
    slug: 'bespoke-painted-linen-jalabiya',
    title: {
      ar: 'جلابية كتان سودانية راقية برسم يدوي ناعم',
      en: 'Hand-Painted Pure Linen Sudanese Jalabiya',
    },
    subtitle: {
      ar: 'عينة تجريبية: قصة مريحة بياقة مطرزة وأكمام واسعة',
      en: 'Demo Sample: Relaxed silhouette with hand-painted cuffs',
    },
    description: {
      ar: 'عينة تجريبية. جلابية سودانية معاصرة مصممة من الكتان الطبيعي الفاخر، مزينة برسم يدوي دقيق على الياقة والأكمام بألوان مستوحاة من ظلال أوراق الشجر ونغمات البيرغندي.',
      en: 'Demo item. Contemporary Sudanese jalabiya in breathable natural linen, decorated with leaf-shadow motifs and burgundy undertones.',
    },
    priceQAR: 850,
    category: 'jalabiyas',
    badge: 'sample',
    isSample: true,
    inStock: true,
    stockCount: 3,
    isMadeToOrder: true,
    leadTimeDays: 5,
    fabric: {
      ar: 'كتان طبيعي بارد 100%',
      en: '100% Pure Cooling Linen',
    },
    origin: {
      ar: 'مرسم بيرغندي في الدوحة والسودان',
      en: 'BURGUNDY Doha Atelier & Sudan',
    },
    careInstructions: {
      ar: 'غسيل آلي على دورة الأقمشة الحساسة أو غسيل يدوي.',
      en: 'Gentle cycle machine wash or hand wash cold.',
    },
    colors: [
      { id: 'peach', name: { ar: 'خوخي باهت', en: 'Dusty Peach' }, hex: '#F3D8C7' },
      { id: 'burgundy', name: { ar: 'بيرغندي دافئ', en: 'Warm Burgundy' }, hex: '#5F0F40' },
    ],
    sizes: [
      { id: 'm', label: 'M (Length 56 in)', available: true, measurements: 'الطول: 56 إنش | الصدر: 40 إنش' },
      { id: 'l', label: 'L (Length 58 in)', available: true, measurements: 'الطول: 58 إنش | الصدر: 44 إنش' },
      { id: 'xl', label: 'XL (Length 60 in)', available: true, measurements: 'الطول: 60 إنش | الصدر: 48 إنش' },
    ],
    images: [
      '/brand/teaser-clean.jpg',
      '/brand/burgundy-avatar.jpg',
    ],
    features: [
      { ar: 'قصة انسيابية مريحة للزيارات والاستقبال', en: 'Fluid drape ideal for home hosting' },
    ],
  },
  {
    id: 'sample-004',
    slug: 'artisan-chiffon-painted-scarf',
    title: {
      ar: 'شال شيفون حريري مرسوم يدوياً',
      en: 'Artisan Hand-Painted Silk Chiffon Scarf',
    },
    subtitle: {
      ar: 'عينة تجريبية: لمسة فنية ناعمة للإطلالات اليومية والمناسبات',
      en: 'Demo Sample: Featherlight silk chiffon with botanical brushwork',
    },
    description: {
      ar: 'عينة تجريبية. شال حريري خفيف وناعم يتميز بانسيابية استثنائية ونقوش نباتية مرسومة يدوياً بدرجات الخوخ والبيرغندي والذهب.',
      en: 'Demo item. Light and airy silk chiffon scarf featuring subtle leaf shadows and warm gold highlights.',
    },
    priceQAR: 450,
    category: 'scarves',
    badge: 'sample',
    isSample: true,
    inStock: true,
    stockCount: 12,
    isMadeToOrder: false,
    leadTimeDays: 1,
    fabric: {
      ar: 'شيفون حريري نقي',
      en: 'Pure Silk Chiffon',
    },
    origin: {
      ar: 'مشغول يدوياً - الدوحة والسودان',
      en: 'Hand-painted in Doha & Sudan',
    },
    careInstructions: {
      ar: 'غسيل يدوي بماء بارد وتجفيف في الظل.',
      en: 'Hand wash cold and shade dry.',
    },
    colors: [
      { id: 'burgundy', name: { ar: 'بيرغندي كلاسيكي', en: 'Classic Burgundy' }, hex: '#5F0F40' },
      { id: 'peach', name: { ar: 'دراق شربات', en: 'Peach Sorbet' }, hex: '#FFC9A8' },
    ],
    sizes: [
      { id: 'standard', label: '200cm x 70cm', available: true, measurements: 'الطول: 200 سم | العرض: 70 سم' },
    ],
    images: [
      '/brand/teaser-clean.jpg',
      '/brand/burgundy-avatar.jpg',
    ],
    features: [
      { ar: 'حواف مبرومة ومحاكة يدوياً بدقة بالغة', en: 'Hand-rolled finished hem' },
    ],
  },
  {
    id: 'sample-005',
    slug: 'bridal-gold-painted-toub',
    title: {
      ar: 'ثوب عروس سوداني مرسوم بالذهب الخالص',
      en: 'Bridal Heritage Toub in Pure Gold Leaf',
    },
    subtitle: {
      ar: 'عينة تجريبية: قطعة نادرة للأعراس والمناسبات الكبرى',
      en: 'Demo Sample: Bespoke bridal toub with molten gold brushwork',
    },
    description: {
      ar: 'عينة تجريبية لثوب الزفاف السوداني المعاصر. حرير إيطالي طبيعي مشغول بنقوش يدوية ذهبية سائلة مع تطريز خرز دقيق عند الحواشي.',
      en: 'Bespoke bridal heirloom toub hand-painted with pure liquid gold motifs.',
    },
    priceQAR: 2850,
    category: 'toubs',
    badge: 'sample',
    isSample: true,
    inStock: true,
    stockCount: 2,
    isMadeToOrder: true,
    leadTimeDays: 14,
    fabric: {
      ar: 'حرير إيطالي طبيعي ثقيل',
      en: 'Heavy Natural Italian Silk',
    },
    origin: {
      ar: 'حياكة يدوية خاصة - الخرطوم والدوحة، السودان',
      en: 'Bespoke Bridal Atelier - Sudan & Qatar',
    },
    careInstructions: {
      ar: 'حفظ في كيس قطني وغسيل جاف تخصصي فقط.',
      en: 'Specialist bridal preservation dry clean only.',
    },
    colors: [
      { id: 'gold', name: { ar: 'ذهب عاجي', en: 'Ivory Gold' }, hex: '#D9B97A' },
      { id: 'burgundy', name: { ar: 'بيرغندي ملكي', en: 'Royal Burgundy' }, hex: '#5F0F40' },
    ],
    sizes: [
      { id: 'free', label: 'Free Size (4.7m)', available: true, measurements: 'الطول: 4.7 متر للعرائس' },
    ],
    images: [
      '/brand/teaser-clean.jpg',
      '/brand/burgundy-avatar.jpg',
      '/brand/teaser-post.jpg',
    ],
    features: [
      { ar: 'تطريز مذهب يدوي للأعراس', en: 'Bridal metallic thread and gold paint' },
    ],
  },
  {
    id: 'sample-006',
    slug: 'embroidered-cotton-daraa',
    title: {
      ar: 'دراعة سودانية قطنية بتطريز تراثي',
      en: 'Embroidered Cotton Sudanese Dara’a',
    },
    subtitle: {
      ar: 'عينة تجريبية: قطن بارد بتطريزات سودانية كلاسيكية',
      en: 'Demo Sample: Cooling cotton with heritage cross-stitch',
    },
    description: {
      ar: 'عينة تجريبية. دراعة مريحة للاستقبال والزيارات العائلية في الدوحة، مصنوعة من قطن ناعم ومطرزة يدوياً.',
      en: 'Comfortable cotton daraa with authentic Sudanese embroidery.',
    },
    priceQAR: 750,
    category: 'daraas',
    badge: 'sample',
    isSample: true,
    inStock: true,
    stockCount: 5,
    isMadeToOrder: false,
    leadTimeDays: 2,
    fabric: {
      ar: 'قطن طبيعي 100%',
      en: '100% Pure Breathable Cotton',
    },
    origin: {
      ar: 'حياكة يدوية - السودان',
      en: 'Hand-tailored in Sudan',
    },
    careInstructions: {
      ar: 'غسيل يدوي أو آلي خفيف.',
      en: 'Machine wash delicate or hand wash.',
    },
    colors: [
      { id: 'cream', name: { ar: 'كريمي', en: 'Cream' }, hex: '#FBFEFB' },
      { id: 'burgundy', name: { ar: 'بيرغندي', en: 'Burgundy' }, hex: '#5F0F40' },
    ],
    sizes: [
      { id: 'free', label: 'Free Size', available: true },
    ],
    images: [
      '/brand/teaser-clean.jpg',
      '/brand/burgundy-avatar.jpg',
    ],
    features: [
      { ar: 'خفيفة ومثالية للأجواء الصيفية', en: 'Lightweight summer comfort' },
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
