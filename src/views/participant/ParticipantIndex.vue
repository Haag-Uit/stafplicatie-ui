<template>
  <div class="p-4">
    <div v-if="loading" class="loading loading-spinner loading-lg"></div>
    <div v-else>
      <div class="card bg-base-100 w-full shadow-sm">
        <div class="card-body">
          <div class="flex items-center justify-between">
            <h2 class="card-title">Inscrhijvingen</h2>
          </div>
          <div
            class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100"
          >
            <table class="table">
              <!-- head -->
              <thead>
                <tr>
                  <th>Naam</th>
                  <th>Email</th>
                  <th>Methode</th>
                  <th>Betaald</th>
                  <th>Presentie</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <ParticipantTableRow
                  v-for="participant in sortedParticipants"
                  :key="participant.id"
                  :participant="participant"
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
import { getAllParticipants, type GetAllParticipantsResponse } from "@/client";
import { ref, onMounted, computed } from "vue";
import { useToastStore } from "@/stores/toastr";
import ParticipantTableRow from "@/components/participant/ParticipantTableRow.vue";

const toastStore = useToastStore();

const participants = ref<GetAllParticipantsResponse>([]);
const loading = ref(true);

const sortedParticipants = computed(() => {
  return participants.value.slice(0).sort((a, b) => {
    return a.id - b.id;
  });
});

const fetchParticipants = async () => {
  try {
    const response = await getAllParticipants();
    participants.value = response.data;
  } catch (error) {
    console.error("Error fetching participants:", error);
    toastStore.addToast({
      message: "Fout bij het ophalen van inschrijvingen.",
      type: "error",
    });
  }
};

onMounted(async () => {
  try {
    await fetchParticipants();
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped></style>
