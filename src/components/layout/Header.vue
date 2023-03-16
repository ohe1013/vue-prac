<template>
    <div class="header">
        <nav>
            <router-link to="/">Home</router-link> | <router-link to="/login">Login</router-link> |
            <button
                class="theme"
                to="/theme"
                @click="openColorPicker()"
            >
                Theme
            </button>
        </nav>
        <theme-picker v-if="isView" />
    </div>
</template>

<script>
import ThemePicker from '@/views/ThemePicker.vue';
export default {
    name: 'LayoutHeader',
    components: {
        ThemePicker,
    },
    data() {
        return {
            isView: false,
        };
    },

    methods: {
        openColorPicker() {
            this.isView = !this.isView;
        },
    },
};
</script>
