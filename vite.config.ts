import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                landing: resolve(__dirname, 'pages/landing/index.html'),
                map: resolve(__dirname, 'pages/map/index.html'),
                animal: resolve(__dirname, 'pages/animal/index.html'),
                contact: resolve(__dirname, 'pages/contact/index.html')
            }
        }
    }
});
