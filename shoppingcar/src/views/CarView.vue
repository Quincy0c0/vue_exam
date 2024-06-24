<template>

  <el-table :data="car" style="width: 100%">
    <el-table-column prop="title" label="商品名称">
      <template #default="scope">
        {{ scope.row.title }}
      </template>
    </el-table-column>

    <el-table-column prop="price" label="价格">
      <template #default="scope">
        {{ scope.row.price }}
      </template>
    </el-table-column>
    <el-table-column prop="number" label="数量">
      <template #default="scope">
        {{ scope.row.number }}
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="scope">
        <el-button type="danger" @click="removeToCar(scope.row)">移除</el-button>
        <el-button type="success" @click="addToCar(scope.row)">添加</el-button>
        <el-button type="warning" @click="reduceToCar(scope.row)">减少</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div>总价:{{ totalPrice }}
    <el-button type="primary" @click="pay">结算</el-button>
  </div>

</template>


<script setup>

import { storeToRefs } from 'pinia'

import { useProductStore } from '@/stores/product.js'

import { watch, ref } from 'vue'

const productStore = useProductStore()

const { car, totalPrice } = storeToRefs(productStore)

const { removeToCar, addToCar, reduceToCar, pay } = productStore





</script>

<style scoped>
div {
  margin-top: 10px;
}
</style>