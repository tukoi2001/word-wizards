import router from 'config/router';
import i18n from 'config/i18n';
import App from './App.vue';
import MainLayout from 'layouts/MainLayout.vue';
import AuthLayout from './layouts/AuthLayout.vue';
import FontIcon from 'components/FontIcon';
import LoadingComponent from 'components/Loading';

import 'element-plus/dist/index.css';
import 'styles/main.scss';

const pinia = createPinia();

const vueQueryPluginOptions: VueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  },
};

createApp(App)
  .use(pinia)
  .use(router)
  .use(ElementPlus)
  .use(i18n)
  .use(VueQueryPlugin, vueQueryPluginOptions)
  .component('MainLayout', MainLayout)
  .component('AuthLayout', AuthLayout)
  .component('FontIcon', FontIcon)
  .component('LoadingComponent', LoadingComponent)
  .mount('#app');
