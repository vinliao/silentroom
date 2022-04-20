const defaultMono = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.svelte'],
  theme: {
    extend: {
      fontFamily: {
        mono: ["'JetBrains Mono'", ...defaultMono.fontFamily.mono],
        sans: ["'Roboto'", ...defaultMono.fontFamily.sans]
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}