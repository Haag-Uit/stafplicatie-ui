<script setup lang="ts">
import BreadcrumbDefault from "@/components/Breadcrumbs/BreadcrumbDefault.vue";
import DefaultCard from "@/components/Forms/DefaultCard.vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import { ref, computed, defineProps, onMounted } from "vue";
import apiClient from "@/http";
import moment from "moment";
import type { EditVolunteer } from "./volunteer.types";

const props = defineProps({
  id: Number,
});

const volunteer = ref<EditVolunteer>({
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
  driversLicense: "",
  firstAid: "",
  experience: "",
  motivation: "",
  properties: "",
});
const pageTitle = computed(() => `Medewerker bewerken`);
const error = ref("");

onMounted(() => {
  apiClient.get(`/stafplicatie/v1/volunteer/${props.id}`).then((response) => {
    volunteer.value = response.data;
  });
});

const geboortedatum = computed(() => {
  const date = new Date(volunteer.value.person.dateOfBirth);
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
});

function update() {}
</script>

<template>
  <DefaultLayout>
    <!-- Breadcrumb Start -->
    <BreadcrumbDefault
      :pageTitle="pageTitle"
      :parents="[{ name: 'Medewerkers', link: '/volunteer' }]"
    />
    <!-- Breadcrumb End -->

    <div class="flex flex-col gap-9">
      <div class="flex gap-9">
        <DefaultCard cardTitle="Persoons gegevens" class="w-1/2">
          <div class="p-6.5">
            <div class="mb-4.5 flex flex-col gap-6">
              <div class="flex gap-6">
                <div class="w-full">
                  <label class="mb-2.5 block text-black dark:text-white">
                    Voornaam
                    <span class="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    class="w-full rounded border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    required
                    placeholder="Ploekie"
                    v-model="volunteer.person.firstName"
                  />
                </div>
                <div class="w-full">
                  <label class="mb-2.5 block text-black dark:text-white">
                    Achternaam
                    <span class="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    class="w-full rounded border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    required
                    placeholder="Barrelkrans"
                    v-model="volunteer.person.lastName"
                  />
                </div>
              </div>
              <div class="flex gap-6">
                <div class="w-3/4">
                  <label class="mb-2.5 block text-black dark:text-white">
                    Straat
                    <span class="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    class="w-full rounded border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    required
                    placeholder="Laanstraat"
                    v-model="volunteer.person.street"
                  />
                </div>
                <div class="w-1/4">
                  <label class="mb-2.5 block text-black dark:text-white">
                    Huisnummer
                    <span class="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    class="w-full rounded border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    required
                    placeholder="1B"
                    v-model="volunteer.person.houseNumber"
                  />
                </div>
              </div>
              <div class="flex gap-6">
                <div class="w-1/4">
                  <label class="mb-2.5 block text-black dark:text-white">
                    Postcode
                    <span class="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    class="w-full rounded border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    required
                    placeholder="1234AB"
                    v-model="volunteer.person.zipCode"
                  />
                </div>
                <div class="w-3/4">
                  <label class="mb-2.5 block text-black dark:text-white">
                    Woonplaats
                    <span class="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    class="w-full rounded border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    required
                    placeholder="Den Haag"
                    v-model="volunteer.person.city"
                  />
                </div>
              </div>
              <div class="flex gap-6">
                <div class="w-full">
                  <label class="mb-2.5 block text-black dark:text-white">
                    Mobiel
                    <span class="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    class="w-full rounded border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    required
                    placeholder="0612312312"
                    v-model="volunteer.person.mobile"
                  />
                </div>
                <div class="w-full">
                  <label class="mb-2.5 block text-black dark:text-white">
                    Telefoon Nood
                    <span class="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    class="w-full rounded border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    required
                    placeholder="0612312312"
                    v-model="volunteer.person.emergencyContact"
                  />
                </div>
              </div>
            </div>
          </div>
        </DefaultCard>
        <DefaultCard cardTitle="Overige gegevens" class="w-1/2">
          <div class="p-6.5">
            <div class="mb-4.5 flex flex-col gap-6">
              <div class="w-full">
                <label class="mb-2.5 block text-black dark:text-white">
                  Email
                  <span class="text-meta-1">*</span>
                </label>
                <input
                  type="email"
                  class="w-full rounded border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  required
                  placeholder="huisicter@haaguit.com"
                  v-model="volunteer.person.email"
                />
              </div>
              <div class="flex gap-6">
                <div class="w-full">
                  <label class="mb-2.5 block text-black dark:text-white">
                    Geboortedatum
                    <span class="text-meta-1">*</span>
                  </label>
                  <input
                    type="date"
                    class="w-full rounded border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    required
                    v-model="volunteer.person.dateOfBirth"
                  />
                </div>
                <div class="w-full">
                  <label class="mb-2.5 block text-black dark:text-white">
                    Geslacht
                    <span class="text-meta-1">*</span>
                  </label>
                  <select
                    class="w-full rounded border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    required
                    v-model="volunteer.person.gender"
                  >
                    <option value="" disabled selected>Geslacht</option>
                    <option value="m">Man</option>
                    <option value="v">Vrouw</option>
                    <option value="nb">Non Binair</option>
                  </select>
                </div>
              </div>
              <div class="flex gap-6">
                <div class="w-full">
                  <label class="mb-2.5 block text-black dark:text-white">
                    Rijbewijs
                    <span class="text-meta-1">*</span>
                  </label>
                  <select
                    class="w-full rounded border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    required
                    v-model="volunteer.driversLicense"
                  >
                    <option value="" selected>Geen</option>
                    <option value="b">B</option>
                    <option value="be">BE</option>
                  </select>
                </div>
                <div class="w-full">
                  <label class="mb-2.5 block text-black dark:text-white">
                    EHBO
                    <span class="text-meta-1">*</span>
                  </label>
                  <select
                    class="w-full rounded border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    required
                    v-model="volunteer.firstAid"
                  >
                    <option value="">Geen</option>
                    <option value="ehbo">EHBO</option>
                    <option value="bhv">BHV</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </DefaultCard>
      </div>
      <div>
        <DefaultCard cardTitle="Overig">
          <div class="p-6.5">
            <div class="mb-4.5 flex flex-col gap-6">
              <div class="w-full">
                <label class="mb-2.5 block text-black dark:text-white">
                  Ervaring
                  <span class="text-meta-1">*</span>
                </label>
                <textarea
                  class="w-full rounded border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  required
                  placeholder="Ik heb ervaring met het drinken van drankjes"
                  v-model="volunteer.experience"
                ></textarea>
              </div>
              <div class="w-full">
                <label class="mb-2.5 block text-black dark:text-white">
                  Motivatie
                  <span class="text-meta-1">*</span>
                </label>
                <textarea
                  class="w-full rounded border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  required
                  placeholder="Ik wil graag helpen met het uitdelen (en drinken) van drankjes"
                  v-model="volunteer.motivation"
                ></textarea>
              </div>
              <div class="w-full">
                <label class="mb-2.5 block text-black dark:text-white">
                  Eigenschappen
                  <span class="text-meta-1">*</span>
                </label>
                <textarea
                  class="w-full rounded border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  required
                  placeholder="Ik ben geduldig, zorgzaam en kan ook goed drankjes drinken"
                  v-model="volunteer.properties"
                ></textarea>
              </div>
            </div>
          </div>
        </DefaultCard>
      </div>
      <div>
        <button
          class="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
          @click="update"
        >
          Opslaan
        </button>
        <div class="text-danger">{{ error }}</div>
      </div>
    </div>
  </DefaultLayout>
</template>
