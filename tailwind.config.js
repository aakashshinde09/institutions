/** @type {import('tailwindcss').Config} */
//const colors = require('tailwindcss/colors')
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  corePlugins: {
    preflight: false,
  },
  theme: {
    screens: {
      sm: '456px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      xxl: '1440px',
    },

    colors: {
      transparent: 'transparent',
      white: '#ffffff',
      black: '#000000',
      muted: '#838383',
      primary: '#095845',
      primary2: '#0D8064',
      'primary-muted': '#d0cef8',
      background: '#f2f4f6',
      gray: '#595959',
      grey: '#EDEDED',
      accent: '#DAD6FF',
      warning: '#fa5279',
      success: '#34FF54',
    },

    extend: {
      fontFamily: {
        jakarta: ['var(--font-jakarta)', ...fontFamily.sans],
      },

      borderRadius: {
        '2.5xl': '1.25rem',
        '4xl': '2.25rem',
        sl: '3.125rem',
      },
    },
  },
  plugins: [],
}
