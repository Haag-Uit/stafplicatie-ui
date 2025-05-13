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
import {
  exportParticipants,
  getAllParticipants,
  type GetAllParticipantsResponse,
} from "@/client";
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

onMounted(async () => {
  await fetchParticipants();
});
</script>

<style scoped></style>
