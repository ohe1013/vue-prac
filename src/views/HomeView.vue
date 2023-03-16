<template>
    <div class="home">
        <img
            alt="Vue logo"
            src="../assets/logo.png"
        />
        <HelloWorld msg="Welcome to Your Vue.js App" />
        <button>sss</button>
        <todo-main />
    </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import TodoMain from '@/components/TodoMain.vue';
export default {
    name: 'HomeView',
    components: {
        HelloWorld,
        TodoMain,
    },
    data() {
        return {
            todos: {},
        };
    },
    computed: {
        computedTodos() {
            console.log(this.$data.todos);
            return this.todos != {} ? this.todos.filter((_, index) => index < 10) : {};
        },
    },
    methods: {
        getApi: async function () {
            const res = await fetch(`https://jsonplaceholder.typicode.com/todos`);
            const json = await res.json();
            this.todos = json;
        },
    },
    created: function () {
        this.getApi();
    },
};
</script>
