import {
  Category,
  Fabric,
  Size,
  Product,
  ProductVariant,
  ProductImage,
  Customer,
  Order,
  OrderItem,
  Payment,
  ProductDetailAggregate,
  OrderDetailAggregate,
  OrderStatus,
  PaymentMethod,
  Complaint,
  ComplaintStatus,
  Review,
  ReviewStatus,
} from '../../domain/schema';
import {
  SEED_CATEGORIES,
  SEED_FABRICS,
  SEED_SIZES,
  generateNormalizedSeedData,
} from './seed-data';

export interface CatalogFilter {
  categorySlug?: string;
  fabricSlug?: string;
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
  searchQuery?: string;
}

export interface CreateOrderDTO {
  customer: {
    name: string;
    phone: string;
    email?: string;
    municipality: string;
    addressLine: string;
  };
  items: Array<{
    productId: string;
    variantId?: string;
    sizeCode?: string;
    quantity: number;
    unitPriceQAR: number;
    customizationNote?: string;
  }>;
  paymentMethod: PaymentMethod;
  notes?: string;
  receiptImageUrl?: string;
}

// In-Memory 3NF Relational Store Singleton (Deep Module Seam)
class RelationalDatabaseStore {
  private categories: Map<string, Category> = new Map();
  private fabrics: Map<string, Fabric> = new Map();
  private sizes: Map<string, Size> = new Map();
  private products: Map<string, Product> = new Map();
  private variants: Map<string, ProductVariant> = new Map();
  private images: Map<string, ProductImage> = new Map();
  private customers: Map<string, Customer> = new Map();
  private orders: Map<string, Order> = new Map();
  private orderItems: Map<string, OrderItem> = new Map();
  private payments: Map<string, Payment> = new Map();
  private complaints: Map<string, Complaint> = new Map();
  private reviews: Map<string, Review> = new Map();

  constructor() {
    this.seed();
  }

  private seed() {
    SEED_CATEGORIES.forEach((c) => this.categories.set(c.id, c));
    SEED_FABRICS.forEach((f) => this.fabrics.set(f.id, f));
    SEED_SIZES.forEach((s) => this.sizes.set(s.id, s));

    const { products, variants, images } = generateNormalizedSeedData();
    products.forEach((p) => this.products.set(p.id, p));
    variants.forEach((v) => this.variants.set(v.id, v));
    images.forEach((img) => this.images.set(img.id, img));

    this.seedEngagement();
  }

  /**
   * Approved, store-curated client testimonials. These are visible on the
   * homepage immediately (admin can later reject or hide them from the
   * Atelier portal moderation queue). New submissions land as 'pending'.
   */
  private seedEngagement() {
    const approved: Array<Omit<Review, 'id' | 'approvedAt'>> = [
      {
        authorName: 'د. مريم النعيمي',
        rating: 5,
        item: 'Royal Swiss Voile Toub',
        text: 'خامة الفوال السويسري تفوق الوصف في النعومة والانسيابية! وصلني الطلب خلال 24 ساعة فقط في اللؤلؤة مع تغليف قماشي فاخر يحفظ بريق التطريز.',
        status: 'approved',
        createdAt: '2026-10-28T10:00:00.000Z',
      },
      {
        authorName: 'أروى عثمان',
        rating: 5,
        item: 'Gezira Silk & Linen Dara’a',
        text: 'كتان بارد ومثالي لأجواء قطر وتطريز الحناء على الأكمام شديد النعومة والدقة. تعامل راقٍ وخدمة كونسيرج متميزة عبر واتساب.',
        status: 'approved',
        createdAt: '2026-11-02T10:00:00.000Z',
      },
      {
        authorName: 'فاطمة الكواري',
        rating: 5,
        item: 'Hand-Painted Silk Crepe Toub',
        text: 'ارتديته في حفل زفاف عائلي بالدوحة ونال إعجاب الجميع! دقة التفاصيل النوبية ونقاء الألوان كانت لافتة جداً.',
        status: 'approved',
        createdAt: '2026-11-09T10:00:00.000Z',
      },
    ];
    approved.forEach((r) => {
      const id = `rev-${Date.now().toString(36)}-${Math.floor(Math.random() * 10000)}`;
      this.reviews.set(id, { ...r, id, approvedAt: r.createdAt });
    });
  }

