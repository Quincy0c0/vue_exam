/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Microsoft YaHei', 'sans-serif']
    },
    extend: {
      colors: {
        'weather-primary': 'rgb(0, 102, 138)',
        'weather-secondary': 'rgb(0, 78, 113)'
      }
    }
  },
  plugins: []
}
