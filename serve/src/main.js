import { createApp } from 'vue';
import '@/scss/base.scss';
import '@/scss/font.scss';
import App from './App.vue';
import router from './router/index';  
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/scss/element.scss'
import ECharts from 'vue-echarts'  // 引入ECharts
import "echarts";                  // 全局引入echarts
import i18n from '@/i18n/index.js'
import animate from './directives/animate';
const app = createApp(App);


app.use(i18n)
app.use(createPinia());
app.use(ElementPlus)
app.use(router);
app.directive('animate', animate)
app.component('ECharts',ECharts) 

app.mount('#app');