  // --- CATALOG SEAM ---
  public listCategories(): Category[] {
    return Array.from(this.categories.values()).sort((a, b) => a.sortOrder - b.sortOrder);
  }

  public listFabrics(): Fabric[] {
    return Array.from(this.fabrics.values());
  }

  public listSizes(): Size[] {
    return Array.from(this.sizes.values()).sort((a, b) => a.sortOrder - b.sortOrder);
  }

  public listProducts(filter?: CatalogFilter): ProductDetailAggregate[] {
    let result = Array.from(this.products.values()).filter((p) => p.isActive);

    if (filter?.categorySlug && filter.categorySlug !== 'all') {
      const cat = Array.from(this.categories.values()).find((c) => c.slug === filter.categorySlug);
      if (cat) {
        result = result.filter((p) => p.categoryId === cat.id);
      }
    }

    if (filter?.fabricSlug && filter.fabricSlug !== 'all') {
      const fab = Array.from(this.fabrics.values()).find((f) => f.slug === filter.fabricSlug);
      if (fab) {
        result = result.filter((p) => p.fabricId === fab.id);
      }
    }

    if (filter?.minPrice !== undefined) {
      result = result.filter((p) => p.basePriceQAR >= filter.minPrice!);
    }

    if (filter?.maxPrice !== undefined) {
      result = result.filter((p) => p.basePriceQAR <= filter.maxPrice!);
    }

    if (filter?.searchQuery?.trim()) {
      const q = filter.searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.ar.toLowerCase().includes(q) ||
          p.title.en.toLowerCase().includes(q) ||
          p.description.ar.toLowerCase().includes(q) ||
          p.description.en.toLowerCase().includes(q)
      );
    }

