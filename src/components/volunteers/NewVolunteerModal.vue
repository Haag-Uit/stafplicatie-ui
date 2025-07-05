<template>
  <!-- Open the modal using ID.showModal() method -->
  <dialog ref="reg-modal" :id="props.modalId" class="modal">
    <div class="modal-box">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
      </form>
      <h3 class="text-lg font-bold">Inschrijven</h3>
      <p class="py-4">Voer het email adres in van de persoon:</p>
      <form @submit.prevent="register">
        <label class="input w-full">
          <Mail />
          <input
            type="text"
            class="grow"
            placeholder="test@haaguit.com"
            v-model="regEmail"
            ref="regEmailInput"
          />
        </label>
        <button class="btn btn-primary mt-4 w-full" type="submit">
          Inschrijven
        </button>
      </form>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>

<script setup lang="ts">
import { useToastStore } from "@/stores/toastr";
import { ref, useTemplateRef } from "vue";
import { useRouter } from "vue-router";
import { Mail } from "lucide-vue-next";

const props = defineProps({
  modalId: {
    type: String,
    required: true,
  },
});
defineExpose({
  openModal,
});

const router = useRouter();
const toastStore = useToastStore();
const regModal = useTemplateRef("reg-modal");
const regEmail = ref("");
const regEmailInput = ref<HTMLInputElement | null>(null);

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
function focusRegEmailInput() {
  // Wait for next tick to ensure input is rendered
  setTimeout(() => {
    regEmailInput.value?.focus();
  });
}

function openModal() {
  regModal.value?.showModal();
  focusRegEmailInput();
}
</script>

<style scoped></style>
