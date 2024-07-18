/*
 * @Author: 陈亚金
 * @Date: 2024-07-18 13:47:36
 * @LastEditors: 陈亚金
 * @LastEditTime: 2024-07-18 13:58:37
 * @Description: 基础路由
 */
import Layout from "@/layout/index.vue";

import { type RouteRecordRaw } from "vue-router";
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    component: Layout,
    redirect: "home",
    children: [
      {
        path: "/home",
        name: "Home",
        component: () => import("@/views/home/index.vue")
      }
    ]
  }
  // {
  //   path: "/404",
  //   name: "Page404",
  //   component: () => import("@/views/statusPage/404.vue"),
  //   meta: { title: "404", icon: "dashboard", hidden: true }
  // },
  // {
  //   path: "/403",
  //   name: "Page403",
  //   component: () => import("@/views/statusPage/403.vue"),
  //   meta: { title: "403", icon: "dashboard", isLayout: true, hidden: true }
  // }
];
export default constantRoutes;
