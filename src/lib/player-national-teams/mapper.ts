import {
  DbPlayerNationalTeamDetailRow,
  DbPlayerNationalTeamListRow,
  PlayerNationalTeamDetailResponse,
  PlayerNationalTeamEditResponse,
  PlayerNationalTeamListItem,
} from "@/types/player-national-teams";

export function mapPlayerNationalTeamListItem(
  playerNationalTeam: DbPlayerNationalTeamListRow,
): PlayerNationalTeamListItem {
  const { id, label, shirt_number, start_date, end_date, nationality } =
    playerNationalTeam;

  return {
    id,
    label,
    shirtNumber: shirt_number,
    startDate: start_date,
    endDate: end_date,
    nationality: {
      id: nationality.id,
      name: nationality.name,
      image: nationality.image,
    },
  };
}

export function mapPlayerNationalTeamEditResponse(
  playerNationalTeam: DbPlayerNationalTeamDetailRow,
): PlayerNationalTeamEditResponse {
  const { id, label, shirt_number, start_date, end_date, nation_id } =
    playerNationalTeam;

  return {
    id,
    label,
    shirtNumber: shirt_number,
    startDate: start_date,
    endDate: end_date,
    nationId: nation_id,
  };
}

export function mapPlayerNationalTeamDetailResponse(
  playerNationalTeam: DbPlayerNationalTeamDetailRow,
): PlayerNationalTeamDetailResponse {
  const { id, label, shirt_number, start_date, end_date, nationality } =
    playerNationalTeam;

  return {
    id,
    label,
    shirtNumber: shirt_number,
    startDate: start_date,
    endDate: end_date,

    nationality: {
      id: nationality.id,
      name: nationality.name,
      image: nationality.image,
    },
  };
}
