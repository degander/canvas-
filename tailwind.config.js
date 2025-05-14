/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canva: {
          teal: '#00C4CC',
          blue: '#4B6FF7'
        }
      }
    },
  },
  plugins: [],
} 