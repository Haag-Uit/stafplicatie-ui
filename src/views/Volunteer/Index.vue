<script setup lang="ts">
import { ref } from "vue";
import BreadcrumbDefault from "@/components/Breadcrumbs/BreadcrumbDefault.vue";

import DefaultLayout from "@/layouts/DefaultLayout.vue";
import { useNotification } from "@/utils/flashMessage/flashMessage";
import apiClient from "@/http";
import VolunteerTable from "@/components/Volunteer/VolunteerTable.vue";

const pageTitle = ref("Medewerkers");
const toast = useNotification();
</script>

<template>
  <DefaultLayout>
    <!-- Breadcrumb Start -->
    <BreadcrumbDefault :pageTitle="pageTitle" />
    <!-- Breadcrumb End -->

    <div class="flex flex-col gap-5">
      <div class="flex justify-end">
        <router-link to="/volunteer/create">
          <button class="bg-success text-white px-4 py-2 rounded-md">
            Nieuwe medewerker
          </button>
        </router-link>
      </div>
      <VolunteerTable />
    </div>
  </DefaultLayout>
</template>
