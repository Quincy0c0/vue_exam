<template>
  <table>
    <thead>
      <th>id</th>
      <th>名称</th>
      <th>价格</th>
      <th>操作</th>
    </thead>
    <tbody>
      <tr v-for="item in shoppingList" :key="item.id">
        <td><input type="text" v-model="item.id"></td>
        <td><input type="text" v-model="item.name"></td>
        <td><input type="text" v-model="item.price"></td>
        <td>
          <button @click="updateShopping(item.id,item)">修改</button>
          
        </td>
      </tr>
    </tbody>
  </table>
  
</template>

<script setup>

import { storeToRefs } from 'pinia'

import { useListStore } from '../stores/counter.js'

import { onMounted } from 'vue'

const listStore = useListStore()

const { getShoppingList,updateShopping } = listStore

const { shoppingList } = storeToRefs(listStore)

onMounted(() => {
  getShoppingList()
})



</script>

<style scoped>

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

input {
  width: 100%;
  padding: 6px 12px;
  box-sizing: border-box;
}

button {
  padding: 6px 12px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;

}

</style>