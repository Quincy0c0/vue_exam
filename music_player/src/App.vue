<template>
  <div class="warpper">
    <h1>Music Player</h1>
    <audio
      src="/music.mp3"
      controls />
  </div>
</template>

<script>
export default {
  name: 'music-player',
  data() {
    songlist: [];
  },
  onMounted() {
    fetch();
  },
};
</script>

<style lang="scss" scoped></style>
