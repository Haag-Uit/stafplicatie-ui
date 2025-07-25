<template>
  <div class="p-4">
    <div v-if="loading" class="loading loading-spinner loading-lg"></div>
    <div v-else>
      <div class="card bg-base-100 w-full shadow-sm">
        <div class="card-body">
          <div class="flex items-center justify-between">
            <h2 class="card-title">Medewerkers</h2>
            <div class="flex gap-2">
              <button @click="create" class="btn btn-primary">
                Inschrijven
              </button>
            </div>
          </div>
          <label class="input w-full lg:w-1/2">
            <span class="label"><UserSearch /></span>
            <input
              type="text"
              placeholder="Zoek op naam of email"
              v-model="searchQuery"
            />
          </label>
          <div
            class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100"
          >
            <table class="table">
              <thead>
                <tr>
                  <th>Naam</th>
                  <th>Email</th>
                  <th>Telefoon</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <VolunteersTableRow
                  v-for="volunteer in filteredVolunteers"
                  :key="volunteer.id"
                  :volunteer="volunteer"
                  @volunteer-deleted="removeVolunteer"
                />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getAllVolunteers, type GetAllVolunteersResponse } from "@/client";
import { ref, onMounted, computed } from "vue";
import { useToastStore } from "@/stores/toastr";
import { UserSearch } from "lucide-vue-next";
import { useRouter } from "vue-router";
import VolunteersTableRow from "@/components/volunteers/VolunteersTableRow.vue";

const toastStore = useToastStore();
const router = useRouter();

const volunteers = ref<GetAllVolunteersResponse>([]);
const loading = ref(true);
const searchQuery = ref("");

const sortVolunteers = (volunteers: GetAllVolunteersResponse) => {
  return volunteers.slice(0).sort((a, b) => {
    const nameA = a.person.firstName.toLowerCase() || "";
    const nameB = b.person.firstName.toLowerCase() || "";
    return nameA.localeCompare(nameB);
  });
};

const filteredVolunteers = computed(() => {
  if (!searchQuery.value.trim()) {
    return sortVolunteers(volunteers.value);
  }
  const query = searchQuery.value.toLowerCase();
  const filtered = volunteers.value.filter(
    (v) =>
      v.person.firstName.toLowerCase().includes(query) ||
      v.person.lastName.toLowerCase().includes(query) ||
      v.person.email.toLowerCase().includes(query)
  );
  return sortVolunteers(filtered);
});

const fetchVolunteers = async () => {
  const { data, error } = await getAllVolunteers();
  if (error) {
    console.error("Error fetching volunteers:", error);
    toastStore.addToast({
      message: "Fout bij het ophalen van medewerkers.",
      type: "error",
    });
    return;
  }
  volunteers.value = data;
  loading.value = false;
};

function removeVolunteer(id: number) {
  volunteers.value = volunteers.value.filter((v) => v.id !== id);
}

const create = () => {
  // Navigate to the volunteer creation page
  router.push({ name: "volunteerCreateSearch" });
};

onMounted(async () => {
  await fetchVolunteers();
});
</script>

<style scoped></style>
