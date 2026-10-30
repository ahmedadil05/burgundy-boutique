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
        peach: {
          soft: '#FFC9A8',
          deep: '#F9A57B',
        },
        coral: {
          warm: '#E8795A',
          hover: '#D96848',
        },
        cream: {
          DEFAULT: '#FFF6EE',
          light: '#FFFBF7',
        },
        blush: {
          surface: '#FFE5D4',
          subtle: '#FFF0E6',
        },
        cocoa: {
          dark: '#3B2A24',
          muted: '#725447',
          light: '#A68C81',
        },
      },
      fontFamily: {
        cairo: ['var(--font-cairo)', 'sans-serif'],
        tajawal: ['var(--font-tajawal)', 'sans-serif'],
        playfair: ['var(--font-playfair)', 'serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
      boxShadow: {
        warm: '0 4px 20px -2px rgba(232, 121, 90, 0.12)',
        'warm-lg': '0 10px 30px -4px rgba(232, 121, 90, 0.18)',
      },
    },
  },
  plugins: [],
};

export default config;
