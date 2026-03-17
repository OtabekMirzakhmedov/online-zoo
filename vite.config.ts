import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    base: '/online-zoo/',
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                landing: resolve(__dirname, 'pages/landing/index.html'),
                map: resolve(__dirname, 'pages/map/index.html'),
                animal: resolve(__dirname, 'pages/animal/index.html'),
                contact: resolve(__dirname, 'pages/contact/index.html'),
                signin: resolve(__dirname, 'pages/signin/index.html'),
                registration: resolve(__dirname, 'pages/registration/index.html')
            }
        }
    }
});

