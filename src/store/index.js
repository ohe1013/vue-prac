import Vue from "vue";
import Vuex from "vuex";
import { authModule } from "./modules/authModule";
import { todoModule } from "./modules/todoModule";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: { authModule, todoModule },
});
