const routers = [
  {
    path: "/",
    redirect: "/music",
  },

  // 壁纸榜
  {
    name: "wallpaper",
    path: "/wallpaper",
    //采用路由懒加载的形式引入
    component: () => import("../views/WallpaperPage.vue"),
  },
  {
    path: "/wallpaper/:wallpaperId",
    component: () => import("../views/WallpaperView.vue"),
    props: true,
  },
  // 音乐榜
  {
    name: 'music',
    path: "/music",
    component: () => import("../views/music/MusicPage.vue"),
  },




  {
    path: "/GLg8YqDmDuP3QUSuqJUgu5gX4bGqg10w",
    component: () => import("../views/WallpaperLevel.vue"),
  },
];
export default routers;
