<template>
  <div class="bg-weather-primary w-8/12 flex-col flex">
    <div class="pt-4 relative mb-10">
      <input
        type="text"
        placeholder="请输入城市名称"
        class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-md"
        v-model.trim="iptSearch"
      />
      <el-scrollbar
        max-height="100px"
        class="bg-weather-secondary text-white w-full shadow-md py-2 px-1 z-50"
        :style="
          returnData.length > 1
            ? 'height: 120px; position: absolute'
            : 'height: 50px; position: absolute'
        "
        v-show="iptSearch !== ''"
      >
        <div
          v-for="(item, index) in returnData"
          :key="index"
          class="py-2 cursor-pointer"
          @click="goToSearchPage(item)"
        >
          {{ showCity(item) }}
        </div>
        <div v-if="returnData.length === 0" class="py-2">似乎没有找到你查找的城市</div>
      </el-scrollbar>
    </div>
    <el-scrollbar
      max-height="500px"
      class="hover:scrollbar-thumb-blue-300"
      v-show="iptSearch == ''"
    >
      <div
        class="flex justify-between items-stretch"
        v-for="(item, index) in StorgeTemData"
        :key="index"
        @mousemove="showBtns(index)"
        @mouseleave="showIndex = -1"
      >
        <div
          class="mb-4 bg-weather-secondary py-2 px-4 flex justify-between cursor-pointer w-full duration-300"
          :style="showIndex === index ? 'width:78%' : ''"
        >
          <h3>{{ item.city }}</h3>
          <span>{{ item.temp }}度</span>
        </div>
        <div class="flex mb-4 gap-2 justify-between" v-show="showIndex === index">
          <button class="bg-yellow-500 text-center w-[80px]" @click="gotoLoadedPage(item)">
            查看
          </button>
          <button class="bg-yellow-500 text-center w-[80px]" @click="deleteStorge(item.city)">
            删除
          </button>
        </div>
      </div>
    </el-scrollbar>
    <div>
      <div :class="returnData.length > 1 ? 'mt-24' : 'mt-5'">近期天气</div>
      <div class="bg-weather-secondary px-12 pt-10 mt-2 rounded">
        <div class="flex gap-6">
          <div
            class="flex flex-col flex-1 text-center gap-4"
            v-for="(item, index) in ipCityFutureWeather"
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
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

import { useWeatherStore } from '@/stores/weather.js'

import { storeToRefs } from 'pinia'

import { useRouter } from 'vue-router'

const showIndex = ref(-1)

const router = useRouter()

const weatherStore = useWeatherStore()

const { ToggletoChinese, getTemp, deleteStorge } = useWeatherStore()

const {
  ipCityFutureWeather,
  iptSearch,
  SearchReturnCity,
  gotoPageInfo,
  readyToStorge,
  StorgeTemData
} = storeToRefs(weatherStore)

watch(
  readyToStorge,
  () => {
    readyToStorge.value.forEach((item) => {
      getTemp(item.adcode)
    })
  },
  { deep: true }
)

const dayData = ref([])
const nightData = ref([])
const returnData = ref([])

const goToSearchPage = (item) => {
  // console.log(item)
  gotoPageInfo.value = item
  console.log(gotoPageInfo.value)
  router.push('/search')
  localStorage.setItem('SearchPageInfo', JSON.stringify(gotoPageInfo.value))
}

const gotoLoadedPage = (item) => {
  gotoPageInfo.value = {
    adcode: item.adcode,
    city: item.city
  }
  router.push('/search')
  localStorage.setItem('SearchPageInfo', JSON.stringify(gotoPageInfo.value))
}

const showBtns = (index) => {
  showIndex.value = index
}

const showCity = (item) => {
  // console.log(item)
  // console.log(item.city)
  if (item.district.length > 0) {
    // console.log(item.district)
    return item.district
  } else if (item.city.length > 0) {
    return item.city
  } else return item.province
}

watch(ipCityFutureWeather, () => {
  ipCityFutureWeather.value.forEach((item) => {
    dayData.value.push(item.daytemp)
    nightData.value.push(item.nighttemp)
  })
})

watch(SearchReturnCity, () => {
  console.log(SearchReturnCity.value)
  // console.log(SearchReturnCity.value.status)
  if (SearchReturnCity.value.status === '1') {
    returnData.value = []

    // console.log(SearchReturnCity.value.geocodes)
    SearchReturnCity.value.geocodes.forEach((item) => {
      const res = returnData.value.findIndex((i) => i.city === item.city)
      if (res === -1) {
        returnData.value.push(item)
      }
    })
    // console.log(returnData.value)
  }
})

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
</script>
