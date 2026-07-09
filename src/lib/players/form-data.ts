import { parseJsonField } from "../api/form-data";

export function getPlayerInputFromFormData(formData: FormData) {
  return {
    image: null as string | null,
    name: String(formData.get("name") ?? ""),
    dob: String(formData.get("dob") ?? ""),
    pob: String(formData.get("pob") ?? ""),
    preferred_foot: String(formData.get("preferred_foot") ?? ""),
    height: formData.get("height"),
    weight: formData.get("weight"),
    market_value: formData.get("market_value"),
    positions: parseJsonField(formData, "positions", []),
    clubs: parseJsonField(formData, "clubs", []),
    nationalities: parseJsonField(formData, "nationalities", []),
  };
}
