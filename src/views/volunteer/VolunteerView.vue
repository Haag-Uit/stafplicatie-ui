<template>
  <div class="" v-if="!loading">
    <div v-if="fetchedVolunteer">
      <PersonCard :personId="fetchedVolunteer.personId" />
      <VolunteerForm
        :personId="fetchedVolunteer.personId"
        :volunteer="fetchedVolunteer"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import PersonCard from "@/components/person/PersonCard.vue";
import VolunteerForm from "@/components/volunteers/VolunteerForm.vue";
import { useToastStore } from "@/stores/toastr";
import {
  getVolunteer,
  type VolunteersVolunteerResponse,
} from "@/volunteers-api";
import { onMounted, ref } from "vue";

const toastStore = useToastStore();
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});
const loading = ref(true);
const fetchedVolunteer = ref<VolunteersVolunteerResponse>();

onMounted(async () => {
  const { data, error } = await getVolunteer({
    path: { id: Number(props.id) },
  });
  if (error) {
    console.error("Error fetching volunteer:", error);
    toastStore.addToast({
      message: "Fout bij het ophalen van de medewerker",
      type: "error",
    });
    return;
  }
  fetchedVolunteer.value = data.volunteer;
  loading.value = false;
});
</script>

<style scoped></style>
