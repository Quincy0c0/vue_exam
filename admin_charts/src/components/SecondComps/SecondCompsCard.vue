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
          @click="chart1"
          >销售额</el-menu-item
        >
        <el-menu-item
          index="2"
          @click="chart2"
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
        <v-chart
          :option="option"
          style="width: 100%; height: 100%" />
      </div>
      <div
        class="list"
        style="width: 30%; height: 435px">
        <ul>
          <li class="title">排行榜</li>
          <template v-if="ChartValue === 1">
            <li
              v-for="item in DataValue.saleRank"
              :key="item.index">
              <div
                class="head"
                :class="`rank${item.no}`">
                {{ item.no }}
              </div>
              {{ item.title }}
              <div class="tail">{{ item.sales }}</div>
            </li>
          </template>
          <template v-if="ChartValue === 2">
            <li
              v-for="item in DataValue.visitRank"
              :key="item.index">
              <span
                class="head"
                :class="`rank${item.no}`"
                >{{ item.no }}</span
              >
              {{ item.title }}
              <span class="tail">{{ item.sales }}</span>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </el-card>
</template>

<script>
import { getSaleData } from '@/api/index.js';

export default {
  data() {
    return {
      ChartValue: 1,
      dateRadio: '本年',
      dateValue: '',
      option: {},
      DataValue: {},
      xInChart: [],
      yInChart: [],
    };
  },
  methods: {
    chart1() {
      this.ChartValue = 1;
      // console.log(this.ChartValue);
      this.xInChart = this.DataValue.saleFulleYearAxis;
      this.yInChart = this.DataValue.saleFulleYear;
      this.createChart();
    },
    chart2() {
      this.ChartValue = 2;
      // console.log(this.ChartValue);
      this.xInChart = this.DataValue.visitFullYeadAxis;
      this.yInChart = this.DataValue.visitFullYear;
      this.createChart();
    },
    createChart() {
      this.option = {
        title: {
          text: '年度销售额',
          left: '7%',
          textStyle: {
            fontSize: 14,
          },
        },
        tooltip: {
          show: false,
        },
        // legend: {
        //   data: ['销量'],
        // },
        gird: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        },
        xAxis: {
          data: this.xInChart,
          axisTick: {
            alignWithLabel: true,
          },
        },
        yAxis: {
          splitLine: {
            lineStyle: {
              type: 'dotted',
            },
          },
        },
        series: [
          {
            name: '销量',
            type: 'bar',
            data: this.yInChart,
            color: 'skyblue',
            barWidth: '40%',
          },
        ],
      };
    },
  },
  async mounted() {
    const res = await getSaleData();
    this.DataValue = res.data;
    // console.log(this.DataValue);
    this.chart1();
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

/deep/ .el-card__body {
  /* padding: 0; */
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

.viewport {
  display: flex;
  justify-content: space-between;
  position: relative;
}

.chart {
  min-width: 1100px;
  position: relative;
  left: -3%;
}

.viewport ul {
  display: flex;
  flex-direction: column;
  position: relative;
  left: -3%;
}

.viewport ul .title {
  font-size: 14px;
  font-weight: bold;
  margin-top: 0;
  left: 0;
}

.viewport ul li {
  margin-top: 20px;
  display: flex;
  font-size: 14px;
}

.viewport ul li .head {
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  text-align: center;
  line-height: 20px;
  margin-right: 20px;
}

.viewport ul li .tail {
  margin-left: auto;
  margin-right: 30px;
}

.viewport ul li .rank1,
.viewport ul li .rank2,
.viewport ul li .rank3 {
  border-radius: 50%;
  background-color: #09b3f7;
  color: #eee;
}
</style>
