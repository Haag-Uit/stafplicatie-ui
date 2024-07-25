import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { useAuthStore } from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/LoginView.vue"),
    },
    {
      path: "/campyear",
      name: "campyear",
      component: () => import("@/views/campyear/Index.vue"),
    },
  ],
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
