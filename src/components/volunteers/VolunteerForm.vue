<template>
  <div class="card card-border bg-base-100 w-full mb-5">
    <form @submit.prevent="saveVolunteer">
      <div class="card-body">
        <div class="flex flex-col lg:flex-row gap-4">
          <div class="w-full lg:w-1/2 space-y-4">
            <fieldset class="fieldset">
              <legend class="fieldset-legend">
                <Car class="mr-2" /> Rijbewijs:
              </legend>
              <select
                v-model="formVolunteer.driversLicense"
                name="driversLicense"
                class="select w-full"
                required
              >
                <option value="Geen">Geen</option>
                <option value="B">B</option>
                <option value="BE">BE</option>
              </select>
              <span v-show="errors.driversLicense" class="text-sm text-error">
                {{ errors.driversLicense }}
              </span>
            </fieldset>

            <fieldset class="fieldset">
              <legend class="fieldset-legend">
                <BriefcaseMedical class="mr-2" /> EHBO:
              </legend>
              <select
                v-model="formVolunteer.firstAid"
                name="firstAid"
                class="select w-full"
                required
              >
                <option value="Geen">Geen</option>
                <option value="EHBO">EHBO</option>
                <option value="BHV">BHV</option>
              </select>
              <span v-show="errors.firstAid" class="text-sm text-error">
                {{ errors.firstAid }}
              </span>
            </fieldset>

            <fieldset class="fieldset">
              <legend class="fieldset-legend">
                <GraduationCap class="mr-2" /> Studie:
              </legend>
              <select
                v-model="formVolunteer.study"
                name="study"
                class="select w-full"
                required
              >
                <option value="hbo-ict">HBO-ICT</option>
                <option value="cmd">CMD</option>
                <option value="ads-ai">ADS-AI</option>
              </select>
              <span v-show="errors.study" class="text-sm text-error">
                {{ errors.study }}
              </span>
            </fieldset>
          </div>

          <div class="w-full lg:w-1/2 space-y-4">
            <fieldset class="fieldset">
              <legend class="fieldset-legend">
                <MessageSquare class="mr-2" /> Ervaring:
              </legend>
              <textarea
                v-model="formVolunteer.experience"
                name="experience"
                class="textarea w-full"
                rows="4"
              ></textarea>
              <span v-show="errors.experience" class="text-sm text-error">
                {{ errors.experience }}
              </span>
            </fieldset>
            <fieldset class="fieldset">
              <legend class="fieldset-legend">
                <MessageSquare class="mr-2" /> Eigenschappen:
              </legend>
              <textarea
                v-model="formVolunteer.properties"
                name="characteristics"
                class="textarea w-full"
                rows="4"
              ></textarea>
              <span v-show="errors.characteristics" class="text-sm text-error">
                {{ errors.characteristics }}
              </span>
            </fieldset>
            <fieldset class="fieldset">
              <legend class="fieldset-legend">
                <MessageSquare class="mr-2" /> Motivatie:
              </legend>
              <textarea
                v-model="formVolunteer.motivation"
                name="motivation"
                class="textarea w-full"
                rows="4"
              ></textarea>
              <span v-show="errors.motivation" class="text-sm text-error">
                {{ errors.motivation }}
              </span>
            </fieldset>
          </div>
        </div>
        <div class="flex flex-col lg:flex-row gap-4">
          <div class="w-full p-4 grid grid-cols-3">
            <div class="font-bold pb-3">Functie</div>
            <div class="font-bold">Eerste keus</div>
            <div class="font-bold">Tweede keus</div>
            <div class="pb-2">BAR</div>
            <div>
              <input
                type="checkbox"
                class="checkbox"
                value="BAR"
                v-model="formVolunteer.firstChoices"
              />
            </div>
            <div>
              <input
                type="checkbox"
                class="checkbox"
                value="BAR"
                v-model="formVolunteer.secondChoices"
              />
            </div>
            <div class="pb-2">Leider</div>
            <div>
              <input
                type="checkbox"
                class="checkbox"
                value="Leider"
                v-model="formVolunteer.firstChoices"
              />
            </div>
            <div>
              <input
                type="checkbox"
                class="checkbox"
                value="Leider"
                v-model="formVolunteer.secondChoices"
              />
            </div>
            <div class="pb-2">Keuken</div>
            <div>
              <input
                type="checkbox"
                class="checkbox"
                value="Keuken"
                v-model="formVolunteer.firstChoices"
              />
            </div>
            <div>
              <input
                type="checkbox"
                class="checkbox"
                value="Keuken"
                v-model="formVolunteer.secondChoices"
              />
            </div>
            <div>Techniek</div>
            <div>
              <input
                type="checkbox"
                class="checkbox"
                value="Techniek"
                v-model="formVolunteer.firstChoices"
              />
            </div>
            <div>
              <input
                type="checkbox"
                class="checkbox"
                value="Techniek"
                v-model="formVolunteer.secondChoices"
              />
            </div>
          </div>
          <div class="w-full p-4 grid grid-cols-3">
            <div class="font-bold pb-3">Functie</div>
            <div class="font-bold">Eerste keus</div>
            <div class="font-bold">Tweede keus</div>
            <div class="pb-2">Foto</div>
            <div>
              <input
                type="checkbox"
                class="checkbox"
                value="Foto"
                v-model="formVolunteer.firstChoices"
              />
            </div>
            <div>
              <input
                type="checkbox"
                class="checkbox"
                value="Foto"
                v-model="formVolunteer.secondChoices"
              />
            </div>
            <div class="pb-2">Video</div>
            <div>
              <input
                type="checkbox"
                class="checkbox"
                value="Video"
                v-model="formVolunteer.firstChoices"
              />
            </div>
            <div>
              <input
                type="checkbox"
                class="checkbox"
                value="Video"
                v-model="formVolunteer.secondChoices"
              />
            </div>
            <div class="pb-2">Logistiek</div>
            <div>
              <input
                type="checkbox"
                class="checkbox"
                value="Logistiek"
                v-model="formVolunteer.firstChoices"
              />
            </div>
            <div>
              <input
                type="checkbox"
                class="checkbox"
                value="Logistiek"
                v-model="formVolunteer.secondChoices"
              />
            </div>
            <div>EHBO</div>
            <div>
              <input
                type="checkbox"
                class="checkbox"
                value="EHBO"
                v-model="formVolunteer.firstChoices"
              />
            </div>
            <div>
              <input
                type="checkbox"
                class="checkbox"
                value="EHBO"
                v-model="formVolunteer.secondChoices"
              />
            </div>
          </div>
        </div>
        <div class="card-actions justify-end">
          <button type="submit" class="btn btn-success">Opslaan</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useValidationErrors } from "@/i18n/validation";
