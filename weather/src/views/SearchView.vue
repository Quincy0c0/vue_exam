<template>
  <div class="w-full flex flex-col items-center">
    <div class="p-2 text-center bg-weather-secondary w-full">
      你正在预览{{ searchPageData.city }}的天气信息
      <span v-show="showStorge">，可以通过右上角的"+"号按钮保存起来</span>
    </div>
    <div>
      <ul class="container flex flex-col text-center mt-6 gap-4">
        <li>当日气温是：{{ searchPageData.temperature }}摄氏度</li>
        <li>当日天气是：{{ searchPageData.weather }}</li>
        <li>当日风向是：{{ searchPageData.winddirection }}风</li>
        <li>当日风力是：{{ searchPageData.windpower }}级</li>
      </ul>
    </div>
    <hr class="border-white border-opacity-10 mt-6" />
    <div class="bg-weather-secondary px-12 pt-10 mt-2 rounded w-8/12">
      <div class="flex gap-6">
        <div
          class="flex flex-col flex-1 text-center gap-4"
          v-for="(item, index) in searchPageFutureData"
          :key="index"
        >
          <div v-if="index === 0">今天</div>
          <div v-else-if="index === 1">明天</div>
          <div v-else>周{{ ToggletoChinese(item.week) }}</div>
          <div>{{ item.date.slice(5) }}</div>
          <div>{{ item.dayweather }}</div>
          <div>风力 {{ item.nightpower }}级</div>
        </div>
      </div>
      <div style="width: 100%; height: 200px">
        <e-charts :option="option"></e-charts>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useWeatherStore } from '@/stores/weather.js'

import { storeToRefs } from 'pinia'

import { ref, onMounted, watch } from 'vue'

const weatherStore = useWeatherStore()

const { gotoPageInfo, searchPageData, searchPageFutureData, showStorge, readyToStorge } =
  storeToRefs(weatherStore)

const { getSearchCityWeather, getSearchCityFutureWeather, ToggletoChinese } = weatherStore

const dayData = ref([])
const nightData = ref([])

const option = ref({
  tooltip: {
    show: false
  },
  legend: {
    show: false
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,

    show: false
  },
  yAxis: {
    type: 'value',
    boundaryGap: false,
    show: false,
    min: 'DataMin',
    max: 'DataMax'
  },
  gird: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },
  series: [
    {
      name: 'Highest',
      type: 'line',
      data: dayData,
      label: {
        show: true,
        position: 'top',
        color: '#fff',
        formatter: function (params) {
          return '白' + params.value + '°C'
        }
      }
    },
    {
      name: 'Lowest',
      type: 'line',
      data: nightData,
      label: {
        show: true,
        position: 'bottom',
        color: '#fff',
        formatter: function (params) {
          return '晚' + params.value + '°C'
        }
      }
    }
  ]
})

watch(searchPageFutureData, () => {
  searchPageFutureData.value.forEach((item) => {
    dayData.value.push(item.daytemp)
    nightData.value.push(item.nighttemp)
  })
})

watch(readyToStorge, () => {
  const res = readyToStorge.value.findIndex(
    (item) => item.city === gotoPageInfo.value.city && item.adcode === gotoPageInfo.value.adcode
  )
  if (res === -1) {
    showStorge.value = true
  } else {
    showStorge.value = false
  }
})
onMounted(() => {
  if (localStorage.getItem('SearchPageInfo')) {
    gotoPageInfo.value = JSON.parse(localStorage.getItem('SearchPageInfo'))
  }
  getSearchCityWeather(gotoPageInfo.value.adcode)
  getSearchCityFutureWeather(gotoPageInfo.value.adcode)
  const res = readyToStorge.value.findIndex(
    (item) => item.city === gotoPageInfo.value.city && item.adcode === gotoPageInfo.value.adcode
  )
  if (res === -1) {
    showStorge.value = true
  } else {
    showStorge.value = false
  }
})
</script>
