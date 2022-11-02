import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/Home.vue";
import Main from "../components/Main.vue";
import MusicItem from "../components/musicItem.vue";
import MusicWeb from "../components/musicWeb.vue";
import SongList from "../components/songList.vue";
import SearchWeb from "../components/searchWeb.vue";
import SingerList from "../components/singerList.vue";
import SingerDetail from "../components/singerDetail.vue";
import Album from "../components/album.vue";
import Diantai from "../components/diantai.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", redirect: "/home" },
  {
    path: "/home",
    component: Home,
    redirect: "/main",
    children: [
      { path: "/main", component: Main },
      { path: "/musicitem", component: MusicItem },
      { path: "/musicweb", component: MusicWeb },
      { path: "/songlist", component: SongList },
      { path: "/searchweb", component: SearchWeb },
      { path: "/singerlist", component: SingerList },
      { path: "/singerdetail", component: SingerDetail },
      { path: "/album", component: Album },
      { path: "/diantai", component: Diantai },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
