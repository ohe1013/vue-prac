<template>
    <ul>
        <li
            v-for="(todo, i) in todos"
            :key="i"
        >
            <label :for="todo.id"></label>
            <input
                :id="`title${todo.id}`"
                :value="todo.title"
                @input="todos[i].title = $event"
                :disabled="!disables.has(todo.id)"
            />
            <!-- <input
                :id="`content${todo.id}`"
                :value="todo.content"
                @input="todos[i].content = $event"
                :disabled="!disables.has(todo.id)"
            ></input> -->
            <button @click="confirmDelete(() => deleteTodo(todo.id), todo.id)">삭제</button>
            <button
                v-show="!disables.has(todo.id)"
                @click="add(todo.id)"
            >
                수정
            </button>
            <button
                v-show="disables.has(todo.id)"
                @click="confirmUpdate(() => updateTodo(todo), todo.id)"
            >
                ✅
            </button>
            <button
                v-show="disables.has(todo.id)"
                @click="cancel(todo.id)"
            >
                ❌
            </button>
        </li>
    </ul>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { confirm } from '../utils/comm';
export default {
    name: 'TodoList',
    data() {
        return {
            disables: new Set(),
        };
    },
    methods: {
        ...mapActions({
            fetchTodos: 'todoModule/fetchTodos',
            deleteTodo: 'todoModule/deleteTodo',
            updateTodo: 'todoModule/updateTodo',
        }),
        confirmDelete: confirm.delete,
        confirmUpdate(cb, id) {
            confirm.update(cb).then(() => {
                this.$data.disables.delete(id);
            });
        },
        add(data) {
            const _set = new Set(this.disables);
            _set.add(data);
            this.disables = _set;
        },
        cancel(data) {
            const _set = new Set(this.disables);
            _set.delete(data);
            this.disables = _set;
        },
    },
    computed: {
        ...mapState({
            todos: (state) => state.todoModule.todos,
        }),
    },
    created() {
        this.fetchTodos();
    },
};
</script>
<style scoped>
li {
    list-style: none;
}
input {
    font-size: 18px;
    width: 40%;
}
button {
    margin: 3px;
}
</style>
