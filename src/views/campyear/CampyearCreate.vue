<template>
  <div class="p-4">
    <div class="card bg-base-100 w-full shadow-sm">
      <form @submit.prevent="create">
        <div class="card-body">
          <h2 class="card-title">Kampjaar aanmaken</h2>
          <div>
            <div class="w-full">
              <fieldset class="fieldset">
                <legend class="fieldset-legend">Kampjaar:</legend>
                <input
                  type="number"
                  placeholder="Jaar"
                  class="input w-full"
                  v-model="year"
                  min="2000"
                  required
                />
                <span v-show="errorMsg.error.year" class="text-sm text-error">
                  {{ errorMsg.error.year }}
                </span>
              </fieldset>
            </div>
            <div class="flex gap-4">
              <div class="w-1/2">
                <fieldset class="fieldset">
                  <legend class="fieldset-legend">Startdatum:</legend>
                  <input
                    type="date"
                    v-model="start"
                    placeholder="Startdatum"
                    class="input w-full"
                    required
                  />
                  <span
                    v-show="errorMsg.error.start"
                    class="text-sm text-error"
                  >
                    {{ errorMsg.error.start }}
                  </span>
                </fieldset>
              </div>
              <div class="w-1/2">
                <fieldset class="fieldset">
                  <legend class="fieldset-legend">Einddatum:</legend>
                  <input
                    type="date"
                    v-model="end"
                    placeholder="Startdatum"
                    class="input w-full"
                    required
                  />
                  <span v-show="errorMsg.error.end" class="text-sm text-error">
                    {{ errorMsg.error.end }}
                  </span>
                </fieldset>
              </div>
            </div>
            <div class="flex gap-4">
              <div class="w-1/2">
                <fieldset class="fieldset">
                  <legend class="fieldset-legend">Inschrijfbedrag:</legend>
                  <input
                    type="number"
                    placeholder="Inschrijving bedrag"
                    class="input w-full"
                    v-model="participationFee"
                    required
                    min="0"
                  />
                  <span
                    v-show="errorMsg.error.participationFee"
                    class="text-sm text-error"
                  >
                    {{ errorMsg.error.participationFee }}
                  </span>
                </fieldset>
              </div>
              <div class="w-1/2">
                <fieldset class="fieldset">
                  <legend class="fieldset-legend">
                    Annuleringsverzekering:
                  </legend>
                  <input
                    type="number"
                    placeholder="Annuleringsverzekering bedrag"
                    class="input w-full"
                    v-model="insuranceFee"
                    min="0"
                    required
                  />
                  <span
                    v-show="errorMsg.error.insuranceFee"
                    class="text-sm text-error"
                  >
                    {{ errorMsg.error.insuranceFee }}
                  </span>
                </fieldset>
              </div>
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
import { createCampyear } from "@/client";
import { ref } from "vue";
import { useToastStore } from "@/stores/toastr";
import { useRouter } from "vue-router";

const toastStore = useToastStore();
const router = useRouter();

const nextYear = new Date().getFullYear() + 1;
const year = ref<number>(nextYear);
const start = ref<string>(new Date(nextYear, 7, 1).toLocaleDateString());
const end = ref<string>(new Date(nextYear, 7, 31).toLocaleDateString());
const participationFee = ref<string>("100");
const insuranceFee = ref<string>("10");

const errorMsg = ref<{ error: { [key: string]: string } }>({
  error: {},
});

const create = async () => {
  const { data, error } = await createCampyear({
    body: {
      year: year.value,
      start: start.value,
      end: end.value,
      participationFee: Number(participationFee.value),
      insuranceFee:
        insuranceFee.value === "" ? undefined : Number(insuranceFee.value),
    },
  });
  if (error) {
    console.error("Error creating camp year:", error.message);
    errorMsg.value.error = error.error;
    return;
  }
  console.log("Camp year created:", data);
  toastStore.addToast({
    message: `Kampjaar ${data.year} aangemaakt`,
    type: "success",
  });
  router.push({ name: "campyearIndex" });
  // Handle success (e.g., show a success message, redirect, etc.)
};
</script>

<style scoped></style>
