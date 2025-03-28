// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['uuid'], // 👈 or any other modules causing trouble
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
