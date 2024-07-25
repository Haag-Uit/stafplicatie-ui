<script setup lang="ts">
import { ref, computed } from "vue";
import { RouterLink } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useLayoutStore } from "@/stores/layout";
import SidebarLink from "@/components/sidebar/SidebarLink.vue";

const authStore = useAuthStore();
const layoutStore = useLayoutStore();

const sidebarWidth = computed(() => {
  return layoutStore.layoutState.sidebarOpen
    ? "translate-x-0 w-full md:w-64"
    : "-translate-x-full md:w-16";
});
</script>

<template>
  <div
    :class="[
      sidebarWidth,
      'fixed md:relative md:translate-x-0 top-0 left-0 bg-gray-800 text-white transition-transform duration-300 h-full z-50',
    ]"
  >
    <div
      class="flex items-center p-4"
      :class="{
        'justify-between': layoutStore.layoutState.sidebarOpen,
        'justify-center': !layoutStore.layoutState.sidebarOpen,
      }"
    >
      <span class="text-lg font-bold" v-if="layoutStore.layoutState.sidebarOpen"
        >Logo</span
      >
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
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <button
        @click="layoutStore.toggleSidebar"
        class="focus:outline-none hidden md:inline"
      >
        <svg
          v-if="layoutStore.layoutState.sidebarOpen"
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
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <svg
          v-else
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
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
    <nav class="mt-4">
      <SidebarLink to="/" icon="lni-dashboard" text="Dashboard" />
      <SidebarLink to="/campyear" icon="lni-calendar" text="Kampjaren" />
    </nav>
  </div>
</template>
