<script lang="ts" setup>
import { deleteVolunteer } from "@/client";
import type { PersonPersonResponse } from "@/relations-api";
import { useToastStore } from "@/stores/toastr";
import type { VolunteersVolunteerResponse } from "@/volunteers-api";
import { Pencil, Trash2 } from "lucide-vue-next";
import { type PropType } from "vue";

const props = defineProps({
  volunteer: {
    type: Object as PropType<
      VolunteersVolunteerResponse & { person: PersonPersonResponse }
    >,
    required: true,
  },
});

const toastStore = useToastStore();
const emit = defineEmits(["volunteerDeleted"]);
async function removeVolunteer() {
  // Implement the logic to delete the user
  const { error } = await deleteVolunteer({
    path: { id: props.volunteer.id! },
  });
  if (error) {
    console.error("Error deleting volunteer:", error);
    toastStore.addToast({
      message: "Fout bij het verwijderen van de mederwerker.",
      type: "error",
    });
    return;
  }
  toastStore.addToast({
    message: `Medewerker ${props.volunteer.person.firstName} verwijderd`,
    type: "success",
  });
  emit("volunteerDeleted", props.volunteer.id);
}
</script>

<template>
  <tr class="hover:bg-base-300 group">
    <th>
      {{ props.volunteer.person.firstName }}
      {{ props.volunteer.person.lastName }}
    </th>
    <td>{{ props.volunteer.person.email }}</td>
    <td>{{ props.volunteer.person.phone }}</td>
    <td class="w-28">
      <span class="group-hover:flex hidden items-center justify-center gap-2">
        <RouterLink :to="`/medewerker/${volunteer.id}`"
          ><Pencil :size="18"
        /></RouterLink>
        <Trash2 :size="18" class="cursor-pointer" @click="removeVolunteer" />
      </span>
    </td>
  </tr>
</template>
