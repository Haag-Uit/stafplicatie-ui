import { reactive } from "vue";
import { useI18n } from "vue-i18n";

type BackendErrors = {
  [key: string]: string;
};

export function useValidationErrors() {
  const { t } = useI18n();
  const errors = reactive<Record<string, string>>({});

  const translateRule = (rule: string): string => {
    const [key, param] = rule.split("=");
    return t(`validation.${key}`, { value: param });
  };

  const setErrors = (newErrors: BackendErrors) => {
    clearErrors();
    for (const [field, rule] of Object.entries(newErrors)) {
      errors[field] = translateRule(rule);
    }
  };

  const clearErrors = () => {
    Object.keys(errors).forEach((key) => delete errors[key]);
  };

  return {
    errors,
    setErrors,
    clearErrors,
  };
}
