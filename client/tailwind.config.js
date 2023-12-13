/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        accent: {
          '50': '#eef2ff',
          '100': '#d9e2ff',
          '200': '#bccdff',
          '300': '#8eadff',
          '400': '#5980ff',
          '500': '#3657ff', 
          '600': '#1b30f5',
          '700': '#141ee1',
          '800': '#171ab6',
          '900': '#191e8f',
          '950': '#141557', // default
        },
        primary : {
          '50': '#f4f7f7',
          '100': '#e3e9ea',
          '200': '#c9d4d8',
          '300': '#a4b6bc',
          '400': '#779099',
          '500': '#5c747e', // default
          '600': '#4f626b',
          '700': '#44525a',
          '800': '#3d474d',
          '900': '#363d43',
          '950': '#171b1e',
        }
      },

      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}