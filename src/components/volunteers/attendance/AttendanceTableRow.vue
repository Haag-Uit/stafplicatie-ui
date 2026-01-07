<script lang="ts" setup>
import type { PersonPersonResponse } from "@/relations-api";
import { useToastStore } from "@/stores/toastr";
import {
  deleteVolunteer,
  updateAttendance,
  type VolunteersVolunteerResponse,
  type UpdateAttendanceData,
} from "@/volunteers-api";
import { CircleQuestionMark, CircleX, CircleSlash, CircleCheck } from "lucide-vue-next";
import { type PropType, ref } from "vue";
import MeetingAttendancePicker from "@/components/volunteers/attendance/MeetingAttendancePicker.vue";

const props = defineProps({
  volunteer: {
    type: Object as PropType<
      VolunteersVolunteerResponse & { person: PersonPersonResponse }
    >,
    required: true,
  }
});

const toastStore = useToastStore();

const volunteer = ref(props.volunteer);

function updateStatus(meeting: string, status: number) {
  console.log("Status updated for", meeting, "to", status);
  volunteer.value.attendance[meeting] = status;
  saveAttendance();
}

function saveAttendance() {
  updateAttendance({
    path: { id: volunteer.value.id },
    body: volunteer.value.attendance as UpdateAttendanceData,
  })
    .then(() => {
      toastStore.addToast("Attendance updated", "success");
    })
    .catch((error) => {
      console.error("Error updating attendance:", error);
      toastStore.addToast("Failed to update attendance", "error");
    });
}

</script>

<template>
  <tr class="hover:bg-base-300 group">
    <th>
      {{ volunteer.person.firstName }}
      {{ volunteer.person.lastName }}
    </th>
    <td>
      <MeetingAttendancePicker :volunteer-id="volunteer.id" meeting="meetingOne"
        :status="volunteer.attendance['meetingOne']" @update-status="updateStatus" />
    </td>
    <td>
      <MeetingAttendancePicker :volunteer-id="volunteer.id" meeting="meetingTwo"
        :status="volunteer.attendance['meetingTwo']" @update-status="updateStatus" />
    </td>
    <td>
      <MeetingAttendancePicker :volunteer-id="volunteer.id" meeting="individual"
        :status="volunteer.attendance['individual']" @update-status="updateStatus" />
    </td>
    <td>
      <MeetingAttendancePicker :volunteer-id="volunteer.id" meeting="meetingThree"
        :status="volunteer.attendance['meetingThree']" @update-status="updateStatus" />
    </td>
    <td>
      <MeetingAttendancePicker :volunteer-id="volunteer.id" meeting="meetingFour"
        :status="volunteer.attendance['meetingFour']" @update-status="updateStatus" />
    </td>
  </tr>
</template>
