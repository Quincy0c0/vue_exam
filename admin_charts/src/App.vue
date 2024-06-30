<template>
  <div class="container">
    <first-comps />
    <second-comps />
    <third-comps />
    <thurth-comps />
  </div>
</template>

<script>
import firstComps from './components/FirstComps/index.vue';

import SecondComps from './components/SecondComps/index.vue';

import ThirdComps from './components/ThirdComps/index.vue';

import ThurthComps from './components/ThurthComps/index.vue';

export default {
  components: {
    firstComps,
    SecondComps,
    ThirdComps,
    ThurthComps,
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  padding-top: 20px;
  padding-bottom: 20px;
  background-color: #eee;
}
</style>
