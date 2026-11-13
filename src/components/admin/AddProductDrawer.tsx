'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Language } from '../../lib/i18n';
import { compressImageFile } from '../../lib/image-utils';
import { NewProductInput } from '../../lib/catalog-store';
import { Product } from '../../data/products';
import {
  X,
  Camera,
  Upload,
  Plus,
  Trash2,
  Check,
  Sparkles,
  AlertCircle,
  Tag,
  Palette,
} from 'lucide-react';

export interface AddProductDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  /** Add-mode save (used when no initialProduct is provided) */
  onAddProduct?: (product: NewProductInput) => void;
  /** Edit-mode save — receives the product id and updates */
  onUpdateProduct?: (id: string, updates: Partial<Product>) => void;
  /** When provided, the drawer opens in edit mode with this product prefilled */
  initialProduct?: Product | null;
  lang?: Language;
}

const PRESET_COLORS = [
  { id: 'peach', hex: '#FFC9A8', name: { ar: 'دراق ناعم', en: 'Soft Peach' } },
  { id: 'coral', hex: '#E8795A', name: { ar: 'مرجاني دافئ', en: 'Warm Coral' } },
  { id: 'cream', hex: '#FFF6EE', name: { ar: 'عاجي كريمي', en: 'Ivory Cream' } },
  { id: 'gold', hex: '#D4AF37', name: { ar: 'ذهبي ملكي', en: 'Royal Gold' } },
  { id: 'burgundy', hex: '#800020', name: { ar: 'عنابي خمري', en: 'Deep Burgundy' } },
  { id: 'navy', hex: '#1E3A8A', name: { ar: 'كحلي نيل', en: 'Nile Navy' } },
  { id: 'emerald', hex: '#065F46', name: { ar: 'زمردي', en: 'Emerald Green' } },
  { id: 'black', hex: '#1C1917', name: { ar: 'أسود ملكي', en: 'Regal Black' } },
];

const AVAILABLE_SIZES = [
  { id: 'free', label: 'Free Size (4.5m)' },
  { id: 's', label: 'S' },
  { id: 'm', label: 'M' },
  { id: 'l', label: 'L' },
  { id: 'xl', label: 'XL' },
  { id: 'xxl', label: 'XXL' },
];

