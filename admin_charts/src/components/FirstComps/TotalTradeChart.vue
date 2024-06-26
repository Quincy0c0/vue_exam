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
        xAxis: {
          type: 'value',
          show: false,
        },
        yAxis: {
          type: 'category',
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
            type: 'bar',
            data: [130],
            itemStyle: {
              color: 'green',
            },
            barWidth: 10,
            stack: '总量',
          },
          {
            type: 'bar',
            data: [30],
            itemStyle: {
              color: '#ddd',
            },
            barWidth: 10,
            stack: '总量',
          },
          {
            type: 'custom',
            renderItem: (params, api) => {
              //获取三角形绘制的那个位置
              const endPoint = api.coord([api.value(0), 0]);
              return {
                type: 'group',
                children: [
                  {
                    type: 'path',
                    shape: {
                      d: 'M511.744 319.999l-383.744 383.744h767.488l-383.744-383.744z',
                      x: endPoint[0] - 5,
                      y: 40,
                      width: 10,
                      height: 10,
                      layout: 'cover',
                    },
                    style: {
                      fill: 'green',
                    },
                  },
                  {
                    type: 'path',
                    shape: {
                      d: 'M889.696 320.8H158.848l365.504 365.536 365.344-365.536z',
                      x: endPoint[0] - 5,
                      y: 20,
                      width: 10,
                      height: 10,
                      layout: 'cover',
                    },
                    style: {
                      fill: 'green',
                    },
                  },
                ],
              };
            },
            data: [130],
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
      // console.log(this.option.series[0].data);
      // console.log(this.option.series[1].data);
      // console.log(this.option.series[2].data);
      this.option.series[0].data[0] = this.dataValue;
      this.option.series[2].data[0] = this.dataValue;
      // console.log(this.option.series[0].data);
      // this.putData();
    },
  },
};
</script>

<style scoped>
.chart {
  margin: 20ox 0;
}
</style>
