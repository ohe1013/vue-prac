import { getLocalStorage, setLocalStorage } from '@/utils/localstorage';

const colorPickerModule = {
    namespaced: true,
    state: {
        themeColor:
            getLocalStorage('themeColor') !== (undefined || null)
                ? getLocalStorage('themeColor')
                : '#41B883',
        textColor:
            getLocalStorage('textColor') !== (undefined || null)
                ? getLocalStorage('textColor')
                : 'black',
    },
    mutations: {
        setThemeColor(state, color) {
            setLocalStorage('themeColor', color);
            state.themeColor = color;
        },
        setTextColor(state, color) {
            setLocalStorage('textColor', color);
            state.textColor = color;
        },
    },

    getters: {
        themeColor(state) {
            return state.themeColor;
        },
        textColor(state) {
            return state.textColor;
        },
    },
};

export { colorPickerModule };
