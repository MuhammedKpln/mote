import { nextui } from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    '../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        motePrimary: 'rgb(var(--color-primary) / <alpha-value>)',
        moteSurface: 'rgb(var(--color-surface) / <alpha-value>)',
      }
    },
  },
  plugins: [],
  darkMode: "class",
  plugins: [nextui()]
}