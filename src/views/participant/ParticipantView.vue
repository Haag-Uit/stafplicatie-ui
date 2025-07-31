<template>
  <div v-if="!loading && participant" class="p-4">
    <PersonCard :personId="participant.personId" :campyear="campyear" />
    <div class="card bg-base-100 w-full shadow-sm">
      <div class="card-body">
        <div>
          <div class="flex flex-col lg:flex-row gap-4">
            <div class="w-full lg:w-1/2 p-4 grid grid-cols-2">
              <div class="flex items-center pb-2">
                <UserCheck class="mr-2" /> Aanwezigheid:
              </div>
              <div class="flex items-center pb-2">
                <input
                  type="checkbox"
                  :checked="participant.attendance == 'open'"
                  class="toggle"
                  :class="{
                    'toggle-success': participant.attendance == 'open',
                    'border-error text-error':
                      participant.attendance == 'afgemeld',
                  }"
                  @change="updateAttendance()"
                />
                &nbsp; {{ attendance }}
              </div>
              <div class="flex items-center pb-2">
                <CalendarPlus2 class="mr-2" /> Geregistreerd op:
              </div>
              <div class="flex items-center pb-2">
                {{ formatLongDateNl(participant.createdAt) }}
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
                {{ latestPayment.paymentId }}
              </div>
              <div class="flex items-center pb-2">
                <ReceiptText class="mr-2" /> Status:
              </div>
              <div class="flex items-center pb-2">
                {{ latestPayment.paymentStatus }}
              </div>
              <div class="flex items-center pb-2">
                <Wallet class="mr-2" /> Betaalmethode:
              </div>
              <div class="flex items-center pb-2">
                {{ latestPayment.paymentMethod }}
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
  </div>
  <div v-else class="flex h-screen items-center justify-center">
    <div class="loading loading-spinner loading-lg"></div>
  </div>
</template>

<script setup lang="ts">
import {
  getCampyear,
  getParticipant,
  updateParticipant,
  type GetCampyearResponse,
  type GetParticipantResponse,
  type RequestUpdateParticipantRequest,
  type ResponsePaymentResponse,
} from "@/client";
import { computed, onMounted, ref, type ComputedRef } from "vue";
import { useToastStore } from "@/stores/toastr";
import {
  UserCheck,
  Shirt,
  CalendarPlus2,
  Landmark,
  Wallet,
  ReceiptText,
  ShieldX,
  MessageSquareDot,
} from "lucide-vue-next";
import { formatLongDateNl } from "@/utils/formatDateNl";
import PersonCard from "@/components/person/PersonCard.vue";

const toastStore = useToastStore();
const props = defineProps<{ id: string }>();
const loading = ref(true);

const participant = ref<GetParticipantResponse>();
const campyear = ref<GetCampyearResponse>();
type ShirtSizes = "XS" | "S" | "M" | "L" | "XL";
const shirtSize = ref<ShirtSizes>("M");

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

const latestPayment: ComputedRef<ResponsePaymentResponse> = computed(() => {
  const payments = participant.value?.payments!;
  const latest = payments.reduce((prev, current) => {
    return new Date(prev.createdAt!) > new Date(current.createdAt!)
      ? prev
      : current;
  });
  return latest;
});

async function updateAttendance() {
  const body: RequestUpdateParticipantRequest = {
    attendance: participant.value?.attendance === "open" ? "afgemeld" : "open",
  };
  saveParticipant(body);
}

async function updateShirtsize() {
  const body: RequestUpdateParticipantRequest = {
    shirtSize: shirtSize.value,
  };
  saveParticipant(body);
}

async function saveParticipant(body: RequestUpdateParticipantRequest) {
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
  shirtSize.value = data.shirtSize;
  loading.value = false;
}

async function fetchCampyear() {
  const { data: campyearData, error: campyearError } = await getCampyear({
    path: { year: Number(participant.value?.campyearYear) },
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
