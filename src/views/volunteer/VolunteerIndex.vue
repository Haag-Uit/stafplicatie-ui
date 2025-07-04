<template>
  <div class="p-4">
    <div v-if="loading" class="loading loading-spinner loading-lg"></div>
    <div v-else>
      <div class="card bg-base-100 w-full shadow-sm">
        <div class="card-body">
          <div class="flex items-center justify-between">
            <h2 class="card-title">Medewerkers</h2>
            <div class="flex gap-2">
              <button @click="regModal?.showModal()" class="btn btn-primary">
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
    <!-- Open the modal using ID.showModal() method -->
    <dialog ref="reg-modal" id="my_modal_2" class="modal">
      <div class="modal-box">
        <form method="dialog">
          <button
            class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>
        <h3 class="text-lg font-bold">Inschrijven</h3>
        <p class="py-4">Voer het email adres in van de persoon:</p>
        <label class="input w-full">
          <Mail />
          <input
            type="text"
            class="grow"
            placeholder="test@haaguit.com"
            v-model="regEmail"
          />
        </label>
        <button class="btn btn-primary mt-4 w-full" @click="register">
          Inschrijven
        </button>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  </div>
</template>

<script setup lang="ts">
import { getAllVolunteers, type GetAllVolunteersResponse } from "@/client";
import { ref, onMounted, computed, useTemplateRef } from "vue";
import { useToastStore } from "@/stores/toastr";
import { UserSearch } from "lucide-vue-next";
import VolunteersTableRow from "@/components/volunteers/VolunteersTableRow.vue";
import { Mail } from "lucide-vue-next";
import { useRouter } from "vue-router";

const toastStore = useToastStore();
const router = useRouter();

const volunteers = ref<GetAllVolunteersResponse>([]);
const loading = ref(true);
const searchQuery = ref("");
const regModal = useTemplateRef("reg-modal");
const regEmail = ref("");

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
  try {
    const response = await getAllVolunteers();
    volunteers.value = response.data;
    loading.value = false;
  } catch (error) {
    console.error("Error fetching volunteers:", error);
    toastStore.addToast({
      message: "Fout bij het ophalen van medewerkers.",
      type: "error",
    });
  }
};

const register = () => {
  if (!regEmail.value) {
    toastStore.addToast({
      message: "Voer een email adres in.",
      type: "error",
    });
    return;
  }

  router.push({
    name: "VolunteerCreate",
    query: { email: regEmail.value },
  });
};

function removeVolunteer(id: number) {
  volunteers.value = volunteers.value.filter((v) => v.id !== id);
}
onMounted(async () => {
  await fetchVolunteers();
});
</script>

<style scoped></style>
