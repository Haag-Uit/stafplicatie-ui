<template>
  <div class="" v-if="!loading">
    <div v-if="fetchedPerson">
      <PersonCard :person="fetchedPerson" />
      <VolunteerForm :personId="fetchedPerson.id" />
    </div>
  </div>
</template>

<script setup lang="ts">
import PersonCard from "@/components/person/PersonCard.vue";
import VolunteerForm from "@/components/volunteers/VolunteerForm.vue";
import { onMounted, ref } from "vue";
import { getPerson, type PersonPersonResponse } from "@/relations-api";
import { useRoute } from "vue-router";

const route = useRoute();

const fetchedPerson = ref<PersonPersonResponse>();
const loading = ref(true);
const fetchPerson = async (id: number) => {
  const { data, error } = await getPerson({ path: { id } });
  if (error) {
    console.error("Error fetching person:", error);
    return;
  }
  fetchedPerson.value = data.person;
  loading.value = false;
};

onMounted(async () => {
  // Fetch the personId param from the route
  const personId = Number(route.params.personId);
  await fetchPerson(personId);
});
</script>

<style scoped></style>
