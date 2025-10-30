module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      backgroundImg: {
        "conic-left-right": "conic-gradient(at left center, )"
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
