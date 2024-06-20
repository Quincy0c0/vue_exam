<script setup>

import { getUsersApi } from '../api/Users.js'

import { ref } from 'vue'

import { useRouter } from 'vue-router'


const users = ref([])

const inputUser = ref('')

const inputPassword = ref('')

const router = useRouter()

getUsersApi().then(data => {
  users.value = data
})


const login = () => {
  const user = users.value.find(user => user.name === inputUser.value)
  if (user) {
    if (user.password === inputPassword.value) {
      localStorage.setItem('isLogin', true )
      alert('登录成功')
      router.push('/shoppinglist')
    } else {
      alert('密码错误')
    }
  } else {
    alert('用户不存在')
  }
}


</script>

<template>
  <div>
    <h1>登录</h1>
    <input type="text" placeholder="用户名" v-model="inputUser" />
    <br>
    <input type="password" placeholder="密码" v-model="inputPassword" />
    <br>
    <button @click="login">登录</button>
  </div>
</template>

<style scoped>
div {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 1px solid black;
  width: 400px;
  height: 300px;
  margin: 100px auto;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

input {
  width: 200px;
  height: 30px;
  margin: 10px 0;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

div button {
  width: 200px;
  height: 30px;
  margin: 10px 0;
  padding: 5px;
  border-radius: 5px;
  border: none;
  background-color: #5fdc63;
  /* color: white; */
  cursor: pointer;
}

button:hover {
  background-color: #7cba00;
}
</style>