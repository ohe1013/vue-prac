import { userService } from "@/services/userService";

const authModule = {
  namespaced: true,
  state: {
    accessToken: "",
  },

  getters: {
    getAccessToken: (state) => {
      return state.accessToken;
    },
  },
  mutations: {
    loginSuccess: (state, accessToken) => {
      state.accessToken = accessToken;
    },
  },
  actions: {
    login: ({ commit }, data) => {
      userService.login(data).then((res) => {
        commit("loginSuccess", res);
      });
    },
  },
};
export { authModule };
