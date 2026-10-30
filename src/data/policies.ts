export interface PolicySection {
  heading: string;
  body: string[];
}

export interface PolicyDocument {
  title: string;
  subtitle: string;
  lastUpdated: string;
  sections: PolicySection[];
}

export const policies: Record<'returns' | 'shipping' | 'privacy' | 'terms', { ar: PolicyDocument; en: PolicyDocument }> = {
  returns: {
    ar: {
      title: 'سياسة الاسترجاع والاستبدال',
      subtitle: 'حقوق المستهلك مكفولة وفقاً لأحكام القانون رقم (8) لسنة 2008 والقرار الوزاري رقم 25 لسنة 2026',
      lastUpdated: 'أكتوبر 2026',
      sections: [
        {
          heading: '١. فترة الإرجاع والاستبدال',
          body: [
            'يحق للعميلة طلب استرجاع أو استبدال القطع المشتراة خلال مدة أقصاها 14 يوماً من تاريخ استلام الطلب داخل دولة قطر.',
            'في حال وجود عيب مصنعي أو خطأ في المقاس أو مواصفات الثوب، يتم الاستبدال أو استرداد كامل المبلغ متضمناً رسوم التوصيل دون أي خصومات.',
          ],
        },
        {
          heading: '٢. شروط قبول القطع المرجعة',
          body: [
            'يجب أن تكون القطعة (الثوب، الجلابية، أو الدراعة) غير ملبوسة وفي حالتها الأصلية مع كافة الملصقات والتغليف التراثي.',
            'الأقمشة الحريرية والشيلان الحساسة يجب أن تحتفظ بالختم الصحي والأصلي غير مفكوك.',
            'لا يمكن إرجاع القطع التي تم تفصيلها أو تعديل مقاساتها حسب طلب خاص من العميلة إلا في حال وجود عيب مصنعي مثبت.',
          ],
        },
        {
          heading: '٣. آلية استرداد الأموال',
          body: [
            'يتم استرداد المبلغ بنفس وسيلة الدفع الأصلية (بطاقة بنكية، فوران، أو رصيد متجر فوري حسب اختيار العميلة).',
            'تستغرق عملية استرداد الأموال عبر الحسابات البنكية من 3 إلى 7 أيام عمل من تاريخ استلام وفحص القطعة.',
          ],
        },
      ],
    },
    en: {
      title: 'Return & Exchange Policy',
      subtitle: 'Compliant with Qatar Consumer Protection Law No. 8 of 2008 & Ministerial Decision No. 25 of 2026',
      lastUpdated: 'October 2026',
      sections: [
        {
          heading: '1. Return & Exchange Period',
          body: [
            'Customers in Qatar have the right to return or exchange items within 14 days of order delivery.',
            'If an item has a manufacturing defect or differs from the listed specifications, a full refund including delivery fees is issued promptly.',
          ],
        },
        {
          heading: '2. Return Eligibility & Conditions',
          body: [
            'Garments (Toubs, Jalabiyas, Dara’as) must be unworn, unwashed, with all original luxury tags intact.',
            'Silk scarves and intimate accessories must retain unbroken hygienic seals.',
            'Custom-tailored or altered garments cannot be returned unless a manufacturing defect is established.',
          ],
        },
        {
          heading: '3. Refund Methods',
          body: [
            'Refunds are credited to the original payment method (Card, Fawran, or store credit upon customer preference).',
            'Bank card refunds typically reflect within 3 to 7 business days following item inspection.',
          ],
        },
      ],
    },
  },
  shipping: {
    ar: {
      title: 'الشحن والتوصيل',
      subtitle: 'توصيل مبرد وسريع لجميع مناطق دولة قطر ودول مجلس التعاون الخليجي',
      lastUpdated: 'أكتوبر 2026',
      sections: [
        {
          heading: '١. التوصيل داخل دولة قطر',
          body: [
            'يتم التوصيل عبر أسطولنا الخاص أو مندوبي توصيل معتمدين خلال 24 إلى 48 ساعة من تأكيد الطلب.',
            'رسوم التوصيل الثابتة لجميع مناطق قطر هي 25 ر.ق، وتكون مجانية تماماً لكافة الطلبات التي تتجاوز قيمتها 350 ر.ق.',
            'يتم تسليم الثياب والجلابيات في أكياس حماية مخصصة لحفظ أقمشة الحرير والقطن السويسري من التجعد والرطوبة.',
          ],
        },
        {
          heading: '٢. الشحن لدول الخليج والمغتربين',
          body: [
            'نوفر شحناً سريعاً لدول مجلس التعاون (السعودية، الإمارات، الكويت، عمان، البحرين) خلال 3 إلى 5 أيام عمل بسعر ثابت 65 ر.ق.',
            'يتم تزويد العميلة برقم تتبع مباشر فور خروج الشحنة مع شركة الشحن المعتمدة.',
          ],
        },
      ],
    },
    en: {
      title: 'Shipping & Delivery Policy',
      subtitle: 'Express climate-controlled courier services across Qatar and the GCC',
      lastUpdated: 'October 2026',
      sections: [
        {
          heading: '1. Domestic Qatar Delivery',
          body: [
            'Delivery across all Qatar zones takes place within 24 to 48 hours of order confirmation.',
            'A flat delivery fee of 25 QAR applies, and delivery is completely FREE for orders of 350 QAR and above.',
            'All toubs are packaged in protective garment bags to preserve delicate Swiss voile and silk embroidery.',
          ],
        },
        {
          heading: '2. GCC & International Shipping',
          body: [
            'Express courier shipping across the GCC (Saudi Arabia, UAE, Kuwait, Oman, Bahrain) takes 3-5 business days at 65 QAR flat rate.',
            'Customers receive live tracking updates immediately upon package dispatch.',
          ],
        },
      ],
    },
  },
  privacy: {
    ar: {
      title: 'سياسة الخصوصية وحماية البيانات',
      subtitle: 'ملتزمون بحماية بياناتكِ الشخصية وفق قانون حماية خصوصية البيانات الشخصية رقم (13) لسنة 2016 بدولة قطر',
      lastUpdated: 'أكتوبر 2026',
      sections: [
        {
          heading: '١. البيانات التي نجمعها',
          body: [
            'نجمع فقط البيانات الضرورية لإتمام طلبكِ وتوصيله بدقة: الاسم الكامل، رقم الهاتف القطري، عنوان التوصيل (المنطقة، الشارع، المبنى)، والبريد الإلكتروني للفاتورة.',
            'لا نقوم بتخزين أي بيانات لبطاقات الدفع البنكية على خوادمنا؛ تتم جميع عمليات الدفع عبر بوابات دفع قطرية مرخصة وذات تشفير بنكي صارم (PCI-DSS compliant).',
          ],
        },
        {
          heading: '٢. استخدام ومشاركة البيانات',
          body: [
            'لا نبيع أو نؤجر أو نشارك بياناتكِ مع أي طرف ثالث لأغراض التسويق الخارجي نهائياً.',
            'تتم مشاركة بيانات العنوان ورقم الهاتف فقط مع مندوب التوصيل المعتمد لغرض إيصال شحنتكِ بنجاح.',
          ],
        },
      ],
    },
    en: {
      title: 'Privacy Policy & Data Protection',
      subtitle: 'Governed by Qatar Personal Data Privacy Protection Law No. 13 of 2016',
      lastUpdated: 'October 2026',
      sections: [
        {
          heading: '1. Information We Collect',
          body: [
            'We collect only the strictly necessary data to fulfil orders: Full Name, Qatar phone number, shipping address (Zone, Street, Building), and email for invoice delivery.',
            'We do not store payment card details on our servers; transactions are processed securely via Qatar Central Bank licensed payment gateways.',
          ],
        },
        {
          heading: '2. Data Usage & Disclosure',
          body: [
            'We never sell, rent, or trade your personal information with external advertisers.',
            'Contact and address details are shared solely with authorized courier drivers for fulfillment.',
          ],
        },
      ],
    },
  },
  terms: {
    ar: {
      title: 'الشروط والأحكام',
      subtitle: 'شروط استخدام المتجر الإلكتروني المرخص وفق القرارات المنظمة للتجارة الإلكترونية بدولة قطر',
      lastUpdated: 'أكتوبر 2026',
      sections: [
        {
          heading: '١. النطاق والترخيص القانوني',
          body: [
            'يخضع هذا المتجر الإلكتروني لكافة القوانين واللوائح المعمول بها في وزارة التجارة والصناعة بدولة قطر تحت السجل التجاري رقم [CR_NUMBER] ورخصة التجارة الإلكترونية رقم [ECOM_LICENSE_NUMBER].',
            'عمليات البيع والشراء تتم حصرياً عبر هذا الموقع الإلكتروني الموثق ولا يتم استلام أي دفعات مالية عبر الرسائل الخاصة في وسائل التواصل الاجتماعي.',
          ],
        },
        {
          heading: '٢. دقة الأسعار والشفافية',
          body: [
            'جميع الأسعار المعروضة في المتجر هي بالريال القطري (ر.ق)، وتوضح تفاصيل تكلفة المنتج ورسوم التوصيل بشكل جلي ومفصل قبل الضغط على زر الدفع النهائي.',
          ],
        },
      ],
    },
    en: {
      title: 'Terms & Conditions',
      subtitle: 'Commercial terms operating under Qatar E-Commerce Ministry Regulations',
      lastUpdated: 'October 2026',
      sections: [
        {
          heading: '1. Legal Status & Registration',
          body: [
            'This online store is legally registered under Qatar Ministry of Commerce & Industry with Commercial Registration [CR_NUMBER] and E-Commerce License [ECOM_LICENSE_NUMBER].',
            'All transactions are processed exclusively through this official website portal.',
          ],
        },
        {
          heading: '2. Pricing Transparency',
          body: [
            'All primary prices are stated in Qatari Riyals (QAR). Delivery fees are itemized clearly prior to final checkout authorization without hidden extras.',
          ],
        },
      ],
    },
  },
};
