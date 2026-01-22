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
        blogRanthambore: resolve(__dirname, 'blog/ranthambore.html'),
        blogAssam: resolve(__dirname, 'blog/assam.html'),
        blogLadakh: resolve(__dirname, 'blog/ladakh.html'),
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
