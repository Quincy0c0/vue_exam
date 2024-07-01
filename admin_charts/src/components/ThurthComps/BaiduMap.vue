<template>
  <div style="width: 100%; height: 610px">
    <v-chart :option="option"></v-chart>
  </div>
</template>

<script>
import 'echarts/extension/bmap/bmap.js';
import { getMapData } from '@/api/index';
export default {
  data() {
    return {
      Data: [],
      option: {},
    };
  },
  methods: {
    loadMap() {
      this.option = {
        bmap: {
          key: 'DFgj5QIQk55Z26hrLAKgMYQ7gM0Wwf4g',
          center: [108.954355, 34.346721],
          zoom: 5,
          roam: true,
          mapStyle: {
            styleJson: [
              {
                featureType: 'water',
                elementType: 'all',
                stylers: {
                  color: '#d1d1d1',
                },
              },
              {
                featureType: 'land',
                elementType: 'all',
                stylers: {
                  color: '#f3f3f3',
                },
              },
              {
                featureType: 'railway',
                elementType: 'all',
                stylers: {
                  visibility: 'off',
                },
              },
              {
                featureType: 'highway',
                elementType: 'all',
                stylers: {
                  color: '#fdfdfd',
                },
              },
              {
                featureType: 'highway',
                elementType: 'labels',
                stylers: {
                  visibility: 'off',
                },
              },
              {
                featureType: 'arterial',
                elementType: 'geometry',
                stylers: {
                  color: '#fefefe',
                },
              },
              {
                featureType: 'arterial',
                elementType: 'geometry.fill',
                stylers: {
                  color: '#fefefe',
                },
              },
              {
                featureType: 'poi',
                elementType: 'all',
                stylers: {
                  visibility: 'off',
                },
              },
              {
                featureType: 'green',
                elementType: 'all',
                stylers: {
                  visibility: 'off',
                },
              },
              {
                featureType: 'subway',
                elementType: 'all',
                stylers: {
                  visibility: 'off',
                },
              },
              {
                featureType: 'manmade',
                elementType: 'all',
                stylers: {
                  color: '#d1d1d1',
                },
              },
              {
                featureType: 'local',
                elementType: 'all',
                stylers: {
                  color: '#d1d1d1',
                },
              },
              {
                featureType: 'arterial',
                elementType: 'labels',
                stylers: {
                  visibility: 'off',
                },
              },
              {
                featureType: 'boundary',
                elementType: 'all',
                stylers: {
                  color: '#fefefe',
                },
              },
              {
                featureType: 'building',
                elementType: 'all',
                stylers: {
                  color: '#d1d1d1',
                },
              },
              {
                featureType: 'label',
                elementType: 'labels.text.fill',
                stylers: {
                  color: '#999999',
                },
              },
            ],
          },
        },
        title: {
          text: '新中地网点地图',
          left: 'center',
        },
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            return (
              '新中地外卖<br>' +
              params.marker +
              params.name +
              ' &nbsp&nbsp&nbsp ' +
              '<span style="font-weight: bold;">' +
              params.value[2] +
              '</span>'
            );
          },
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['销售额'],
        },
        series: [
          {
            name: '新中地外卖',
            type: 'scatter',
            coordinateSystem: 'bmap',
            data: this.Data,
            encode: {
              value: 2,
            },
            symbolSize(value) {
              return value[2] / 10;
            },
          },
          {
            name: '新中地外卖',
            type: 'effectScatter',
            coordinateSystem: 'bmap',
            data: this.Data.sort((a, b) => b.value[2] - a.value[2]).slice(
              0,
              10
            ),
            symbolSize(value) {
              return value[2] / 10;
            },
            encode: {
              value: 2,
            },
            rippleEffect: {
              brushType: 'stroke',
              color: 'purple',
            },
            tooltip: {
              formatter(params) {
                return (
                  params.name +
                  '销售额: &nbsp&nbsp&nbsp' +
                  '<span style="font-weight: bold;">' +
                  params.value[2] +
                  '</span>'
                );
              },
              textStyle: {
                color: 'green',
              },
            },
          },
        ],
      };
    },
    converData(city, geodata) {
      let res = [];
      city.forEach((city) => {
        let geo = geodata[city.name];
        if (geo) {
          res.push({
            name: city.name,
            value: geo.concat(city.value),
          });
        }
      });
      return res;
    },
  },
  async mounted() {
    const res = await getMapData();
    this.Data = this.converData(res.data.city, res.data.geodata);
    this.loadMap();
  },
};
</script>

<style scoped lang="scss"></style>
