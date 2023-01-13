<template>
  <div class="hello">
    <el-form>
      <label for="title">title</label>
      <el-input
        size="medium"
        placeholder="title"
        prefix-icon="el-icon-search"
        v-model="todo.title"
      >
      </el-input>
      <label for="content">content</label>
      <el-input
        type="content"
        size="medium"
        placeholder="content"
        prefix-icon="el-icon-search"
        v-model="todo.content"
      >
      </el-input>
      <el-button type="primary" round @click="submitTodo">추가</el-button>
    </el-form>
  </div>
</template>

<script lang="js">
import Vue from "vue";
import { mapActions } from "vuex";

export default Vue.extend({
  name: "TodoInsert",
  data: () => {
    return {
      todo: {
        title: "",
        content: "",
      },
    };
  },
  methods: {
    ...mapActions("todoModule", ["createTodo"]),
    submitTodo ()  {
        this.createTodo(this.todo)
        this.todo={
            title:'',
            content:''
        }
    },
  },
});
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
