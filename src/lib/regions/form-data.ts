import { parseNullableStringField, parseStringField } from "../api/form-data";

export function getRegionInputFromFormData(formData: FormData) {
  return {
    image: null as string | null,
    name: parseStringField(formData, "name"),
    region_type: parseStringField(formData, "region_type"),
    parent_region_id: parseNullableStringField(formData, "parent_region_id"),
  };
}
