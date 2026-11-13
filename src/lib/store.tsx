'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { Language } from './i18n';
import { Currency } from './currency';

export interface CartItem {
  id: string;
  slug: string;
  title: { ar: string; en: string };
  priceQAR: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
}

export interface StoreState {
  language: Language;
  currency: Currency;
  cart: CartItem[];
  wishlist: string[]; // product IDs
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  setLanguage: (lang: Language) => void;
  setCurrency: (curr: Currency) => void;
  addToCart: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeFromCart: (id: string, size: string) => void;
  updateQuantity: (id: string, size: string, delta: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  cartTotalQAR: number;
  cartCount: number;
}

const StoreContext = createContext<StoreState | null>(null);

export function StoreProvider({
  children,
  initialLang = 'ar',
}: {
  children: React.ReactNode;
  initialLang?: Language;
}) {
  const [language, setLanguageState] = useState<Language>(initialLang);
  const [currency, setCurrencyState] = useState<Currency>('QAR');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  // Load from local storage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('kandaka_cart');
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem('kandaka_wishlist');
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      const savedCurr = localStorage.getItem('kandaka_currency') as Currency;
      if (savedCurr && ['QAR', 'USD', 'SDG'].includes(savedCurr)) {
        setCurrencyState(savedCurr);
      }
    } catch {
      // Ignore SSR/storage error
    }
  }, []);

  // Save changes
  useEffect(() => {
    try {
      localStorage.setItem('kandaka_cart', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('kandaka_wishlist', JSON.stringify(wishlist));
    } catch {}
  }, [wishlist]);

  const setCurrency = (curr: Currency) => {
    setCurrencyState(curr);
    try {
      localStorage.setItem('kandaka_currency', curr);
    } catch {}
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  };

  const addToCart = (item: Omit<CartItem, 'quantity'>, quantity = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (i) => i.id === item.id && i.size === item.size
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      }
      return [...prev, { ...item, quantity }];
    });
  };

  const removeFromCart = (id: string, size: string) => {
    setCart((prev) => prev.filter((i) => !(i.id === id && i.size === size)));
  };

  const updateQuantity = (id: string, size: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id && item.size === size) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const cartTotalQAR = cart.reduce((sum, item) => sum + item.priceQAR * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <StoreContext.Provider
      value={{
        language,
        currency,
        cart,
        wishlist,
        isCartOpen,
        setIsCartOpen,
        openCart,
        closeCart,
        toggleCart,
        setLanguage,
        setCurrency,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        cartTotalQAR,
        cartCount,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore(): StoreState {
  const context = useContext(StoreContext);
  if (!context) {
    // Fallback default state for static / unit test contexts
    return {
      language: 'ar',
      currency: 'QAR',
      cart: [],
      wishlist: [],
      isCartOpen: false,
      setIsCartOpen: () => {},
      openCart: () => {},
      closeCart: () => {},
      toggleCart: () => {},
      setLanguage: () => {},
      setCurrency: () => {},
      addToCart: () => {},
      removeFromCart: () => {},
      updateQuantity: () => {},
      clearCart: () => {},
      toggleWishlist: () => {},
      isInWishlist: () => false,
      cartTotalQAR: 0,
      cartCount: 0,
    };
  }
  return context;
}
