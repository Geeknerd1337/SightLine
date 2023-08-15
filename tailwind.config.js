/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      flexGrow: {
        2: '2'
      },
      fontSize: {
        '4.5xl': '2.7465rem'
      },
      inset: {
        34: '8.5rem'
      }
    },
  },
  plugins: [],
}
