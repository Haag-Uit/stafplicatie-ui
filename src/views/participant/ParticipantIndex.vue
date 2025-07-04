<template>
  <div class="p-4">
    <div v-if="loading" class="loading loading-spinner loading-lg"></div>
    <div v-else>
      <div class="card bg-base-100 w-full shadow-sm">
        <div class="card-body">
          <div class="flex items-center justify-between">
            <h2 class="card-title">Inschrijvingen</h2>
            <button class="btn btn-primary" @click="getExport()">
              Export alles
            </button>
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
import {
  exportParticipants,
  getAllParticipants,
  type GetAllParticipantsResponse,
} from "@/client";
import { ref, onMounted, computed } from "vue";
import { useToastStore } from "@/stores/toastr";
import ParticipantTableRow from "@/components/participant/ParticipantTableRow.vue";
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
  try {
    const response = await getAllParticipants();
    participants.value = response.data;
    loading.value = false;
  } catch (error) {
    console.error("Error fetching participants:", error);
    toastStore.addToast({
      message: "Fout bij het ophalen van inschrijvingen.",
      type: "error",
    });
  }
};

async function getExport() {
  try {
    const response = await exportParticipants({
      headers: {
        Accept: "application/csv",
      },
    });

    // Extract the filename from the Content-Disposition header
    const contentDisposition = response.response.headers["content-disposition"];
    const fileName =
      contentDisposition?.split("filename=")[1]?.replace(/"/g, "") ||
      "inschrijvingen_haaguit.csv";
    // Create a URL for the file
    const url = window.URL.createObjectURL(new Blob([response.data]));

    // Create a temporary anchor element to trigger the download
    const link = document.createElement("a");
    link.href = url;

    // Set the file name (you can customize this based on your API response)
    link.setAttribute("download", fileName);

    // Append the link to the document and trigger the download
    document.body.appendChild(link);
    link.click();

    // Clean up the DOM
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error exporting participants:", error);
    toastStore.addToast({
      message: "Fout bij het exporteren van inschrijvingen.",
      type: "error",
    });
  }
}

const filteredParticipants = computed(() => {
  if (!searchQuery.value.trim()) {
    return sortParticipants(participants.value);
  }
  const query = searchQuery.value.toLowerCase();
  const filtered = participants.value.filter(
    (participant) =>
      participant.person.firstName.toLowerCase().includes(query) ||
      participant.person.lastName.toLowerCase().includes(query) ||
      participant.person.email.toLowerCase().includes(query)
  );
  return sortParticipants(filtered);
});

onMounted(async () => {
  await fetchParticipants();
});
</script>

<style scoped></style>
