<template>
  <div class="p-4">
    <div v-if="!loading" class="card bg-base-100 w-full shadow-sm">
      <div class="card-body">
        <h2 class="card-title pb-4">
          {{ participant?.person?.first_name }}
          {{ participant?.person.last_name }}
        </h2>
        <div>
          <div class="flex flex-col lg:flex-row gap-4">
            <div class="w-full lg:w-1/2 p-4 grid grid-cols-2">
              <div class="flex items-center pb-2">
                <User class="mr-2" /> Naam:
              </div>
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
                  <div class="text-xs text-gray-600">
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
                {{ participant?.person?.phone }}
              </div>
              <div class="flex items-center pb-2 text-error">
                <ShieldPlus class="mr-2" /> Noodcontact:
              </div>
              <div class="flex items-start pb-2 text-error">
                {{ participant?.person?.emergency_contact }}
              </div>
              <div class="flex items-center pb-2">
                <MapPinHouse class="mr-2" /> Adres:
              </div>
              <div class="flex flex-col items-start pb-2">
                <div>{{ participant?.person?.address }}</div>
                <div>
                  {{ participant?.person?.zipcode }}
                  {{ participant?.person?.city }}
                </div>
              </div>
            </div>
          </div>
          <div class="divider"></div>
          <div class="flex flex-col lg:flex-row gap-4">
            <div class="w-full lg:w-1/2 p-4 grid grid-cols-2">
              <div class="flex items-center pb-2">
                <UserCheck class="mr-2" /> Aanwezigheid:
              </div>
              <div class="flex items-center pb-2">
                <input
                  type="checkbox"
                  :checked="participant?.attendance == 'open'"
                  class="toggle"
                  :class="{
                    'toggle-success': participant?.attendance == 'open',
                    'border-error text-error':
                      participant?.attendance == 'afgemeld',
                  }"
                  @change="updateAttendance()"
                />
                &nbsp; {{ attendance }}
              </div>
              <div class="flex items-center pb-2">
                <CalendarPlus2 class="mr-2" /> Geregistreerd op:
              </div>
              <div class="flex items-center pb-2">
                {{
                  new Date(participant?.created_at!).toLocaleDateString(
                    "nl-NL",
                    {
                      year: "numeric",
                      month: "long",
                      day: "2-digit",
                    }
                  )
                }}
              </div>
              <div class="flex items-start pb-2">
                <Shirt class="mr-2" /> Shirtmaat:
              </div>
              <div class="flex items-start pb-2">
                <select
                  v-model="shirtSize"
                  class="select"
                  @change="updateShirtsize()"
                >
                  <option value="XS">XS</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                </select>
              </div>
            </div>
            <div
              v-if="participant?.payments?.length! > 0"
              class="w-full lg:w-1/2 p-4 grid grid-cols-2"
            >
              <div class="flex items-center pb-2">
                <Landmark class="mr-2" /> Transactie ID:
              </div>
              <div class="flex items-center pb-2">
                {{ latestPayment.payment_id }}
              </div>
              <div class="flex items-center pb-2">
                <ReceiptText class="mr-2" /> Status:
              </div>
              <div class="flex items-center pb-2">
                {{ latestPayment.payment_status }}
              </div>
              <div class="flex items-center pb-2">
                <Wallet class="mr-2" /> Betaalmethode:
              </div>
              <div class="flex items-center pb-2">
                {{ latestPayment.payment_method }}
              </div>
              <div class="flex items-center pb-2">
                <ShieldX class="mr-2" /> Annuleringsverzekering:
              </div>
              <div class="flex items-center pb-2">
                <div v-if="participant?.insurance" class="badge badge-success">
                  Ja
                </div>
                <div v-else class="badge badge-error">Nee</div>
              </div>
            </div>
            <div v-else class="w-full lg:w-1/2">
              <div class="flex items-center pb-2">Geen betalingen gevonden</div>
            </div>
          </div>
          <div class="divider"></div>
          <div class="flex flex-col md:flex-row gap-4">
            <div class="w-full p-4">
              <div class="flex">
                <MessageSquareDot class="mr-2" /> Opmerkingen:
              </div>
              <div class="mt-2 border-1 border-base-300 rounded p-4">
                {{ participant?.comment }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="flex h-screen items-center justify-center">
      <div class="loading loading-spinner loading-lg"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  getCampyear,
  getParticipant,
  updateParticipant,
  type GetCampyearResponse,
  type GetParticipantResponse,
  type request_UpdateParticipantRequest,
  type response_PaymentResponse,
} from "@/client";
import { computed, onMounted, ref, type ComputedRef } from "vue";
import { useToastStore } from "@/stores/toastr";
import {
  User,
  UserCheck,
  CircleSmall,
  Cake,
  Phone,
  ShieldPlus,
  Shirt,
  MapPinHouse,
  CalendarPlus2,
  Landmark,
  Wallet,
  ReceiptText,
  ShieldX,
  MessageSquareDot,
} from "lucide-vue-next";

