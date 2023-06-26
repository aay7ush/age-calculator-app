/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.{html,js}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        'clr-purple': 'hsl(259, 100%, 65%)',
        'clr-light-red': 'hsl(0, 100%, 67%)',
        'clr-white': 'hsl(0, 0%, 100%)',
        'clr-off-white': 'hsl(0, 0%, 94%)',
        'clr-light-grey': 'hsl(0, 0%, 86%)',
        'clr-smokey-grey': 'hsl(0, 1%, 44%)',
        'clr-off-black': 'hsl(0, 0%, 8%)',
      },
    },
  },
  plugins: [],
}
