<template>
    <component :is="layout">
        <slot />
    </component>
</template>

<script>
import { computed } from 'vue';
import DefaultLayout from './DefaultLayout.vue';
import { mapGetters } from 'vuex';
export default {
    name: 'TheLayout',
    components: {
        DefaultLayout,
    },
    setup(props, { root }) {
        const layout = computed(() => 'DefaultLayout');
        return {
            layout,
        };
    },
    computed: {
        ...mapGetters('colorPickerModule', ['textColor', 'themeColor']),
    },
};
</script>

<style lang="scss">
.header {
    width: 100%;
    height: 80px;
    display: flex;
}
nav {
    padding: 30px;
    margin-left: auto;

    a {
        font-weight: bold;
        font-weight: 500;
        font-size: 20px;
        color: v-bind('textColor');
        text-decoration: none;

        &.router-link-exact-active {
            color: v-bind('textColor');
            font-weight: 700;
        }
    }
    .theme {
        padding: 5px;
        border-radius: 5px;
        background-color: v-bind('themeColor');
        cursor: pointer;
        color: v-bind('textColor');
    }
}
input {
    color: v-bind('textColor');
}
button {
    color: v-bind('textColor');
    background-color: v-bind('themeColor');
    border: 2px solid v-bind('themeColor');
    border-radius: 3px;
}
</style>
