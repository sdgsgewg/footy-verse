import {
  ClubImageLabel,
  NationalityImageLabel,
  PlayerImageLabel,
} from "@/components/shared/tables/cells";
import { PlayerListItem } from "@/types/player";
import { DataColumn } from "@/types/table";

export type PlayerColumnKey =
  | "shirtNumber"
  | "player"
  | "dob"
  | "club"
  | "nationality"
  | "marketValue";

type PlayerColumnLabels = {
  player: string;
  dob: string;
  club: string;
  nationality: string;
  marketValue: string;
};

export function createPlayerColumns(
  labels: PlayerColumnLabels,
  visibleColumns?: PlayerColumnKey[],
): DataColumn<PlayerListItem>[] {
  const columns: Record<PlayerColumnKey, DataColumn<PlayerListItem>> = {
    shirtNumber: {
      key: "shirtNumber",
      label: "#",
      className: "w-[2rem]",

      render: (player) => (
        <div className="bg-accent rounded-full px-2.5 py-2 text-center">
          <span>{player.shirtNumber.clubTeam ?? "-"}</span>
        </div>
      ),
    },

    player: {
      key: "shortName",
      label: labels.player,
      className: "min-w-[16rem]",
      sortable: true,

      render: (player) => (
        <PlayerImageLabel
          imageUrl={player.imageUrl}
          label={player.shortName}
          subtitle={player.mainPosition.name}
        />
      ),
    },

    dob: {
      key: "dob",
      label: labels.dob,
      sortable: true,

      render: (player) => player.dob,
    },

    club: {
      key: "currentClubTeam",
      label: labels.club,
      className: "min-w-[12rem]",

      render: (player) =>
        player.currentClubTeam ? (
          <ClubImageLabel
            imageUrl={player.currentClubTeam.imageUrl}
            label={player.currentClubTeam.name}
          />
        ) : (
          "-"
        ),
    },

    nationality: {
      key: "currentNationality",
      label: labels.nationality,
      className: "min-w-[14rem]",

      render: (player) =>
        player.currentNationality ? (
          <NationalityImageLabel
            imageUrl={player.currentNationality.imageUrl}
            label={player.currentNationality.name}
          />
        ) : (
          "-"
        ),
    },

    marketValue: {
      key: "marketValue",
      label: labels.marketValue,
      sortable: true,

      render: (player) => player.marketValue,
    },
  };

  const defaultColumns: PlayerColumnKey[] = [
    "shirtNumber",
    "player",
    "club",
    "nationality",
    "marketValue",
  ];

  const selectedColumns = visibleColumns ?? defaultColumns;

  return selectedColumns.map((columnKey) => columns[columnKey]);
}
