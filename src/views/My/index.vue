<template>
  <MyFrom :user="user" :title="title" :error="error" :onSubmit="handleSubmit" :onReset="handleReset" v-model:xiaoyu="xiaoyu" v-model:count="count"/>
</template>
<script setup>
// 逻辑和界面分离，使代码更加清晰和可维护
// 展示组件，只负责展示
import MyFrom from '@/components/MyFrom.vue';
// 容器组件，负责处理表单的逻辑，并将对应的信息传递给展示组件
import { reactive, ref } from 'vue';
const user = reactive({
  username: "admin",
  password: "123456"
})
const xiaoyu = ref("xiaoyu")
const count = ref(20)
const title = ref("小红书")
const error = reactive({
  userNameError: "",
  passWordError: ""
})
const handleSubmit = () => {
  console.log(user);
  if (user.username !== "admin") {
    error.userNameError = "账号必须为admin"
  } else {
    error.userNameError = ""
  }
  if (user.password !== "123456") {
    error.passWordError = "密码必须为123456"
  } else {
    error.passWordError = ""
  }
}
const handleReset = () => {
  user.username = ""
  user.password = ""
  error.userNameError = ""
  error.passWordError = ""
  console.log(user);
}

const handlerError = (dom, errorContent) => {
  const errorDom = document.createElement("div")
  errorDom.textContent = errorContent
  errorDom.classList.add("error")
  const marginBottomDom = document.createElement("div")
  marginBottomDom.classList.add("margin-bottom")

}

</script>
<style lang='scss' scoped></style>