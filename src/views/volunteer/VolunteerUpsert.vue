<template>
  <div class="p-4">
    <div v-if="!loading" class="card bg-base-100 w-full shadow-sm">
      <div class="card-body">
        <h2 class="card-title pb-4">Medewerker inschrijven</h2>
        <form @submit.prevent="saveVolunteer">
          <div>
            <div class="flex flex-col lg:flex-row gap-4">
              <div class="w-full lg:w-1/2 p-4 grid grid-cols-2">
                <div class="flex items-center pb-2">
                  <User class="mr-2" /> Voornaam:
                </div>
                <div class="flex items-center pb-2">
                  <input
                    type="text"
                    v-model="volunteer.person.firstName"
                    placeholder="Voornaam"
                    class="input w-full"
                    required
                  />
                </div>
                <div class="flex items-center pb-2">
                  <User class="mr-2" /> Achternaam:
                </div>
                <div class="flex items-center pb-2">
                  <input
                    type="text"
                    v-model="volunteer.person.lastName"
                    placeholder="Achternaam"
                    class="input w-full"
                    required
                  />
                </div>
                <div class="flex items-center pb-2">
                  <CircleSmall class="mr-2" /> Gender:
                </div>
                <div class="flex items-center pb-2">
                  <select
                    v-model="volunteer.person.gender"
                    class="select w-full"
                    required
                  >
                    <option value="" disabled>Selecteer geslacht</option>
                    <option value="m">Man</option>
                    <option value="v">Vrouw</option>
                    <option value="nb">Non Binair</option>
                  </select>
                </div>
                <div class="flex items-center pb-2">
                  <Cake class="mr-2" /> Geboortedatum:
                </div>
                <div class="flex items-center pb-2">
                  <input
                    type="date"
                    v-model="volunteer.person.dateOfBirth"
                    placeholder="Geboortedatum"
                    class="input w-full"
                    required
                  />
                </div>
              </div>
              <div class="w-full lg:w-1/2 p-4 grid grid-cols-2">
                <div class="flex items-center pb-2">
                  <Phone class="mr-2" /> Telefoonnummer:
                </div>
                <div class="flex items-center pb-2">
                  <input
                    type="tel"
                    v-model="volunteer.person.phone"
                    placeholder="Telefoonnummer"
                    class="input w-full"
                    required
                  />
                </div>
                <div class="flex items-center pb-2 text-error">
                  <ShieldPlus class="mr-2" /> Noodcontact:
                </div>
                <div class="flex items-start pb-2 text-error">
                  <input
                    type="text"
                    v-model="volunteer.person.emergencyContact"
                    placeholder="Noodcontact"
                    class="input w-full"
                    required
                  />
                </div>
                <div class="flex items-center pb-2">
                  <MapPinHouse class="mr-2" /> Adres:
                </div>
                <div class="flex flex-col items-start pb-2">
                  <div class="w-full">
                    <input
                      type="text"
                      v-model="volunteer.person.address"
                      placeholder="Adres"
                      class="input w-full"
                      required
                    />
                  </div>
                  <div class="flex gap-2 w-full">
                    <input
                      type="text"
                      v-model="volunteer.person.zipCode"
                      placeholder="Postcode"
                      class="input w-1/2 mt-2"
                      required
                    />
                    <input
                      type="text"
                      v-model="volunteer.person.city"
                      placeholder="Woonplaats"
                      class="input w-1/2 mt-2"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="divider"></div>
            <div class="flex flex-col lg:flex-row lg:gap-4">
              <div class="w-full lg:w-1/2 px-4 lg:py-4 grid grid-cols-2">
                <div class="flex items-center pb-2">
                  <Mail class="mr-2" /> Email:
                </div>
                <div class="flex items-center pb-2">
                  <input
                    type="email"
                    v-model="volunteer.person.email"
                    placeholder="Email"
                    class="input w-full"
                    required
                  />
                </div>
                <div class="flex items-center pb-2">
                  <Car class="mr-2" /> Rijbewijs:
                </div>
                <div class="flex items-center pb-2">
                  <select
                    v-model="volunteer.driversLicense"
                    class="select w-full"
                    required
                  >
                    <option value="Geen">Geen</option>
                    <option value="B">B</option>
                    <option value="BE">BE</option>
                  </select>
                </div>
              </div>
              <div class="w-full lg:w-1/2 px-4 lg:py-4 grid grid-cols-2">
                <div class="flex items-center pb-2">
                  <BriefcaseMedical class="mr-2" /> EHBO:
                </div>
                <div class="flex items-center pb-2">
                  <select
                    v-model="volunteer.firstAid"
                    class="select w-full"
                    required
                  >
                    <option value="Geen">Geen</option>
                    <option value="EHBO">EHBO</option>
                    <option value="BHV">BHV</option>
                  </select>
                </div>
                <div class="flex items-center pb-2">
                  <GraduationCap class="mr-2" /> Studie:
                </div>
                <div class="flex items-center pb-2">
                  <select
                    v-model="volunteer.study"
                    class="select w-full"
                    required
                  >
                    <option value="" disabled>Selecteer studie</option>
                    <option value="hbo-ict">HBO-ICT</option>
                    <option value="cmd">CMD</option>
                    <option value="ads-ai">ADS-AI</option>
                  </select>
                </div>
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
                    v-model="volunteer.firstChoices"
                  />
                </div>
                <div>
                  <input
                    type="checkbox"
                    class="checkbox"
                    value="BAR"
                    v-model="volunteer.secondChoices"
                  />
                </div>
                <div class="pb-2">Leider</div>
                <div>
                  <input
                    type="checkbox"
                    class="checkbox"
                    value="Leider"
                    v-model="volunteer.firstChoices"
                  />
                </div>
                <div>
                  <input
                    type="checkbox"
                    class="checkbox"
                    value="Leider"
                    v-model="volunteer.secondChoices"
                  />
                </div>
                <div class="pb-2">Keuken</div>
                <div>
                  <input
                    type="checkbox"
                    class="checkbox"
                    value="Keuken"
                    v-model="volunteer.firstChoices"
                  />
                </div>
                <div>
                  <input
                    type="checkbox"
                    class="checkbox"
                    value="Keuken"
                    v-model="volunteer.secondChoices"
                  />
                </div>
                <div>Techniek</div>
                <div>
                  <input
                    type="checkbox"
                    class="checkbox"
                    value="Techniek"
                    v-model="volunteer.firstChoices"
                  />
                </div>
                <div>
                  <input
                    type="checkbox"
                    class="checkbox"
                    value="Techniek"
                    v-model="volunteer.secondChoices"
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
                    v-model="volunteer.firstChoices"
                  />
                </div>
                <div>
                  <input
                    type="checkbox"
                    class="checkbox"
                    value="Foto"
                    v-model="volunteer.secondChoices"
                  />
                </div>
                <div class="pb-2">Video</div>
                <div>
                  <input
                    type="checkbox"
                    class="checkbox"
                    value="Video"
                    v-model="volunteer.firstChoices"
                  />
                </div>
                <div>
                  <input
                    type="checkbox"
                    class="checkbox"
                    value="Video"
                    v-model="volunteer.secondChoices"
                  />
                </div>
                <div class="pb-2">Logistiek</div>
                <div>
                  <input
                    type="checkbox"
                    class="checkbox"
                    value="Logistiek"
                    v-model="volunteer.firstChoices"
                  />
                </div>
                <div>
                  <input
                    type="checkbox"
                    class="checkbox"
                    value="Logistiek"
                    v-model="volunteer.secondChoices"
                  />
                </div>
                <div>EHBO</div>
                <div>
                  <input
                    type="checkbox"
                    class="checkbox"
                    value="EHBO"
                    v-model="volunteer.firstChoices"
                  />
                </div>
                <div>
                  <input
                    type="checkbox"
                    class="checkbox"
                    value="EHBO"
                    v-model="volunteer.secondChoices"
                  />
                </div>
              </div>
            </div>
            <div class="divider"></div>
            <div class="flex flex-col lg:flex-row gap-4">
              <div class="w-full lg:w-1/3 p-4">
                <div class="flex">
                  <MessageSquareDot class="mr-2" /> Eigenschappen:
                </div>
                <div class="mt-2 py-4">
                  <textarea
                    v-model="volunteer.properties"
                    placeholder="Eigenschappen"
                    class="textarea w-full"
                    rows="3"
                  ></textarea>
                </div>
              </div>
              <div class="w-full lg:w-1/3 p-4">
                <div class="flex">
                  <MessageSquareDot class="mr-2" /> Motivatie:
                </div>
                <div class="mt-2 py-4">
                  <textarea
                    v-model="volunteer.motivation"
                    placeholder="Motivatie"
                    class="textarea w-full"
                    rows="3"
                  ></textarea>
                </div>
              </div>
              <div class="w-full lg:w-1/3 p-4">
                <div class="flex">
                  <MessageSquareDot class="mr-2" /> Ervaring:
                </div>
                <div class="mt-2 py-4">
                  <textarea
                    v-model="volunteer.experience"
                    placeholder="Ervaring"
                    class="textarea w-full"
                    rows="3"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <button class="btn btn-primary w-full" type="submit">Opslaan</button>
        </form>
      </div>
    </div>
    <div v-else class="flex h-screen items-center justify-center">
      <div class="loading loading-spinner loading-lg"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  createVolunteer,
  getPersonByEmail,
  getVolunteer,
  registerVolunteer,
  updateVolunteer,
  type CreateVolunteerError,
  type GetVolunteerResponse,
  type RegisterVolunteerError,
  type response_ApiError,
} from "@/client";
import { onMounted, ref } from "vue";
import { useToastStore } from "@/stores/toastr";
import {
  User,
  CircleSmall,
  Cake,
  Phone,
  ShieldPlus,
  MapPinHouse,
  MessageSquareDot,
  Mail,
  Car,
  GraduationCap,
  BriefcaseMedical,
} from "lucide-vue-next";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const email = ref<string>((route.query.email as string) ?? "");

