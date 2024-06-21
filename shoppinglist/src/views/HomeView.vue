<script setup>

import { RouterLink, RouterView } from 'vue-router'

import { useUserStore } from '@/stores/counter';

import { storeToRefs } from 'pinia';

const userStore = useUserStore()

const { loginUser,inputPassword, inputUser, } = storeToRefs(userStore)


const clearLogin = () => {
  loginUser.value = ''
  inputPassword.value = ''
  inputUser.value = ''
  localStorage.removeItem('isLogin')
}

</script>

<template>

  <div class="topbar"><span>shoppinglist</span>
    <span class="user">欢迎：{{ loginUser }}</span>
    <button @click="clearLogin"><router-link to="/login">退出登录</router-link></button>
  </div>
  <div class="content">
    <div class="manangelist">
      <ul>
        <li><router-link to="/shoppinglist">商品管理</router-link></li>
        <li><router-link to="/add">添加商品</router-link></li>
        <li><router-link to="/edit">修改商品</router-link></li>
      </ul>
    </div>
    <div class="viewport">
      <router-view>
      </router-view>
    </div>
  </div>


</template>

<style scoped>
.topbar {
  /* height: 50px; */
  background-color: #5fdc63;
  /* color: white; */
  padding: 10px;
  text-align: center;
  position: relative;
  line-height: 50px;
}

.topbar span {
  margin-right: 10px;
}

.user {
  position: absolute;
  right: 150px;
  top: 10px;
}


.topbar button {
  position: absolute;
  right: 10px;
  top: 10px;
  width: 120px;
  border: 1px solid #ff8800;

  border-radius: 5px;
  background-color: #ff8800;

}


.topbar button:hover {
  background-color: #ffc400;
}

.content {
  display: flex;
  height: 1200px;
}

ul {
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;

}

li {
  width: 120px;
  background-color: #5fdc63;
  margin-bottom: 10px;
  text-align: center;
  border-radius: 2px;
}

a {
  display: block;
  width: 100%;
  height: 100%;
  text-decoration: none;
  line-height: 50px;
}


a:visited {
  color: #000000;
}

li:hover {
  background-color: #ffc400;
  cursor: pointer;

}

.manangelist {
  flex: 1;
  background-color: #eee;
  padding: 10px;
}

.viewport {
  flex: 9;
  padding: 10px;
}
</style>