<template>
  <div class="firstComps">
    <general-card
      :headerText="'累计销售额'"
      :value="reportData.salesToday">
      <template v-slot:chart>
        <div class="chart1">
          <p>
            <span> 日同比</span> {{ reportData.salesGrowLastDay }}%
            <span class="increase"></span>
          </p>
          <p>
            <span>月同比 </span>{{ reportData.saleSGrowLastMonth }}%
            <span class="increase"></span>
          </p>
        </div>
      </template>
      <template v-slot:button>
        <div class="button">
          <span>昨日销售额</span>
          ￥{{ reportData.salesLastDay }}
        </div>
      </template>
    </general-card>
    <general-card
      :headerText="'累计订单额'"
      :value="reportData.orderToday">
      <template v-slot:button>
        <div class="button">
          <span>昨日销售额</span>
          ￥{{ reportData.orderLastDay }}
        </div>
      </template>
      <template v-slot:chart>
        <sales-grow-chart :dataValue="reportData.orderTrend" />
      </template>
    </general-card>
    <general-card
      :headerText="'今日交易用户数'"
      :value="reportData.userToday">
      <template v-slot:button>
        <div class="button">
          <span>退货率</span>
          {{ reportData.returnRate }}%
        </div>
      </template>
      <template v-slot:chart>
        <trade-number-chart :dataValue="reportData.orderUserTrend" />
      </template>
    </general-card>
    <general-card
      :headerText="'累计用户数'"
      :value="reportData.totalUser">
      <template v-slot:chart>
        <total-trade-chart :dataValue="reportData.userLastMonth" />
      </template>
      <template v-slot:button>
        <div class="button">
          <div>
            <span>日同比</span>
            {{ reportData.userGrowLastDay }}%
            <span class="increase"></span>
          </div>
          <div>
            <span>月同比</span>
            {{ reportData.userGrowLastMonth }}%
            <span class="increase"></span>
          </div>
        </div>
      </template>
    </general-card>
  </div>
</template>

<script>
import { getReportData } from '@/api/index.js';

import GeneralCard from './GeneralCard.vue';

import SalesGrowChart from './SalesGrowChart.vue';

import TradeNumberChart from './TradeNumberChart.vue';

import TotalTradeChart from './TotalTradeChart.vue';

export default {
  components: {
    GeneralCard,
    SalesGrowChart,
    TradeNumberChart,
    TotalTradeChart,
  },
  data() {
    return {
      reportData: {},
    };
  },
  async mounted() {
    const res = await getReportData();
    this.reportData = res.data;
  },
};
</script>

<style lang="scss" scoped>
.firstComps {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: nowrap;
  .el-card {
    height: 100%;
    width: 23.5%;
    .chart1 {
      margin: 20px 0px;
      p {
        font-size: 14px;
        position: relative;
        margin-top: 10px;
        font-weight: bold;
        span {
          font-size: 14px;
          color: #464545;
          font-weight: normal;
          margin-right: 10px;
        }
        .increase {
          position: absolute;
          height: 0;
          border-width: 4px;
          border-color: transparent transparent green transparent;
          border-style: solid;
          transform: translateY(0%);
          margin-left: 5px;
        }
      }
    }
    .button {
      height: 10%;
      font-size: 14px;
      position: relative;
      font-weight: bold;
      span {
        font-size: 14px;
        color: #464545;
        font-weight: normal;
      }
      div {
        font-weight: bold;
        display: inline-block;
        margin-right: 20px;
        font-size: 14px;
        color: #464545;
        .increase {
          position: absolute;
          height: 0;
          border-width: 4px;
          border-color: transparent transparent green transparent;
          border-style: solid;
          transform: translateY(0%);
          margin-left: 5px;
        }
      }
    }
  }
}
</style>
