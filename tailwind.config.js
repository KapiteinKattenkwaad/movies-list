module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.vue',
    './src/**/*.jsx',
  ],
  darkMode: 'class', // or 'media' or 'class',
  darkSelector: ".dark",
  theme: {
    colors: {
      background: {
        'primary': 'var(--bg-background-primary)',
      },

      'dark-blue': 'hsl(209, 23%, 22%)',
      'darker-blue': 'hsl(207, 26%, 17%)',
      'dark-blue-light': 'hsl(200, 15%, 8%)',
      'dark-grey': 'hsl(0, 0%, 52%)',
      'dark-blue-light': 'hsl(0, 0%, 98%)',
      'white': 'hsl(0, 0%, 100%)',
    },
    copy: {
      'primary': 'var(--text-copy-primary)',
    },
      fontFamily: {
          'sans': ['Nunito', 'Sans-serif']
      },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('tailwindcss-dark-mode')()
  ],
}
