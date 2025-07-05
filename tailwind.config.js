/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'search-icon': "url('./search-icon.png')"
      },
      backgroundSize: {
        '16px': '16px 16px'
      },
      backgroundPosition: {
        'left-3': '12px center'
      }
    },
  },
  plugins: [],
}
