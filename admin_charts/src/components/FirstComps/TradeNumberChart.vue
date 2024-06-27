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
          data: [
            '00:00',
            '02:00',
            '04:00',
            '06:00',
            '08:00',
            '10:00',
            '12:00',
            '14:00',
            '16:00',
            '18:00',
            '20:00',
            '22:00',
          ],
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
            name: '实时交易量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20],
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