const toastStore = useToastStore();
const props = defineProps<{ id: string }>();
const loading = ref(true);

const participant = ref<GetParticipantResponse>();
const campyear = ref<GetCampyearResponse>();
type ShirtSizes = "XS" | "S" | "M" | "L" | "XL";
const shirtSize = ref<ShirtSizes>("M");

const fullname = computed(() => {
  const name = participant.value?.person?.first_name;
  const firstLetter = name?.charAt(0).toUpperCase();
  const restOfName = name?.slice(1);
  return `${firstLetter}${restOfName} ${participant.value?.person?.last_name}`;
});

const gender = computed(() => {
  switch (participant.value?.person.gender) {
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

const dobCalcs = computed(() => {
  const date = new Date(participant.value?.person.date_of_birth!);
  const today = new Date();
  let age = today.getFullYear() - date.getFullYear();
  const monthDiff = today.getMonth() - date.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < date.getDate())) {
    age -= 1;
  }
  const dob = date.toLocaleDateString("nl-NL", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
  let onHu;
  if (campyear.value) {
    const start = new Date(campyear.value?.start!);
    // calculcate the age as of the start date of the camp year
    onHu = start.getFullYear() - date.getFullYear();
    const monthDiff = start.getMonth() - date.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && start.getDate() < date.getDate())
    ) {
      onHu -= 1;
    }
  } else {
    onHu = "Onbekend";
  }
  return { age, dob, onHu };
});

const attendance = computed(() => {
  switch (participant.value?.attendance) {
    case "open":
      return "Open";
    case "afgemeld":
      return "Afgemeld";
    default:
      return "Onbekend";
  }
});

const latestPayment: ComputedRef<response_PaymentResponse> = computed(() => {
  const payments = participant.value?.payments!;
  const latest = payments.reduce((prev, current) => {
    return new Date(prev.created_at!) > new Date(current.created_at!)
      ? prev
      : current;
  });
  return latest;
});

async function updateAttendance() {
  const body: request_UpdateParticipantRequest = {
    attendance: participant.value?.attendance === "open" ? "afgemeld" : "open",
  };
  saveParticipant(body);
}

async function updateShirtsize() {
  const body: request_UpdateParticipantRequest = {
    shirt_size: shirtSize.value,
  };
  saveParticipant(body);
}

async function saveParticipant(body: request_UpdateParticipantRequest) {
  const { data, error } = await updateParticipant({
    path: { id: Number(props.id) },
    body,
  });
  if (error) {
    toastStore.addToast({
      type: "error",
      message: "Fout bij het updaten van de deelnemer",
    });
    console.error("Error updating participant:", error.message);
    return;
  }
  participant.value = data;
}

async function fetchParticipant() {
  const { data, error } = await getParticipant({
    path: { id: Number(props.id) },
  });
  if (error) {
    toastStore.addToast({
      type: "error",
      message: "Fout bij het ophalen van de deelnemer",
    });
    console.error("Error fetching participant:", error.message);
    return;
  }
  participant.value = data;
  shirtSize.value = data.shirt_size;
  loading.value = false;
}

async function fetchCampyear() {
  const { data: campyearData, error: campyearError } = await getCampyear({
    path: { year: Number(participant.value?.campyear_year) },
  });
  if (campyearError) {
    console.error("Error fetching camp year:", campyearError.message);
    return;
  }
  campyear.value = campyearData;
}

onMounted(async () => {
  await fetchParticipant();
  await fetchCampyear();
});
</script>

<style scoped></style>
