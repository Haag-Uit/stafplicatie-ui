<template>
  <div class="card card-border bg-base-100 w-full mb-5">
    <div v-if="loading" class="card-body">
      <div class="flex flex-col lg:flex-row gap-4">
        <div class="w-full lg:w-1/2 p-4 grid grid-cols-2">
          <div class="flex items-center pb-2">
            <div class="skeleton h-4 w-24"></div>
          </div>
          <div class="flex items-center pb-2">
            <div class="skeleton h-4 w-full"></div>
          </div>
          <div class="flex items-center pb-2">
            <div class="skeleton h-4 w-24"></div>
          </div>
          <div class="flex items-center pb-2">
            <div class="skeleton h-4 w-full"></div>
          </div>
          <div class="flex items-center pb-2">
            <div class="skeleton h-4 w-24"></div>
          </div>
          <div class="flex items-center pb-2">
            <div class="skeleton h-4 w-full"></div>
          </div>
        </div>
        <div class="w-full lg:w-1/2 p-4 grid grid-cols-2">
          <div class="flex items-center pb-2">
            <div class="skeleton h-4 w-24"></div>
          </div>
          <div class="flex items-center pb-2">
            <div class="skeleton h-4 w-full"></div>
          </div>
          <div class="flex items-center pb-2">
            <div class="skeleton h-4 w-24"></div>
          </div>
          <div class="flex items-center pb-2">
            <div class="skeleton h-4 w-full"></div>
          </div>
          <div class="flex items-center pb-2">
            <div class="skeleton h-4 w-24"></div>
          </div>
          <div class="flex items-center pb-2">
            <div class="skeleton h-4 w-full"></div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="card-body">
      <h2 class="card-title pb-4">
        {{ person.firstName }} {{ person.lastName }}
      </h2>
      <div class="flex flex-col lg:flex-row gap-4">
        <div class="w-full lg:w-1/2 p-4 grid grid-cols-2">
          <div class="flex items-center pb-2"><User class="mr-2" /> Naam:</div>
          <div class="flex items-center pb-2">
            {{ fullname }}
          </div>
          <div class="flex items-center pb-2">
            <CircleSmall class="mr-2" /> Gender:
          </div>
          <div class="flex items-center pb-2">
            {{ gender }}
          </div>
          <div class="flex items-center pb-2">
            <Cake class="mr-2" /> Geboortedatum:
          </div>
          <div class="flex items-center pb-2">
            <div class="flex flex-col">
              <div>
                {{ dobCalcs.dob }}
                <span class="text-xs text-gray-600">
                  ({{ dobCalcs.age }} jaar)</span
                >
              </div>
              <div class="text-xs text-gray-600" v-if="dobCalcs.onHu">
                (Op Haag Uit: {{ dobCalcs.onHu }})
              </div>
            </div>
          </div>
        </div>
        <div class="w-full lg:w-1/2 p-4 grid grid-cols-2">
          <div class="flex items-center pb-2">
            <Phone class="mr-2" /> Telefoonnummer:
          </div>
          <div class="flex items-center pb-2">
            {{ props.person.phone }}
          </div>
          <div class="flex items-center pb-2 text-error">
            <ShieldPlus class="mr-2" /> Noodcontact:
          </div>
          <div class="flex items-start pb-2 text-error">
            {{ props.person.emergencyContact }}
          </div>
          <div class="flex items-center pb-2">
            <MapPinHouse class="mr-2" /> Adres:
          </div>
          <div class="flex flex-col items-start pb-2">
            <div>{{ props.person.address }}</div>
            <div>
              {{ props.person.zipCode }}
              {{ props.person.city }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  User,
  CircleSmall,
  Cake,
  Phone,
  ShieldPlus,
  MapPinHouse,
} from "lucide-vue-next";
import type {
  ResponseCampyearResponse,
  ResponsePersonResponse,
} from "@/client";
import { formatLongDateNl } from "@/utils/formatDateNl";
import { computed } from "vue";
import type { PersonPersonResponse } from "@/relations-api";

const props = defineProps<{
  person: ResponsePersonResponse | PersonPersonResponse;
  campyear?: ResponseCampyearResponse;
}>();

const loading = computed(() => !props.person);

const fullname = computed(() => {
  const name = props.person.firstName;
  const firstLetter = name?.charAt(0).toUpperCase();
  const restOfName = name?.slice(1);
  return `${firstLetter}${restOfName} ${props.person.lastName}`;
});

const dobCalcs = computed(() => {
  const date = new Date(props.person.dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - date.getFullYear();
  const monthDiff = today.getMonth() - date.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < date.getDate())) {
    age -= 1;
  }
  const dob = formatLongDateNl(date);
  let onHu: number | null = null;
  if (props.campyear) {
    const start = new Date(props.campyear.start);
    // calculcate the age as of the start date of the camp year
    onHu = start.getFullYear() - date.getFullYear();
    const monthDiff = start.getMonth() - date.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && start.getDate() < date.getDate())
    ) {
      onHu -= 1;
    }
  }
  return { age, dob, onHu };
});

const gender = computed(() => {
  switch (props.person.gender) {
    case "m":
      return "Man";
    case "v":
      return "Vrouw";
    case "nb":
      return "Non-binair";
    default:
      return "Onbekend";
  }
});
</script>

<style scoped></style>
