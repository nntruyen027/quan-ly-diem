/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{html,js,jsx}',],
  theme: {
    screens: {
      'xs': '300px',
      ...defaultTheme.screens,
    },
    extend: {
    },
  },
  plugins: [],
};