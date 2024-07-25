<script setup lang="ts">
import { RouterView } from "vue-router";
import Sidebar from "@/views/layout/Sidebar.vue";
import Header from "@/views/layout/Header.vue";
</script>

<template>
  <div id="app" class="h-screen flex">
    <!-- Sidebar -->
    <Sidebar />
    <!-- Main content -->
    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <Header />
      <!-- Content -->
      <RouterView />
    </div>
  </div>
</template>

<style scoped></style>
