<template>
    <div class="theme-picker-container">
        <div>
            <label>Theme </label>
            <input
                type="color"
                :value="themeColor"
                @input="setThemeColor($event.target.value)"
            />
        </div>
        <div>
            <label>Text </label>
            <input
                type="color"
                :value="textColor"
                @input="setTextColor($event.target.value)"
            />
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
export default {
    name: 'ThemePicker',

    computed: {
        ...mapGetters('colorPickerModule', ['themeColor', 'textColor']),
    },
    methods: {
        ...mapMutations('colorPickerModule', ['setThemeColor', 'setTextColor']),
    },
};
</script>

<style>
.theme-picker-container {
    position: fixed;
    float: right;
    text-align: right;
    width: 100%;
    top: 80px;
    right: 20px;
    z-index: 999;
}
</style>
