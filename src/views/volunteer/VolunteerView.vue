<template>
  <div class="" v-if="!loading">
    <div v-if="fetchedVolunteer">
      <PersonCard :person="fetchedVolunteer.person" />
      <VolunteerForm
        :personId="fetchedVolunteer.person.id"
        :volunteer="fetchedVolunteer"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { getVolunteer, type ResponseVolunteerResponse } from "@/client";
import PersonCard from "@/components/person/PersonCard.vue";
import VolunteerForm from "@/components/volunteers/VolunteerForm.vue";
import { useToastStore } from "@/stores/toastr";
import { onMounted, ref } from "vue";

const toastStore = useToastStore();
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});
const loading = ref(true);
const fetchedVolunteer = ref<ResponseVolunteerResponse>();

onMounted(async () => {
  try {
    const { data, error } = await getVolunteer({
      path: { id: Number(props.id) },
    });
    if (error) {
      console.error("Error fetching volunteer:", error);
      toastStore.addToast({
        message: "Failed to fetch volunteer data.",
        type: "error",
      });
      return;
    }
    fetchedVolunteer.value = data;
  } catch (err) {
    console.error("Unexpected error:", err);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped></style>
