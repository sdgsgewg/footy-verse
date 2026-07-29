import { parseNullableStringField, parseStringField } from "../api/form-data";

export function getConfederationInputFromFormData(formData: FormData) {
  return {
    image: null as string | null,
    name: parseStringField(formData, "name"),
    short_name: parseStringField(formData, "short_name"),
    founded: parseNullableStringField(formData, "founded"),
    headquarters: parseNullableStringField(formData, "headquarters"),
    website: parseNullableStringField(formData, "website"),
    region_id: parseStringField(formData, "region_id"),
  };
}
