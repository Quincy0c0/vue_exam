<template>
  <div
    class="chart"
    style="width: 100%; height: 70px">
    <v-chart :option="option" />
  </div>
</template>

<script>
export default {
  props: ['dataValue'],
  data() {
    return {
      option: {},
    };
  },
  methods: {
    putData() {
      this.option = {
        tooltip: {},
        legend: {
          show: false,
        },
        xAxis: {
          type: 'category',
          show: false,
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
            name: '销量',
            type: 'line',
            smooth: true,
            data: [5, 20, 36, 10, 10, 20],
            lineStyle: {
              opacity: 0,
            },
            itemStyle: {
              opacity: 0,
            },
            areaStyle: {
              color: 'purple',
            },
          },
        ],
      };
    },
  },
  mounted() {
    this.putData();
  },
  watch: {
    dataValue() {
      // console.log(this.dataValue);
      this.option.series[0].data = this.dataValue;
    },
  },
};
</script>

<style scoped>
.chart {
  margin: 20ox 0;
}
</style>
