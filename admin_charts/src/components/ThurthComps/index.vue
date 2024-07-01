<template>
  <el-row>
    <el-col :span="19">
      <baidu-map />
    </el-col>
    <el-col :span="5">
      <thurth-charts />
    </el-col>
  </el-row>
</template>

<script>
import ThurthCharts from './ThurthCharts.vue';

import BaiduMap from './BaiduMap.vue';

export default {
  components: {
    ThurthCharts,
    BaiduMap,
  },
};
</script>

<style lang="scss" scoped>
.el-row {
  padding: 0 1%;
  .el-col:first-child {
    padding-right: 0.5%;
    position: relative;
    overflow: hidden;
    margin-top: 20px;
  }
  .el-col:last-child {
    padding-left: 1.5%;
  }
}
</style>
