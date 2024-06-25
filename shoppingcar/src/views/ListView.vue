<template>
  <el-table
    :data="product"
    style="width: 100%">
    <el-table-column
      align="center"
      prop="title"
      label="商品名称">
      <!-- <template #default="scope">
        {{ scope.row.title }}
      </template> -->
    </el-table-column>

    <el-table-column
      align="center"
      prop="price"
      label="价格">
      <!-- <template #default="scope">
        {{ scope.row.price }}
      </template> -->
    </el-table-column>
    <el-table-column
      align="center"
      prop="number"
      label="数量">
      <!-- <template #default="scope">
        {{ scope.row.number }}
      </template> -->
    </el-table-column>
    <el-table-column
      align="center"
      label="操作">
      <template #default="scope">
        <el-button
          type="success"
          @click="addToCar(scope.row)"
          >添加至购物车</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { storeToRefs } from 'pinia';

import { useProductStore } from '@/stores/product.js';

const productStore = useProductStore();
const { product } = storeToRefs(productStore);
const { addToCar } = productStore;
</script>
