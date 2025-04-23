<script setup lang="ts">
import { getAllCampyears, type response_CampyearResponse } from "@/client";
import { computed, onMounted, ref } from "vue";
import { CalendarDays } from "lucide-vue-next";

const activeCampyear = ref<response_CampyearResponse>({});
const isLoading = ref(true);

onMounted(async () => {
  try {
    const resp = await getAllCampyears();
    activeCampyear.value = resp.data.find(
      (yr: response_CampyearResponse) => yr.active === true,
    );
    isLoading.value = false;
  } catch (error) {
    console.error("Error fetching campyears:", error);
  }
});

const formattedDates = computed(() => {
  if (activeCampyear.value) {
    const startDate = new Date(activeCampyear.value.start ?? "");
    const endDate = new Date(activeCampyear.value.end ?? "");
    return {
      start: startDate.toLocaleDateString("nl", {
        month: "long",
        day: "2-digit",
      }),
      end: endDate.toLocaleDateString("nl", {
        month: "long",
        day: "2-digit",
      }),
    };
  }
  return { start: "", end: "" };
});
</script>

<template>
  <div>
    <div v-if="!isLoading" class="flex bg-base-200">
      <div class="main-content">
        <!-- Main content here -->
        <div class="card bg-base-100 w-96 shadow-sm">
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
    </div>
    <div v-else class="flex h-screen items-center justify-center">
      <div class="skeleton h-32 w-32"></div>
    </div>
  </div>
</template>
