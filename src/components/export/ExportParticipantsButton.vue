<template>
  <button class="btn btn-primary" @click="getExport()">Export alles</button>
</template>

<script setup lang="ts">
import { exportParticipants } from "@/client";
import { useToastStore } from "@/stores/toastr";

const toastStore = useToastStore();

async function getExport() {
  try {
    const response = await exportParticipants({
      headers: {
        Accept: "application/csv",
      },
    });
    // Extract the filename from the Content-Disposition header
    const contentDisposition = response.response.headers.get(
      "content-disposition"
    );
    const fileName =
      contentDisposition?.split("filename=")[1]?.replace(/"/g, "") ||
      "inschrijvingen_haaguit.csv";
    // Create a URL for the file
    const url = window.URL.createObjectURL(
      new Blob([response.data as BlobPart])
    );

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
</script>

<style scoped></style>
