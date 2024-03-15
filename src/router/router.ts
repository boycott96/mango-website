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
];
export default routers;
