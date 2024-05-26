import VideoView from '../views/VideoView.vue'



const routers = [
  {
    path: "/",
    redirect: "/mango",
  },

  {
    path: "/sign",
    name: "sign",
    component: () => import("../views/SignIn.vue"),
  },
  {
    path: '/share/video',
    name: 'ShareVideo',
    component: VideoView
  }
  ,
  {
    path: "/mango",
    name: "mango",
    component: () => import("../components/LayoutPage.vue"),
    children: [
      // 壁纸榜
      {
        path: "",
        redirect: "/mango/wallpaper",
      },
      {
        name: "wallpaper",
        path: "wallpaper",
        //采用路由懒加载的形式引入
        component: () => import("../views/WallpaperPage.vue"),
      },
      {
        path: "wallpaper/:wallpaperId",
        component: () => import("../views/WallpaperView.vue"),
        props: true,
      },
      // 音乐榜
      {
        name: "music",
        path: "music",
        component: () => import("../views/music/MusicPage.vue"),
        redirect: "music/search",
        children: [
          {
            path: "play",
            component: () => import("../views/music/MusicPlay.vue"),
          },
          {
            path: "hall",
            component: () => import("../views/music/MusicHall.vue"),
          },
          {
            path: "search",
            component: () => import("../views/music/MusicSearch.vue"),
          },
          {
            path: "local",
            component: () => import("../views/music/MusicLocal.vue"),
          },
          {
            path: "radar",
            component: () => import("../views/music/MusicRadar.vue"),
          },
          {
            path: "songlist",
            component: () => import("../views/music/SongList.vue"),
          },
        ],
      },
    ],
  },
];
export default routers;
