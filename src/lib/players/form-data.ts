import {
  parseJsonField,
  parseNumberField,
  parseStringField,
} from "../api/form-data";

export function getPlayerInputFromFormData(formData: FormData) {
  return {
    image: null as string | null,
    name: parseStringField(formData, "name"),
    dob: parseStringField(formData, "dob"),
    pob: parseStringField(formData, "pob"),
    preferred_foot: parseStringField(formData, "preferred_foot"),
    height: parseNumberField(formData, "height"),
    weight: parseNumberField(formData, "weight"),
    market_value: parseNumberField(formData, "market_value"),
    positions: parseJsonField(formData, "positions", []),
    clubs: parseJsonField(formData, "clubs", []),
    nationalities: parseJsonField(formData, "nationalities", []),
  };
}
