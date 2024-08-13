<script setup lang="ts">
import BreadcrumbDefault from "@/components/Breadcrumbs/BreadcrumbDefault.vue";
import DefaultCard from "@/components/Forms/DefaultCard.vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import { ref, computed, defineProps, onMounted } from "vue";
import apiClient from "@/http";
import moment from "moment";
import router from "@/router";
import flatpickr from "flatpickr";
import { Dutch } from "flatpickr/dist/l10n/nl.js";
import type { Campyear } from "@/views/Campyear/campyear.types";

const props = defineProps({
  year: Number,
});

const pageTitle = computed(() => `Kampjaar ${props.year} aanpassen`);
const campyear = ref<Campyear>({
  ID: 0,
  year: 0,
  start: "",
  end: "",
  participationFee: 0,
  insuranceFee: 0,
  active: false,
  open: false,
  CreatedAt: "",
  UpdatedAt: "",
});
const error = ref("");

onMounted(() => {
  apiClient.get(`/stafplicatie/v1/campyear/${props.year}`).then((response) => {
    campyear.value = {
      ID: response.data.id,
      year: response.data.year,
      start: moment(response.data.start).format("YYYY-MM-DD"),
      end: moment(response.data.end).format("YYYY-MM-DD"),
      participationFee: response.data.participation_fee,
      insuranceFee: response.data.insurance_fee,
      active: response.data.active,
      open: response.data.open,
      CreatedAt: response.data.created_at,
      UpdatedAt: response.data.updated_at,
    };
    initDatepickers();
  });
  // Init flatpickr
});

const initDatepickers = () => {
  flatpickr(".startdatepicker", {
    mode: "single",
    static: true,
    monthSelectorType: "static",
    altInput: true,
    altFormat: "d-m-Y",
    dateFormat: "Y-m-d",
    prevArrow:
      '<svg class="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M5.4 10.8l1.4-1.4-4-4 4-4L5.4 0 0 5.4z" /></svg>',
    nextArrow:
      '<svg class="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M1.4 10.8L0 9.4l4-4-4-4L1.4 0l5.4 5.4z" /></svg>',
    locale: Dutch,
    defaultDate: campyear.value.start,
  });
  flatpickr(".enddatepicker", {
    mode: "single",
    static: true,
    monthSelectorType: "static",
    altInput: true,
    altFormat: "d-m-Y",
    dateFormat: "Y-m-d",
    prevArrow:
      '<svg class="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M5.4 10.8l1.4-1.4-4-4 4-4L5.4 0 0 5.4z" /></svg>',
    nextArrow:
      '<svg class="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M1.4 10.8L0 9.4l4-4-4-4L1.4 0l5.4 5.4z" /></svg>',
    locale: Dutch,
    defaultDate: campyear.value.end,
  });
};

const requestBody = computed(() => {
  return {
    start: moment(campyear.value.start).format(),
    end: moment(campyear.value.end).format(),
    participation_fee: campyear.value.participationFee,
    insurance_fee: campyear.value.insuranceFee,
  };
});

