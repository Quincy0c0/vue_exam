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
        <template v-if="item.id === editId">
          <td><input type="text" v-model="item.id"></td>
          <td><input type="text" v-model="item.name"></td>
          <td><input type="text" v-model="item.price"></td>
        </template>
        <template v-else>
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.price }}￥</td>
        </template>
        <td>
          <button @click="deleteShopping(item.id)">删除</button>
          <button v-if="item.id === editId" @click="update(item.id,item)" class="redbtn">更新</button>
          <button v-else @click="toggleToEdit(item.id)">编辑</button>
        </td>
      </tr>

    </tbody>
  </table>

</template>

<script setup>

import { storeToRefs } from 'pinia'

import { useListStore } from '../stores/counter.js'

import { onMounted,ref } from 'vue'

const editId = ref('')

const listStore = useListStore()

const { getShoppingList, deleteShopping,updateShopping } = listStore

const { shoppingList } = storeToRefs(listStore)

const toggleToEdit = (id) => {
  editId.value = id
}

const update = (id,item) => {
  updateShopping(id,item)
  editId.value = ''
}
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

button {
  margin-right: 8px;
  padding: 4px 8px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.redbtn {
  background-color: #dc3545;
}

.redbtn:hover {
  background-color: #c82333;
}

input {

  padding: 4px 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>