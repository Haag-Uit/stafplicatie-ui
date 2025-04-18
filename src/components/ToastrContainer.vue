<template>
  <div class="toast-container">
    <transition-group name="toast-fade" tag="div">
      <div v-for="toast in toastStore.visibleToasts" :key="toast.id">
        <div class="toast toast-top toast-end relative">
          <div
            class="alert w-64"
            :class="`alert-${toast.type}`"
            @click="toastStore.removeToast(toast.id)"
          >
            <div class="toast-message text-balance">
              {{ toast.message }}
            </div>
          </div>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { useToastStore } from "../stores/toastr";

const toastStore = useToastStore();
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: all 0.3s ease;
}
.toast-fade-enter-from,
.toast-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
.dismiss-btn {
  background: transparent;
  border: none;
  color: white;
  font-size: 16px;
  margin-left: 12px;
  cursor: pointer;
}
</style>
