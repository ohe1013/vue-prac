import Vuex from 'vuex';
import { authModule } from './modules/authModule';
import { todoModule } from './modules/todoModule';
import { colorPickerModule } from './modules/colorPickerModule';

export default new Vuex.Store({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: { authModule, todoModule, colorPickerModule },
});
