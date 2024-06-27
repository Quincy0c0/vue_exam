<template>
  <el-row>
    <el-col :span="12">
      <key-word-card></key-word-card>
    </el-col>
    <el-col :span="12">
      <circle-chart-card></circle-chart-card>
    </el-col>
  </el-row>
</template>

<script>
import KeyWordCard from './KeyWordCard.vue';

import CircleChartCard from './CircleChartCard.vue';

export default {
  components: {
    KeyWordCard,
    CircleChartCard,
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
