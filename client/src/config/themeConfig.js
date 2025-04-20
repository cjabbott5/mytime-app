import pinkBg from '@/assets/pink-bg.jpg';
import blueBg from '@/assets/blue-bg.jpg';
import purpleBg from '@/assets/purple-bg.jpg';
import sunsetBg from '@/assets/sunset.jpg';
import midnightBg from '@/assets/midnight.jpg';
import charcoalBg from '@/assets/charcoal.jpg';

const themeConfig = {
  pink: {
    name: "Pink Clouds",
    bgImage: pinkBg,
    colors: {
      "--color-theme": "#F9A8D4",
      "--color-accent": "#DB2777",
      "--color-accent-dark": "#9D174D",
      "--color-text": "#4B5563",
    },
  },
  blue: {
    name: "Light Blue",
    bgImage: blueBg,
    colors: {
      "--color-theme": "#93C5FD",
      "--color-accent": "#1D4ED8",
      "--color-accent-dark": "#1E3A8A",
      "--color-text": "#1E40AF",
    },
  },
  purple: {
    name: "Light Purple",
    bgImage: purpleBg,
    colors: {
      "--color-theme": "#E9D5FF",
      "--color-accent": "#A855F7",
      "--color-accent-dark": "#6B21A8",
      "--color-text": "#6B21A8",
    },
  },
  sunset: {
    name: "Sunset Glow",
    bgImage: sunsetBg,
    colors: {
      "--color-theme": "#FDBA74",
      "--color-accent": "#FB923C",
      "--color-accent-dark": "#C2410C",
      "--color-text": "#78350F",
    },
  },
  midnight: {
    name: "Midnight",
    bgImage: midnightBg,
    colors: {
      "--color-theme": "#1E293B",
      "--color-accent": "#6366F1",
      "--color-accent-dark": "#4F46E5",
      "--color-text": "#F1F5F9",
    },
  },
  charcoal: {
    name: "Charcoal",
    bgImage: charcoalBg,
    colors: {
      "--color-theme": "#0F172A",
      "--color-accent": "#94A3B8",
      "--color-accent-dark": "#64748B",
      "--color-text": "#E2E8F0",
    },
  },
  ocean: {
    name: "Ocean Breeze",
    bgImage: "linear-gradient(to bottom right, #3B82F6, #06B6D4)",
    colors: {
      "--color-theme": "#06B6D4",
      "--color-accent": "#0EA5E9",
      "--color-accent-dark": "#0369A1",
      "--color-text": "#0C4A6E",
    },
  },
  forest: {
    name: "Forest Calm",
    bgImage: "linear-gradient(to bottom right, #166534, #4ADE80)",
    colors: {
      "--color-theme": "#4ADE80",
      "--color-accent": "#16A34A",
      "--color-accent-dark": "#065F46",
      "--color-text": "#052E16",
    },
  },
  rose: {
    name: "Rose Dawn",
    bgImage: "linear-gradient(to bottom right, #F43F5E, #F97316)",
    colors: {
      "--color-theme": "#FB7185",
      "--color-accent": "#F43F5E",
      "--color-accent-dark": "#7F1D1D",
      "--color-text": "#7F1D1D",
    },
  },
  sand: {
    name: "Desert Sand",
    bgImage: "linear-gradient(to bottom right, #FCD34D, #FBBF24)",
    colors: {
      "--color-theme": "#FACC15",
      "--color-accent": "#D97706",
      "--color-accent-dark": "#92400E",
      "--color-text": "#78350F",
    },
  },
  glacier: {
    name: "Glacier Mist",
    bgImage: "linear-gradient(to bottom right, #E0F2FE, #BAE6FD)",
    colors: {
      "--color-theme": "#BAE6FD",
      "--color-accent": "#0EA5E9",
      "--color-accent-dark": "#0369A1",
      "--color-text": "#0369A1",
    },
  },
  shadow: {
    name: "Shadow Void",
    bgImage: "linear-gradient(to bottom right, #111827, #1F2937)",
    colors: {
      "--color-theme": "#1F2937",
      "--color-accent": "#4B5563",
      "--color-accent-dark": "#1F2937",
      "--color-text": "#F9FAFB",
    },
  },

  // 💥 CUSTOM THEME PLACEHOLDER
  custom: {
    name: "Custom Theme",
    bgImage: "linear-gradient(to bottom right, #E0E0E0, #FFFFFF)",
    isCustom: true, // 👈 extra flag for special handling
    colors: {
      "--color-theme": "#E0E0E0",
      "--color-accent": "#CCCCCC",
      "--color-accent-dark": "#AAAAAA",
      "--color-text": "#333333",
    },
  },
};

export default themeConfig;
