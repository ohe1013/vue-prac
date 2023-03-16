<template>
    <div>
        <todo-insert></todo-insert>
        <todo-list></todo-list>
    </div>
</template>

<script>
import TodoInsert from './TodoInsert.vue';
import TodoList from './TodoList.vue';
export default {
    components: { TodoInsert, TodoList },
    name: 'TodoMain',
    comments: {
        TodoInsert,
    },
};
</script>
