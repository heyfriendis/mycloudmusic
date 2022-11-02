<template>
  <div class="main">
    <!-- 左侧 -->
    <div class="left">
      <!-- 轮播 -->
      <div class="swiper">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide"
            v-for="(item, index) in banner"
            :key="index"
          >
            <img :src="item.pic" alt="" />
          </div>
        </div>
      </div>
      <!-- 电台推荐 -->
      <p class="d_title">电台推荐</p>
      <div class="recommand">
        <ul v-for="(item2, index2) in recommand" :key="index2" class="rec_item">
          <li>
            <img :src="item2.intervenePicUrl" alt="" />
          </li>
        </ul>
      </div>

      <div class="rig_t">
        <p class="f_title">新人主播榜</p>
        <div class="zhubo" v-for="(item4, index4) in zhubo" :key="index4">
          <img :src="item4.avatarUrl" alt="" />
          <div class="zhubo_r">
            <div>{{ item4.nickName }}</div>
            <div>排名:{{ item4.rank }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 右侧· -->
    <div class="rigth">
      <div class="rig_f">
        <p class="f_title">最热主播榜</p>
        <div class="zhubo" v-for="(item3, index3) in hotZhuBo" :key="index3">
          <img :src="item3.picUrl" alt="" />
          <div class="zhubo_r">
            <div>{{ item3.name }}</div>
            <div>排名:{{ item3.rank }}</div>
          </div>
        </div>
      </div>

      <div class="program">
        <p class="f_title">今日推荐</p>
        <ul class="pro_box" v-for="(item5,index5) in program" :key="index5">
            <li >
                <img :src="item5.picUrl" alt="">
                <div class="p_name">{{item5.name}}</div>
                <div class="icon">{{item5.rcmdText}}</div>
            </li>
        </ul>
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
      banner: [],
      recommand: [],
      zhubo: [],
      hotZhuBo: [],
      program:[]
    };
  },
  methods: {
    async getbanner() {
      const { data: res } = await this.$http.get("/dj/banner");
      if (res.code == 200) {
        this.banner = res.data;
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
    async getRecommand() {
      const { data: res } = await this.$http.get("/dj/personalize/recommend");
      if (res.code == 200) {
        this.recommand = res.data;
      }
    },
    async getZhuBo() {
      const { data: res } = await this.$http.get(
        "/dj/toplist/newcomer?limit=5"
      );
      if (res.code == 200) {
        this.zhubo = res.data.list;
      }
    },
    async getHotZhuBo() {
      const { data: res } = await this.$http.get(
        "/dj/toplist?type=hot&limit=5"
      );
      if (res.code == 200) {
        this.hotZhuBo = res.toplist;
      }
    },
    async getProgram(){
        const {data:res} = await this.$http.get('/dj/today/perfered')
              if (res.code == 200) {
        this.program = res.data;
      }
    }
  },
  created() {
    this.getbanner();
    this.getRecommand();
    this.getZhuBo();
    this.getHotZhuBo();
    this.getProgram();
  },
  mounted() {
    this.$nextTick(() => {
      this.initSwiper();
    });
  },
};
</script>
<style scoped>
.main {
  display: flex;
  justify-content: space-around;
  overflow-y: scroll;
}
.main::-webkit-scrollbar {
  display: none; /*隐藏滚动条*/
}
.swiper {
  overflow: hidden;
  margin-left: 0px;
  background-color: #1a1e2a;
  border-radius: 20px;
  width: 100%;
}
.swiper-wrapper img {
  width: 100%;
  border-radius: 19px;
}
.rec_item img {
  width: 100px;
  height: 100px;
  border-radius: 30px;
}
.d_title {
  color: #fff;
  font-size: 24px;
  margin: 10px 0;
}
.recommand {
  display: flex;
  flex-wrap: wrap;
  /* background-color: #353b47; */
  justify-content: space-around;
  border-radius: 10px;
}
.left {
  width: 280px;
}
.rec_item {
  margin: 5px 10px;
}
.f_title {
  font-size: 24px;
  color: #fff;
}
.rigth {
  width: 330px;
}
.zhubo {
  display: flex;
  margin: 20px 0;
}
.zhubo img {
  width: 70px;
  height: 70px;
  border-radius: 2px;
}
.f_title {
  margin-bottom: 30px;
}
.zhubo_r {
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 20px;
}
.rig_t {
    margin-top: 20px;
}
.pro_box {
    height: 100px;
    width: 300px;
    background-color: #353b47;
    margin-top: 60px;
    position: relative;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    padding: 10px 10px;
    color: #fff;
}
.pro_box img {
    width: 100px;
    top: -30%;
    border-radius: 50px;
    position: absolute;
    transform: translateX(160%);
}
.p_name {
    font-size: 23px;
}
.icon {
    width: 144px;
    margin-top: 15px;
}
</style>