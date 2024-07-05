import { defineStore } from 'pinia'
import { getIP, getAdcode, getDefaultWeather, getAllWeather, getSearchCity } from '@/api/index.js'

import { ref, watch } from 'vue'

import { debounce } from 'lodash-es'

export const useWeatherStore = defineStore('weather', () => {
  const ip = ref('')
  const ipCity = ref({})
  const iptSearch = ref('')
  const SearchReturnCity = ref({})
  const ipCityWeather = ref({})
  const ipCityFutureWeather = ref([])
  const gotoPageInfo = ref({})
  const searchPageData = ref({})
  const searchPageFutureData = ref({})
  const showStorge = ref(false)
  const readyToStorge = ref([])
  const StorgeTemData = ref([])

  const getIPcity = async () => {
    const res = await getIP()
    ip.value = res.data.ip
    const res2 = await getAdcode(ip.value)
    ipCity.value = res2.data
  }

  const getWeatherDefault = async (adcode) => {
    const res = await getDefaultWeather(adcode)
    // 这里需要一个默认的天气
    ipCityWeather.value = res.data.lives[0]
  }

  const getWeatherAll = async (adcode) => {
    const res = await getAllWeather(adcode)
    // console.log(res.data)
    ipCityFutureWeather.value = res.data.forecasts[0].casts
  }

  const SearchCity = async () => {
    const res = await getSearchCity(iptSearch.value)
    SearchReturnCity.value = res.data
  }

  const debouncedSearchCity = debounce(SearchCity, 100)

  const getSearchCityWeather = async (adcode) => {
    const res = await getDefaultWeather(adcode)
    searchPageData.value = res.data.lives[0]
  }

  // const getTemp = async (tem) => {
  //   StorgeTemData.value = []
  //   if (tem !== '0' || tem !== 0) {
  //     const res = await getDefaultWeather(tem)
  //     StorgeTemData.value.push({
  //       temp: res.data.lives[0].temperature,
  //       city: res.data.lives[0].city,
  //       adcode: res.data.lives[0].adcode
  //     })
  //   }
  // }

  const getTemp = async (adcode) => {
    if (adcode !== '0' && adcode !== 0) {
      try {
        const res = await getDefaultWeather(adcode)
        if (res && res.data && res.data.lives && res.data.lives.length > 0) {
          return {
            temp: res.data.lives[0].temperature,
            city: res.data.lives[0].city,
            adcode: res.data.lives[0].adcode
          }
        } else {
          console.error('Unexpected response structure:', res)
          return null // 返回 null 以便过滤
        }
      } catch (error) {
        console.error('Error fetching weather data:', error)
        return null // 返回 null 以便过滤
      }
    } else {
      return null // 如果 adcode 是 '0' 或 0，返回 null
    }
  }

  const getSearchCityFutureWeather = async (adcode) => {
    const res = await getAllWeather(adcode)
    searchPageFutureData.value = res.data.forecasts[0].casts
  }

  const StoreToLocal = () => {
    // console.log('123')
    const res = readyToStorge.value.findIndex(
      (item) => item.city === gotoPageInfo.value.city && item.adcode === gotoPageInfo.value.adcode
    )
    if (
      res === -1 &&
      gotoPageInfo.value.adcode !== undefined &&
      gotoPageInfo.value.city !== undefined
    ) {
      readyToStorge.value.push({ city: gotoPageInfo.value.city, adcode: gotoPageInfo.value.adcode })
      showStorge.value = false
    }

    localStorage.setItem('weatherInfo', JSON.stringify(readyToStorge.value))
  }
  const ToggletoChinese = (value) => {
    if (value === '1') {
      return '一'
    }
    if (value === '2') {
      return '二'
    }
    if (value === '3') {
      return '三'
    }
    if (value === '4') {
      return '四'
    }
    if (value === '5') {
      return '五'
    }
    if (value === '6') {
      return '六'
    }
    if (value === '7') {
      return '日'
    }
  }

  const deleteStorge = (city) => {
    const res = readyToStorge.value.findIndex((item) => item.city === city)

    readyToStorge.value.splice(res, 1)
    localStorage.setItem('weatherInfo', JSON.stringify(readyToStorge.value))
    localStorage.removeItem('SearchPageInfo')
  }

  watch(
    ipCity,
    (newVal) => {
      getWeatherDefault(ipCity.value.adcode)
      getWeatherAll(ipCity.value.adcode)
      // console.log(ipCityWeather.value)
    },
    { deep: true }
  )
  watch(iptSearch, (newVal) => {
    // console.log(newVal)
    // SearchCity()
    console.log(newVal)
    // debounce(SearchCity, 100)
    debouncedSearchCity()
  })
  return {
    ip,
    ipCity,
    getIPcity,
    getWeatherDefault,
    ipCityWeather,
    getWeatherAll,
    ipCityFutureWeather,
    iptSearch,
    SearchReturnCity,
    ToggletoChinese,
    gotoPageInfo,
    getSearchCityWeather,
    getSearchCityFutureWeather,
    searchPageData,
    searchPageFutureData,
    showStorge,
    StoreToLocal,
    readyToStorge,
    getTemp,
    StorgeTemData,
    deleteStorge
  }
})
