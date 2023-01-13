import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import { TokenService } from "./services/localStorageService";
import ApiService from "./services/apiService";
Vue.config.productionTip = false;
Vue.prototype.$loading = ElementUI.Loading;
Vue.prototype.$log = console.log;
Vue.use(ElementUI);

if (TokenService.getToken()) {
  ApiService.setHeader();
}
new Vue({
  el: "#app",
  router,
  store,
  render: (h) => h(App),
});
