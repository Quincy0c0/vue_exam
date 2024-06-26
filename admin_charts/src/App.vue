<template>
  <div>
    <h1>Charts</h1>
    <div
      class="container"
      style="width: 600px; height: 400px">
      <v-chart :option="option" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      option: {
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
      },
    };
  },
};
</script>
