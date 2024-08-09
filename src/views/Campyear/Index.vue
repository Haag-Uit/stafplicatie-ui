<script setup lang="ts">
import { ref } from "vue";
import BreadcrumbDefault from "@/components/Breadcrumbs/BreadcrumbDefault.vue";
import CampyearTable from "@/components/Campyear/CampyearTable.vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import { useNotification } from "@/utils/flashMessage/flashMessage";

const pageTitle = ref("Kampjaren");
const toast = useNotification();
</script>

<template>
  <DefaultLayout>
    <!-- Breadcrumb Start -->
    <BreadcrumbDefault :pageTitle="pageTitle" />
    <!-- Breadcrumb End -->

    <div class="flex flex-col gap-5">
      <div class="flex justify-end">
        <router-link to="/campyear/create">
          <button class="bg-success text-white px-4 py-2 rounded-md">
            Nieuw kampjaar
          </button>
        </router-link>
      </div>
      <CampyearTable />
    </div>
  </DefaultLayout>
</template>
