import { DbOptionListRow } from "@/types/database";
import { Option } from "@/types/option";
import { getImageUrl } from "../images/image-url";
import { Entity } from "@/config/entities";
import { StorageBucket } from "../storage";
import { DbEntitySearchRow } from "@/types/entity";
import { SearchEntityType, SearchResult } from "@/types/search";

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

export function mapEntitySearchResult(
  data: DbEntitySearchRow,
  searchEntityType: SearchEntityType,
  storageBucket?: StorageBucket,
): SearchResult {
  const { image } = data;

  return {
    ...data,
    type: searchEntityType,
    imageUrl:
      image &&
      storageBucket &&
      getImageUrl(searchEntityType, storageBucket, image),
    subtitle: null,
  };
}
