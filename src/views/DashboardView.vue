<script setup lang="ts">
import { getAllCampyears, type ResponseCampyearResponse } from "@/client";
import { computed, onMounted, ref } from "vue";
import { CalendarDays } from "lucide-vue-next";
import { formatDateNl } from "@/utils/formatDateNl";

const activeCampyear = ref<ResponseCampyearResponse>();
const isLoading = ref(true);

onMounted(async () => {
  const { data, error } = await getAllCampyears();
  if (error) {
    console.error("Error fetching camp years:", error);
    return;
  }
  activeCampyear.value = data?.find(
    (yr: ResponseCampyearResponse) => yr.active === true
  );
  isLoading.value = false;
});

const formattedDates = computed(() => {
  if (activeCampyear.value) {
    const startDate = new Date(activeCampyear.value.start ?? "");
    const endDate = new Date(activeCampyear.value.end ?? "");
    return {
      start: formatDateNl(startDate),
      end: formatDateNl(endDate),
    };
  }
  return { start: "", end: "" };
});
</script>

<template>
  <div>
    <div v-if="!isLoading" class="main-content flex bg-base-200">
      <!-- Main content here -->
      <div v-if="activeCampyear" class="card bg-base-100 w-96 shadow-sm">
        <div class="card-body">
          <div class="stat">
            <div class="stat-figure text-secondary">
              <CalendarDays />
            </div>
            <div class="stat-title">Kampjaar</div>
            <div class="stat-value">{{ activeCampyear.year }}</div>
            <div class="stat-desc">
              {{ formattedDates.start }} - {{ formattedDates.end }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="flex h-screen items-center justify-center">
      <div class="skeleton h-32 w-32"></div>
    </div>
  </div>
</template>
