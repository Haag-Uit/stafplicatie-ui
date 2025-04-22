<script lang="ts" setup>
import {
  activateCampyear,
  closeCampyear,
  deleteCampyear,
  openCampyear,
} from "@/client";
import { computed } from "vue";
import { Trash2, Pencil } from "lucide-vue-next";
import { useToastStore } from "@/stores/toastr";

const toastStore = useToastStore();

const props = defineProps(["campyear"]);
const emit = defineEmits(["campyearChanged"]);

const start = computed(() => {
  const date = new Date(props.campyear.start);
  return date.toLocaleDateString("nl", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
});

const end = computed(() => {
  const date = new Date(props.campyear.end);
  return date.toLocaleDateString("nl", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
});

const activate = async () => {
  await activateCampyear({ path: { year: props.campyear.year } });
  emit("campyearChanged", props.campyear.year);
};

const openClose = async () => {
  try {
    if (props.campyear.open) {
      await closeCampyear({ path: { year: props.campyear.year } });
    } else {
      await openCampyear({ path: { year: props.campyear.year } });
    }
    emit("campyearChanged", props.campyear.year);
  } catch (error) {
    console.error("Error opening/closing camp year:", error);
  }
};

const deleteRow = async () => {
  const { error } = await deleteCampyear({
    path: { year: props.campyear.year },
  });
  emit("campyearChanged", props.campyear.year);
  if (error) {
    toastStore.addToast({
      message: "Fout bij het verwijderen van kampjaar.",
      type: "error",
    });
    return;
  }
  toastStore.addToast({
    message: `Kampjaar ${props.campyear.year} verwijderd`,
    type: "success",
  });
};
</script>

<template>
  <tr class="hover:bg-base-300">
    <th>{{ campyear.year }}</th>
    <td>{{ start }}</td>
    <td>{{ end }}</td>
    <td>
      <input
        type="checkbox"
        class="toggle border-red-400 bg-red-400 checked:bg-green-400 checked:text-green-600 checked:border-green-400"
        :disabled="campyear.active"
        :checked="campyear.active"
        @change="activate"
      />
    </td>
    <td>
      <input
        type="checkbox"
        class="toggle border-red-400 bg-red-400 checked:bg-green-400 checked:text-green-600 checked:border-green-400"
        :disabled="!campyear.active"
        :checked="campyear.open"
        @change="openClose"
      />
    </td>
    <td class="flex gap-2">
      <RouterLink :to="`/kampjaar/${campyear.year}/wijzigen`"
        ><Pencil
      /></RouterLink>
      <Trash2 v-show="!campyear.active" @click="deleteRow" />
    </td>
  </tr>
</template>
