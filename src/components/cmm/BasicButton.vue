<template>
  <el-button @click="click">{{ message }}</el-button>
</template>

<script>
export default {
  name: "BasicButton",
  props: {
    click: Function,
    message: String,
  },
};
</script>
