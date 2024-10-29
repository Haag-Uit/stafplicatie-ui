import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";

import SigninView from "@/views/Authentication/SigninView.vue";

import CampyearIndex from "@/views/Campyear/Index.vue";
import CampyearCreate from "@/views/Campyear/Create.vue";
import CampyearEdit from "@/views/Campyear/Edit.vue";

import UserIndex from "@/views/User/Index.vue";
import UserCreate from "@/views/User/Create.vue";
import UserEdit from "@/views/User/Edit.vue";

import CampRegistationIndex from "@/views/CampRegistration/Index.vue";
import CampRegistrationEdit from "@/views/CampRegistration/Edit.vue";

import Dashboard from "@/views/Dashboard/Dashboard.vue";
import SettingsView from "@/views/Pages/SettingsView.vue";

const routes = [
  {
    path: "/",
    name: "dashboard",
    component: Dashboard,
    meta: {
      title: "Dashboard",
    },
  },
  {
    path: "/campyear",
    name: "campyear",
    component: CampyearIndex,
    meta: {
      title: "Kampjaren",
    },
  },
  {
    path: "/campyear/create",
    name: "campyearCreate",
    component: CampyearCreate,
    meta: {
      title: "Kampjaar aanmaken",
    },
  },
  {
    path: "/campyear/:year",
    name: "campyearEdit",
    component: CampyearEdit,
    meta: {
      title: "Kampjaar wijzigen",
    },
    props: true,
  },
  {
    path: "/user",
    name: "user",
    component: UserIndex,
    meta: {
      title: "Gebruikers",
    },
  },
  {
    path: "/user/create",
    name: "userCreate",
    component: UserCreate,
    meta: {
      title: "Gebruiker aanmaken",
    },
  },
  {
    path: "/user/:id",
    name: "userEdit",
    component: UserEdit,
    meta: {
      title: "Gebruker wijzigen",
    },
    props: true,
  },
  {
    path: "/registration",
    name: "campRegistration",
    component: CampRegistationIndex,
    meta: {
      title: "Inschrijvingen",
    },
  },
  {
    path: "/registration/:id",
    name: "campRegistrationEdit",
    component: CampRegistrationEdit,
    meta: {
      title: "Inschrijving wijzigen",
    },
    props: true,
  },
  {
    path: "/account/settings",
    name: "settings",
    component: SettingsView,
    meta: {
      title: "Settings",
    },
  },
  {
    path: "/login",
    name: "login",
    component: SigninView,
    meta: {
      title: "Log in",
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  document.title = `Stafplicatie ${to.meta.title}`;
  next();
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/login"];
  const authRequired = !publicPages.includes(to.path);
  const authStore = useAuthStore();

  if (authRequired && !authStore.isAuthenticated) {
    return next("/login");
  } else {
    next();
  }
});

export default router;
