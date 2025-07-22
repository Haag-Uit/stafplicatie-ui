import { createI18n } from "vue-i18n";

const messages = {
  en: {
    validation: {
      required: "This field is required.",
      gte: "Must be at least {{value}} characters.",
      min: "Must be at least {{value}} characters.",
      max: "Must be at most {{value}} characters.",
      email: "Invalid email address.",
      datetime: "Invalid date/time format.",
    },
  },
  nl: {
    validation: {
      required: "Dit veld is verplicht.",
      gte: "Moet minimaal {{value}} teken(s) zijn.",
      min: "Moet minimaal {{value}} teken(s) zijn.",
      max: "Mag maximaal {{value}} teken(s) zijn.",
      email: "Ongeldig e-mailadres.",
      datetime: "Ongeldige datum/tijd formaat.",
    },
  },
};

export const i18n = createI18n({
  legacy: false, // Use Composition API
  locale: "nl",
  messages,
});
