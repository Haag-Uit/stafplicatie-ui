<template>
  <div class="flex justify-center">
    <div
      v-if="showSearchInput"
      class="card bg-base-100 w-full md:w-1/2 shadow-sm"
    >
      <div class="card-body">
        <h2 class="card-title">Zoek op email:</h2>
        <SearchPersonInput
          v-model:email="personEmail"
          v-model:selectedId="selectedPersonId"
          @select="handlePersonSelect"
          @create="createPerson"
          v-show="showSearchInput"
        />
      </div>
    </div>
    <div v-if="showCreatePersonForm" class="w-full">
      <PersonForm :email="personEmail" @updated="handlePersonUpdated" />
    </div>
  </div>
</template>

<script setup lang="ts">
import SearchPersonInput from "@/components/person/SearchPersonInput.vue";
import PersonForm from "@/components/person/PersonForm.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import type { PersonPersonResponse } from "@/relations-api";

const personEmail = ref<string>("");
const selectedPersonId = ref<number | undefined>(undefined);
const showSearchInput = ref(true);
const showCreatePersonForm = ref(false);

const router = useRouter();
const handlePersonSelect = async (personId: number) => {
  router.push({ name: "volunteerCreate", params: { personId } });
};

const createPerson = (email: string) => {
  showSearchInput.value = false;
  personEmail.value = email;
  showCreatePersonForm.value = true;
};

const handlePersonUpdated = (payload: { person: PersonPersonResponse }) => {
  router.push({
    name: "volunteerCreate",
    params: { personId: payload.person.id },
  });
};
</script>

<style scoped></style>
