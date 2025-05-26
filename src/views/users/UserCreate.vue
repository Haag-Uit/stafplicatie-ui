<template>
  <div class="p-4">
    <div class="card bg-base-100 w-full shadow-sm">
      <form @submit.prevent="create">
        <div class="card-body">
          <h2 class="card-title">Gebruiker aanmaken</h2>
          <div>
            <div class="w-full">
              <fieldset class="fieldset">
                <legend class="fieldset-legend">Email:</legend>
                <input
                  type="email"
                  placeholder="staffer@haaguit.com"
                  class="input w-full"
                  v-model="email"
                  required
                />
                <span v-show="errorMsg.error.email" class="text-sm text-error">
                  {{ errorMsg.error.email }}
                </span>
              </fieldset>
            </div>
            <div class="w-full">
              <fieldset class="fieldset">
                <legend class="fieldset-legend">Naam:</legend>
                <input
                  type="text"
                  placeholder="staffer"
                  class="input w-full"
                  v-model="nickname"
                  required
                />
                <span
                  v-show="errorMsg.error.nickname"
                  class="text-sm text-error"
                >
                  {{ errorMsg.error.nickname }}
                </span>
              </fieldset>
            </div>
            <div class="w-full">
              <fieldset class="fieldset">
                <legend class="fieldset-legend">Wachtwoord:</legend>
                <input
                  type="password"
                  class="input w-full"
                  v-model="password"
                  required
                />
                <span
                  v-show="errorMsg.error.password"
                  class="text-sm text-error"
                >
                  {{ errorMsg.error.password }}
                </span>
              </fieldset>
            </div>
          </div>
          <div class="card-actions justify-end">
            <button class="btn btn-success" type="submit">Aanmaken</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useToastStore } from "@/stores/toastr";
import { useRouter } from "vue-router";
import {
  createUser,
  type CreateUserError,
  type main_ApiError,
} from "@/haag-auth-api";

const toastStore = useToastStore();
const router = useRouter();

const email = ref("");
const nickname = ref("");
const password = ref("");

const errorMsg = ref<{ error: { [key: string]: string } }>({
  error: {},
});

const create = async () => {
  const { data, error } = await createUser({
    body: {
      email: email.value,
      nickname: nickname.value,
      password: password.value,
    },
  });
  if (error) {
    console.error("Error creating user:", error.message);
    if ((error as CreateUserError).fields) {
      errorMsg.value.error = (error as main_ApiError).fields!;
    } else {
      toastStore.addToast({
        message: `Fout bij het aanmaken van gebruiker. ${error.message}.`,
        type: "error",
      });
    }
    return;
  }
  toastStore.addToast({
    message: `Gebruiker ${data.year} aangemaakt`,
    type: "success",
  });
  router.push({ name: "userIndex" });
};
</script>

<style scoped></style>
