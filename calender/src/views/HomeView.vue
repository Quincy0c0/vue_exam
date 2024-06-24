<script setup>
import { ref } from 'vue';

// import { useHolidayStore } from '../stores/holiday';

// const { getHoliday } = useHolidayStore();

// const holiday = ref([]);

// getHoliday(date.value).then((res) => {
//   holiday.value = res;
//   console.log(holiday.value);
// });
import axios from 'axios';

const date = ref('');

const res = ref('');

const key = ref('d4d4f5d0f069274230bd98b080d4bc58');

await fetch(`/calendar/year?key=${key}&year=2024`).then((res) => res.json());

console.log(res);

const onConfirm = (value) => {
  date.value = value;
  console.log(date.value);
};

const formatter = (day) => {
  const month = day.date.getMonth() + 1;
  const date = day.date.getDate();
  day.topInfo = `${month}月${date}日`;
  return day;
};
</script>

<script>
import axios from 'axios';
const onConfirm = (value) => {
  date.value = value;
  console.log(date.value);
};

const formatter = (day) => {
  const month = day.date.getMonth() + 1;
  const date = day.date.getDate();
  day.topInfo = `${month}月${date}日`;
  return day;
};
</script>

<template>
  <main>
    <van-calendar
      title="日历"
      :poppable="false"
      :show-confirm="false"
      :style="{ height: '500px' }"
      switch-mode="year-month"
      :formatter="formatter"
      @confirm="onConfirm" />
  </main>

  <footer>内容</footer>
</template>

<style scoped>
footer {
  height: 100px;
  width: 100%;
  /* background-color: aqua; */
  text-align: center;
  line-height: 100px;
}
</style>
