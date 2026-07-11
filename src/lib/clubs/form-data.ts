import { parseStringField } from "../api/form-data";

export function getClubInputFromFormData(formData: FormData) {
  return {
    image: null as string | null,
    name: parseStringField(formData, "name"),
    club_type: parseStringField(formData, "club_type"),
    nation_id: parseStringField(formData, "nation_id"),
    parent_club_id: parseStringField(formData, "parent_club_id"),
  };
}
