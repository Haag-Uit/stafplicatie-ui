<script lang="ts" setup>
import { deleteUser, type GetUserResponse } from "@/haag-auth-api";
import { useToastStore } from "@/stores/toastr";
import { Trash2 } from "lucide-vue-next";
import { type PropType } from "vue";

const props = defineProps({
  user: {
    type: Object as PropType<GetUserResponse>,
    required: true,
  },
});

const toastStore = useToastStore();
const emit = defineEmits(["userDeleted"]);
async function removeUser() {
  // Implement the logic to delete the user
  const { error } = await deleteUser({
    path: { id: props.user.id! },
  });
  if (error) {
    console.error("Error deleting user:", error);
    toastStore.addToast({
      message: "Fout bij het verwijderen van gebruiker.",
      type: "error",
    });
    return;
  }
  toastStore.addToast({
    message: `Gebruiker ${props.user.nickname} verwijderd`,
    type: "success",
  });
  emit("userDeleted", props.user.id);
}
</script>

<template>
  <tr class="hover:bg-base-300">
    <th>
      {{ props.user.nickname }}
    </th>
    <td>{{ props.user.email }}</td>
    <td class="flex gap-2">
      <Trash2 @click="removeUser" />
    </td>
  </tr>
</template>
