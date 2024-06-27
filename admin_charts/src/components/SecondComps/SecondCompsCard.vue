<template>
  <el-card shadow="hover">
    <div
      slot="header"
      class="clearfix">
      <el-menu
        mode="horizontal"
        class="el-menu-demo">
        <el-menu-item
          index="1"
          @click="fn1"
          >销售额</el-menu-item
        >
        <el-menu-item
          index="2"
          @click="fn2"
          >访问量</el-menu-item
        >
      </el-menu>
      <div class="date">
        <el-radio-group v-model="dateRadio">
          <el-radio-button label="今日"></el-radio-button>
          <el-radio-button label="本周"></el-radio-button>
          <el-radio-button label="本月"></el-radio-button>
          <el-radio-button label="本年"></el-radio-button>
        </el-radio-group>
        <el-date-picker
          v-model="dateValue"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
    </div>
    <div class="viewport">
      <div
        class="chart"
        style="width: 70%; height: 435px">
        <v-chart :option="option" />
      </div>
    </div>
  </el-card>
</template>

<script>
import { getSaleData } from '@/api/index.js';

export default {
  data() {
    return {
      ChartValue: 0,
      dateRadio: '本年',
      dateValue: '',
      ApigetData: {},
      option: {},
    };
  },
  methods: {
    fn1() {
      this.ChartValue = 1;
      console.log(this.ChartValue);
    },
    fn2() {
      this.ChartValue = 2;
      console.log(this.ChartValue);
    },
    createChart() {
      this.option = {
        title: {
          text: 'ECharts 入门示例',
        },
        tooltip: {},
        legend: {
          data: ['销量'],
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      };
    },
  },
  async mounted() {
    let res = await getSaleData();
    this.ApigetData = res.data;
    this.createChart();
  },
};
</script>

<style scoped>
.clearfix {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/deep/ .el-card__header {
  padding: 0;
}
.el-menu-demo {
  margin-left: 3%;
  border: none;
}

.date {
  margin-right: 2%;
}

.date .el-radio-group {
  margin-right: 15px;
}
</style>
