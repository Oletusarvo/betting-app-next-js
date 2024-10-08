const colors = require('./colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors,
      screens: {
        xs: '411px',
      },

      keyframes: {
        'slide-in-from-left': {
          '0%': { transform: 'translateX(-50px)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },

        'slide-in-from-bottom': {
          '0%': { transform: 'translateY(50px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },

        'fade-in-fast': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },

      animation: {
        'slide-in-from-left': 'slide-in-from-left 0.3s ease',
        'slide-in-from-bottom': 'slide-in-from-bottom 0.3s ease',
        'fade-in-fast': 'fade-in-slow 0.6s ease',
      },
    },
  },
  plugins: [],
};
