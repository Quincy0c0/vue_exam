<template>
  <el-card shadow="hover">
    <div
      slot="header"
      class="clearfix">
      关键词搜索
    </div>
    <div class="main">
      <key-word-chart
        :dataValue="{ showData, TotalUser, TotalSearch }"></key-word-chart>
      <el-table
        :data="showData"
        style="width: 100%">
        <el-table-column
          prop="rank"
          label="排名"
          width="100"></el-table-column>
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
          align="center"></el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="keyWordData.length"
        :page-size="pageSize"
        @current-change="pageChange">
      </el-pagination>
    </div>
  </el-card>
</template>

<script>
import { getKeyWordData } from '@/api/index';

import KeyWordChart from './KeyWordChart.vue';

export default {
  components: {
    KeyWordChart,
  },
  data() {
    return {
      keyWordData: [],
      showData: [],
      pageSize: 6,
      page: 1,
      TotalUser: 0,
      TotalSearch: 0,
    };
  },
  methods: {
    pageChange(page) {
      this.page = page;
      this.showData = this.keyWordData.slice(
        this.pageSize * (page - 1),
        this.pageSize * page
      );
      // console.log(this.showData);
    },
    sumTotalUser() {
      this.TotalUser = this.keyWordData.reduce((pre, cur) => {
        return pre + cur.totalUser;
      }, 0);
    },
    sumTotalSerch() {
      this.TotalSearch = this.keyWordData.reduce((pre, cur) => {
        return pre + cur.totalSearch;
      }, 0);
    },
    getTotal() {
      this.sumTotalUser();
      this.sumTotalSerch();
    },
  },
  async mounted() {
    const res = await getKeyWordData();
    this.keyWordData = res.data;
    this.pageChange(1);
    this.getTotal();
  },
};
</script>

<style scoped lang="scss">
.el-card {
  .clearfix {
    font-size: 16px;
    font-weight: bold;
  }
  .main {
    // padding: 20px;
    position: relative;
    .el-table {
      font-size: 16px;
    }
    .el-pagination {
      position: relative;
      padding: 20px;
      left: 67%;
    }
  }
}
</style>
