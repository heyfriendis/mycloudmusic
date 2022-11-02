<template>
  <div class="mainBox">
    <div class="play_top">
      <div class="songPlay">
        <img
          :src="picUrl ? picUrl : '../assets/friend.jpg'"
          :onerror="logo"
          alt=""
          class="little_pic"
        />
        <p class="s_name">{{ songName }}</p>
        <audio
          controls
          height="100"
          width="100"
          :src="musicUrl"
          autoplay
          loop
          ref="player"
        ></audio>
      </div>
      <div class="play_right">
        <div
          class="song_word"
          v-for="(item, index) in newSongWord"
          :key="item.uid"
          :style="{ color: lyricIndex === index ? 'skyblue' : '#ded9d9' }"
          :data-index="index"
          ref="lyric"
        >
          <p>{{ item.lyric }}</p>
        </div>
      </div>
    </div>
    <!-- 评论按钮 -->
    <div class="speak_btn" @click="isShow">热评</div>
    <div class="speak" v-if="show">
      <ul v-for="(item2, index) in hotSpeak" :key="index" class="speak_item">
        <li>
          <div class="speakUser">
            <img :src="item2.user.avatarUrl" alt="" />
            <div class="speak_right">
              <div class="speak_name">{{ item2.user.nickname }}</div>
              <div class="pinlun">{{ item2.content }}</div>
              <div class="time">{{ item2.timeStr }}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["MainPicUrl"]),
  },
  components: {},
  mounted() {
    this.addEventListener();
  },
  data() {
    return {
      musicUrl: [],
      songWord: [],
      songTitle: {},
      picUrl: "",
      songName: "",
      newSongWord: [],
      show: false,
      lyricIndex: 0,
      hotSpeak: [],
      logo: 'this.src="' + require("../assets/friend.jpg") + '"',
    };
  },
  created() {
    this.getMusicUrl();
    this.getSongWord();
    this.getPicUrl();
    this.getHotSpeak();
  },
  methods: {
    async getMusicUrl() {
      const { data: res } = await this.$http.get("/song/url", {
        params: { id: this.$route.query.id },
      });
      if (res.code == 200) {
        this.musicUrl = res.data[0].url;
      } else {
        alert("数据获取失败");
      }
    },
    async getSongWord() {
      const { data: res } = await this.$http.get("/lyric", {
        params: { id: this.$route.query.id },
      });
      if (res.code == 200) {
        this.songWord = res.lrc.lyric.split(/\n/);
        this.songTitle = res.klyric.lyric;
        this.songWord.forEach((item) => {
          if (item === "") return;
          const obj = {};
          const time = item.match(/\[\d{2}:\d{2}.\d{2,3}\]/);
          obj.lyric =
            item.split("]")[1].trim() === "" ? "" : item.split("]")[1].trim();
          obj.time = time
            ? parseInt(
                this.formatLyricTime(time[0].slice(1, time[0].length - 1))
              )
            : 0;
          obj.uid = Math.random().toString().slice(-6);
          if (obj.lyric === "") {
            console.log("这一行没有歌词");
          } else {
            this.newSongWord.push(obj);
          }
        });
      } else {
        alert("数据获取失败");
      }
    },
    getPicUrl() {
      this.picUrl = this.$route.query.musicmsg.al.picUrl;
      this.songName = this.$route.query.musicmsg.al.name;
      this.MainPicUrl = this.$route.query.musicmsg.al.picUrl;
    },
    //格式化歌词的时间 转换成 sss:ms
    formatLyricTime(time) {
      // 格式化歌词的时间 转换成 sss:ms
      const regMin = /.*:/;
      const regSec = /:.*\./;
      const regMs = /\./;

      const min = parseInt(time.match(regMin)[0].slice(0, 2));
      let sec = parseInt(time.match(regSec)[0].slice(1, 3));
      const ms = time.slice(
        time.match(regMs).index + 1,
        time.match(regMs).index + 3
      );
      if (min !== 0) {
        sec += min * 60;
      }
      return Number(sec + "." + ms);
    },
    addEventListener() {
      const self = this;
      self.$refs.player.addEventListener("timeupdate", function () {
        for (let i = 0; i < self.newSongWord.length; i++) {
          if (this.currentTime > parseInt(self.newSongWord[i].time)) {
            const index = self.$refs.lyric[i].dataset.index;
            if (i === parseInt(index)) {
              self.lyricIndex = i;
            }
          }
        }
      });
    },
    isShow() {
      this.show = !this.show;
      if(this.show){
            this.getHotSpeak();
      }
    },
    async getHotSpeak() {
      const { data: res } = await this.$http.get("/comment/music", {
        params: { id: this.$route.query.id },
      });
      if (res.code == 200) {
        this.hotSpeak = res.comments;
      }
      console.log(this.hotSpeak);
    },
  },
};
</script>
<style scoped>
.mainBox {
  position: relative;
  width: 100%;
  height: 100%;
  transition: all 0.3s ease;
}
audio {
  position: absolute;
  bottom: 177px;
  width: 269px;
  height: 40px;
  box-shadow: 0;
}
.songPlay {
  width: 200px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.little_pic {
  width: 200px;
  height: 200px;
  border-radius: 100px;
}
.s_name {
  color: #fff;
  font-size: 20px;
}
.play_top {
  display: flex;
  justify-content: space-around;
  height: 550px;
}
.play_right {
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 18px;
  padding: 10px 0;
}
.song_word {
  margin: 5px 0;
}
.play_right::-webkit-scrollbar {
  display: none; /*隐藏滚动条*/
}
.little_pic {
  -webkit-animation: spin 20s linear infinite;
  transition: spin 20s ease infinite;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
    transition: all 5s;
  }
}

.speak_btn {
  color: #fff;
  width: 80px;
  height: 40px;
  border: 1px solid #fff;
  line-height: 40px;
  text-align: center;
  border-radius: 20px;
  position: absolute;
  top: 380px;
  left: 45px;
}
.speak {
  height: 135px;
  width: 680px;
  background-color: #252d38;
  position: absolute;
  top: 430px;
  left: 15px;
  opacity: 0.8;
  border-radius: 20px;
  box-sizing: border-box;
  padding: 10px 10px;
  overflow-y: scroll;
  color: #fff;
}
.speak::-webkit-scrollbar {
  display: none; /*隐藏滚动条*/
}
.speakUser {
  display: flex;
  align-items: center;
}
.speakUser img {
  width: 50px;
  height: 50px;
  border-radius: 5px;
}
.speak_item {
  margin: 15px 0;
  height: 100px;
}
.speak_right {
  margin-left: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.pinlun {
  margin: 5px 0;
  overflow-y: hidden;
}
</style>