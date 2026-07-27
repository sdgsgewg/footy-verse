import { parseNullableStringField, parseStringField } from "../api/form-data";

export function getNationalityInputFromFormData(formData: FormData) {
  return {
    image: null as string | null,
    name: parseStringField(formData, "name"),
    fifa_code: parseStringField(formData, "fifa_code"),
    region_id: parseNullableStringField(formData, "region_id"),
  };
}
