<script setup lang="ts">
import { ref } from "vue";
import BreadcrumbDefault from "@/components/Breadcrumbs/BreadcrumbDefault.vue";
import UserTable from "@/components/User/UserTable.vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import { useNotification } from "@/utils/flashMessage/flashMessage";

const pageTitle = ref("Gebruikers");
const toast = useNotification();
</script>

<template>
  <DefaultLayout>
    <!-- Breadcrumb Start -->
    <BreadcrumbDefault :pageTitle="pageTitle" />
    <!-- Breadcrumb End -->

    <div class="flex flex-col gap-5">
      <div class="flex justify-end">
        <router-link to="/user/create">
          <button class="bg-success text-white px-4 py-2 rounded-md">
            Nieuwe gebruiker
          </button>
        </router-link>
      </div>
      <UserTable />
    </div>
  </DefaultLayout>
</template>
