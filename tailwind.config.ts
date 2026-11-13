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
          soft: '#EED9AD',
          shimmer: '#C9A35F',
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
        },
        // Backward-compatibility aliases for existing components
        cream: {
          DEFAULT: '#FBFEFB',
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
        amiri: ['var(--font-amiri)', 'serif'],
        almarai: ['var(--font-almarai)', 'sans-serif'],
        cormorant: ['var(--font-cormorant)', 'serif'],
        jakarta: ['var(--font-jakarta)', 'sans-serif'],
        cairo: ['var(--font-cairo)', 'sans-serif'],
        tajawal: ['var(--font-tajawal)', 'sans-serif'],
        playfair: ['var(--font-playfair)', 'serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 25px -4px rgba(78, 81, 102, 0.08)',
        luxury: '0 10px 40px -6px rgba(95, 15, 64, 0.12)',
        gold: '0 0 15px rgba(217, 185, 122, 0.25)',
      },
      borderWidth: {
        hairline: '0.75px',
      },
    },
  },
  plugins: [],
};

export default config;
