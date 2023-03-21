import { database } from '@/services/config/firebase';
import { defineStore } from 'pinia';

function guid() {
    function s4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

export const useTodoListStore = defineStore('todo', {
    state: () => ({
        todo: null,
    }),
    actions: {
        async fetchTodos() {
            try {
                const todo = await database.ref('todo');
                console.log(todo);
            } catch (error) {
                console.log(error);
            }
        },
        async setTodo(message) {
            try {
                const uuid = guid();
                if (message === '') {
                    alert('메세지를 입력하세요');
                    return false;
                }
                database.ref('todo/' + uuid).set({
                    text: message,
                });
            } catch (error) {
                console.log(error);
            }
        },
    },
});
