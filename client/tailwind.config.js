/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    screens: {
      '0.5sm': '500px',
      'sm': '640px',
      'md': '768px',
      '1.5md': '770px',
      'lg': '1280px',
      'xl': '1280px',
      '1.5xl': '1430px',
      '1.8xl': '1507px',
      '2xl': '1536px',
    }
  },
  plugins: [],
}
