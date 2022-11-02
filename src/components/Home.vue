<template>
  <!-- 背景 -->
  <div class="bg">
    <!-- 播放器背景 -->
    <div class="mainBox">
      <!-- 整体布局 -->
      <el-container class="home_container">
        <!-- 侧边栏 -->
        <el-aside width="200px">
          <!-- 左侧头部 -->
          <div class="head">
            <img src="../assets/head.png" alt="" />
          </div>
          <p>hello</p>
          <span>土狼呐</span>

          <!-- 侧边栏导航部分 -->
          <div class="left_items">
            <ul>
              <li class="f_item">发现音乐</li>
              <li>
                <router-link to="/home" class="active">首页</router-link>
              </li>
              <li>
                <router-link to="/songlist">专辑</router-link>
              </li>
              <li>
                <router-link to="/singerlist">歌手</router-link>
              </li>
              <li>
                <router-link to="/diantai">播客</router-link>
              </li>
            </ul>
          </div>

          <div class="left_items">
            <ul>
              <li class="f_item">我的音乐</li>
              <li>本地与下载</li>
              <li>我喜欢</li>
              <li>创建歌单</li>
            </ul>
          </div>

          <div class="ad">
            <p>每日推荐</p>
            <p>情绪助推器</p>
          </div>
        </el-aside>
        <el-container>
          <!-- 右侧头部 -->
          <el-header>
            <!-- 前进后退按钮 -->
            <div class="goBtn">
              <el-button
                icon="el-icon-arrow-left"
                class="go"
                circle
                @click="$router.back(-1)"
              >
              </el-button>
              <el-button
                icon="el-icon-arrow-right"
                class="go"
                circle
                @click="$router.back(-1)"
              ></el-button>
            </div>
            <!-- 输入框 -->
            <div class="input_area">
              <i class="el-icon-search"></i>
              <el-input placeholder="请输入内容" v-model="key_word" @keydown.enter.native="toSearch"></el-input>
            </div>

            <el-button icon="el-icon-bell" class="go" circle></el-button>
            <el-button round class="huiyuan">
              <i class="el-icon-s-opportunity"></i>
              <i>开通会员享更多权益</i>
            </el-button>
          </el-header>
          <!-- 主题区域 -->
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      key_word:''
    };
  },
  methods: {
    toSearch(){
      this.$router.push({path:'/searchweb',query:{keyword:this.key_word}})
    }
  },
  created() {},
};
</script>
<style  scoped>
.left_items a{
  text-decoration: none;
  color: #5c6169;
}
.bg {
  width: 100vw;
  height: 100vh;
  background-color: #c1d1eb;
  position: absolute;
}

.mainBox {
  width: 958px;
  height: 685px;
  background-color: #1a1e2a;
  margin: 0 auto;
  border-radius: 40px;
  position: relative;
  top: 40px;
  padding: 20px;
  box-sizing: border-box;
}
.home_container {
  width: 100%;
  height: 100%;
}
.el-aside {
  background-color: #252d38;
  border-radius: 30px;
  padding: 20px;
  box-sizing: border-box;
}
.head {
  height: 50px;
  width: 50px;
}
.head img {
  width: 100%;
  border-radius: 11px;
}
.el-aside p {
  color: #c7cfda;
  font-size: 12px;
  margin: 10px 0;
}
.el-aside span {
  color: #c7cfda;
  font-size: 16px;
  font-weight: bold;
}
.el-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.go {
  background-color: #252b37;
  border: 0;
  color: #afb5c1;
}
.input_area {
  display: flex;
  align-items: center;
  background-color: #252d38;
  color: #afb5c1;
  height: 40px;
  width: 380px;
  box-sizing: border-box;
  padding: 0 15px;
  border-radius: 20px;
}
.huiyuan {
  width: 155px;
  font-size: 2px;
  background-color: #252d38;
  color: #afb5c1;
  border: 0;
}
/* 样式穿透，出现红色提醒，但是运行无误 */
/deep/.el-input__inner {
  background-color: #252d38 !important;
  border: 0;
  height: 40px;
}
.left_items {
  margin: 35px 0;
  color: #5c6169;
}
.left_items ul li {
  margin-top: 15px;
  font-size: 14px;
}
.f_item {
  color: #cdd1da;
  font-size: 18px;
  font-weight: bold;
}
.ad {
  border-top: 1px solid #414245;
}
.ad p {
  color: #5c6169;
}
.el-main::-webkit-scrollbar {
  width: 0;
  height: 0;
}
.active {
  color: #cdd1da;
}
</style>
