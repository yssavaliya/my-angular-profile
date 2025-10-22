/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundColor: {
        'gray-900': '#111827',
        'gray-700': '#374151',
        'gray-800': '#1F2937',
      },
      textColor: {
        'gray-100': '#F3F4F6',
        'gray-400': '#9CA3AF',
      }
    },
  },
  plugins: [],
};
