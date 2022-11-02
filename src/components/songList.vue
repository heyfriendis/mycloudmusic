<template>
  <div class="mainBox" ref="mainbox">
    <div v-for="(item, index) in songList" :key="index">
      <router-link
        :to="{ path: '/musicitem', query: { id: item.id } }"
        class="songitem"
      >
        <img :src="item.coverImgUrl" alt="" />
        <div class="r_body">
          <div class="name">{{ item.name }}</div>
          <div class="tag_box">
            标签:
            <div
              class="tags"
              v-for="(item2, index2) in item.tags"
              :key="index2"
            >
              /{{ item2 }}
            </div>
          </div>

          <div class="tag_user">
            <img :src="item.creator.avatarUrl" alt="" />
            <div class="user_name">{{ item.creator.nickname }}</div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.getSongList();
  },
  mounted() {
    this.$refs.mainbox.addEventListener(
      "scroll",
      this._throttle(this.handleScroll, 300)
    );
  },
  destroyed() {
    // 这里运用毁灭生命周期 , 避免资源泄露和浪费
    this.$refs.mainbox.removeEventListener("scroll", this._throttle(), false);
  },
  data() {
    return {
      songList: [],
      tags: [],
      updateTime: 0,
    };
  },
  methods: {
    async getSongList() {
      const { data: res } = await this.$http.get("/top/playlist/highquality", {
        params: { before: this.updateTime },
      });
      if (res.code == 200) {
        res.playlists.forEach((item) => {
          this.songList.push(item);
        });
      } else {
        alert("获取数据失败");
      }
      this.updateTime = this.songList[this.songList.length - 1].updateTime;
    },
    handleScroll(e) {
      let scrollBottom =
        e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight;
      if (scrollBottom <= 1) {
        this.getSongList();
      }
    },
    //封装节流函数
    _throttle(fn, interval) {
      var last;
      var timer;
      var interval = interval || 200;
      return function () {
        var th = this;
        var args = arguments;
        var now = +new Date();
        if (last && now - last < interval) {
          clearTimeout(timer);
          timer = setTimeout(function () {
            last = now;
            fn.apply(th, args);
          }, interval);
        } else {
          last = now;
          fn.apply(th, args);
        }
      };
    },
  },
};
</script>
<style scoped>
.mainBox a {
  text-decoration: none;
}
.mainBox {
  width: 700px;
  margin-top: -70px;
  overflow-y: scroll;
}
.mainBox::-webkit-scrollbar {
  display: none; /*隐藏滚动条*/
}
.songitem {
  width: 100%;
  background-color: #252b37;
  margin: 10px 0;
  height: 113px;
  display: flex;
}
.songitem img {
  margin: 5px 5px;
  width: 100px;
  height: 100px;
}
.tag_user {
  display: flex;
  align-items: center;
}
.tag_user img {
  width: 25px;
  height: 25px;
  border-radius: 17px;
}
.r_body {
  color: #fff;
  margin-left: 20px;
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.tag_box {
  display: flex;
}
.name {
  font-size: 20px;
}
.tags {
  font-size: 15px;
}
</style>