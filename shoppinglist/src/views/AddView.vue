<template>
  <div>
    <h1>添加新商品</h1>
    <ul>
      <li>商品名称：<input type="text" v-model.trim="newItem.name"></li>
      <li>商品价格：<input type="text" v-model.number="newItem.price"></li>
      <li><button @click="add(newItem)">提交</button></li>
    </ul>
  </div>
</template>

<script setup>


import { ref } from 'vue';

import { useRouter } from 'vue-router';

const router = useRouter();

import { useListStore } from '../stores/counter.js'

const { addShopping } = useListStore();

const newItem = ref({
  name: '',
  price: ''
});

const add = (newItem) => {
  if (newItem.name && newItem.price) {
    addShopping(newItem);
    router.push('/shoppinglist');
  }
  else {
    alert('请输入商品名称和价格');
  }

}



</script>

<style scoped>
div {
  margin: 0 auto;
  width: 500px;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  margin: 10px 0;

}

input {
  width: 300px;
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 0 10px;
  font-size: 16px;
  color: #333;

}

button {
  width: 100px;
  height: 30px;
  margin-left: 50%;
  transform: translateX(-50%);
  background-color: #5fdc63;
  border: none;
  border-radius: 5px;
  color: white;
}

button:hover {
  background-color: #48c774;
  cursor: pointer;
}

h1 {
  color: #5fdc63;
  text-align: center;

}
</style>