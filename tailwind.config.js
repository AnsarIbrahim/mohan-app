/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      maxWidth: {
        'custom-lg': '46rem',
        'sm-screen': '40rem',
      },
    },
  },
  plugins: [],
};
