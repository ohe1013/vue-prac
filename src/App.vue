<template>
    <div id="app">
        <the-layout>
            <router-view />
        </the-layout>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import TheLayout from './components/layout/TheLayout.vue';
export default {
    components: {
        TheLayout,
    },
    computed: {
        ...mapGetters('colorPickerModule', ['themeColor', 'textColor']),
    },
};
</script>
<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: v-bind('textColor');
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}
body {
    margin: 0;
}
</style>
