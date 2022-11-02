<template>
  <div class="music_bg">
    <div class="nav">
      <!-- 左侧图片 -->
      <img :src="musicListItem.coverImgUrl" alt="" />

      <!-- 右侧介绍 -->
      <div class="right">
        <!-- 标题 -->
        <div class="des">
          <div class="place">歌单</div>
          <h1>{{ musicListItem.name }}</h1>
        </div>

        <!-- 作者 -->
        <div class="maker">
          <img :src="musicListItem.creator.avatarUrl" alt="" />
          <div class="maker_name">{{ musicListItem.creator.nickname }}</div>
        </div>

        <!-- 标签 -->
        <div class="tag_box">
          标签:
          <div class="tag" v-for="(tag, index) in tags" :key="index">
            {{ tag }}/
          </div>
        </div>
        <!-- 简介 -->
        <div class="description">
          <p>简介:</p>
          {{ musicListItem.description }}
        </div>
      </div>
    </div>

    <div class="music_nav">
      <h1>歌曲列表</h1>
      <div class="music_list">
        <div class="m_nav">
          <p>歌曲</p>
          <p>歌手</p>
        </div>
        <div class="music_item" v-for="(item, index) in music" :key="index">
          <router-link :to="{ path: '/musicweb', query: { id: item.id ,musicmsg:item} }">
            <div class="singer_song">
              <div class="m_name">
                <p>{{ item.name }}</p>
              </div>
              <div class="m_singer">
                <p v-for="(item2, index2) in item.ar" :key="index2">
                  {{ item2.name }}
                </p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["musicId"]),
  },
  components: {},
  data() {
    return {
      musicListItem: [],
      tags: [],
      music: [],
      musicUrl: [],
    };
  },
  mounted() {},
  created() {
    this.getMusicListItem();
    this.getMusic();
  },
  methods: {
    async getMusicListItem() {
      const { data: res } = await this.$http.get("/playlist/detail", {
        params: { id: this.$route.query.id },
      });
      if (res.code == 200) {
        this.musicListItem = res.playlist;
        this.tags = res.playlist.tags;
      } else {
        alert("数据获取失败");
      }
    },
    async getMusic() {
      const { data: res } = await this.$http.get("/playlist/track/all", {
        params: { id: this.$route.query.id },
      });
      if (res.code == 200) {
        this.music = res.songs;
        console.log(this.music);
      } else {
        alert("数据获取失败");
      }
    },
  },
};
</script>
<style scoped>
.singer_song {
  display: flex;
}
.music_item a {
  text-decoration: none;
  color: #fff;
}
.des h1 {
  font-weight: bold;
  color: #fff;
  display: inline-block;
  font-size: 22px;
}
.nav {
  display: flex;
  overflow: hidden;
}
.nav img {
  width: 200px;
  height: 200px;
  border-radius: 20px;
}
.place {
  color: #fff;
  border: 1px solid #fff;
  width: 34px;
  border-radius: 5px;
  display: inline-block;
  margin: 0px 15px;
}
.maker {
  height: 30px;
  display: flex;
  align-items: center;
  margin-left: 15px;
  margin-top: 15px;
  color: #fff;
}
.maker img {
  height: 30px;
  width: 30px;
  border-radius: 15px;
  margin-right: 5px;
}
.right {
  display: flex;
  flex-direction: column;
}
.tag_box {
  display: flex;
  color: #fff;
  margin-left: 15px;
  margin-top: 15px;
}
.description {
  margin-left: 15px;
  margin-top: 15px;
  height: 100px;
  color: #adb3bf;
  width: 430px;
  overflow-y: scroll;
  font-size: 12px;
}
.description p {
  display: inline;
  font-size: 15px;
  color: #fff;
}
.description::-webkit-scrollbar {
  display: none; /*隐藏滚动条*/
}

.music_nav {
  margin: 20px 0 0 10px;
  color: #fff;
  width: 100%;
}
.music_nav h1 {
  margin-bottom: 20px;
}
.music_item {
  display: flex;
  width: 100%;
  height: 20px;
  padding: 5px 0;
}
.music_item:hover {
  background-color: #595b61;
}
.m_name {
  width: 300px;
  overflow: hidden;
  white-space: nowrap;
}
.m_singer {
  display: flex;
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  margin-left: 180px;
}
.m_nav {
  display: flex;
  margin-bottom: 10px;
  font-weight: bold;
}
.m_nav p:nth-child(2) {
  margin-left: 447px;
}
</style>