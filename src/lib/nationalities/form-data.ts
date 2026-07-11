import { parseStringField } from "../api/form-data";

export function getNationalityInputFromFormData(formData: FormData) {
  return {
    image: null as string | null,
    name: parseStringField(formData, "name"),
  };
}
