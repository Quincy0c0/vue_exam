<template>
  <el-card shadow="hover">
    <p class="title">{{ headerText }}</p>
    <p class="value">{{ value }}</p>
    <slot name="chart"></slot>
    <el-divider></el-divider>
    <slot name="button"></slot>
  </el-card>
</template>

<script>
export default {
  props: ['headerText', 'value'],
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 12px;
  color: #777;
  letter-spacing: 1px;
}
.value {
  font-size: 24px;
  font-weight: 600;
  margin-top: 10px;
}
.button {
  margin-left: 8px;
  font-weight: 550;
  span {
    font-size: 14px;
    color: #464545;
  }
}
.el-divider {
  margin: 10px 0;
}
</style>
