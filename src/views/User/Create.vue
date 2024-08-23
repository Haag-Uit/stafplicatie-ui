<script setup lang="ts">
import BreadcrumbDefault from "@/components/Breadcrumbs/BreadcrumbDefault.vue";
import DefaultCard from "@/components/Forms/DefaultCard.vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import { ref } from "vue";
import apiClient from "@/http";
import router from "@/router";
import type { CreateUser } from "@/views/User/user.types";

const pageTitle = ref("Gebruiker aanmaken");
const user = ref<CreateUser>({
  email: "",
  role: "",
  password: "",
  confirmPassword: "",
});
const error = ref("");

function createUser() {
  apiClient
    .post("/stafplicatie/v1/user", user.value)
    .then(() => {
      router.push("/user");
    })
    .catch((err) => {
      error.value = err.response.data.error;
    });
}
</script>

<template>
  <DefaultLayout>
    <!-- Breadcrumb Start -->
    <BreadcrumbDefault
      :pageTitle="pageTitle"
      :parents="[{ name: 'Gebruikers', link: '/user' }]"
    />
    <!-- Breadcrumb End -->

    <div class="">
      <div class="flex flex-col gap-9">
        <DefaultCard cardTitle="Gebruiker gegevens">
          <div class="p-6.5">
            <form @submit.prevent="createUser()">
              <div class="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div class="w-full">
                  <label class="mb-2.5 block text-black dark:text-white">
                    Email
                    <span class="text-meta-1">*</span>
                  </label>
                  <input
                    type="email"
                    class="w-full rounded border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    required
                    placeholder="huisicter@haaguit.com"
                    v-model="user.email"
                  />
                </div>
              </div>
              <div class="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                <div class="w-full sm:w-1/2">
                  <label
                    class="mb-3 block text-sm font-medium text-black dark:text-white"
                    for="newPassword"
                    >Wachtwoord</label
                  >
                  <div class="relative">
                    <input
                      v-model="user.password"
                      class="w-full rounded border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      type="password"
                      name="newPassword"
                      id="newPassword"
                      placeholder="Wachtwoord"
                    />
                  </div>
                </div>

                <div class="w-full sm:w-1/2">
                  <label
                    class="mb-3 block text-sm font-medium text-black dark:text-white"
                    for="confirmPassword"
                    >Bevestig wachtwoord</label
                  >
                  <input
                    v-model="user.confirmPassword"
                    class="w-full rounded border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="Bevestig wachtwoord"
                  />
                </div>
              </div>
              <div class="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div class="w-full">
                  <label
                    class="mb-3 block text-sm font-medium text-black dark:text-white"
                  >
                    Rol
                  </label>
                  <div class="relative z-20 bg-white dark:bg-form-input">
                    <select
                      v-model="user.role"
                      :class="{
                        'text-black dark:text-white': user.role != '',
                      }"
                      class="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                    >
                      <option value="" disabled selected>Rol</option>
                      <option value="staf" class="text-body dark:text-bodydark">
                        Staf
                      </option>
                      <option
                        value="medewerker"
                        class="text-body dark:text-bodydark"
                      >
                        Medewerker
                      </option>
                    </select>
                    <span
                      class="absolute top-1/2 right-4 z-10 -translate-y-1/2"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.8">
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                            fill="#637381"
                          ></path>
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>

              <button
                class="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
              >
                Opslaan
              </button>
              <div class="text-danger">{{ error }}</div>
            </form>
          </div>
        </DefaultCard>
      </div>
    </div>
  </DefaultLayout>
</template>
