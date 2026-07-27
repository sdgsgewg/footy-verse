import { parseStringField } from "../api/form-data";

export function getClubInputFromFormData(formData: FormData) {
  return {
    image: null as string | null,
    name: parseStringField(formData, "name"),
    nation_id: parseStringField(formData, "nation_id"),
  };
}
