/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  // ✅ NEW: Ensure Tailwind doesn’t purge our theme variable classes
  safelist: [
    {
      pattern: /bg-\[var\(--color-accent.*\)\]/,
    },
    {
      pattern: /text-\[var\(--color-accent.*\)\]/,
    },
    {
      pattern: /border-\[var\(--color-accent.*\)\]/,
    },
    {
      pattern: /ring-\[var\(--color-accent.*\)\]/,
    },
  ],

  theme: {
    extend: {
      colors: {
        // 🎨 Loop Palette (unchanged)
        loop: {
          primary: '#84BFF7',
          secondary: '#D6E9FF',
          accent: '#3C7DC4',
          highlight: '#EAF6FF',
          dark: '#1C3F66',
          neutral: '#F8FBFF',
        },
        'loop-primary': '#1C3F66',

        cloud: {
          frost: '#EAF6FF',
          mist: '#CDE6F9',
          serene: '#A3D3F3',
          azure: '#73BCE8',
          depth: '#4FA3D8',
          shadow: '#347FB4',
        },

        // 🌈 CSS variable-based theme colors
        accent: 'var(--color-accent)',
        'accent-dark': 'var(--color-accent-dark)',
        theme: 'var(--color-theme)',
        card: 'var(--color-card)',
        body: 'var(--color-text)',
      },

      fontFamily: {
        sans: ['"Inter"', ...defaultTheme.fontFamily.sans],
      },

      keyframes: {
        floatDown: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(300px)', opacity: '0' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(60, 125, 196, 0.5)' },
          '50%': { boxShadow: '0 0 25px 10px rgba(60, 125, 196, 0.3)' },
        },
      },

      animation: {
        'float-down': 'floatDown 3s linear forwards',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
      },
    },
  },

  plugins: [],
};
