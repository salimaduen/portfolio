/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        linux: ['"CP437']
      },
      backgroundImage: {
        'ubuntu-wallpaper': "url('./src/assets/ubuntu-wallpaper.jpg')",
        'ubuntu-wallpaper-phone': "url('./src/assets/ubuntu-wallpaper-phone.png')"
      }
    },
  },
  plugins: [],
}