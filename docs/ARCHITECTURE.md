# BURGUNDY - Architecture & System Design

## 1. System Overview & Technology Stack
BURGUNDY is a mobile-first, high-performance luxury e-commerce platform custom-engineered for hand-painted Sudanese women's wear operating under State of Qatar e-commerce regulations.

```mermaid
graph TD
    subgraph Client ["Client Presentation Layer (Mobile 390px First)"]
        A1[Storefront - Next.js 15 App Router]
        A2[Admin Console - Mobile Operations Hub]
        A3[Public Advertise & Custom Order Forms]
        A4[Interactive RTL Invoice PDF Generator]
    end

    subgraph Core ["Application & State Core"]
        B1[Bilingual Engine - AR & EN / Tajawal & Cormorant]
        B2[Catalog & Stock Manager - Real-time Sync]
        B3[Pre-Launch Teaser & Mode Switch Controller]
        B4[Sponsored Advertising Manager]
        B5[CRM & Inquiries Pipeline]
    end

    subgraph Integrations ["Qatar Rails & Omnichannel Alerts"]
        C1[Qatar Payments Adapter: QPay / Fawran / Cards / Wire]
        C2[Telegram Bot Notifier with Inline Action Buttons]
        C3[WhatsApp Cloud API Gateway - Feature Flagged]
        C4[Bilingual Transactional Email Dispatcher]
        C5[Cloud Storage & Image Compression Pipeline]
    end

    A1 --> B1
    A1 --> B2
    A1 --> B3
    A1 --> B4
    A2 --> B2
    A2 --> B3
    A2 --> B4
    A2 --> B5
    A1 --> C1
    B2 --> C2
    B5 --> C2
    B5 --> C4
    C1 --> A4
```

## 2. Order & Payment State Machine

```mermaid
stateDiagram-v2
    [*] --> CartCheckout: Customer Selects Items (QAR)
    CartCheckout --> PaymentRailSelection: Reviews Delivery & Total Breakdown
    
    state PaymentRailSelection {
        [*] --> Choice
        Choice --> CardOrQPay: QPay (NAPS) / Card
        Choice --> FawranInstant: Fawran QCB Instant
        Choice --> BankTransfer: IBAN Transfer with Receipt Upload
        Choice --> CashOnDelivery: COD (Qatar Verified Mobile)
    }

    CardOrQPay --> Paid: Gateway Webhook Verification
    FawranInstant --> Paid: Instant QCB Confirmation
    BankTransfer --> PendingVerification: Customer Uploads Slip
    CashOnDelivery --> ConfirmedCOD: Verified + Dispatched

    PendingVerification --> Paid: Admin One-Tap Receipt Approval
    PendingVerification --> Cancelled: Invalid Receipt

    Paid --> Processing: Atelier Prepares / Paints Toub
    ConfirmedCOD --> Processing: Toub Inspection & Packing
    
    Processing --> Shipped: Dispatched to Local Qatar Courier
    Shipped --> Delivered: Delivered to Customer
    Delivered --> [*]
```

## 3. Entity-Relationship Data Model

```mermaid
erDiagram
    SETTINGS ||--|| SITE_CONFIG : stores
    SETTINGS {
        string store_name
        string logo_url
        string cr_number
        string license_number
        boolean launch_mode_teaser
        string brand_color_primary
        string instagram_handle
    }

    PRODUCT ||--o{ PRODUCT_IMAGE : contains
    PRODUCT ||--o{ COLOR_SWATCH : offers
    PRODUCT {
        string id PK
        string title_ar
        string title_en
        string desc_ar
        string desc_en
        string category
        string fabric
        number price_qar
        string sizes
        number stock_count
        boolean is_made_to_order
        number lead_time_days
        boolean is_published
        number sort_order
    }

    ORDER ||--|{ ORDER_ITEM : includes
    ORDER ||--|| INVOICE : generates
    ORDER {
        string id PK
        string invoice_number
        string customer_name
        string customer_phone
        string zone
        string street
        string building
        string payment_method
        string payment_status
        string order_status
        number total_qar
        string receipt_image_url
        datetime created_at
    }

    CRM_LEAD {
        string id PK
        string type
        string name
        string phone
        string email
        string notes
        string status
        datetime created_at
    }

    SPONSORED_AD {
        string id PK
        string advertiser_name
        string placement
        string media_url
        string target_url
        date start_date
        date end_date
        string status
        number views_count
        number clicks_count
    }
```

## 4. Telegram & Omnichannel Flow
When a customer places an order or submits a custom order/advertise lead, the backend dispatches a webhook to the Telegram bot with inline keyboard buttons:
- `[✅ Confirm / Ship]`
- `[📄 View Invoice]`
- `[📞 Contact Customer via WhatsApp]`
Allowing the store owner to run operations directly from their phone with zero latency.
