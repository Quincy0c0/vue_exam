<template>
  <el-card>
    <div
      lot="header"
      class="clearfix">
      关键词搜索
    </div>
    <el-table> </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="50"
      @current-change="pageChange">
    </el-pagination>
  </el-card>
</template>

<script>
import { getKeyWordData } from '@/api/index';

export default {
  data() {
    return {
      keyWordData: [],
    };
  },
  methods: {
    pageChange(page) {
      console.log(page);
    },
  },
  async mounted() {
    const res = await getKeyWordData();
    // console.log(res.data);
    this.keyWordData = res.data;
  },
};
</script>

<style scoped lang="scss">
.el-card {
  .clearfix {
    font-size: 16px;
    font-weight: bold;
  }
}
</style>
