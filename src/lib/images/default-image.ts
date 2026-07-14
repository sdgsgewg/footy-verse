import { Entity } from "@/config/entities";
import { IMAGES } from "@/constants/images";

export function getDefaultImage(entity: Entity) {
  return entity === "player"
    ? IMAGES.COMMON.DEFAULT_PLAYER
    : IMAGES.COMMON.DEFAULT;
}
