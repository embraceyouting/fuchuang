import { createApp } from 'vue';
import App from './App.vue';
import store from './store/index';  
import router from './router/index';  
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import ECharts from 'vue-echarts'  // 引入ECharts
import "echarts";                  // 全局引入echarts
const app = createApp(App);

app.use(createPinia());
app.use(ElementPlus)
app.use(store);  
app.use(router);  
app.component('ECharts',ECharts) 

app.mount('#app');
