export interface Product {
  id: string;
  slug: string;
  title: { ar: string; en: string };
  subtitle: { ar: string; en: string };
  description: { ar: string; en: string };
  priceQAR: number;
  originalPriceQAR?: number;
  category: 'toubs' | 'jalabiyas' | 'daraas' | 'dresses' | 'accessories';
  badge?: 'new' | 'sale' | 'soldout' | 'heritage';
  inStock: boolean;
  stockCount: number;
  fabric: { ar: string; en: string };
  origin: { ar: string; en: string };
  careInstructions: { ar: string; en: string };
  colors: Array<{ id: string; name: { ar: string; en: string }; hex: string }>;
  sizes: Array<{ id: string; label: string; available: boolean }>;
  images: string[];
  features: Array<{ ar: string; en: string }>;
}

export const products: Product[] = [
  {
    id: 'prod-001',
    slug: 'royal-swiss-voile-toub',
    title: {
      ar: 'ثوب سويسري ملكي مطرز بالذهب',
      en: 'Royal Swiss Voile Toub with Gold Work',
    },
    subtitle: {
      ar: 'فوال سويسري قطن 100% مطرز يدوياً بتطريزات الكنداكة الملكية',
      en: '100% pure Swiss cotton voile with regal hand-guided embroidery',
    },
    description: {
      ar: 'تحفة فنية سودانية أصيلة. صُنع من أجود خيوط الفوال السويسري الفاخر بملمس ناعم كالحرير، وطُرزت حواشيه وأطرافه يدوياً في ورشاتنا بالسودان بخيوط مذهبة تدوم طويلاً دون أن تفقد بريقها.',
      en: 'An authentic Sudanese masterpiece. Crafted from the finest imported Swiss cotton voile with a silk-soft drape, delicately hand-embroidered by artisan women in Khartoum.',
    },
    priceQAR: 1450,
    originalPriceQAR: 1750,
    category: 'toubs',
    badge: 'heritage',
    inStock: true,
    stockCount: 8,
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
      { id: 'peach', name: { ar: 'دراق ناعم', en: 'Soft Peach' }, hex: '#FFC9A8' },
      { id: 'coral', name: { ar: 'مرجاني دافئ', en: 'Warm Coral' }, hex: '#E8795A' },
      { id: 'cream', name: { ar: 'كريمي عاجي', en: 'Ivory Cream' }, hex: '#FFF6EE' },
    ],
    sizes: [
      { id: 'free-size', label: 'المقاس الموحد (4.5 متر)', available: true },
    ],
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85',
    ],
    features: [
      { ar: 'طول كامل 4.5 أمتار وعرض 110 سم', en: 'Full 4.5m traditional length, 110cm width' },
      { ar: 'خيوط تطريز ذهبية مقاومة للتلاشي', en: 'Non-tarnishing gold needlework' },
      { ar: 'يشمل حقيبة حفظ قماشية فاخرة', en: 'Includes protective luxury travel pouch' },
    ],
  },
  {
    id: 'prod-002',
    slug: 'handcrafted-silk-jacquard-toub',
    title: {
      ar: 'ثوب حرير جاكار مشغول بنقوش نوبية',
      en: 'Handcrafted Silk Jacquard Toub with Nubian Motifs',
    },
    subtitle: {
      ar: 'حرير طبيعي منسوج بنقوش الجاكار الهندسية المستوحاة من حضارة مروي',
      en: 'Pure jacquard woven silk featuring geometric Meroitic heritage patterns',
    },
    description: {
      ar: 'ثوب استثنائي مخصص للأعراس والمناسبات الكبرى. يجمع بين ثراء الحرير الطبيعي والتصميم المستلهم من نقوش التيجان المروية، مما يمنحكِ حضوراً ملكياً مهيباً.',
      en: 'A statement toub reserved for weddings and high celebrations. Blending the richness of genuine silk with Meroitic royal crown motifs.',
    },
    priceQAR: 1650,
    category: 'toubs',
    badge: 'new',
    inStock: true,
    stockCount: 5,
    fabric: {
      ar: 'حرير طبيعي 100% مع نسيج جاكار مذهب',
      en: '100% Natural Silk with Jacquard Weaving',
    },
    origin: {
      ar: 'حياكة سودانية يدوية فاخرة',
      en: 'Artisanal Sudanese craftsmanship',
    },
    careInstructions: {
      ar: 'تنظيف جاف حصراً. الحفظ في مكان جاف ومعتم لتفادي تأثر ألياف الحرير.',
      en: 'Professional dry cleaning strictly recommended. Store in a cool, dark wardrobe.',
    },
    colors: [
      { id: 'gold-cream', name: { ar: 'عاجي مذهب', en: 'Gilded Ivory' }, hex: '#FFF0E6' },
      { id: 'deep-peach', name: { ar: 'دراق عميق', en: 'Deep Peach' }, hex: '#F9A57B' },
    ],
    sizes: [
      { id: 'free-size', label: 'المقاس الموحد (4.5 متر)', available: true },
    ],
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=85',
    ],
    features: [
      { ar: 'حرير طبيعي بانسيابية وانعكاس ضوء خافت', en: 'Pure silk with soft ambient sheen' },
      { ar: 'مناسب للأعراس والمناسبات الفخمة', en: 'Ideal for weddings and royal galas' },
    ],
  },
  {
    id: 'prod-003',
    slug: 'gezira-linen-daraa',
    title: {
      ar: 'درّاعة كتان الجزيرة مطرزة بنقوش الحناء',
      en: 'Gezira Linen Dara’a with Henna Needlework',
    },
    subtitle: {
      ar: 'كتان طبيعي بارد مع تطريز ناعم على الأكمام والياقة',
      en: 'Cool breathable natural linen with delicate henna embroidery',
    },
    description: {
      ar: 'دراعة معاصرة مريحة وأنيقة مستوحاة من أزياء وادي النيل. خامة الكتان الباردة تمنحكِ انتعاشاً مثالياً في طقس قطر، مع تفاصيل تطريز متقنة تعكس فنون الحناء السودانية.',
      en: 'A modern, graceful Dara’a inspired by Nile Valley casual luxury. Natural breathable linen provides comfort in Qatar summers with henna-style embellishments.',
    },
    priceQAR: 850,
    originalPriceQAR: 980,
    category: 'daraas',
    badge: 'sale',
    inStock: true,
    stockCount: 12,
    fabric: {
      ar: 'كتان طبيعي 100%',
      en: '100% Breathable Linen',
    },
    origin: {
      ar: 'تصميم وتنفيذ سوداني أصيل',
      en: 'Designed and stitched in Sudan',
    },
    careInstructions: {
      ar: 'غسيل يدوي بماء بارد أو غسيل لطيف في الغسالة. يكوى وهو رطب قليلاً.',
      en: 'Hand wash in cold water or delicate cycle. Iron while slightly damp.',
    },
    colors: [
      { id: 'cream', name: { ar: 'كريمي', en: 'Cream' }, hex: '#FFF6EE' },
      { id: 'terracotta', name: { ar: 'طوبي دافئ', en: 'Warm Terracotta' }, hex: '#E8795A' },
    ],
    sizes: [
      { id: 's', label: 'S (38)', available: true },
      { id: 'm', label: 'M (40)', available: true },
      { id: 'l', label: 'L (42)', available: true },
      { id: 'xl', label: 'XL (44)', available: true },
    ],
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85',
    ],
    features: [
      { ar: 'قصة واسعة مريحة وانسيابية', en: 'Relaxed modest silhouette' },
      { ar: 'تطريز يدوي على الصدر والأساور', en: 'Hand-stitched chest and cuff accents' },
    ],
  },
  {
    id: 'prod-004',
    slug: 'kandaka-nubian-festive-jalabiya',
    title: {
      ar: 'جلابية كنداكة ملكية مطرزة',
      en: 'Kandaka Royal Festive Jalabiya',
    },
    subtitle: {
      ar: 'جلابية راقية للضيافة والمناسبات الأسرية',
      en: 'Festive luxury Jalabiya for home hospitality and Eid gatherings',
    },
    description: {
      ar: 'جلابية سودانية نسائية فاخرة تجمع بين الاحتشام والأناقة الملكية. مصممة من الحرير الممزوج بالقطن المريح مع ياقة مطرزة بأدق التفاصيل.',
      en: 'Elevated Sudanese Jalabiya celebrating festive elegance and hospitality. Soft cotton-silk blend with ornate neckline embroidery.',
    },
    priceQAR: 750,
    category: 'jalabiyas',
    badge: 'heritage',
    inStock: true,
    stockCount: 9,
    fabric: {
      ar: 'حرير وقطن ممزوج فائق النعومة',
      en: 'Premium Silk-Cotton Blend',
    },
    origin: {
      ar: 'صنع في السودان',
      en: 'Made in Sudan',
    },
    careInstructions: {
      ar: 'غسيل يدوي لطيف أو تنظيف جاف.',
      en: 'Gentle hand wash or dry clean.',
    },
    colors: [
      { id: 'peach-soft', name: { ar: 'دراق ناعم', en: 'Soft Peach' }, hex: '#FFC9A8' },
      { id: 'cocoa-light', name: { ar: 'بني فاتح', en: 'Light Cocoa' }, hex: '#725447' },
    ],
    sizes: [
      { id: 's', label: 'S', available: true },
      { id: 'm', label: 'M', available: true },
      { id: 'l', label: 'L', available: true },
      { id: 'xl', label: 'XL', available: true },
    ],
    images: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85',
    ],
    features: [
      { ar: 'ياقة كنداكة مطرزة يدوياً', en: 'Artisanal embroidered collar' },
      { ar: 'جيوب جانبية مخفية وعملية', en: 'Discreet side pockets' },
    ],
  },
  {
    id: 'prod-005',
    slug: 'khartoum-modern-silk-dress',
    title: {
      ar: 'فستان حرير سوداني عصري',
      en: 'Khartoum Modern Silk Maxi Dress',
    },
    subtitle: {
      ar: 'فستان محتشم بلمسات سودانية معاصرة',
      en: 'Contemporary modest silhouette infused with Sudanese heritage lines',
    },
    description: {
      ar: 'تصميم يجمع بين بساطة الموضة العالمية والروح السودانية العريقة. يتميز بقصة متهدلة مع حزام خصر اختياري وتفاصيل كشكشة ناعمة.',
      en: 'Bridging international high fashion with deep Sudanese soul. Fluid drape with an optional cinched sash and subtle henna hem trim.',
    },
    priceQAR: 950,
    category: 'dresses',
    badge: 'new',
    inStock: true,
    stockCount: 6,
    fabric: {
      ar: 'حرير كريب إيطالي ناعم',
      en: 'Italian Silk Crepe',
    },
    origin: {
      ar: 'تصميم سوداني محاك بأعلى معايير الخياطة الراقية',
      en: 'Sudanese designer atelier creation',
    },
    careInstructions: {
      ar: 'غسيل جاف بالبخار لحماية انسيابية القماش.',
      en: 'Dry clean only with steam pressing.',
    },
    colors: [
      { id: 'coral', name: { ar: 'مرجان مشرق', en: 'Vibrant Coral' }, hex: '#E8795A' },
      { id: 'cream', name: { ar: 'بيج ناعم', en: 'Soft Beige' }, hex: '#FFF6EE' },
    ],
    sizes: [
      { id: 's', label: '38 (S)', available: true },
      { id: 'm', label: '40 (M)', available: true },
      { id: 'l', label: '42 (L)', available: true },
    ],
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=85',
    ],
    features: [
      { ar: 'قصة ماكسي كاملة بطول أنيق', en: 'Full maxi length coverage' },
      { ar: 'قماش غير شفاف ومريح', en: 'Opaque luxury fabric' },
    ],
  },
  {
    id: 'prod-006',
    slug: 'kasala-artisanal-silk-scarf',
    title: {
      ar: 'شال كسلا الحريري التراثي',
      en: 'Kasala Artisanal Silk Scarf & Shawl',
    },
    subtitle: {
      ar: 'شال ناعم من الحرير الطبيعي مع أطراف مهدبة يدوياً',
      en: 'Pure natural silk shawl with handcrafted fringe borders',
    },
    description: {
      ar: 'إكسسوار متكامل يمكن ارتداؤه مع الثوب أو الفستان لإضافة لمسة أناقة فاخرة. صُنع بأيدي نساجين متمرسين من شرق السودان.',
      en: 'The definitive luxury accessory to complement your toub or modern dress. Handwoven by master weavers in Eastern Sudan.',
    },
    priceQAR: 420,
    category: 'accessories',
    badge: 'heritage',
    inStock: true,
    stockCount: 15,
    fabric: {
      ar: 'حرير خالص 100%',
      en: '100% Pure Raw Silk',
    },
    origin: {
      ar: 'حياكة يدوية في كسلا، السودان',
      en: 'Handmade in Kasala, Sudan',
    },
    careInstructions: {
      ar: 'غسيل يدوي بماء فاتر وشامبو مخصص للحرير.',
      en: 'Hand wash gently with mild silk detergent.',
    },
    colors: [
      { id: 'peach-gold', name: { ar: 'دراق مذهب', en: 'Gilded Peach' }, hex: '#FFC9A8' },
      { id: 'crimson', name: { ar: 'عنابي دافئ', en: 'Warm Crimson' }, hex: '#D96848' },
    ],
    sizes: [
      { id: 'one-size', label: 'المقاس الموحد (200 × 70 سم)', available: true },
    ],
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=85',
    ],
    features: [
      { ar: 'أبعاد مثالية: 200 سم × 70 سم', en: 'Dimensions: 200cm x 70cm' },
      { ar: 'ختم الأصالة التراثي محفور باليد', en: 'Authenticity seal hand-finished' },
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === 'all') return products;
  return products.filter((p) => p.category === category);
}
