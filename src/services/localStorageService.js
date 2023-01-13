const TOKEN_KEY = "access_token";

const TokenService = {
  getToken: () => {
    return localStorage.getItem(TOKEN_KEY);
  },
  setToken: (access_token) => {
    localStorage.setItem(TOKEN_KEY, access_token);
  },
  removeToken: () => {
    localStorage.removeItem(TOKEN_KEY);
  },
};

export { TokenService };
