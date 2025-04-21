<template>
  <div class="p-4">
    <div class="card bg-base-100 w-full shadow-sm">
      <form @submit.prevent="save">
        <div class="card-body">
          <h2 class="card-title">Kampjaar {{ year }} wijzigen</h2>
          <div>
            <div class="flex gap-4">
              <div class="w-1/2">
                <fieldset class="fieldset">
                  <legend class="fieldset-legend">Startdatum:</legend>
                  <input
                    v-model="start"
                    name="start"
                    type="date"
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
                    v-model="end"
                    name="end"
                    type="date"
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
                    v-model="participationFee"
                    name="participationFee"
                    type="number"
                    min="0"
                    placeholder="Inschrijving bedrag"
                    class="input w-full"
                    required
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
                    v-model="insuranceFee"
                    name="insuranceFee"
                    type="number"
                    min="0"
                    placeholder="Annuleringsverzekering bedrag"
                    class="input w-full"
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
            <button type="submit" class="btn btn-success">Opslaan</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  getCampyear,
  updateCampyear,
  type UpdateCampyearData,
  type UpdateCampyearError,
} from "@/client";
import { onMounted, ref } from "vue";
import { useToastStore } from "@/stores/toastr";
import { useRouter } from "vue-router";

const toastStore = useToastStore();
const router = useRouter();
const props = defineProps({
  year: {
    type: String,
    required: true,
  },
});

const start = ref<string>();
const end = ref<string>();
const participationFee = ref<string>();
const insuranceFee = ref<string>();

const errorMsg = ref<{ error: { [key: string]: string } }>({
  error: {},
});

onMounted(async () => {
  const { data, error } = await getCampyear({
    path: { year: Number(props.year) },
  });
  if (error) {
    console.error("Error fetching camp year:", error.message);
    toastStore.addToast({
      message: "Fout bij het ophalen van kampjaar.",
      type: "error",
    });
    return;
  }
  start.value = new Date(data.start).toLocaleDateString();
  end.value = new Date(data.end).toLocaleDateString();
  participationFee.value = data.participationFee;
  insuranceFee.value = data.insuranceFee;
});

const save = async () => {
  const req: UpdateCampyearData = {
    path: { year: Number(props.year) },
    body: {
      start: start.value,
      end: end.value,
      participationFee:
        participationFee.value === ""
          ? undefined
          : Number(participationFee.value),
      insuranceFee:
        insuranceFee.value === "" ? undefined : Number(insuranceFee.value),
    },
  };
  const { data, error } = await updateCampyear(req);
  if (error) {
    console.error("Error updating camp year:", error.message);
    if ((error as UpdateCampyearError).fields) {
      errorMsg.value.error = (error as UpdateCampyearError).fields!;
    }
    return;
  }
  toastStore.addToast({
    message: `Kampjaar ${data.year} gewijzigd`,
    type: "success",
  });
  router.push({ name: "campyearIndex" });
};
</script>

<style scoped></style>
