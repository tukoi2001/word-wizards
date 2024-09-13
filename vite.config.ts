import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import viteCompression from 'vite-plugin-compression';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    define: {
      NODE_ENV: JSON.stringify(env.NODE_ENV),
      VUE_APP_API_URL: JSON.stringify(env.VUE_APP_API_URL),
    },
    build: {
      target: 'esnext',
      minify: 'esbuild',
      sourcemap: false,
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
        },
      },
      assetsInlineLimit: 4096,
      chunkSizeWarningLimit: 500,
    },
    plugins: [
      vue(),
      viteCompression({
        algorithm: 'gzip',
        ext: '.gz',
      }),
      AutoImport({
        imports: [
          'vue',
          { 'vue-router': ['useRoute', 'useRouter', 'createRouter', 'createWebHistory'] },
          { 'vue-i18n': ['createI18n', 'useI18n'] },
          { pinia: ['createPinia', 'defineStore'] },
          {
            'element-plus': [
              'ElButton',
              'ElDialog',
              'ElFormItem',
              'ElInput',
              'ElSelect',
              'ElOption',
              'ElSwitch',
              'ElForm',
              'ElScrollbar',
              'ElPopover',
              'ElNotification',
              ['default', 'ElementPlus'],
            ],
          },
          { 'lodash-es': ['noop', 'get', 'head'] },
          {
            '@tanstack/vue-query': ['useQuery', 'useQueryClient', 'useMutation', 'VueQueryPlugin'],
          },
          {
            from: 'vue',
            imports: ['InjectionKey'],
            type: true,
          },
          {
            from: 'vue-router',
            imports: ['RouteRecordRaw', 'RouteLocationNormalized', 'NavigationGuardNext'],
            type: true,
          },
          {
            from: 'element-plus',
            imports: ['FormRules', 'FormInstance'],
            type: true,
          },
          {
            from: '@tanstack/vue-query',
            imports: ['InitialDataFunction', 'QueryClient', 'VueQueryPluginOptions'],
            type: true,
          },
        ],
        dts: 'src/auto-imports.d.ts',
        eslintrc: {
          enabled: true,
          filepath: './.eslintrc-auto-import.json',
          globalsPropValue: true,
        },
      }),
    ],
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
        modals: path.resolve(__dirname, 'src/modals'),
        routers: path.resolve(__dirname, 'src/routers'),
        stores: path.resolve(__dirname, 'src/stores'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "styles/additional.scss";',
        },
      },
    },
  };
});
