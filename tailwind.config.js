/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      dropShadow: {
        "center": "0 0 8px rgba(0, 0, 0, 0.25)"
      }
    }
  },
  plugins: [
    require('flowbite/plugin')
  ],
}