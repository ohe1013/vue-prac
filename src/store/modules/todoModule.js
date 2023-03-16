import { todoService } from '@/services/todoService';

const todoModule = {
    namespaced: true,
    state: {
        todos: [],
    },

    getters: {
        getTodoList: (state) => {
            return state.todos;
        },
    },
    mutations: {
        setTodoList: (state, todos) => {
            state.todos = todos;
        },
    },
    actions: {
        fetchTodos: ({ commit }) => {
            todoService.fetchTodos().then((res) => {
                console.log(res);
                commit('setTodoList', res);
            });
        },
        createTodo: ({ dispatch }, data) => {
            todoService.createTodo(data).then(() => {
                dispatch('fetchTodos');
            });
        },
        deleteTodo: ({ dispatch }, id) => {
            todoService.deleteTodo(id).then(() => {
                dispatch('fetchTodos');
            });
        },
        updateTodo: ({ dispatch }, data) => {
            todoService.updateTodo(data).then(() => {
                dispatch('fetchTodos');
            });
        },
    },
};
export { todoModule };
