<script setup>

import { ref, watch } from 'vue';

import { useInfoStore } from '../stores/getInfo.js'

const { getHoliday } = useInfoStore()

const date = ref('');

const holiday = getHoliday()

console.log(holiday);

const onConfirm = (value) => {
  date.value = value;
  console.log(date.value);
};

const formatter = (day) => {
  const month = day.date.getMonth() + 1;
  const date = day.date.getDate();
  day.topInfo = `${month}月${date}日`;

  return day
};


</script>



<template>

  <main>
    <van-calendar title="日历" :poppable="false" :show-confirm="false" :style="{ height: '500px' }"
      switch-mode="year-month" :formatter="formatter" @confirm="onConfirm" />
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
