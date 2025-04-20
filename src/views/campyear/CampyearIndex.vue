<template>
  <div class="p-4">
    <div v-if="loading" class="loading loading-spinner loading-lg"></div>
    <div v-else>
      <div class="card bg-base-100 w-full shadow-sm">
        <div class="card-body">
          <div class="flex items-center justify-between">
            <h2 class="card-title">Kampjaren</h2>
            <RouterLink class="btn btn-primary" :to="{ name: 'campyearCreate' }"
              >Aanmaken</RouterLink
            >
          </div>
          <div
            class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100"
          >
            <table class="table">
              <!-- head -->
              <thead>
                <tr>
                  <th>Jaar</th>
                  <th>Start</th>
                  <th>Eind</th>
                  <th>Actief</th>
                  <th>Open</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <CampyearTableRow
                  v-for="campyear in sortedCampyears"
                  :key="campyear.year"
                  :campyear="campyear"
                  @campyear-changed="fetchCampyears"
                />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getAllCampyears, type GetAllCampyearsResponse } from "@/client";
import CampyearTableRow from "@/components/campyear/CampyearTableRow.vue";
import { ref, onMounted, computed } from "vue";
import { useToastStore } from "@/stores/toastr";

const toastStore = useToastStore();

const campyears = ref<GetAllCampyearsResponse>([]);
const loading = ref(true);

const sortedCampyears = computed(() => {
  return campyears.value.slice(0).sort((a, b) => {
    const yearA = a.year ?? 0;
    const yearB = b.year ?? 0;
    return yearB - yearA;
  });
});

const fetchCampyears = async () => {
  try {
    const response = await getAllCampyears();
    campyears.value = response.data;
  } catch (error) {
    console.error("Error fetching camp years:", error);
    toastStore.addToast({
      message: "Fout bij het ophalen van kampjaren.",
      type: "error",
    });
  }
};

onMounted(async () => {
  try {
    await fetchCampyears();
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped></style>
