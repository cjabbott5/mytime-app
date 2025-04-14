/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 🎨 Your existing colors
        primary: '#fe7191',
        secondary: '#f2b4c8',

        // 🌈 Theme color palette (used for user settings)
        theme: {
          purple: '#7c3aed',
          blue: '#2563eb',
          yellow: '#facc15',
          green: '#10b981',
          mauve: {
            100: "#f3e8ee",
            500: "#b185a7",
            700: "#6d3d7a",
          },
          
        },
      },
      fontFamily: {
        sans: ['"Inter"', ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        floatDown: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(300px)', opacity: '0' },
        },
      },
      animation: {
        'float-down': 'floatDown 3s linear forwards',
      },
    },
  },
  plugins: [],
};
