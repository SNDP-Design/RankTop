/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff5f0',
          100: '#ffe8dc',
          200: '#ffd0b8',
          300: '#ffa885',
          400: '#ff7448',
          500: '#FF4F00', // Core SEOSorted Brand Orange
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
