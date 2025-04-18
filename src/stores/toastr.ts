import { defineStore } from "pinia";
import { ref } from "vue";

export interface ToastMessage {
  type: string;
  message: string;
  duration?: number;
}
interface Toast {
  id: number;
  type: string;
  message: string;
  duration?: number;
}

export const useToastStore = defineStore("toast", () => {
  const MAX_VISIBLE = 5;
  const visibleToasts = ref<Toast[]>([]);
  const toastQueue = ref<Toast[]>([]);

  const addToast = (toast: ToastMessage) => {
    const id = Date.now() + Math.random();
    const newToast: Toast = { ...toast, id };
    if (visibleToasts.value.length < MAX_VISIBLE) {
      visibleToasts.value.push(newToast);
      autoRemove(id, newToast.duration);
    } else {
      toastQueue.value.push(newToast);
    }
  };

  const removeToast = (id: number) => {
    visibleToasts.value = visibleToasts.value.filter((t) => t.id !== id);
    if (toastQueue.value.length > 0) {
      const nextToast = toastQueue.value.shift();
      if (!nextToast) return;
      visibleToasts.value.push(nextToast);
      autoRemove(nextToast.id, nextToast.duration);
    }
  };

  const autoRemove = (id: number, duration: number = 3000) => {
    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  return {
    visibleToasts,
    addToast,
    removeToast,
  };
});
