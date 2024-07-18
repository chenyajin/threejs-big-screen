import { type RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
import type { App } from "vue";
import constantRoutes from "./baseRoutes";

const createRouters = (routerList: RouteRecordRaw[] = []) =>
  createRouter({
    history: createWebHistory(),
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes: routerList
  });

const router = createRouters(constantRoutes);

export function setupRouter(app: App<Element>) {
  app.use(router);
}

export default router;
