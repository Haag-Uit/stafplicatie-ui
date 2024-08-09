<script setup lang="ts">
import apiClient from "@/http";
import { ref } from "vue";
import AlertSuccess from "../Alerts/AlertSuccess.vue";
import AlertError from "../Alerts/AlertError.vue";
import type { FormError } from "../Alerts/ErrTypes";
const formData = ref({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});

interface ResponseAlert {
  title: string;
  message: string;
  errors: Array<FormError>;
}
const err = ref<ResponseAlert>();
const resp = ref<{ title: string; message: string }>();

const resetErrors = () => {
  err.value = undefined;
  resp.value = undefined;
};

const handleSubmit = () => {
  resetErrors();
  apiClient
    .post("/auth/v1/change-password", {
      currentPassword: formData.value.currentPassword,
      newPassword: formData.value.newPassword,
      confirmPassword: formData.value.confirmPassword,
    })
    .then(() => {
      resp.value = {
        title: "Wachtwoord gewijzigd",
        message: "Wachtwoord is succesvol gewijzigd",
      };
      setTimeout(() => {
        resp.value = undefined;
      }, 5000);
    })
    .catch((error) => {
      err.value = {
        title: "Er is iets fout gegaan",
        message: error.response.data.error,
        errors: error.response.data.validation_errors,
      };
    });
};

const handleCancel = () => {
  formData.value.currentPassword = "";
  formData.value.newPassword = "";
  formData.value.confirmPassword = "";
  resetErrors();
};
</script>

<template>
  <div class="grid grid-cols-5 gap-8">
    <!-- Personal Information Section -->
    <div class="col-span-5">
      <div
        class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
      >
        <div class="border-b border-stroke py-4 px-7 dark:border-strokedark">
          <h3 class="font-medium text-black dark:text-white">
            Wachtwoord wijzigen
          </h3>
        </div>
        <div class="p-7">
          <div class="mb-5" v-if="err || resp">
            <AlertError
              v-if="err"
              :title="err.title"
              :message="err.message"
              :errors="err.errors"
            />
            <AlertSuccess
              v-if="resp"
              :title="resp.title"
              :errors="resp.message"
            />
          </div>
          <form @submit.prevent="handleSubmit">
            <div class="mb-5.5">
              <label
                class="mb-3 block text-sm font-medium text-black dark:text-white"
                for="currentPassword"
                >Huidig wachtwoord</label
              >
              <div class="relative">
                <input
                  v-model="formData.currentPassword"
                  class="w-full rounded border border-stroke bg-gray py-3 px-4 font-normal text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  type="password"
                  name="currentPassword"
                  id="currentPassword"
                  placeholder="Huidig wachtwoord"
                />
              </div>
            </div>
            <div class="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
              <div class="w-full sm:w-1/2">
                <label
                  class="mb-3 block text-sm font-medium text-black dark:text-white"
                  for="newPassword"
                  >Nieuw wachtwoord</label
                >
                <div class="relative">
                  <input
                    v-model="formData.newPassword"
                    class="w-full rounded border border-stroke bg-gray py-3 px-4 font-normal text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    type="password"
                    name="newPassword"
                    id="newPassword"
                    placeholder="Nieuw wachtwoord"
                  />
                </div>
              </div>

              <div class="w-full sm:w-1/2">
                <label
                  class="mb-3 block text-sm font-medium text-black dark:text-white"
                  for="confirmPassword"
                  >Bevestig nieuw wachtwoord</label
                >
                <input
                  v-model="formData.confirmPassword"
                  class="w-full rounded border border-stroke bg-gray py-3 px-4 font-normal text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Bevestig nieuw wachtwoord"
                />
              </div>
            </div>

            <div class="flex justify-end gap-4.5">
              <button
                class="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                type="button"
                @click="handleCancel"
              >
                Cancel
              </button>
              <button
                class="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                type="submit"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
