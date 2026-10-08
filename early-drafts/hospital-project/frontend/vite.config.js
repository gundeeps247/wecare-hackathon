import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Set your desired output directory (adjust as needed)
    outDir: 'dist',
  },
});
