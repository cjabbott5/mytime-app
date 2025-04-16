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
        // 🎨 Main Loop Theme
        loop: {
          primary: '#84BFF7',     // Light sky blue
          secondary: '#D6E9FF',   // Soft cloud blue
          accent: '#3C7DC4',      // Stronger blue
          highlight: '#EAF6FF',   // Pale highlight
          dark: '#1C3F66',        // Deep contrast text
          neutral: '#F8FBFF',     // Very pale blue-white
        },
        'loop-primary': '#1C3F66', // alias of loop.dark

        // ☁️ Loop Blue Palette (cloud-inspired)
        cloud: {
          frost: '#EAF6FF',
          mist: '#CDE6F9',
          serene: '#A3D3F3',
          azure: '#73BCE8',
          depth: '#4FA3D8',
          shadow: '#347FB4',
        },
      },

      // 🖋️ Fonts
      fontFamily: {
        sans: ['"Inter"', ...defaultTheme.fontFamily.sans],
      },

      // 🌀 Custom Animations
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
