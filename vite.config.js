// vite.config.js

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path'; // Importation nécessaire pour path.resolve

// Configuration Vite
export default defineConfig({
  plugins: [vue()],

  // Section pour la résolution des chemins et la configuration des alias
  resolve: {
    alias: {
      // Configure l'alias '@' pour qu'il pointe vers le dossier 'src'
      '@': path.resolve(__dirname, './src'),
    },
  },
});