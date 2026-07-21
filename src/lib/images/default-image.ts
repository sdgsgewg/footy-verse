import { Entity } from "@/config/entities";
import { IMAGES } from "@/constants/images";

/**
 *
 * @param entity
 * @returns
 */
export function getDefaultImage(entity: Entity): string {
  return entity === "player"
    ? IMAGES.COMMON.DEFAULT_PLAYER
    : IMAGES.COMMON.DEFAULT;
}
