/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f4f7f5',
          100: '#e2eae4',
          200: '#c7d7cc',
          300: '#a3beac',
          400: '#7ba087',
          500: '#5b8268',
          600: '#466851',
          700: '#3a5342',
          800: '#2c3b2e', // Matching original Journal theme header text
          950: '#151e17',
        },
        sage: {
          50: '#f5f7f5',
          100: '#eaeaea', // Matching original Journal theme background
          200: '#d9e4dd', // Matching original Journal theme border
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'pulse-soft': 'pulseSoft 3s infinite ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(0.98)' },
        }
      }
    },
  },
  plugins: [],
}
