<template>
  <div class="secondComps">
    <SecondCompsCard :DataValue="{ ...Value }" />
  </div>
</template>

<script>
import SecondCompsCard from './SecondCompsCard.vue';

export default {
  components: {
    SecondCompsCard,
  },
  data() {
    return {
      Value: {},
    };
  },
};
</script>

<style scoped>
.secondComps {
  margin: 20px 1%;
}
</style>
