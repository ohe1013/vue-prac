<template>
  <ul>
    <li v-for="(todo, i) in todos" :key="i">
      <label :for="todo.id">할일</label>
      <el-input
        :id="`title${todo.id}`"
        :value="todo.title"
        @input="todos[i].title = $event"
        :disabled="!disables.has(todo.id)"
      ></el-input>
      <el-input
        :id="`content${todo.id}`"
        :value="todo.content"
        @input="todos[i].content = $event"
        :disabled="!disables.has(todo.id)"
      ></el-input>
      <el-button @click="confirmDelete(() => deleteTodo(todo.id), todo.id)"
        >삭제</el-button
      >
      <el-button v-show="!disables.has(todo.id)" @click="add(todo.id)"
        >수정</el-button
      >
      <el-button
        v-show="disables.has(todo.id)"
        @click="confirmUpdate(() => updateTodo(todo), todo.id)"
        >✅</el-button
      >
      <el-button v-show="disables.has(todo.id)" @click="cancel(todo.id)"
        >❌</el-button
      >
    </li>
  </ul>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { confirm } from "../utils/comm";
export default {
  name: "TodoList",
  data() {
    return {
      disables: new Set(),
    };
  },
  methods: {
    ...mapActions({
      fetchTodos: "todoModule/fetchTodos",
      deleteTodo: "todoModule/deleteTodo",
      updateTodo: "todoModule/updateTodo",
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
