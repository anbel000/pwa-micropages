
import path from 'path';
import react from '@vitejs/plugin-react';
//import VitePWA from 'vite-plugin-pwa';
import { VitePWA } from 'vite-plugin-pwa';

const SRC_DIR = path.resolve(__dirname, './src');
const PUBLIC_DIR = path.resolve(__dirname, './public');
const BUILD_DIR = path.resolve(__dirname, './www',);
export default async () => {

  return {
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        devOptions: {
          enabled: true
        },
        manifest: {
          "name": "Micropages",
          "short_name": "Micropages",
          "description": "Una app creada con Framework7 y React.",
          "start_url": ".",
          "display": "standalone",
          "background_color": "#ffffff",
          "theme_color": "#008080",
          "icons": [
            {
              "src": "/pwa-micropages/icons/192x192.png",
              "sizes": "192x192",
              "type": "image/png"
            },
            {
              "src": "/pwa-micropages/icons/512x512.png",
              "sizes": "512x512",
              "type": "image/png"
            }
          ],
          "screenshots": [
            {
              "src": "/pwa-micropages/screenshots/screenshot1.png",
              "sizes": "1366x599",
              "type": "image/png"
            },
            {
              "src": "/pwa-micropages/screenshots/screenshot4.png",
              "sizes": "362x586",
              "type": "image/png"
            }
          ]
        }
      }
      )
    ],
    root: SRC_DIR,
    base: '/pwa-micropages/',
    publicDir: PUBLIC_DIR,
    build: {
      outDir: BUILD_DIR,
      assetsInlineLimit: 0,
      emptyOutDir: true,
      rollupOptions: {
        treeshake: false,
      },
    },
    resolve: {
      alias: {
        '@': SRC_DIR,
      },
    },
    server: {
      host: true,
    },

  };
}
