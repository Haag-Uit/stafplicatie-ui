<script setup lang="ts">
import BreadcrumbDefault from "@/components/Breadcrumbs/BreadcrumbDefault.vue";
import DefaultCard from "@/components/Forms/DefaultCard.vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import { ref, computed, defineProps, onMounted } from "vue";
import apiClient from "@/http";
import router from "@/router";
import type { CampRegistration } from "./campRegistration.types";
import type { Payment } from "./campRegistration.types";
import moment from "moment";

const props = defineProps({
  id: Number,
});

const registration = ref<CampRegistration>({
  id: 0,
  year: 0,
  study: "",
  shirtSize: "",
  comments: "",
  attendance: "",
  insurance: false,
  personId: 0,
  person: {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    mobile: "",
    street: "",
    houseNumber: "",
    zipCode: "",
    city: "",
    dateOfBirth: "",
    emergencyContact: "",
    createdAt: "",
    updatedAt: "",
    deletedAt: "",
  },
  payments: [],
  createdAt: "",
  updatedAt: "",
  deletedAt: "",
});
const pageTitle = computed(() => `Inschrijving`);
const error = ref("");

onMounted(() => {
  apiClient
    .get(`/stafplicatie/v1/registration/${props.id}`)
    .then((response) => {
      registration.value = response.data;
    });
});

const geboortedatum = computed(() => {
  const date = new Date(registration.value.person.dateOfBirth);
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
});
const registrationDate = computed(() => {
  const date = moment(registration.value.createdAt).format("DD-MM-YYYY HH:mm");
  return date;
});

const orderedPayments = computed<Payment[]>(() => {
  if (registration.value.payments.length === 0) {
    return [];
  }
  return registration.value.payments.sort((a, b) => b.id - a.id);
});

function updateShirtSize() {
  apiClient
    .put(`/stafplicatie/v1/registration/${props.id}`, {
      shirtSize: registration.value.shirtSize,
    })
    .then(() => {})
    .catch((err) => {
      error.value = err.response.data.error;
    });
}

function changePaymentStatus(payment: Payment) {
  if (payment.state === "open") {
    apiClient.post(`/payment/v1/${payment.id}/paid`).then(() => {
      payment.state = "paid";
    });
  } else {
    apiClient.post(`/payment/v1/${payment.id}/open`).then(() => {
      payment.state = "open";
    });
  }
}

function changeAttendance() {
  if (registration.value.attendance === "open") {
    apiClient
      .post(`/stafplicatie/v1/registration/${props.id}/optout`)
      .then(() => {
        registration.value.attendance = "cancelled";
      });
  } else {
    apiClient
      .post(`/stafplicatie/v1/registration/${props.id}/optin`)
      .then(() => {
        registration.value.attendance = "open";
      });
  }
}
</script>

