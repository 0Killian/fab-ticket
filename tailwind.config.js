/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/**/*.{html,hbs}",  // Adjust this if your Handlebars files are in a different directory
    "./src/**/*.{html,js}",     // Adjust this if needed
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),  // Include this only if you have installed the plugin
  ],
}