import {
  BriefcaseMedical,
  Car,
  GraduationCap,
  MessageSquare,
} from "lucide-vue-next";
import { onMounted, ref } from "vue";
import { useToastStore } from "@/stores/toastr";
import { useRouter } from "vue-router";
import {
  createVolunteer,
  updateVolunteer,
  type CreateVolunteerError,
  type UpdateVolunteerError,
  type VolunteersCreateVolunteerRequest,
  type VolunteersUpdateVolunteerRequest,
  type VolunteersVolunteerResponse,
} from "@/volunteers-api";

const toastStore = useToastStore();
const { errors, setErrors, clearErrors } = useValidationErrors();
const router = useRouter();

const props = defineProps<{
  personId: number;
  volunteer?: VolunteersVolunteerResponse;
}>();

interface VolunteerRequest {
  driversLicense: "Geen" | "B" | "BE";
  experience: string;
  firstAid: "Geen" | "EHBO" | "BHV";
  firstChoices: string[];
  motivation: string;
  properties: string;
  secondChoices: string[];
  study: "ads-ai" | "cmd" | "hbo-ict";
}

const formVolunteer = ref<VolunteerRequest>({
  driversLicense: "Geen",
  experience: "",
  firstAid: "Geen",
  firstChoices: [],
  motivation: "",
  properties: "",
  secondChoices: [],
  study: "hbo-ict",
});

async function saveVolunteer() {
  // Clear previous errors
  clearErrors();

  if (props.volunteer) {
    // Update existing volunteer
    const { error } = await updateVolunteer({
      body: {
        ...formVolunteer.value,
      } as VolunteersUpdateVolunteerRequest,
      path: { id: props.volunteer.id },
    });
    if (error) {
      console.error("Error updating volunteer:", error);
      if ((error as UpdateVolunteerError).fields) {
        setErrors((error as UpdateVolunteerError).fields ?? {});
        return;
      }
      toastStore.addToast({
        message: `Fout bij het bijwerken van medewerker. ${error.message}`,
        type: "error",
      });
      return;
    }
    toastStore.addToast({
      message: "Medewerker succesvol bijgewerkt.",
      type: "success",
    });
    return;
  }
  const { error } = await createVolunteer({
    body: {
      ...formVolunteer.value,
      personId: props.personId,
    } as VolunteersCreateVolunteerRequest,
  });
  if (error) {
    console.error("Error creating volunteer:", error);
    if ((error as CreateVolunteerError).fields) {
      setErrors((error as CreateVolunteerError).fields ?? {});
      return;
    }
    toastStore.addToast({
      message: `Fout bij het aanmaken van medewerker. ${error.message}`,
      type: "error",
    });
    return;
  }
  router.push({ name: "volunteerIndex" });
}

onMounted(() => {
  if (props.volunteer) {
    formVolunteer.value = {
      driversLicense: props.volunteer.driversLicense,
      experience: props.volunteer.experience,
      firstAid: props.volunteer.firstAid,
      firstChoices: props.volunteer.firstChoices,
      motivation: props.volunteer.motivation,
      properties: props.volunteer.properties,
      secondChoices: props.volunteer.secondChoices,
      study: props.volunteer.study,
    };
  }
});
</script>

<style scoped></style>
