<template>
  <div class="container">
    <first-comps />
    <div class="secondComps">
      <second-comps-card />
    </div>
  </div>
</template>

<script>
import firstComps from './components/FirstComps/index.vue';

import SecondCompsCard from './components/SecondComps/SecondCompsCard.vue';

export default {
  components: {
    firstComps,
    SecondCompsCard,
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  padding-top: 20px;
  padding-bottom: 20px;
  background-color: #eee;
  .secondComps {
    margin: 20px 1%;
    width: 98%;
  }
}
</style>
