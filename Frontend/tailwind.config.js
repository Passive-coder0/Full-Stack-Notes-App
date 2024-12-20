/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enable dark mode by class
  mode: 'jit',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Colors used in my project
      colors: {
        primary : "#2B85FF",
        secondary : "#EF863E"
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

