import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import router from 'config/router';
import i18n from 'config/i18n';
import App from './App.vue';
import MainLayout from 'layouts/MainLayout.vue';
import AuthLayout from './layouts/AuthLayout.vue';
import FontIcon from 'components/FontIcon';

import 'element-plus/dist/index.css';

const pinia = createPinia();

createApp(App)
  .use(pinia)
  .use(router)
  .use(ElementPlus)
  .use(i18n)
  .component('MainLayout', MainLayout)
  .component('AuthLayout', AuthLayout)
  .component('FontIcon', FontIcon)
  .mount('#app');
