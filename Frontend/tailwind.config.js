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
      animation: {
        'gradient-x': 'gradient-x 8s ease-in-out infinite',
        'gradient-y': 'gradient-y 12s ease-in-out infinite reverse',
        'gradient-x-alt': 'gradient-x-alt 6s ease-in-out infinite',
        'gradient-y-alt': 'gradient-y-alt 10s ease-in-out infinite reverse',
        'wave-1': 'wave-1 15s ease-in-out infinite',
        'wave-2': 'wave-2 20s ease-in-out infinite reverse',
        'wave-3': 'wave-3 25s ease-in-out infinite',
      },
      keyframes: {
        'wave-1': {
          '0%, 100%': {
            transform: 'translateX(-100px) translateY(-50px) rotate(0deg) scale(1)',
            opacity: '0.6',
          },
          '33%': {
            transform: 'translateX(100px) translateY(30px) rotate(2deg) scale(1.1)',
            opacity: '0.8',
          },
          '66%': {
            transform: 'translateX(-50px) translateY(60px) rotate(-1deg) scale(0.9)',
            opacity: '0.7',
          },
        },
        'wave-2': {
          '0%, 100%': {
            transform: 'translateX(80px) translateY(40px) rotate(1deg) scale(1.1)',
            opacity: '0.5',
          },
          '50%': {
            transform: 'translateX(-80px) translateY(-40px) rotate(-2deg) scale(0.8)',
            opacity: '0.9',
          },
        },
        'wave-3': {
          '0%, 100%': {
            transform: 'translateX(-60px) translateY(20px) rotate(-0.5deg) scale(0.9)',
            opacity: '0.4',
          },
          '25%': {
            transform: 'translateX(40px) translateY(-30px) rotate(1.5deg) scale(1.2)',
            opacity: '0.6',
          },
          '75%': {
            transform: 'translateX(60px) translateY(50px) rotate(-1deg) scale(1)',
            opacity: '0.5',
          },
        },
        'gradient-x': {
          '0%, 100%': {
            transform: 'translateX(-50%)',
            opacity: '0.3',
          },
          '50%': {
            transform: 'translateX(50%)',
            opacity: '0.6',
          },
        },
        'gradient-y': {
          '0%, 100%': {
            transform: 'translateY(-30%)',
            opacity: '0.2',
          },
          '50%': {
            transform: 'translateY(30%)',
            opacity: '0.5',
          },
        },
        'gradient-x-alt': {
          '0%, 100%': {
            transform: 'translateX(-30%) scale(1.1)',
            opacity: '0.4',
          },
          '50%': {
            transform: 'translateX(30%) scale(1.2)',
            opacity: '0.7',
          },
        },
        'gradient-y-alt': {
          '0%, 100%': {
            transform: 'translateY(-20%) rotate(0deg)',
            opacity: '0.3',
          },
          '50%': {
            transform: 'translateY(20%) rotate(2deg)',
            opacity: '0.6',
          },
        },
      },
    },
  },
  plugins: [],
}

