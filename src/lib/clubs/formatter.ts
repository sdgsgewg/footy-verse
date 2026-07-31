import { NationalityResponse, NationalitySummary } from "@/types/nationality";
import { mapNationalityResponse } from "../nationalities/mapper";

/**
 *
 * @param nation
 * @returns Nationality | null
 */
export function getModifiedNation(
  nation: NationalitySummary | null,
): NationalityResponse | null {
  const modifiedNation = nation ? mapNationalityResponse(nation) : null;

  return modifiedNation;
}
