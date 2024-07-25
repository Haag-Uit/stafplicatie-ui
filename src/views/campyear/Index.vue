<script setup lang="ts">
import { ref, computed } from "vue";
import axios from "axios";
import moment from "moment";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const campyears = ref([]);
const sortedCampyears = computed(() => {
  return campyears.value.sort((a, b) => a.year - b.year);
});

axios
  .get("/stafplicatie/v1/campyear", {
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
      Authorization: `Bearer ${authStore.token}`,
    },
  })
  .then((response) => {
    campyears.value = response.data;
  });

function formatTime(time: string) {
  return moment(time).format("DD-MM-YYYY");
}
</script>

<template>
  <main>
    <h1>Alle kampjaren</h1>
    <table class="">
      <thead>
        <tr>
          <th class="" scope="col">Jaar</th>
          <th class="" scope="col">Start</th>
          <th class="" scope="col">Eind</th>
          <th class="" scope="col">Actief</th>
          <th class="" scope="col">Open</th>
          <th class="" scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(campyear, index) in sortedCampyears" :key="campyear.year">
          <th>{{ campyear.year }}</th>
          <td>{{ formatTime(campyear.start) }}</td>
          <td>{{ formatTime(campyear.end) }}</td>
          <td>{{ campyear.active }}</td>
          <td>{{ campyear.open }}</td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </main>
</template>
