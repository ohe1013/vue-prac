<template>
    <div>
        <div>
            <pinia-logo />
        </div>
        <h2>Hello</h2>
        <form @submit.prevent="addItemToCart" data-testid="add-itemes">
            <input type="text" v-model="itemName" id="item" />
            <button>Add</button>
        </form>
        <form @submit.prevent="buy">
            <ul data-testid="items">
                <li v-for="item in cart.items" :key="item.name">
                    {{ item.name }} {{ item.amount }}
                    <button @click="cart.removeItem(item.name)" type="button">X</button>
                </li>
            </ul>
            <button :disabled="!user.name">Buy</button>
            <button
                :disabled="!cart.items.length"
                @click="clearCart"
                type="button"
                datat-testid="clear"
            >
                Clear the cart
            </button>
        </form>
    </div>
</template>

<script>
import { useUserStore } from '../store/pinia/user';
import { useCartStore } from '../store/pinia/cart';
import PiniaLogo from './logos/PiniaLogo.vue';
import { ref } from 'vue';
export default {
    components: { PiniaLogo },
    setup() {
        const user = useUserStore();
        const cart = useCartStore();

        const itemName = ref('');

        function addItemToCart() {
            if (!itemName.value) return;
            cart.addItem(itemName.value);
            itemName.value = '';
        }
        function clearCart() {
            if (window.confirm('clear?')) {
                cart.rawItems = [];
            }
        }
        async function buy() {
            const n = await cart.purchaseItems();
            console.log(`Bought  ${n} items`);
            cart.rawItems = [];
        }
        window.stores = { user, cart };
        return {
            itemName,
            addItemToCart,
            cart,
            user,
            buy,
            clearCart,
        };
    },
};
</script>

<style></style>
