import { defineStore } from 'pinia';
import { useUserStore } from './user';

export const useCartStore = defineStore({
    id: 'cart',
    state: () => ({
        rawItems: [],
    }),
    getters: {
        items: (state) =>
            state.rawItems.reduce((items, item) => {
                const existingItem = items.find((it) => it.name === item);
                if (!existingItem) {
                    items.push({ name: item, amount: 1 });
                } else {
                    existingItem.amount++;
                }
                return items;
            }, []),
    },
    actions: {
        addItem(name) {
            this.rawItems.push(name);
        },
        removeItem(name) {
            const i = this.rawItems.lastIndexOf(name);
            if (i > -1) this.rawItems.splice(i, 1);
        },
        async purchaseItems() {
            const user = useUserStore();
            if (!user.name) return;
            console.log('Pulchasing', this.items);
            const n = this.items.length;
            this.rawItems = [];
            return n;
        },
    },
});
