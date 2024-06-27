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
          boundaryGap: false,
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
            data: this.dataValue,
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
  watch: {
    dataValue() {
      this.putData();
    },
  },
};
</script>

<style scoped>
.chart {
  margin: 20ox 0;
}
</style>
