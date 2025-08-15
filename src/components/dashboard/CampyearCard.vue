<template>
  <div class="">
    <div v-if="loading">
      <div class="flex w-52 flex-col gap-4">
        <div class="skeleton h-4 w-28"></div>
        <div class="skeleton h-4 w-full"></div>
        <div class="skeleton h-4 w-full"></div>
      </div>
    </div>
    <div
      v-if="!loading && activeCampyear"
      class="card bg-base-100 w-full shadow-sm"
    >
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
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { formatDateNl } from "@/utils/formatDateNl";
import { CalendarDays } from "lucide-vue-next";
import { listCampyears, type CampyearCampyearResponse } from "@/campyear-api";

const activeCampyear = ref<CampyearCampyearResponse>();
const loading = ref(true);

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

onMounted(async () => {
  const { data, error } = await listCampyears();
  if (error) {
    console.error("Error fetching camp years:", error);
    return;
  }
  activeCampyear.value = data.campyears.find(
    (yr: CampyearCampyearResponse) => yr.active === true
  );
  loading.value = false;
});
</script>

<style scoped></style>