function updateCampyear() {
  apiClient
    .put(`/stafplicatie/v1/campyear/${props.year}`, requestBody.value)
    .then((response) => {
      router.push("/campyear");
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
      :parents="[{ name: 'Kampjaren', link: '/campyear' }]"
    />
    <!-- Breadcrumb End -->

    <div class="">
      <div class="flex flex-col gap-9">
        <DefaultCard cardTitle="Kampjaar gegevens">
          <div class="p-6.5">
            <form @submit.prevent="updateCampyear">
              <div class="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div class="w-full xl:w-1/2">
                  <label
                    class="mb-3 block text-sm font-medium text-black dark:text-white"
                  >
                    Start
                  </label>
                  <div class="relative">
                    <input
                      class="startdatepicker w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      placeholder="dd-mm-yyyy"
                      data-class="flatpickr-right"
                      required
                      v-model="campyear.start"
                    />

                    <div
                      class="pointer-events-none absolute inset-0 right-5 left-auto flex items-center"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.7504 2.9812H14.2879V2.36245C14.2879 2.02495 14.0066 1.71558 13.641 1.71558C13.2754 1.71558 12.9941 1.99683 12.9941 2.36245V2.9812H4.97852V2.36245C4.97852 2.02495 4.69727 1.71558 4.33164 1.71558C3.96602 1.71558 3.68477 1.99683 3.68477 2.36245V2.9812H2.25039C1.29414 2.9812 0.478516 3.7687 0.478516 4.75308V14.5406C0.478516 15.4968 1.26602 16.3125 2.25039 16.3125H15.7504C16.7066 16.3125 17.5223 15.525 17.5223 14.5406V4.72495C17.5223 3.7687 16.7066 2.9812 15.7504 2.9812ZM1.77227 8.21245H4.16289V10.9968H1.77227V8.21245ZM5.42852 8.21245H8.38164V10.9968H5.42852V8.21245ZM8.38164 12.2625V15.0187H5.42852V12.2625H8.38164V12.2625ZM9.64727 12.2625H12.6004V15.0187H9.64727V12.2625ZM9.64727 10.9968V8.21245H12.6004V10.9968H9.64727ZM13.8379 8.21245H16.2285V10.9968H13.8379V8.21245ZM2.25039 4.24683H3.71289V4.83745C3.71289 5.17495 3.99414 5.48433 4.35977 5.48433C4.72539 5.48433 5.00664 5.20308 5.00664 4.83745V4.24683H13.0504V4.83745C13.0504 5.17495 13.3316 5.48433 13.6973 5.48433C14.0629 5.48433 14.3441 5.20308 14.3441 4.83745V4.24683H15.7504C16.0316 4.24683 16.2566 4.47183 16.2566 4.75308V6.94683H1.77227V4.75308C1.77227 4.47183 1.96914 4.24683 2.25039 4.24683ZM1.77227 14.5125V12.2343H4.16289V14.9906H2.25039C1.96914 15.0187 1.77227 14.7937 1.77227 14.5125ZM15.7504 15.0187H13.8379V12.2625H16.2285V14.5406C16.2566 14.7937 16.0316 15.0187 15.7504 15.0187Z"
                          fill="#64748B"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div class="w-full xl:w-1/2">
                  <label
                    class="mb-3 block text-sm font-medium text-black dark:text-white"
                  >
                    Eind
                  </label>
                  <div class="relative">
                    <input
                      class="enddatepicker w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      placeholder="dd-mm-yyyy"
                      data-class="flatpickr-right"
                      required
                      v-model="campyear.end"
                    />

                    <div
                      class="pointer-events-none absolute inset-0 right-5 left-auto flex items-center"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.7504 2.9812H14.2879V2.36245C14.2879 2.02495 14.0066 1.71558 13.641 1.71558C13.2754 1.71558 12.9941 1.99683 12.9941 2.36245V2.9812H4.97852V2.36245C4.97852 2.02495 4.69727 1.71558 4.33164 1.71558C3.96602 1.71558 3.68477 1.99683 3.68477 2.36245V2.9812H2.25039C1.29414 2.9812 0.478516 3.7687 0.478516 4.75308V14.5406C0.478516 15.4968 1.26602 16.3125 2.25039 16.3125H15.7504C16.7066 16.3125 17.5223 15.525 17.5223 14.5406V4.72495C17.5223 3.7687 16.7066 2.9812 15.7504 2.9812ZM1.77227 8.21245H4.16289V10.9968H1.77227V8.21245ZM5.42852 8.21245H8.38164V10.9968H5.42852V8.21245ZM8.38164 12.2625V15.0187H5.42852V12.2625H8.38164V12.2625ZM9.64727 12.2625H12.6004V15.0187H9.64727V12.2625ZM9.64727 10.9968V8.21245H12.6004V10.9968H9.64727ZM13.8379 8.21245H16.2285V10.9968H13.8379V8.21245ZM2.25039 4.24683H3.71289V4.83745C3.71289 5.17495 3.99414 5.48433 4.35977 5.48433C4.72539 5.48433 5.00664 5.20308 5.00664 4.83745V4.24683H13.0504V4.83745C13.0504 5.17495 13.3316 5.48433 13.6973 5.48433C14.0629 5.48433 14.3441 5.20308 14.3441 4.83745V4.24683H15.7504C16.0316 4.24683 16.2566 4.47183 16.2566 4.75308V6.94683H1.77227V4.75308C1.77227 4.47183 1.96914 4.24683 2.25039 4.24683ZM1.77227 14.5125V12.2343H4.16289V14.9906H2.25039C1.96914 15.0187 1.77227 14.7937 1.77227 14.5125ZM15.7504 15.0187H13.8379V12.2625H16.2285V14.5406C16.2566 14.7937 16.0316 15.0187 15.7504 15.0187Z"
                          fill="#64748B"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div class="w-full xl:w-1/2">
                  <label class="mb-2.5 block text-black dark:text-white">
                    Inschrijf bedrag
                    <span class="text-meta-1">*</span>
                  </label>
                  <input
                    type="number"
                    placeholder="100"
                    class="w-full rounded border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    required
                    v-model="campyear.participationFee"
                  />
                </div>
                <div class="w-full xl:w-1/2">
                  <label class="mb-2.5 block text-black dark:text-white">
                    Annuleringsverzekering bedrag
                    <span class="text-meta-1">*</span>
                  </label>
                  <input
                    type="number"
                    placeholder="5"
                    class="w-full rounded border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    required
                    v-model="campyear.insuranceFee"
                  />
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
