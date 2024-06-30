<template>
  <el-row>
    <el-col :span="19">
      <h1>1</h1>
    </el-col>
    <el-col :span="5">
      <thurth-charts />
    </el-col>
  </el-row>
</template>

<script>
import ThurthCharts from './ThurthCharts.vue';

export default {
  components: {
    ThurthCharts,
  },
};
</script>

<style lang="scss" scoped>
.el-row {
  padding: 0 1%;
  .el-col:first-child {
    padding-right: 0.5%;
  }
  .el-col:last-child {
    padding-left: 0.5%;
  }
}
</style>
