import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),
      assets: path.resolve(__dirname, 'src/assets'),
      components: path.resolve(__dirname, 'src/components'),
      containers: path.resolve(__dirname, 'src/containers'),
      layouts: path.resolve(__dirname, 'src/layouts'),
      pages: path.resolve(__dirname, 'src/pages'),
      config: path.resolve(__dirname, 'src/config'),
      api: path.resolve(__dirname, 'src/api'),
      types: path.resolve(__dirname, 'src/types'),
      styles: path.resolve(__dirname, 'src/styles'),
      utils: path.resolve(__dirname, 'src/utils'),
      enums: path.resolve(__dirname, 'src/enums'),
      hooks: path.resolve(__dirname, 'src/hooks'),
      i18n: path.resolve(__dirname, 'src/i18n'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "styles/main.scss";',
      },
    },
  },
});
