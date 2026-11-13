import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand Primary Tokens
        burgundy: {
          DEFAULT: '#5F0F40', // Sampled primary brand color
          deep: '#421417',    // Velvet Instagram avatar shadow shade
          hover: '#4D0A33',
          light: '#7F1D5A',
          subtle: 'rgba(95, 15, 64, 0.08)',
        },
        // Gold hairline accent
        gold: {
          DEFAULT: '#D9B97A',
          line: '#D9B97A',
          // `hairline` powers `border-gold-hairline/*` and `bg-gold-hairline/*`
          hairline: '#D9B97A',
          soft: '#EED9AD',
          shimmer: '#C9A35F',
          // Accessible text-safe gold (>=4.5:1 on canvas/white)
          ink: '#8A6A2F',
        },
        // Base & Background Tokens
        canvas: {
          DEFAULT: '#FBFEFB',
          white: '#FFFFFF',
          warm: '#EFE5DC',
        },
        // Surfaces & Cards
        surface: {
          peachSoft: '#F3D8C7',
          peachMuted: '#D0B8AC',
          cream: '#FFFBF7',
        },
        // Legacy blush surface used by primitives/admin
        blush: {
          surface: '#FFE5D4',
        },
        // Typography & Slate Tokens
        slateText: {
          body: '#4E5166',
          secondary: '#495867',
        },
        // Peach Sorbet & Coral Highlights
        peach: {
          sorbet: '#FFC9A8',
          soft: '#FFC9A8',
          glow: '#F9A57B',
          deep: '#F9A57B',
        },
        coral: {
          DEFAULT: '#E8795A',
          warm: '#E8795A',
          hover: '#D96848',
          // Accessible coral for text and filled badges (>=4.5:1 with white)
          ink: '#B4472C',
        },
        // Backward-compatibility aliases for existing components
        cream: {
          DEFAULT: '#FBFEFB',
          50: '#FFFBF7',
          100: '#F7EFE7',
          light: '#FFFFFF',
          warm: '#EFE5DC',
        },
        cocoa: {
          dark: '#4E5166',
          muted: '#495867',
          light: '#D0B8AC',
        },
      },
      fontFamily: {
        // Direction-aware display/body: Latin = serif/sans, Arabic = Amiri (RTL override in globals.css)
        display: ['var(--font-cormorant)', 'serif'],
        body: ['var(--font-jakarta)', 'sans-serif'],
        cormorant: ['var(--font-cormorant)', 'serif'],
        jakarta: ['var(--font-jakarta)', 'sans-serif'],
        amiri: ['var(--font-amiri)', 'serif'],
      },
      boxShadow: {
        soft: '0 4px 25px -4px rgba(78, 81, 102, 0.08)',
        luxury: '0 10px 40px -6px rgba(95, 15, 64, 0.12)',
        gold: '0 0 15px rgba(217, 185, 122, 0.25)',
        warm: '0 6px 20px -6px rgba(232, 121, 90, 0.32)',
        'warm-lg': '0 12px 32px -8px rgba(232, 121, 90, 0.38)',
      },
      borderWidth: {
        hairline: '0.75px',
      },
      backgroundImage: {
        'fabric-pattern':
          'radial-gradient(rgba(217, 185, 122, 0.14) 1px, transparent 0)',
      },
      backgroundSize: {
        'fabric-pattern': '24px 24px',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        scaleUp: {
          from: { opacity: '0', transform: 'scale(0.96)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        slideInEnd: {
          from: { opacity: '0', transform: 'translateX(16px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 200ms ease-out',
        fadeIn: 'fadeIn 200ms ease-out',
        'scale-up': 'scaleUp 240ms cubic-bezier(0.16, 1, 0.3, 1)',
        scaleUp: 'scaleUp 240ms cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-in-end': 'slideInEnd 260ms cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
