<template>
  <el-card shadow="hover">
    <div
      slot="header"
      class="clearfix">
      <span class="text">分类销售排行</span>
      <el-radio-group v-model="radio">
        <el-radio-button label="品类"></el-radio-button>
        <el-radio-button label="商品"></el-radio-button>
      </el-radio-group>
    </div>
    <div style="width: 100; height: 526px">
      <v-chart :option="option"></v-chart>
    </div>
  </el-card>
</template>

<script>
import { getCategoryData } from '@/api/index.js';

export default {
  data() {
    return {
      radio: '品类',
      Data: {},
      option: {},
      showData: [],
      sumValue: 0,
    };
  },
  methods: {
    CreateChart() {
      this.option = {
        title: [
          {
            text: '品类分布',
            // subtext: `{a|累计订单量}\n{b|${this.sumValue}}`,
            // itemGap: 190,
            textStyle: {
              fontSize: 14,
              color: '#999',
            },
            // subtextStyle: {
            //   rich: {
            //     a: {
            //       fontSize: 14,
            //       fontWeight: 'bold',
            //       color: '#999',
            //       padding: [30, 0, 0, 270],
            //     },
            //     b: {
            //       fontSize: 28,
            //       color: '#333',
            //       // fontWeight: 'bold',
            //       lineHeight: 50,
            //       padding: [0, 0, 0, 270],
            //     },
            //   },
            // },
          },
          {
            text: `{a|累计订单量}\n{b|${this.sumValue}}`,
            // textVerticalAlign: 'middle',
            // textAlign: 'center',
            top: '45%',
            left: '35%',
            textStyle: {
              rich: {
                a: {
                  fontSize: 14,
                  fontWeight: 'bold',
                  color: '#999',
                },
                b: {
                  fontSize: 28,
                  color: '#333',
                  // fontWeight: 'bold',
                  lineHeight: 50,
                },
              },
            },
          },
        ],
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            // var colorDotHtml =
            //   '<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;background-color:' +
            //   params.color +
            //   ';"></span>';
            return (
              params.seriesName +
              '<br/>' +
              // colorDotHtml +
              params.marker +
              params.name +
              '<br/>' +
              // colorDotHtml +
              params.marker +
              '销售额:' +
              params.value
            );
          },
        },
        legend: {
          left: 'right',
          orient: 'vertical',
          align: 'left',
          left: '80%',
          textStyle: {
            color: '#999',
          },
        },
        series: [
          {
            name: '品类分布',
            type: 'pie',
            radius: ['44%', '60%'],
            center: ['40%', '50%'],
            itemStyle: {
              // borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 10,
            },
            data: this.showData,
          },
        ],
      };
    },
    editFormatter(obj) {
      this.option.legend.formatter = function (name) {
        let tarValue = '';
        obj.forEach((element) => {
          if (element.name == name) {
            tarValue = element.value;
          }
        });
        return name + ' | ' + tarValue;
      };
    },
    toggleChart() {
      function modelData(obj) {
        obj.forEach((element) => {
          element.name = element.title;
        });
      }
      if (this.radio === '品类') {
        modelData(this.data.data1);
        this.showData = this.data.data1;
        this.sumTotal(this.data.data1);
        this.CreateChart();
      } else {
        modelData(this.data.data2);
        this.showData = this.data.data2;
        this.sumTotal(this.data.data2);
        this.CreateChart();
      }
    },
    sumTotal(data) {
      this.sumValue = 0;
      data.forEach((e) => {
        this.sumValue += e.value;
      });
    },
  },
  watch: {
    radio: function (newVal, oldVal) {
      this.toggleChart();
      this.editFormatter(this.showData);
    },
    deep: true,
  },
  async mounted() {
    const res = await getCategoryData();
    this.data = res.data;
    this.toggleChart();
    this.editFormatter(this.showData);
  },
};
</script>

<style scoped lang="scss">
:deep(.el-card__header) {
  padding: 6px 18px;
  .text {
    font-weight: bold;
  }
  .el-radio-group {
    position: relative;
    left: 70%;
  }
}
</style>
