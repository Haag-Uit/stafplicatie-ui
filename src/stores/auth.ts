import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import router from "@/router";

export const useAuthStore = defineStore("auth", () => {
  const token = ref(localStorage.getItem("token"));
  const isAuthenticated = computed(() => !!token.value);

  function login(respToken: string) {
    localStorage.setItem("token", respToken);
    token.value = respToken;
  }

  function logout() {
    localStorage.removeItem("token");
    token.value = null;
    router.push("/login");
  }

  return { isAuthenticated, token, login, logout };
});
