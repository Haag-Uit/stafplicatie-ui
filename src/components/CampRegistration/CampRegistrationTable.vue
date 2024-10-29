<script setup lang="ts">
import { ref, computed } from "vue";
import apiClient from "@/http";
import type { CampRegistration } from "@/views/CampRegistration/campRegistration.types";

interface CampRegistrationTableRow {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  typeOfPayment: string;
  status: string;
  attendance: string;
}

const registrations = ref<CampRegistrationTableRow[]>([]);

apiClient.get("/stafplicatie/v1/registration").then((response) => {
  registrations.value = response.data;
});

const sortedReg = computed(() => {
  return registrations.value.sort(
    (a: CampRegistrationTableRow, b: CampRegistrationTableRow) => {
      return a.firstName.localeCompare(b.firstName);
    }
  );
});
</script>

<template>
  <div
    class="rounded-sm border border-stroke bg-white px-5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5"
  >
    <div class="max-w-full overflow-x-auto">
      <table class="w-full table-auto">
        <thead>
          <tr class="bg-gray-2 text-left dark:bg-meta-4">
            <th
              class="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11"
            >
              Naam
            </th>
            <th
              class="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white"
            >
              Email
            </th>
            <th
              class="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white"
            >
              Methode
            </th>
            <th
              class="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white"
            >
              Status
            </th>
            <th
              class="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white"
            >
              Presentie
            </th>
            <th class="py-4 px-4 font-medium text-black dark:text-white">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(reg, index) in sortedReg" :key="reg.id">
            <td class="py-5 px-4 xl:pl-11">
              <h5 class="font-medium text-black dark:text-white">
                {{ reg.firstName }} {{ reg.lastName }}
              </h5>
            </td>
            <td class="py-5 px-4">
              <h5 class="font-medium text-black dark:text-white">
                {{ reg.email }}
              </h5>
            </td>
            <td class="py-5 px-4">
              <p class="text-black dark:text-white" style="text-transform: capitalize;">
                {{ reg.typeOfPayment }}
              </p>
            </td>
            <td class="py-5 px-4">
              <p class="text-black dark:text-white">
                <div
                  class="inline-flex rounded-full py-1 px-3 text-sm font-medium hover:bg-opacity-90 text-white"
                  style="background-color: rgb(249, 193, 7); text-transform: capitalize;"
                  v-if="reg.status !== 'betaald' && reg.status !== 'paid'"
                >
                  {{ reg.status }}
                </div>
                <div
                  class="inline-flex rounded-full py-1 px-3 text-sm font-medium hover:bg-opacity-90 text-white"
                  style="background-color: rgb(60, 167, 69)"
                  v-if="reg.status === 'betaald' || reg.status === 'paid'"
                >
                  Betaald
                </div>
              </p>
            </td>
            <td class="py-5 px-4">
              <p class="text-black dark:text-white" style="text-transform: capitalize;">
                {{ reg.attendance }}
              </p>
            </td>
            <td class="py-5 px-4">
              <div class="flex items-center space-x-3.5">
                <router-link
                  :to="{
                    name: 'campRegistrationEdit',
                    params: { id: reg.id },
                  }"
                  class="flex"
                >
                  <button class="hover:text-primary">
                    <svg
                      class="fill-current"
                      fill="none"
                      width="18"
                      height="18"
                      version="1.1"
                      id="lni_lni-pencil"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 64 64"
                      xml:space="preserve"
                    >
                      <path
                        d="M61.2,13c-3.2-3.4-6.6-6.8-10-10.1c-0.7-0.7-1.5-1.1-2.4-1.1c-0.9,0-1.8,0.3-2.4,1L8.7,40.2c-0.6,0.6-1,1.3-1.3,2L1.9,59
	c-0.3,0.8-0.1,1.6,0.3,2.2c0.5,0.6,1.2,1,2.1,1h0.4l17.1-5.7c0.8-0.3,1.5-0.7,2-1.3l37.5-37.4c0.6-0.6,1-1.5,1-2.4
	S61.9,13.7,61.2,13z M20.6,52.1c-0.1,0.1-0.2,0.1-0.3,0.2L7.4,56.6l4.3-12.9c0-0.1,0.1-0.2,0.2-0.3L39.4,16l8.7,8.7L20.6,52.1z
	 M51.2,21.5l-8.7-8.7l6.1-6.1c2.9,2.8,5.8,5.8,8.6,8.7L51.2,21.5z"
                      />
                    </svg>
                  </button>
                </router-link>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
