import { database } from '@/services/config/firebase';
import { guid } from '@/utils/comm';
import { defineStore } from 'pinia';

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
