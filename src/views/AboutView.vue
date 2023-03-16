<template>
    <div class="about">
        <h1>Login</h1>
        <hello-world></hello-world>
        <todo-main></todo-main>
    </div>
</template>
<script>
import HelloWorld from '@/components/HelloWorld.vue';
import TodoMain from '@/components/TodoMain.vue';
export default {
    components: { HelloWorld, TodoMain },
    comments: {
        HelloWorld,
        TodoMain,
    },
};
</script>
