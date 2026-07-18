import { PreferredFoot } from "@/enums/PreferredFoot";

type Translate = (key: string) => string;

/**
 *
 * @param type
 * @param t
 * @returns
 */

export const getPreferredFootLabel = (
  prefFoot: PreferredFoot,
  t: Translate,
): string => {
  switch (prefFoot) {
    case PreferredFoot.RIGHT:
      return t("right");
    case PreferredFoot.LEFT:
      return t("left");
    case PreferredFoot.BOTH:
      return t("both");
  }
};
