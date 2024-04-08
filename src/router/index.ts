import { createRouter, createWebHistory } from "vue-router";
import { constantRoutes } from "@/router/config";

// 引入 views 下的所有 vue 文件
// const views = import.meta.glob("@/views/**/*.vue");

export const router = createRouter({
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...constantRoutes],
});
