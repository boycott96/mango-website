import { createRouter, createWebHistory } from "vue-router";
import routes from "./router";

const router = createRouter({
  // 这里使用hash模式路由
  history: createWebHistory(),
  // @ts-ignore
  routes,
});
// 导出router
export default router;
