<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { useLayoutStore } from "@/stores/layout";
import axios from "axios";

const authStore = useAuthStore();
const layoutStore = useLayoutStore();

axios
  .get("/stafplicatie/v1/campyear", {
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
      Authorization: `Bearer ${authStore.token}`,
    },
  })
  .catch((error) => {
    if (error.response.status === 401) {
      authStore.logout();
    }
  });

function logout() {
  authStore.logout();
}
</script>

<template>
  <header class="bg-gray-100 p-4 shadow" v-if="authStore.isAuthenticated">
    <button
      @click="layoutStore.toggleSidebar"
      class="focus:outline-none md:hidden"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16m-7 6h7"
        />
      </svg>
    </button>
    <div class="flex justify-end items-center">
      <a @click="logout()" class="text-blue-500">Logout</a>
    </div>
  </header>
</template>
