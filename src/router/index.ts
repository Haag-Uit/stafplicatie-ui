import { createRouter, createWebHistory, type Router } from "vue-router";
import DashboardView from "../views/DashboardView.vue";
import { createAuthGuard } from "@auth0/auth0-vue";
import type { App } from "vue";

export function createVueRouter(app: App): Router {
  return createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: "/",
        name: "dashboard",
        component: DashboardView,
        beforeEnter: createAuthGuard(app),
      },
    ],
  });
}

export default createVueRouter;
