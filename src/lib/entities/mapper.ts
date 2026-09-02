import { DbOptionListRow } from "@/types/database";
import { Option } from "@/types/option";
import { getImageUrl } from "../images/image-url";
import { Entity } from "@/config/entities";
import { StorageBucket } from "../storage";
import { DbEntitySearchRow, EntityItem } from "@/types/entity";
import { SearchEntityType, SearchResult } from "@/types/search";
import { ClubListItem } from "@/types/club";
import { ROUTES } from "@/constants/routes";
import { NationalityListItem } from "@/types/nationality";
import { PlayerListItem } from "@/types/player";

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

export function mapClubToEntityItem(club: ClubListItem): EntityItem {
  return {
    id: club.id,
    name: club.name,
    type: "club",
    imageUrl: club.imageUrl,
    href: `${ROUTES.CLUBS}/${club.slug}`,
    subtitle: "",
  };
}

export function mapNationalityToEntityItem(
  nationality: NationalityListItem,
): EntityItem {
  return {
    id: nationality.id,
    name: nationality.name,
    type: "nationality",
    imageUrl: nationality.imageUrl,
    href: `${ROUTES.NATIONALITIES}/${nationality.slug}`,
    subtitle: "",
  };
}

export function mapPlayerToEntityItem(player: PlayerListItem): EntityItem {
  return {
    id: player.id,
    name: player.shortName,
    type: "player",
    imageUrl: player.imageUrl,
    href: `${ROUTES.PLAYERS}/${player.slug}`,
    subtitle: "",
  };
}
