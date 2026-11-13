/**
 * 3NF Relational Domain Schema for BURGUNDY (Kandaka Boutique)
 * Fully normalized domain entities following relational 3NF principles.
 */

export interface LocalizedString {
  ar: string;
  en: string;
}

// 1. Categories Table (Atomic category definition)
export interface Category {
  id: string;
  slug: 'toubs' | 'jalabiyas' | 'scarves' | 'accessories' | 'daraas' | 'dresses' | string;
  name: LocalizedString;
  description?: LocalizedString;
  imageUrl?: string;
  sortOrder: number;
}

// 2. Fabrics Table (Eliminates transitive dependencies from products)
export interface Fabric {
  id: string;
  slug: string;
  name: LocalizedString;
  origin: LocalizedString;
  careInstructions: LocalizedString;
}

// 3. Sizes Table (Eliminates 1NF comma-separated string violations)
export interface Size {
  id: string;
  code: 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'TOUB_STD' | 'CUSTOM' | string;
  label: LocalizedString;
  measurements?: LocalizedString;
  sortOrder: number;
}

// 4. Colors Table
export interface Color {
  id: string;
  name: LocalizedString;
  hex: string;
}

// 5. Products Table (Normalized entity without non-key partial dependencies)
export interface Product {
  id: string;
  slug: string;
  title: LocalizedString;
  subtitle?: LocalizedString;
  description: LocalizedString;
  basePriceQAR: number;
  originalPriceQAR?: number;
  categoryId: string;
  fabricId: string;
  badge?: 'sample' | 'new' | 'sale' | 'soldout' | 'heritage' | 'madeToOrder';
  isSample?: boolean;
  isMadeToOrder?: boolean;
  leadTimeDays?: number;
  isActive: boolean;
  features?: LocalizedString[];
  createdAt: string;
}

// 6. Product Variants Table (1NF atomic inventory item per size/color)
export interface ProductVariant {
  id: string;
  productId: string;
  sizeId: string;
  colorId?: string;
  sku: string;
  stockCount: number;
  priceOverrideQAR?: number;
  inStock: boolean;
}

// 7. Product Images Table (1:N relationship)
export interface ProductImage {
  id: string;
  productId: string;
  url: string;
  alt: LocalizedString;
  isPrimary: boolean;
  sortOrder: number;
}

// 8. Customers Table (Eliminates duplicate customer profiles in Orders)
export interface Customer {
  id: string;
  phone: string; // Unique primary contact in Qatar
  name: string;
  email?: string;
  municipality: string; // Doha, Al Rayyan, Al Wakrah, etc.
  addressLine: string;
  createdAt: string;
  totalSpentQAR: number;
  orderCount: number;
  tier: 'Royal VIP' | 'Atelier Patron' | 'New Client';
}

// 9. Orders Table (Clean order metadata referencing Customer)
export type OrderStatus = 'Confirmed' | 'Processing' | 'In Atelier' | 'Shipped' | 'Delivered' | 'Cancelled';
export type PaymentMethod = 'card' | 'qpay' | 'fawran' | 'bank_transfer';
export type PaymentStatus = 'pending' | 'verified' | 'failed' | 'refunded';

export interface Order {
  id: string;
  orderNumber: string; // "BUR-2026-XXXX"
  customerId: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  subtotalQAR: number;
  deliveryFeeQAR: number;
  discountQAR: number;
  totalQAR: number;
  receiptImageUrl?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// 10. Order Items Table (Atomic line item referencing ProductVariant)
export interface OrderItem {
  id: string;
  orderId: string;
  variantId: string;
  productId: string;
  unitPriceQAR: number;
  quantity: number;
  selectedSizeCode: string;
  customizationNote?: string;
}

// 11. Payments Table (Clean transaction audit trail)
export interface Payment {
  id: string;
  orderId: string;
  gateway: 'myfatoorah' | 'qpay' | 'fawran' | 'bank_wire';
  transactionRef: string;
  amountQAR: number;
  status: 'authorized' | 'captured' | 'pending_verification' | 'failed';
  receiptUrl?: string;
  rawResponse?: Record<string, unknown>;
  createdAt: string;
}

// Composite Aggregate Types for Callers (Leverage at the boundary)
export interface ProductDetailAggregate extends Product {
  category: Category;
  fabric: Fabric;
  variants: Array<ProductVariant & { size: Size; color?: Color }>;
  images: ProductImage[];
}

export interface OrderDetailAggregate extends Order {
  customer: Customer;
  items: Array<OrderItem & { product: Product; variant: ProductVariant; size: Size }>;
  payments: Payment[];
}
