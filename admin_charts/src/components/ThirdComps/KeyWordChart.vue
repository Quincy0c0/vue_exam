<template>
  <el-row>
    <el-col :span="12">
      <p class="text">搜索用户量</p>
      <p class="number">{{ dataValue.TotalUser }}</p>
      <div style="width: 100%; height: 50px">
        <v-chart :option="optionTotalUser"></v-chart>
      </div>
    </el-col>
    <el-col :span="12">
      <p class="text">搜索量</p>
      <p class="number">{{ dataValue.TotalSearch }}</p>
      <div style="width: 100%; height: 50px">
        <v-chart :option="optionTotalSearch"></v-chart>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: {
    dataValue: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      optionTotalUser: {},
      optionTotalSearch: {},
      searchData: [],
      userData: [],
    };
  },
  methods: {
    putData() {
      let resSearch = [];
      let resUser = [];
      this.dataValue.showData.forEach((element) => {
        resSearch.push(element.totalSearch);
        resUser.push(element.totalUser);
      });
      this.searchData = resSearch;
      this.userData = resUser;
    },
    createChartUser() {
      this.optionTotalUser = {
        tooltip: {
          show: false,
        },
        legend: {
          show: false,
        },
        xAxis: {
          type: 'category',
          show: false,
          boundaryGap: false,
          inverse: true,
        },
        yAxis: {
          type: 'value',
          show: false,
        },
        grid: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        },
        series: [
          {
            name: '搜索用户量',
            type: 'line',
            data: this.userData,
            smooth: true,
            itemStyle: {
              opacity: 0,
            },
            areaStyle: {
              color: 'skyblue',
            },
          },
        ],
      };
    },
    createChartSearch() {
      this.optionTotalSearch = {
        tooltip: {
          show: false,
        },
        legend: {
          show: false,
        },
        xAxis: {
          type: 'category',
          show: false,
          boundaryGap: false,
          inverse: true,
        },
        yAxis: {
          type: 'value',
          show: false,
        },
        grid: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        },
        series: [
          {
            name: '搜索用户量',
            type: 'line',
            data: this.userData,
            smooth: true,
            itemStyle: {
              opacity: 0,
            },
            areaStyle: {
              color: 'skyblue',
            },
          },
        ],
      };
    },
  },
  watch: {
    dataValue() {
      // console.log('dataValue', this.dataValue);
      // console.log(this.dataValue.showData);
      this.putData();
      this.createChartUser();
      this.createChartSearch();
    },
    deep: true,
  },
};
</script>

<style scoped lang="scss">
.el-row {
  .el-col {
    padding: 15px;
    .text {
      font-size: 14px;
      color: #727171;
    }
    .number {
      font-size: 20px;
      font-weight: 600;
      margin-top: 10px;
    }
  }
}
</style>