    // Hydrate 3NF aggregates
    return result.map((p) => this.hydrateProductAggregate(p));
  }

  public getProductBySlug(slug: string): ProductDetailAggregate | null {
    const p = Array.from(this.products.values()).find((item) => item.slug === slug);
    return p ? this.hydrateProductAggregate(p) : null;
  }

  public getProductById(id: string): ProductDetailAggregate | null {
    const p = this.products.get(id);
    return p ? this.hydrateProductAggregate(p) : null;
  }

  private hydrateProductAggregate(p: Product): ProductDetailAggregate {
    const cat = this.categories.get(p.categoryId)!;
    const fab = this.fabrics.get(p.fabricId)!;
    const pVariants = Array.from(this.variants.values())
      .filter((v) => v.productId === p.id)
      .map((v) => ({
        ...v,
        size: this.sizes.get(v.sizeId) || {
          id: 'unknown',
          code: 'TOUB_STD',
          label: { ar: 'موحد', en: 'Standard' },
          sortOrder: 1,
        },
      }));
    const pImages = Array.from(this.images.values())
      .filter((img) => img.productId === p.id)
      .sort((a, b) => a.sortOrder - b.sortOrder);

    return {
      ...p,
      category: cat,
      fabric: fab,
      variants: pVariants,
      images: pImages,
    };
  }

  // --- ORDER SEAM (Atomic 3NF Insertion) ---
  public createOrder(dto: CreateOrderDTO): OrderDetailAggregate {
    // 1. Find or create Customer (Normalized 3NF - avoids duplicate profiles)
    let customer = Array.from(this.customers.values()).find(
      (c) => c.phone.trim() === dto.customer.phone.trim()
    );

    const now = new Date().toISOString();

    if (!customer) {
      customer = {
        id: `cust-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        phone: dto.customer.phone.trim(),
        name: dto.customer.name.trim(),
        email: dto.customer.email?.trim(),
        municipality: dto.customer.municipality.trim(),
        addressLine: dto.customer.addressLine.trim(),
        createdAt: now,
        totalSpentQAR: 0,
        orderCount: 0,
        tier: 'New Client',
      };
      this.customers.set(customer.id, customer);
    } else {
      // Update address details if changed
      customer.name = dto.customer.name.trim();
      customer.municipality = dto.customer.municipality.trim();
      customer.addressLine = dto.customer.addressLine.trim();
    }

    // 2. Compute order line items & verify pricing
    let subtotalQAR = 0;
    const lineItems: OrderItem[] = [];
    const orderId = `ord-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `BUR-2026-${randomSuffix}`;

    dto.items.forEach((item, idx) => {
      const product = this.products.get(item.productId);
      if (!product) {
        throw new Error(`Unknown product: ${item.productId}`);
      }
      // Always trust catalog pricing — never client-supplied prices.
      const unitPrice = product.basePriceQAR;
      const itemTotal = unitPrice * item.quantity;
      subtotalQAR += itemTotal;

      const orderItem: OrderItem = {
        id: `oi-${orderId}-${idx + 1}`,
        orderId,
        variantId: item.variantId || `var-${item.productId}-std`,
        productId: item.productId,
        unitPriceQAR: unitPrice,
        quantity: item.quantity,
        selectedSizeCode: item.sizeCode || 'TOUB_STD',
        customizationNote: item.customizationNote,
      };

      lineItems.push(orderItem);
      this.orderItems.set(orderItem.id, orderItem);

      // Decrement variant stock if tracked
      if (item.variantId && this.variants.has(item.variantId)) {
        const v = this.variants.get(item.variantId)!;
        v.stockCount = Math.max(0, v.stockCount - item.quantity);
        v.inStock = v.stockCount > 0;
      }
    });

    // Delivery policy must match the checkout calculator (calculateCheckoutTotals)
    const deliveryFeeQAR = subtotalQAR >= 500 ? 0 : 25;
    const discountQAR = 0;
    const totalQAR = subtotalQAR + deliveryFeeQAR - discountQAR;

    // 3. Create Order
    const order: Order = {
      id: orderId,
      orderNumber,
      customerId: customer.id,
      status: 'Confirmed',
      paymentMethod: dto.paymentMethod,
      paymentStatus: dto.paymentMethod === 'bank_transfer' ? 'pending' : 'verified',
      subtotalQAR,
      deliveryFeeQAR,
      discountQAR,
      totalQAR,
      receiptImageUrl: dto.receiptImageUrl,
      notes: dto.notes,
      createdAt: now,
      updatedAt: now,
    };

    this.orders.set(order.id, order);

    // Update customer stats
    customer.orderCount += 1;
    customer.totalSpentQAR += totalQAR;
    if (customer.totalSpentQAR > 5000) {
      customer.tier = 'Royal VIP';
    } else if (customer.totalSpentQAR > 2000) {
      customer.tier = 'Atelier Patron';
    }

    // 4. Create Payment Record (Audit trail)
    const paymentId = `pay-${Date.now()}`;
    const payment: Payment = {
      id: paymentId,
      orderId: order.id,
      gateway: dto.paymentMethod === 'bank_transfer' ? 'bank_wire' : 'myfatoorah',
      transactionRef: `TXN-${order.orderNumber}-${Date.now().toString(36).toUpperCase()}`,
      amountQAR: totalQAR,
      status: dto.paymentMethod === 'bank_transfer' ? 'pending_verification' : 'captured',
      receiptUrl: dto.receiptImageUrl,
      createdAt: now,
    };
    this.payments.set(payment.id, payment);

    return this.hydrateOrderAggregate(order);
  }

  public getOrderByNumber(orderNumber: string): OrderDetailAggregate | null {
    const ord = Array.from(this.orders.values()).find(
      (o) => o.orderNumber.toUpperCase() === orderNumber.toUpperCase()
    );
    return ord ? this.hydrateOrderAggregate(ord) : null;
  }

  public listOrders(): OrderDetailAggregate[] {
    return Array.from(this.orders.values())
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .map((o) => this.hydrateOrderAggregate(o));
  }

  public updateOrderStatus(orderId: string, status: OrderStatus): OrderDetailAggregate | null {
    const o = this.orders.get(orderId);
    if (!o) return null;
    o.status = status;
    o.updatedAt = new Date().toISOString();
    return this.hydrateOrderAggregate(o);
  }

  private hydrateOrderAggregate(o: Order): OrderDetailAggregate {
    const customer = this.customers.get(o.customerId)!;
    const items = Array.from(this.orderItems.values())
      .filter((oi) => oi.orderId === o.id)
      .map((oi) => {
        const prod = this.products.get(oi.productId)!;
        const variant = this.variants.get(oi.variantId) || {
          id: oi.variantId,
          productId: oi.productId,
          sizeId: 'size-toub-std',
          sku: `${oi.productId}-STD`,
          stockCount: 1,
          inStock: true,
        };
        const size = this.sizes.get(variant.sizeId) || {
          id: 'size-toub-std',
          code: 'TOUB_STD',
          label: { ar: 'موحد', en: 'Standard' },
          sortOrder: 1,
        };
        return {
          ...oi,
          product: prod,
          variant,
          size,
        };
      });

    const payments = Array.from(this.payments.values()).filter((p) => p.orderId === o.id);

    return {
      ...o,
      customer,
      items,
      payments,
    };
  }

  // --- ENGAGEMENT SEAM (Consumer Complaints & Client Reviews) ---

  public createComplaint(dto: {
    fullName: string;
    phone: string;
    email?: string;
    orderNumber?: string;
    complaintType?: string;
    message: string;
  }): Complaint {
    const id = `cmp-${Date.now().toString(36)}-${Math.floor(Math.random() * 1000)}`;
    const ticketId = `QA-COMP-${Math.floor(100000 + Math.random() * 900000)}`;
    const now = new Date().toISOString();
    const complaint: Complaint = {
      id,
      ticketId,
      fullName: dto.fullName.trim(),
      phone: dto.phone.trim(),
      email: dto.email?.trim() || undefined,
      orderNumber: dto.orderNumber?.trim() || undefined,
      complaintType: (dto.complaintType || 'other').trim().slice(0, 48),
      message: dto.message.trim().slice(0, 4000),
      status: 'pending',
      createdAt: now,
    };
    this.complaints.set(id, complaint);
    return complaint;
  }

  public listComplaints(): Complaint[] {
    return Array.from(this.complaints.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  public updateComplaintStatus(ticketId: string, status: ComplaintStatus): Complaint | null {
    const found = Array.from(this.complaints.values()).find((c) => c.ticketId === ticketId);
    if (!found) return null;
    found.status = status;
    if (status === 'resolved') found.resolvedAt = new Date().toISOString();
    this.complaints.set(found.id, found);
    return found;
  }

  public createReview(dto: {
    authorName: string;
    rating: number;
    item?: string;
    text: string;
  }): Review {
    const id = `rev-${Date.now().toString(36)}-${Math.floor(Math.random() * 10000)}`;
    const now = new Date().toISOString();
    const rating = Math.min(5, Math.max(1, Math.round(Number(dto.rating) || 1)));
    const review: Review = {
      id,
      authorName: dto.authorName.trim().slice(0, 120),
      rating,
      item: dto.item?.trim().slice(0, 140) || undefined,
      text: dto.text.trim().slice(0, 1200),
      status: 'pending',
      createdAt: now,
    };
    this.reviews.set(id, review);
    return review;
  }

  public listApprovedReviews(): Review[] {
    return Array.from(this.reviews.values())
      .filter((r) => r.status === 'approved')
      .sort((a, b) => new Date(b.approvedAt || b.createdAt).getTime() - new Date(a.approvedAt || a.createdAt).getTime());
  }

  public listAllReviews(): Review[] {
    return Array.from(this.reviews.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  public updateReviewStatus(id: string, status: ReviewStatus): Review | null {
    const found = this.reviews.get(id);
    if (!found) return null;
    found.status = status;
    if (status === 'approved' && !found.approvedAt) found.approvedAt = new Date().toISOString();
    this.reviews.set(found.id, found);
    return found;
  }
}

// Global Repository Singleton across Next.js dev server worker/module reloads
const globalForDb = globalThis as unknown as {
  burgundyRelationalDb?: RelationalDatabaseStore;
};

export const db = globalForDb.burgundyRelationalDb ?? new RelationalDatabaseStore();

if (process.env.NODE_ENV !== 'production') {
  globalForDb.burgundyRelationalDb = db;
}
