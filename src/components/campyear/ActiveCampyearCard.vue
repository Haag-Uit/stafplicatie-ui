<template>
  <div class="card bg-base-100 w-full shadow-sm">
    <div class="card-body">
      <div class="flex items-center justify-between">
        <h2 class="card-title">Actieve kampjaar</h2>
      </div>
      <div class="flex flex-col md:flex-row justify-between">
        <div class="">
          <div class="stats">
            <div class="stat">
              <div class="stat-value">
                {{ activeCampyear.year }}
              </div>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-x-6 w-64">
          <div class="flex items-center">Start:</div>
          <div class="flex items-center">
            {{ formatDateNl(activeCampyear.start!) }}
          </div>
          <div class="flex items-center">Eind:</div>
          <div class="flex items-center">
            {{ formatDateNl(activeCampyear.end!) }}
          </div>
          <div class="flex items-center">Inschrijvingen:</div>
          <div class="flex items-center gap-2">
            <input
              type="checkbox"
              class="toggle border-red-400 bg-red-400 checked:bg-green-400 checked:text-green-600 checked:border-green-400"
              :checked="activeCampyear.open"
              @change="openClose"
            />
            <span
              :class="{
                'text-success': activeCampyear.open,
                'text-error': !activeCampyear.open,
              }"
              >{{ openStatus }}</span
            >
          </div>
        </div>
        <div class="mt-4 md:mt-0">
          <fieldset class="fieldset">
            <legend class="fieldset-legend">Actieve kampjaar:</legend>
            <select class="select select-bordered" @change="activate">
              <option
                v-for="(year, k) in yearList"
                :key="k"
                :value="year"
                :selected="activeCampyear.year === year"
              >
                {{ year }}
              </option>
            </select>
          </fieldset>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  closeCampyear,
  openCampyear,
  type ResponseCampyearResponse,
} from "@/client";
import { formatDateNl } from "@/utils/formatDateNl";
import { computed } from "vue";

const props = defineProps<{
  activeCampyear: ResponseCampyearResponse;
  yearList: number[];
}>();

const emit = defineEmits<{
  (e: "changeActive", year: number): void;
  (r: "updateOpenClose", open: boolean): void;
}>();

const openClose = async () => {
  try {
    if (props.activeCampyear.open) {
      await closeCampyear({ path: { year: props.activeCampyear.year! } });
    } else {
      await openCampyear({ path: { year: props.activeCampyear.year! } });
    }
    emit("updateOpenClose", !props.activeCampyear.open);
  } catch (error) {
    console.error("Error opening/closing camp year:", error);
  }
};

const activate = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  const year = parseInt(target.value, 10);
  if (!isNaN(year)) {
    emit("changeActive", year);
  }
};

const openStatus = computed(() => {
  return props.activeCampyear.open ? "Open" : "Gesloten";
});
</script>

<style scoped></style>
