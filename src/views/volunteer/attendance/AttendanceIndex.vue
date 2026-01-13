<template>
  <div class="p-4">
    <div v-if="loading" class="loading loading-spinner loading-lg"></div>
    <div v-else>
      <div class="card bg-base-100 w-full shadow-sm">
        <div class="card-body">
          <div class="flex items-center justify-between">
            <h2 class="card-title">Aanwezigheid</h2>
          </div>
            <div class="mb-2">
              <div class="badge badge-soft badge-secondary">Niet bepaald</div>
              <div class="badge badge-soft badge-success">Aanwezig</div>
              <div class="badge badge-soft badge-warning">Afgemeld</div>
              <div class="badge badge-soft badge-error">Afwezig</div>
            </div>
          <div
            class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100"
          >
            <table class="table">
              <thead>
                <tr>
                  <th>Naam</th>
                  <th>MB1</th>
                  <th>MB2</th>
                  <th>Gesprekje</th>
                  <th>MV3</th>
                  <th>MV4</th>
                </tr>
              </thead>
              <tbody>
                <AttendanceTableRow
                  v-for="volunteer in sortedVolunteers"
                  :key="volunteer.id"
                  :volunteer="volunteer"
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
import { ref, onMounted, computed } from "vue";
import { useToastStore } from "@/stores/toastr";
import { getActiveCampyear } from "@/campyear-api";
import AttendanceTableRow from "@/components/volunteers/attendance/AttendanceTableRow.vue";
import {
  listVolunteers,
  type VolunteersVolunteerResponse,
} from "@/volunteers-api";
import { getPersonsByIds, type PersonPersonResponse } from "@/relations-api";

const toastStore = useToastStore();

type VolunteerRow = VolunteersVolunteerResponse & {
  person: PersonPersonResponse;
};

const volunteers = ref<VolunteerRow[]>([]);
const loading = ref(true);

const sortVolunteers = (volunteers: VolunteerRow[]) => {
  return volunteers.slice(0).sort((a, b) => {
    const nameA = a.person.firstName.toLowerCase() || "";
    const nameB = b.person.firstName.toLowerCase() || "";
    return nameA.localeCompare(nameB);
  });
};

const sortedVolunteers = computed(() => {
  return sortVolunteers(volunteers.value);
});

const fetchVolunteers = async () => {
  const campyearResp = await getActiveCampyear();
  if (campyearResp.error) {
    console.error("Error fetching active camp year:", cmperror);
    toastStore.addToast({
      message: "Fout bij het ophalen van het actieve kampjaar.",
      type: "error",
    });
    return;
  }
  console.log("Active camp year:", campyearResp.data);
  const { data, error } = await listVolunteers({
    path: {
      year: campyearResp.data.campyear!.year,
    },
  });

  if (error) {
    console.error("Error fetching volunteers:", error);
    toastStore.addToast({
      message: "Fout bij het ophalen van medewerkers.",
      type: "error",
    });
    return;
  }
  if (data.volunteers.length > 0) {
    const ids = data.volunteers.map((v) => v.personId);
    const persons = await getPersonsByIds({
      body: { ids },
    });
    if (persons.error) {
      console.error("Error fetching persons:", persons.error);
      toastStore.addToast({
        message: "Fout bij het ophalen van medewerkers persoonsgegevens.",
        type: "error",
      });
      return;
    }
    volunteers.value = data.volunteers.map((v) => {
      const person = persons.data.persons?.find((p) => p.id === v.personId);
      return {
        ...v,
        person: person || ({} as PersonPersonResponse), // Fallback if person not found
      };
    });
  }
  loading.value = false;
};

onMounted(async () => {
  await fetchVolunteers();
});
</script>

<style scoped></style>
