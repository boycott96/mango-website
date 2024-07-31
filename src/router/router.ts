import VideoView from "../views/VideoView.vue";

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
    path: "/share/video",
    name: "ShareVideo",
    component: VideoView,
  },
  {
    path: "/mango",
    name: "mango",
    component: () => import("../components/LayoutPage.vue"),
    children: [
      // 壁纸榜
      {
        path: "",
        redirect: "/mango/doc",
      },
      {
        name: "doc",
        path: "doc",
        //采用路由懒加载的形式引入
        component: () => import("../views/doc/DocmentPage.vue"),
      },
      {
        path: "wallpaper/:wallpaperId",
        component: () => import("../views/doc/DocmentDetail.vue"),
        props: true,
      },
      // 音乐榜
    ],
  },
];
export default routers;
