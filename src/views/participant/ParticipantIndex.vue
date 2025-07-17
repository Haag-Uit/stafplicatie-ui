<template>
  <div class="p-4">
    <div v-if="loading" class="loading loading-spinner loading-lg"></div>
    <div v-else>
      <div class="card bg-base-100 w-full shadow-sm">
        <div class="card-body">
          <div class="flex items-center justify-between">
            <h2 class="card-title">Inschrijvingen</h2>
            <ExportParticipantsButton />
          </div>
          <label class="input w-full lg:w-1/2">
            <span class="label"><UserSearch /></span>
            <input
              type="text"
              placeholder="Zoek op naam of email"
              v-model="searchQuery"
            />
          </label>
          <div
            class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100"
          >
            <table class="table">
              <thead>
                <tr>
                  <th>Naam</th>
                  <th>Email</th>
                  <th class="hidden lg:table-cell">Methode</th>
                  <th class="hidden md:table-cell">Betaald</th>
                  <th class="hidden md:table-cell">Presentie</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <ParticipantTableRow
                  v-for="participant in filteredParticipants"
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
import ExportParticipantsButton from "@/components/export/ExportParticipantsButton.vue";
import { UserSearch } from "lucide-vue-next";

const toastStore = useToastStore();

const participants = ref<GetAllParticipantsResponse>([]);
const loading = ref(true);
const searchQuery = ref("");

const sortParticipants = (participants: GetAllParticipantsResponse) => {
  return participants.slice(0).sort((a, b) => {
    const nameA = a.person.firstName.toLowerCase() || "";
    const nameB = b.person.firstName.toLowerCase() || "";
    return nameA.localeCompare(nameB);
  });
};

const fetchParticipants = async () => {
  const { data, error } = await getAllParticipants();
  if (error) {
    console.error("Error fetching participants:", error);
    toastStore.addToast({
      message: "Fout bij het ophalen van inschrijvingen.",
      type: "error",
    });
    return;
  }
  participants.value = data ?? [];
  loading.value = false;
};

const filteredParticipants = computed(() => {
  if (!searchQuery.value.trim()) {
    return sortParticipants(participants.value);
  }
  const query = searchQuery.value.toLowerCase();
  const filtered = participants.value.filter(
    (participant) =>
      (
        participant.person.firstName.toLowerCase() +
        " " +
        participant.person.lastName.toLowerCase()
      ).includes(query) ||
      participant.person.email.toLowerCase().includes(query)
  );
  return sortParticipants(filtered);
});

onMounted(async () => {
  await fetchParticipants();
});
</script>

<style scoped></style>
