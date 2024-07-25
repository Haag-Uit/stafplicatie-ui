<script setup lang="ts">
import { RouterLink } from "vue-router";
import { useLayoutStore } from "@/stores/layout";

const props = defineProps(["to", "icon", "text"]);
const layoutStore = useLayoutStore();
</script>

<template>
  <div class="">
    <RouterLink
      class="py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 flex items-center"
      :to="props.to"
      v-if="layoutStore.layoutState.sidebarOpen"
      ><i class="lni mr-2" :class="[props.icon]"></i>
      {{ props.text }}</RouterLink
    >
    <RouterLink
      class="py-4 px-4 rounded transition duration-200 hover:bg-gray-700 flex items-center justify-center"
      to="/"
      v-if="!layoutStore.layoutState.sidebarOpen"
      ><i class="lni" :class="[props.icon]"></i
    ></RouterLink>
  </div>
</template>
