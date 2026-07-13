import { IMAGES } from "@/constants/images";
import { Entity } from "@/types/entity";

export function getDefaultImage(entity: Entity) {
  return entity === "player"
    ? IMAGES.COMMON.DEFAULT_PLAYER
    : IMAGES.COMMON.DEFAULT;
}
