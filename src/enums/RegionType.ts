export enum RegionType {
  CONTINENT = "CONTINENT",
  SUBREGION = "SUBREGION",
}

export const RegionTypeLabels: Record<RegionType, string> = {
  [RegionType.CONTINENT]: "Continent",
  [RegionType.SUBREGION]: "Subregion",
};
