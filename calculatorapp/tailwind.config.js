const autoprefixer = require("autoprefixer");
const tailwindcss = require("tailwindcss");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}", "./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      dropShadow: {
        "3xl": "0 0 10px rgba(254, 241, 96,1)",
      },
    },
  },
  plugins: [tailwindcss, autoprefixer],
};
