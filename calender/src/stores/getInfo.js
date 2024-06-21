import { defineStore } from 'pinia'

import { ref } from 'vue'

import { getHolidayApi } from '@/api/calender'

const key = 'd4d4f5d0f069274230bd98b080d4bc58'

export const useInfoStore = defineStore('calender', () => {

  const getHoliday = async () => {
    const holiday = await getHolidayApi(key, 2024)
    return holiday
  }

  return { getHoliday }
})
