/** @type {import('tailwindcss').Config} */
export default {
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
      }
    },
  },
  plugins: [],
}

