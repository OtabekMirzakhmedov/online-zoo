import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    base: '/online-zoo/',
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
            '@components': resolve(__dirname, 'src/components'),
            '@pages': resolve(__dirname, 'src/pages'),
            '@hooks': resolve(__dirname, 'src/hooks'),
            '@contexts': resolve(__dirname, 'src/contexts'),
            '@assets': resolve(__dirname, 'assets')
        }
    },
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

