<template>
  <div class="outBox">
    <div class="tips">本功能只获取30位歌手信息!!!</div>
    <div class="sexSelect">
      <p>选择类别:</p>
      <ul>
        <li id="-1" @click="getSexID($event)">全部</li>
        <li id="1" @click="getSexID($event)">男歌手</li>
        <li id="2" @click="getSexID($event)">女歌手</li>
        <li id="3" @click="getSexID($event)">乐队</li>
      </ul>
    </div>

    <div class="sexSelect">
      <p>选择地区:</p>
      <ul>
        <li id="-1" @click="getAreaID($event)">全部</li>
        <li id="7" @click="getAreaID($event)">华语</li>
        <li id="96" @click="getAreaID($event)">欧美</li>
        <li id="8" @click="getAreaID($event)">日本</li>
        <li id="16" @click="getAreaID($event)">韩国</li>
        <li id="0" @click="getAreaID($event)">其他</li>
      </ul>
    </div>

    <div class="singerShow">
      <ul v-for="(item, index) in SingerList" :key="index">
        <li>
          <router-link :to="{path:'/singerdetail',query:{id:item.id}}" class="li_item">
            <img :src="item.picUrl" alt="" />
            <div class="right">
              <div class="singer_name">{{ item.name }}</div>
              <div class="singerId">{{ item.alias[0] }}</div>
            </div>
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
      SingerList: [],
      SexId: -1,
      AreaId: -1,
    };
  },
  methods: {
    getSexID(e) {
      this.SexId = e.target.id;
      this.getSingerList();
    },
    getAreaID(e) {
      this.AreaId = e.target.id;
      this.getSingerList();
    },
    async getSingerList() {
      const { data: res } = await this.$http.get("/artist/list", {
        params: { type: this.SexId, area: this.AreaId },
      });
      if (res.code == 200) {
        this.SingerList = res.artists;
        console.log(this.SingerList);
      } else {
        alert("数据获取失败");
      }
    },
  },
  created() {
    this.getSingerList();
  },
  mounted() {
  },
};
</script>
<style scoped>
.tips {
  color: #fff;
}
.sexSelect {
  color: #fff;
  width: 100%;
  margin-top: 20px;
}
.sexSelect ul {
  display: flex;
  width: 500px;
  margin-top: 10px;
}
.sexSelect ul li {
  display: block;
  background-color: #252d38;
  width: 60px;
  margin: 0 10px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border-radius: 5px;
}
.singerShow {
  width: 700px;
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
}
.singerShow ul {
  height: 100%;
  width: 270px;
  display: flex;
  margin: 5px 10px;
}
.singerShow ul li a {
  text-decoration: none;
  color: #fff;
}
.li_item {
  display: flex;
  width: 270px;
  background-color: #252d38;
  margin: 10px 10px;
  justify-content: space-around;
  align-items: center;
}
.li_item img {
  width: 100px;
}
.singer_name {
  width: 150px;
  overflow: hidden;
}
.right {
  overflow: hidden;
}
</style>