<script lang="ts" setup>
import { Eye } from "lucide-vue-next";

const props = defineProps(["participant"]);
</script>

<template>
  <tr class="hover:bg-base-300">
    <th>
      {{ props.participant.person.first_name }}
      {{ props.participant.person.last_name }}
    </th>
    <td>{{ props.participant.person.email }}</td>
    <td class="hidden md:table-cell">
      {{ props.participant.latest_payment.payment_method }}
    </td>
    <td class="hidden md:table-cell">
      {{ props.participant.latest_payment.payment_status }}
    </td>
    <td class="hidden md:table-cell">{{ props.participant.attendance }}</td>
    <td class="flex gap-2">
      <button class="btn btn-secondary px-2">
        <RouterLink :to="`/inschrijving/${props.participant.id}`"
          ><Eye
        /></RouterLink>
      </button>
    </td>
  </tr>
</template>
