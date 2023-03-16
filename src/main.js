import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { TokenService } from './services/localStorageService';
import ApiService from './services/apiService';

const app = createApp(App);
app.config.globalProperties.productionTip = false;
app.provide('$log', console.log);

if (TokenService.getToken()) {
    ApiService.setHeader();
}
app.use(router);
app.use(store);
app.mount('#app');
