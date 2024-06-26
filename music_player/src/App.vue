<template>
  <div class="warpper">
    <div class="topbar">
      <h1>Music Player</h1>
      <audio
        src="/music.mp3"
        controls
        @timeupdate="timeupdate" />
    </div>
    <div class="wordbox">
      <ul
        class="wordline"
        :style="transform_long"
        ref="wordline">
        <li
          v-for="(item, index) in word"
          :key="index"
          :class="index == isActive ? 'active' : ''"
          ref="worditem">
          {{ item }}
          <template v-if="item == ''">
            <br />
          </template>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'music-player',
  data: () => ({
    songlist: [],
    timeline: [],
    word: [],
    isActive: -1,
    transform_long: '',
  }),
  methods: {
    timeupdate(e) {
      const time = e.target.currentTime;
      if (time > this.timeline[72]) {
        this.isActive = 72;
        this.transform_long = `transform:translateY(${
          220 - 72 * this.$refs.worditem[72].offsetHeight
        }px)`;
      }
      // this.timeline.forEach((item, index) => {
      //   if (time > item && time < this.timeline[index + 1]) {
      //     this.isActive = index;
      //     this.transform_long = `transform:translateY(${
      //       220 - index * this.$refs.worditem[index].offsetHeight
      //     }px)`;
      //   }
      // });
      this.timeline.findIndex((item, index) => {
        if (time > item && time < this.timeline[index + 1]) {
          this.isActive = index;
          this.transform_long = `transform:translateY(${
            220 - index * this.$refs.worditem[index].offsetHeight
          }px)`;
        }
      });
    },
  },

  mounted() {
    fetch('http://project.x-zd.net:3001/apis/songword')
      .then((res) => res.json())
      .then((data) => {
        const _data = data.data;
        this.songlist = _data.split('\n');
        this.songlist.forEach((item) => {
          let timePiece = item.slice(1, 9);
          let songPiece = item.slice(10);
          this.timeline.push(timePiece);
          this.word.push(songPiece);
        });
        this.timeline.forEach((item, index) => {
          let timePiece_1 = item.slice(0, 2);
          let timePiece_2 = item.slice(3);
          timePiece_2 = Number(timePiece_1) * 60 + Number(timePiece_2);
          this.timeline[index] = timePiece_2;
        });
      });
  },
};
</script>

<style lang="scss" scoped>
.warpper {
  width: 100%;
  height: 900px;
  background: #333;
  color: #fff;
  .topbar {
    position: relative;
    h1 {
      text-align: center;
    }
    audio {
      width: 600px;
      position: relative;
      margin-top: 10px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .wordbox {
    width: 300px;
    margin: 0 auto;
    margin-top: 10px;
    height: 440px;
    overflow: hidden;

    .wordline {
      list-style: none;
      transform: translateY(230px);
      color: #4e4e4e;
      transition: all 0.5s;
      li {
        font-size: 16px;
        line-height: 30px;
        transition: all 0.5s;
        text-align: center;
        &.active {
          color: #fff;
          // font-size: 20px;
          font-weight: bold;
          line-height: 30px;
        }
      }
    }
  }
}
</style>
