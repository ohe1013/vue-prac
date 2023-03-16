<template>
    <div class="hello">
        <form>
            <label for="title">title</label>
            <input
                placeholder="title"
                v-model="todo.title"
            />

            <label for="content">content</label>
            <input
                type="content"
                placeholder="content"
                v-model="todo.content"
            />

            <button @click="submitTodo">추가</button>
        </form>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'TodoInsert',
    data: () => {
        return {
            todo: {
                title: '',
                content: '',
            },
        };
    },
    methods: {
        ...mapActions('todoModule', ['createTodo']),
        submitTodo() {
            this.createTodo(this.todo);
            this.todo = {
                title: '',
                content: '',
            };
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
    margin: 40px 0 0;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}
</style>
