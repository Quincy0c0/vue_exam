<template>
  <div>
    <el-card
      class="WaterFill"
      shadow="hover">
      <div
        slot="header"
        class="clearfix"
        style="font-weight: bold">
        订单同比增长
      </div>
      <div style="width: 100%; height: 200px">
        <v-chart :option="WaterFillOption"></v-chart>
      </div>
    </el-card>
    <el-card
      class="WordCloud"
      shadow="hover">
      <div
        slot="header"
        class="clearfix"
        style="font-weight: bold">
        热门搜索
      </div>
      <div style="width: 100%; height: 200px">
        <v-chart :option="WordCloudOption"></v-chart>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getReportData, getKeyWordData } from '@/api/index.js';

export default {
  data() {
    return {
      WaterFillData: [],
      wordCloudData: [],
      WaterFillOption: {},
      WordCloudOption: {},
    };
  },
  methods: {
    createWaterFillChart() {
      this.WaterFillOption = {
        series: {
          type: 'liquidFill',
          data: [this.WaterFillData * 0.01],
          radius: '80%',
          color: ['skyblue'],
          amplitude: '4%',
          outline: {
            borderDistance: 2,
            itemStyle: {
              borderWidth: 2,
            },
          },
        },
      };
    },
    createWordCloudChart() {
      this.WordCloudOption = {
        series: {
          type: 'wordCloud',
          // shape: "cardioid",
          width: '100%',
          height: '100%',
          data: this.wordCloudData,
          textStyle: {
            fontWeight: 'bold',
            color: function () {
              // Random color
              return (
                'rgb(' +
                [
                  Math.round(Math.random() * 160),
                  Math.round(Math.random() * 160),
                  Math.round(Math.random() * 160),
                ].join(',') +
                ')'
              );
            },
          },
          emphasis: {
            focus: 'self',
            textStyle: {
              textShadowBlur: 5,
              textShadowColor: '#333',
            },
          },
        },
        tooltip: {},
      };
    },
  },
  async mounted() {
    let res = await getReportData();
    this.WaterFillData = res.data.salesGrowLastDay;
    let res2 = await getKeyWordData();
    res2 = res2.data.slice(0, 5);
    let arr = [];
    res2.forEach((item) => {
      arr.push({
        name: item.keyWord,
        value: item.totalSearch,
      });
    });
    this.wordCloudData = arr;
    this.createWaterFillChart();
    this.createWordCloudChart();
  },
};
</script>

<style scoped lang="scss">
.WaterFill {
  margin-top: 20px;
}

.WordCloud {
  margin-top: 20px;
}
</style>
