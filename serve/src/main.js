import { createApp } from 'vue';
import '@/scss/base.scss';
import '@/scss/font.scss';
import App from './App.vue';
import router from './router/index';  
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/scss/element.scss'
import ECharts from 'vue-echarts'  // 引入ECharts
import * as echarts from 'echarts'
import i18n from '@/i18n/index.js'
import animate from './directives/animate';

const app = createApp(App);

app.config.globalProperties.$echarts = echarts
app.use(i18n)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia);
app.use(ElementPlus)
app.use(router);
app.directive('animate', animate)
app.component('ECharts',ECharts) 

app.mount('#app');
