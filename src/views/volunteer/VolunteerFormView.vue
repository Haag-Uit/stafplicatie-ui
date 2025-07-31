<template>
  <div class="" v-if="!loading && personId">
    <PersonCard :personId="personId" />
    <VolunteerForm :personId="personId" />
  </div>
</template>

<script setup lang="ts">
import PersonCard from "@/components/person/PersonCard.vue";
import VolunteerForm from "@/components/volunteers/VolunteerForm.vue";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const loading = ref(true);
const personId = ref<number>();

onMounted(async () => {
  // Fetch the personId param from the route
  personId.value = Number(route.params.personId);
  loading.value = false;
});
</script>

<style scoped></style>
