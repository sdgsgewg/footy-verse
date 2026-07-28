import { RegionType } from "@/enums/RegionType";

type Translate = (key: string) => string;

/**
 *
 * @param type
 * @param t
 * @returns
 */

export const getRegionTypeLabel = (
  regionType: RegionType,
  t: Translate,
): string => {
  switch (regionType) {
    case RegionType.CONTINENT:
      return t("continent");
    case RegionType.SUBREGION:
      return t("subregion");
  }
};
