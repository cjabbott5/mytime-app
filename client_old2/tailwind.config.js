/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pink: {
          light: '#F8D7E0', // Light pink for subtle backgrounds
          DEFAULT: '#D4A1C7', // Base pink
          dark: '#B56D9A', // Darker pink for accents
        },
        accent: '#F5A623', // Golden accent for buttons and highlights
        navy: '#2A3D4C', // Optional navy for contrast, maybe for text or borders
      },
      backgroundImage: {
        'cloud-pattern': 'url("/assets/cloud-bg.jpg")', // Corrected cloud background path
        'golden-retriever': 'url("/assets/golden-retriever.gif")', // Corrected golden retriever image path
      },
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'], // Clean sans-serif for modern readability
        serif: ['Playfair Display', 'serif'], // Optional, elegant serif for accents or headings
      },
      boxShadow: {
        'soft': '0 2px 5px rgba(0, 0, 0, 0.1)', // Soft shadow for cards or buttons
        'elevated': '0 10px 15px rgba(0, 0, 0, 0.1)', // Slightly stronger shadow for more depth
      },
      spacing: {
        '18': '4.5rem', // Custom spacing values
        '22': '5.5rem',
      },
      transitionProperty: {
        'height': 'height',
        'width': 'width',
      },
      transitionDuration: {
        '400': '400ms',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
