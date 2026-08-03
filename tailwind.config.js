/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        // Strict Enforcement: Minimum font size 14px across whole web app
        xs: ['0.875rem', { lineHeight: '1.25rem' }], // 14px minimum
        sm: ['0.875rem', { lineHeight: '1.25rem' }], // 14px
        base: ['1rem', { lineHeight: '1.5rem' }],    // 16px
        lg: ['1.125rem', { lineHeight: '1.75rem' }], // 18px
        xl: ['1.25rem', { lineHeight: '1.75rem' }],  // 20px
        '2xl': ['1.5rem', { lineHeight: '2rem' }],   // 24px
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
      },
      colors: {
        brand: {
          50: '#fff5f0',
          100: '#ffe8dc',
          200: '#ffd0b8',
          300: '#ffa885',
          400: '#ff7448',
          500: '#FF4F00', // Core RankTop Brand Orange
          600: '#e63d00',
          700: '#bf2c00',
          800: '#992403',
          900: '#7c2109',
        },
        dark: {
          bg: '#0B0F17',
          card: '#131924',
          border: '#232D3F',
          muted: '#8A99AD',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'pulse-fast': 'pulse 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}
