import {
  parseNullableStringField,
  parseNumberField,
  parseStringField,
} from "../api/form-data";

export function getCompetitionInputFromFormData(formData: FormData) {
  return {
    image: null as string | null,
    name: parseStringField(formData, "name"),
    short_name: parseNullableStringField(formData, "short_name"),
    description: parseNullableStringField(formData, "description"),
    founded_year: parseNumberField(formData, "founded_year"),
    gender: parseStringField(formData, "gender"),
    age_group: parseStringField(formData, "age_group"),
    participant_type: parseStringField(formData, "participant_type"),
    competition_category_id: parseStringField(
      formData,
      "competition_category_id",
    ),
    competition_scope_id: parseStringField(formData, "competition_scope_id"),
    confederation_id: parseNullableStringField(formData, "confederation_id"),
    nationality_id: parseNullableStringField(formData, "nationality_id"),
    region_id: parseNullableStringField(formData, "region_id"),
  };
}
