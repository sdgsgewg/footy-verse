import {
  parseJsonField,
  parseNumberField,
  parseStringField,
} from "../api/form-data";

export function getPlayerInputFromFormData(formData: FormData) {
  return {
    image: null as string | null,
    full_name: parseStringField(formData, "full_name"),
    short_name: parseStringField(formData, "short_name"),
    dob: parseStringField(formData, "dob"),
    pob: parseStringField(formData, "pob"),
    preferred_foot: parseStringField(formData, "preferred_foot"),
    height: parseNumberField(formData, "height"),
    weight: parseNumberField(formData, "weight"),
    market_value: parseNumberField(formData, "market_value"),
    positions: parseJsonField(formData, "positions", []),
    nationalities: parseJsonField(formData, "nationalities", []),
  };
}
