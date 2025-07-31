<script setup lang="ts">
import { onMounted, ref } from "vue";
import CampyearCard from "@/components/dashboard/CampyearCard.vue";

const isLoading = ref(true);

onMounted(async () => {
  isLoading.value = false;
});
</script>

<template>
  <div>
    <div v-if="!isLoading" class="main-content bg-base-200">
      <div class="grid grid-cols-1 lg:grid-cols-6 gap-3">
        <!-- Main content here -->
        <CampyearCard class="col-span-2"></CampyearCard>
        <CampyearCard class="col-span-2"></CampyearCard>
        <CampyearCard class="col-span-2"></CampyearCard>
        <CampyearCard class="col-span-3"></CampyearCard>
        <CampyearCard class="col-span-3"></CampyearCard>
        <CampyearCard class="col-span-2"></CampyearCard>
        <CampyearCard class="col-span-2"></CampyearCard>
        <CampyearCard class="col-span-2"></CampyearCard>
      </div>
    </div>
    <div v-else class="flex h-screen items-center justify-center">
      <div class="skeleton h-32 w-32"></div>
    </div>
  </div>
</template>
