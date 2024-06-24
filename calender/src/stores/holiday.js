import { getSpecialDayApi } from '@/api/specialDay';

import { defineStore } from 'pinia';

import { ref } from 'vue';

export const useHolidayStore = defineStore('holiday', () => {
  const key = 'd4d4f5d0f069274230bd98b080d4bc58';

  const getHoliday = async () => {
    const data = await getSpecialDayApi(key, 2025);
    return data;
  };

  return { getHoliday };
});
