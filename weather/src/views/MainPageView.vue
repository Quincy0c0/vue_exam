<template>
  <div class="bg-weather-primary flex flex-col">
    <div class="pt-4 mb-8 relative">
      <input
        type="text"
        placeholder="请输入城市名称"
        class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-md"
      />
    </div>
    <div>近期天气</div>
    <div class="bg-weather-secondary px-12 pt-10 mt-2 rounded">
      <div class="flex gap-6">
        <div
          class="flex flex-col flex-1 text-center gap-4"
          v-for="(item, index) in ipCityFutureWeather"
          :key="index"
        >
          <div>{{ item.date }}</div>
          <div>{{ item.dayweather }}</div>
          <div>风力 {{ item.nightpower }}级</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useWeatherStore } from '@/stores/weather.js'

import { storeToRefs } from 'pinia'

const weatherStore = useWeatherStore()

const { ipCityFutureWeather } = storeToRefs(weatherStore)
</script>
