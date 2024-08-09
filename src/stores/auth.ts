import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import router from "@/router";

export const useAuthStore = defineStore("auth", () => {
  const token = ref(localStorage.getItem("token"));
  const isAuthenticated = computed(() => !!token.value);

  function login(email: string, password: string) {
    axios
      .post(
        "/auth/v1/login",
        { email, password },
        { baseURL: import.meta.env.VITE_BASE_URL }
      )
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        token.value = response.data.token;
        router.push("/");
      });
  }
  function logout() {
    localStorage.removeItem("token");
    token.value = null;
    router.push("/login");
  }
  return { isAuthenticated, token, login, logout };
});
