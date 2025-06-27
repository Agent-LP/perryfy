/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          perry: '#FF6B35',
        },
        blue: {
          perryDark: '#004E89',
          perryLight: '#3A86FF',
        },
        gray: {
          perryDark: '#2D3436',
        },
      },
    },
  },
  plugins: [],
}