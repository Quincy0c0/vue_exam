<template>
  <el-card>
    <div
      lot="header"
      class="clearfix">
      关键词搜索
    </div>
    <el-table
      :data="showData"
      style="width: 100%">
      <el-table-column
        prop="rank"
        label="排名"
        align="center"></el-table-column>
      <el-table-column
        prop="keyWord"
        label="关键词"
        align="center"></el-table-column>
      <el-table-column
        prop="totalSearch"
        label="总搜索量"
        align="center"></el-table-column>
      <el-table-column
        prop="totalUser"
        label="搜索用户数"
        ></el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="40"
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
      showData: [],
      pageSize: 6,
      page: 1,
    };
  },
  methods: {
    pageChange(page) {
      this.page = page;
      this.showData = this.keyWordData.slice(
        this.pageSize * (page - 1),
        this.pageSize * page
      );
      console.log(this.showData);
    },
  },
  async mounted() {
    const res = await getKeyWordData();
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
