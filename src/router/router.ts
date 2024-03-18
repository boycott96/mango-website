const routers = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    //采用路由懒加载的形式引入
    component: () => import("../views/WallpaperPage.vue"),
  },
  {
    path: "/GLg8YqDmDuP3QUSuqJUgu5gX4bGqg10w",
    component: () => import("../views/WallpaperLevel.vue"),
  },
];
export default routers;
