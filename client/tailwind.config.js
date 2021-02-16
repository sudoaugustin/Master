module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      xs: '400px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {
      colors: {
        cyan: '#9cdbff',
        primary: {
          100: '#D6E4FF',
          200: '#ADC8FF',
          300: '#84A9FF',
          400: '#6690FF',
          500: '#3366FF',
          600: '#254EDB',
          700: '#1939B7',
          800: '#102693',
          900: '#091A7A',
        },
        secondary: '#49d9f8',
        success: '#00e676',
        info: '#304ffe',
        error: '#f44336',
        warning: '#fb8c00',
        clear: 'rgba(0, 0, 0, 0)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