export function AddProductDrawer({
  isOpen,
  onClose,
  onAddProduct,
  onUpdateProduct,
  initialProduct = null,
  lang = 'ar',
}: AddProductDrawerProps) {
  const isEditing = !!initialProduct;

  const isAr = lang === 'ar';
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [titleAr, setTitleAr] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [priceQAR, setPriceQAR] = useState('');
  const [originalPriceQAR, setOriginalPriceQAR] = useState('');
  const [category, setCategory] = useState<NewProductInput['category']>('toubs');
  const [stockCount, setStockCount] = useState('5');
  const [fabricAr, setFabricAr] = useState('فوال سويسري قطن 100%');
  const [fabricEn, setFabricEn] = useState('100% Swiss Cotton Voile');
  const [originAr, setOriginAr] = useState('صنع ومطرز يدوياً في الخرطوم، السودان');
  const [originEn, setOriginEn] = useState('Handcrafted in Khartoum, Sudan');
  const [descriptionAr, setDescriptionAr] = useState('');
  const [descriptionEn, setDescriptionEn] = useState('');
  const [selectedSizes, setSelectedSizes] = useState<string[]>(['free']);
  const [selectedColors, setSelectedColors] = useState<Array<{ id: string; name: { ar: string; en: string }; hex: string }>>([
    PRESET_COLORS[0],
    PRESET_COLORS[1],
  ]);
  const [customColorHex, setCustomColorHex] = useState('#F9A57B');
  const [customColorNameAr, setCustomColorNameAr] = useState('');
  const [customColorNameEn, setCustomColorNameEn] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [isCompressing, setIsCompressing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Prefill form when opening in edit mode; clear for add mode
  useEffect(() => {
    if (!isOpen) return;
    if (initialProduct) {
      setTitleAr(initialProduct.title.ar);
      setTitleEn(initialProduct.title.en);
      setPriceQAR(String(initialProduct.priceQAR));
      setOriginalPriceQAR(initialProduct.originalPriceQAR ? String(initialProduct.originalPriceQAR) : '');
      setCategory(initialProduct.category);
      setStockCount(String(initialProduct.stockCount));
      setFabricAr(initialProduct.fabric?.ar ?? '');
      setFabricEn(initialProduct.fabric?.en ?? '');
      setOriginAr(initialProduct.origin?.ar ?? '');
      setOriginEn(initialProduct.origin?.en ?? '');
      setDescriptionAr(initialProduct.description?.ar ?? '');
      setDescriptionEn(initialProduct.description?.en ?? '');
      setSelectedSizes(initialProduct.sizes?.map((sz) => sz.id) ?? ['free']);
      setSelectedColors(
        initialProduct.colors?.map((c) => ({ id: c.id, name: c.name, hex: c.hex })) ?? []
      );
      setImages(initialProduct.images ?? []);
      setErrorMsg('');
    } else {
      // Fresh form for add mode
      setTitleAr('');
      setTitleEn('');
      setPriceQAR('');
      setOriginalPriceQAR('');
      setCategory('toubs');
      setStockCount('5');
      setFabricAr('فوال سويسري قطن 100%');
      setFabricEn('100% Swiss Cotton Voile');
      setOriginAr('صنع ومطرز يدوياً في الخرطوم، السودان');
      setOriginEn('Handcrafted in Khartoum, Sudan');
      setDescriptionAr('');
      setDescriptionEn('');
      setSelectedSizes(['free']);
      setSelectedColors([PRESET_COLORS[0], PRESET_COLORS[1]]);
      setImages([]);
      setErrorMsg('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, initialProduct]);

  if (!isOpen) return null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsCompressing(true);
    setErrorMsg('');
    try {
      const compressedUrls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const dataUrl = await compressImageFile(file, 1000, 0.8);
        compressedUrls.push(dataUrl);
      }
      setImages((prev) => [...prev, ...compressedUrls]);
    } catch (err) {
      console.error(err);
      setErrorMsg(isAr ? 'حدث خطأ أثناء معالجة الصور، يرجى المحاولة مجدداً.' : 'Error processing image, please retry.');
    } finally {
      setIsCompressing(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const removeImage = (indexToRemove: number) => {
    setImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const moveImage = (idx: number, direction: 'up' | 'down') => {
    setImages((prev) => {
      const swapWith = direction === 'up' ? idx - 1 : idx + 1;
      if (swapWith < 0 || swapWith >= prev.length) return prev;
      const next = [...prev];
      [next[idx], next[swapWith]] = [next[swapWith], next[idx]];
      return next;
    });
  };

  const toggleSize = (sizeId: string) => {
    setSelectedSizes((prev) =>
      prev.includes(sizeId)
        ? prev.filter((s) => s !== sizeId)
        : [...prev, sizeId]
    );
  };

  const addColor = (color: typeof PRESET_COLORS[0]) => {
    if (!selectedColors.some((c) => c.hex === color.hex)) {
      setSelectedColors((prev) => [...prev, color]);
    }
  };

  const removeColor = (hex: string) => {
    setSelectedColors((prev) => prev.filter((c) => c.hex !== hex));
  };

  const handleAddCustomColor = () => {
    if (!customColorNameAr && !customColorNameEn) return;
    const newColor = {
      id: `col-${Date.now().toString(36)}`,
      hex: customColorHex,
      name: {
        ar: customColorNameAr || 'لون مخصص',
        en: customColorNameEn || 'Custom Color',
      },
    };
    setSelectedColors((prev) => [...prev, newColor]);
    setCustomColorNameAr('');
    setCustomColorNameEn('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!titleAr.trim() || !titleEn.trim()) {
      setErrorMsg(isAr ? 'يرجى إدخال اسم الثوب بالعربية والإنجليزية.' : 'Please enter titles in both Arabic and English.');
      return;
    }

    const priceNum = parseFloat(priceQAR);
    if (isNaN(priceNum) || priceNum <= 0) {
      setErrorMsg(isAr ? 'يرجى إدخال سعر صحيح بالريال القطري.' : 'Please enter a valid price in QAR.');
      return;
    }

    const stockNum = parseInt(stockCount, 10);
    if (isNaN(stockNum) || stockNum < 0) {
      setErrorMsg(isAr ? 'يرجى تحديد كمية مخزون صحيحة.' : 'Please enter a valid stock quantity.');
      return;
    }

    const baseProduct = {
      title: { ar: titleAr.trim(), en: titleEn.trim() },
      subtitle: {
        ar: fabricAr || 'أزياء سودانية راقية',
        en: fabricEn || 'Regal Sudanese Garment',
      },
      description: {
        ar: descriptionAr.trim() || `${titleAr.trim()} - قماش فاخر وجودة عالية ومطرز بأناقة للمناسبات والأفراح.`,
        en: descriptionEn.trim() || `${titleEn.trim()} - Premium Sudanese craftmanship and elegant traditional drape.`,
      },
      priceQAR: priceNum,
      originalPriceQAR: originalPriceQAR ? parseFloat(originalPriceQAR) : undefined,
      category,
      stockCount: stockNum,
      inStock: stockNum > 0,
      fabric: { ar: fabricAr.trim(), en: fabricEn.trim() },
      origin: { ar: originAr.trim(), en: originEn.trim() },
      colors: selectedColors.length > 0 ? selectedColors : [PRESET_COLORS[0]],
      sizes: selectedSizes.map((sId) => ({
        id: sId,
        label: AVAILABLE_SIZES.find((s) => s.id === sId)?.label || sId,
        available: true,
      })),
      images: images.length > 0 ? images : [
        'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&q=80',
      ],
    };

    if (isEditing && initialProduct) {
      onUpdateProduct?.(initialProduct.id, {
        ...baseProduct,
        // Preserve curated badge and care instructions in edit mode
        badge: initialProduct.badge || 'new',
        careInstructions: initialProduct.careInstructions || {
          ar: 'غسيل جاف فقط. الكي بحرارة متوسطة من الداخل.',
          en: 'Dry clean only. Iron on medium setting from reverse.',
        },
      });
      onClose();
      return;
    }

    if (onAddProduct) {
      onAddProduct({
        ...baseProduct,
        badge: 'new',
        careInstructions: {
          ar: 'غسيل جاف فقط. الكي بحرارة متوسطة من الداخل.',
          en: 'Dry clean only. Iron on medium setting from reverse.',
        },
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-cocoa-dark/60 backdrop-blur-xs">
      <div className="bg-cream w-full max-w-xl max-h-[92vh] sm:rounded-3xl rounded-t-3xl border border-peach-soft shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom duration-200">
        {/* Drawer Header */}
        <div className="px-5 py-4 bg-white border-b border-peach-soft flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-coral-warm/15 text-coral-ink flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-cocoa-dark font-display">
                {isEditing
                  ? isAr ? 'تعديل القطعة والصور' : 'Edit Product & Photos'
                  : isAr ? 'إضافة قطعة أو ثوب جديد' : 'Add New Garment / Product'}
              </h3>
              <p className="text-[11px] text-cocoa-muted">
                {isEditing
                  ? isAr ? 'تحديث السعر، المخزون، الوصف والصور — ستنعكس في المتجر فوراً' : 'Update price, stock, copy and photos — reflected in the shop instantly'
                  : isAr ? 'تصوير أو رفع محلي مع ضبط المقاسات والألوان' : 'Local upload with sizes, colors and stock'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-cocoa-muted hover:text-cocoa-dark hover:bg-cream-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body - Scrollable */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-5 text-xs">
          {errorMsg && (
            <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Section 1: Photos & Camera Upload */}
          <div className="space-y-2">
            <label className="font-bold text-cocoa-dark block font-display">
              {isAr ? 'صور الثوب (كاميرا الهاتف أو الألبوم المحلي)' : 'Product Photos (Camera or Photo Library)'}
            </label>
            <p className="text-[11px] text-cocoa-muted">
              {isAr
                ? 'يتم ضغط الصور تلقائياً داخل المتصفح لتوفير المساحة وسرعة التحميل'
                : 'Photos are automatically compressed client-side for fast loading'}
            </p>

            {/* Photo previews grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 pt-1">
              {images.map((imgUrl, idx) => (
                <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden border border-peach-soft group bg-white">
                  <img src={imgUrl} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-1 end-1 p-1 rounded-full bg-cocoa-dark/70 text-white hover:bg-rose-600 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  {idx === 0 && (
                    <span className="absolute bottom-1 start-1 text-[9px] bg-coral-ink text-white px-1.5 py-0.5 rounded-md font-bold">
                      {isAr ? 'الرئيسية' : 'Cover'}
                    </span>
                  )}
                  {images.length > 1 && (
                    <div className="absolute bottom-1 end-1 flex gap-0.5">
                      <button
                        type="button"
                        onClick={() => moveImage(idx, 'up')}
                        disabled={idx === 0}
                        className="p-0.5 rounded-md bg-white/85 text-cocoa-dark hover:text-burgundy text-[10px] font-black disabled:opacity-30 disabled:pointer-events-none"
                        aria-label="Move earlier"
                      >
                        ‹
                      </button>
                      <button
                        type="button"
                        onClick={() => moveImage(idx, 'down')}
                        disabled={idx === images.length - 1}
                        className="p-0.5 rounded-md bg-white/85 text-cocoa-dark hover:text-burgundy text-[10px] font-black disabled:opacity-30 disabled:pointer-events-none"
                        aria-label="Move later"
                      >
                        ›
                      </button>
                    </div>
                  )}
                </div>
              ))}

              {/* Upload trigger button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isCompressing}
                className="aspect-square rounded-2xl border-2 border-dashed border-peach-soft hover:border-coral-warm bg-white hover:bg-blush-surface/30 flex flex-col items-center justify-center gap-1 text-cocoa-muted hover:text-coral-ink transition-all p-2 text-center"
              >
                {isCompressing ? (
                  <span className="text-[10px] animate-pulse">
                    {isAr ? 'جاري الضغط...' : 'Compressing...'}
                  </span>
                ) : (
                  <>
                    <Camera className="w-5 h-5" />
                    <span className="text-[10px] font-semibold">
                      {isAr ? 'التقاط / رفع' : 'Add Photo'}
                    </span>
                  </>
                )}
              </button>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              multiple
              className="hidden"
            />
          </div>

          {/* Section 2: Bilingual Titles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-cocoa-dark block mb-1 font-display">
                {isAr ? 'عنوان الثوب بالعربية *' : 'Arabic Title *'}
              </label>
              <input
                type="text"
                required
                value={titleAr}
                onChange={(e) => setTitleAr(e.target.value)}
                placeholder="مثال: ثوب فوال سويسري مشجر"
                className="w-full px-3 py-2.5 rounded-xl bg-white border border-peach-soft text-cocoa-dark focus:outline-none focus:ring-2 focus:ring-coral-warm/20"
              />
            </div>
            <div>
              <label className="font-bold text-cocoa-dark block mb-1">
                {isAr ? 'اسم الثوب بالإنجليزية *' : 'Title in English *'}
              </label>
              <input
                type="text"
                required
                value={titleEn}
                onChange={(e) => setTitleEn(e.target.value)}
                placeholder="e.g. Royal Swiss Voile Floral Toub"
                className="w-full px-3 py-2.5 rounded-xl bg-white border border-peach-soft text-cocoa-dark focus:outline-none focus:ring-2 focus:ring-coral-warm/20"
              />
            </div>
          </div>

          {/* Section 3: Category, Price & Stock */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Category */}
            <div className="col-span-2 sm:col-span-1">
              <label className="font-bold text-cocoa-dark block mb-1 font-display">
                {isAr ? 'التصنيف' : 'Category'}
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as NewProductInput['category'])}
                className="w-full px-3 py-2.5 rounded-xl bg-white border border-peach-soft text-cocoa-dark focus:outline-none focus:ring-2 focus:ring-coral-warm/20"
              >
                <option value="toubs">{isAr ? 'تياب سودانية (Toubs)' : 'Toubs'}</option>
                <option value="jalabiyas">{isAr ? 'جلابيات (Jalabiyas)' : 'Jalabiyas'}</option>
                <option value="daraas">{isAr ? 'دراعات (Daraas)' : 'Daraas'}</option>
                <option value="dresses">{isAr ? 'فساتين سودانية' : 'Dresses'}</option>
                <option value="accessories">{isAr ? 'إكسسوارات وطرح' : 'Accessories'}</option>
              </select>
            </div>

            {/* Price QAR */}
            <div>
              <label className="font-bold text-cocoa-dark block mb-1 font-display">
                {isAr ? 'السعر (ر.ق) *' : 'Price (QAR) *'}
              </label>
              <input
                type="number"
                min="1"
                step="1"
                required
                value={priceQAR}
                onChange={(e) => setPriceQAR(e.target.value)}
                placeholder="1450"
                className="w-full px-3 py-2.5 rounded-xl bg-white border border-peach-soft text-cocoa-dark focus:outline-none focus:ring-2 focus:ring-coral-warm/20"
              />
            </div>

            {/* Original Price (optional) */}
            <div>
              <label className="font-semibold text-cocoa-muted block mb-1 font-display">
                {isAr ? 'السعر قبل الخصم' : 'Original Price'}
              </label>
              <input
                type="number"
                min="1"
                step="1"
                value={originalPriceQAR}
                onChange={(e) => setOriginalPriceQAR(e.target.value)}
                placeholder="1750"
                className="w-full px-3 py-2.5 rounded-xl bg-white border border-peach-soft text-cocoa-dark focus:outline-none focus:ring-2 focus:ring-coral-warm/20"
              />
            </div>

            {/* Initial Stock */}
            <div>
              <label className="font-bold text-cocoa-dark block mb-1 font-display">
                {isAr ? 'كمية المخزون *' : 'Stock Quantity *'}
              </label>
              <input
                type="number"
                min="0"
                required
                value={stockCount}
                onChange={(e) => setStockCount(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-white border border-peach-soft text-cocoa-dark focus:outline-none focus:ring-2 focus:ring-coral-warm/20"
              />
            </div>
          </div>

          {/* Section 4: Fabric & Origin */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-cocoa-dark block mb-1 font-display">
                {isAr ? 'نوع القماش (عربي)' : 'Fabric (Arabic)'}
              </label>
              <input
                type="text"
                value={fabricAr}
                onChange={(e) => setFabricAr(e.target.value)}
                placeholder="فوال سويسري مطرز، حرير طبيعي..."
                className="w-full px-3 py-2.5 rounded-xl bg-white border border-peach-soft text-cocoa-dark focus:outline-none focus:ring-2 focus:ring-coral-warm/20"
              />
            </div>
            <div>
              <label className="font-bold text-cocoa-dark block mb-1">
                {isAr ? 'نوع القماش (إنجليزي)' : 'Fabric (English)'}
              </label>
              <input
                type="text"
                value={fabricEn}
                onChange={(e) => setFabricEn(e.target.value)}
                placeholder="100% Swiss Voile, Pure Silk..."
                className="w-full px-3 py-2.5 rounded-xl bg-white border border-peach-soft text-cocoa-dark focus:outline-none focus:ring-2 focus:ring-coral-warm/20"
              />
            </div>
          </div>

          {/* Section 5: Sizes Selection */}
          <div className="space-y-1.5">
            <label className="font-bold text-cocoa-dark block font-display">
              {isAr ? 'المقاسات المتاحة' : 'Available Sizes'}
            </label>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_SIZES.map((sz) => {
                const active = selectedSizes.includes(sz.id);
                return (
                  <button
                    key={sz.id}
                    type="button"
                    onClick={() => toggleSize(sz.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all min-h-[38px] ${
                      active
                        ? 'bg-cocoa-dark text-white border-cocoa-dark shadow-xs'
                        : 'bg-white text-cocoa-dark border-peach-soft hover:bg-cream-50'
                    }`}
                  >
                    {sz.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 6: Colors Palette Selection */}
          <div className="space-y-2">
            <label className="font-bold text-cocoa-dark block font-display">
              {isAr ? 'ألوان القطعة المتوفرة' : 'Available Colors'}
            </label>

            {/* Active Selected Colors */}
            <div className="flex flex-wrap gap-2">
              {selectedColors.map((c) => (
                <div
                  key={c.hex}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white border border-peach-soft text-xs shadow-2xs"
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                    style={{ backgroundColor: c.hex }}
                  />
                  <span className="font-medium text-cocoa-dark">{c.name[lang]}</span>
                  <button
                    type="button"
                    onClick={() => removeColor(c.hex)}
                    className="text-cocoa-muted hover:text-rose-600 ms-1"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

            {/* Quick Add Presets */}
            <div className="pt-1">
              <span className="text-[11px] text-cocoa-muted block mb-1.5">
                {isAr ? 'إضافة سريعة من لوحة الألوان:' : 'Quick add from palette:'}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {PRESET_COLORS.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => addColor(preset)}
                    className="flex items-center gap-1 px-2 py-1 rounded-lg bg-cream-50 hover:bg-blush-surface border border-peach-soft/60 text-[11px] text-cocoa-dark"
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full border border-black/10"
                      style={{ backgroundColor: preset.hex }}
                    />
                    <span>{preset.name[lang]}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section 7: Optional Description */}
          <div>
            <label className="font-semibold text-cocoa-dark block mb-1 font-display">
              {isAr ? 'وصف القطعة (اختياري)' : 'Description (Optional)'}
            </label>
            <textarea
              rows={2}
              value={descriptionAr}
              onChange={(e) => setDescriptionAr(e.target.value)}
              placeholder="وصف تفاصيل الثوب، مناسبة الارتداء، التطريز..."
              className="w-full px-3 py-2 rounded-xl bg-white border border-peach-soft text-cocoa-dark focus:outline-none focus:ring-2 focus:ring-coral-warm/20 text-xs"
            />
          </div>

          {/* Sticky Drawer Footer */}
          <div className="pt-3 border-t border-peach-soft flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-2xl border border-peach-soft text-cocoa-dark hover:bg-cream-100 font-bold text-xs transition-colors"
            >
              {isAr ? 'إلغاء' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="flex-2 py-3 px-4 rounded-2xl bg-coral-ink hover:bg-coral-ink/90 text-white font-bold text-xs shadow-sm transition-transform active:scale-[0.98] flex items-center justify-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>{isEditing ? (isAr ? 'حفظ التعديلات' : 'Save Changes') : isAr ? 'حفظ ونشر القطعة' : 'Save & Publish Product'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
