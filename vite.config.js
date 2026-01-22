import { defineConfig } from 'vite';
import { resolve } from 'path';
export default defineConfig({
  root: './',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        portfolio: resolve(__dirname, 'portfolio.html'),
        blog: resolve(__dirname, 'blog.html'),
        contact: resolve(__dirname, 'contact.html'),
        shop: resolve(__dirname, 'shop.html'),
      },
    },
  },
  server: {
    port: 5173,
    open: true,
  },
});