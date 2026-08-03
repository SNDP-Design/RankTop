/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Only use Inter font family
        sans: ['Inter', 'sans-serif'],
        mono: ['Inter', 'sans-serif'],
      },
      fontSize: {
        // Strict Enforcement: Only 14px, 16px, 18px, 20px font sizes allowed
        xs: ['14px', { lineHeight: '20px' }],
        sm: ['14px', { lineHeight: '20px' }],
        base: ['16px', { lineHeight: '24px' }],
        lg: ['18px', { lineHeight: '26px' }],
        xl: ['20px', { lineHeight: '28px' }],
        '2xl': ['20px', { lineHeight: '28px' }],
        '3xl': ['20px', { lineHeight: '28px' }],
        '4xl': ['20px', { lineHeight: '28px' }],
        '5xl': ['20px', { lineHeight: '28px' }],
      },
      colors: {
        // Supabase Emerald Green Theme
        brand: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#34d399',
          500: '#3ECF8E', // Official Supabase Green
          600: '#24B47E',
          700: '#059669',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },
        dark: {
          bg: '#121212',      // Supabase Deep Charcoal
          card: '#171717',    // Supabase Dark Card
          surface: '#1F1F1F', // Supabase Surface
          border: '#2A2A2A',  // Supabase Border
          muted: '#A1A1AA',
        }
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
