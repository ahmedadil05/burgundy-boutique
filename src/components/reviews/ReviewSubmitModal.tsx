'use client';

import React, { useEffect, useState } from 'react';
import { Star, Loader2, CheckCircle2 } from 'lucide-react';
import { Language } from '@/lib/i18n';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Controls';

export interface ReviewSubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: Language;
  /** Optional hint for the piece being reviewed (e.g. product title) */
  itemHint?: string;
}

export function ReviewSubmitModal({ isOpen, onClose, lang = 'ar', itemHint }: ReviewSubmitModalProps) {
  const isAr = lang === 'ar';
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [item, setItem] = useState(itemHint || '');
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setItem(itemHint || '');
      setError(null);
      setSubmitted(false);
    }
  }, [isOpen, itemHint]);

  const reset = () => {
    setName('');
    setRating(5);
    setItem(itemHint || '');
    setText('');
    setError(null);
    setSubmitted(false);
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (text.trim().length < 15) {
      setError(isAr ? 'يرجى كتابة 15 حرفاً على الأقل عن تجربتكِ.' : 'Please write at least 15 characters about your experience.');
      return;
    }
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          authorName: name.trim(),
          rating,
          item: item.trim() || undefined,
          text: text.trim(),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data?.success) {
        setSubmitted(true);
      } else {
        setError(
          data?.error ||
            (isAr
              ? 'تعذر إرسال المراجعة. حاولي مرة أخرى.'
              : 'Could not submit your review. Please try again.')
        );
      }
    } catch {
      setError(
        isAr
          ? 'تعذر الاتصال بالخادم. يرجى المحاولة مرة أخرى.'
          : 'Could not reach the server. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={isAr ? 'شاركينا رأيكِ' : 'Share Your Experience'}
      maxWidth="md"
    >
      {submitted ? (
        <div className="text-center py-4 space-y-4">
          <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h4 className="text-base font-bold text-burgundy font-display">
            {isAr ? 'وصلت مراجعتكِ بنجاح' : 'Your review was received'}
          </h4>
          <p className="text-xs text-slateText-secondary leading-relaxed">
            {isAr
              ? 'شكراً لكِ! ستظهر مراجعتكِ في المتجر بعد مراجعة دار بيرغندي واعتمادها.'
              : 'Thank you! Your review will appear in the boutique once BURGUNDY has reviewed and approved it.'}
          </p>
          <Button variant="secondary" onClick={reset} className="border-gold-hairline text-burgundy">
            {isAr ? 'ممتاز' : 'Done'}
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label={isAr ? 'اسمكِ الكريم *' : 'Your name *'}
            required
            placeholder={isAr ? 'مثال: نورة المري' : 'e.g. Noora Al-Marri'}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <div>
            <label className="block text-xs font-semibold text-cocoa-dark mb-1.5">
              {isAr ? 'تقييمكِ *' : 'Your rating *'}
            </label>
            <div className="flex items-center gap-1.5" role="radiogroup" aria-label={isAr ? 'التقييم بالنجوم' : 'Star rating'}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  role="radio"
                  aria-checked={rating === star}
                  aria-label={`${star} ${isAr ? 'نجوم' : 'stars'}`}
                  className="p-1 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-burgundy"
                >
                  <Star
                    className={`w-6 h-6 transition-all ${
                      star <= rating ? 'fill-gold-ink stroke-gold-ink' : 'stroke-gold-ink/40'
                    }`}
                  />
                </button>
              ))}
              <span className="text-xs font-bold text-burgundy font-mono ms-2">{rating}/5</span>
            </div>
          </div>

          <Input
            label={isAr ? 'القطعة التي تتحدثين عنها' : 'Piece you are reviewing'}
            placeholder={isAr ? 'مثال: الثوب السويسري الملكي' : 'e.g. Royal Swiss Voile Toub'}
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />

          <Textarea
            label={isAr ? 'تجربتكِ مع الدار *' : 'Your experience *'}
            required
            rows={4}
            placeholder={isAr
              ? 'الخامة، التطريز، سرعة التوصيل، التغليف، التواصل مع الأتيليه…'
              : 'The fabric, embroidery, delivery, packaging, atelier communication…'}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          {error && (
            <div role="alert" className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-[11px] font-medium text-center">
              {error}
            </div>
          )}

          <Button type="submit" variant="primary" size="lg" disabled={isSubmitting} className="w-full bg-burgundy text-white hover:bg-burgundy-hover">
            {isSubmitting ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                {isAr ? 'جاري الإرسال...' : 'Submitting…'}
              </span>
            ) : (
              isAr ? 'إرسال المراجعة' : 'Submit Review'
            )}
          </Button>
        </form>
      )}
    </Modal>
  );
}
