import { acceptHMRUpdate, defineStore } from 'pinia';

function apiLogin(user, password) {
    if (user === 'ed' && password === 'ed') return Promise.resolve({ isAdmin: true });
    if (password === 'ed') return Promise.resolve({ isAdmin: false });
    return Promise.reject(new Error('invalid credentials'));
}

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        name: 'ohg',
        isAdmin: true,
    }),

    actions: {
        logout() {
            this.$patch({
                name: '',
                isAdmin: false,
            });
        },
        async login(user, password) {
            const userData = await apiLogin(user, password);

            this.$patch({
                name: user,
                ...userData,
            });
        },
    },
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
