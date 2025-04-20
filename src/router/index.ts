import { createRouter, createWebHistory, type Router } from "vue-router";
import DashboardView from "../views/DashboardView.vue";
import { createAuthGuard } from "@auth0/auth0-vue";
import type { App } from "vue";
import CampyearIndex from "@/views/campyear/CampyearIndex.vue";
import CampyearCreate from "@/views/campyear/CampyearCreate.vue";
import CampyearEdit from "@/views/campyear/CampyearEdit.vue";

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
      {
        path: "/kampjaar",
        name: "campyearIndex",
        component: CampyearIndex,
        beforeEnter: createAuthGuard(app),
      },
      {
        path: "/kampjaar/aanmaken",
        name: "campyearCreate",
        component: CampyearCreate,
        beforeEnter: createAuthGuard(app),
      },
      {
        path: "/kampjaar/:year/wijzigen",
        name: "campyearEdit",
        component: CampyearEdit,
        beforeEnter: createAuthGuard(app),
        props: true,
      },
    ],
  });
}

export default createVueRouter;
