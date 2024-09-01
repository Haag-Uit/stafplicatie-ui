<script setup lang="ts">
import { ref } from "vue";
import BreadcrumbDefault from "@/components/Breadcrumbs/BreadcrumbDefault.vue";

import DefaultLayout from "@/layouts/DefaultLayout.vue";
import { useNotification } from "@/utils/flashMessage/flashMessage";
import CampRegistrationTable from "@/components/CampRegistration/CampRegistrationTable.vue";

const pageTitle = ref("Inschrijvingen");
const toast = useNotification();
</script>

<template>
  <DefaultLayout>
    <!-- Breadcrumb Start -->
    <BreadcrumbDefault :pageTitle="pageTitle" />
    <!-- Breadcrumb End -->

    <div class="flex flex-col gap-5">
      <CampRegistrationTable />
    </div>
  </DefaultLayout>
</template>
