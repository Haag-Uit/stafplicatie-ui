<script setup lang="ts">
import { ref } from "vue";
import BreadcrumbDefault from "@/components/Breadcrumbs/BreadcrumbDefault.vue";

import DefaultLayout from "@/layouts/DefaultLayout.vue";
import { useNotification } from "@/utils/flashMessage/flashMessage";
import CampRegistrationTable from "@/components/CampRegistration/CampRegistrationTable.vue";
import apiClient from "@/http";

const pageTitle = ref("Inschrijvingen");
const toast = useNotification();

async function exportAll() {
  try {
    let response = await apiClient.get("/stafplicatie/v1/registration/export");
    console.log(response);
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "inschrijvingen.csv");
    document.body.appendChild(link);
    link.click();
  } catch (error) {
    console.error(
      "Er is iets fout gegaan bij het exporteren van de inschrijvingen"
    );
  }
}
</script>

<template>
  <DefaultLayout>
    <!-- Breadcrumb Start -->
    <BreadcrumbDefault :pageTitle="pageTitle" />
    <!-- Breadcrumb End -->

    <div class="flex flex-col gap-5">
      <div class="flex justify-end">
        <button
          class="bg-success text-white px-4 py-2 rounded-md"
          @click="exportAll"
        >
          Export alles
        </button>
      </div>
      <CampRegistrationTable />
    </div>
  </DefaultLayout>
</template>
