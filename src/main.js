import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { TokenService } from './services/localStorageService';
import ApiService from './services/apiService';
import { useTodoListStore } from './store/pinia/index.js';
import { createPinia } from 'pinia';

const app = createApp(App);
app.config.globalProperties.productionTip = false;
app.provide('$log', console.log);
const pinia = createPinia();
if (TokenService.getToken()) {
    ApiService.setHeader();
}
app.use(router);
app.use(store);
app.use(pinia);
useTodoListStore();
app.mount('#app');
