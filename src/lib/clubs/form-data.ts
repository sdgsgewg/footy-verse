import { parseStringField } from "../api/form-data";

export function getClubInputFromFormData(formData: FormData) {
  return {
    image: null as string | null,
    full_name: parseStringField(formData, "full_name"),
    short_name: parseStringField(formData, "short_name"),
    nation_id: parseStringField(formData, "nation_id"),
  };
}
