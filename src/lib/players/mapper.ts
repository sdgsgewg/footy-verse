import {
  DbPlayerDetailRow,
  DbPlayerListRow,
  PlayerDetailResponse,
  PlayerListItem,
} from "@/types/player";
import { SelectOption } from "@/types/select";
import { STORAGE_BUCKETS } from "../storage";
import { getImageUrl } from "../images/image-url";
import { getDefaultImage } from "../images/default-image";

function getCurrentCareer(player: DbPlayerListRow) {
  const current = player.player_careers.find(
    (career) => career.left_at == null,
  );

  if (current) {
    return current.club;
  }

  return [...player.player_careers].sort(
    (a, b) =>
      new Date(b.left_at ?? b.joined_at).getTime() -
      new Date(a.left_at ?? a.joined_at).getTime(),
  )[0]?.club;
}

export function mapPlayerListItem(player: DbPlayerListRow): PlayerListItem {
  const mainPosition = player.player_positions.find(
    (p) => p.display_order === 1,
  );

  const currentCareer = getCurrentCareer(player);

  const currentNationalTeam = player.player_national_teams.find(
    (c) => c.end_date === null,
  );

  return {
    id: player.id,
    image: player.image,
    name: player.name,
    slug: player.slug,
    main_position: mainPosition?.position ?? null,
    current_club: currentCareer ?? null,
    current_national_team: currentNationalTeam?.nationality ?? null,
    market_value: player.market_value,
  };
}

export function mapPlayerDetailResponse(
  player: DbPlayerDetailRow,
): PlayerDetailResponse {
  return {
    ...player,
    positions: player.player_positions,
    careers: player.player_careers,
    national_teams: player.player_national_teams,
  };
}
