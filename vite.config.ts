import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from '@svgr/rollup';
import path from 'path';
// @ts-ignore //ошибка npm пакета https://github.com/gxmari007/vite-plugin-eslint/issues/79
import eslint from 'vite-plugin-eslint';

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    cors: false,
    proxy: {
      '/photos': {
        target: `https://picsum.photos`,
        changeOrigin: true,
        autoRewrite: true,
        secure: true,
        rewrite: (path) => {
          console.log(path);
          return path.replace(/^\/photos/, 'https://picsum.photos');
        },
      },
    },
  },
  plugins: [svgr(), react(), eslint()],
  resolve: {
    alias: [{ find: 'src', replacement: path.resolve(__dirname, './src') }],
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "./src/styles/variables/colors.scss";
          @use "./src/styles/variables/animation.scss";
          @use "src/styles/variables/constants";
          @use "./src/styles/variables/gradients.scss";
          @use "./src/styles/variables/roundings.scss";
          @use "./src/styles/variables/screens.scss";
          @use "src/styles/variables/shadows";
        `,
      },
    },
  },
});
