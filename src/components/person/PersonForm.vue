<template>
  <div class="card card-border bg-base-100 w-full mb-5">
    <form @submit.prevent="savePerson">
      <div class="card-body">
        <h2 class="card-title pb-4" v-if="formPerson.firstName">
          {{ formPerson.firstName }} {{ formPerson.lastName }}
        </h2>
        <div class="flex flex-col lg:flex-row gap-4">
          <div class="w-full lg:w-1/2 space-y-4">
            <fieldset class="fieldset">
              <legend class="fieldset-legend">
                <User class="mr-2" /> Voornaam:
              </legend>
              <input
                type="text"
                v-model="formPerson.firstName"
                name="firstName"
                class="input w-full"
                required
              />
              <span v-show="errors.firstName" class="text-sm text-error">
                {{ errors.firstName }}
              </span>
            </fieldset>

            <fieldset class="fieldset">
              <legend class="fieldset-legend">
                <User class="mr-2" /> Achternaam:
              </legend>
              <input
                type="text"
                v-model="formPerson.lastName"
                name="lastName"
                class="input w-full"
                required
              />
              <span v-show="errors.lastName" class="text-sm text-error">
                {{ errors.lastName }}
              </span>
            </fieldset>

            <fieldset class="fieldset">
              <legend class="fieldset-legend">
                <CircleSmall class="mr-2" /> Gender:
              </legend>
              <select
                v-model="formPerson.gender"
                name="gender"
                class="select w-full"
                required
              >
                <option value="m">Man</option>
                <option value="v">Vrouw</option>
                <option value="nb">Non Binair</option>
              </select>
              <span v-show="errors.gender" class="text-sm text-error">
                {{ errors.gender }}
              </span>
            </fieldset>

            <fieldset class="fieldset">
              <legend class="fieldset-legend">
                <Cake class="mr-2" /> Geboortedatum:
              </legend>
              <input
                type="date"
                v-model="dob"
                name="dateOfBirth"
                class="input w-full"
                required
              />
              <span v-show="errors.dateOfBirth" class="text-sm text-error">
                {{ errors.dateOfBirth }}
              </span>
            </fieldset>
          </div>

          <div class="w-full lg:w-1/2 space-y-4">
            <fieldset class="fieldset">
              <legend class="fieldset-legend">
                <Mail class="mr-2" /> Email:
              </legend>
              <input
                type="email"
                v-model="formPerson.email"
                name="email"
                class="input w-full"
                required
              />
              <span v-show="errors.email" class="text-sm text-error">
                {{ errors.email }}
              </span>
            </fieldset>
            <fieldset class="fieldset">
              <legend class="fieldset-legend">
                <Phone class="mr-2" /> Telefoonnummer:
              </legend>
              <input
                type="text"
                v-model="formPerson.phone"
                name="phone"
                class="input w-full"
              />
              <span v-show="errors.phone" class="text-sm text-error">
                {{ errors.phone }}
              </span>
            </fieldset>

            <fieldset class="fieldset">
              <legend class="fieldset-legend text-error">
                <ShieldPlus class="mr-2" /> Noodcontact:
              </legend>
              <input
                type="text"
                v-model="formPerson.emergencyContact"
                name="emergencyContact"
                class="input w-full"
              />
              <span v-show="errors.emergencyContact" class="text-sm text-error">
                {{ errors.emergencyContact }}
              </span>
            </fieldset>

            <fieldset class="fieldset">
              <legend class="fieldset-legend">
                <MapPinHouse class="mr-2" /> Adres:
              </legend>
              <div class="flex flex-col gap-2">
                <input
                  type="text"
                  v-model="formPerson.address"
                  name="address"
                  placeholder="Straat en huisnummer"
                  class="input w-full"
                />
                <span v-show="errors.address" class="text-sm text-error">
                  {{ errors.address }}
                </span>
                <div class="flex gap-2">
                  <fieldset class="fieldset w-1/2">
                    <input
                      type="text"
                      v-model="formPerson.zipCode"
                      name="zipCode"
                      placeholder="Postcode"
                      class="input w-full"
                      required
                    />
                    <span v-show="errors.zipCode" class="text-sm text-error">
                      {{ errors.zipCode }}
                    </span>
                  </fieldset>
                  <fieldset class="fieldset w-1/2">
                    <input
                      type="text"
                      v-model="formPerson.city"
                      name="city"
                      placeholder="Plaats"
                      class="input w-full"
                      required
                    />
                    <span v-show="errors.city" class="text-sm text-error">
                      {{ errors.city }}
                    </span>
                  </fieldset>
                </div>
              </div>
            </fieldset>
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
import type { ResponsePersonResponse } from "@/client";
import { useValidationErrors } from "@/i18n/validation";
import {
  createPerson,
  updatePerson,
  type CreatePersonError,
  type PersonPersonRequest,
  type PersonPersonResponse,
  type UpdatePersonError,
} from "@/relations-api";
import {
  User,
  CircleSmall,
  Cake,
  Phone,
  ShieldPlus,
  MapPinHouse,
  Mail,
} from "lucide-vue-next";
import { onMounted, ref } from "vue";
const { errors, setErrors, clearErrors } = useValidationErrors();

const props = defineProps<{
  person?: ResponsePersonResponse | PersonPersonResponse;
  email?: string;
}>();

const emit = defineEmits<{
  (e: "updated", payload: { person: PersonPersonResponse }): void;
}>();

const dob = ref<string>("");
const id = ref<number>(props.person?.id || 0);

const formPerson = ref<PersonPersonRequest>({
  firstName: "",
  lastName: "",
  email: "",
  gender: "nb",
  dateOfBirth: "",
  phone: "",
  emergencyContact: "",
  address: "",
  zipCode: "",
  city: "",
});

async function savePerson() {
  // Clear previous errors
  clearErrors();
  formPerson.value.dateOfBirth = dob.value;

  if (id.value == 0) {
    const { data, error } = await createPerson({
      body: formPerson.value,
    });
    if (error) {
      console.error("Error creating person:", error);
      if ((error as CreatePersonError).fields) {
        setErrors((error as CreatePersonError).fields ?? {});
      }
      return;
    }
    if (data.person) {
      id.value = data.person.id;
    }
  } else {
    const { error } = await updatePerson({
      path: { id: id.value },
      body: formPerson.value,
    });
    if (error) {
      console.error("Error updating person:", error);
      // Handle validation errors if they exist
      if ((error as UpdatePersonError).fields) {
        setErrors((error as UpdatePersonError).fields ?? {});
      }
      return;
    }
  }

  emit("updated", {
    person: {
      ...formPerson.value,
      id: id.value,
      createdAt: "",
      updatedAt: "",
    },
  });
}

onMounted(() => {
  if (props.person) {
    formPerson.value = {
      firstName: props.person?.firstName,
      lastName: props.person?.lastName,
      email: props.person?.email,
      gender: props.person?.gender,
      dateOfBirth: props.person?.dateOfBirth,
      phone: props.person?.phone,
      emergencyContact: props.person?.emergencyContact,
      address: props.person?.address,
      zipCode: props.person?.zipCode,
      city: props.person?.city,
    };

    dob.value = new Date(props.person?.dateOfBirth).toLocaleDateString();
  }
  if (props.email) {
    formPerson.value.email = props.email;
  }
});
</script>

<style scoped></style>