const router = useRouter();

const props = defineProps({
  id: {
    type: String,
  },
});

const toastStore = useToastStore();
const loading = ref<boolean>(true);

const volunteer = ref<GetVolunteerResponse>({
  id: 0,
  personId: 0,
  person: {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    emergencyContact: "",
    address: "",
    zipCode: "",
    city: "",
    gender: "nb",
    dateOfBirth: "",
  },
  motivation: "",
  properties: "",
  experience: "",
  firstAid: "Geen",
  driversLicense: "Geen",
  study: "hbo-ict",
  firstChoices: [],
  secondChoices: [],
});

const errorMsg = ref<{ error: { [key: string]: string } }>({
  error: {},
});

async function saveVolunteer() {
  if (props.id) {
    const { error } = await updateVolunteer({
      path: { id: Number(props.id) },
      body: volunteer.value,
    });
    if (error) {
      if ((error as RegisterVolunteerError).fields) {
        errorMsg.value.error = (error as response_ApiError).fields!;
      } else {
        toastStore.addToast({
          message: `Fout bij het bijwerken van de medewerker. ${error.message}.`,
          type: "error",
        });
      }
      return;
    }

    toastStore.addToast({
      message: `Medewerker ${volunteer.value.person.firstName} ${volunteer.value.person.lastName} bijgewerkt`,
      type: "success",
    });
    router.push({ name: "volunteerIndex" });
    return;
  }
  if (volunteer.value.person.id != 0) {
    const { error } = await registerVolunteer({
      body: volunteer.value,
    });
    if (error) {
      if ((error as RegisterVolunteerError).fields) {
        errorMsg.value.error = (error as response_ApiError).fields!;
      } else {
        toastStore.addToast({
          message: `Fout bij het aanmaken van de medewerker. ${error.message}.`,
          type: "error",
        });
      }
      return;
    }
  } else {
    const { error } = await createVolunteer({
      body: volunteer.value,
    });
    if (error) {
      if ((error as CreateVolunteerError).fields) {
        errorMsg.value.error = (error as response_ApiError).fields!;
      } else {
        toastStore.addToast({
          message: `Fout bij het aanmaken van de medewerker. ${error.message}.`,
          type: "error",
        });
      }
      return;
    }
  }
  toastStore.addToast({
    message: `Medewerker ${volunteer.value.person.firstName} ${volunteer.value.person.lastName} aangemaakt`,
    type: "success",
  });
  router.push({ name: "volunteerIndex" });
}

async function fetchPerson() {
  if (!email.value) {
    loading.value = false;
    return;
  }
  const resp = await getPersonByEmail({
    query: { email: email.value as string },
  });
  if (resp.error) {
    if (resp.response.status === 404) {
      toastStore.addToast({
        type: "warning",
        message: "Persoon niet gevonden met dit e-mailadres",
      });
      volunteer.value.person.email = email.value as string;
      loading.value = false;
      return;
    }
    toastStore.addToast({
      type: "error",
      message: "Fout bij het ophalen van de persoonsgegevens",
    });
    console.error("Error fetching person:", resp.error.message);
    return;
  }
  volunteer.value.person = resp.data;
  volunteer.value.personId = resp.data.id;
  loading.value = false;
}

onMounted(async () => {
  if (props.id) {
    const { data, error } = await getVolunteer({
      path: { id: Number(props.id) },
    });
    if (error) {
      console.error("Error fetching volunteer:", error.message);
      toastStore.addToast({
        message: "Fout bij het ophalen van de medewerker.",
        type: "error",
      });
      return;
    }
    volunteer.value = data;
    loading.value = false;
    return;
  }
  await fetchPerson();
});
</script>

<style scoped></style>
