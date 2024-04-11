import { createRouter, createWebHistory } from "vue-router";
import routes from "./router";

const router = createRouter({
  // 这里使用hash模式路由
  history: createWebHistory(),
  // @ts-ignore
  routes,
});
router.afterEach(() => {
  const scrollContainer = document.querySelector('.el-scrollbar__wrap')
  if (scrollContainer) {
    scrollContainer.scrollTo({ top: 0 })
  }
});

// 导出router
export default router;
