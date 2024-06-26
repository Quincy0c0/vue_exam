import { defineStore } from 'pinia';

export const useDataStore = defineStore({
  id: 'data',
  data() {
    return {
      reportData: {},
    };
  },
  async mounted() {
    console.log('mounted');
    const res = await getReportData();
    this.reportData = res.data;
    console.log(this.reportData);
  },
});
