<template>
  <div class="">
    <div class="title">
      <div class="left">
        <img :src="albumList.picUrl" alt="" />
        <p>{{ albumList.name }}</p>
      </div>
      <div class="right">
        {{ albumList.description }}
      </div>
    </div>

    <div class="body">
        <ul v-for="(item,index) in albumSongs" :key="index">
            <li>
                <router-link :to="{path:'/musicweb',query:{id:item.id}}">
                    {{item.name}}
                </router-link>
            </li>
        </ul>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      albumList: [],
      albumSongs:[]
    };
  },
  methods: {
    async getAlbumList() {
      const { data: res } = await this.$http.get("/album", {
        params: { id: this.$route.query.id },
      });
      if (res.code == 200) {
        this.albumList = res.album;
        this.albumSongs = res.songs;
        console.log(this.albumList);
        console.log(this.albumSongs);
      } else {
        alert("获取失败");
      }
    },
  },
  created() {
    this.getAlbumList();
  },
  mounted() {},
};
</script>
<style scoped>
.title {
  display: flex;
  align-items: center;
}
.left {
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.left img {
  width: 200px;
  height: 200px;
  border-radius: 20px;
}
.left p {
  color: #fff;
  margin-top: 10px;
  font-size: 20px;
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
.body {
    margin-top: 20px;
    color: #fff;
}
.body a {
    text-decoration: none;
    color: #fff;
}
.body ul li {
    height: 20px;
    margin: 10px 0;
}
</style>