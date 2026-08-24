/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f0f7f1', 100: '#dcebe0', 200: '#b9d7c0', 300: '#8ebba0',
          400: '#5e9475', 500: '#3c7457', 600: '#2b5a44', 700: '#234837',
          800: '#1d3a2d', 900: '#172e24', 950: '#0c1c16',
        },
        cream: {
          50: '#fffef8', 100: '#fdf9ec', 200: '#faf0d4', 300: '#f5e3b3',
          400: '#eecf86', 500: '#e7ba5e', 600: '#dba045', 700: '#b97c39',
          800: '#976234', 900: '#7d5230', 950: '#452c17',
        },
        gold: {
          50: '#fbf7e6', 100: '#f6ecc4', 200: '#edd98a', 300: '#e4c551',
          400: '#dab52f', 500: '#c99a1c', 600: '#a87616', 700: '#865715',
          800: '#6f4519', 900: '#5e3a19', 950: '#371f0c',
        },
        saffron: {
          50: '#fff7ed', 100: '#ffedd5', 200: '#fed7aa', 300: '#fdba74',
          400: '#fb923c', 500: '#f97316', 600: '#ea580c', 700: '#c2410c',
          800: '#9a3412', 900: '#7c2d12', 950: '#431407',
        },
        maroon: {
          50: '#fdf2f2', 100: '#fce4e4', 200: '#facece', 300: '#f3aaa8',
          400: '#e87b79', 500: '#d65150', 600: '#c03736', 700: '#9f2b2a',
          800: '#842828', 900: '#6f2727', 950: '#3b1010',
        },
        brown: {
          50: '#faf6f2', 100: '#f3ebe1', 200: '#e6d5c2', 300: '#d6b89c',
          400: '#c2966f', 500: '#a87a52', 600: '#8a6242', 700: '#6f4f38',
          800: '#5b4130', 900: '#4b3829', 950: '#291d14',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        deva: ['"Noto Serif Devanagari"', 'serif'],
      },
      boxShadow: {
        'gold': '0 0 24px -4px rgba(201, 154, 28, 0.45)',
        'gold-lg': '0 0 50px -8px rgba(201, 154, 28, 0.6)',
        'card': '0 8px 30px -12px rgba(0,0,0,0.25)',
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
        'spin-slow': { to: { transform: 'rotate(360deg)' } },
        'pulse-glow': { '0%,100%': { opacity: '0.4' }, '50%': { opacity: '1' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        'petal-fall': { '0%': { transform: 'translateY(-10%) rotate(0)', opacity: '0' }, '10%': { opacity: '0.9' }, '100%': { transform: 'translateY(110vh) rotate(360deg)', opacity: '0' } },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'spin-slow': 'spin-slow 24s linear infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
        'petal-fall': 'petal-fall 12s linear infinite',
      },
    },
  },
  plugins: [],
};
