<template>
  <header class="bg-weather-primary shadow-lg sticky top-0 z-10 w-full">
    <div class="text-white py-6 justify-around flex">
      <div class="flex w-4/10 items-center justify-around">
        <a href="/" class="text-2xl"><i class="fa-solid fa-sun"></i>&nbsp;&nbsp;新中地天气</a
        >&nbsp;&nbsp;
        <div class="text-lg">{{ ipCityWeather.city }}</div>
        &nbsp;&nbsp;
        <div class="text-sm">
          <span>实时天气:</span>
          &nbsp;
          <span>{{ ipCityWeather.weather }} </span>
          &nbsp;
          <span>{{ ipCityWeather.temperature }}°C</span>
          &nbsp;
          <span>{{ ipCityWeather.winddirection }}风</span>
          <span>{{ ipCityWeather.windpower }}级</span>
        </div>
      </div>
      <div class="items-end text-center">
        <i
          class="fa-solid fa-circle-info text-xl hover:text-weather-secondary cursor-pointer duration-1000"
          @click="openHelp"
        ></i>
        &nbsp;
        <i
          class="fa-solid fa-plus text-xl hover:text-weather-secondary duration-150 cursor-pointer"
          v-show="showStorge"
          @click="StoreToLocal"
        ></i>
      </div>
    </div>
  </header>
  <main class="text-white justify-around flex">
    <router-view />
  </main>
</template>

<script setup>
import { onMounted } from 'vue'

import { useWeatherStore } from '@/stores/weather.js'

import { storeToRefs } from 'pinia'

const weatherStore = useWeatherStore()

const { ipCityWeather, showStorge, readyToStorge } = storeToRefs(weatherStore)

const { getIPcity, StoreToLocal } = weatherStore

onMounted(() => {
  getIPcity()
  // console.log(localStorage.getItem('weatherInfo'))
  //将本地信息转化为数组
  if (localStorage.getItem('weatherInfo')) {
    readyToStorge.value = JSON.parse(localStorage.getItem('weatherInfo'))
  }
  // console.log(readyToStorge.value)
})

const openHelp = () => {
  ElMessageBox.alert(
    '<div style="color:black;font-size:12px"><h2 style="font-size:16px">关于:</h2><p>这个应用可以用来追踪你选择城市的当前天气</p><p>&nbsp</p><h2 style="font-size:16px">如何使用:</h2><p> 1.点击搜索框输入你希望追踪的城市<br/> 2.在搜索结果中选中一个城市，你将获取当地最新的天气<br/> 3.点击右侧的＋号可以将追踪城市的天气情况保存在首页 </p><p>&nbsp</p><h2 style="font-size:16px">移除城市:</h2><p> 如果你不想在首页关注某个城市,可以通过底部的按钮删<br>除它 </p><p>&nbsp</p></div>',
    '',
    {
      confirmButtonText: '关闭',
      'show-close': false,
      draggable: true,
      center: true,
      dangerouslyUseHTMLString: true
    }
  )
}
</script>

<style scoped>
:deep(.el-message-box) {
  width: 322px;
  border-radius: 0;
}
:deep(.el-message-box__btns) {
  justify-content: flex-start;
}
:deep(.el-button--primary) {
  background-color: rgb(0, 102, 138);
  outline: none;
  border: none;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  border-radius: 0;
  padding: 10px 20px;
  cursor: pointer;
}
</style>
