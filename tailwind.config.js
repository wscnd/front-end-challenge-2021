/* eslint @typescript-eslint/no-var-requires: "off" */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontWeight: ['hover', 'focus'],
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: '#293845',
        secondary: '#9FAEBB',
        bg: '#F7F9FA',
        'bg-2': '#DFE6ED',
        'table-bg': '#C3CFD9',
      },
      tableLayout: ['hover', 'focus'],
      keyframes: {
        'spin-horario': {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
      },
      animation: {
        'spin-h': 'spin-horario 4s linear infinite',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    // ...
  ],
};
