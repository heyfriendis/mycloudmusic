<template>
  <div class="">
    <div class="searchTitle">搜索 "{{ this.$route.query.keyword }}" 如下:</div>
    <div class="song_list">
      <ul v-for="(item, index) in keyList" :key="index" class="song_ul">
        <li>
          <router-link
            :to="{ path: '/musicweb', query: { id: item.id } }"
            class="song_link"
          >
            <div class="name">{{ item.name }}</div>
            <div class="artist">{{ item.artists[0].name }}</div>
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
      keyList: [],
      songcount: 0,
    };
  },
  methods: {
    async getKeyList() {
      const { data: res } = await this.$http.get("/search", {
        params: { keywords: this.$route.query.keyword,limit:45},
      });
      console.log(res);
      if (res.code == 200) {
        this.keyList = res.result.songs;
        console.log(this.keyList);
      } else {
        alert("未找到相关信息");
      }
    },
    async getsongcount() {
      const { data: res } = await this.$http.get("/search", {
        params: { keywords: this.$route.query.keyword },
      });
      if (res.code == 200) {
        this.songcount = res.result.songCount
        this.getKeyList()
      } else {
        alert("未找到相关信息");
      }
    },
  },

  created() {
    this.getsongcount();
  },
};
</script>
<style scoped>
.searchTitle {
  color: #fff;
  margin-bottom: 10px;
}
.song_ul a {
  text-decoration: none;
  color: #fff;
}
.song_ul li {
  height: 40px;
  line-height: 40px;
  background-color: #252d38;
  margin: 5px 0;
  color: #fff;
  border-radius: 5px;
  padding: 0 20px;
}
.song_link {
  display: flex;
  justify-content: space-between;
}
</style>