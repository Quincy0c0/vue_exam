import { defineStore } from 'pinia'
import { getIP, getAdcode, getDefaultWeather, getAllWeather } from '@/api/index.js'

import { ref, watch } from 'vue'
export const useWeatherStore = defineStore('weather', () => {
  const ip = ref('')

  const ipCity = ref({})

  const ipCityWeather = ref({})
  const ipCityFutureWeather = ref([])

  const getIPcity = async () => {
    const res = await getIP()
    ip.value = res.data.ip
    const res2 = await getAdcode(ip.value)
    ipCity.value = res2.data
  }

  const getWeatherDefault = async () => {
    const res = await getDefaultWeather(ipCity.value.adcode)

    // 这里需要一个默认的天气
    ipCityWeather.value = res.data.lives[0]
  }

  const getWeatherAll = async () => {
    const res = await getAllWeather(ipCity.value.adcode)
    console.log(res.data)
    ipCityFutureWeather.value = res.data.forecasts[0].casts
  }

  watch(
    ipCity,
    (newVal) => {
      getWeatherDefault()
      getWeatherAll()
    },
    { deep: true }
  )
  return {
    ip,
    ipCity,
    getIPcity,
    getWeatherDefault,
    ipCityWeather,
    getWeatherAll,
    ipCityFutureWeather
  }
})
