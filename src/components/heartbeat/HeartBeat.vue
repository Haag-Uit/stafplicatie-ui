<script setup lang="ts">
import { useEventStreamStore } from "@/stores/eventstream";
import { onMounted, ref } from "vue";

const online = ref(true);

const eventStreamStore = useEventStreamStore();

const determineStatus = () => {
  const now = new Date();
  const diff = now.getTime() - eventStreamStore.lastHeartbeat;
  online.value = diff < 1200000; // 120 seconds threshold
  if (!online.value) {
    eventStreamStore.reconnect();
  }
};

onMounted(() => {
  setInterval(determineStatus, 1000); // Check every second
});
</script>
<template>
  <div class="toast toast-center" v-if="!online">
    <div class="alert alert-error">
      <span>Geen verbinding met de server!</span>
    </div>
  </div>
</template>
