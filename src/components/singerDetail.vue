<template>
  <div>
    <div class="title">
      <div class="left">
        <img :src="singerDetail.cover" alt="" />
        <div class="name">{{ singerDetail.name }}</div>
      </div>
      <div class="right">
        {{ singerDetail.briefDesc }}
      </div>
    </div>
    <div class="trans">个人专辑(30首)</div>
    <div class="webBody">
      <ul v-for="(item,index) in singerSongs" :key="index">
        <li>
          <router-link :to="{path:'/album',query:{id:item.id}}">
            {{item.name}}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      singerDetail: [],
      singerSongs: [],
    };
  },
  methods: {
    async getSingerDetail() {
      const { data: res } = await this.$http.get("/artist/detail", {
        params: { id: this.$route.query.id },
      });
      if (res.code == 200) {
        this.singerDetail = res.data.artist;
      } else {
        alert("获取信息失败");
      }
    },
    async getSingerSongs() {
      const { data: res } = await this.$http.get("/artist/album", {
        params: { id: this.$route.query.id },
      });
      if (res.code == 200) {
        this.singerSongs = res.hotAlbums
        console.log(this.singerSongs);
      } else {
        alert("获取信息失败");
      }
    },
  },
  created() {
    this.getSingerDetail();
    this.getSingerSongs();
  },
  mounted() {},
};
</script>
<style scoped>
.title {
  display: flex;
  margin-bottom: 20px;
}
.left {
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.left img {
  width: 200px;
}
.name {
  color: #fff;
  font-size: 20px;
  margin-top: 10px;
}
.right {
  color: #fff;
  overflow-y: scroll;
  height: 200px;
  margin-left: 10px;
}
.right::-webkit-scrollbar {
  display: none; /*隐藏滚动条*/
}
.trans{
  color: #fff;
  font-size: 20px;
  margin: 10px 0;
}
.webBody {
  color: #fff;
}
.webBody a {
  color: #fff;
  text-decoration: none;
}
.webBody ul li {
  height: 30px;
  line-height: 30px;
  background-color: #252d38;
  margin: 5px 0;
  padding: 0 10px;
}
</style>