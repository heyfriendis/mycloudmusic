<template>
  <!-- 主题区域 -->
  <div class="body">
    <!-- 轮播图 -->
    <div class="swiper">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide"
          v-for="(item, index) in bannerList"
          :key="index"
        >
          <img :src="item.imageUrl" alt="" />
        </div>
      </div>
    </div>
    <!-- 下载及分类 -->
    <div class="downLoad">
      <el-button icon="el-icon-download" circle size="mini"></el-button>
      <el-button icon="el-icon-menu" circle size="mini"></el-button>
    </div>
    <div class="music">
      <!-- 下部左侧 -->
      <div class="left_body">
        <div
          class="music_item"
          v-for="(item2, index) in musicList"
          :key="index"
        >
          <router-link :to="{ path: '/musicitem', query: { id: item2.id } }">
            <img :src="item2.picUrl" alt="" />
            <p>{{ item2.name }}</p>
          </router-link>
        </div>
      </div>

      <div class="music_player">
        <img :src="personalFmList.album.picUrl" alt="" />
        <i
          class="el-icon-video-play"
          @click="pausemusic"
          v-if="change_button"
        ></i>
        <i class="el-icon-video-pause" @click="pausemusic" v-else></i>
        <audio :src="fm_song" ref="song_play" loop></audio>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper, { Autoplay, Loop } from "swiper";

import "swiper/swiper.min.css";
Swiper.use([Autoplay]);
Swiper.use([Loop]);
export default {
  data() {
    return {
      bannerList: [],
      musicList: [],
      limit: 8,
      personalFmList: [],
      change_button: true,
      fm_song_id: 0,
      fm_song: "",
    };
  },
  methods: {
    async getBannerList() {
      const { data: res } = await this.$http.get("/banner");
      if (res.code == 200) {
        this.bannerList = res.banners;
      } else {
        alert("获取信息失败");
      }
    },
    initSwiper() {
      setTimeout(() => {
        this.mySwiper = new Swiper(".swiper", {
          loop: true,
          speed: 1000,
          autoplay: {
            // 自动滑动
            delay: 1000, // 1秒切换一次
            disableOnInteraction: false,
          },
          observer: true, // 启动动态检查器(OB/观众/观看者)
          observeParents: true, // 修改swiper的父元素时，自动初始化swiper
        });
      }, 300);
    },
    async getMusicList() {
      const { data: res } = await this.$http.get("/personalized", {
        params: { limit: 8 },
      });
      if (res.code == 200) {
        this.musicList = res.result;
      } else {
        alert("获取信息失败");
      }
      console.log(this.musicList);
    },
    async getPersonalFm() {
      const { data: res } = await this.$http.get("/personal_fm");
      if (res.code == 200) {
        this.personalFmList = res.data[0];
        this.fm_song_id = res.data[0].id;
        this.getFMSong(res.data[0].id);
      } else {
        alert("获取信息失败");
      }
    },
    pausemusic() {
      this.change_button = !this.change_button;
      if(this.change_button){
        this.$refs.song_play.pause()
      }else{
        this.$refs.song_play.play()
      }
    },
    async getFMSong(id) {
      const { data: res } = await this.$http.get("/song/url", {
        params: { id: this.fm_song_id },
      });
      if (res.code == 200) {
        this.new_song_id = res.data[0].id;
        this.fm_song = res.data[0].url;
        console.log(res);
        console.log(this.fm_song);
      } else {
        alert("获取数据失败");
      }
    },
    songEnd(){
      this.$refs.song_play.addEventListener('ended',function(){
        this.change_button = !this.change_button;
        console.log(123);
      },false)
    }
  },
  created() {
    this.getBannerList();
    this.getMusicList();
    this.getPersonalFm();
    this.songEnd()
  },
  mounted() {
    this.$nextTick(() => {
      this.initSwiper();
    });
  },
};
</script>
<style  scoped>
.music_item a {
  text-decoration: none;
}
.swiper {
  overflow: hidden;
  margin-left: 0px;
  background-color: #1a1e2a;
  height: 185.18px;
  border-radius: 20px;
}
.swiper-wrapper img {
  width: 100%;
  border-radius: 19px;
}
.downLoad {
  margin: 20px 0;
}
.downLoad button {
  border: 0;
  background-color: #353b47;
  color: #adb3bf;
}
.left_body {
  width: 499px;
  display: flex;
  flex-wrap: wrap-reverse;
}
.music_item img {
  height: 100px;
  width: 100px;
  margin: 5px;
  border-radius: 10px;
}
.music_item p {
  font-size: 12px;
  color: #fff;
  width: 100px;
  height: 27px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.music {
  display: flex;
}
.music_player {
  padding-top: 10px;
  width: 220px;
  height: 294px;
  background-color: #252d38;
  border-radius: 20px;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  font-size: 13px;
}
.music_player img {
  border-radius: 20px;
  width: 190px;
  height: 190px;
}
/deep/.el-icon-video-play {
  margin-top: 20px;
  font-size: 40px;
}
/deep/.el-icon-video-pause {
  margin-top: 20px;
  font-size: 40px;
}
</style>
