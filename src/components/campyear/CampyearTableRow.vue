<script lang="ts" setup>
import { computed } from "vue";
import { Trash2, Pencil } from "lucide-vue-next";
import { useToastStore } from "@/stores/toastr";
import { formatDateNl } from "@/utils/formatDateNl"; // <-- import the new util
import { deleteCampyear } from "@/campyear-api";

const toastStore = useToastStore();

const props = defineProps(["campyear"]);
const emit = defineEmits(["campyearChanged"]);

const start = computed(() => formatDateNl(props.campyear.start));
const end = computed(() => formatDateNl(props.campyear.end));

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
  <tr class="hover:bg-base-300 group">
    <th>{{ campyear.year }}</th>
    <td class="hidden md:table-cell">{{ start }}</td>
    <td class="hidden md:table-cell">{{ end }}</td>
    <td class="w-28">
      <span class="group-hover:flex hidden items-center justify-center gap-2">
        <RouterLink :to="`/kampjaar/${campyear.year}/wijzigen`"
          ><Pencil :size="18"
        /></RouterLink>
        <Trash2
          :size="18"
          v-show="!campyear.active"
          class="cursor-pointer"
          @click="deleteRow"
        />
      </span>
    </td>
  </tr>
</template>
