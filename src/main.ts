import router from 'config/router';
import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

createApp(App).use(router).use(ElementPlus).mount('#app');
