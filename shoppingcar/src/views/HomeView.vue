<template>
  <el-card style="max-width: 100%">
    <template #header>
      <h1>购物车</h1>
      <div>
        <el-button type="primary" @click="golist">购物清单</el-button>
        <el-button type="primary" @click="gocar">购物车</el-button>
      </div>
    </template>
    <router-view></router-view>
  </el-card>
</template>
<script setup>

import { useRouter } from 'vue-router'
const router = useRouter()

const golist = () => {
  router.push('/list')
}

const gocar = () => {
  router.push('/car')
}
</script>


<style scoped>
.el-card__header h1 {
  text-align: center;
}

.el-card__header div {
  display: flex;
  justify-content: center
}
</style>