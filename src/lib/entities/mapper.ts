import { DbOptionListRow } from "@/types/database";
import { Option } from "@/types/option";
import { getImageUrl } from "../images/image-url";
import { Entity } from "@/config/entities";
import { StorageBucket } from "../storage";

export function mapEntityOption(
  data: DbOptionListRow,
  entityKey: Entity,
  storageBucket?: StorageBucket,
): Option {
  const { id, name, image } = data;

  return {
    label: name,
    value: id,
    imageUrl:
      image && storageBucket && getImageUrl(entityKey, storageBucket, image),
  };
}
