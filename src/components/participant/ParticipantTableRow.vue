<script lang="ts" setup>
import { useRouter } from "vue-router";
import { ArrowRight } from "lucide-vue-next";

const props = defineProps(["participant"]);
const router = useRouter();

function goToView() {
  router.push({
    name: "participantView",
    params: { id: props.participant.id },
  });
}
</script>

<template>
  <tr
    @click="goToView"
    role="button"
    class="hover:bg-base-300 group cursor-pointer"
  >
    <th>
      {{ props.participant.person.firstName }}
      {{ props.participant.person.lastName }}
    </th>
    <td>{{ props.participant.person.email }}</td>
    <td class="hidden lg:table-cell">
      {{
        props.participant.latestPayment?.paymentMethod ??
        "Geen betaling gevonden"
      }}
    </td>
    <td class="hidden md:table-cell">
      {{ props.participant.latestPayment?.paymentStatus ?? "Onbekend" }}
    </td>
    <td class="hidden md:table-cell">{{ props.participant.attendance }}</td>
    <td class="w-14">
      <span class="group-hover:flex hidden items-center justify-center"
        ><ArrowRight :size="18"
      /></span>
    </td>
  </tr>
</template>
