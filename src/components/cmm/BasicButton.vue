<template>
    <button :style="{ backgroundColor: themeColor }">{{ themeColor }}</button>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'BasicButton',

    computed: {
        ...mapGetters('colorPickerModule', ['themeColor']),
    },
};
</script>
