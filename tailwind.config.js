const json = require('./units.json')
// console.log(json)
module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        'mdx': '811px',
        '3xl': '1920px',
      },
      spacing:json,
      maxWidth:json,
      minWidth:json,
      maxHeight:json,
      minHeight:json,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}