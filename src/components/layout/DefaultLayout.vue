<template>
    <div>
        <layout-header />
        <slot />
    </div>
</template>

<script>
import LayoutHeader from './Header.vue';
export default {
    name: 'DefaultLayout',
    components: {
        LayoutHeader,
    },
};
</script>

<style></style>