<template>
  <DefaultLayout>
    <!-- Breadcrumb Start -->
    <BreadcrumbDefault
      :pageTitle="pageTitle"
      :parents="[{ name: 'Inschrijvingen', link: '/registration' }]"
    />
    <!-- Breadcrumb End -->

    <div class="">
      <div class="flex flex-col gap-9">
        <DefaultCard
          :cardTitle="
            registration.person.firstName + ' ' + registration.person.lastName
          "
        >
          <div class="p-6.5">
            <div class="grid grid-cols-1 gap-7.5 xl:grid-cols-2">
              <div
                class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
              >
                <div
                  class="border-b border-stroke p-5 px-7.5 dark:border-strokedark"
                >
                  <h4 class="text-xl font-semibold text-black dark:text-white">
                    Persoonsgegevens
                  </h4>
                </div>
                <div class="px-7.5 pt-6 pb-9">
                  <div class="grid grid-cols-2 gap-2.5">
                    <span class="font-medium">Naam</span>
                    <span
                      >{{ registration.person.firstName }}
                      {{ registration.person.lastName }}</span
                    >
                    <span class="font-medium">Geboortedatum</span>
                    <span>{{ geboortedatum }}</span>
                    <span class="font-medium">Geslacht</span>
                    <span>{{ registration.person.gender }}</span>
                  </div>
                </div>
              </div>
              <div
                class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
              >
                <div
                  class="border-b border-stroke p-5 px-7.5 dark:border-strokedark"
                >
                  <h4 class="text-xl font-semibold text-black dark:text-white">
                    Contact informatie
                  </h4>
                </div>
                <div class="px-7.5 pt-6 pb-9">
                  <div class="grid grid-cols-2 gap-2.5">
                    <span class="font-medium text-red">Noodnummer</span>
                    <span>{{ registration.person.emergencyContact }}</span>
                    <span class="font-medium">Email</span>
                    <span>{{ registration.person.email }}</span>
                    <span class="font-medium">Telefoon</span>
                    <span>{{ registration.person.mobile }}</span>
                    <span class="font-medium">Straat</span>
                    <span
                      >{{ registration.person.street }}
                      {{ registration.person.houseNumber }}</span
                    >
                    <span class="font-medium">Plaats</span>
                    <span
                      >{{ registration.person.zipCode }}
                      {{ registration.person.city }}</span
                    >
                  </div>
                </div>
              </div>
              <div
                class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
              >
                <div
                  class="border-b border-stroke p-5 px-7.5 dark:border-strokedark"
                >
                  <h4 class="text-xl font-semibold text-black dark:text-white">
                    Overig
                  </h4>
                </div>
                <div class="px-7.5 pt-6 pb-9">
                  <div class="flex flex-col gap-2.5">
                    <div class="grid grid-cols-2 gap-2.5">
                      <span class="font-medium">Presentie</span>
                      <div class="grid grid-cols-2 gap-2.5">
                        <div>
                          <div
                            v-if="registration.attendance == 'cancelled'"
                            class="inline-flex rounded-full py-1 px-3 text-sm font-medium hover:bg-opacity-90 text-white"
                            style="background-color: rgb(220, 53, 69)"
                          >
                            Afgemeld
                          </div>
                          <div
                            v-if="registration.attendance == 'open'"
                            class="inline-flex rounded-full py-1 px-3 text-sm font-medium hover:bg-opacity-90 text-[#212B36]"
                            style="background-color: rgb(60, 167, 69)"
                          >
                            Open
                          </div>
                        </div>
                        <a
                          v-if="registration.attendance == 'open'"
                          @click="changeAttendance()"
                          class="text-blue-500 cursor-pointer hover:underline"
                        >
                          Afmelden</a
                        >
                        <a
                          v-if="registration.attendance == 'cancelled'"
                          class="text-blue-500 cursor-pointer hover:underline"
                          @click="changeAttendance()"
                          >Open</a
                        >
                      </div>
                    </div>
                    <div class="grid grid-cols-2 gap-2.5">
                      <span class="font-medium">Kledingmaat</span>
                      <div
                        class="relative z-20 bg-transparent dark:bg-form-input"
                      >
                        <select
                          v-model="registration.shirtSize"
                          @change="updateShirtSize()"
                          class="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-1 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-black dark:text-white"
                        >
                          <option value="S">S</option>
                          <option value="M">M</option>
                          <option value="L">L</option>
                          <option value="XL">XL</option>
                        </select>

                        <span
                          class="absolute top-1/2 right-4 z-30 -translate-y-1/2"
                        >
                          <svg
                            fill="none"
                            class="fill-current"
                            width="24"
                            height="24"
                            version="1.1"
                            id="lni_lni-t-shirt"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 64 64"
                            xml:space="preserve"
                          >
                            <g>
                              <g>
                                <path
                                  d="M45.1,58.6H18.7c-4,0-7.3-3.1-7.6-7.2L9.6,23.3H5.7c-1.7,0-3.1-1.3-3.2-2.9L1.8,8.6c0-1.8,1.4-3.1,3.2-3.1h18.4
			c1.4,0,2.6,0.9,3.1,2.3l0.1,0.4c0.3,2.4,2.7,4.4,5.5,4.4c2.8,0,5.2-1.9,5.5-4.3c0.1-1.5,1.5-2.8,3.2-2.8h18.4
			c1.8,0,3.2,1.4,3.2,3.1l0,0.2l-0.8,11.7c-0.1,1.6-1.5,2.9-3.2,2.9h-4.1l-1.5,28.1C52.5,55.4,49.2,58.6,45.1,58.6z M14.1,21.7
			l1.6,29.4c0.1,1.6,1.4,2.9,3.1,2.9h26.5c1.6,0,3-1.3,3.1-2.9l1.6-29.4c0-1.8,1.7-2.9,3.2-2.9h4.1l0.6-8.9H41.8
			C40.7,14,36.7,17,32,17c-4.7,0-8.7-3-9.8-7.1H6.3l0.6,8.9h4C12.6,18.8,14,20.1,14.1,21.7z"
                                />
                              </g>
                            </g>
                          </svg>
                        </span>
                      </div>
                    </div>
                    <div class="grid grid-cols-2 gap-2.5">
                      <span class="font-medium">Inschrijfdatum</span>
                      <span>{{ registrationDate }} </span>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
              >
                <div
                  class="border-b border-stroke p-5 px-7.5 dark:border-strokedark"
                >
                  <h4 class="text-xl font-semibold text-black dark:text-white">
                    Laatste betaalgegevens
                  </h4>
                </div>
                <div class="px-7.5 pt-6 pb-9">
                  <div class="flex flex-col gap-2.5">
                    <div class="grid grid-cols-2 gap-2.5">
                      <span class="font-medium">Transactie ID</span>
                      <span>{{ orderedPayments[0]?.transactionId }}</span>
                    </div>
                    <div class="grid grid-cols-2 gap-2.5">
                      <span class="font-medium">Status</span>
                      <div class="grid grid-cols-2 gap-2.5">
                        <div>
                          <span
                            v-if="orderedPayments[0]?.state == 'open'"
                            class="inline-flex rounded-full py-1 px-3 text-sm font-medium hover:bg-opacity-90 text-[#212B36]"
                            style="background-color: rgb(249, 193, 7)"
                            >Open</span
                          >
                          <span
                            v-if="orderedPayments[0]?.state == 'paid'"
                            class="inline-flex rounded-full py-1 px-3 text-sm font-medium hover:bg-opacity-90 text-[#212B36]"
                            style="background-color: rgb(60, 167, 69)"
                            >Paid</span
                          >
                        </div>
                        <a
                          v-if="
                            orderedPayments[0]?.typeOfPayment == 'incasso' &&
                            orderedPayments[0]?.state == 'open'
                          "
                          @click="changePaymentStatus(orderedPayments[0])"
                          class="text-blue-500 cursor-pointer hover:underline"
                        >
                          Betaald</a
                        >
                        <a
                          v-if="
                            orderedPayments[0]?.typeOfPayment == 'incasso' &&
                            orderedPayments[0]?.state == 'paid'
                          "
                          class="text-blue-500 cursor-pointer hover:underline"
                          @click="changePaymentStatus(orderedPayments[0])"
                          >Open</a
                        >
                      </div>
                    </div>
                    <div class="grid grid-cols-2 gap-2.5">
                      <span class="font-medium">Type</span>
                      <span>{{ orderedPayments[0]?.typeOfPayment }}</span>
                    </div>
                    <div class="grid grid-cols-2 gap-2.5">
                      <span class="font-medium">Annuleringsverzekering</span>
                      <div>
                        <div
                          v-if="registration.insurance"
                          class="inline-flex rounded-full py-1 px-3 text-sm font-medium hover:bg-opacity-90 text-[#212B36]"
                          style="background-color: rgb(60, 167, 69)"
                        >
                          Ja
                        </div>
                        <div
                          v-if="!registration.insurance"
                          class="inline-flex rounded-full py-1 px-3 text-sm font-medium hover:bg-opacity-90 text-white"
                          style="background-color: rgb(220, 53, 69)"
                        >
                          Nee
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="pt-7.5">
              <div
                class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
              >
                <div
                  class="border-b border-stroke p-5 px-7.5 dark:border-strokedark"
                >
                  <h4 class="text-xl font-semibold text-black dark:text-white">
                    Commentaar
                  </h4>
                </div>
                <div class="px-7.5 pt-6 pb-9">
                  {{ registration.comments }}
                </div>
              </div>
            </div>
          </div>
        </DefaultCard>
      </div>
    </div>
  </DefaultLayout>
</template>
