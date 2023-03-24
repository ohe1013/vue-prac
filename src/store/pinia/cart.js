import { defineStore } from 'pinia';
import { useUserStore } from './user';
import { database } from '@/services/config/firebase';
import { get, set, ref, child } from 'firebase/database';
import { guid } from '@/utils/comm';
const uuid = guid();
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
        async fetchItem() {
            try {
                const items = await get(child(ref(database), 'cart/' + uuid));
                console.log(items.val());
            } catch (error) {
                console.log(error);
            }
        },
        addItem(name) {
            const user = useUserStore();
            this.rawItems.push(name);
            const items = this.items;
            set(ref(database, 'cart/' + uuid), {
                name: user.name,
                proudcts: {
                    ...items,
                },
            });
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
