<!-- FlashMessage.vue -->
<template>
  <div v-if="visible" :class="['flash-message', `bg-${bgColor}`]">
    {{ message }}
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
  message: String,
  bgColor: {
    type: String,
    default: "success",
  },
});

onMounted(() => {
  visible.value = true;
  setTimeout(() => {
    visible.value = false;
  }, 3000);
});

const visible = ref(false);
</script>

<style scoped></style>
