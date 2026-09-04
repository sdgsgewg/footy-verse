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
import { CompetitionListItem } from "@/types/competition";

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
  const { id, shortName, slug, imageUrl } = club;

  return {
    id,
    name: shortName,
    type: "club",
    imageUrl,
    href: `${ROUTES.CLUBS}/${slug}`,
    subtitle: "",
  };
}

export function mapNationalityToEntityItem(
  nationality: NationalityListItem,
): EntityItem {
  const { id, name, slug, imageUrl } = nationality;

  return {
    id,
    name,
    type: "nationality",
    imageUrl,
    href: `${ROUTES.NATIONALITIES}/${slug}`,
    subtitle: "",
  };
}

export function mapPlayerToEntityItem(player: PlayerListItem): EntityItem {
  const { id, shortName, slug, imageUrl } = player;

  return {
    id,
    name: shortName,
    type: "player",
    imageUrl,
    href: `${ROUTES.PLAYERS}/${slug}`,
    subtitle: "",
  };
}

export function mapCompetitionToEntityItem(
  competition: CompetitionListItem,
): EntityItem {
  const { id, name, slug, imageUrl } = competition;

  return {
    id,
    name,
    type: "competition",
    imageUrl,
    href: `${ROUTES.COMPETITIONS}/${slug}`,
    subtitle: "",
  };
}
