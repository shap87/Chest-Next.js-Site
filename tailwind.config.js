const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      padding: '1rem',
      center: true,
    },
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: '#475467',
        second: '#344054',
        main: {
          25: '#FFF4FA',
          50: '#FFEBF6',
          100: '#FFC2E4',
          200: '#FF9AD4',
          250: '#FF53D2',
          300: '#FF46AF',
          400: '#FF1F9E',
          500: '#FF0098',
          600: '#E0007F',
          700: '#CC0174',
          800: '#B60168',
          900: '#A3015C',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
